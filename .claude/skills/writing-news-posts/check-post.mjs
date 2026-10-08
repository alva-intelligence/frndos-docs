/**
 * News post checker for blog/*.mdx (the "What's New" collection, Tina `post`).
 *
 * Proves a post is (1) editable in TinaCMS /admin and (2) safe for the
 * Docusaurus build. A green `docusaurus build` proves neither on its own.
 *
 * Run from the frndos-docs root:
 *   node .claude/skills/writing-news-posts/check-post.mjs blog/<file>.mdx [...]
 *   node .claude/skills/writing-news-posts/check-post.mjs          # every post
 *
 * Exit 1 when any ERROR is found. WARN lines do not fail the run.
 */
import { parseMDX } from "@tinacms/mdx";
import matter from "gray-matter";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const BLOG = "blog";
const lock = JSON.parse(fs.readFileSync("tina/tina-lock.json", "utf8"));
const post = lock.schema.collections.find((c) => c.name === "post");
const fieldNames = new Set(post.fields.map((f) => f.name).filter((n) => n !== "body"));
const bodyField = post.fields.find((f) => f.name === "body");
const lockAuthors = new Set(post.fields.find((f) => f.name === "authors").options.map((o) => o.value));
const ymlAuthors = new Set(Object.keys(yaml.load(fs.readFileSync(`${BLOG}/authors.yml`, "utf8")) || {}));
const configSrc = fs.readFileSync("tina/config.jsx", "utf8");

const allPosts = fs.readdirSync(BLOG).filter((f) => f.endsWith(".mdx")).map((f) => path.join(BLOG, f));
const targets = process.argv.slice(2).length ? process.argv.slice(2) : allPosts;

