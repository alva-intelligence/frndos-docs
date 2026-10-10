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
- **Keyword only** → ask the user (via `ask_user_question`) for the release brief or the date range; offer "derive from frnd-web git log" as an option (the log of `origin/production`, not `develop`).

Done when: you hold a numbered **claim list**, one line per feature the post would announce.

### 2. Verify every claim in frnd-web

Read the **production branch**, exactly as in `writing-help-docs-from-code` ("Read the Production Branch, Never the Working Tree"): `git fetch -q origin production`, then `git grep` / `git show` against `origin/production`. Never the local checkout (usually `develop`, ahead of what customers have), and never `git checkout`.

For each claim: locate it on `origin/production` of `../frnd-web` (and `../frnd-api-php` for business rules), run the liveness gate (`writing-help-docs-from-code` step 1.5, plus the PostHog flag rollout when the feature is flagged), and copy the user-visible label verbatim from the production JSX. A claim whose commit isn't in production (`git merge-base --is-ancestor <sha> origin/production` fails) is not released, whatever the brief says.

| Verdict | Goes in the post as |
|---|---|
| Live | A section or bullet, with its real UI label |
| Flag partial / coming soon | A `## What's Next` bullet, only if the brief itself frames it as upcoming |
| Retired, 0% flag, or not found in code | Left out. List it in your report to the user |
| Only on `develop`, not on `origin/production` | Left out. List it in your report as not released yet |

Done when: every claim in the list carries a verdict and, for Live ones, the production file path that proves it (`origin/production:<path>`).

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

One `ask_user_question` call covering: title, slug, date (default `date +%F`, or the release date from the brief), author key, thumbnail, and the outline (sections in order). Recommend the `frndos-team` author. Thumbnail: an image from the brief or the user (uploaded in step 4.6), else `/img/blog/frndos.webp` as the fallback.

Done when: the user has approved all six.

### 4.5 Video to S3

The monthly Lark release doc ("FRNDOS Product Update — <Month YYYY>") already carries the recap video as a file block. Do not ask the user for a video that is in the brief. A video the user points at on their device (`/Users/.../clip.mov`) goes through the same script:

```bash
# the slug approved in step 4
node .claude/skills/writing-news-posts/news-video.mjs "<lark doc URL>" <slug>
node .claude/skills/writing-news-posts/news-video.mjs --file "<local path>" <slug> [--caption "..."]
```

It fetches the video into the OS temp dir (never into the repo), makes it a browser-safe MP4 (H.264/AAC is re-muxed with `+faststart`, anything else such as HEVC `.mov` is re-encoded), uploads it to `s3://frnd/frndos-update/<slug>.mp4` with ACL `public-read`, proves the public URL with an anonymous HEAD, and prints the `<S3Video>` block. Convention, as in `blog/2026-10-06-frndos-october-2026.mdx`: caption `frndos update <month> <yyyy>`; pass `--caption` for non-monthly posts.

- **Credentials:** `FRNDOS_NEWS_S3_KEY_ID` / `FRNDOS_NEWS_S3_SECRET` in the environment or `frndos-docs/.env` (gitignored). The IAM user must be scoped by `s3-uploader-policy.json` (PutObject + PutObjectAcl on `frnd/frndos-update/*` only). Never borrow the `frnd-api-php` AWS key.
- **No credentials** → the script still prepares the file and prints `upload MANUAL`: hand the user the file path and key, wait until they confirm the upload (public-read, `video/mp4`).
- **Key already exists** → the script refuses. Pick another slug, or pass `--force` only when the user confirmed replacing the live video.
- **Over 50 MB** warns, **over 200 MB** refuses: use `<YouTube>` instead.
- Nobody can upload yet → leave the block out and add a 🎬 row to `DOCS_TODO.md`. Don't commit the file to `static/img/` instead: release videos are ~20 MB a month and the checker warns above 20 MB.
- No video block in the doc and no file from the user → fall back to the existing rule (ask, or 🎬 row).

Done when: the post has a working `<S3Video>` block, or a 🎬 row explains why not.

### 4.6 Images to S3

Same approach as 4.5, for the thumbnail and body images. Images in the Lark doc and image paths the user gives (`/Users/.../screen.png`, `.heic` from a phone) are uploaded, never committed:

