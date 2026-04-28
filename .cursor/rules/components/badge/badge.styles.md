---
description: Badge visual spec — CSS classes, variants, colors, and token usage
globs: "**/badge/**,**/Badge/**"
---

# Badge — Styles

CSS file: `@acko/css/badge.css`

## Architecture

ALL styling in CSS via `@apply` + raw CSS. React only composes class names via `clsx`.

## CSS Classes

### Base
`.acko-badge` — `inline-flex items-center font-medium whitespace-nowrap rounded-full leading-none` with `gap-4` (Tailwind numeric utilities)

### Text Case

Two variants. No title case.

| Class | CSS | Default |
|-------|-----|---------|
| `.acko-badge-uppercase` | `text-transform: uppercase; letter-spacing: 0.04em` | Yes (default) |
| `.acko-badge-sentence-case` | `text-transform: none` | — |

### Responsive Sizing

No size classes. Sizing is baked into `.acko-badge` with a responsive breakpoint:

```css
/* Mobile (default) */
.acko-badge { padding: 6px 8px; font-size: var(--font-caption-size); }

/* Desktop (768px+) */
@media (min-width: 768px) {
  .acko-badge { font-size: var(--font-body-sm-size); }
}
```

### Solid Variant Colors
Pattern: `.acko-badge-solid-{color}` where color = `purple | green | blue | orange | pink | gray`

Uses gradient fill + border:
- `background: linear-gradient(0deg, --color-badge-{color}-gradient-from, --color-badge-{color}-gradient-to)`
- `border: 1px solid --color-badge-{color}-border`
- `color: --color-badge-{color}-text`

**Light theme:** 200 → 100 (or equivalent) pastel gradients with 200-tier borders — unchanged.

**Dark theme:** Muted fills via `color-mix(in srgb, <hue-950> 90%, transparent)` → `color-mix(..., <hue-900> 90%, transparent)` with solid **`900`-tier border** (grey badge: `grey-800`/`grey-700` mix, border `grey-600`). Red primitives back the “pink” solid variant.

### Outline Variant Colors
Pattern: `.acko-badge-outline-{color}`

Uses token: `--color-badge-{color}-outline-color` for both text and border. **No change** in dark vs previous outline spec.

### Dot Variant Colors
Pattern: `.acko-badge-dot-{color}`

Same gradient + border as solid + `.acko-badge-dot` child element (`size-6` circle in `currentColor`)

### Children
- `.acko-badge-dot` — `6×6px` circle indicator
- `.acko-badge-remove` — remove button with X icon (`12×12` SVG)

### Counter Badge
- `.acko-counter-badge` — pill, tabular-nums, text `--color-on-primary`
- `.acko-counter-badge-{color}` — purple, pink, blue — gradient fill + border
- **Dark:** same muted `90%` mix pattern as solid badges; border on `900`-tier hue
