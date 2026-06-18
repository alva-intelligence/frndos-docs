# frndos-docs Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply frndOS Command Studio design system (`DESIGN.md`) ke help center Docusaurus — token (warna/tipografi/radius/shadow/motion), self-host 3 font, dark-first default, reskin chrome + Hero/Features.

**Architecture:** Tiga file CSS — `tokens.css` (raw DESIGN.md → `--frnd-*`), `fonts.css` (`@font-face` self-host), `custom.css` (orchestrator: import + map `--frnd-*` → Infima `--ifm-*` per mode + reskin komponen). Config: `colorMode` dark-first + Prism theme di-tune via CSS override.

**Tech Stack:** Docusaurus 3.3.2, Infima CSS, React 18, npm. **Tidak ada test framework** — "test" = `npm run build-local` sukses + verifikasi visual via dev server (`npm run dev:local`, port 3333).

**Catatan verifikasi:** Project ini styling murni. Tiap task diverifikasi dengan build berhasil dan/atau inspeksi visual, bukan unit test.

---

## File Structure

| File | Status | Tanggung jawab |
|------|--------|----------------|
| `src/css/fonts.css` | Create | `@font-face` General Sans / Geist / Funnel Sans |
| `src/css/tokens.css` | Create | Raw DESIGN.md values sebagai `--frnd-*` vars |
| `src/css/custom.css` | Modify | Import + map ke Infima + reskin komponen |
| `src/components/Hero/index.module.css` | Modify | Reskin Hero block |
| `src/components/Features/styles.module.css` | Modify | Reskin Features block |
| `docusaurus.config.js` | Modify | `colorMode` dark-first |
| `config/docusaurus/index.json` | Modify | footer `style: dark` (verifikasi) |

---

## Task 1: Self-host fonts (`fonts.css`)

**Files:**
- Create: `src/css/fonts.css`

- [ ] **Step 1: Verifikasi file font ada**

Run: `find static/fonts -name "*.ttf" | sort`
Expected: 14 General Sans + 9 Geist + 12 Funnel Sans `.ttf` files. Khususnya pastikan ada:
`static/fonts/general-sans/GeneralSans-Variable.ttf`, `static/fonts/geist/Geist-Regular.ttf`, `static/fonts/funnel/FunnelSans-Regular.ttf`.

- [ ] **Step 2: Tulis `src/css/fonts.css`**

```css
/* Self-hosted fonts — frndOS Command Studio
 * Paths resolve from site root (Docusaurus serves static/ at /). */

/* General Sans — variable (heading) */
@font-face {
  font-family: "General Sans";
  src: url("/fonts/general-sans/GeneralSans-Variable.ttf") format("truetype-variations");
  font-weight: 200 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "General Sans";
  src: url("/fonts/general-sans/GeneralSans-VariableItalic.ttf") format("truetype-variations");
  font-weight: 200 700;
  font-style: italic;
  font-display: swap;
}

/* Geist — body / UI (static weights) */
@font-face {
  font-family: "Geist";
  src: url("/fonts/geist/Geist-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Geist";
  src: url("/fonts/geist/Geist-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Geist";
  src: url("/fonts/geist/Geist-SemiBold.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Geist";
  src: url("/fonts/geist/Geist-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Funnel Sans — helper text (selektif) */
@font-face {
  font-family: "Funnel Sans";
  src: url("/fonts/funnel/FunnelSans-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Funnel Sans";
  src: url("/fonts/funnel/FunnelSans-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Funnel Sans";
  src: url("/fonts/funnel/FunnelSans-SemiBold.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/css/fonts.css
git commit -m "feat: self-host General Sans, Geist, Funnel Sans fonts"
```

---

## Task 2: Token layer (`tokens.css`)

**Files:**
- Create: `src/css/tokens.css`

Raw DESIGN.md values sebagai `--frnd-*`. Mode-agnostic (literal source of truth); mapping mode dilakukan di `custom.css`.

- [ ] **Step 1: Tulis `src/css/tokens.css`**

