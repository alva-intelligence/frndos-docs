# Docs TODO Ledger

Every outstanding `TODO` for `docs/**` — the things only a human can finish (screenshots, third-party/iframe steps, flows the code does not reveal).

**This file is the only place TODOs live.** Never put a `TODO` marker inside a `.mdx` body: `<!-- ... -->` and `{/* ... */}` both break the TinaCMS rich-text parser, which makes the whole article unviewable and uneditable in the `/admin` editor.

Sections follow the sidebar order (category `position`, then `sidebar_position`). Each row points at the **section heading** in the article, not a line number, so the ledger stays valid as articles are edited.

**Types:** 📸 screenshot · ✍️ confirm from live UI · 🔒 third-party/iframe

_Last updated: 2026-10-01_ (Studio removal reconcile: Creative Tools category, canvas file menu, Back, no-access state)

## Getting Started

### `docs/getting-started/navigating-frndos.mdx` — Navigating frndOS — The Sidebar

| Section | Type | What to do |
|---|---|---|
| Brand Sidebar | 📸 screenshot | add screenshot of the brand sidebar — brand name with Back to Workspace, Home / Files / Brand IQ rows, Pillars (Insights, Research with Beta, Audience, dimmed Growth with Soon), Projects section → /img/guides-asset/<name>.jpeg |
| Dropping a File Anywhere | 📸 screenshot | add screenshot of the drop suggestion bar — "What should frndOS do with this?" with its actions → /img/guides-asset/<name>.jpeg |
| Appearance — Choosing Light or Dark | 📸 screenshot | add screenshot of the Appearance dialog — System / Daylight / Midnight / Aurora previews → /img/guides-asset/<name>.jpeg |
| Home | 📸 screenshot | add screenshot of the redesigned Home — briefing hero with composer, Continue Working, Team activity rail, Recent Campaigns → /img/guides-asset/<name>.jpeg |
| Quick Search — Cmd+K | 📸 screenshot | add screenshot of the ⌘K palette — the zero state showing recents plus the @ / · > · ? scope hint row → /img/guides-asset/<name>.jpeg |
| Creating from the search box | 📸 screenshot | add screenshot of ⌘K with a create intent typed (e.g. "new deck") showing the Create rows, and the brand picker that follows → /img/guides-asset/<name>.jpeg |

### `docs/getting-started/your-first-brand.mdx` — Setting Up Your First Brand

| Section | Type | What to do |
|---|---|---|
| Where to Create a Brand | 📸 screenshot | add screenshot of the Add New Brand dialog — title, Fill with Smart Creation button, Brand Name / Description / Logo fields → /img/guides-asset/<name>.jpeg |
| Step 2 (optional) — Fill with Smart Creation | 📸 screenshot | add screenshot of the Smart Creation dialog — Brand Website field + Language dropdown → /img/guides-asset/<name>.jpeg |

### `docs/getting-started/myfrnd.mdx` — myFRND — Making Your Assistant More Capable

| Section | Type | What to do |
|---|---|---|
| Opening myFRND | 📸 screenshot | add screenshot of the myFRND page — heading with Experiment badge, five tabs (Discover · Plugins · Skills · Agents · Tools), Use in your AI apps button, Get started strip → /img/guides-asset/<name>.jpeg |
| Tools — What AskFRND May Use | 📸 screenshot | add screenshot of the Tools tab — "Your workspace sets the defaults · N changed by you" line, a row with the Changed tag, Reset to workspace button → /img/guides-asset/<name>.jpeg |
| Plugins — Connecting Your Tools | ✍️ confirm from live UI | confirm the full category chip list shown in your workspace — chips appear only for categories with a count (Productivity, Creative, Data & Research, Communication, CRM, Engineering are possible) |

## Brand Setup & Brand IQ

### `docs/brand-setup/brand-iq.mdx` — Brand IQ — Your Brand's Knowledge Home

| Section | Type | What to do |
|---|---|---|
| The Four Tabs | 📸 screenshot | add screenshot of the Brand IQ page — Brand Book · Sources · Templates · Business tabs, the side panel with Chapters, and the completeness chip / status / Present / Edit book in the header → /img/guides-asset/<name>.jpeg |

### `docs/brand-setup/brand-book.mdx` — The Brand Book

| Section | Type | What to do |
|---|---|---|
| Step 1 — Add what you have | 📸 screenshot | add screenshot of the setup's first step — stepper (Add sources · Reading · Questions · Look), drop zone, Brand website field, Logo files row, "No files? Talk it through with Ask FRND" → /img/guides-asset/<name>.jpeg |
| Step 2 — Reading | 📸 screenshot | add screenshot of the Reading step stopped on a file marked Not applied — "This reads as X's guideline, not Y's." with Apply anyway / Remove → /img/guides-asset/<name>.jpeg |
| A file that covers several brands | 📸 screenshot | add screenshot of the "This file covers N brands" mapping step with a section's brand picker → /img/guides-asset/<name>.jpeg |
| Step 4 — Choose how your book looks | 📸 screenshot | add screenshot of the look step — Accent swatches, font pairing, page previews, Create Brand Book → /img/guides-asset/<name>.jpeg |
| Adding a picture to an empty frame | 📸 screenshot | add screenshot of the "Images from your files" picker — kind filter chips, image tiles with an "In your book" badge, Upload button → /img/guides-asset/<name>.jpeg |
| How complete it is | 📸 screenshot | add screenshot of the completeness popover — percentage, per-chapter bars, Still missing with Answer, Finish with Ask FRND · N questions → /img/guides-asset/<name>.jpeg |
| Edit Book — Changing the Look and Pages | 📸 screenshot | add screenshot of Edit book → Style → Colours with the contrast rows (Reads well / Headlines only / Too faint) and Suggest a palette → /img/guides-asset/<name>.jpeg |
| Editing the Brand From AskFRND | 📸 screenshot | add screenshot of the "Brand IQ updated · N fields" chat card with Show in Brand Book and Undo → /img/guides-asset/<name>.jpeg |
| Editing the Brand From AskFRND | ✍️ confirm from live UI | the Brand IQ editing switch (`brand_knowledge_write`) has no description in this web build, so in Chat Settings → Tools / myFRND → Tools it may show as a humanised key under "More tools". Confirm how it appears, then name it in this section |
| Status — Draft, In Review, Approved | ✍️ confirm from live UI | confirm whether a non-admin can still move the book to Approved (the status menu is not admin-gated in the web code; only edits to an approved book are) |

### `docs/brand-setup/business-priorities.mdx` — Business Priorities

