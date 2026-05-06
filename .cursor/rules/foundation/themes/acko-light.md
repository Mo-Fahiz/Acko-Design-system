---
description: ACKO Light theme — default theme, visual personality, and activation
---

# Theme: ACKO Light

Default ACKO brand theme. Applied via `:root` or `[data-theme="light"]`.

## Visual Personality

| Property | Value |
|----------|-------|
| Mood | Clean, trustworthy, approachable |
| Button press | `scale(0.97)` on `:active` |
| Card borders | Highlight edge (white border on grey-50 fill) — floating feel |
| Input focus | Border color change + 1px ring |
| Dropdown enter | `translateY(-8px→0)` + `opacity 0→1` |
| Border radius | Pill buttons (9999px), 16px cards |
| Shadows | Light and diffused — never harsh |
| Gradients | Avoid in UI — solid colors only |

## Key Mappings (Light)

| Semantic Token | Primitive | Hex |
|---------------|-----------|-----|
| `--colorPrimary` | `purple600` | `#6841E6` |
| `--colorOnPrimary` | — | `#FFFFFF` |
| `--colorSurface` | `grey100` | `#F5F5F5` |
| `--colorSurfaceRaised` | `grey100` | `#F5F5F5` |
| `--colorTextPrimary` | `grey800` | `#343434` |
| `--colorTextDefault` | `grey700` | `#505050` |
| `--colorTextSecondary` | `grey450` | `#969696` |
| `--colorBorder` | `grey300` | `#C0C0C0` |
| `--colorCardBg` | `grey50` | `#FBFBFB` |
| `--colorError` | `red600` | `#DC2626` |
| `--colorSuccess` | `green600` | `#16A34A` |

## Activation

```html
<html data-theme="light">
```

Or via system preference:
```js
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
```

## Logo

Use **Primary Light BG** or **Horizontal Light BG** variants.
