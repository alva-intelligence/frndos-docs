# frndos-docs — Implementasi Design System (frndOS Command Studio)

**Tanggal:** 2026-06-11
**Sumber:** `DESIGN.md` (frndOS Command Studio, alpha)
**Target:** frndos-docs (Docusaurus 3 + Infima)

## Tujuan

Apply design system frndOS Command Studio ke help center Docusaurus: token (warna, tipografi, radius, spacing, shadow, motion) + reskin chrome (navbar, sidebar, footer, code, card, admonition, search) + reskin block Hero/Features.

DESIGN.md adalah design system untuk **produk** frndOS (app dark command-center). Help center beda konteks (situs dokumentasi), jadi token product-UI (app-shell, chat-panel, canvas, command-pill, dll) **tidak** di-port. Yang di-port: foundation token + komponen yang punya padanan di docs site.

## Keputusan (disepakati)

| Topik | Keputusan |
|-------|-----------|
| Scope | Token + reskin penuh (foundation + chrome + Hero/Features) |
| Mode | **Dark-first default**; light tetap tersedia & ikut token |
| Fonts | Self-host semua 3 (General Sans, Geist, Funnel Sans) dari `static/fonts/` |
| Body font | **Geist** |
| Heading font | **General Sans** |
| Helper font | **Funnel Sans** (selektif) |
| Button radius | **12px** (bukan 24px DESIGN.md) |
| Prism theme | Tune **dracula** ke palet frnd |
| Aqua `#00FFDD` | Rare accent — TIDAK dipakai link/elemen umum |

## Arsitektur file

```
src/css/
├── tokens.css     # BARU — raw DESIGN.md values → --frnd-* CSS vars (source of truth literal)
├── fonts.css      # BARU — @font-face self-host General Sans / Geist / Funnel
└── custom.css     # orchestrator: @import tokens+fonts, map --frnd-* → --ifm-* per mode, reskin komponen
```

- `tokens.css` = mirror literal DESIGN.md (warna, radius, spacing, shadow, motion) sebagai `--frnd-*`. Mudah audit & sinkron saat DESIGN.md update.
- `custom.css` = lapisan adaptasi Infima + reskin komponen.
- Import semua via `docusaurus.config.js` theme.customCss (sudah ada `custom.css`); `tokens.css`+`fonts.css` di-`@import` dari dalam `custom.css`.

## 1. Fonts (`fonts.css`)

`@font-face`, `font-display: swap`:
- **General Sans** — pakai `GeneralSans-Variable.ttf` (1 file, weight 200–700 via `font-weight: 200 700`). Italic dari `GeneralSans-VariableItalic.ttf`.
- **Geist** — weight statis: Regular(400), Medium(500), SemiBold(600), Bold(700).
- **Funnel Sans** — Regular(400), Medium(500), SemiBold(600).

Preload General Sans Variable (heading, paling cepat terlihat) via `headTags`/`<link rel=preload>` di config bila perlu. Mono: stack default Docusaurus (DESIGN.md tidak definisikan mono).

## 2. Warna

### Dark (default)
| Infima var | frnd token | Hex |
|---|---|---|
| `--ifm-background-color` | background | `#111111` |
| `--ifm-background-surface-color` | surface | `#141414` |
| navbar bg | surface | `#141414` |
| footer bg | surface-container-lowest | `#0A0A0A` |
| sidebar bg | surface-container-lowest | `#0A0A0A` |
| `--ifm-color-primary` | primary | `#3A7FF7` |
| primary hover | (scale) | `#4E9EF8` |
| `--ifm-font-color-base` | on-surface | `#F6F6F6` |
| secondary text | on-surface-muted | `#B0B0B0` |
| subtle/meta text | on-surface-dim | `#888888` |
| `--ifm-color-emphasis-300` (border) | outline | `#2B2B2B` |
| code block bg | surface-container-lowest | `#0A0A0A` |
| inline code bg | surface-container-low | `#1A1A1A` |

Admonitions: info=primary `#3A7FF7`, tip=positive `#0EBB8B`, warning=`#FBCD28`, danger=negative `#E74136`. Container variants pakai `*-container` dark token.

### Light (turunan — DESIGN.md murni dark)
- background `#FFFFFF`, surface `#F6F6F6`
- text inverse `#111111`, secondary `#3D3D3D`-ish
- primary tetap `#3A7FF7` (kontras cukup di putih)
- border light grey

