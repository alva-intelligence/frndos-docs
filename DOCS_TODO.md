# Docs TODO Ledger

Manual follow-ups left in the Help Center guides — screenshots, flows only visible in the live UI, and steps that live inside third-party tools. Every row maps to a `TODO` marker in an `.mdx` file.

_Last updated: 2026-08-25_

| Legend | Meaning |
|---|---|
| 📸 screenshot | An image is needed; capture it and drop it in `static/img/guides-asset/` |
| ✍️ confirm | A detail must be verified against the live UI before it can be written |
| 🔒 third-party | The steps live inside a vendor tool and are in no frndOS repo |


## 🚀 Getting Started

### `docs/getting-started/navigating-frndos.mdx` — Navigating frndOS — The Sidebar

| Line | Type | What to do |
|---|---|---|
| 72 | 📸 screenshot | add screenshot of the redesigned Home — briefing hero with composer, Continue Working, Team activity rail, Recent Campaigns → `/img/guides-asset/` |

### `docs/getting-started/myfrnd.mdx` — myFRND — Making Your Assistant More Capable

| Line | Type | What to do |
|---|---|---|
| 26 | 📸 screenshot | add screenshot of the myFRND page — heading with Experimental badge, four tabs, Discover shelf → `/img/guides-asset/` |


## 🏢 Brand Setup & Brand IQ

### `docs/brand-setup/brand-iq.mdx` — Brand IQ — Your Brand's Knowledge Home

| Line | Type | What to do |
|---|---|---|
| 71 | 📸 screenshot | add screenshot — Brand IQ Overview tab: status banner with knowledge-chunk count, three pillar cards (Strategy/Identity/Tone), Knowledge Vault card, Brand IQ powers strip |
| 72 | 📸 screenshot | screenshot of the Brand IQ Overview tab — needed from the live UI |

### `docs/brand-setup/brand-iq-sources.mdx` — Brand IQ Sources — Grounding Your Brand

| Line | Type | What to do |
|---|---|---|
| 81 | 📸 screenshot | add screenshot — Brand IQ → Sources tab: coverage strip with per-pillar chips, Add source dropdown open showing Upload files / Add link / Connect Lark (Soon) / From Files (Soon) |
| 82 | 📸 screenshot | screenshot of the Sources tab with the Add source menu open — needed from the live UI |
| 108 | 📸 screenshot | add screenshot — Sources review form: a field showing the "Keep existing" vs "Use AI suggestion" cards side by side with a confidence badge |
| 109 | 📸 screenshot | screenshot of the review form's Keep existing / Use AI suggestion choice — needed from the live UI |

### `docs/brand-setup/deck-templates.mdx` — Brand Deck Templates

| Line | Type | What to do |
|---|---|---|
| 28 | 📸 screenshot | add screenshot of Brand IQ → Templates — template grid + New template button → `/img/guides-asset/` |
| 39 | 📸 screenshot | add screenshot of the Start with your brand chooser — Accent swatches, Fonts pairings, live layout grid → `/img/guides-asset/` |


## 🎨 Studio

### `docs/studio/kv-generator.mdx` — Creating Your First Key Visual (KV Generator)

| Line | Type | What to do |
|---|---|---|
| 222 | 📸 screenshot | add screenshot of the overlay properties panel — Fill section (Solid/Gradient toggle, color swatch, gradient From/To/Angle), Stroke section (toggle, color swatch, width), Opacity slider, text alignment buttons → `/img/guides-asset/` |
| 270 | 📸 screenshot | screenshot of the right-click context menu on a Concept board — showing "Start designing", copy actions, Duplicate, Rename, Reset position, Remove from canvas → `/img/guides-asset/` |
| 272 | 📸 screenshot | screenshot of the right-click context menu on a Craft board — showing craft-only items (Set as master, Version history…, Create variant, Send to Motion, Send to Resize) → `/img/guides-asset/` |
| 342 | 📸 screenshot | add screenshot of the PSD import overlay showing "Importing PSD…" → `/img/guides-asset/` |
| 348 | 📸 screenshot | add screenshot of the Review PSD import dialog — layer tree with checkboxes, warning labels, missing-fonts block, footer count → `/img/guides-asset/` |
| 415 | 📸 screenshot | add screenshot of the ruler bars at top and left edges of the viewport, with tick marks and numeric labels → `/img/guides-asset/` |
| 431 | 📸 screenshot | add screenshot of the Grid & Ruler popup showing the ruler toggle, opacity slider, and grid size slider → `/img/guides-asset/` |

