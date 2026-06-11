---
version: alpha
name: frndOS Command Studio
description: A dark, precise, AI-native agency operating system for creative strategists generating, reviewing, and exporting brand-safe campaign work.
colors:
  primary: "#3A7FF7"
  primary-inverse: "#FFFFFF"
  tertiary: "#00FFDD"
  on-tertiary: "#004655"
  tertiary-muted: "#008090"
  tertiary-soft: "#C2FFF7"
  background: "#111111"
  surface: "#141414"
  surface-container-lowest: "#0A0A0A"
  surface-container-low: "#1A1A1A"
  surface-container: "#252525"
  surface-container-high: "#3D3D3D"
  surface-container-highest: "#454545"
  on-surface: "#F6F6F6"
  on-surface-subtle: "#D1D1D1"
  on-surface-muted: "#B0B0B0"
  on-surface-dim: "#888888"
  outline: "#2B2B2B"
  outline-strong: "#777777"
  inverse-surface: "#F6F6F6"
  inverse-on-surface: "#111111"
  overlay: "#000000"
  positive: "#0EBB8B"
  on-positive: "#ECFDF6"
  positive-container: "#054F3F"
  warning: "#FBCD28"
  on-warning: "#421F06"
  warning-container: "#713D12"
  negative: "#E74136"
  on-negative: "#FFF1F1"
  negative-container: "#861616"
  brand-gradient-start: "#761D3B"
  brand-gradient-end: "#002C33"
  auth-sky-deep: "#071044"
  auth-sky-bright: "#5DA7FF"
  creative-warm: "#FFAA47"
  creative-violet: "#9747FF"
  chart-aqua: "#02F3EC"
  chart-blue: "#3B82F6"
  chart-emerald: "#10B981"
  chart-purple: "#9370DB"
  chart-gold: "#FFD700"
  chart-coral: "#FF6B6B"
typography:
  display-2xl:
    fontFamily: General Sans
    fontSize: 72px
    fontWeight: 500
    lineHeight: 90px
    letterSpacing: -0.02em
  display-xl:
    fontFamily: General Sans
    fontSize: 60px
    fontWeight: 500
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg:
    fontFamily: General Sans
    fontSize: 48px
    fontWeight: 500
    lineHeight: 60px
    letterSpacing: -0.02em
  display-md:
    fontFamily: General Sans
    fontSize: 36px
    fontWeight: 500
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: General Sans
    fontSize: 32px
    fontWeight: 600
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: General Sans
    fontSize: 24px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: 500
    lineHeight: 30px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: -0.01em
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: -0.01em
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: -0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: 500
    lineHeight: 18px
    letterSpacing: 0em
  support-md:
    fontFamily: Funnel Sans
    fontSize: 16px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: -0.01em
rounded:
  none: 0px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 40px
  4xl: 48px
  5xl: 64px
  6xl: 80px
  shell-topbar: 88px
  shell-toolbar: 80px
  panel-padding: 24px
  canvas-gap: 24px
  modal-padding: 24px
  input-height: 48px
  control-height: 40px
  compact-control-height: 32px
  immersive-settings-shell-max-width: 1440px
  immersive-settings-page-top-nav-height: 72px
  immersive-settings-page-padding-x-md: 32px
  immersive-settings-page-padding-x-lg-xl: 80px
  immersive-settings-page-padding-x-2xl: 120px
  immersive-settings-body-padding-y: 48px
  immersive-settings-main-column-gap: 24px
  immersive-settings-inner-content-max-width: 736px
elevation:
  flat:
    shadow: "none"
    blur: 0px
  raised-panel:
    shadow: "0px 16px 24px 0px #000000CC"
    blur: 16px
  floating-menu:
    shadow: "0px 16px 24px 0px #000000CC"
    blur: 16px
  canvas-artboard:
    shadow: "0px 24px 48px 0px #00000099"
    blur: 0px
  modal:
    shadow: "0px 16px 24px 0px #000000CC"
    blur: 16px
  glow-aqua:
    shadow: "0px 0px 16px 3px #00FFDD"
    blur: 0px
shadows:
  panel: "0px 16px 24px 0px #000000CC"
  dropdown: "0px 16px 24px 0px #000000CC"
  artboard: "0px 24px 48px 0px #00000099"
  content-card: "0px 32px 32px 0px #00000066"
  aqua-glow: "0px 0px 16px 3px #00FFDD"