Aqua `#00FFDD`: cadangkan untuk aksen khusus (callout AI/AskFrnd) — bukan link/umum.

## 3. Tipografi

- `--ifm-font-family-base` → **Geist** (body, UI, sidebar, navbar)
- `--ifm-heading-font-family` → **General Sans**, weight 500–600, `letter-spacing: -0.01em`
- `--frnd-font-support` → **Funnel Sans** util class, dipakai selektif (footer tagline, helper/caption)
- Body base 16px (body-md). Heading ikut skala Docusaurus, family General Sans. Display 72px DESIGN.md TIDAK dipaksa ke docs.

## 4. Radius / Shadow / Motion

**Radius:**
- `--ifm-global-radius` → `12px` (rounded.sm) — default button/input/card
- code block / large surface → `16px` (rounded.md)
- inline code / badge → `8px` (rounded.xs)
- navbar pill items / tags → `9999px` (full)
- Button → **12px**

**Shadow** (dark, bukan material):
- `--ifm-global-shadow-md/tl` → `0px 16px 24px 0px #000000CC` (shadows.panel)
- dropdown navbar / search modal → sama + opsional `backdrop-filter: blur(16px)`
- aqua-glow → TIDAK global

**Motion:**
- `--ifm-transition-fast` → `100ms`, `--ifm-transition-slow` → `300ms`
- easing `cubic-bezier(0.4, 0, 0.2, 1)` (easing-standard)
- terapkan ke link/button/navbar hover

## 5. Komponen reskin (via `custom.css`)

- **Navbar** — bg `#141414`, border-bottom `outline`, sticky, blur tipis. Item hover→primary.
- **Sidebar** — bg `#0A0A0A`, item aktif → primary bg lembut + text primary, radius sm, hover `#1A1A1A`, Geist 14px.
- **Footer** — `style: dark`, bg `#0A0A0A`, border-top `outline`.
- **TOC** — link muted, aktif primary.
- **Code block** — bg `#0A0A0A`, radius 16px. Inline code bg `#1A1A1A`, radius 8px. **Prism: tune dracula → palet frnd** (bg `#0A0A0A`, comment dim, string positive/aqua-soft, keyword primary).
- **Admonition** — semantic colors §2.
- **Card** (`.card`) — styling tonal surface yang sudah ada; TIDAK nambah card baru (DESIGN.md: jangan bungkus tiap section dengan card).
- **Search** (`@easyops-cn/docusaurus-search-local`) — input `surface-container-low` radius md, modal shadow panel.
- **Button** — primary = white bg + dark text (DESIGN.md), secondary = `surface-container`, radius 12px.
- **Hero block** (`src/components/Hero/index.module.css`) — bg ambient gradient sangat halus (`brand-gradient-start/end`) atau flat surface; title General Sans.
- **Features block** (`src/components/Features/styles.module.css`) — item tonal surface, shadow halus, no heavy material shadow.

Catatan: `src/pages/index.js` saat ini redirect ke `/docs/intro`, jadi Hero/Features hanya block TinaCMS (tidak render di landing). Tetap di-reskin agar siap dipakai.

## Config touchpoints

- `docusaurus.config.js` — Prism theme tetap pakai object dracula tapi di-override warna lewat CSS (atau custom theme object). Tambah `<link preload>` font bila perlu via `headTags`.
- `config/docusaurus/index.json` — footer `style` → `dark` (kalau belum). Logo srcDark sudah ada.

## Verifikasi (Definition of Done)

1. `npm run build-local` sukses (no broken link, no Node OOM).
2. Dark mode default tampil: bg `#111111`, heading General Sans, body Geist, primary `#3A7FF7`.
3. Toggle ke light: token light konsisten, terbaca.
4. Code block dark + Prism frnd palette terbaca.
5. Admonitions 4 jenis warna benar.
6. Font load (network tab: ttf dari `/fonts/`, no FOIT mencolok).
7. Navbar/sidebar/footer/search sesuai reskin.

## Non-goals

- Port token product-UI (app-shell, chat-panel, canvas, command-pill, immersive-settings, chart-series).
- Aqua glow global.
- Landing page redesign (tetap redirect ke docs).
- Bilingual / i18n.
- Display 72px typography di docs.
