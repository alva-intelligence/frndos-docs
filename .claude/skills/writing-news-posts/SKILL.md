---
name: writing-news-posts
description: Use when the user wants a news / announcement / "What's New" post on the Help Center /blog page in frndos-docs, e.g. "buatkan news untuk rilis X", "announce fitur Y", "tulis blog post product update", or hands over a Lark release note or brief to turn into a /blog article.
metadata:
  author: claude
  version: "1.0.0"
---

# Writing News Posts for /blog

## Overview

A **news post** is a `blog/*.mdx` entry in the Tina `post` collection ("What's New (Changelog)"). It announces what shipped: user-facing, upbeat, short. It is not a guide. How-to steps live in `docs/` and the post links to them.

Two contracts make a post shippable, and both are checked by a script, not by eye:

1. **Grounded.** The brief (Lark doc, pasted notes, a `*-release-docs.track.md`) says what to announce. `frnd-web` proves it is real and live. A feature that is not live is not news.
2. **Tina-editable.** Content authors edit posts at `/admin`. Every frontmatter key must be a field of the `post` collection, and the body must parse in `@tinacms/mdx`. One bad construct (an HTML comment, a truncate marker) makes the whole post `Unable to parse rich-text`.

**REQUIRED BACKGROUND:** `writing-help-docs-from-code` (sibling skill) owns reading Lark docs (its step 0), the liveness gate (step 1.5), and the em dash punctuation contract (step 6). This skill points at those; read them there.

## Workflow

### 1. Read the brief

- **Lark URL** → read it via the `lark` MCP server exactly as in `writing-help-docs-from-code` step 0. Auth wall or empty → stop and ask the user to paste it.
- **Track file / pasted text** → read it in full.
- **Keyword only** → ask the user (via `ask_user_question`) for the release brief or the date range; offer "derive from frnd-web git log" as an option.

Done when: you hold a numbered **claim list**, one line per feature the post would announce.

### 2. Verify every claim in frnd-web

For each claim: locate it in `../frnd-web`, run the liveness gate (`writing-help-docs-from-code` step 1.5, plus the PostHog flag rollout when the feature is flagged), and copy the user-visible label verbatim from the JSX.

| Verdict | Goes in the post as |
|---|---|
| Live | A section or bullet, with its real UI label |
| Flag partial / coming soon | A `## What's Next` bullet, only if the brief itself frames it as upcoming |
| Retired, 0% flag, or not found in code | Left out. List it in your report to the user |

Done when: every claim in the list carries a verdict and, for Live ones, the file path that proves it.

### 3. Check what already exists

```bash
cd ../frndos-docs
grep -ril "<keyword>" blog/ docs/ --include="*.mdx"
grep -h "^slug:" blog/*.mdx
```

- A post already announces this → update it instead of writing a second one (ask if unsure).
- For each Live feature, find the help article to link (`docs/<module>/<file>.mdx` becomes `/docs/<module>/<file>`). No article → no link; mention to the user that `/make-help-docs` can create one.

Done when: each Live feature has a link target or an explicit "no doc".

### 4. Confirm the frontmatter and outline

One `ask_user_question` call covering: title, slug, date (default `date +%F`, or the release date from the brief), author key, thumbnail, and the outline (sections in order). Recommend the `frndos-team` author and `/img/blog/frndos.webp` as the fallback thumbnail.

Done when: the user has approved all six.

### 5. Write the post

File: `blog/YYYY-MM-DD-<slug>.mdx`, same `<slug>` as the frontmatter.

```mdx
---
title: Brand Insights Goes Self-Serve
slug: brand-insights-self-serve
authors:
  - frndos-team
date: '2026-04-24'
description: Connect Paid, Owned, Earned and ATL data to Insights yourself, in minutes.
image: /img/blog/frndos.webp
tags:
  - insights
  - announcement
related_doc: docs/insights/overview.mdx
---

**Your data, your brand, your insights, on demand.**

One or two short paragraphs: what changed and why it matters to the user.

***

## What's New

**Connect Paid Media in one click.** One paragraph per feature, using the exact UI labels.

👉 [Connecting Paid Media →](/docs/insights/connecting-paid-media)

***

## Get Started

* 📖 [Insights Overview](/docs/insights/overview) — the full picture of what Insights can do
```