motion:
  duration-fast: 100ms
  duration-base: 150ms
  duration-smooth: 300ms
  duration-panel: 350ms
  duration-page: 600ms
  easing-standard: "cubic-bezier(0.4, 0, 0.2, 1)"
  easing-emphasized: "cubic-bezier(0.16, 1, 0.3, 1)"
  easing-smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
components:
  app-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  topbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    height: "{spacing.shell-topbar}"
    padding: "{spacing.panel-padding}"
  bottom-toolbar:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface}"
    height: "{spacing.shell-toolbar}"
    padding: "{spacing.panel-padding}"
    rounded: "{rounded.full}"
  command-pill:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: "{spacing.control-height}"
    padding: 8px 16px
  command-pill-active:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: "{spacing.compact-control-height}"
    padding: 6px 12px
  button-primary:
    backgroundColor: "{colors.primary-inverse}"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: 48px
    padding: 0px 24px
  button-primary-hover:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.inverse-on-surface}"
  button-primary-disabled:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface-muted}"
  button-secondary:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: 48px
    padding: 0px 24px
  button-secondary-hover:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
  button-icon:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    size: 40px
    padding: 8px
  input-field:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface-subtle}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 48px
    padding: 0px 12px
  input-field-active:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
  input-field-disabled:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.md}"
  chat-panel:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    width: 468px
    padding: 24px
  chat-message-user:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  chat-step-card:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  modal:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.modal-padding}"
  auth-background:
    backgroundColor: "{colors.auth-sky-deep}"
    textColor: "{colors.on-surface}"
  auth-background-bright:
    backgroundColor: "{colors.auth-sky-bright}"
    textColor: "{colors.inverse-on-surface}"
  auth-card:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 64px
  modal-overlay:
    backgroundColor: "{colors.overlay}"
    textColor: "{colors.on-surface}"
  dropdown-menu:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 4px
  panel-muted:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.md}"
    padding: 16px
  panel-strong:
    backgroundColor: "{colors.surface-container-highest}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  divider:
    backgroundColor: "{colors.outline}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.outline-strong}"
    height: 1px
  focus-ring:
    backgroundColor: "{colors.primary}"
    size: 2px
  badge-neutral:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xs}"
    padding: 4px 8px
  badge-translucent:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xs}"
    padding: 4px 8px
  badge-success:
    backgroundColor: "{colors.positive-container}"
    textColor: "{colors.on-positive}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xs}"
    padding: 4px 8px
  badge-error:
    backgroundColor: "{colors.negative-container}"
    textColor: "{colors.on-negative}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xs}"
    padding: 4px 8px
  badge-warning:
    backgroundColor: "{colors.warning-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xs}"
    padding: 4px 8px
  intelligence-chip:
    backgroundColor: "{colors.tertiary-soft}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  intelligence-chip-muted:
    backgroundColor: "{colors.tertiary-muted}"
    textColor: "{colors.primary-inverse}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  intelligence-accent:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.full}"
    size: 8px
  metric-progress-positive:
    backgroundColor: "{colors.positive}"
    rounded: "{rounded.full}"
    height: 4px
  metric-progress-warning:
    backgroundColor: "{colors.warning}"
    rounded: "{rounded.full}"
    height: 4px
  metric-progress-negative:
    backgroundColor: "{colors.negative}"
    rounded: "{rounded.full}"
    height: 4px
  inverse-callout:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    rounded: "{rounded.md}"
    padding: 16px
  brand-ambient-start:
    backgroundColor: "{colors.brand-gradient-start}"
    textColor: "{colors.on-surface}"
  brand-ambient-end:
    backgroundColor: "{colors.brand-gradient-end}"
    textColor: "{colors.on-surface}"
  creative-accent-warm:
    backgroundColor: "{colors.creative-warm}"
    textColor: "{colors.on-warning}"
  creative-accent-violet:
    backgroundColor: "{colors.creative-violet}"
  metadata-dim:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface-dim}"
    typography: "{typography.label-sm}"
  chart-series-aqua:
    backgroundColor: "{colors.chart-aqua}"
    textColor: "{colors.on-tertiary}"
  chart-series-blue:
    backgroundColor: "{colors.chart-blue}"
    textColor: "{colors.inverse-on-surface}"
  chart-series-emerald:
    backgroundColor: "{colors.chart-emerald}"
    textColor: "{colors.inverse-on-surface}"
  chart-series-purple:
    backgroundColor: "{colors.chart-purple}"
    textColor: "{colors.inverse-on-surface}"
  chart-series-gold:
    backgroundColor: "{colors.chart-gold}"
    textColor: "{colors.on-warning}"
  chart-series-coral:
    backgroundColor: "{colors.chart-coral}"
    textColor: "{colors.inverse-on-surface}"