```css
/* frndOS Command Studio — raw design tokens (literal dari DESIGN.md).
 * Jangan map ke Infima di sini; itu tugas custom.css. */
:root {
  /* Colors — core */
  --frnd-primary: #3a7ff7;
  --frnd-primary-hover: #4e9ef8;
  --frnd-primary-active: #224eb0;
  --frnd-primary-inverse: #ffffff;

  --frnd-tertiary: #00ffdd;
  --frnd-on-tertiary: #004655;
  --frnd-tertiary-muted: #008090;
  --frnd-tertiary-soft: #c2fff7;

  --frnd-background: #111111;
  --frnd-surface: #141414;
  --frnd-surface-lowest: #0a0a0a;
  --frnd-surface-low: #1a1a1a;
  --frnd-surface-container: #252525;
  --frnd-surface-high: #3d3d3d;
  --frnd-surface-highest: #454545;

  --frnd-on-surface: #f6f6f6;
  --frnd-on-surface-subtle: #d1d1d1;
  --frnd-on-surface-muted: #b0b0b0;
  --frnd-on-surface-dim: #888888;

  --frnd-outline: #2b2b2b;
  --frnd-outline-strong: #777777;

  --frnd-inverse-surface: #f6f6f6;
  --frnd-inverse-on-surface: #111111;
  --frnd-overlay: #000000;

  /* Semantic */
  --frnd-positive: #0ebb8b;
  --frnd-on-positive: #ecfdf6;
  --frnd-positive-container: #054f3f;
  --frnd-warning: #fbcd28;
  --frnd-on-warning: #421f06;
  --frnd-warning-container: #713d12;
  --frnd-negative: #e74136;
  --frnd-on-negative: #fff1f1;
  --frnd-negative-container: #861616;

  /* Atmospheric / brand */
  --frnd-brand-gradient-start: #761d3b;
  --frnd-brand-gradient-end: #002c33;

  /* Radius */
  --frnd-radius-none: 0px;
  --frnd-radius-xs: 8px;
  --frnd-radius-sm: 12px;
  --frnd-radius-md: 16px;
  --frnd-radius-lg: 24px;
  --frnd-radius-xl: 32px;
  --frnd-radius-full: 9999px;

  /* Spacing */
  --frnd-space-xs: 4px;
  --frnd-space-sm: 8px;
  --frnd-space-md: 12px;
  --frnd-space-lg: 16px;
  --frnd-space-xl: 24px;
  --frnd-space-2xl: 32px;
  --frnd-space-3xl: 40px;
  --frnd-space-4xl: 48px;

  /* Shadows */
  --frnd-shadow-panel: 0px 16px 24px 0px #000000cc;
  --frnd-shadow-dropdown: 0px 16px 24px 0px #000000cc;
  --frnd-shadow-artboard: 0px 24px 48px 0px #00000099;
  --frnd-shadow-content-card: 0px 32px 32px 0px #00000066;

  /* Motion */
  --frnd-duration-fast: 100ms;
  --frnd-duration-base: 150ms;
  --frnd-duration-smooth: 300ms;
  --frnd-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --frnd-ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);

  /* Font families */
  --frnd-font-display: "General Sans", system-ui, sans-serif;
  --frnd-font-body: "Geist", system-ui, -apple-system, sans-serif;
  --frnd-font-support: "Funnel Sans", system-ui, sans-serif;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/css/tokens.css
git commit -m "feat: add frndOS design tokens (tokens.css)"
```

---

## Task 3: Orchestrate `custom.css` — import + font + dark/light mapping

**Files:**
- Modify: `src/css/custom.css` (replace seluruh isi)

Replace isi `custom.css` saat ini (Infima primary scale + navbar logo). Pertahankan blok `.navbar__logo` yang sudah ada.

- [ ] **Step 1: Replace `src/css/custom.css`**