```bash
# Lark doc images, numbered 1..N in document order, plus local files after them
node .claude/skills/writing-news-posts/news-image.mjs "<lark doc URL>" <slug> [--file "<path>"]... [--thumbnail <path | N>]
# local files only
node .claude/skills/writing-news-posts/news-image.mjs <slug> --file a.png --file b.jpg --thumbnail cover.png
```

- **Processing:** stills become WebP (q 82, max 1600 px wide); animated GIFs stay GIF. HEIC goes through macOS `sips`. The thumbnail is cropped to 16:9 (1280x720).
- **Keys:** `frndos-update/img/<slug>-thumb.webp` and `frndos-update/img/<slug>-<n>.webp` (or `.gif`), public-read. Same credentials and IAM policy as 4.5 (`frndos-update/*` already covers `img/`).
- **Output:** per image, an `image: <url>` line (thumbnail) or `![alt](<url>)` line (body). Lark images print the nearest heading so you know which section each belongs to; drop the ones that don't fit the outline, and rewrite the alt text into a short description.
- **Thumbnail:** `--thumbnail N` reuses body image N; `--thumbnail <path>` uses a separate file. No thumbnail image anywhere → keep `/img/blog/frndos.webp` and add a row to `DOCS_TODO.md`.
- Existing keys are refused (`--force` only when the user confirmed replacing live images). Over 2 MB warns, over 15 MB refuses. No credentials → files are prepared and `upload MANUAL` lines are printed, as in 4.5.
- Tina's media picker cannot browse S3: the S3 URL shows as text in the Thumbnail field, and authors replace it by pasting a URL or uploading a new `/img/` file. The RSS feed and app home list accept the absolute URL.

Done when: every image in the post is an `/img/...` file or a `frndos-update/img/` URL that `check-post.mjs` proves (HEAD 200 + `image/*`).

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
| `image` | S3 URL from step 4.6 (`https://frnd.s3.ap-southeast-3.amazonaws.com/frndos-update/img/<slug>-thumb.webp`), or an `/img/...` path to a file under `static/img/` (Tina media root), e.g. the fallback `/img/blog/frndos.webp` |
| `tags` | list of strings, lowercase |
| `related_doc` | `''` or `docs/<module>/<file>.mdx` (Tina reference format) |

A new author needs all three places updated in one go: `authors.yml`, `config.jsx` options, `tina-lock.json` options (same order). A stale lock fails the Vercel build.

**Body**: build it from `##`/`###` headings, paragraphs, `**bold**`, `_italic_`, `*` bullet lists, numbered lists, links, images `![alt](<frndos-update/img S3 URL from step 4.6>)` (or `/img/...`), tables, `***` rules, blockquotes with plain paragraphs, and the registered blocks below. Everything else is out, and these specifically break Tina:

| Block | Form |
|---|---|
| Callout | `<Admonition type="tip" title="...">...</Admonition>` |
| Uploaded video | `<Video src="/img/blog/<kebab-name>.mp4" poster="/img/blog/<still>.webp" caption="..." />`. `.mp4`/`.webm` under `static/img/` (git, Tina limit 100 MB); `poster` and `caption` optional. You cannot produce the file: if the user has none, add a 🎬 video row to `DOCS_TODO.md` and leave the block out |
| S3 video | `<S3Video url="https://<bucket>.s3.<region>.amazonaws.com/<key>.mp4" poster="/img/blog/<still>.webp" caption="..." />`. Public https object on S3 or CloudFront, `.mp4`/`.webm`. Use the URL from step 4.5 (or one the user gives), never a pre-signed one (`X-Amz-Signature` expires) |
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

`check-post.mjs` covers frontmatter vs the Tina schema, author keys in all three places, date format, thumbnail (`/img/` file or `frndos-update/img/` S3 URL), `related_doc`, Tina body parse against the real `post` templates, raw HTML, `<Video>`/`<S3Video>`/`<YouTube>` props and files and S3 body images (S3 URLs get an anonymous HEAD: must be 200 + `video/*` or `image/*`), truncate/TODO/`{#`, internal link targets, and the em dash budget. Fix every ERROR and rerun. The build must reach `Generated static files` with no broken links, and `build/blog/<slug>/index.html` must exist.

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
