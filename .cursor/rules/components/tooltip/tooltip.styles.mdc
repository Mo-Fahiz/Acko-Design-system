---
description: Tooltip visual spec — CSS classes, positioning, animation
globs: "**/tooltip/**,**/Tooltip/**"
---

# Tooltip — Visual Spec

## CSS classes

- `.acko-tooltip-trigger` — inline-flex
- `.acko-tooltip` — fixed, pointer-events-none, z-index `--z-tooltip`
  - Background: `--color-tooltip-bg`
  - Text: `--color-tooltip-text`
  - Font: `--font-caption-size`
  - Padding: `4px 8px`
  - Border radius: `--radius-xl`
  - `white-space: nowrap`
- `.acko-tooltip-arrow` — CSS triangle `6px`, color `--color-tooltip-bg`, positioned per side
- Enter animations per side: top/bottom/left/right with translate (`8px` offset)
- Animation: `opacity 0→1` + `translateY/X`, `150ms var(--ease-out-quad)`

## Dark Theme

Automatic via semantic token remapping. `--color-tooltip-bg` and `--color-tooltip-text` swap automatically.