```css
/**
 * Global CSS. Infima base + frndOS Command Studio design system.
 * Token literal di tokens.css; @font-face di fonts.css.
 */
@import "./tokens.css";
@import "./fonts.css";

/* ===== Typography base ===== */
:root {
  --ifm-font-family-base: var(--frnd-font-body);
  --ifm-heading-font-family: var(--frnd-font-display);
  --ifm-heading-font-weight: 600;
  --ifm-font-weight-bold: 600;
  --ifm-global-radius: var(--frnd-radius-sm);
  --ifm-code-font-size: 95%;
  --ifm-transition-fast: var(--frnd-duration-fast);
  --ifm-transition-slow: var(--frnd-duration-smooth);
  --ifm-transition-timing-default: var(--frnd-ease-standard);
}

h1, h2, h3, h4, h5, h6,
.hero__title,
.markdown > h1,
.markdown > h2 {
  font-family: var(--frnd-font-display);
  letter-spacing: -0.01em;
}

/* ===== LIGHT MODE (turunan — DESIGN.md murni dark) ===== */
:root {
  --ifm-color-primary: #3a7ff7;
  --ifm-color-primary-dark: #1c6ef5;
  --ifm-color-primary-darker: #1066ef;
  --ifm-color-primary-darkest: #0d54c4;
  --ifm-color-primary-light: #5890f8;
  --ifm-color-primary-lighter: #6798f9;
  --ifm-color-primary-lightest: #93b6fb;

  --ifm-background-color: #ffffff;
  --ifm-background-surface-color: #f6f6f6;
  --ifm-font-color-base: #111111;
  --ifm-heading-color: #111111;
  --ifm-color-emphasis-300: #d1d1d1;

  --ifm-code-background: #f0f0f0;
  --ifm-global-shadow-lw: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

/* ===== DARK MODE (default — DESIGN.md command-center) ===== */
[data-theme="dark"] {
  --ifm-color-primary: #4e9ef8;
  --ifm-color-primary-dark: #3a7ff7;
  --ifm-color-primary-darker: #2f74ed;
  --ifm-color-primary-darkest: #224eb0;
  --ifm-color-primary-light: #6db0f9;
  --ifm-color-primary-lighter: #8fc3fb;
  --ifm-color-primary-lightest: #c2ddfd;

  --ifm-background-color: var(--frnd-background);
  --ifm-background-surface-color: var(--frnd-surface);
  --ifm-font-color-base: var(--frnd-on-surface);
  --ifm-heading-color: var(--frnd-on-surface);
  --ifm-color-content-secondary: var(--frnd-on-surface-muted);

  --ifm-color-emphasis-0: var(--frnd-surface-lowest);
  --ifm-color-emphasis-100: var(--frnd-surface-low);
  --ifm-color-emphasis-200: var(--frnd-surface-container);
  --ifm-color-emphasis-300: var(--frnd-outline);

  --ifm-navbar-background-color: var(--frnd-surface);
  --ifm-footer-background-color: var(--frnd-surface-lowest);
  --ifm-background-color-secondary: var(--frnd-surface-low);

  --ifm-code-background: var(--frnd-surface-low);
  --ifm-global-shadow-md: var(--frnd-shadow-panel);
  --ifm-global-shadow-tl: var(--frnd-shadow-panel);
  --docusaurus-highlighted-code-line-bg: rgba(255, 255, 255, 0.08);
}

/* ===== Navbar logo (preserved) ===== */
.navbar__logo {
  height: 1.5rem;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
}
.navbar__logo img {
  height: 100%;
  width: auto;
  object-fit: contain;
}
.navbar__brand {
  align-items: center;
}
```

- [ ] **Step 2: Build untuk verifikasi import resolve**

Run: `npm run build-local`
Expected: build sukses, no "Can't resolve './tokens.css'" / "./fonts.css".

- [ ] **Step 3: Commit**

```bash
git add src/css/custom.css
git commit -m "feat: wire frndOS tokens to Infima, dark+light color mapping"
```

---

## Task 4: Dark-first default (`docusaurus.config.js`)

**Files:**
- Modify: `docusaurus.config.js` (tambah `colorMode` di `themeConfig`, sebelum `navbar`)

- [ ] **Step 1: Tambah `colorMode` ke `themeConfig`**

Di `docusaurus.config.js`, dalam object `themeConfig: ({ ... })`, tambahkan tepat sebelum `navbar: {`:

```js
      colorMode: {
        defaultMode: "dark",
        respectPrefersColorScheme: false,
      },
```

- [ ] **Step 2: Build**

Run: `npm run build-local`
Expected: build sukses.

- [ ] **Step 3: Verifikasi visual dark-first**

Run: `npm run dev:local` lalu buka `http://localhost:3333/docs/intro`
Expected: halaman load dalam dark mode default (bg `#111111`), heading General Sans, body Geist. Toggle ke light → bg putih, tetap terbaca.

- [ ] **Step 4: Commit**

```bash
git add docusaurus.config.js
git commit -m "feat: default to dark mode (DESIGN.md command-center)"
```

---

## Task 5: Reskin chrome — navbar, sidebar, footer, TOC

**Files:**
- Modify: `src/css/custom.css` (append blok komponen sebelum blok navbar logo, atau di akhir file)

- [ ] **Step 1: Append blok reskin chrome ke `custom.css`**

Tambahkan di akhir `src/css/custom.css`:

```css
/* ===== Chrome reskin (dark) ===== */
[data-theme="dark"] .navbar {
  border-bottom: 1px solid var(--frnd-outline);
  backdrop-filter: blur(8px);
}
[data-theme="dark"] .navbar__link:hover,
[data-theme="dark"] .navbar__link--active {
  color: var(--frnd-primary);
}

/* Sidebar */
[data-theme="dark"] .theme-doc-sidebar-container {
  background-color: var(--frnd-surface-lowest);
  border-right: 1px solid var(--frnd-outline);
}
.menu__link {
  border-radius: var(--frnd-radius-sm);
  transition: background-color var(--frnd-duration-fast) var(--frnd-ease-standard),
    color var(--frnd-duration-fast) var(--frnd-ease-standard);
}
[data-theme="dark"] .menu__link:hover {
  background-color: var(--frnd-surface-low);
}
[data-theme="dark"] .menu__link--active {
  background-color: rgba(58, 127, 247, 0.14);
  color: var(--frnd-primary);
}

/* Footer */
[data-theme="dark"] .footer {
  border-top: 1px solid var(--frnd-outline);
}

/* Table of contents */
[data-theme="dark"] .table-of-contents__link:hover,
[data-theme="dark"] .table-of-contents__link--active {
  color: var(--frnd-primary);
}
[data-theme="dark"] .table-of-contents {
  border-left-color: var(--frnd-outline);
}
```

- [ ] **Step 2: Build + visual check**

Run: `npm run build-local`
Expected: sukses. Lalu `npm run dev:local` → cek navbar border tipis, sidebar item aktif biru lembut, footer border-top.

- [ ] **Step 3: Commit**

```bash
git add src/css/custom.css
git commit -m "feat: reskin navbar, sidebar, footer, TOC for dark theme"
```

---

## Task 6: Reskin code, inline code, admonitions, cards, buttons, search

**Files:**
- Modify: `src/css/custom.css` (append)

- [ ] **Step 1: Append blok ke `custom.css`**

```css
/* ===== Code ===== */
[data-theme="dark"] pre,
[data-theme="dark"] .prism-code,
[data-theme="dark"] div[class*="codeBlockContainer"] {
  background-color: var(--frnd-surface-lowest) !important;
}
div[class*="codeBlockContainer"] {
  border-radius: var(--frnd-radius-md);
}
code {
  border-radius: var(--frnd-radius-xs);
}
[data-theme="dark"] :not(pre) > code {
  background-color: var(--frnd-surface-low);
  border: 1px solid var(--frnd-outline);
}

/* ===== Prism tune → palet frnd (dark) ===== */
[data-theme="dark"] .token.comment,
[data-theme="dark"] .token.prolog,
[data-theme="dark"] .token.doctype,
[data-theme="dark"] .token.cdata {
  color: var(--frnd-on-surface-dim);
}
[data-theme="dark"] .token.keyword,
[data-theme="dark"] .token.tag,
[data-theme="dark"] .token.operator {
  color: var(--frnd-primary);
}
[data-theme="dark"] .token.string,
[data-theme="dark"] .token.char,
[data-theme="dark"] .token.attr-value,
[data-theme="dark"] .token.inserted {
  color: var(--frnd-positive);
}
[data-theme="dark"] .token.function,
[data-theme="dark"] .token.class-name {
  color: var(--frnd-tertiary-soft);
}
[data-theme="dark"] .token.number,
[data-theme="dark"] .token.boolean,
[data-theme="dark"] .token.constant {
  color: var(--frnd-warning);
}

/* ===== Admonitions (semantic) ===== */
[data-theme="dark"] .theme-admonition {
  border-radius: var(--frnd-radius-md);
}
.alert--info { --ifm-alert-background-color: rgba(58, 127, 247, 0.12); --ifm-alert-border-color: var(--frnd-primary); }
.alert--success { --ifm-alert-background-color: rgba(14, 187, 139, 0.12); --ifm-alert-border-color: var(--frnd-positive); }
.alert--warning { --ifm-alert-background-color: rgba(251, 205, 40, 0.12); --ifm-alert-border-color: var(--frnd-warning); }
.alert--danger { --ifm-alert-background-color: rgba(231, 65, 54, 0.12); --ifm-alert-border-color: var(--frnd-negative); }

/* ===== Cards (style existing, jangan tambah baru) ===== */
[data-theme="dark"] .card {
  background-color: var(--frnd-surface-low);
  border: 1px solid var(--frnd-outline);
  border-radius: var(--frnd-radius-md);
}

/* ===== Buttons ===== */
.button {
  border-radius: var(--frnd-radius-sm);
  transition: background-color var(--frnd-duration-fast) var(--frnd-ease-standard);
}
[data-theme="dark"] .button--primary {
  background-color: var(--frnd-primary-inverse);
  color: var(--frnd-inverse-on-surface);
  border-color: var(--frnd-primary-inverse);
}
[data-theme="dark"] .button--primary:hover {
  background-color: var(--frnd-on-surface);
  color: var(--frnd-inverse-on-surface);
}
[data-theme="dark"] .button--secondary {
  background-color: var(--frnd-surface-container);
  color: var(--frnd-on-surface);
  border-color: var(--frnd-outline);
}

/* ===== Search (@easyops-cn local) ===== */
[data-theme="dark"] .DocSearch-Button,
[data-theme="dark"] .navbar__search-input {
  background-color: var(--frnd-surface-low);
  border-radius: var(--frnd-radius-md);
}
```

