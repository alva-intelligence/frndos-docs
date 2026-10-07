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
 * s3://frnd/frndos-update/<slug>.mp4 with ACL public-read via curl --aws-sigv4
 * and prove the public URL with an anonymous HEAD.
 *
 * Upload credentials: FRNDOS_NEWS_S3_KEY_ID / FRNDOS_NEWS_S3_SECRET, from the
 * environment or the frndos-docs .env (gitignored). Scope them to
 * frnd/frndos-update/* only (see s3-uploader-policy.json). Without them the
 * script stops after preparing the file and prints the manual upload step.
 *
 * Needs ffmpeg/ffprobe and curl; `lark-cli` (logged in) for Lark sources.
 * Never writes into the repo.
 */
import { execFileSync } from "child_process";
import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";

const BUCKET = "frnd";
const REGION = "ap-southeast-3";
const PREFIX = "frndos-update";
const WARN_MB = 50;
const MAX_MB = 200;

const die = (msg, code = 1) => {
  console.error(msg);
  process.exit(code);
};
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
const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
const caption = (opts.caption ?? `frndos update ${slug.replace(/^frndos-/, "").replace(/-/g, " ")}`).replace(/"/g, "'");
const block = `<S3Video url="${publicUrl}" caption="${caption}" />`;
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "news-video-"));

// ---- 0. existing object guard (anonymous HEAD; objects under the prefix are public-read)
const head = async () => {
  const res = await fetch(publicUrl, { method: "HEAD", signal: AbortSignal.timeout(15000) });
  return { status: res.status, type: res.headers.get("content-type") || "", length: res.headers.get("content-length") };
};
const before = await head();
if (before.status === 200 && !opts.force) {
  die(`${publicUrl} already exists (${before.length} bytes). Pick another slug or pass --force to overwrite`);
}

// ---- 1. source
let raw;
if (opts.file) {
  raw = path.resolve(opts.file);
  if (!fs.existsSync(raw) || !fs.statSync(raw).isFile()) die(`no such file: ${raw}`);
} else {
  let token = opts.token;
  if (!token) {
    const doc = execFileSync(
      "lark-cli",
      ["docs", "+fetch", "--doc", docUrl, "--doc-format", "markdown", "-q", ".data.document.content"],
      { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }
    );
    const videos = [...doc.matchAll(/<source\b[^>]*>/g)]
      .map((m) => m[0])
      .filter((s) => /name="[^"]+\.(mp4|mov|webm|m4v)"/i.test(s));
    token = videos[0]?.match(/token="([^"]+)"/)?.[1];
    if (!token) die("no video file block found in the Lark doc; ask the user for the video (or use --file)");
    if (videos.length > 1) console.error("warn: the doc has more than one video; using the first one");
  }
  // lark-cli only accepts an output path relative to its cwd
  execFileSync("lark-cli", ["docs", "+media-download", "--token", token, "--output", "./raw", "--overwrite"], {
    cwd: dir,
    stdio: ["ignore", "ignore", "inherit"],
  });
  raw = fs.readdirSync(dir).map((f) => path.join(dir, f)).find((f) => path.basename(f).startsWith("raw"));
  if (!raw) die("Lark download produced no file");
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

// ---- 4. credentials (env first, then frndos-docs/.env)
const readDotEnv = () => {
  const env = {};
  const file = path.join(process.cwd(), ".env");
  if (!fs.existsSync(file)) return env;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
  }
  return env;
};
const dotEnv = readDotEnv();
const keyId = process.env.FRNDOS_NEWS_S3_KEY_ID || dotEnv.FRNDOS_NEWS_S3_KEY_ID;
const secret = process.env.FRNDOS_NEWS_S3_SECRET || dotEnv.FRNDOS_NEWS_S3_SECRET;

const manual = (why) => {
  console.log(`file     ${out} (${sizeMb.toFixed(1)} MB)`);
  console.log(`upload   MANUAL (${why}): s3://${BUCKET}/${key}, ACL public-read, Content-Type video/mp4`);
  console.log(`block    ${block}`);
};
if (!opts.upload) {
  manual("--no-upload");
  process.exit(0);
}
if (!keyId || !secret) {
  manual("FRNDOS_NEWS_S3_KEY_ID / FRNDOS_NEWS_S3_SECRET not set");
  process.exit(0);
}

// ---- 5. upload: curl --aws-sigv4, secret passed via stdin config (not argv)
const sha256 = crypto.createHash("sha256").update(fs.readFileSync(out)).digest("hex");
const respFile = path.join(dir, "put-response.xml");
let status;
try {
  status = execFileSync(
    "curl",
    [
      "-sS", "-K", "-", "-w", "%{http_code}", "-o", respFile,
      "--aws-sigv4", `aws:amz:${REGION}:s3`,
      "-X", "PUT", "-T", out,
      "-H", "Content-Type: video/mp4",
      "-H", "x-amz-acl: public-read",
      "-H", `x-amz-content-sha256: ${sha256}`,
      publicUrl,
    ],
    { input: `user = "${keyId}:${secret}"\n`, encoding: "utf8", stdio: ["pipe", "pipe", "inherit"] }
  ).trim();
} catch {
  status = "curl error";
}
if (status !== "200") {
  const body = fs.existsSync(respFile) ? fs.readFileSync(respFile, "utf8") : "";
  const s3err = [body.match(/<Code>(.*?)<\/Code>/)?.[1], body.match(/<Message>(.*?)<\/Message>/)?.[1]].filter(Boolean).join(": ");
  console.error(`S3 PUT failed (${status}${s3err ? `, ${s3err}` : ""})`);
  manual("automatic upload failed");
  process.exit(1);
}

// ---- 6. prove the public URL
const after = await head();
if (after.status !== 200 || !after.type.startsWith("video/")) {
  die(`uploaded, but anonymous HEAD ${publicUrl} returned ${after.status} "${after.type}"; check the object ACL / bucket settings`);
}
fs.rmSync(dir, { recursive: true, force: true });
console.log(`uploaded ${publicUrl} (${after.type}, ${after.length} bytes)`);
console.log(`block    ${block}`);
