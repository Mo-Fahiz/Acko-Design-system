---
description: Card visual spec — CSS classes, variants, padding, sub-components, responsive geometry
globs: "**/card/**,**/Card/**"
---

# Card — Styles

CSS file: `@acko/css/card.css`

## Geometry is global and responsive

Card outer radius, content gutter (inner margin), and nested card radius are driven by foundation tokens that remap by breakpoint. **All five variants share the same geometry** — only fill / border / shadow differ.

| Viewport | Range | Outer radius | Inner margin | Nested radius |
|----------|-------|--------------|--------------|----------------|
| Narrow | 320–768px (mobile + tablet) | **24px** | 12px | **12px** |
| Wide | 769px+ (desktop) | **32px** | 16px | **16px** |

Source tokens (declared in `@acko/tokens/tokens.css`):

| Token | Narrow | Wide |
|-------|--------|------|
| `--radius-card-outer` | `--radius-5xl` (24px) | `--radius-6xl` (32px) |
| `--radius-card-nested` | `--radius-2xl` (12px) | `--radius-3xl` (16px) |
| `--card-content-gutter` | 12px | 16px |

The `@media (min-width: 769px)` switch lives in `tokens.css` so components do not write their own breakpoint logic.

## CSS Classes

### Base
`.acko-card` — `border-radius: var(--radius-card-outer)`.

### Surface hierarchy

Five levels, back to front:

```
page.base         → grey-100 / grey-700   (--color-surface)
surface.default   → grey-50  / grey-650   fill, grey-white / grey-600 border
surface.secondary → grey-100 / grey-700   fill, grey-150 / grey-600 border
surface.elevated  → grey-50  / grey-600   fill + shadow-lg (no border)
surface.demoted   → grey-150 / grey-750   fill, grey-200 / grey-650 border
outline           → transparent            fill, grey-200 / grey-600 border
```

### Variants

| Class | Fill | Stroke | Shadow |
|-------|------|--------|--------|
| `.acko-card-default` | `--color-card-bg` | `1px solid --color-card-border` | none |
| `.acko-card-secondary` | `--color-card-secondary-bg` | `1px solid --color-card-secondary-border` | none |
| `.acko-card-elevated` | `--color-card-elevated-bg` | none | `--shadow-lg` |
| `.acko-card-outline` | `transparent` | `1px solid --color-card-outline-border` | none |
| `.acko-card-demoted` | `--color-card-demoted-bg` | `1px solid --color-card-demoted-border` | none |

Design intent: On the `grey-100` page base, the **default** card (`grey-50`) lifts one step above the background. **Secondary** (`grey-100`) matches the page base, blending into the background for grouped or nested contexts. **Elevated** shares the default fill (`grey-50`) but adds a shadow for visual prominence. **Demoted** (`grey-150`) recedes below the page base. **Outline** is transparent with a visible stroke for minimal emphasis. Variants only alter surface treatment; **radius and gutter are constant** across them.

### Padding

`md` is the canonical default and matches the breakpoint gutter (`--card-content-gutter`). `sm` and `lg` are explicit overrides.

| Class | Computed padding (narrow / wide) |
|-------|----------------------------------|
| `.acko-card-pad-none` | 0 / 0 |
| `.acko-card-pad-sm` | 8px / 12px (`gutter − 4px`) |
| `.acko-card-pad-md` | 12px / 16px (`= gutter`) |
| `.acko-card-pad-lg` | 20px / 24px (`gutter + 8px`) |

### Sub-component Classes

| Class | Padding | Border | Layout |
|-------|---------|--------|--------|
| `.acko-card-header` | `padding-bottom: 16px` | `border-bottom: 1px solid --color-border-subtle` | `flex`, `gap: 12px` |
| `.acko-card-content` | `padding: 20px 0` | none | block |
| `.acko-card-footer` | `padding-top: 16px` | `border-top: 1px solid --color-border-subtle` | `flex`, `justify-content: flex-end`, `gap: 12px` |
| `.acko-card-inset` | `padding: var(--card-content-gutter)` | `1px solid --color-card-demoted-border` | `bg: --color-card-demoted-bg`, `border-radius: var(--radius-card-nested)` |

### Nested Radius Rule (cards)

A card-in-card (or `CardInset`) **always** uses `--radius-card-nested` (12px narrow, 16px wide). Do not derive it via the legacy `outer − padding` formula — that formula is now reserved for non-card 20px-radius surfaces.

**Exempt**: Badges, avatars — keep their own intentional radius.

### CTA Button Placement Rule

A pill button (`--radius-full`) inside a card must **never touch the card edge**. Full-width buttons live inside the padded content zone — the card's gutter provides the breathing room.

- Minimum card padding when a CTA is present: `pad-md` (= breakpoint gutter)
- `fullWidth` button = full width of the **content area**, not the card itself
- Buttons with `pad-none` cards: **not allowed** — use `overflow: hidden` on the card and drop the button's own radius as a last resort

## Theme Mapping

**Light (surface hierarchy):**
- page.base: `grey-100` (`--color-surface`)
- surface.default: fill `grey-50`, border `grey-white`
- surface.secondary: fill `grey-100`, border `grey-150`
- surface.elevated: fill `grey-50`, shadow `--shadow-lg`
- surface.demoted: fill `grey-150`, border `grey-200`

**Dark (surface hierarchy):**
- page.base: `grey-700` (`--color-surface`)
- surface.default: fill `grey-650`, border `grey-600`
- surface.secondary: fill `grey-700`, border `grey-600`
- surface.elevated: fill `grey-600`, shadow `--shadow-lg`
- surface.demoted: fill `grey-750`, border `grey-650`

Automatic via semantic token remapping in `tokens.css`.
