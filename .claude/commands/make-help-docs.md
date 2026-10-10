---
argument-hint: <feature keyword> (e.g. "research surveys", "workspace settings askfrnd tools")
description: Create/update Help Center docs for a frndOS feature, grounded in the production branch of frnd-web
---

Buat / perbarui Help Center docs (`frndos-docs/docs/**`) untuk fitur frndOS berikut: **$ARGUMENTS**

Gunakan skill `writing-help-docs-from-code` (`.claude/skills/writing-help-docs-from-code/SKILL.md`) dan ikuti workflow-nya secara penuh.

Sumber kebenaran adalah branch **`origin/production`** di `frnd-web` dan `frnd-api-php`, bukan branch yang sedang di-checkout (biasanya `develop`). Baca lewat `git fetch origin production` lalu `git show` / `git grep` terhadap `origin/production`, tanpa `git checkout`.