---

## Overview

frndOS Command Studio is a dark, precise, AI-native operating system for agency creative strategists. It should feel like a production command center for moving from brand context to campaign-ready output: fast to scan, direct to operate, and intelligent without theatrical AI effects.

The product personality is **precise, fast, intelligent**. It should feel sharp and quietly powerful, not playful or ornamental. The interface exists for people generating, reviewing, annotating, resizing, versioning, and exporting brand-safe campaign work under time pressure.

The dominant impression is a dark canvas with floating controls: persistent top navigation, bottom toolbars, right-side AI chat, crisp panels, large creative previews, and a dotted grid workspace. The creative output is the hero. Navigation, chat, history, settings, and metadata are support structures around it.

Authentication and welcome surfaces can be more atmospheric than the working UI: deep blue skies, star-like texture, and oversized rounded glass panels are acceptable there because they create a sense of entering the operating system. Once inside the product, the interface should become more restrained and tool-like.

## Colors

The palette is dark-first, built on a solid greyscale backbone that powers surfaces and text hierarchy. A single brand primary drives interaction, with semantic colors for status and a rare aqua accent reserved for credits and AI energy.

- **Primary (#3A7FF7):** The FRND blue. Used for main actions, active states, and brand highlights. Hover and disabled states use the extended primary scale (`#4E9EF8`, `#224EB0`).
- **Greyscale Backbone (#0A0A0A – #F6F6F6):** The foundation of the interface. 
  - **Background (#111111):** The default app canvas.
  - **Surface Ladder (#141414, #1A1A1A, #252525, #3D3D3D, #454545):** Creates depth through tonal layering without heavy borders. Panels, inputs, and menus step up this ladder.
  - **Text Hierarchy (#F6F6F6, #D1D1D1, #B0B0B0, #888888):** Solid grey values map to text emphasis. `on-surface` (#F6F6F6) is primary text; `subtle`, `muted`, and `dim` step down for metadata and disabled states.
- **Semantic Colors:** Functional only. Green, yellow, and red are used for status badges, progress indicators, and destructive actions. Container variants are dark to preserve the dark theme.
- **Tertiary Aqua (#00FFDD):** A rare accent reserved exclusively for credits, AI/FRND intelligence cues, and token highlights. Do not wash the UI in aqua.
- **Creative Accents:** Warm (#FFAA47) and violet (#9747FF) accents are reserved for atmospheric moments (auth surfaces, brand gradients) and should not appear in dense workspace screens.

Avoid pure decorative gradients for text. Gradients belong in backgrounds, atmospheric surfaces, or branded moments.

## Typography

The typography system pairs **General Sans** for product voice and larger hierarchy with **Geist** for dense operational UI. **Funnel Sans** can support descriptive or helper text where a softer voice is useful.

- **General Sans:** Use for page titles, empty states, creative prompts, metric values, and moments where the product needs to sound confident.
- **Geist:** Use for controls, labels, chat messages, metadata, menus, inputs, timestamps, and dense tool surfaces.
- **Funnel Sans:** Use sparingly for supporting descriptions and conversational helper text.

Product UI should keep typography compact. Most controls live at 12-16px with 1.4-1.6 line-height. Large display sizes are reserved for landing, empty, or metric moments. Letter spacing is usually slightly negative to preserve the tight, engineered quality of the interface.

## Layout

The layout model is a **command-center canvas**. The app shell provides stable chrome; the workspace center remains fluid and expressive. Studio screens should reserve vertical space for an 88px topbar and an 80px bottom toolbar, then center the creative object in the remaining visible area.

Use a 4px base unit with common jumps at 8, 12, 16, 24, 32, 48, 64, and 80px. The system is compact, but not cramped: controls often use 8-12px internal gaps, while panels and screen-level chrome use 24px padding.

For creative tools, the canvas should dominate. Side panels may slide in, but they should not recenter the entire experience abruptly. If a right chat panel or left version panel appears, the canvas should rebalance smoothly with measured padding shifts.

### Immersive settings shell (Figma)

Workspace Settings and Brand Settings share one **immersive settings page template** (Figma file *Workspace Settings*). Tokens live under `spacing.immersive-settings-*` and `components.immersive-settings-page-template` in the YAML front matter.

#### Figma (source of truth)

**Anatomy**

1. **Top Nav** — Full **viewport width**; height **72px**. Inner row: **40px** circular back control, **24px** gap, page title (≈28px line). Horizontal inset to the aligned content: **32px** at md, **80px** at lg and xl, **120px** at 2xl (frame widths 768 / 1024 / 1280 / 1536 in node `10014:5197`).
2. **Body** — **No** vertical gap between **Top Nav** and the **Main Form** row (flush under the header border). **48px** vertical padding (**`py-12`**) lives **inside** the **sidebar** and **inside** the **main scroll column** so scrollable content is not clipped by the overflow container.
3. **Main Form** — Same horizontal inset as the top nav inner row. **Sidebar** (local nav) + **Content Wrapper**; horizontal gap between them **24px** in the md frame.
4. **Inner Content** — Form blocks: **full width** of the Content Wrapper on md (**522px** frame) and lg (**716px**); on **xl** and **2xl**, a **736px**-wide column **centered** inside the wider Content Wrapper.

Figma names the top region “Top Nav” in a sticky layout study; the file does not dictate `position: sticky` for every handoff. Treat **full-width chrome + aligned inset** as the layout contract.

**Breakpoint table (from Figma `10014:5197`)**

| Label | Frame width | Page inset (to Main Form) | Top nav height | Nav → grid gap; column vertical padding | Inner “Content” max width |
| --- | ---: | ---: | ---: | ---: | --- |
| md | 768 | 32px | 72px | 0; 48px sidebar + main | 522px (full wrapper) |
| lg | 1024 | 80px | 72px | 0; 48px sidebar + main | 716px (full wrapper) |
| xl | 1280 | 80px | 72px | 0; 48px sidebar + main | 736px (centered in wrapper) |
| 2xl | 1536 | 120px | 72px | 0; 48px sidebar + main | 736px (centered in wrapper) |

**12-column note:** Auto-layout widths in Figma are **fractional** relative to a 12-column intent (narrow sidebar + wide main + optional centered reading column). Do not assume literal “6 spans + 10 spans” unless a frame explicitly documents it; prefer the measured widths above.

**Figma references**

- [Breakpoint board `10014:5197`](https://www.figma.com/design/kPDrHHknL60pvL5onOw0nm/Workspace-Settings?node-id=10014-5197)
- [2xl template frame `10014:4837`](https://www.figma.com/design/kPDrHHknL60pvL5onOw0nm/Workspace-Settings?node-id=10014-4837)
- [Sidebar `10014:4722`](https://www.figma.com/design/kPDrHHknL60pvL5onOw0nm/Workspace-Settings?node-id=10014-4722)
- [Content wrapper `10014:4723`](https://www.figma.com/design/kPDrHHknL60pvL5onOw0nm/Workspace-Settings?node-id=10014-4723)
- [Inner content `10014:4836`](https://www.figma.com/design/kPDrHHknL60pvL5onOw0nm/Workspace-Settings?node-id=10014-4836)

#### Implementation (current)

- **Dashboard shell:** Immersive brand/workspace settings routes use **`immersiveSettingsDashboardPageGridClass()`** from [`src/lib/dashboardShell.ts`](src/lib/dashboardShell.ts) — same 12-column grid and gap as the dashboard page grid, but **`px-0 py-0`** and **`max-w-[1440px]`** so responsive **`md:py-8` / `lg:py-10`** from `dashboardPageGridClass` never apply ([`src/app/(dashboard)/layout.tsx`](src/app/(dashboard)/layout.tsx)).
- **Top bar:** Shared **[`ImmersiveSettingsShell`](src/components/settings/ImmersiveSettingsShell.tsx)** for Brand and Workspace settings: **`<header>`** is **full width** with **`border-b`**; inner row **`min-h-[72px]`**, **`max-w-[1440px] mx-auto`**, horizontal padding **`px-4 sm:px-6 md:px-8`** (32px from **md**, matching Figma `10014:5197`), **`lg:px-20`** (80px **lg** / **xl**), **`2xl:px-[120px]`** (120px **2xl**); **`gap-6`** (24px) between back (**40×40**) and title ([`src/app/(dashboard)/brands/[id]/settings/layout.tsx`](src/app/(dashboard)/brands/[id]/settings/layout.tsx), [`src/app/(dashboard)/workspace-settings/layout.tsx`](src/app/(dashboard)/workspace-settings/layout.tsx)).
- **Body column:** Same **`max-w-[1440px]`** + horizontal padding; **no** vertical padding on the grid wrapper (content sits flush under the top nav border). **Sidebar** and **main scroll column** each use **`py-12`** (48px); the main column uses **`pb-[calc(3rem+100px)]`** so the last content clears the floating save bar while keeping **48px** inset above that reserve.
- **Grid:** From **`md`**, **`grid-cols-8`** and **`gap-x-6`**; from **`lg`**, **`grid-cols-12`**. Sidebar **`md:col-span-2`**, **`lg:col-span-3`**, **`lg:sticky lg:top-0`**. Main column **`md:col-span-6 md:col-start-3`**, **`lg:col-span-9 lg:col-start-4`**, **`md:overflow-y-auto`**. Below **`md`**, sidebar and main **stack** with page scroll. Main column wraps page content in **`max-w-[736px] mx-auto w-full`** so forms match the Figma inner content width on wide viewports ([Figma `10014:5197`](https://www.figma.com/design/kPDrHHknL60pvL5onOw0nm/Workspace-Settings?node-id=10014-5197)).
- **Code:** [`src/components/settings/ImmersiveSettingsShell.tsx`](src/components/settings/ImmersiveSettingsShell.tsx), route layouts above.

### Module hub shell (Figma)

The `/home`, `/studio`, `/research` pillar pages and **Brand Insights Overview** (`/brands/[id]`) share a **module hub shell** that mirrors the immersive settings frame but replaces the sidebar+content split with a single 12-column grid containing a centered "lead" column for the greeting / CMD+K / suggestions and full-width children below.

#### Figma (source of truth)

[Home Page board `2390:10433`](https://www.figma.com/design/17yTkfyIVb5Aqcq0lTevOT/Foundations?node-id=2390-10433)

**Column grid (breakpoint table)**

| Label | Columns | Margin (frame inset) | Column gap (padding) | Max width |
| --- | ---: | ---: | ---: | --- |
| below md | 8 | `px-4 sm:px-6` | 24px (`gap-x-6`) | 1440px |
| md | 8 | 32px (`md:px-8`) | 24px | 1440px |
| lg | 12 | 80px (`lg:px-20`) | 24px | 1440px |
| xl | 12 | 80px | 24px | 1440px |
| 2xl | 12 | 120px (`2xl:px-[120px]`) | 24px | 1440px |

Utilities in [`dashboardShell.ts`](src/lib/dashboardShell.ts): `moduleHubFrameMarginClass()`, `moduleHubFrameMaxWidthClass()` (`max-w-[1440px]`), `moduleHubGridClass()` (`grid-cols-8` → `lg:grid-cols-12`, `gap-x-6`). Lead track: `col-span-8` on md, `lg:col-[2/span_10]`, `xl:col-[3/span_8]`, `py-[64px]`. Body sections: `col-span-8` / `lg:col-span-12`. Tailwind must scan `src/lib/**` (see `tailwind.config.ts` content).

#### Implementation (current)

- **App shell:** Floating top nav + scroll viewport + floating bottom nav live in [`layout.tsx`](src/app/(dashboard)/layout.tsx) and [`DashboardFloatingChrome`](src/components/frndos/DashboardFloatingChrome.tsx). Module hub routes render page content directly in the dashboard scroll area (no extra layout grid wrapper).
- **Content wrapper:** [`ModuleHubShell`](src/components/frndos/ModuleHubShell.tsx) uses `moduleHubContentWrapperClass()` (margins + `max-w-[1440px]`) and `moduleHubGridClass()`. Lead uses `moduleHubLeadColumnClass()` + `moduleHubLeadInnerClass()`. Body uses `moduleHubBodyColumnClass()` + `moduleHubSectionGapClass()` (`gap-20` between sections). Pass `embedded` on Brand Overview to skip frame max-width.
- **Brand Overview:** [`OverviewHomeContent`](src/components/brands/OverviewHomeContent.tsx) uses `<ModuleHubShell embedded>` for the Get Started lead (AISummary, command bar, suggested prompts) and full-width KPI / trends sections below.
- **Utilities:** `isModuleHubRoute()`, `moduleHubContentWrapperClass()`, `moduleHubFrameMarginClass()`, `moduleHubFrameMaxWidthClass()`, `moduleHubGridClass()`, `moduleHubLeadColumnClass()`, `moduleHubBodyColumnClass()`, `moduleHubSectionGapClass()` in [`src/lib/dashboardShell.ts`](src/lib/dashboardShell.ts).

## Elevation & Depth

Depth comes from tonal layering, blur, and strong dark shadows rather than broad material shadows. Panels feel like dark translucent instruments floating above a matte workspace.

- **Base:** Dark background with a subtle dotted grid or low-contrast surface.
- **Panel layer:** Near-black surfaces with a faint white overlay impression and 1px low-contrast outline.
- **Floating layer:** Dropdowns, menus, and modals use stronger black shadows and 16px backdrop blur.
- **Canvas objects:** Generated creative previews cast broad deep shadows so they feel like physical work sitting on the canvas.
- **Auth glass:** Login and welcome cards can use extra-large radii and stronger dark glass treatment, sitting over atmospheric blue backgrounds.

Use glow only as a purposeful signal. Aqua glow is a special effect for token/AI energy, not general decoration.

## Shapes

The shape language is rounded but controlled. The system should feel like professional creative software, not a soft consumer app.

- **Small controls:** 8-12px radius for menu items, small buttons, badges, and compact states.
- **Inputs and message bubbles:** 16px radius, with selective corner tightening when it clarifies message direction.
- **Floating panels and modals:** 24-32px radius, especially chat panels and large Studio surfaces.
- **Pills and segmented controls:** Full radius for mode switchers, brand chips, tool selectors, and quick actions.

Do not mix sharp rectangles with heavily rounded containers in the same cluster. Radius should reinforce hierarchy: compact controls are tighter; important floating surfaces are softer.

## Components

### App Shell

The shell should be dark and stable. Topbars and bottom toolbars use floating, translucent black surfaces with subtle borders. Primary navigation should be persistent, compact, and predictable so users can move quickly between Studio, Insights, Research, Growth, and Ask FRND.

### Buttons

Primary buttons are white with dark text. This is deliberate: primary actions should feel unambiguous and high-confidence. Secondary buttons sit on dark translucent surfaces. Destructive buttons use red sparingly and should never compete with the main creation flow unless the action is irreversible.

### Inputs

Inputs use dark translucent fills, 16px radius, and Geist typography. Active state increases surface brightness and border contrast. Placeholder text should be muted gray, while filled text should move close to white.

### Chat and Ask FRND

AI chat is operational, not magical. It should show helpful structure: prompts, steps, reasoning snippets, model controls, and next actions. Chat panels are large enough to work inside but visually secondary to the creative canvas.

Message bubbles should be compact and readable. AI response steps can use small cards with icons, muted labels, duration metadata, and progressive disclosure.

### Canvas and Studio Tools

The canvas uses a low-contrast dotted grid to imply scale, pan, and precision. Creative previews sit above it with broad dark shadows. Toolbars should float over the canvas rather than carve the page into heavy sections.

Artboard selection, resizing, version history, layers, craft, and export all belong to the same production-tool language: direct controls, clear state, and minimal instructional copy.

### Badges and Metrics

Badges should be compact, rounded, and semantically clear. Metrics use large General Sans values with small Geist labels. Status color belongs in the badge or progress bar, not as a large decorative wash.

## Do's and Don'ts

- Do keep creative output at the center of the screen.
- Do use white as the primary action color on dark surfaces.
- Do use dark tonal layers, blur, and shadows to separate interface depth.
- Do keep Ask FRND present, structured, and useful inside the workflow.
- Do use aqua as a rare intelligence cue, not a general accent wash.
- Do preserve compact 12-16px operational typography for dense tool surfaces.
- Do make state changes feel fast with 100-350ms transform, opacity, and color transitions.
- Don't make the product look like a generic AI dashboard with glowing gradient cards.
- Don't use gradient text as a visual shortcut.
- Don't turn Studio into a consumer playground; it must feel agency-grade and production-ready.
- Don't wrap every section in a card. Use containment only when it clarifies a control group.
- Don't overuse glassmorphism. Blur should support panels and overlays, not become the design.
- Don't hide critical creation, review, resize, version, or export controls on smaller layouts; adapt them.