| Section | Type | What to do |
|---|---|---|
| The Tab at a Glance | 📸 screenshot | add screenshot of the Business tab — Periods + Show filter in the panel, ranked priority rows with Baseline / Current / Target → /img/guides-asset/<name>.jpeg |
| A Priority's Details | ✍️ confirm from live UI | targets come from Insights → Business, which is not switched on yet; the "Set target in Insights ↗" link only appears once it is. Add the target step here when that dashboard ships |
| Adding the First Priorities | ✍️ confirm from live UI | quote the text that "Copy request for client" puts on the clipboard (built in BusinessTab, not read for this run) |

### `docs/brand-setup/brand-iq-sources.mdx` — Brand IQ Sources — Grounding Your Brand

| Section | Type | What to do |
|---|---|---|
| Step 1 — Open Sources | 📸 screenshot | add screenshot of the Sources tab — source rows with Added by · date · pages, a Ready row with Apply, a row with "N questions", and the Show filter in the side panel → /img/guides-asset/<name>.jpeg |
| Step 4 — See What a Source Filled | 📸 screenshot | add screenshot of a source's detail panel — fields grouped by chapter, Open file / Read again, Remove source → /img/guides-asset/<name>.jpeg |
| When a file reads as another brand's | 📸 screenshot | add screenshot of a Sources row with the Other brand chip, the amber "This reads as X's guideline, not Y's." line, Remove and Apply anyway → /img/guides-asset/<name>.jpeg |

### `docs/brand-setup/brand-identity.mdx` — Brand IQ Identity

