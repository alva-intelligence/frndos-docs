---
name: writing-help-docs-from-code
description: Use when the user gives a frndOS feature keyword (e.g. "research surveys", "kv generator") or a Lark release note / wiki URL (e.g. "buatkan docs dari release note ini", "mulai dari section changed") and wants Help Center guides in frndos-docs created or updated. Every claim is verified on origin/production of frnd-web and frnd-api-php (never the local checkout), feature-flagged or unfound items are skipped and reported instead of guessed, and the result is validated with a build and the Tina parse check.
metadata:
  author: claude
  version: "1.1.0"
---

# Writing Help Center Docs from Code

Turn a **feature keyword** or a **release note** into accurate end-user guides (`frndos-docs/docs/<module>/*.mdx`) by reading real behavior from code.

**Core principle: every sentence must trace to code on `origin/production`. What you cannot trace is skipped and reported, or recorded in `DOCS_TODO.md`. A guessed button, step, or message is the one failure this skill exists to prevent.**

Sources of truth, in order:
1. **`frnd-web`** (`../frnd-web`): routes, UI labels, buttons, gating.
2. **`frnd-api-php`** (`../frnd-api-php`): business rules, limits, validation messages, schedules.
3. **Other repos** (`../frnd-clickhouse-api`, `../frnd-ai-services`) only when a change lives there (see Release notes).

Third-party iframes (e.g. the Populix survey builder) stop at "open the iframe". Their inner steps are in no repo: ledger row, never prose.

## Read production, never the working tree

The Help Center describes what customers have today. The checkout is usually `develop`, which runs ahead. Fetch, then read through git without checking anything out:

```bash
git -C ../frnd-web fetch -q origin production
git -C ../frnd-api-php fetch -q origin production
P=origin/production
git -C ../frnd-web log -1 --format='%h %ad' --date=short $P          # record in the report
git -C ../frnd-web grep -n "<label>" $P -- src                        # search
git -C ../frnd-web show "$P:src/components/<path>.tsx"                # read
git -C ../frnd-web ls-tree -r --name-only $P -- "src/app/(dashboard)" | grep -i "<keyword>"
```

- A file missing from production (`git cat-file -e "$P:<path>"` fails) is unreleased. Search with `git grep` first, since functions move.
- A commit not in production (`git merge-base --is-ancestor <sha> $P` fails) is unreleased, whatever a note or commit message says.
- Production wins over `develop`. Never `checkout`, `switch`, `pull` or `reset` in these repos.
- A repo with no `production` branch (`frnd-ai-services`, `frnd-clickhouse-api`): list its remote branches, test the commit against each (`git merge-base --is-ancestor <sha> origin/<branch>`), name the branch you used, and say in the report that it is not confirmed as deployed. Write the fix only with that caveat, or ask.
- Branch is not deploy. `origin/production` is the best evidence, not proof.

If you catch yourself running `grep`/`cat` on `../frnd-web/src`, stop: that reads the checkout.

## Reading a release note (Lark)

Lark docs are auth-gated. Use the `lark` MCP server, not a web fetch.

1. For a `/wiki/<token>` URL, resolve it: `lark_wiki_v2_space_getNode` with `params: { token }`, `useUAT: true`, then take `obj_token`. A `/docx/<id>` URL gives the id directly.
2. Read it: `lark_docx_v1_document_rawContent` with `path: { document_id }`, `useUAT: true`.
3. Empty, permission error, or login page means the read failed. Stop and ask the user to share or paste the content. Never rebuild a note from the URL slug or memory.

The note is a **navigation map**, not a source. Its wording ("Waiting", "Add a label in the cell") may differ from the code. The doc uses the code's label.

**Walk the note item by item.** Scope to the sections the user names ("mulai dari section changed" means Changed, then Improved, then Fixed, then New, unless told otherwise). Keep a status table and report it at the end of every turn: item, doc file, status (written / already covered / skipped with reason).

