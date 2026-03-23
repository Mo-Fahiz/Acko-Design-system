---
description: Avatar visual spec — CSS classes, sizes, shapes, fallback hierarchy
globs: "**/avatar/**,**/Avatar/**"
---

# Avatar — Styles

CSS file: `@acko/css/avatar.css`

## CSS Classes

### Base
`.acko-avatar` — `display: inline-flex`, `align-items: center`, `justify-content: center`, `overflow: hidden`, `flex-shrink: 0`

### Sizes

| Class | Dimensions | Initials Font | Icon Size |
|-------|-----------|--------------|-----------|
| `.acko-avatar-xs` | var(--scale-24) × var(--scale-24) | var(--scale-10) | var(--font-label-md-size) |
| `.acko-avatar-sm` | var(--scale-32) × var(--scale-32) | var(--font-label-md-size) | var(--scale-16) |
| `.acko-avatar-md` | var(--scale-40) × var(--scale-40) | var(--font-body-sm-size) | var(--font-heading-md-size) |
| `.acko-avatar-lg` | var(--scale-48) × var(--scale-48) | var(--font-body-md-size) | var(--scale-24) |
| `.acko-avatar-xl` | var(--scale-64) × var(--scale-64) | var(--font-heading-md-size) | var(--scale-32) |

### Shapes

| Class | Border Radius |
|-------|--------------|
| `.acko-avatar-circle` | `--radius-full` |
| `.acko-avatar-square` | `--radius-lg` |

### Content Layers

#### Image — `.acko-avatar-img`
- `<img>` with `object-fit: cover`, `transition: opacity 200ms ease`
- Fills the entire avatar container
- Has `onError` handler in React: when an image fails to load, the component sets `imgFailed = true`, which re-renders without the image and falls through to the next level

#### Initials — `.acko-avatar-initials`
- Text centered, `font-weight: 500`
- Background: `--color-primary-subtle`, color: `--color-primary`
- Rendered when `src` is absent or failed **and** `initials` prop is provided
- Font size scales per the size table above

#### Fallback Icon — `.acko-avatar-fallback`
- Generic User icon SVG, same bg/color scheme as initials
- Rendered only when neither `src` nor `initials` are available
- Icon dimensions scale per the size table above

### Runtime Fallback Chain (CSS + React)

```
src loads OK     → .acko-avatar-img visible
src fails/absent → imgFailed state flips
  initials set   → .acko-avatar-initials visible
  no initials    → .acko-avatar-fallback visible (User icon)
```

This is handled entirely in React state — no CSS-only image fallback tricks. The `<img onError>` callback drives the switch.