### `docs/studio/concepting-mode.mdx` — Concepting Mode — AI-Guided Visual Exploration

| Line | Type | What to do |
|---|---|---|
| 24 | 📸 screenshot | add screenshot of the top nav showing Concept/Craft tabs, Brand Identity pill, and Style pill → `/img/guides-asset/` |
| 145 | 📸 screenshot | add screenshot of the territory chips in the chat panel and a concept board on the canvas → `/img/guides-asset/` |
| 173 | 📸 screenshot | add screenshot of a creative rationale card below a concept board → `/img/guides-asset/` |

### `docs/studio/craft-mode.mdx` — Craft Mode — Refining with the Crafter Agent

| Line | Type | What to do |
|---|---|---|
| 31 | 📸 screenshot | add screenshot of the Craft mode chat panel with Crafter header identity and a generate bar → `/img/guides-asset/` |
| 65 | 📸 screenshot | add screenshot of the Creativity control in the Craft mode bottom bar (Raw · Low · Medium · High, "Low" selected) → `/img/guides-asset/` |
| 187 | 📸 screenshot | add screenshot of the Transform panel (Position / Size / Rotate sections visible, single overlay selected) → `/img/guides-asset/` |

### `docs/studio/resizer.mdx` — Resizing Visuals for Different Platforms

| Line | Type | What to do |
|---|---|---|
| 72 | 📸 screenshot | add screenshot of the Platform panel — platform list (Social Media expanded) + batch instruction textarea below it → `/img/guides-asset/` |

### `docs/studio/motion-mode.mdx` — Motion — Animating Your Key Visual

| Line | Type | What to do |
|---|---|---|
| 29 | 📸 screenshot | add screenshot of the Motion projects panel — New motion button, project rows with exports toggle → `/img/guides-asset/` |
| 53 | 📸 screenshot | add screenshot of the motion editor — layers rail, canvas tiles, properties panel, timeline dock → `/img/guides-asset/` |


## 📊 Insights

### `docs/insights/collaborating-on-insights.mdx` — Collaborating on Insights

| Line | Type | What to do |
|---|---|---|
| 77 | 📸 screenshot | add screenshot of the Insights comment rail — This page / All pages tabs, All / Unresolved / @me filters, a thread → `/img/guides-asset/` |


## 🔍 Research

### `docs/research/creating-a-general-survey.mdx` — Creating a General Survey

| Line | Type | What to do |
|---|---|---|
| 35 | 📸 screenshot | add screenshot of the General Survey card in the Research hub → `/img/guides-asset/` |
| 43 | 🔒 third-party | The survey builder itself runs inside an embedded survey tool (Populix), which is outside the frndOS app. Confirm the actual in-builder steps (question types, target respondent count, respondent criteria, duration) with a screenshot before publishing this section. Do not guess. |
| 51 | 🔒 third-party | confirm exact fields, question types, and respondent options from the live builder — these live in the embedded survey tool and aren't documented from the app code. |

### `docs/research/managing-surveys.mdx` — Managing & Tracking Your Surveys