- [ ] **Step 2: Build + visual check**

Run: `npm run build-local`
Expected: sukses. `npm run dev:local` → buka doc dengan code block + admonition; cek bg code `#0A0A0A`, syntax warna frnd, admonition 4 warna.

- [ ] **Step 3: Commit**

```bash
git add src/css/custom.css
git commit -m "feat: reskin code, admonitions, cards, buttons, search for dark theme"
```

---

## Task 7: Reskin Hero & Features blocks

**Files:**
- Modify: `src/components/Hero/index.module.css`
- Modify: `src/components/Features/styles.module.css`

- [ ] **Step 1: Replace `src/components/Hero/index.module.css`**

```css
.heroBanner {
  padding: 4rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    var(--frnd-brand-gradient-start) 0%,
    var(--frnd-brand-gradient-end) 100%
  );
}

[data-theme="light"] .heroBanner {
  background: var(--frnd-surface, #f6f6f6);
}

.heroBanner :global(.hero__title) {
  font-family: var(--frnd-font-display);
  letter-spacing: -0.02em;
}

@media screen and (max-width: 996px) {
  .heroBanner {
    padding: 2rem;
  }
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- [ ] **Step 2: Replace `src/components/Features/styles.module.css`**

```css
.features {
  display: flex;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
}

.featureSvg {
  height: 200px;
  width: 200px;
}

.features :global(.col) {
  padding: var(--frnd-space-lg);
}

.features :global(h3) {
  font-family: var(--frnd-font-display);
  letter-spacing: -0.01em;
}
```

- [ ] **Step 3: Build**

Run: `npm run build-local`
Expected: sukses.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero/index.module.css src/components/Features/styles.module.css
git commit -m "feat: reskin Hero and Features blocks with frndOS tokens"
```

---

## Task 8: Verifikasi footer config + final build

**Files:**
- Verify: `config/docusaurus/index.json` (footer `style`)

- [ ] **Step 1: Verifikasi footer style**

Run: `grep -A1 '"footer"' config/docusaurus/index.json`
Expected: `"style": "light"` saat ini. Karena dark-first, ubah ke `"dark"`.

Edit `config/docusaurus/index.json`: `"style": "light"` → `"style": "dark"` di dalam object `footer`.

- [ ] **Step 2: Final full build**

Run: `npm run build-local`
Expected: build sukses, **no broken links** (`onBrokenLinks: throw`), no Node OOM.

- [ ] **Step 3: Verifikasi visual lengkap (Definition of Done)**

Run: `npm run dev:local` → cek di `http://localhost:3333`:
1. Default dark, bg `#111111`.
2. Heading General Sans, body Geist (inspect computed font-family).
3. Toggle light → konsisten & terbaca.
4. Code block dark + syntax frnd palette.
5. Admonitions 4 warna benar.
6. Network tab: font `.ttf` dari `/fonts/...` ter-load.
7. Navbar/sidebar/footer/search sesuai reskin.

- [ ] **Step 4: Commit**

```bash
git add config/docusaurus/index.json
git commit -m "feat: set footer to dark style for dark-first theme"
```

---

## Self-Review Notes

- **Spec coverage:** Fonts (T1), tokens (T2), warna mapping dark+light (T3), dark-first (T4), chrome (T5), code/admonition/card/button/search (T6), Hero/Features (T7), footer+verifikasi (T8). Semua section §1–§5 spec tercakup.
- **Aqua rare-accent:** Tidak dipakai sebagai link/elemen umum — hanya muncul di `--frnd-tertiary-soft` untuk function token syntax (aksen halus), sesuai spirit "intelligence cue". Tidak ada wash aqua global. ✓
- **Button radius 12px:** `--ifm-global-radius` = `--frnd-radius-sm` (12px), `.button` eksplisit 12px. ✓
- **Prism tune dracula:** Override token color via CSS di T6 (bukan ganti theme object), dracula tetap base struktur. ✓
- **No card baru:** T6 hanya style `.card` existing. ✓
- **Path font:** `/fonts/...` — Docusaurus serve `static/` di root, jadi `static/fonts/x.ttf` → `/fonts/x.ttf`. ✓
- **No test framework:** verifikasi = build + visual, dinyatakan eksplisit di header.
