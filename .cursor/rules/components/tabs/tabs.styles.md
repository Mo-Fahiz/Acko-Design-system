---
description: Tabs visual spec — CSS classes, variants (underline, pill, navigation), token usage
globs: "**/tabs*.css,**/Tabs/**"
alwaysApply: false
---

# Tabs — Visual Spec

## CSS Classes

- `.acko-tabs` — base wrapper, `w-full`
- `.acko-tabs-list` — flex container for tab buttons
- `.acko-tab` — base tab button, `inline-flex items-center`, `gap-8`, no border, bg-transparent

## Variants

### Underline
- `.acko-tabs-list-underline` — `border-bottom: 1px solid var(--color-border-subtle)`, `position: relative`
- `.acko-tab-underline` — padding `8px 16px`, `margin-bottom: -1px`, position relative
- Active indicator via `::after` pseudo-element:
  - `background: linear-gradient(90deg, transparent, var(--color-primary), transparent)`
  - `height: 2px`, `border-radius: 1px`, positioned at bottom
  - `transition: background 250ms var(--ease-in-out-cubic)`
- Active text: `--color-primary`
- Inactive text: `--color-text-secondary` (underline / navigation / enclosed unchanged by pill token set)

### Underline (top indicator)
- `.acko-tabs-list-underline-top` — `border-top` instead of `border-bottom`
- `::after` positioned at top instead of bottom

### Pill
- `.acko-tabs-list-pill` — **outer track**: `background: var(--color-tab-pill-bg)`, `border: 1px solid var(--color-tab-pill-outer-border)`, `border-radius: var(--radius-full)`, `padding: 4px`, `width: fit-content`
- `.acko-tab-pill` — inner tab: `border-radius: var(--radius-full)`, padding `4px 16px`, **inactive** text `var(--color-tab-text-inactive)`, transparent background, transparent border (spacing only)
- **Active** inner pill: `background: var(--color-tab-pill-active-bg)`, `color: var(--color-tab-pill-active-text)`, **no** box-shadow, no visible border
- **Disabled** (pill only): `color: var(--color-tab-text-disabled)`, `opacity: 1` (overrides generic tab disabled opacity)

**Light:** outer `grey-50` + border `grey-white`; active inner `purple-100`, label/icon `purple-600`.

**Dark:** outer `grey-650` + border `grey-600`; active inner `purple-900`, label/icon white.

### Navigation (bottom tabs)
- `.acko-tabs-list-navigation` — `background: var(--color-card-bg)`, `border-top: 1px solid var(--color-border-subtle)`, `justify-content: space-around`
- `.acko-tab-navigation` — `flex-col`, icon `24px`, label `--font-caption-size`, `min-width: 64px`
- Active (light): `background: var(--color-primary-subtle)`, `color: var(--color-primary)`, `border-radius: var(--radius-full)`
- Active (dark): `background: var(--color-primary)`, `color: var(--color-on-primary)`, `border-radius: var(--radius-full)`

### Enclosed
- `.acko-tab-enclosed` — `border: 1px solid var(--color-border-subtle)`, no bottom border
- Active: `--color-card-bg` background

## Sizes
- `.acko-tab-sm` — `--font-caption-size`, padding `4px 12px`
- `.acko-tab-md` — `--font-body-sm-size`, padding `8px 16px`

## Icon
- `.acko-tab-icon` — `16px × 16px`, shrink-0
- Navigation variant icons: `24px`

## Token Usage — Pill

| Token | Role |
|-------|------|
| `--color-tab-pill-bg` | Outer pill fill |
| `--color-tab-pill-outer-border` | Outer pill border |
| `--color-tab-pill-active-bg` | Active segment fill |
| `--color-tab-pill-active-text` | Active label + icon |
| `--color-tab-text-inactive` | Inactive pill label |
| `--color-tab-text-disabled` | Disabled pill label |

Other variants continue to use `--color-primary`, `--color-text-secondary`, `--color-card-bg`, `--color-border-subtle`, `--color-primary-subtle`, etc.

## Transitions
All variants: `color 200ms var(--ease-in-out-cubic)`, pill adds `all 200ms var(--ease-in-out-cubic)`

## Props (React)
- `variant`: `"underline" | "pill" | "enclosed" | "navigation"`
- `indicatorPosition`: `"top" | "bottom"` (underline only)
- `size`: `"sm" | "md"`
- `fullWidth`: boolean
- `items`: `TabItem[]` with optional `icon` ReactNode