Locate each item by searching commit history, then confirm in code:

```bash
for r in frnd-web frnd-api-php frnd-clickhouse-api; do
  git -C ../$r log origin/<branch> --since=<note month start> --format='%h %ad %s' --date=short | grep -iE "<keywords>"
done
git -C ../frnd-web show --stat --format='%h %s%n%b' <sha>      # what the change really touched
```

Skip, and say why, when an item is:
- **Visual only** (the diff restyles colors, sizes, layout and adds no label or behavior).
- **Backend or invisible** (fonts self-hosted, internal retries) with no user-facing effect, unless the user asks for a one-line mention.
- **Behind a flag that is not confirmed on** (see step 1.5), or listed in the note's "ready but not switched on" section.
- **Not found** in any repo after a wider search (other repos, other keywords). Report the search; do not guess.
- **Already covered** by an existing doc: add only the delta.

Take a few turns per batch: when the note is large, ask via `ask_user_question` which sections or groups to do first, and do exactly those.

## Workflow

### 1. Locate the feature

```bash
git ls-tree -r -d --name-only $P -- "src/app/(dashboard)" | grep -i "<keyword>"
git grep -il "<keyword>" $P -- "src/*.tsx" "src/*.ts"
git grep -n "<keyword>" $P -- src/services src/types src/lib/featureFlags
```

Done when you can name the production files that render the feature.

### 1.5. Liveness gate (before writing anything)

Code existing is not the feature shipped. Check all three:

```bash
git cat-file -e "$P:src/app/(dashboard)/<feature-path>/page.tsx" && echo in-prod || echo "NOT in production"
git grep -n "redirect(" $P -- "src/app/(dashboard)/<feature-path>/layout.tsx" "src/app/(dashboard)/<feature-path>/page.tsx"
git grep -n -A12 "<keyword>" $P -- src/lib/tool-registry.ts      # isLive:false / isComingSoon
```

**Feature flags.** Search the keyword in production's `src/lib/featureFlags/` and read three things: the flag key, its hook (fail-open kill switch, or `value === true`, and whether dev/staging force it on), and where the flag gates the UI. Gate by branch: a control rendered in both flag branches is safe to document; one rendered only when the flag is on is not. Then read the rollout in PostHog production. If the PostHog tool errors or you cannot read the rollout, the rollout is **unknown**: do not write the feature as live. Report it and ask the user (`ask_user_question`) whether to write it with a "rolling out gradually" caveat or skip it.

| State | Signal | Action |
|---|---|---|
| Live | renders, no redirect, flag on or ungated | document |
| Coming soon | `isComingSoon: true` | list in an overview table only |
| Retired / disabled / flag-gated unknown | redirect, `isLive: false`, unconfirmed flag | stop, report, ask |

Done when every item is classified, and each classification cites the evidence.

### 1.6. Check existing docs

```bash
find docs/ -name "*<keyword>*"; grep -ril "<keyword>" docs/ --include="*.mdx"
```

Existing coverage means **update that file** (read it fully first; it is also your voice pattern). Create a new file only when nothing covers it, or an update would bloat a single-topic file. Done when you can say update-or-create per item.

### 2. Read behavior from code (facts only)

Extract verbatim from production: titles, menu path and URL, button/tab/column labels, prerequisites and gating (permission hooks, credit hooks, flags), status values, entry points (check each resolves, not redirects), and the conditions that gate each action. Business rules (limits, validation messages, schedules) come from `frnd-api-php` production.

Copy labels exactly, including Bahasa Indonesia ones. Then verify every label you quoted:

```bash
git -C ../frnd-web grep -lF "<exact label>" origin/production -- src \
  ':!*.test.*' ':!*.stories.*' ':!src/wireframes'      # must print a product file
```

Done when every quoted string prints a product file. A string only in tests, stories, wireframes, or `develop` is unshipped: remove the sentence.