| Section | Type | What to do |
|---|---|---|
| How to Set Up Brand Identity | ✍️ confirm from live UI | Steps 2–4 (colors, font upload, visual dos and don'ts) describe the pre-Brand-Book Identity form; with show-brand-book on, these are edited on the Identity pages and in Edit book → Style. Rewrite the steps against the live Identity chapter (page names, which fields each page shows) |

### `docs/brand-setup/deck-templates.mdx` — Brand Deck Templates

| Section | Type | What to do |
|---|---|---|
| Where Templates Live | 📸 screenshot | add screenshot of Brand IQ → Templates — template grid + New template button → /img/guides-asset/<name>.jpeg |
| Creating a Brand Template | 📸 screenshot | add screenshot of the Start with your brand chooser — Accent swatches, Fonts pairings, live layout grid → /img/guides-asset/<name>.jpeg |

## Creative Tools

### `docs/studio/overview.mdx` — Creative Tools Overview

| Section | Type | What to do |
|---|---|---|
| The file name menu | 📸 screenshot | add screenshot of the KV canvas top bar with the file name menu open — Favorite, Rename, Version history, Delete → /img/guides-asset/<name>.jpeg |
| The file name menu | ✍️ confirm from live UI | the **Delete file?** dialog says it "will permanently delete" the file, but the API soft-deletes it (frnd-api-php `StudioFile` uses SoftDeletes and the Library observer moves it to Trash). Check whether a KV deleted from the canvas shows up in Files' Trash; if it does, add a line saying it can be restored for 30 days |
| No access? | 📸 screenshot | add screenshot of the "You don't have access to this canvas" state with the Go to Files button → /img/guides-asset/<name>.jpeg |

### `docs/studio/kv-generator.mdx` — Creating Your First Key Visual (KV Generator)

| Section | Type | What to do |
|---|---|---|
| Styling Part of a Text Layer | 📸 screenshot | add screenshot of a text layer with some words selected and styled differently from the rest — showing the typography controls and a mixed-state control → /img/guides-asset/<name>.jpeg |
| Hide & Lock Overlays | 📸 screenshot | add screenshot of the overlay properties panel — Fill section (Solid/Gradient toggle, color swatch, gradient From/To/Angle), Stroke section (toggle, color swatch, width), Opacity slider, text alignment buttons → /img/guides-asset/<name>.jpeg |
| Commenting on the Canvas {#commenting} | 📸 screenshot | add screenshot of the KV canvas in comment mode — comment tool selected in the bottom nav, a pin on a board, the Comments dock on the right → /img/guides-asset/<name>.jpeg |
| Board Actions — The Right-Click Menu {#board-context-menu} | 📸 screenshot | screenshot of the right-click context menu on a Concept board — showing "Start designing", copy actions, Duplicate, Rename, Reset position, Remove from canvas → /img/guides-asset/<name>.jpeg |
| Board Actions — The Right-Click Menu {#board-context-menu} | 📸 screenshot | screenshot of the right-click context menu on a Craft board — showing craft-only items (Set as master, Version history…, Create variant, Send to Motion, Send to Resize) → /img/guides-asset/<name>.jpeg |
| Step 6 — Resize for Multiple Platforms | 📸 screenshot | add screenshot of the Craft bottom toolbar with the Resize and Motion buttons highlighted → /img/guides-asset/<name>.jpeg |
| What happens during import | 📸 screenshot | add screenshot of the PSD import overlay showing "Importing PSD…" → /img/guides-asset/<name>.jpeg |
| The review step | 📸 screenshot | add screenshot of the Review PSD import dialog — layer tree with checkboxes, warning labels, missing-fonts block, footer count → /img/guides-asset/<name>.jpeg |
| Ruler | 📸 screenshot | add screenshot of the ruler bars at top and left edges of the viewport, with tick marks and numeric labels → /img/guides-asset/<name>.jpeg |
| Grid | 📸 screenshot | add screenshot of the Grid & Ruler popup showing the ruler toggle, opacity slider, and grid size slider → /img/guides-asset/<name>.jpeg |
| Safe Zones | 📸 screenshot | add screenshot of the safe zones panel — Templates (Tier 1 / Tier 2) and My safe zones, Apply to artboard, Also apply to other matching boards → /img/guides-asset/<name>.jpeg |
| Safe zone dim | 📸 screenshot | add screenshot of a board with two safe zones dimmed — solid outside both, striped outside one → /img/guides-asset/<name>.jpeg |

### `docs/studio/concepting-mode.mdx` — Concepting Mode — AI-Guided Visual Exploration

| Section | Type | What to do |
|---|---|---|
| How Canvas Modes Work | 📸 screenshot | add screenshot of the top nav showing Concept/Craft tabs, Brand Identity pill, and Style pill → /img/guides-asset/<name>.jpeg |
| What Happens Next | 📸 screenshot | add screenshot of the territory chips in the chat panel and a concept board on the canvas → /img/guides-asset/<name>.jpeg |
| Creative Rationale Cards | 📸 screenshot | add screenshot of a creative rationale card below a concept board → /img/guides-asset/<name>.jpeg |

### `docs/studio/craft-mode.mdx` — Craft Mode — Refining with the Crafter Agent

| Section | Type | What to do |
|---|---|---|
| Agent Thinking Indicator | 📸 screenshot | add screenshot of the Craft mode chat panel with Crafter header identity and a generate bar → /img/guides-asset/<name>.jpeg |
| Creativity Level | 📸 screenshot | add screenshot of the Creativity control in the Craft mode bottom bar (Raw · Low · Medium · High, "Low" selected) → /img/guides-asset/<name>.jpeg |
| Removing a Layer's Background | 📸 screenshot | add screenshot of the Remove background dialog — Cutout engine dropdown, Before/After panes, estimated cost, Run → /img/guides-asset/<name>.jpeg |
| Changing the Camera Angle | 📸 screenshot | add screenshot of the Angles panel — 3D preview box with labelled faces, orbit pad, Rotation / Tilt / Zoom rows, estimated cost → /img/guides-asset/<name>.jpeg |
| The Transform Panel | 📸 screenshot | add screenshot of the Transform panel (Position / Size / Rotate sections visible, single overlay selected) → /img/guides-asset/<name>.jpeg |

### `docs/studio/resizer.mdx` — Resizing Visuals for Different Platforms

| Section | Type | What to do |
|---|---|---|
| Step 3 — (Optional) Add Instructions | 📸 screenshot | add screenshot of the Size Options panel — Search sizes, Social Media expanded, Custom section, Additional Instructions textarea, Resize · N selected button → /img/guides-asset/<name>.jpeg |
| The Resizes Strip | 📸 screenshot | add screenshot of the Craft canvas with the "Resizes" divider and a column of tiles under a board, tile header icons visible (Version history / Reset to master / Download) → /img/guides-asset/<name>.jpeg |
| Tile Version History | 📸 screenshot | add screenshot of the Version History · [size] panel with Created / Regenerated / Restored from vN entries → /img/guides-asset/<name>.jpeg |
| What a resize costs | ✍️ confirm from live UI | confirm the fixed per-size price shown on the button for a layered KV (it is admin-set and not readable from the web code) |
| Editing Part of a Tile (Region Edit) | 📸 screenshot | add screenshot of a resize tile with a drawn frame and the "Find objects / Edit this area" pill → /img/guides-asset/<name>.jpeg |

### `docs/studio/motion-mode.mdx` — Motion — Animating Your Key Visual

| Section | Type | What to do |
|---|---|---|
| Opening Motion | 📸 screenshot | add screenshot of the Motion projects panel — New motion button, project rows with exports toggle → /img/guides-asset/<name>.jpeg |
| The Editor | 📸 screenshot | add screenshot of the motion editor — layers rail, canvas tiles, properties panel, timeline dock → /img/guides-asset/<name>.jpeg |
| Saved Motions — Reusing an Animation | 📸 screenshot | add screenshot of the ✨ preset menu — Default / Saved tabs, "Save as template…", animated preset cards → /img/guides-asset/<name>.jpeg |
| Bumpers — Reusing a Logo Sting | 📸 screenshot | add screenshot of the bumper slots — Start bumper and End bumper with one filled, the library picker open, and the duration / fit / transition controls → /img/guides-asset/<name>.jpeg |
| Bumpers — Reusing a Logo Sting | ✍️ confirm from live UI | confirm where the bumper slots sit in the motion editor (which panel or tab opens them) — the controls are read from `BumperSlots.tsx`, but the path to reach them is not obvious from the code |
| Editing on the Canvas | 📸 screenshot | add screenshot of the focused tile with a layer selected — the keyframe badge visible, plus the onion-skin ghosts and the motion path → /img/guides-asset/<name>.jpeg |
| Composing your own with Build | 📸 screenshot | add screenshot of the ✨ menu's Build tab — the five channel cards (Path, Move, Scale, Rotate, Opacity) with two ticked and the "Add at playhead" button → /img/guides-asset/<name>.jpeg |
| Working with several bars at once | 📸 screenshot | add screenshot of two bars selected across layers with the right-click menu showing Copy N segments / Delete N segments → /img/guides-asset/<name>.jpeg |
| Creating a Motion Project | 📸 screenshot | add screenshot of Choose the video size with two sizes ticked and the Cost · Balance footer → /img/guides-asset/<name>.jpeg |

### `docs/studio/sharing-with-clients.mdx` — Sharing a Key Visual With a Client

| Section | Type | What to do |
|---|---|---|
| Step 1 — Mark What's Ready | 📸 screenshot | add screenshot of a Craft board with the "Ready to share" badge + the right-click menu showing "Remove from share" → /img/guides-asset/<name>.jpeg |
| Step 2 — Create the Link | 📸 screenshot | add screenshot of the Share key visual dialog — Active links list with a link card, expiry meta, New link button → /img/guides-asset/<name>.jpeg |

## Insights

### `docs/insights/connecting-owned-media.mdx` — Connecting Owned Media

| Section | Type | What to do |
|---|---|---|
| Collab Posts — Connecting a Google Sheet | ✍️ confirm from live UI | confirm the sheet's expected column shape and the mapping step for an Owned/collab sheet — the tile copy and the collab rationale are read from `brand-integration-tiles.ts`, but the columns a user must provide are defined server-side |

### `docs/insights/connecting-paid-media.mdx` — Connecting Paid Media (Meta & TikTok Ads)

| Section | Type | What to do |
|---|---|---|
| The ad detail view | 📸 screenshot | add screenshot of the ad detail view — creative on the left, metrics with quartile band on the right → /img/guides-asset/<name>.jpeg |

### `docs/insights/overview.mdx` — Insights Overview

| Section | Type | What to do |
|---|---|---|
| Filtering a custom dashboard | 📸 screenshot | add screenshot of the custom dashboard Filters dialog — channel tabs across the top, the Connections row ("Paid Accounts is …"), and a couple of Filter Rules below it → /img/guides-asset/<name>.jpeg |
| Earned Media summary cards | 📸 screenshot | add screenshot of the Earned Media tab card row — Total Spend / Total Creators / Total Views / Impressions / Reach / ER% → /img/guides-asset/<name>.jpeg |
| Filters on the Paid and Owned Media Tabs | 📸 screenshot | add screenshot of the Paid Media Filters panel open — Filters · Clear · Apply (n) header, Accounts / Delivery / Campaign / Adset / Ad Name / Funnel / Ad Objective rows → /img/guides-asset/<name>.jpeg |
| The Funnel View | 📸 screenshot | add screenshot of the Paid Media Performance Breakdown — stepped funnel, All / Awareness / Consideration / Conversion tabs on the title row, Total Spend leading the metrics column → /img/guides-asset/<name>.jpeg |
| Filtering a custom dashboard | ✍️ confirm from live UI | confirm which channel tabs actually offer the Connections section in your workspace — it is shown for Paid and Owned in the code, and the tab set depends on the brand's connected channels. Verify against a real dashboard before adding a per-channel list. |

### `docs/insights/owned-media.mdx` — Understanding Owned Media & Content Labels

| Section | Type | What to do |
|---|---|---|
| Opening a single post | 📸 screenshot | add screenshot of the post detail view — creative on the left, metric list with quartile band on the right → /img/guides-asset/<name>.jpeg |
| Analyzing Posts With AI | 📸 screenshot | add screenshot of the Analyze with AI confirmation — Scope and Estimated cost panels side by side → /img/guides-asset/<name>.jpeg |
| Filtering by Tags | 📸 screenshot | add screenshot of the Owned Media Filters panel open — Accounts row, Labels rule builder with a rule or two, the "N of M posts match" line, and the Clear / Apply (n) buttons → /img/guides-asset/<name>.jpeg |
| Applying Tags to Posts | 📸 screenshot | add screenshot of the Label Posts overlay — "Total N posts · X need labels", Owned accounts picker, a row with an "N out of M" pill, Attribute Settings → /img/guides-asset/<name>.jpeg |
| Applying Tags to Posts | ✍️ confirm from live UI | Label Posts sits behind `label-posts-overlay` in production. Lark (Sep 2026 Part 3) lists it as shipped; confirm it's on, then drop the rollout note |
| Key Columns & Metrics | ✍️ confirm from live UI | Lark "Owned content funnel totals" (comment, save, share, view totals per funnel stage) lives in the Content Funnel, which Lark also lists as not switched on yet. Document it in this guide once the Content Funnel ships |
| Filtering by Tags | ✍️ confirm from live UI | confirm which operators the Labels rule builder offers and how a second rule combines with the first (AND vs OR). The panel chrome is read from `OwnedFilterPanel.tsx`; the row-level operator list is built in `LabelFilterRows` and was not read. |

### `docs/insights/collaborating-on-insights.mdx` — Collaborating on Insights

| Section | Type | What to do |
|---|---|---|
| The comment dock | 📸 screenshot | add screenshot of the Insights comment dock — search, All / Open / Done / @me pills, Filter popover, a thread with a pin → /img/guides-asset/<name>.jpeg |

### `docs/insights/reading-data-states.mdx` — Reading Data States & Sync Warnings

| Section | Type | What to do |
|---|---|---|
| When a sheet has no columns to read | 📸 screenshot | add screenshot of the Google Sheets mapping panel showing the discovery-failure reason in place of the loading skeleton → /img/guides-asset/<name>.jpeg |
| When a sheet has no columns to read | ✍️ confirm from live UI | the exact wording of each reason is written by the API, not the web code — capture the real strings for a missing named range, an empty range, and an unshared sheet, then quote them here |
| When a Block Can't Follow a Filter | 📸 screenshot | add screenshot of a custom-dashboard block showing its "can't follow this filter" note in place of a number → /img/guides-asset/<name>.jpeg |

## Audience

### `docs/audience/overview.mdx` — Audience Overview

| Section | Type | What to do |
|---|---|---|
| The AI Summary | 📸 screenshot | add screenshot of the Audience Overview hero — AI summary headline, the four stat tiles (People / Active segments / Avg. lifetime value / Avg. purchase intent), Refresh summary + Settings buttons → /img/guides-asset/<name>.jpeg |
| What's on the Overview Below the Summary | 📸 screenshot | add screenshot of the card grid — Inbox / Lifecycle / Reach a segment with their Soon labels, and the full-width Add people card with its source count → /img/guides-asset/<name>.jpeg |
| Using Audience on a Phone | 📸 screenshot | add phone-width screenshot of People → Contacts as stacked cards with the wrapped toolbar and pager → /img/guides-asset/<name>.jpeg |
| Seeing What Changed | 📸 screenshot | add screenshot of the Audience activity dock — rows with "X updated Y", the field diff and the Contact chip → /img/guides-asset/<name>.jpeg |
| Following a Brand's Audience | 📸 screenshot | add screenshot of Audience Settings → Notifications — Notify me / Turn off, "What you'll be told about" list, link to workspace notification settings → /img/guides-asset/<name>.jpeg |

### `docs/audience/people.mdx` — People — Contacts and Followers

| Section | Type | What to do |
|---|---|---|
| Relationship — What a Contact Is to You | 📸 screenshot | add screenshot of the People tab — Contacts/Followers inner tabs, relationship filter chips, the table, and a selection showing the Set relationship bulk bar → /img/guides-asset/<name>.jpeg |
| Adding People | 📸 screenshot | add screenshot of the Add people flow's Where from step — the source tiles, with the not-yet-live ones visibly unselectable → /img/guides-asset/<name>.jpeg |
| Adding People | ✍️ confirm from live UI | confirm what the Review & enrich step shows — the sample-size control and how the credit cost is presented. (Map & label is now documented from code: the manual/auto toggle and the "We matched what we could" copy.) |
| Mapping your columns | 📸 screenshot | add screenshot of the Map & label step — the Map manually / Auto-detect (AI) toggle, the column rows, and the "Let AI decide" default on an attribute column → /img/guides-asset/<name>.jpeg |
| Enriching Profiles | 📸 screenshot | add screenshot of Audience Settings → Enrichment — the waiting count, credits per row, Run enrichment, and the Recent runs list → /img/guides-asset/<name>.jpeg |
| Enrichment quality | 📸 screenshot | add screenshot of Audience Settings → Enrichment Quality — High / Low cards with their price per person → /img/guides-asset/<name>.jpeg |
| Columns that can mean more than one thing | 📸 screenshot | add screenshot of the Map & label step with the "1 column needs an answer" block and its three answers → /img/guides-asset/<name>.jpeg |

### `docs/audience/segments.mdx` — Segments and Personas

| Section | Type | What to do |
|---|---|---|
| Reading a Segment Card | 📸 screenshot | add screenshot of the Segments tab — the card grid with a Contacts, a Followers and a Mixed card, one showing a persona and one showing No persona yet → /img/guides-asset/<name>.jpeg |
| What Changed in the Last Rebuild | 📸 screenshot | add screenshot of the change summary line above the cards, showing new · changed · merged with its trigger and timestamp → /img/guides-asset/<name>.jpeg |
| Personas | ✍️ confirm from live UI | confirm what the Personas inner tab actually renders (card layout, whether a persona can be generated or edited from there, and the chat/role-play entry point). This guide describes it only at the level the segments page reveals. |

## Research

### `docs/research/proposal-scorecard.mdx` — Proposal Scorecard

| Section | Type | What to do |
|---|---|---|
| Step 2 — Add the Proposal | 📸 screenshot | add screenshot of the scorecard composer — Scorecard template / Reviewer, Upload a file / Paste the text, the two optional pickers, credit estimate and Score proposal → /img/guides-asset/<name>.jpeg |
| Step 2 — Add the Proposal | ✍️ confirm from live UI | the composer footer still says "about 3–4 min" while scoring now takes ~1.5 min (Lark + frnd-ai-services `1decfb27`). The doc says "about a minute and a half"; confirm and ask frnd-web to update the copy in `ScorecardDesignStep.tsx` |
| Step 4 — Read the Scorecard | 📸 screenshot | add screenshot of a scored proposal — verdict sentence, Fit / Ambition, the grid, criteria with confidence marks → /img/guides-asset/<name>.jpeg |
| Running a Scorecard From AskFRND | 📸 screenshot | add screenshot of the Proposal scorecard chat card — Fit / Ambition / Grid, Open study, Create tasks → /img/guides-asset/<name>.jpeg |

### `docs/research/creating-a-general-survey.mdx` — Creating a General Survey

| Section | Type | What to do |
|---|---|---|
| Three Ways to Start a Survey | 📸 screenshot | add screenshot of the General Survey card in the Research hub → /img/guides-asset/<name>.jpeg |
| Build and Launch | ✍️ confirm from live UI | The survey builder itself runs inside an embedded survey tool (Populix), which is outside the frndOS app. Confirm the actual in-builder steps (question types, target respondent count, respondent criteria, duration) with a screenshot before publishing this section. Do not guess. |
| Build and Launch | ✍️ confirm from live UI | confirm exact fields, question types, and respondent options from the live builder — these live in the embedded survey tool (Populix) and aren't readable from the app code. Screenshot needed. |

### `docs/research/managing-surveys.mdx` — Managing & Tracking Your Surveys

| Section | Type | What to do |
|---|---|---|
| The Surveys List | 📸 screenshot | add screenshot of the Surveys list → /img/guides-asset/<name>.jpeg |
| Overview | 📸 screenshot | add screenshot of the Overview metrics cards → /img/guides-asset/<name>.jpeg |
| FAQ | ✍️ confirm from live UI | confirm what the response/results view shows once available — lives in the embedded survey tool, screenshot needed. |

### `docs/research/assigning-brand-and-sharing.mdx` — Assigning a Brand & Sharing Surveys

| Section | Type | What to do |
|---|---|---|
| Assigning a Brand | 📸 screenshot | add screenshot of the Brand dropdown on the Detail tab → /img/guides-asset/<name>.jpeg |

## AskFrnd

### `docs/askfrnd/overview.mdx` — AskFrnd Overview

| Section | Type | What to do |
|---|---|---|
| Queueing Follow-Ups While AskFrnd Is Answering {#queueing-follow-ups-while-askfrnd-is-answering} | 📸 screenshot | add screenshot of the AskFRND composer with one or two queued chips above it → /img/guides-asset/<name>.jpeg |
| When a file can't be read | ✍️ confirm from live UI | the reply wording is written by the model (it is only told to say the file could not be read), and how the chat UI renders ai-service's `FileExtractionFailed` event was not traced in frnd-web. Confirm what the user actually sees for an unreadable attachment, then quote it here |

### `docs/askfrnd/skills.mdx` — Using AskFrnd Skills

| Section | Type | What to do |
|---|---|---|
| Where to Find Skills | ✍️ confirm from live UI | confirm the exact way to open Chat Settings from the AskFrnd panel (button/menu location) and add a screenshot → /img/guides-asset/<name>.jpeg |
| Installing a Skill from the Directory | 📸 screenshot | add screenshot of the Skills Directory → /img/guides-asset/<name>.jpeg |

### `docs/askfrnd/lark-plugins.mdx` — Connecting Lark (AskFrnd Plugins)

| Section | Type | What to do |
|---|---|---|
| Where to Find Plugins | ✍️ confirm from live UI | confirm the exact way to open Chat Settings from the AskFrnd panel and add a screenshot → /img/guides-asset/<name>.jpeg |
| Step 1 — Install & Connect Lark | 📸 screenshot | add screenshot of the Plugins list with Lark → /img/guides-asset/<name>.jpeg |
| Step 2 — Set Permissions Per Service | ✍️ confirm from live UI | confirm the exact Lark service display names shown in the Permissions list (they come from the server) with a screenshot. |

### `docs/askfrnd/tools.mdx` — How AskFrnd Uses Tools

| Section | Type | What to do |
|---|---|---|
| Choosing Which Tools AskFrnd Uses | ✍️ confirm from live UI | confirm the exact way to open Chat Settings from the AskFrnd panel (button/menu location) and add a screenshot of the Tools tab → /img/guides-asset/<name>.jpeg |

### `docs/askfrnd/voice-input.mdx` — Talking to AskFRND with Voice

| Section | Type | What to do |
|---|---|---|
| Three Ways to Start Talking | 📸 screenshot | add screenshot of the AskFRND composer showing the mic in the send slot → /img/guides-asset/<name>.jpeg |
| What You'll See While It Listens | 📸 screenshot | add screenshot of the AskFRND listening state — badge, waveform, "Listening…", live transcript → /img/guides-asset/<name>.jpeg |
| FAQ | ✍️ confirm from live UI | confirm from live UI whether voice input is offered on the mobile layout — screenshot needed |

## Collaboration

### `docs/collaboration/real-time-collaboration.mdx` — Collaborating in Real-Time

| Section | Type | What to do |
|---|---|---|
| Presence Avatars | 📸 screenshot | screenshot of KV Generator top nav showing 3–4 presence avatar chips + overflow "+N" chip — /img/guides-asset/<name>.jpeg |
| Live Cursors | 📸 screenshot | screenshot of the canvas showing a live cursor from a remote peer — arrow + colored name pill — /img/guides-asset/<name>.jpeg |


### `docs/collaboration/client-approvals.mdx` — Client Approvals

| Section | Type | What to do |
|---|---|---|
| Step 2 — Choose Approvers and Say What Changed | 📸 screenshot | add screenshot of the Request approval panel — Approvers chips + suggestions, What changed, Request approval → /img/guides-asset/<name>.jpeg |
| What the Client Sees | 📸 screenshot | add screenshot of the client decision page on a phone — deck, numbered pins, Approve / Request changes / I need more time bar → /img/guides-asset/<name>.jpeg |
| Step 1 — Request Approval | ✍️ confirm from live UI | the KV share panel also has a Request approval toggle, but the code hides it in dev/staging because multi-item KV rounds are still being built (frnd-web `99eab75c8`). Confirm whether it's offered in production before adding KV to the table |
| Following the Decision in frndOS | ✍️ confirm from live UI | confirm where a client's pins show up for the agency on a deck (code adds an "on v{n}" badge to deck comments) and add that here |

### `docs/collaboration/overview.mdx` — Collaboration Overview

| Section | Type | What to do |
|---|---|---|
| Comments — Where to Find Them | ✍️ confirm from live UI | the Audience row lists commenting, but Lark (Sep 2026 Part 3) says Audience commenting is built and hidden. Confirm, and drop the row until it's switched on |
## Files

### `docs/library/overview.mdx` — Files — Your Team's File Hub

| Section | Type | What to do |
|---|---|---|
| Finding a File | 📸 screenshot | add screenshot of the Files header — Search files, type chips with counts, Filter · N, Group by, sort, grid/list toggle, Trash button → /img/guides-asset/<name>.jpeg |
| Opening and Previewing | 📸 screenshot | add screenshot of Quick Look open on a KV — preview, Kind / Brand / Last edited / Comments, arrows → /img/guides-asset/<name>.jpeg |
| Working with Several Files | 📸 screenshot | add screenshot of the selection bar — N selected · Move to… · Set status · Move to Trash → /img/guides-asset/<name>.jpeg |

## Projects & Workflows

### `docs/projects/managing-projects.mdx` — Creating & Managing Projects

| Section | Type | What to do |
|---|---|---|
| Where to Find Projects | 📸 screenshot | add screenshot of the Projects page — status chips, sort, brand filter, folder cards → /img/guides-asset/<name>.jpeg |
| Filing Work Into a Project | ✍️ confirm from live UI | rewritten after Studio projects were removed (frnd-web `ca96f8e3f`). Confirm whether Files' Move to… still offers projects for every file kind, and whether project rooms need the Labs flag to be reachable |

### `docs/projects/project-rooms.mdx` — Project Rooms — Keeping Work Together

| Section | Type | What to do |
|---|---|---|
| Opening a Room | 📸 screenshot | add screenshot of a project room — title row, composer, Tasks, Proposal Assistants, Files, right rail → /img/guides-asset/<name>.jpeg |

## Decks

### `docs/decks/overview.mdx` — Decks Overview — Building Presentations in frndOS

| Section | Type | What to do |
|---|---|---|
| The New deck chooser | 📸 screenshot | add screenshot of the New deck chooser (Start blank / Import a file / template grid) → /img/guides-asset/<name>.jpeg |
| Deck Styles | 📸 screenshot | add screenshot of the style list in the right rail with a row's ⋯ menu open — Edit / Duplicate / Apply to all slides / Publish / Delete → /img/guides-asset/<name>.jpeg |
| Deck Styles | ✍️ confirm from live UI | the style BUILDER itself (what you can define in it: colours, fonts, layouts) was not read — open "+ New style" and document the panel, then link it from this section |
| Adding Slides From Layouts and Templates | 📸 screenshot | add screenshot of Add slide showing the Layouts and Templates tabs, and a template card drilled into with "Add all slides" → /img/guides-asset/<name>.jpeg |
| The Editor at a Glance | 📸 screenshot | add screenshot of the deck editor — top bar, slide rail, canvas, right rail, bottom dock → /img/guides-asset/<name>.jpeg |
| Commenting on a Slide | 📸 screenshot | add screenshot of the deck editor in comment mode — the top-bar toggle, a pin on a slide element, the Comments dock → /img/guides-asset/<name>.jpeg |

### `docs/decks/overview.mdx` — When Text Doesn't Fit

| Section | Type | What to do |
|---|---|---|
| When Text Doesn't Fit | 📸 screenshot | add screenshot of a slide with the amber overflow dot and its popover open — the message plus the Shrink to fit and Select buttons → /img/guides-asset/<name>.jpeg |

### `docs/decks/deck-assistant.mdx` — The Deck Assistant

| Section | Type | What to do |
|---|---|---|
| The Plan | 📸 screenshot | add screenshot of a plan card — the step list with its Add / Update / Research / Style tags, the "Awaiting your Go" status, and the Go / Cancel buttons → /img/guides-asset/<name>.jpeg |
| When It Asks You Something First | 📸 screenshot | add screenshot of a question card — pre-picked options, the "Something else" row, and the N selected · Skip · Submit footer → /img/guides-asset/<name>.jpeg |
| After It Runs | ✍️ confirm from live UI | confirm what a completed run card actually summarises (the per-step result wording and where the filed Study link appears). The card's states are read from code; its filled-in content is not. |

### `docs/decks/live-data-blocks.mdx` — Live Data on Slides

| Section | Type | What to do |
|---|---|---|
| The Live Chip | 📸 screenshot | add screenshot of a slide with a linked block selected — the `● Live · Top posts · All time` chip, plus an amber stale chip if one can be staged → /img/guides-asset/<name>.jpeg |
| Refreshing, Opening and Detaching | 📸 screenshot | add screenshot of the right rail for a linked block — Refresh / Open in Insights / Detach, and the Layout, Show, Title and Fit sections → /img/guides-asset/<name>.jpeg |
| Inserting a Live Object | 📸 screenshot | add screenshot of the Insert panel — Brand picker, All / Brand IQ / Insights / Audience / Studio / Proposals tabs, cards with Add to slide → /img/guides-asset/<name>.jpeg |
| Editing a Live Object in Place | 📸 screenshot | add screenshot of a Brand IQ value selected on a slide — the selection bar (Brand IQ · field · In sync · Edit) and the quick edit open, footer "Changes Brand IQ and N decks" → /img/guides-asset/<name>.jpeg |
| Used in | 📸 screenshot | add screenshot of the quick edit as a panel in the right rail — Used in list with This deck, Brand Book pages, History → /img/guides-asset/<name>.jpeg |
| Editing a Live Object in Place | ✍️ confirm from live UI | "Refreshing, Opening and Detaching" above describes the older right-rail panel (Refresh / Open in Insights / Detach). With live quick edit on, the rail shows the quick edit panel instead. Confirm which one workspaces see, then merge or drop the older section |

### `docs/decks/media-and-charts.mdx` — Video, Embeds and Charts

| Section | Type | What to do |
|---|---|---|
| Pasting a Link | 📸 screenshot | add screenshot of the embed popover — the URL field with a resolved preview card showing the provider pill → /img/guides-asset/<name>.jpeg |
| Charts | 📸 screenshot | add screenshot of the chart picker showing the kinds, plus a funnel and a bubble chart on a slide → /img/guides-asset/<name>.jpeg |
| Charts | ✍️ confirm from live UI | confirm how chart DATA is supplied (typed in, pasted, or CSV import) and the exact kind names shown in the picker — `ALL_CHART_KINDS` gives the internal ids, not the labels a user reads |
| Bubble — a positioning map | ✍️ confirm from live UI | confirm where quadrant labels are entered in the chart panel; the field exists in `buildChartSpec.ts` but its control was not located |

### `docs/decks/presenting.mdx` — Presenting a Deck

| Section | Type | What to do |
|---|---|---|
| Keyboard Control | 📸 screenshot | add screenshot of the presenter view — the slide full-screen with the on-screen previous/next slide and chapter controls visible → /img/guides-asset/<name>.jpeg |
| Presenting a Deck | ✍️ confirm from live UI | Lark lists a presenter window, autoplay and transitions. Only keyboard/chapter navigation and fullscreen are readable in `PresenterClient.tsx`; no autoplay control or presenter-notes window was found. Confirm on the live UI whether those exist, and document them here if so. |

### `docs/decks/importing-a-deck.mdx` — Importing a PowerPoint or PDF

| Section | Type | What to do |
|---|---|---|
| The preview sheet | 📸 screenshot | add screenshot of the import preview sheet — thumbnail grid with checkboxes, Select all / Select none, footer buttons → /img/guides-asset/<name>.jpeg |

### `docs/decks/story-view.mdx` — Writing the Story

| Section | Type | What to do |
|---|---|---|
| Opening Story View | 📸 screenshot | add screenshot of Story view — chapter rail, prose document, top actions row → /img/guides-asset/<name>.jpeg |

## Workspace & Members

### `docs/workspace/inviting-team-members.mdx` — Inviting Team Members

| Section | Type | What to do |
|---|---|---|
| Step 1 — Open the People Page | 📸 screenshot | add screenshot — Workspace Settings → People page: header "People", Search box, Invite button, Members/Requests pill tabs, member table → /img/guides-asset/<name>.jpeg |
| Assign brand access (Member only) | 📸 screenshot | add screenshot — Invite dialog: email chips, "You're inviting N guests as Member", role dropdown, brand access cascade picker open → /img/guides-asset/<name>.jpeg |

### `docs/workspace/tasks.mdx` — Tasks

| Section | Type | What to do |
|---|---|---|
| The Board | 📸 screenshot | add screenshot of the Tasks board — six status columns, a card being dragged, Archive all done in the Done column menu → /img/guides-asset/<name>.jpeg |
| A Task's Details | 📸 screenshot | add screenshot of the task sheet — Status / Due / Assignee / Brand / Project / Source rows, checklist with Work the list, Discussion → /img/guides-asset/<name>.jpeg |
| A Task's Details | ✍️ confirm from live UI | confirm which sources create tasks in practice (Lark, Google Tasks, scorecard next steps, agent hand-backs) and whether Google Tasks syncs both ways like Lark |

### `docs/workspace/managing-credits.mdx` — Managing Workspace Credits

| Section | Type | What to do |
|---|---|---|
| How to Buy Extra Credit | 📸 screenshot | add screenshot of the Buy Extra Credit modal (packs + custom amount + cost breakdown) → /img/guides-asset/<name>.jpeg |
| Viewing Your Extra Credit Purchases | 📸 screenshot | add screenshot of the Extra Credit Purchases table in Billing → /img/guides-asset/<name>.jpeg |
| Reading an Invoice | 📸 screenshot | add screenshot of an invoice PDF — Bill to / Bill from block, plan line with its period, Platform Fee and Total Paid rows → /img/guides-asset/<name>.jpeg |
| Who it's billed to | ✍️ confirm from live UI | there is no in-app form for workspace billing details (the address is set by the frndOS team via `billing:set-party`). Confirm how a customer asks for their company address to be put on invoices, then add that step here |
| Metered by actual usage | ✍️ confirm from live UI | confirm the exact label trend-signal detection carries in the credit ledger's Action column — the labels are server-authored and aren't readable from the web code. Screenshot needed. |
| Credit Usage by Brand | 📸 screenshot | add screenshot of the Credit Usage by Brand table with a brand expanded down through Tool → Action → Person, showing the share percentages and the Export button → /img/guides-asset/<name>.jpeg |
| Resetting a Member's Limit to 0 | 📸 screenshot | add screenshot of the Reset Limit? confirm — Remaining / Total Monthly Limit → 0, outstanding debt note, Reset to 0 → /img/guides-asset/<name>.jpeg |

## Settings & Administration

### `docs/settings/askfrnd-tools.mdx` — Setting the Workspace AskFRND Tools

| Section | Type | What to do |
|---|---|---|
| Step 1 — Open AskFRND Tools | 📸 screenshot | add screenshot of the Workspace Settings → AskFRND Tools page → /img/guides-asset/<name>.jpeg |

### `docs/settings/experimental-features.mdx` — Turning On Experimental Features

| Section | Type | What to do |
|---|---|---|
| Step 1 — Open Experimental | 📸 screenshot | add screenshot of the Workspace Settings → Experimental page → /img/guides-asset/<name>.jpeg |

### `docs/settings/insights-tabs.mdx` — Customizing Insights Tabs

| Section | Type | What to do |
|---|---|---|
| Step 1 — Open Insights Tabs | 📸 screenshot | add screenshot of the Workspace Settings → Insights Tabs editor → /img/guides-asset/<name>.jpeg |

### `docs/settings/data-privacy.mdx` — Your Data Rights — Export & Deletion

| Section | Type | What to do |
|---|---|---|
| Where to Find Data Rights | 📸 screenshot | add screenshot of the Your Rights section with the two cards → /img/guides-asset/<name>.jpeg |
| Requesting a Data Export | 📸 screenshot | add screenshot of the Export My Data confirmation dialog → /img/guides-asset/<name>.jpeg |
| Requesting Account Deletion | 📸 screenshot | add screenshot of the Request Account Deletion dialog (before submission) → /img/guides-asset/<name>.jpeg |

### `docs/settings/notifications.mdx` — Notification Settings

| Section | Type | What to do |
|---|---|---|
| Opening the Page | 📸 screenshot | add screenshot of Workspace Settings → Notifications — the four sections (How much you hear, Where it reaches you, Digest, Quiet hours) → /img/guides-asset/<name>.jpeg |

### `docs/settings/shared-connections.mdx` — Shared Connections — Workspace and Brand Accounts

| Section | Type | What to do |
|---|---|---|
| Where to Manage Them | 📸 screenshot | add screenshot of Workspace Settings → Plugins — connected list + Plugins/Connectors tabs → /img/guides-asset/<name>.jpeg |
| Seeing Exactly What You're Granting | 📸 screenshot | add screenshot of a connector's detail view — the tool list with per-tool toggles → /img/guides-asset/<name>.jpeg |
| It asks, in chips | 📸 screenshot | add screenshot of the account picker chips in a chat reply → /img/guides-asset/<name>.jpeg |

## Integrations

### `docs/integrations/frndos-mcp-server.mdx` — Connecting Your AI App — the frndOS MCP Server

| Section | Type | What to do |
|---|---|---|
| Where to Find It in frndOS | 📸 screenshot | add screenshot of the "Use frndOS inside your AI" dialog — server URL + Copy, the 4 steps, the "Where to add it" example image → /img/guides-asset/<name>.jpeg |
| Step 2 — Add the Server as a Custom Connector in Claude | 🔒 third-party UI | confirm from Claude's live UI — the full click path to the custom-connector slot (claude.ai vs Claude Desktop vs Claude Code differ). The current steps carry only what the frndOS connect dialog itself shows (its `connect-claude-example.png` caption). Do not write vendor click paths from memory — capture them from the live UI, or link to Anthropic's own docs. |
| Connecting ChatGPT | 📸 screenshot | add screenshots of the ChatGPT path — the developer-mode toggle under Settings → Plugins, and the new-plugin form with the server URL + OAuth fields filled in → /img/guides-asset/<name>.jpeg |
| Connecting Another AI App | 🔒 third-party UI | confirm from live UI — the per-app menu path for Cursor, Claude Desktop, Claude Code and Gemini, then add a short per-app list under this section. Those screens belong to the AI app vendors and change independently. Claude and ChatGPT already have their own sections. This section is the intended destination of a "Setup for your app →" link from McpConnectModal.tsx (frnd-web), so it must eventually answer the remaining cases. |
| FAQ | ✍️ confirm from live UI | confirm from live UI — whether frndOS has its own screen for reviewing and revoking connected AI apps. The connect dialog says "revoke anytime", but no such surface was found in the product code (Passport client-management routes are deliberately not registered). If one exists, document it here as the primary answer. |

### `docs/integrations/what-frndos-mcp-can-do.mdx` — What the frndOS MCP Server Can Do

| Section | Type | What to do |
|---|---|---|
| FAQ | ✍️ confirm from live UI | confirm from live UI — whether those switches also apply to tools called through the frndOS MCP server, or only to AskFRND inside the app. Once confirmed, answer it directly in the FAQ above. |

## Early Access Features

### `docs/early-access/agents.mdx` — Agents & Teams (Beta)

| Section | Type | What to do |
|---|---|---|
| Opening Agents | 📸 screenshot | add screenshot of the Agents page — Agents grid + Teams section, each with the blue "Experiment" badge → /img/guides-asset/<name>.jpeg |
| Who Can See Your Agent {#visibility} | 📸 screenshot | add screenshot of the Visibility block — badge, explanation, Share with workspace button → /img/guides-asset/<name>.jpeg |
| Browsing & Installing Shared Agents | 📸 screenshot | add screenshot of the Browse Agents directory modal — search + agent cards with Install / Installed / Owned states → /img/guides-asset/<name>.jpeg |

### `docs/early-access/workflows.mdx` — Workflows (Beta)

| Section | Type | What to do |
|---|---|---|
| The Workflows List | 📸 screenshot | add screenshot of the Workflows list page — table with the Experiment badge + New Workflow button → /img/guides-asset/<name>.jpeg |
| Building a Workflow on the Canvas | 📸 screenshot | add screenshot of the workflow canvas builder — node palette, a few connected nodes, top action bar (Notify / Schedule / Validate / Save / Run) → /img/guides-asset/<name>.jpeg |

### `docs/early-access/pitch.mdx` — Pitch (Beta)

| Section | Type | What to do |
|---|---|---|
| Projects and Pitches | 📸 screenshot | add screenshot of the Projects list — folder grid, sort dropdown, New Project button → /img/guides-asset/<name>.jpeg |
| Creating a Pitch | 📸 screenshot | add screenshot of the New Project modal — name, prospect/brand, deadline, Brief source segmented control (Upload / Paste text / Lark URL) → /img/guides-asset/<name>.jpeg |
| Reviewing the Pitch | 📸 screenshot | add screenshot of the Review wizard — left "The Pitch" cards (Brief / Audience / Decision-makers / Winning Strategy), right "The Plan" scope strip + preview, Confirm & Start button → /img/guides-asset/<name>.jpeg |
| The Creative Platform step | 📸 screenshot | add screenshot of the step rail with the Creative Platform step between Big Idea and Master KV, and its artifact (platform options with storyboard + touchpoints) → /img/guides-asset/<name>.jpeg |
| The Runner — Working Through Deliverables | 📸 screenshot | add screenshot of the runner — left step rail (deliverables grouped by phase), center step canvas, top chrome (back, pipeline toggle, context vault, comments, progress) → /img/guides-asset/<name>.jpeg |
| The brand look | 📸 screenshot | add screenshot of the Brand look panel — Where the look comes from switch, colours with contrast, Headline / Body fonts, What this changes → /img/guides-asset/<name>.jpeg |
| Steps that are a decision | 📸 screenshot | add screenshot of a decision step (e.g. Big Idea) — "Which direction do we take?", radio cards with Recommended, Compare, and the header's "Approve · <name>" → /img/guides-asset/<name>.jpeg |
| Step pages | 📸 screenshot | add screenshot of an editorial step page — headline, Contents rail, "Pitch deck · N" row, "Lands in your pitch deck" strip → /img/guides-asset/<name>.jpeg |
| Making the Pitch Deck | 📸 screenshot | add screenshot of the "Client look or agency template?" dialog → /img/guides-asset/<name>.jpeg |
| Step pages | ✍️ confirm from live UI | these surfaces sit behind `show-pitch-slides` (fail-closed in web AND api, no staging bypass). Written as live per Lark; confirm which workspaces have it, and drop the "Rolling out per workspace" note once it's on for everyone |
| What each step makes | ✍️ confirm from live UI | the step list follows the default Campaign Proposal template (ProposalTemplateV1Seeder). Confirm the template workspaces actually run, and the decision label for Creative Platform and Master Key Visual (no question heading found in code) |
