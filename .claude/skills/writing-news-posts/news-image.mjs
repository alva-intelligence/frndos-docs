/**
 * Get news post images (thumbnail + body images) onto S3 and print the
 * frontmatter / markdown lines that use them.
 *
 *   node .claude/skills/writing-news-posts/news-image.mjs [<lark doc/wiki URL>] <slug>
 *        [--file <path>]... [--thumbnail <path | N>] [--force] [--no-upload]
 *
 * Sources, numbered in this order as body images 1..N:
 *   1. every image in the Lark doc, in document order (with its nearest heading)
 *   2. every --file <path>, in flag order (PNG, JPG, WebP, HEIC, GIF, ...)
 * --thumbnail <path> uses a separate file; --thumbnail <N> reuses body image N.
 *
 * Processing: still images become WebP (q 82, max 1600 px wide); animated GIFs
 * are uploaded as GIF. The thumbnail is cropped to 16:9 (1280x720).
 *
 * Keys (bucket frnd, public-read):
 *   frndos-update/img/<slug>-thumb.webp
 *   frndos-update/img/<slug>-<n>.webp   (or .gif)
 * Existing keys are refused unless --force.
 *
 * Without FRNDOS_NEWS_S3_KEY_ID / FRNDOS_NEWS_S3_SECRET (or with --no-upload)
 * the files are prepared in the OS temp dir and the manual upload step is
 * printed. Needs ffmpeg/ffprobe and curl; `sips` (macOS) for HEIC;
 * `lark-cli` (logged in) for Lark docs. Never writes into the repo.
 */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { BUCKET, PREFIX, credentials, die, downloadLarkMedia, existingKeys, fetchLarkDoc, publicUrlFor, putPublic, tempDir } from "./s3-upload.mjs";

const MAX_WIDTH = 1600;
const THUMB = { w: 1280, h: 720 };
const WARN_MB = 2;
const MAX_MB = 15;
const USAGE =
  "usage: news-image.mjs [<lark doc URL>] <slug> [--file <path>]... [--thumbnail <path | N>] [--force] [--no-upload]";

// ---- args
const opts = { files: [], force: false, upload: true, thumbnail: null };
const positional = [];
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--force") opts.force = true;
  else if (a === "--no-upload") opts.upload = false;
  else if (a === "--file" || a === "--thumbnail") {
    if (argv[i + 1] === undefined) die(USAGE, 2);
    if (a === "--file") opts.files.push(argv[++i]);
    else opts.thumbnail = argv[++i];
  } else if (a.startsWith("--")) die(`unknown option ${a}\n${USAGE}`, 2);
  else positional.push(a);
}
const slug = positional.pop();
const docUrl = positional.shift() ?? null;
if (!slug || positional.length) die(USAGE, 2);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) die(`slug "${slug}" must be kebab-case [a-z0-9-]`, 2);
if (!docUrl && !opts.files.length && !opts.thumbnail) die(`nothing to do: give a Lark doc URL, --file, or --thumbnail\n${USAGE}`, 2);
for (const f of [...opts.files, ...(opts.thumbnail && !/^\d+$/.test(opts.thumbnail) ? [opts.thumbnail] : [])]) {
  if (!fs.existsSync(f) || !fs.statSync(f).isFile()) die(`no such file: ${path.resolve(f)}`);
}

const dir = tempDir("news-image");
const humanize = (s) => s.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];