const slugOf = (file) => {
  const fm = matter(fs.readFileSync(file, "utf8")).data;
  if (fm.slug) return String(fm.slug).replace(/^\//, "");
  return path.basename(file, ".mdx").replace(/^\d{4}-\d{2}-\d{2}-/, "");
};
const slugs = new Map(allPosts.map((f) => [f, slugOf(f)]));

const docExists = (route) => {
  const rel = route.replace(/^\/docs\//, "").replace(/[#?].*$/, "").replace(/\/$/, "");
  return ["", "/index"].some((s) => fs.existsSync(`docs/${rel}${s}.mdx`) || fs.existsSync(`docs/${rel}${s}.md`));
};

// Images may live in git (/img/...) or on S3 under frnd/frndos-update/img/ (news-image.mjs).
const S3_IMG = /^https:\/\/frnd\.s3\.ap-southeast-3\.amazonaws\.com\/frndos-update\/img\/[^?#\s]+\.(webp|png|jpe?g|gif)$/i;

let errors = 0;
const s3Checks = [];
for (const file of targets) {
  const out = [];
  const err = (m) => { errors++; out.push(`  ERROR ${m}`); };
  const warn = (m) => out.push(`  WARN  ${m}`);

  if (!fs.existsSync(file)) { err(`file not found`); console.log(file); console.log(out.join("\n")); continue; }
  const raw = fs.readFileSync(file, "utf8");
  const { data: fm, content: body } = matter(raw);
  const fmRaw = (raw.match(/^---\n([\s\S]*?)\n---\n/) || [])[1] || "";

  // ---- filename
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.mdx$/.test(path.basename(file)))
    warn(`filename should be YYYY-MM-DD-<kebab-slug>.mdx`);

  // ---- frontmatter: only fields Tina knows (unknown keys are dropped on the next /admin save)
  for (const k of Object.keys(fm)) if (!fieldNames.has(k)) err(`frontmatter key "${k}" is not a field of the Tina post collection`);
  if (!fm.title || typeof fm.title !== "string") err(`title missing`);
  if (!fm.slug) err(`slug missing (keep the permalink stable)`);
  else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(String(fm.slug))) err(`slug "${fm.slug}" is not kebab-case`);
  else for (const [f, s] of slugs) if (f !== path.normalize(file) && s === fm.slug) err(`slug "${fm.slug}" already used by ${f}`);

  if (!Array.isArray(fm.authors) || !fm.authors.length) err(`authors must be a non-empty list`);
  else for (const a of fm.authors) {
    if (!ymlAuthors.has(a)) err(`author "${a}" not in blog/authors.yml`);
    if (!lockAuthors.has(a)) err(`author "${a}" not in tina-lock.json post.authors options`);
    if (!configSrc.includes(`value: "${a}"`)) err(`author "${a}" not in tina/config.jsx authors options`);
  }

  if (!/^date: '\d{4}-\d{2}-\d{2}'$/m.test(fmRaw)) err(`date must be a quoted string: date: 'YYYY-MM-DD'`);

  if (!fm.image) err(`image (thumbnail) missing; the app home "What's New" list needs it`);
  else if (S3_IMG.test(fm.image)) s3Checks.push({ file, url: fm.image, kind: "image" });
  else if (!/^\/img\//.test(fm.image)) err(`image must be /img/... (Tina media root) or an S3 URL under frnd/frndos-update/img/`);
  else if (!fs.existsSync(`static${fm.image}`)) err(`image file static${fm.image} does not exist`);

  if (fm.description !== undefined && /—/.test(fm.description)) warn(`description contains an em dash; use a period or colon`);
  if (fm.tags !== undefined && !(Array.isArray(fm.tags) && fm.tags.every((t) => typeof t === "string"))) err(`tags must be a list of strings`);

  if (fm.related_doc === undefined) err(`related_doc missing; use '' or docs/<module>/<slug>.mdx`);
  else if (fm.related_doc !== "" && !(/^docs\/.+\.mdx$/.test(fm.related_doc) && fs.existsSync(fm.related_doc)))
    err(`related_doc "${fm.related_doc}" must be '' or an existing docs/<module>/<slug>.mdx path`);

  // ---- body: must parse in Tina's rich-text parser
  const parsed = parseMDX(body, bodyField, (s) => s);
  const nodes = parsed.children || [];
  const bad = nodes.find((n) => n.type === "invalid_markdown");
  if (bad) err(`Tina cannot parse the body: ${(bad.message || "").split("\n")[0]}`);
  for (const n of nodes.filter((n) => n.type === "html"))
    err(`raw HTML / unregistered component (Tina shows it as an uneditable HTML blob): ${String(n.value || "").split("\n")[0].slice(0, 80)}`);

  // ---- video blocks
  for (const n of nodes.filter((n) => n.type === "mdxJsxFlowElement")) {
    const p = n.props || {};
    if (n.name === "Video") {
      if (!/^\/img\/.+\.(mp4|webm)$/i.test(p.src || "")) err(`<Video src="${p.src}"> must be an /img/... .mp4 or .webm`);
      else if (!fs.existsSync(`static${p.src}`)) err(`video file static${p.src} does not exist`);
      else if (fs.statSync(`static${p.src}`).size > 20 * 1024 * 1024) warn(`video ${p.src} is over 20 MB; it lives in git, consider YouTube`);
      if (p.poster && !fs.existsSync(`static${p.poster}`)) err(`poster file static${p.poster} does not exist`);
    }
    if (n.name === "S3Video") {
      let u = null;
      try { u = new URL(p.url || ""); } catch {}
      if (!u || u.protocol !== "https:") err(`<S3Video url="${p.url}"> must be an https URL`);
      else {
        if (!/(^|\.)(s3[.-][a-z0-9.-]*amazonaws\.com|s3\.amazonaws\.com|cloudfront\.net)$/.test(u.hostname))
          err(`<S3Video> host ${u.hostname} is not S3 or CloudFront`);
        if (/X-Amz-(Signature|Credential|Expires)/i.test(u.search)) err(`<S3Video> URL is pre-signed; it expires, use the public object URL`);
        if (!/\.(mp4|webm)$/i.test(decodeURIComponent(u.pathname))) warn(`<S3Video> URL does not end in .mp4/.webm`);
        s3Checks.push({ file, url: p.url, kind: "video" });
      }
      if (p.poster && /^\/img\//.test(p.poster) && !fs.existsSync(`static${p.poster}`)) err(`poster file static${p.poster} does not exist`);
    }
    if (n.name === "YouTube" && !/(youtu\.be\/|youtube(-nocookie)?\.com\/(watch\?(.*&)?v=|embed\/|shorts\/|live\/|v\/))[\w-]{11}/.test(p.url || ""))
      err(`<YouTube url="${p.url}"> is not a recognisable YouTube video URL`);
  }
  if (/truncate/i.test(body)) err(`truncate marker found; both <!-- truncate --> and {/* truncate */} break Tina`);
  if (/TODO/.test(body)) err(`TODO in body; it belongs in DOCS_TODO.md`);
  if (/\{#/.test(body)) err(`explicit heading id {#...} breaks Tina`);
  if (/^# /m.test(body)) warn(`H1 in body duplicates the title; start sections at ##`);

  // ---- internal links (onBrokenLinks: "throw")
  for (const [, url] of body.matchAll(/\]\((\/[^)\s]+)\)/g)) {
    if (url.startsWith("/docs/")) { if (!docExists(url)) err(`broken link ${url}`); }
    else if (url.startsWith("/blog/")) {
      const s = url.replace(/^\/blog\//, "").replace(/[#?].*$/, "").replace(/\/$/, "");
      if (![...slugs.values()].includes(s)) err(`broken link ${url}`);
    } else if (url.startsWith("/img/")) { if (!fs.existsSync(`static${url}`)) err(`missing image ${url}`); }
  }
  for (const [, url] of body.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)) {
    if (S3_IMG.test(url)) s3Checks.push({ file, url, kind: "image" });
    else if (/amazonaws\.com|cloudfront\.net/.test(url)) err(`image ${url} is on S3 but not under frnd/frndos-update/img/ (or is pre-signed); upload it with news-image.mjs`);
    else warn(`external image ${url}; it can disappear, prefer news-image.mjs`);
  }
  for (const [, url] of body.matchAll(/\]\((\.{1,2}\/[^)\s]+)\)/g)) warn(`relative link ${url}; use an absolute /docs/... or /blog/... URL`);

  // ---- em dash budget (structural slots: headings and "**term** — meaning" / "[link](...) — meaning" rows)
  const lines = body.split("\n");
  const total = (body.match(/—/g) || []).length;
  const slots = lines.filter((l) => /^#{2,} .*—/.test(l) || /^\s*[*-] .*(\*\*|\]\([^)]*\)) —/.test(l)).length;
  const prose = total - slots;
  if (prose > 3) err(`${prose} prose em dashes (budget 3)`);

  console.log(`${out.length ? "" : "OK    "}${file}  (prose em dashes: ${prose})`);
  if (out.length) console.log(out.join("\n"));
}

// ---- S3 videos/images must be publicly readable objects of the right type (anonymous HEAD)
for (const { file, url, kind } of s3Checks) {
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(15000) });
    const type = res.headers.get("content-type") || "";
    if (!res.ok) { errors++; console.log(`  ERROR ${file}: S3 ${kind} ${url} returned HTTP ${res.status} (object missing or not public)`); }
    else if (!type.startsWith(`${kind}/`)) { errors++; console.log(`  ERROR ${file}: S3 ${kind} ${url} has Content-Type "${type}", expected ${kind}/*`); }
    else console.log(`  S3 OK ${url} (${type}, ${res.headers.get("content-length") || "?"} bytes)`);
  } catch (e) {
    console.log(`  WARN  ${file}: could not reach ${url} (${e.name}); check it manually`);
  }
}

console.log(`\nNEWS CHECK: files=${targets.length} errors=${errors}`);
process.exit(errors ? 1 : 0);