**Quote only what the user sees.** An API message string is not proof it reaches the UI; describe the behavior in your own words instead of quoting it. State a number or limit only when you read it in code, and avoid exact figures that change often (rate limits).

### 3. Classify: readable vs unknown

- Readable from code: write it as fact.
- Third-party iframe or not in any repo: `DOCS_TODO.md` row.
- Screenshots (`/img/guides-asset/<name>.jpeg`): you cannot make them; `📸` row in `DOCS_TODO.md`.

**Never put a TODO marker in an `.mdx` body, in any form** (`_[TODO]_`, `<!-- -->`, `{/* */}`). Visible markers leak to the public page. Comments invalidate the whole body for the TinaCMS rich-text parser, making the article unviewable and uneditable at `/admin`. Write the honest sentence about what varies, and put the task in `DOCS_TODO.md`, keyed by section heading (not line number):

```md
### `docs/askfrnd/tools.mdx` — How AskFrnd Uses Tools

| Section | Type | What to do |
|---|---|---|
| Connecting an AI app | ✍️ confirm from live UI | confirm the exact menu path per AI app, then add a per-app list here |
```

Also avoid constructs Tina rejects though Docusaurus accepts them: explicit heading ids (`## Heading {#anchor}`) and a list nested inside a blockquote.

### 4. Study the pattern

Read a mature neighbor in the same module (`docs/studio/overview.mdx`, `docs/insights/overview.mdx`). House pattern: frontmatter (`title`, `description`, `sidebar_position`), bold intro, `## Before You Start` (numbered ✅), `## Step N —` sections, `> **Heads-up:**`, `## FAQ` (bold **Q:**), `---`, `## Next Steps` / `## Related Articles` with relative links.

### 5. Structure and placement

Propose the file list (fact vs ledger) and let the user pick the split. Then decide module placement and say why. **Pause and ask about a new pillar** when the keyword is shaped `<Grouping> -> <Feature>` or the feature is cross-cutting (beta, admin, reachable from several pillars). A new pillar needs four things in sync: `docs/<module>/`, `_category_.json` (with `position`), the option in `tina/config.jsx`, and the same option mirrored into `tina/tina-lock.json`. Missing the lock fails the Vercel build with `The local Tina schema doesn't match the remote Tina schema`, and `build-local` does not catch it. Verify order:

```bash
grep -A15 'frndOS Module' tina/config.jsx | grep -oE 'value: "[a-z-]+"'
python3 -c "
import json
d=json.load(open('tina/tina-lock.json'))
for c in d['schema']['collections']:
    if c['name']=='doc':
        for f in c['fields']:
            if f['name']=='module': print(' '.join(o['value'] for o in f['options']))"
```

Existing modules: `getting-started`, `brand-setup`, `studio`, `insights`, `research`, `askfrnd`, `growth`, `collaboration`, `projects`, `workspace`, `settings` (plus any pillar added since). Place by the user's mental area, not frnd-web's folder layout.

### 6. Write the `.mdx`

URL-safe filenames, relative cross-links, concise task-oriented voice, overview at `sidebar_position` 1.

**Em dash contract.** `—` has two structural slots: step headings (`## Step 3 — Title`) and definition rows (`* **Term** — meaning`). Everywhere else use a full stop, comma pair, parentheses, or colon; at most 3 prose dashes per article, never two in one paragraph, and the `description` frontmatter takes none. Never swap in a hyphen.

```bash
f=docs/<module>/<slug>.mdx
total=$(grep -o "—" "$f" | wc -l | tr -d ' ')
heads=$(grep -c "^#\{2,\} .*—" "$f" || true)
defs=$(grep -cE "^[[:space:]]*[*-] \*\*[^*]+\*\* —" "$f" || true)
echo "prose em dashes = $(( total - heads - defs ))   (budget: 3)"
```

