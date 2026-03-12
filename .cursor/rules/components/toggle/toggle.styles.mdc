---
description: Toggle visual spec — CSS classes, variants, pressed/disabled states
globs: "**/toggle*.css"
alwaysApply: false
---

# Toggle — Visual Spec

## CSS classes

- `.acko-toggle` — base, inline-flex, items-center, justify-center, rounded-full, `border: 1px solid transparent`
- `.acko-toggle-sm` — `32px` height, padding `0 8px`, `--font-label-md-size`
- `.acko-toggle-md` — `40px` height, padding `0 12px`, `--font-body-sm-size`
- `.acko-toggle-lg` — `48px` height, padding `0 16px`, `--font-body-md-size`

## Variants

### Default (`.acko-toggle-default`)
- Background: `--color-toggle-bg`
- Text: `--color-toggle-text`
- Pressed: `--color-toggle-active-bg`, `--color-toggle-active-text`, border: `--color-primary-hover`

### Outline (`.acko-toggle-outline`) — Filled State
- Background: `--color-surface-raised` (filled, not transparent)
- Border: `1px solid var(--color-border)`
- Text: `--color-toggle-text`
- Pressed: `--color-toggle-active-bg`, `--color-toggle-active-text`, border: `--color-primary-hover`

### Hover (both variants)
- Non-pressed hover: `--color-toggle-bg-hover`

## States

| State | Background | Border | Text | Extra |
|-------|-----------|--------|------|-------|
| Default | `--color-toggle-bg` | transparent | `--color-toggle-text` | — |
| Outline | `--color-surface-raised` | `--color-border` | `--color-toggle-text` | — |
| Pressed (any) | `--color-toggle-active-bg` | `--color-primary-hover` | `--color-toggle-active-text` | — |
| Disabled | `--color-btn-disabled-bg` | transparent | `--color-btn-disabled-text` | `cursor: not-allowed`, `opacity: 1` |

### Focus
`box-shadow: 0 0 0 3px var(--color-primary-ring)`

## Transitions
`background-color 150ms ease, color 150ms ease, border-color 150ms ease`

## Toggle Group
`.acko-toggle-group` — inline-flex, `gap: 4px`
