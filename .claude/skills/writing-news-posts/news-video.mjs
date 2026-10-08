/**
 * Get a news post video onto S3 and print its <S3Video> block.
 *
 * Sources (pick one):
 *   node .claude/skills/writing-news-posts/news-video.mjs <lark doc/wiki URL> <slug>
 *   node .claude/skills/writing-news-posts/news-video.mjs --token <lark file token> <slug>
 *   node .claude/skills/writing-news-posts/news-video.mjs --file <local video path> <slug>
 *
 * Options:
 *   --caption "<text>"  caption for the block (default: "frndos update <slug words>")
 *   --force             overwrite frndos-update/<slug>.mp4 when it already exists
 *   --no-upload         prepare the file and print the manual upload step only
 *
 * Steps: fetch the video (Lark doc file block, Lark token, or local file) into
 * the OS temp dir, make it a browser-safe MP4 (H.264/AAC streams are re-muxed
 * with +faststart; anything else is re-encoded), then PUT it to
 * s3://frnd/frndos-update/<slug>.mp4 with ACL public-read and prove the
 * public URL with an anonymous HEAD (s3-upload.mjs).
 *
 * Without FRNDOS_NEWS_S3_KEY_ID / FRNDOS_NEWS_S3_SECRET the script stops after
 * preparing the file and prints the manual upload step.
 *
 * Needs ffmpeg/ffprobe and curl; `lark-cli` (logged in) for Lark sources.
 * Never writes into the repo.
 */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import {
  BUCKET, PREFIX, credentials, die, downloadLarkMedia, existingKeys, fetchLarkDoc, publicUrlFor, putPublic, tempDir,
} from "./s3-upload.mjs";

const WARN_MB = 50;
const MAX_MB = 200;
const USAGE =
  "usage: news-video.mjs (<lark doc URL> | --token <file token> | --file <path>) <slug> [--caption <text>] [--force] [--no-upload]";

// ---- args
const opts = { force: false, upload: true };
const positional = [];
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--force") opts.force = true;
  else if (a === "--no-upload") opts.upload = false;
  else if (["--token", "--file", "--caption"].includes(a)) {
    if (argv[i + 1] === undefined) die(USAGE, 2);
    opts[a.slice(2)] = argv[++i];
  } else if (a.startsWith("--")) die(`unknown option ${a}\n${USAGE}`, 2);
  else positional.push(a);
}
if (opts.token && opts.file) die("use either --token or --file, not both", 2);
const docUrl = opts.token || opts.file ? null : positional.shift();
const slug = positional.shift();
if (!slug || positional.length || (!docUrl && !opts.token && !opts.file)) die(USAGE, 2);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) die(`slug "${slug}" must be kebab-case [a-z0-9-]`, 2);

const key = `${PREFIX}/${slug}.mp4`;
const publicUrl = publicUrlFor(key);
const caption = (opts.caption ?? `frndos update ${slug.replace(/^frndos-/, "").replace(/-/g, " ")}`).replace(/"/g, "'");
const block = `<S3Video url="${publicUrl}" caption="${caption}" />`;

// ---- 0. existing object guard (before any download)
if (!opts.force) {
  const found = await existingKeys([key]);
  if (found.length) die(`${found[0]} already exists. Pick another slug or pass --force to overwrite`);
}

const dir = tempDir("news-video");

// ---- 1. source
let raw;
if (opts.file) {
  raw = path.resolve(opts.file);
  if (!fs.existsSync(raw) || !fs.statSync(raw).isFile()) die(`no such file: ${raw}`);
} else {
  let token = opts.token;
  if (!token) {
    const videos = [...fetchLarkDoc(docUrl).matchAll(/<source\b[^>]*>/g)]
      .map((m) => m[0])
      .filter((s) => /name="[^"]+\.(mp4|mov|webm|m4v)"/i.test(s));
    token = videos[0]?.match(/token="([^"]+)"/)?.[1];
    if (!token) die("no video file block found in the Lark doc; ask the user for the video (or use --file)");
    if (videos.length > 1) console.error("warn: the doc has more than one video; using the first one");
  }
  raw = downloadLarkMedia(token, dir, "raw");
}

// ---- 2. browser-safe MP4: re-mux H.264/AAC, re-encode anything else
const probe = JSON.parse(
  execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_type,codec_name", "-of", "json", raw], {
    encoding: "utf8",
  })
);
const streams = probe.streams || [];
const vcodec = streams.find((s) => s.codec_type === "video")?.codec_name;
const acodecs = streams.filter((s) => s.codec_type === "audio").map((s) => s.codec_name);
if (!vcodec) die(`${raw} has no video stream`);
const copyOk = vcodec === "h264" && acodecs.every((c) => c === "aac");
const out = path.join(dir, `${slug}.mp4`);
const codecArgs = copyOk
  ? ["-c", "copy"]
  : ["-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k"];
console.error(copyOk ? `re-mux (${vcodec}/${acodecs.join(",") || "no audio"})` : `re-encode ${vcodec}/${acodecs.join(",") || "no audio"} to h264/aac`);
execFileSync("ffmpeg", ["-y", "-v", "error", "-i", raw, "-map", "0:v:0", "-map", "0:a?", ...codecArgs, "-movflags", "+faststart", out], {
  stdio: "inherit",
});
if (!opts.file) fs.rmSync(raw);

const sizeMb = fs.statSync(out).size / 1024 / 1024;
if (sizeMb > MAX_MB) die(`video is ${sizeMb.toFixed(1)} MB (> ${MAX_MB} MB); use a <YouTube> block instead. File: ${out}`);
if (sizeMb > WARN_MB) console.error(`warn: video is ${sizeMb.toFixed(1)} MB (> ${WARN_MB} MB); slow on mobile, consider YouTube`);

// ---- 3. upload (or hand over)
const manual = (why) => {
  console.log(`file     ${out} (${sizeMb.toFixed(1)} MB)`);
  console.log(`upload   MANUAL (${why}): s3://${BUCKET}/${key}, ACL public-read, Content-Type video/mp4`);
  console.log(`block    ${block}`);
};
const creds = credentials();
if (!opts.upload) {
  manual("--no-upload");
  process.exit(0);
}
if (!creds) {
  manual("FRNDOS_NEWS_S3_KEY_ID / FRNDOS_NEWS_S3_SECRET not set");
  process.exit(0);
}
const res = await putPublic(out, key, "video/mp4", creds);
if (!res.ok) {
  console.error(res.error);
  manual("automatic upload failed");
  process.exit(1);
}
fs.rmSync(dir, { recursive: true, force: true });
console.log(`uploaded ${res.url} (${res.type}, ${res.length} bytes)`);
console.log(`block    ${block}`);
