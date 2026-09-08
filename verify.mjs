/**
 * Tina rich-text parse check.
 *
 * The body of every doc/blog/newsletter/page is a TinaCMS `rich-text` field,
 * parsed by `@tinacms/mdx` (MDX v3). If a body fails that parser, Tina shows
 * "Unable to parse rich-text" and the whole article becomes unviewable and
 * uneditable in the /admin editor — even though `docusaurus build` passes.
 *
 * Known constructs Docusaurus accepts but Tina rejects:
 *   - HTML comments        <!-- ... -->    (Docusaurus only survives these via
 *                                           @slorber/remark-comment; Tina has none)
 *   - MDX expressions      {/* ... *​/}      and  ## Heading {#anchor}
 *   - A list nested inside a blockquote:  > - item
 *
 * Run: node verify.mjs      (exits 1 if any body is broken)
 */
import { parseMDX } from "@tinacms/mdx";
import fs from "fs";
import path from "path";

const ROOTS = ["docs", "blog", "newsletter", "src/pages"];
const FIELD = { type: "rich-text", name: "body", templates: [] };

const walk = (dir, acc = []) => {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (p.endsWith(".mdx")) acc.push(p);
  }
  return acc;
};

let broken = 0;
let ok = 0;

for (const file of ROOTS.flatMap((r) => walk(r)).sort()) {
  const body = fs
    .readFileSync(file, "utf8")
    .replace(/^---\n[\s\S]*?\n---\n/, "");
  const parsed = parseMDX(body, FIELD, (s) => s);
  const bad = (parsed.children || []).find((n) => n.type === "invalid_markdown");
  if (bad) {
    broken++;
    console.log(`BROKEN  ${file}\n        ${(bad.message || "").split("\n")[0]}`);
  } else {
    ok++;
  }
}

console.log(`\nTINA PARSE: ok=${ok} broken=${broken}`);
process.exit(broken ? 1 : 0);
