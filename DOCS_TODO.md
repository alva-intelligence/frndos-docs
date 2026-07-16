# Docs TODO — Manual Follow-ups

> Auto-maintained by the `writing-help-docs-from-code` skill. Lists every part of a Help Center guide that a human must finish because it **couldn't be read from the frnd-web codebase** — third-party iframes, screenshots, or flows the code doesn't reveal.
>
> **How to use:** work through each item, edit the referenced `docs/**` file, remove the `<!-- TODO ... -->` / `_[TODO ...]_` marker there, then delete the row here. When all rows for a file are gone, the guide is publish-ready.
>
> **Do not hand-invent these.** They're open precisely because guessing would be wrong. Confirm each from the live app (screenshot / walkthrough) before filling it in.
>
> Legend — **Type:** 📸 screenshot · ✍️ confirm-from-live-UI · 🔒 third-party/iframe (outside repo)

_Last updated: 2026-07-16_



## docs/collaboration/real-time-collaboration.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 14 | 📸 | Screenshot: KV Generator top nav — presence avatar chips (3–4 users) + overflow "+N" chip, adjacent to Share/Download buttons |
| 30 | 📸 | Screenshot: canvas in Concept or Craft mode — remote peer cursor (arrow + colored name pill) visible on canvas |

## docs/studio/kv-generator.mdx — board context menu section

| Line | Type | What to do |
| ---- | ---- | ---------- |
| (after "Viewing Version History" section) | 📸 | Screenshot: right-click menu on a Concept board — showing "Start designing", copy actions, Duplicate, Rename, Reset position, Remove from canvas |
| (after "Viewing Version History" section) | 📸 | Screenshot: right-click menu on a Craft board — showing Set as master, Version history…, Create variant, Send to Motion, Send to Resize alongside copy/rename/duplicate/reset/remove |

## docs/studio/motion-mode.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 41 | 📸 | Screenshot: Motion panel — Model dropdown, preset chips (Subtle Zoom highlighted), Duration/Ratio chips, Audio toggle, prompt textarea, "Generate motion" button |
| 111 | 📸 | Screenshot: Results section — one done row with inline video player, metadata line (model · preset · duration · ratio), Regenerate + Download + Delete actions |
| 135 | 📸 | Screenshot: Canvas in Motion mode — first-frame preview centered with "First frame" caption, Motion panel visible in bottom-left |

## docs/studio/resizer.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 54 | 📸 | Screenshot: Platform panel — Social Media group expanded showing platform rows, batch instruction textarea below ("Any specific instructions? (Optional)"), Start Resizing button with credit count |

## docs/studio/craft-mode.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 31 | 📸 | Screenshot: Craft mode chat panel — Crafter header (pink orb, "Polishing master + variants" status), Generate bar, and quick-action chips |
| 65 | 📸 | Screenshot: Creativity control in the Craft mode bottom bar — segmented pill with Raw · Low · Medium · High, "Low" selected (default state) |
| 167 | 📸 | Screenshot: Transform panel (bottom-right corner) alongside the Layers panel (bottom-left) — Position X/Y, Size W/H with lock icon, Rotate ° sections visible, single overlay selected |

## docs/studio/concepting-mode.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 24 | 📸 | Screenshot: top nav showing Concept/Craft tabs, Brand Identity pill (left), and Style pill (bottom) |
| 143 | 📸 | Screenshot: territory chips in the Conceptor chat panel + a concept board on the canvas |
| 171 | 📸 | Screenshot: creative rationale card below a concept board (showing header + rationale text) |

## docs/research/creating-a-general-survey.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 35 | 📸 | Screenshot: General Survey card in the Research hub |
| 43 | 🔒 | Survey builder runs in embedded Populix (outside repo). Confirm in-builder steps (question types, target respondents, criteria, duration) — do not guess |
| 51 | ✍️🔒 | Confirm exact builder fields, question types, and respondent options (live Populix tool) |

## docs/research/managing-surveys.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 17 | 📸 | Screenshot: Surveys list |
| 65 | 📸 | Screenshot: survey Overview metrics cards |
| 95 | ✍️🔒 | Confirm what the response/results view shows (embedded survey tool) |