| Line | Type | What to do |
|---|---|---|
| 17 | 📸 screenshot | add screenshot of the Surveys list → `/img/guides-asset/` |
| 65 | 📸 screenshot | add screenshot of the Overview metrics cards → `/img/guides-asset/` |
| 95 | 🔒 third-party | Open the survey and use its Detail view. The response breakdown is shown in the embedded survey tool. _[TODO: confirm what the response/results view shows once available — screenshot needed. |

### `docs/research/assigning-brand-and-sharing.mdx` — Assigning a Brand & Sharing Surveys

| Line | Type | What to do |
|---|---|---|
| 25 | 📸 screenshot | add screenshot of the Brand dropdown on the Detail tab → `/img/guides-asset/` |

### `docs/research/customer-intelligence-overview.mdx` — Customer Intelligence Overview

| Line | Type | What to do |
|---|---|---|
| 30 | 📸 screenshot | add screenshot of the Customer Intelligence overview (four cards + tabs) → `/img/guides-asset/` |
| 51 | 📸 screenshot · ✍️ confirm | confirm how a user navigates to Customer Intelligence (which sidebar/menu entry opens it) — the entry point isn't readable from the page code. Add the exact path + screenshot. |

### `docs/research/importing-customers.mdx` — Importing & Enriching Customers

| Line | Type | What to do |
|---|---|---|
| 22 | 📸 screenshot | add screenshot of the Integrations tab upload area → `/img/guides-asset/` |
| 43 | 📸 screenshot · ✍️ confirm | confirm the sampling modal's exact fields (custom count vs. percentage, credit cost display) with a screenshot. |

### `docs/research/exploring-customers-and-segments.mdx` — Exploring Customers & Segments

| Line | Type | What to do |
|---|---|---|
| 30 | 📸 screenshot | add screenshot of the Customer Table View → `/img/guides-asset/` |
| 49 | 📸 screenshot · ✍️ confirm | confirm the exact profile-drawer layout and section names with a screenshot. |
| 60 | 📸 screenshot | add screenshot of the Segment List → `/img/guides-asset/` |
| 62 | ✍️ confirm | confirm how a user CREATES a manual segment (the exact action/flow) — not fully readable from the list view code. |

### `docs/research/customer-insights.mdx` — Getting Customer Insights

| Line | Type | What to do |
|---|---|---|
| 23 | 📸 screenshot | add screenshot of the Customer Insights filter prompt → `/img/guides-asset/` |
| 35 | 📸 screenshot · ✍️ confirm | confirm the full set of result sections and their exact labels with a screenshot (some section titles are data-driven). |

### `docs/research/audience-personas.mdx` — Audience Personas — From Followers to People

| Line | Type | What to do |
|---|---|---|
| 31 | 📸 screenshot | add screenshot of the Audience Personas page — three tabs, Segments/Personas metric cards, persona grid → `/img/guides-asset/` |


## 💬 AskFrnd

### `docs/askfrnd/skills.mdx` — Using AskFrnd Skills

| Line | Type | What to do |
|---|---|---|
| 23 | 📸 screenshot · ✍️ confirm | confirm the exact way to open Chat Settings from the AskFrnd panel (button/menu location) and add a screenshot → `/img/guides-asset/` |
| 40 | 📸 screenshot | add screenshot of the Skills Directory → `/img/guides-asset/` |

### `docs/askfrnd/lark-plugins.mdx` — Connecting Lark (AskFrnd Plugins)

| Line | Type | What to do |
|---|---|---|
| 21 | 📸 screenshot · ✍️ confirm | confirm the exact way to open Chat Settings from the AskFrnd panel and add a screenshot → `/img/guides-asset/` |
| 35 | 📸 screenshot | add screenshot of the Plugins list with Lark → `/img/guides-asset/` |
| 48 | 📸 screenshot · ✍️ confirm | confirm the exact Lark service display names shown in the Permissions list (they come from the server) with a screenshot. |

### `docs/askfrnd/tools.mdx` — How AskFrnd Uses Tools

| Line | Type | What to do |
|---|---|---|
| 48 | 📸 screenshot · ✍️ confirm | confirm the exact way to open Chat Settings from the AskFrnd panel (button/menu location) and add a screenshot of the Tools tab → `/img/guides-asset/` |


## 🤝 Collaboration

### `docs/collaboration/real-time-collaboration.mdx` — Collaborating in Real-Time

| Line | Type | What to do |
|---|---|---|
| 15 | 📸 screenshot | screenshot of KV Generator top nav showing 3–4 presence avatar chips + overflow "+N" chip — /img/guides-asset/<name>.jpeg |
| 31 | 📸 screenshot | screenshot of the canvas showing a live cursor from a remote peer — arrow + colored name pill — /img/guides-asset/<name>.jpeg |


## 📁 Projects & Workflows

### `docs/projects/project-rooms.mdx` — Project Rooms — Keeping Work Together

| Line | Type | What to do |
|---|---|---|
| 25 | 📸 screenshot | add screenshot of a project room — title row, composer, Tasks, Proposal Assistants, Files, right rail → `/img/guides-asset/` |


## 🖼️ Decks

### `docs/decks/overview.mdx` — Decks Overview — Building Presentations in frndOS

| Line | Type | What to do |
|---|---|---|
| 41 | 📸 screenshot | add screenshot of the New deck chooser (Start blank / Import a file / template grid) → `/img/guides-asset/` |
| 47 | 📸 screenshot | add screenshot of the deck editor — top bar, slide rail, canvas, right rail, bottom dock → `/img/guides-asset/` |

### `docs/decks/importing-a-deck.mdx` — Importing a PowerPoint or PDF

| Line | Type | What to do |
|---|---|---|
| 56 | 📸 screenshot | add screenshot of the import preview sheet — thumbnail grid with checkboxes, Select all / Select none, footer buttons → `/img/guides-asset/` |

### `docs/decks/story-view.mdx` — Writing the Story

| Line | Type | What to do |
|---|---|---|
| 22 | 📸 screenshot | add screenshot of Story view — chapter rail, prose document, top actions row → `/img/guides-asset/` |


## 👥 Workspace & Members

### `docs/workspace/inviting-team-members.mdx` — Inviting Team Members

| Line | Type | What to do |
|---|---|---|
| 27 | 📸 screenshot | add screenshot — Workspace Settings → People page: header "People", Search box, Invite button, Members/Requests pill tabs, member table |
| 28 | 📸 screenshot | screenshot of the People page — needed from the live UI |
| 74 | 📸 screenshot | add screenshot — Invite dialog: email chips, "You're inviting N guests as Member", role dropdown, brand access cascade picker open |
| 75 | 📸 screenshot | screenshot of the invite dialog with the brand access picker open — needed from the live UI |

### `docs/workspace/managing-credits.mdx` — Managing Workspace Credits

| Line | Type | What to do |
|---|---|---|
| 116 | 📸 screenshot | add screenshot of the Buy Extra Credit modal (packs + custom amount + cost breakdown) → `/img/guides-asset/` |
| 139 | 📸 screenshot | add screenshot of the Extra Credit Purchases table in Billing → `/img/guides-asset/` |


## ⚙️ Settings & Administration

### `docs/settings/askfrnd-tools.mdx` — Setting the Workspace AskFRND Tools

| Line | Type | What to do |
|---|---|---|
| 24 | 📸 screenshot | add screenshot of the Workspace Settings → AskFRND Tools page → `/img/guides-asset/` |

### `docs/settings/experimental-features.mdx` — Turning On Experimental Features

| Line | Type | What to do |
|---|---|---|
| 24 | 📸 screenshot | add screenshot of the Workspace Settings → Experimental page → `/img/guides-asset/` |

### `docs/settings/insights-tabs.mdx` — Customizing Insights Tabs

| Line | Type | What to do |
|---|---|---|
| 22 | 📸 screenshot | add screenshot of the Workspace Settings → Insights Tabs editor → `/img/guides-asset/` |

### `docs/settings/data-privacy.mdx` — Your Data Rights — Export & Deletion

| Line | Type | What to do |
|---|---|---|
| 23 | 📸 screenshot | add screenshot of the Your Rights section with the two cards → `/img/guides-asset/` |
| 39 | 📸 screenshot · ✍️ confirm | add screenshot of the Export My Data confirmation dialog → `/img/guides-asset/` |
| 60 | 📸 screenshot | add screenshot of the Request Account Deletion dialog (before submission) → `/img/guides-asset/` |

### `docs/settings/notifications.mdx` — Notification Settings

| Line | Type | What to do |
|---|---|---|
| 21 | 📸 screenshot | add screenshot of Workspace Settings → Notifications — the four sections (How much you hear, Where it reaches you, Digest, Quiet hours) → `/img/guides-asset/` |


## 🧪 Early Access Features

### `docs/early-access/agents.mdx` — Agents & Teams (Beta)

| Line | Type | What to do |
|---|---|---|
| 39 | 📸 screenshot | add screenshot of the Agents page — Agents grid + Teams section, each with the blue "Experiment" badge → `/img/guides-asset/` |
| 121 | 📸 screenshot | add screenshot of the Browse Agents directory modal — search + agent cards with Install / Installed / Owned states → `/img/guides-asset/` |

### `docs/early-access/workflows.mdx` — Workflows (Beta)

| Line | Type | What to do |
|---|---|---|
| 36 | 📸 screenshot | add screenshot of the Workflows list page — table with the Experiment badge + New Workflow button → `/img/guides-asset/` |
| 59 | 📸 screenshot | add screenshot of the workflow canvas builder — node palette, a few connected nodes, top action bar (Notify / Schedule / Validate / Save / Run) → `/img/guides-asset/` |

### `docs/early-access/pitch.mdx` — Pitch (Beta)

| Line | Type | What to do |
|---|---|---|
| 43 | 📸 screenshot | add screenshot of the Projects list — folder grid, sort dropdown, New Project button → `/img/guides-asset/` |
| 53 | 📸 screenshot | add screenshot of the New Project modal — name, prospect/brand, deadline, Brief source segmented control (Upload / Paste text / Lark URL) → `/img/guides-asset/` |
| 90 | 📸 screenshot · ✍️ confirm | add screenshot of the Review wizard — left "The Pitch" cards (Brief / Audience / Decision-makers / Winning Strategy), right "The Plan" scope strip + preview, Confirm & Start button → `/img/guides-asset/` |
| 111 | 📸 screenshot | add screenshot of the runner — left step rail (deliverables grouped by phase), center step canvas, top chrome (back, pipeline toggle, context vault, comments, progress) → `/img/guides-asset/` |
