# Docs TODO — Manual Follow-ups

> Auto-maintained by the `writing-help-docs-from-code` skill. Lists every part of a Help Center guide that a human must finish because it **couldn't be read from the frnd-web codebase** — third-party iframes, screenshots, or flows the code doesn't reveal.
>
> **How to use:** work through each item, edit the referenced `docs/**` file, remove the `<!-- TODO ... -->` / `_[TODO ...]_` marker there, then delete the row here. When all rows for a file are gone, the guide is publish-ready.
>
> **Do not hand-invent these.** They're open precisely because guessing would be wrong. Confirm each from the live app (screenshot / walkthrough) before filling it in.
>
> Legend — **Type:** 📸 screenshot · ✍️ confirm-from-live-UI · 🔒 third-party/iframe (outside repo)

_Last updated: 2026-07-14_

## docs/research/creating-a-general-survey.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 35 | 📸 | Screenshot: General Survey card in the Research hub |
| 43 | 🔒 | Survey builder runs in embedded Populix (outside repo). Confirm in-builder steps (question types, target respondents, criteria, duration) — do not guess |
| 51 | ✍️🔒 | Confirm exact builder fields, question types, respondent options (live Populix tool) |

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

## docs/workspace/managing-credits.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 116 | 📸 | Screenshot: Buy Extra Credit modal (packs + custom amount + cost breakdown) |
| 139 | 📸 | Screenshot: Extra Credit Purchases table in Billing |

## docs/settings/askfrnd-tools.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 24 | 📸 | Screenshot: Workspace Settings → AskFRND Tools page |

## docs/settings/experimental-features.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 24 | 📸 | Screenshot: Workspace Settings → Experimental page |

## docs/settings/insights-tabs.mdx

| Line | Type | What to do |
| ---- | ---- | ---------- |
| 22 | 📸 | Screenshot: Workspace Settings → Insights Tabs editor |