If an article was already over budget before your edit, add no new prose dashes, leave the old ones, and report the count.

### 7. Links and overview

`onBrokenLinks: "throw"`. Link slugs are filenames. Confirm every target exists (`test -f docs/<module>/<slug>.mdx`) and wire new docs into `docs/<module>/overview.mdx`.

### 8. Validate (mandatory)

```bash
cd ../frndos-docs
NODE_OPTIONS=--max-old-space-size=8192 npx docusaurus build   # or npm run build-local when no dev server runs
grep -rn "TODO" docs/        # must be EMPTY
grep -rn "{#" docs/          # must be EMPTY
node verify.mjs              # must report broken=0
```

Do not kill the user's dev server; use the `npx docusaurus build` form. Re-run after every edit round, including edits that only remove a sentence. Done when the build reaches `Generated static files`, `verify.mjs` reports `broken=0`, and the em dash count is reported per touched file. A green Docusaurus build does not prove the article is editable in Tina; only `verify.mjs` does.

### 9. Update `DOCS_TODO.md`

Repo root, never under `docs/`. Reconcile it every run: keep still-open rows with their human wording, remove resolved ones, add new gaps. One section per doc file ordered by category `position` then `sidebar_position`; rows have section heading, type (📸 screenshot, ✍️ confirm-from-live-UI, 🔒 third-party/iframe) and what to do. Update `_Last updated:_` from `date +%F`. With no gaps left keep the file with "_All docs complete — no manual follow-ups._". Done when `grep -rn "TODO" docs/` is empty and the ledger matches the docs.

## Report at the end of each turn

Give: the production commits read (web and api, with dates), a table of items written (file, what), items skipped with the reason, claims you could not verify (flag rollout unknown, branch not confirmed deployed, item not found), pre-existing em dash overshoot, and the build and `verify.mjs` results. Offer the next batch.

## Honesty rules

| Rationalization | Reality |
|---|---|
| "I basically know how this works" | If you did not read it on production, you do not know it. Ledger row. |
| "The checkout is `develop`, close enough" | `develop` carries unreleased work. Use `git show` / `git grep` on `origin/production`. |
| "The note says it shipped" | A note is a claim. `merge-base --is-ancestor <sha> origin/production` is the evidence. |
| "I'll check out production to read it" | Never switch the developer's branch. |
| "The flag is probably on" | Unknown rollout means not documented as live. Report it. |
| "The note's wording is fine to quote" | The user sees the code's label. Copy that. |
| "I couldn't find it, so I'll describe it generally" | Not found means skipped and reported, with the search you ran. |
| "The API returns this message, so users see it" | Only quote what the UI renders. |
| "The iframe steps are probably X, Y, Z" | Vendor UI is in no repo. Ledger row. |
| "A TODO comment is invisible, so it's safe" | It is invisible to readers and fatal to TinaCMS. Ledger only. |
| "The build is slow, skip it" | Unvalidated links break production. Use the `npx docusaurus build` form. |
| "The dashes read fine" | The count is the check. Run it and report the number. |

## Red flags — stop

- Writing a UI step, label, limit, or message you did not read on production.
- Reading the working tree, or running `checkout`/`switch` in `frnd-web` / `frnd-api-php`.
- Acting on a Lark read that returned a login page or empty shell.
- Documenting a retired, coming-soon, or flag-gated-unknown feature as live.
- A new pillar in `tina/config.jsx` without the `tina/tina-lock.json` mirror.
- Creating a file before checking existing coverage.
- Finishing without `verify.mjs` at `broken=0`, a passing build, the em dash count, or the `DOCS_TODO.md` update.

## Notes

- No git writes in `frndos-docs` unless asked; the user runs `npm run publish`. Read-only git in `frnd-web` / `frnd-api-php` is always allowed.
- Sidebar is autogenerated from folders plus `_category_.json`; there is no sidebar file to edit.
- Never change dependencies without approval.
