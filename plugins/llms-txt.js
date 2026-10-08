/**
 * Emits /llms.txt and /llms-full.txt (https://llmstxt.org) into the build
 * output, so AI assistants and agents can read the Help Center as clean
 * Markdown instead of scraping rendered HTML.
 *
 * - llms.txt       index: one link + description per doc, grouped by sidebar
 *                  category, followed by the "What's New" posts.
 * - llms-full.txt  every doc and post inlined, in sidebar order.
 *
 * It runs in `postBuild`, after Docusaurus has resolved the sidebar, the
 * permalinks and the draft/unlisted flags, so the files follow the site
 * exactly: no second copy of the ordering rules to keep in sync. No-op in
 * `docusaurus start` (postBuild only runs on build).
 */

const fs = require("node:fs/promises");
const path = require("node:path");

const DOCS_PLUGIN = "docusaurus-plugin-content-docs";
const BLOG_PLUGIN = "docusaurus-plugin-content-blog";

const SUMMARY =
  "frndOS is an AI-powered platform for brands and agencies: brand setup " +
  "(Brand IQ), creative tools (KV Generator, Resizer), Insights, audience " +
  "research, AskFrnd (an AI assistant with brand context), decks, projects " +
  "and collaboration. This Help Center explains how to use every module.";

/** Split Markdown into fenced-code and prose segments, so only prose is rewritten. */
function mapProse(markdown, fn) {
  const parts = markdown.split(/(^```[^\n]*\n[\s\S]*?^```[ \t]*$)/m);
  return parts.map((part, i) => (i % 2 === 1 ? part : fn(part))).join("");
}

/** Turn an MDX doc/post body into plain Markdown with absolute links. */
function toPlainMarkdown(raw, { siteUrl, permalink }) {
  const pageUrl = `${siteUrl}${permalink}`;
  const absolute = (href) => {
    // In-page anchors are resolved too: in llms-full.txt every page shares one file.
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
    const url = new URL(href, pageUrl);
    url.pathname = url.pathname.replace(/\.mdx?$/, "");
    return url.toString();
  };

  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, "");

  return mapProse(body, (text) =>
    text
      // MDX module syntax and comments
      .replace(/^(?:import|export)\s.*$/gm, "")
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      // Images: keep the alt text, drop the picture
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, (_, alt) =>
        alt.trim() ? `[Image: ${alt.trim()}]` : "",
      )
      // Links: resolve relative / root-relative targets against the page
      .replace(/(?<!!)\[([^\]]*)\]\(([^)\s]+)((?:\s+"[^"]*")?)\)/g, (_, label, href, title) =>
        `[${label}](${absolute(href)}${title})`,
      )
      // Admonitions: ":::info Title" → bold label, closing ":::" dropped
      .replace(/^:::(\w+)[ \t]*(.*)$/gm, (_, type, title) => {
        const kind = type.charAt(0).toUpperCase() + type.slice(1);
        return title.trim() ? `**${kind}: ${title.trim()}**` : `**${kind}:**`;
      })
      .replace(/^:::[ \t]*$/gm, ""),
  )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Prefix the page with its title (unless the body already opens with an H1) and source URL. */
function pageBlock({ title, url, markdown }) {
  const hasH1 = /^#\s/.test(markdown);
  const heading = hasH1 ? "" : `# ${title}\n\n`;
  const body = hasH1
    ? markdown.replace(/^(#\s.*)$/m, `$1\n\nSource: ${url}`)
    : `Source: ${url}\n\n${markdown}`;
  return `${heading}${body}`;
}

const linkLine = ({ title, url, description }) =>
  `- [${title}](${url})${description ? `: ${description}` : ""}`;

module.exports = function llmsTxtPlugin(context) {
  return {
    name: "llms-txt",

    async postBuild({ plugins, outDir, siteConfig, siteDir }) {
      const siteUrl = siteConfig.url.replace(/\/$/, "");
      const docsPlugin = plugins.find((p) => p.name === DOCS_PLUGIN);
      const blogPlugin = plugins.find((p) => p.name === BLOG_PLUGIN);
      const version = docsPlugin.content.loadedVersions[0];

      const docsById = new Map(
        version.docs
          .filter((doc) => !doc.unlisted && !doc.draft)
          .map((doc) => [doc.id, doc]),
      );

      const readDoc = async (doc) => {
        const file = path.join(siteDir, doc.source.replace(/^@site\//, ""));
        const raw = await fs.readFile(file, "utf8");
        const url = `${siteUrl}${doc.permalink}`;
        return {
          title: doc.title,
          url,
          description: doc.description,
          markdown: toPlainMarkdown(raw, { siteUrl, permalink: doc.permalink }),
        };
      };

      // Sidebar → sections. Top-level docs collect under "Overview".
      const sections = [];
      const overview = { label: "Overview", description: "", pages: [] };
      const walk = async (items, section) => {
        for (const item of items) {
          if (item.type === "doc" && docsById.has(item.id)) {
            section.pages.push(await readDoc(docsById.get(item.id)));
          } else if (item.type === "category") {
            const child = {
              label: item.label,
              description: item.link?.description ?? "",
              pages: [],
            };
            sections.push(child);
            await walk(item.items, child);
          }
        }
      };
      for (const sidebar of Object.values(version.sidebars)) {
        await walk(sidebar, overview);
      }
      if (overview.pages.length) sections.unshift(overview);
      const nonEmpty = sections.filter((s) => s.pages.length);

      const posts = (blogPlugin?.content.blogPosts ?? [])
        .filter((post) => !post.metadata.unlisted)
        .map((post) => {
          const { title, permalink, description, date } = post.metadata;
          const day = new Date(date).toISOString().slice(0, 10);
          return {
            title: `${title} (${day})`,
            url: `${siteUrl}${permalink}`,
            description,
            markdown: toPlainMarkdown(post.content, { siteUrl, permalink }),
          };
        });

      const intro = [
        `# frndOS ${siteConfig.title}`,
        "",
        `> ${SUMMARY}`,
        "",
        `Product site: https://frndos.com. Full text of every page below: ${siteUrl}/llms-full.txt`,
      ].join("\n");

      const index = [
        intro,
        ...nonEmpty.map((s) =>
          [`## ${s.label}`, s.description && `\n${s.description}\n`, ...s.pages.map(linkLine)]
            .filter(Boolean)
            .join("\n"),
        ),
        posts.length && [`## What's New`, ...posts.map(linkLine)].join("\n"),
      ]
        .filter(Boolean)
        .join("\n\n");

      const full = [
        intro,
        ...nonEmpty.flatMap((s) => s.pages.map(pageBlock)),
        ...posts.map(pageBlock),
      ].join("\n\n---\n\n");

      await fs.writeFile(path.join(outDir, "llms.txt"), `${index}\n`);
      await fs.writeFile(path.join(outDir, "llms-full.txt"), `${full}\n`);

      const pageCount = nonEmpty.reduce((n, s) => n + s.pages.length, 0);
      console.log(
        `[llms-txt] wrote llms.txt + llms-full.txt (${pageCount} docs, ${posts.length} posts)`,
      );
    },
  };
};

module.exports.toPlainMarkdown = toPlainMarkdown;