// ---- 1. collect sources
const sources = []; // { label, alt, path }
if (docUrl) {
  const doc = fetchLarkDoc(docUrl);
  let heading = "";
  const imgs = [];
  for (const line of doc.split("\n")) {
    const h = line.match(/^#{1,6}\s+(.*)$/);
    if (h) heading = h[1].replace(/<[^>]+>/g, "").trim();
    for (const [tag] of line.matchAll(/<img\b[^>]*>/g)) {
      const token = attr(tag, "token") || attr(tag, "src");
      if (token && !/^(https?:|data:|@)/.test(token)) imgs.push({ token, heading, alt: attr(tag, "caption") || attr(tag, "alt") || attr(tag, "name") || "" });
    }
  }
  if (!imgs.length) console.error("warn: no images found in the Lark doc");
  imgs.forEach((img, i) => {
    const p = downloadLarkMedia(img.token, dir, `lark-${i + 1}`);
    sources.push({ label: `lark #${i + 1}${img.heading ? ` (under "${img.heading}")` : ""}`, alt: img.alt ? humanize(img.alt) : img.heading, path: p });
  });
}
for (const f of opts.files) sources.push({ label: `file ${f}`, alt: humanize(path.basename(f)), path: path.resolve(f) });

let thumbSource = null;
if (opts.thumbnail) {
  if (/^\d+$/.test(opts.thumbnail)) {
    const n = Number(opts.thumbnail);
    if (n < 1 || n > sources.length) die(`--thumbnail ${n}: there are only ${sources.length} body images`, 2);
    thumbSource = sources[n - 1];
  } else thumbSource = { label: `file ${opts.thumbnail}`, path: path.resolve(opts.thumbnail) };
}

// ---- 2. convert
const probe = (p) =>
  JSON.parse(
    execFileSync("ffprobe", ["-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,nb_read_frames", "-of", "json", p], {
      encoding: "utf8",
    })
  ).streams?.[0];

/** Returns a decodable still/animation path (HEIC goes through sips: ffmpeg only reads its tiles). */
const decodable = (p, base) => {
  if (!/\.(heic|heif)$/i.test(p)) return p;
  const png = path.join(dir, `${base}-heic.png`);
  try {
    execFileSync("sips", ["-s", "format", "png", p, "--out", png], { stdio: "ignore" });
  } catch {
    die(`cannot convert HEIC ${p} (needs macOS sips); export it as PNG/JPG first`);
  }
  return png;
};

const convert = (src, base, thumb) => {
  const input = decodable(src.path, base);
  const info = probe(input);
  if (!info) die(`${src.label}: not an image`);
  if (!thumb && info.codec_name === "gif" && Number(info.nb_read_frames) > 1) {
    const out = path.join(dir, `${base}.gif`);
    fs.copyFileSync(input, out);
    return { out, ext: "gif", type: "image/gif" };
  }
  const vf = thumb
    ? `scale=${THUMB.w}:${THUMB.h}:force_original_aspect_ratio=increase,crop=${THUMB.w}:${THUMB.h}`
    : `scale='min(${MAX_WIDTH},iw)':-2`;
  const out = path.join(dir, `${base}.webp`);
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", input, "-frames:v", "1", "-vf", vf, "-c:v", "libwebp", "-q:v", "82", out], { stdio: "inherit" });
  return { out, ext: "webp", type: "image/webp" };
};

const items = []; // { role, label, alt, out, type, key, sizeMb }
if (thumbSource) {
  const c = convert(thumbSource, `${slug}-thumb`, true);
  items.push({ role: "thumbnail", label: thumbSource.label, ...c, key: `${PREFIX}/img/${slug}-thumb.${c.ext}` });
}
sources.forEach((s, i) => {
  const c = convert(s, `${slug}-${i + 1}`, false);
  items.push({ role: `body ${i + 1}`, label: s.label, alt: s.alt, ...c, key: `${PREFIX}/img/${slug}-${i + 1}.${c.ext}` });
});
for (const it of items) {
  it.sizeMb = fs.statSync(it.out).size / 1024 / 1024;
  if (it.sizeMb > MAX_MB) die(`${it.role} (${it.label}) is ${it.sizeMb.toFixed(1)} MB (> ${MAX_MB} MB); use a video instead. File: ${it.out}`);
  if (it.sizeMb > WARN_MB) console.error(`warn: ${it.role} (${it.label}) is ${it.sizeMb.toFixed(1)} MB (> ${WARN_MB} MB)`);
}

// ---- 3. existing object guard
if (!opts.force) {
  const found = await existingKeys(items.map((it) => it.key));
  if (found.length) die(`already on S3:\n  ${found.join("\n  ")}\nPick another slug or pass --force to overwrite. Files: ${dir}`);
}

// ---- 4. upload (or hand over)
const line = (it, url) =>
  it.role === "thumbnail" ? `image: ${url}` : `![${(it.alt || "").replace(/[[\]]/g, "")}](${url})`;
const report = (why) => {
  for (const it of items) {
    console.log(`${it.role.padEnd(9)} ${it.label}`);
    console.log(`  file    ${it.out} (${it.sizeMb.toFixed(2)} MB)`);
    console.log(`  upload  MANUAL: s3://${BUCKET}/${it.key}, ACL public-read, Content-Type ${it.type}`);
    console.log(`  use     ${line(it, publicUrlFor(it.key))}`);
  }
  console.log(`\nupload skipped: ${why}`);
};
const creds = credentials();
if (!opts.upload) {
  report("--no-upload");
  process.exit(0);
}
if (!creds) {
  report("FRNDOS_NEWS_S3_KEY_ID / FRNDOS_NEWS_S3_SECRET not set");
  process.exit(0);
}
let failed = 0;
for (const it of items) {
  const res = await putPublic(it.out, it.key, it.type, creds);
  console.log(`${it.role.padEnd(9)} ${it.label}`);
  if (res.ok) {
    console.log(`  uploaded ${res.url} (${res.type}, ${res.length} bytes)`);
    console.log(`  use      ${line(it, res.url)}`);
  } else {
    failed++;
    console.log(`  FAILED   ${res.error}`);
    console.log(`  file     ${it.out} -> s3://${BUCKET}/${it.key} (upload manually)`);
  }
}
if (failed) process.exit(1);
fs.rmSync(dir, { recursive: true, force: true });
