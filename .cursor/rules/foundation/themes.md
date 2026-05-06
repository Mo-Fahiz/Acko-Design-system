---
description: Theme scopes — light, dark, and how semantic tokens swap
---

# Themes

ACKO foundations support at least **light**, **dark**, and **elevated** theme scopes where applicable.

## References

- Narrative + activation: [`themes/acko-light.md`](themes/acko-light.md), [`themes/acko-dark.md`](themes/acko-dark.md)
- Runtime: `[data-theme="light"|"dark"]` on `<html>` (see `packages/tokens/src/tokens.css`)

## Rules

- **Semantic token names stay constant** across themes.
- Theme scopes change **values**, not component APIs or CSS variable identifiers.
- Light theme: clean, trustworthy, approachable.
- Dark theme: lighter contrast-tuned feedback colors, lighter primary ramp usage, darker receding surfaces.
- Elevated surfaces follow the same token-swap mechanism as base scopes when defined.
- On the web, activate themes at the **document root** via `data-theme`; avoid per-component theme overrides except documented exceptions.
