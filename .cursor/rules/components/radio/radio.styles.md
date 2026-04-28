---
description: Radio visual spec — CSS classes, variants, sizes, states, and token usage
globs: "**/radio/**,**/Radio/**"
---

# Radio — Styles

CSS file: `@acko/css/radio.css`

## CSS Classes

### Group
- `.acko-radio-group` — flex column, `gap: 8px`
- `.acko-radio-group-label` — label-lg typography
- `.acko-radio-options` — flex container
- `.acko-radio-vertical` / `.acko-radio-horizontal` — orientation

### Item (default variant)
- `.acko-radio-item` — inline-flex, items-start, `gap: 12px`, cursor-pointer
- `.acko-radio-item-selected` — selected state
- `.acko-radio-item-disabled` — disabled state
- `.acko-radio-error` — error state

### Circle + Dot
- `.acko-radio-circle` — border 2px `--color-control-border-selector`, rounded-full
- `.acko-radio-dot` — inner dot `--color-on-primary`, animated bounce on selection

### Sizes (via `.acko-radio-{size}`)

| Size | Circle | Dot | Label Font |
|------|--------|-----|------------|
| sm | `16px` | `8px` | `--font-body-sm-size` |
| md | `20px` | `10px` | `--font-body-md-size` |
| lg | `24px` | `12px` | `--font-body-lg-size` |

### Card Variant
- `.acko-radio-card-item` — `1px solid --color-card-border`, `border-radius: --radius-3xl`, padding `16px`, `--color-card-bg`

| Card State | Border | Background |
|------------|--------|-----------|
| Default | `--color-card-border` | `--color-card-bg` |
| Hover | `--color-radio-card-hover-border` | `--color-radio-card-hover-bg` |
| Selected | `--color-radio-card-active-border` | `--color-radio-card-active-bg` |
| Focus-within | — | `box-shadow: var(--shadow-focus-ring)` |

### States (raw CSS)
- Selected: circle fills `--color-primary`, scale(1.08)
- Hover unchecked: `@media (hover:hover)` — border `--color-primary-muted`, bg `--color-primary-subtle`
- Hover checked: bg `--color-primary-hover`, border `--color-primary-hover`
- Focus: `box-shadow: var(--shadow-focus-ring)` via `:focus-visible`
- Disabled unchecked: border `--color-border-subtle`, bg `--color-surface-raised`
- Disabled checked: border `--color-text-secondary`, fill `--color-text-secondary`
- Error: border `--color-error`

### Labels
- `.acko-radio-label-text` — `--color-text-default`
- `.acko-radio-description` — `--font-caption-size`, `--color-text-secondary`
- Disabled: both use `--color-text-disabled`

## Dark Theme

Automatic via semantic token remapping. All `--color-radio-card-*`, `--color-control-border-selector`, and feedback tokens remap to dark values in `tokens.css`.