## docs/research/assigning-brand-and-sharing.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 25 | 📸 | Screenshot: Brand dropdown on the Detail tab |

## docs/research/customer-intelligence-overview.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 30 | 📸 | Screenshot: Customer Intelligence overview (four cards + tabs) |
| 51 | ✍️ | Confirm how a user navigates to Customer Intelligence (sidebar/menu entry) — not readable from page code. Add exact path + screenshot |

## docs/research/importing-customers.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 22 | 📸 | Screenshot: Integrations tab upload area |
| 43 | ✍️ | Confirm sampling modal fields (custom count vs. percentage, credit cost display) |

## docs/research/exploring-customers-and-segments.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 30 | 📸 | Screenshot: Customer Table View |
| 49 | ✍️ | Confirm profile-drawer layout and section names |
| 60 | 📸 | Screenshot: Segment List |
| 62 | ✍️ | Confirm how a user CREATES a manual segment (exact action/flow) |

## docs/research/customer-insights.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 23 | 📸 | Screenshot: Customer Insights filter prompt |
| 35 | ✍️ | Confirm full set of result sections + exact labels (some are data-driven) |

## docs/askfrnd/skills.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 23 | ✍️ | Confirm how to open Chat Settings from the AskFrnd panel (button/menu) + screenshot |
| 40 | 📸 | Screenshot: Skills Directory |

## docs/askfrnd/lark-plugins.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 21 | ✍️ | Confirm how to open Chat Settings from the AskFrnd panel + screenshot |
| 35 | 📸 | Screenshot: Plugins list with Lark |
| 48 | ✍️ | Confirm exact Lark service display names in the Permissions list (server-driven) + screenshot |

## docs/workspace/managing-credits.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 116 | 📸 | Screenshot: Buy Extra Credit modal (packs + custom amount + cost breakdown) |
| 139 | 📸 | Screenshot: Extra Credit Purchases table in Billing |

## docs/settings/askfrnd-tools.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 24 | 📸 | Screenshot: Workspace Settings → AskFRND Tools page |

## docs/settings/insights-tabs.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 22 | 📸 | Screenshot: Workspace Settings → Insights Tabs editor |

## docs/settings/experimental-features.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 24 | 📸 | Screenshot: Workspace Settings → Experimental page |

## docs/settings/data-privacy.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 23 | 📸 | Screenshot: Your Rights section with the two cards (Export My Data + Delete My Account) |
| 39 | 📸 | Screenshot: Export My Data confirmation dialog |
| 60 | 📸 | Screenshot: Request Account Deletion dialog (before submission, showing form fields) |

## docs/early-access/agents.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 39 | 📸 | Screenshot: Agents page — Agents grid + Teams section, each with the blue "Experiment" badge (sidebar Agents entry marked Beta) |
| 121 | 📸 | Screenshot: Browse Agents directory modal — search + agent cards showing Install / Installed / Owned states |

## docs/early-access/workflows.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 36 | 📸 | Screenshot: Workflows list page — table (Name/Owner/Nodes/Schedule/Last Run/Enabled/Actions) with the "Experiment" badge + New Workflow button |
| 59 | 📸 | Screenshot: Workflow canvas builder — node palette, a few connected nodes, top action bar (Notify / Schedule / Validate / Save / Run) |

## docs/early-access/pitch.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 43 | 📸 | Screenshot: Projects list (Pitch beta) — folder grid, sort dropdown, New Project button |
| 53 | 📸 | Screenshot: New Project modal — name, prospect/brand, deadline, Brief source segmented control (Upload / Paste text / Lark URL) |
| 90 | 📸 | Screenshot: Review wizard — left "The Pitch" cards (Brief / Audience / Decision-makers / Winning Strategy), right "The Plan" scope strip + preview, Confirm & Start |
| 111 | 📸 | Screenshot: Runner — left step rail (deliverables by phase), center step canvas, top chrome (back, pipeline toggle, context vault, comments, progress) |
