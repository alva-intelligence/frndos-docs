---
title: October 2026 Release — Help Center Docs Coverage
created: 2026-10-06
source: https://fcn.sg.larksuite.com/wiki/FAgHwVPCwiskVFkVB1SlddN4gGd
---

# October 2026 Release — Docs Coverage Track

Daftar semua fitur dari "FRNDOS Product Update — October 2026" (Lark wiki) dan status dokumentasinya di Help Center (`frndos-docs/docs/`). Semua klaim diverifikasi ke `frnd-web` `origin/develop` (`c4f88d386`), plus `frnd-api-php` / `frnd-ai-services` untuk aturan bisnis. Liveness dicek via PostHog flag (production).

| # | Fitur | Kategori | Module | Status | Doc |
|---|-------|----------|--------|--------|-----|
| 1 | **Story: writing mode** (satu halaman, add/move/remove card + undo) | ✨ New | `decks` | ✅ Done | `docs/decks/story-view.mdx` (rewrite) |
| 2 | **Story: AI talk tracks** (slide di samping tiap talk track) | ✨ New | `decks` | ✅ Done | `docs/decks/story-view.mdx` — "Ask FRND Drafts Your Talk Tracks" |
| 3 | **Story: build a slide per card** (hanya figure yang disebut card) | ✨ New | `decks` | ✅ Done | `docs/decks/story-view.mdx` — "Building a Slide for a Card" |
| 4 | **Story: chapter menu + quick peek** | ✨ New | `decks` | ✅ Done | `docs/decks/story-view.mdx` — "The Page", "Peeking at a Slide" |
| 5 | **Story: Bridge, Still follows?** | ⏳ Not yet | `decks` | ⏭️ Skip | `show-story-suggest` = 0% di production. Jangan didokumentasikan sampai flag on |
| 6 | **KV approval requests** (satu request, keputusan per artboard) | ✨ New | `collaboration` | ✅ Done | `docs/collaboration/client-approvals.mdx` — "Approving Key Visual Artboards" |
| 7 | **KV approvals: pins & notes** | ✨ New | `collaboration` | ✅ Done | idem — "What the Client Sees" |
| 8 | **KV approvals: email check** (kode 6 digit, pins sebelumnya tetap dihitung) | ✨ New | `collaboration` | ✅ Done | idem — "The Email Check" |
| 9 | **KV approvals: previews, digest, withdraw** | ✨ New | `collaboration` | ✅ Done | idem — "Following the Request in frndOS"; `docs/studio/sharing-with-clients.mdx` (Active links → View links + cross-link) |
| 10 | **Scorecard Parts** (confirm, score per part, re-score satu part) | ✨ New | `research` | ✅ Done | `docs/research/proposal-scorecard.mdx` (rewrite: review types, Strategy axis, parts) |
| 11 | **One scorecard report** (share link, PDF, slides) | ✨ New | `research` | ✅ Done | `docs/research/scorecard-report-and-rubric.mdx` (baru) |
| 12 | **Scorecard easy setup** (rubric dalam menit) | ✨ New | `research` | ✅ Done | `docs/research/scorecard-report-and-rubric.mdx` — "Setting the Rubric" |
| 13 | **AskFRND: build a workflow in chat** | ✨ New | `early-access` | ✅ Done | `docs/early-access/workflows.mdx` — "Building a Workflow in Chat"; `docs/askfrnd/overview.mdx` |
| 14 | **AskFRND: one-click tool activation** | ✨ New | `askfrnd` | ✅ Done | `docs/askfrnd/tools.mdx` — "Turning a Tool On From the Chat" |
| 15 | **AskFRND: rich answers for everyone** | ✨ New | `askfrnd` | ✅ Done | `docs/askfrnd/overview.mdx` — "Rich Answers" |
| 16 | **Home: calmer layout, Today, Continue working, instant briefing** | 🔄 Changed | `getting-started` | ✅ Done | `docs/getting-started/navigating-frndos.mdx` — "Home" (rewrite) |
| 17 | **Look: type & colour, calmer notices** (Pillars → Modules) | 🔄 Changed | `getting-started` | ✅ Done | `docs/getting-started/navigating-frndos.mdx` — sidebar table, Pillars, Appearance |
| 18 | **Tasks: friendlier list/board/toolbar + Sync now** | 🔄 Changed | `workspace` | ✅ Done | `docs/workspace/tasks.mdx` |
| 19 | **Calendar: fresher data, clearer states, Sync now** | 🔄 Changed | `workspace` | ✅ Done | `docs/workspace/calendar.mdx` (baru — belum ada doc Calendar sebelumnya) |
| 20 | **Studio → Canvas** di sisa layar | 🔄 Changed | `studio`, `library`, `decks` | ✅ Done | create menu / Files type / live data blocks: `navigating-frndos`, `library/overview`, `studio/overview`, `studio/kv-generator`, `decks/live-data-blocks`, `decks/overview`, `workspace/inviting-team-members` (role editor) |
| 21 | **Empty Trash per brand** | ⚡ Improved | `library` | ✅ Done | `docs/library/overview.mdx` — "Trash" + FAQ |
| 22 | **Duplicate KV copies boards, sizes, motion** | ⚡ Improved | `library` | ✅ Done | `docs/library/overview.mdx` — File Actions + FAQ |
| 23 | **AI Chat credits ke brand chat dimulai + tabel refresh** | ⚡ Improved | `workspace` | ✅ Done | `docs/workspace/managing-credits.mdx` |
| 24 | **Motion resize keeps every size** | 🔧 Fixed | `studio` | ✅ Done | `docs/studio/motion-mode.mdx` — "Resyncing After Editing the KV" |
| 25 | **Deck thumbnails blank, fast typing drops keys, light-mode link chips** | 🔧 Fixed | `decks`, `askfrnd` | ✅ Done | FAQ: `docs/decks/overview.mdx` (thumbnails, frnd-web #848), `docs/decks/story-view.mdx` (fast typing, #879), `docs/askfrnd/overview.mdx` (link chips Daylight, #831) |

## Notes

- **Story (5):** `show-story-suggest` fail-closed, 0% di PostHog production. Lark juga menandai "Not yet available".
- **KV approvals (6–9):** `show-client-lane` 100% → note "Experimental per workspace" di `client-approvals.mdx` dihapus.
- **Scorecard (10–12):** axis "Fit" sekarang tampil sebagai **Strategy** di UI (`SCORECARD_AXIS_LABEL`). Doc lama di-rewrite; rubric dipindah ke doc baru. `sidebar_position` survey docs digeser +1.
- **Easy setup (12):** Lark says "or ask AskFRND to build it for you". AskFRND has no rubric tool in the code (only `launch_study`, `get_study_findings`, `build_scorecard_report`, `confirm_scorecard_parts`), so the doc reads it as "AskFRND runs the scorecard / builds the report". The FAQ states plainly that the rubric is set in Settings. If PM means a rubric builder in chat, it isn't in develop yet.
- **Calendar (19):** `show-calendar-web` 100%. "Calendars on this Mac" tidak didokumentasikan (lihat `DOCS_TODO.md`).
- **Out of Lark scope, ikut diperbaiki:** `studio/overview.mdx` "Move file…" kembali ada di file menu canvas (frnd-web #821).
- Screenshot & konfirmasi live UI: lihat `DOCS_TODO.md`.