Shape (matches `blog/Brand-Insights-Goes-Self-Serve.mdx`): bold one-line hook → 1–2 paragraph lede → `***` → `## ` sections → optional `## What's Next` → `## Get Started` link list. Write it as news for end users: benefit first, present tense, no implementation detail, no step-by-step instructions (that is the help article's job).

#### Tina-editability contract

**Frontmatter**: only these keys, in this form:

| Key | Form |
|---|---|
| `title` | string, required |
| `slug` | kebab-case, unique across `blog/`, never changed after publish |
| `authors` | list of keys present in `blog/authors.yml` AND the `authors` options in `tina/config.jsx` AND `tina/tina-lock.json` |
| `date` | quoted `'YYYY-MM-DD'` (what Tina's date field writes) |
| `description` | one sentence, plain text, SEO only |
| `image` | `/img/...` path to a file under `static/img/` (Tina media root). New uploads go to `static/img/blog/<kebab-name>.webp` |
| `tags` | list of strings, lowercase |
| `related_doc` | `''` or `docs/<module>/<file>.mdx` (Tina reference format) |

A new author needs all three places updated in one go: `authors.yml`, `config.jsx` options, `tina-lock.json` options (same order). A stale lock fails the Vercel build.

**Body**: build it from `##`/`###` headings, paragraphs, `**bold**`, `_italic_`, `*` bullet lists, numbered lists, links, images `![alt](/img/blog/x.webp)`, tables, `***` rules, blockquotes with plain paragraphs, and the registered blocks below. Everything else is out, and these specifically break Tina:

| Block | Form |
|---|---|
| Callout | `<Admonition type="tip" title="...">...</Admonition>` |
| Uploaded video | `<Video src="/img/blog/<kebab-name>.mp4" poster="/img/blog/<still>.webp" caption="..." />`. `.mp4`/`.webm` under `static/img/` (git, Tina limit 100 MB); `poster` and `caption` optional. You cannot produce the file: if the user has none, add a 🎬 video row to `DOCS_TODO.md` and leave the block out |
| S3 video | `<S3Video url="https://<bucket>.s3.<region>.amazonaws.com/<key>.mp4" poster="/img/blog/<still>.webp" caption="..." />`. Public https object on S3 or CloudFront, `.mp4`/`.webm`. Use the URL the user gives, never a pre-signed one (`X-Amz-Signature` expires) |
| YouTube | `<YouTube url="https://www.youtube.com/watch?v=..." title="..." caption="..." />`. Preferred for anything long |

Only the props listed above: an extra prop fails Tina's parse, and a lowercase `<video>` / `<iframe>` becomes an uneditable HTML blob.

- `<!-- truncate -->` and `{/* truncate */}`: the /blog list shows the full post instead, accepted trade-off
- any HTML comment or `{/* ... */}`, so TODOs go to `DOCS_TODO.md`
- `## Heading {#id}`, `import`/`export`, raw HTML, `:::tip` fences, unregistered JSX
- a list inside a blockquote

Links are absolute site paths (`/docs/...`, `/blog/<slug>`), never relative. Punctuation follows the em dash contract in `writing-help-docs-from-code` step 6 (budget 3 prose em dashes); the checker counts it.

### 6. Validate

```bash
cd ../frndos-docs
node .claude/skills/writing-news-posts/check-post.mjs blog/<file>.mdx   # errors=0
node verify.mjs                                                          # broken=0
npm run build-local          # or, if a dev server holds the Tina ports:
NODE_OPTIONS=--max-old-space-size=8192 npx docusaurus build
```

`check-post.mjs` covers frontmatter vs the Tina schema, author keys in all three places, date format, image file, `related_doc`, Tina body parse against the real `post` templates, raw HTML, `<Video>`/`<S3Video>`/`<YouTube>` props and files (S3 URLs get an anonymous HEAD: must be 200 + `video/*`), truncate/TODO/`{#`, internal link targets, and the em dash budget. Fix every ERROR and rerun. The build must reach `Generated static files` with no broken links, and `build/blog/<slug>/index.html` must exist.

Done when: all three commands are green on the final file.

### 7. Ledger and report

- Placeholder thumbnail, missing screenshot, or a claim that needs live-UI confirmation → add a row to `DOCS_TODO.md` under a `## What's New (blog)` section at the end (`### blog/<file>.mdx — <title>`, same table columns, refresh `_Last updated:_`).
- Report to the user: the file path, the URL `/blog/<slug>`, which claims were dropped and why, and which features have no help article yet.
- No git operations unless asked. The user publishes with `npm run publish`.

## Red Flags

| Thought | Reality |
|---|---|
| "The brief says it shipped, no need to check code" | Briefs list flagged and half-shipped work. Liveness gate per claim. |
| "A truncate marker gives a nicer /blog list" | It makes the post uneditable in Tina. Leave it out. |
| "I'll add a `summary:` / `hero:` field" | Unknown keys are silently dropped on the next `/admin` save. Only schema fields. |
| "New author key is just a line in authors.yml" | Tina's select won't offer it and the lock goes stale. Three places. |
| "Docusaurus build passed, so it's editable" | The build ignores Tina. `check-post.mjs` and `verify.mjs` prove editability. |
| "I'll explain how to use it step by step" | That is a help article. Link to it. |
