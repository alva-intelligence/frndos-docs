#!/usr/bin/env node
/**
 * Asset name guard.
 *
 * Docusaurus' mdx-loader resolves ABSOLUTE image paths (`/img/...`) without
 * `decodeURIComponent` (see node_modules/@docusaurus/mdx-loader/lib/remark/
 * transformImage/index.js — the absolute branch, unlike the relative branch,
 * skips decoding). So any space in a folder or file name gets URL-encoded to
 * `%20` and the loader looks for a literal `%20` path → "Image ... not found",
 * failing the build.
 *
 * TinaCMS lets content authors create folders / upload files with spaces
 * (e.g. "DEV local/alva logo.jpeg"), which trips this every time. Dragging a
 * macOS screenshot ("Screenshot at Jun 12 ...png") does the same.
 *
 * This script makes asset names build-safe BEFORE Docusaurus runs:
 *   1. Walk `static/img/` and rename any file/dir whose name isn't URL-safe
 *      to a slugified version (spaces → "-", strip unsafe chars, lower-case).
 *   2. Rewrite every affected reference inside `docs/` and `blog/` .mdx files.
 *
 * Wired into `predev` / `prebuild` so it runs automatically. Idempotent:
 * already-safe names are left untouched, so re-runs are no-ops.
 *
 * No external dependencies — plain Node, runs before install-time tooling.
 */

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const IMG_DIR = path.join(ROOT, "static", "img");
const CONTENT_DIRS = [path.join(ROOT, "docs"), path.join(ROOT, "blog")];

// Characters that survive URL path encoding untouched (RFC 3986 unreserved).
// Anything else (spaces, %, parens, etc.) is what trips the mdx-loader, so
// only those force a rename. camelCase / underscores / existing dashes are
// already safe and are left exactly as-is — we do NOT lower-case or otherwise
// "tidy" names that already build fine.
const UNSAFE_CHAR = /[^A-Za-z0-9._~-]/;

/**
 * Slugify a single path SEGMENT (not a full path — keeps the extension).
 * Only collapses unsafe characters; preserves case and safe characters.
 * "DEV local" → "DEV-local", "alva logo.jpeg" → "alva-logo.jpeg".
 */
function slugifySegment(name) {
  const ext = path.extname(name);
  const base = ext ? name.slice(0, -ext.length) : name;
  const safeBase = base
    .normalize("NFKD")
    .replace(new RegExp(UNSAFE_CHAR.source, "g"), "-") // unsafe runs → "-"
    .replace(/-+/g, "-")
    .replace(/^[-]+|[-]+$/g, ""); // trim leading/trailing dashes
  return (safeBase || "asset") + ext;
}

function isSafeSegment(name) {
  // Safe = nothing that URL-encoding would alter. Already-safe names (incl.
  // camelCase) are returned unchanged by slugifySegment, but we test the raw
  // char class directly so a name like "a--b" (safe, but not slug-canonical)
  // is left alone too.
  return !UNSAFE_CHAR.test(name);
}

/**
 * Recursively rename unsafe dirs/files under `dir`. Returns a list of
 * { from, to } public-URL path pairs (relative to static/, leading "/")
 * so callers can rewrite references.
 */
function normalizeTree(dir, renames) {
  if (!fs.existsSync(dir)) return;

  // Depth-first: fix children before renaming the parent, so paths stay valid.
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) normalizeTree(abs, renames);
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (isSafeSegment(entry.name)) continue;

    const safeName = slugifySegment(entry.name);
    let target = path.join(dir, safeName);

    // Avoid clobbering an existing file with the slugified name.
    if (fs.existsSync(target)) {
      const ext = path.extname(safeName);
      const stem = ext ? safeName.slice(0, -ext.length) : safeName;
      let i = 2;
      while (fs.existsSync(path.join(dir, `${stem}-${i}${ext}`))) i++;
      target = path.join(dir, `${stem}-${i}${ext}`);
    }

    fs.renameSync(path.join(dir, entry.name), target);

    const fromUrl = "/" + path.relative(path.join(ROOT, "static"), path.join(dir, entry.name)).split(path.sep).join("/");
    const toUrl = "/" + path.relative(path.join(ROOT, "static"), target).split(path.sep).join("/");
    renames.push({ from: fromUrl, to: toUrl });
    console.log(`  renamed: ${fromUrl}  →  ${toUrl}`);
  }
}

/**
 * Rewrite references in .mdx files. Matches both the raw URL and its
 * URL-encoded form (what an author/Tina may have written), with or without
 * the angle-bracket wrapper Tina emits for paths with spaces:
 *   ![](</img/DEV local/alva logo.jpeg>)  → ![](/img/dev-local/alva-logo.jpeg)
 */
function rewriteReferences(renames) {
  if (renames.length === 0) return;

  // For each rename, prepare the variants we might find in content.
  const replacements = renames.map(({ from, to }) => {
    const encoded = from.split("/").map(encodeURIComponent).join("/");
    return { variants: [from, encoded], to };
  });

  for (const contentDir of CONTENT_DIRS) {
    if (!fs.existsSync(contentDir)) continue;
    walkFiles(contentDir, (file) => {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) return;
      let text = fs.readFileSync(file, "utf8");
      let changed = false;

      for (const { variants, to } of replacements) {
        for (const variant of variants) {
          if (!text.includes(variant)) continue;
          text = text.split(variant).join(to);
          changed = true;
        }
      }

      // Drop the angle-bracket wrapper Tina adds for spaced paths — no longer
      // needed once the path is space-free, and cleaner in source.
      text = text.replace(/!\[([^\]]*)\]\(<(\/img\/[^>]*)>\)/g, "![$1]($2)");

      if (changed) {
        fs.writeFileSync(file, text);
        console.log(`  rewrote refs: ${path.relative(ROOT, file)}`);
      }
    });
  }
}

function walkFiles(dir, cb) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(abs, cb);
    else cb(abs);
  }
}

function main() {
  const renames = [];
  normalizeTree(IMG_DIR, renames);

  if (renames.length === 0) {
    console.log("✓ asset names already build-safe");
    return;
  }

  rewriteReferences(renames);
  console.log(`✓ normalized ${renames.length} asset name(s)`);
}

main();
