---
description: ACKO Dark theme — dark mode variant, design principles, and visual adjustments
---

# Theme: ACKO Dark

Activated via `[data-theme="dark"]` on `<html>`.

## Dark Mode Principles

1. Surfaces get **darker** as they go "back" — opposite of light
2. Text uses lighter values but NOT pure `#FFFFFF` — too harsh
3. Primary purple shifts **lighter** to maintain contrast
4. Reduce shadow intensity — use surface color elevation instead
5. Feedback colors shift to 400–500 range for contrast on dark

## Key Mappings (Dark)

| Semantic Token | Primitive | Notes |
|---------------|-----------|-------|
| `--colorPrimary` | `purple500` | Lighter for contrast |
| `--colorPrimaryHover` | `purple400` | Hover goes lighter (not darker) |
| `--colorOnPrimary` | `greyWhite` | Text on primary bg |
| `--colorSurface` | `grey750` | Deepest background |
| `--colorSurfaceRaised` | `grey700` | Cards, inputs |
| `--colorTextPrimary` | `grey50` | Headings |
| `--colorTextDefault` | `grey100` | Body text |
| `--colorTextSecondary` | `grey350` | Helpers, placeholders |
| `--colorBorder` | `grey600` | Default borders |
| `--colorCardBg` | `grey700` | Card fill |
| `--colorError` | `red600` | Error borders |
| `--colorErrorText` | `red400` | Error messages (lighter) |
| `--colorSuccess` | `green500` | Success indicators (lighter) |

## Visual Adjustments vs Light

| Property | Light | Dark |
|----------|-------|------|
| Card borders | White highlight edge | `grey650` — subtler stroke |
| Input fill | `greyWhite` (`--colorInputBg`) | `grey750` (`--colorInputBg`) — deeper than surface |
| Input border (default) | `grey150` | `grey600` |
| Input border (filled/active) | `grey200` | `grey550` |
| Input border (focus) | `purple400` | `purple900` |
| Input disabled | light disabled tokens | `grey650` fill, `grey600` border |
| Dropdown menu | White + shadow | Raised surface + visible border |
| Shadows | Standard | Heavier rgba values for visibility |
| Scrollbar | Browser default | Custom dark scrollbar |

## Logo

Use **Primary Dark BG** or **Horizontal Dark BG** variants.
