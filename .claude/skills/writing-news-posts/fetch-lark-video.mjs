/**
 * Pull the release video out of a Lark release doc, ready for S3.
 *
 * The monthly Lark release doc ("FRNDOS Product Update — <Month YYYY>")
 * carries the recap video as a file block. This downloads it, re-muxes it
 * with +faststart (playback starts before the whole file arrives) and prints
 * the S3 key + <S3Video> block the post should use.
 *
 * Run from the frndos-docs root:
 *   node .claude/skills/writing-news-posts/fetch-lark-video.mjs <lark doc/wiki URL> <slug>
 *   node .claude/skills/writing-news-posts/fetch-lark-video.mjs --token <file token> <slug>
 *
 * Writes to the OS temp dir, never into the repo. Needs `lark-cli` (logged in)
 * and `ffmpeg`. Uploading to S3 stays a human step until there is a key
 * scoped to frnd/frndos-update/*.
 */
import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const BUCKET_BASE = "https://frnd.s3.ap-southeast-3.amazonaws.com/frndos-update";

const argv = process.argv.slice(2);
const tokenFlag = argv.indexOf("--token");
const slug = argv[argv.length - 1];
if (argv.length < 2 || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("usage: fetch-lark-video.mjs <lark doc URL | --token <file token>> <slug>");
  process.exit(2);
}

// 1. Find the video file token in the doc (first .mp4/.mov/.webm <source>).
let token = tokenFlag >= 0 ? argv[tokenFlag + 1] : null;
if (!token) {
  const doc = execFileSync(
    "lark-cli",
    ["docs", "+fetch", "--doc", argv[0], "--doc-format", "markdown", "-q", ".data.document.content"],
    { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }
  );
  const sources = [...doc.matchAll(/<source\b[^>]*>/g)].map((m) => m[0]);
  const video = sources.find((s) => /name="[^"]+\.(mp4|mov|webm)"/i.test(s));
  token = video?.match(/token="([^"]+)"/)?.[1];
  if (!token) {
    console.error("no video file block found in the Lark doc — ask the user for the video");
    process.exit(1);
  }
  if (sources.filter((s) => /\.(mp4|mov|webm)"/i.test(s)).length > 1) {
    console.error("warn: the doc has more than one video; using the first one");
  }
}

// 2. Download (lark-cli only accepts an output path relative to its cwd).
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "news-video-"));
execFileSync("lark-cli", ["docs", "+media-download", "--token", token, "--output", "./raw.mp4", "--overwrite"], {
  cwd: dir,
  stdio: ["ignore", "ignore", "inherit"],
});
const raw = fs.readdirSync(dir).map((f) => path.join(dir, f)).find((f) => path.basename(f).startsWith("raw"));
if (!raw) {
  console.error("download produced no file");
  process.exit(1);
}

// 3. Faststart re-mux, no re-encode.
const out = path.join(dir, `${slug}.mp4`);
execFileSync("ffmpeg", ["-y", "-v", "error", "-i", raw, "-c", "copy", "-movflags", "+faststart", out], { stdio: "inherit" });
fs.rmSync(raw);

const sizeMb = (fs.statSync(out).size / 1024 / 1024).toFixed(1);
const caption = `frndos update ${slug.replace(/^frndos-/, "").replace(/-/g, " ")}`;
console.log(`file     ${out} (${sizeMb} MB)`);
console.log(`upload   to s3://frnd/frndos-update/${slug}.mp4 (public-read, Content-Type video/mp4)`);
console.log(`block    <S3Video url="${BUCKET_BASE}/${slug}.mp4" caption="${caption}" />`);
