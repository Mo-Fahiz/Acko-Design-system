---
description: Global foundation narrative — how to interpret the ACKO token layers in this monorepo
---

# ACKO Global Foundations

High-level reference for the foundation layer in **this repository** (`Acko-Design-system`).

Raw token **values** live in [`packages/tokens/src/tokens.css`](../../../packages/tokens/src/tokens.css) (CSS custom properties). **Meaning, roles, and usage rules** live in `.cursor/rules/foundation/` and nested `themes/`. Component behavior is specified under `.cursor/rules/components/`.

## Source of truth split

| Layer | Location |
|-------|----------|
| Runtime CSS variables | `packages/tokens/src/tokens.css`, `packages/tokens/src/theme.css` |
| Agent-readable foundations | `.cursor/rules/foundation/*.md` |
| Component CSS | `packages/css/src/*.css` |

Platform YAML or other repos may mirror these values; **for web work in this monorepo, treat `tokens.css` + foundation markdown as authoritative.**

## Foundation layers

Use this four-layer model:

1. **Primitives** — raw palette (`grey600`, `purple150`, …). Documented in `colors-primitive.md`.
2. **Semantic tokens** — role-based aliases (`colorPrimary`, `colorBorder`, …). Documented in `colors-semantic.md`.
3. **Component alias tokens** — when a shared component needs a stable contract beyond semantics (see `tokens.css` component-oriented `--color*` entries).
4. **Theme scopes** — light/dark swap semantic **values**, not names (`data-theme` on the root). See `themes/acko-light.md`, `themes/acko-dark.md`.

Implementation code should consume **semantic or component alias** tokens, not primitives directly.

## Cross-platform rules

- Keep **semantic names** stable across themes and platforms.
- Treat accessibility as a first-class requirement (contrast, motion, focus).
- Keep theme behavior consistent: same semantic token names everywhere.
- Complete foundations before relying on generated component specs.
- Avoid duplicating large primitive tables outside `colors-primitive.md` / `tokens.css`.
