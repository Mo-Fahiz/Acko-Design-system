---
description: Drawer/Sheet component styles and tokens
alwaysApply: false
---
# Drawer — Styles

## Class structure
- `.acko-drawer-root` — fixed, full inset, `z-index: var(--z-modal)`, hidden by default
- `.acko-drawer-open` — enables `pointer-events`, `visibility: visible`
- `.acko-drawer-backdrop` — absolute overlay, fades in to `opacity: 1` on open
- `.acko-drawer` — panel, `flex column`, `overflow: hidden`, transitions `transform`, border-radius corners `20px`

## Side variants
| Class | Position | Initial transform |
|-------|----------|------------------|
| `.acko-drawer-right` | right edge | `translateX(100%)` |
| `.acko-drawer-left` | left edge | `translateX(-100%)` |
| `.acko-drawer-bottom` | bottom edge | `translateY(100%)` |
| `.acko-drawer-top` | top edge | `translateY(-100%)` |

Open state: `.acko-drawer-open .acko-drawer { transform: translate(0) }`

## Size classes
### Left / Right drawers
| Class | Width |
|-------|-------|
| `acko-drawer-size-sm` | 280px |
| `acko-drawer-size-md` | 380px |
| `acko-drawer-size-lg` | 520px |
| `acko-drawer-size-full` | 100% |

### Bottom / Top drawers
| Class | Max-height |
|-------|-----------|
| `acko-drawer-size-sm` | 30vh |
| `acko-drawer-size-md` | 50vh |
| `acko-drawer-size-lg` | 75vh |
| `acko-drawer-size-full` | 100vh |

## Content structure
- `.acko-drawer-header` — `flex items-start`, `gap: 12px`, `padding: 20px`, `border-bottom: 1px solid --color-border-subtle`
- `.acko-drawer-heading` — `flex-1 flex-col`, `gap: 4px`
- `.acko-drawer-title` — `body-lg` size, `font-weight: 600`, `--color-text-default`
- `.acko-drawer-description` — `body-sm` size, `--color-text-secondary`
- `.acko-drawer-close` — `32px` button, `rounded-full`, `--color-text-secondary`, hover `--color-surface-hover` bg
- `.acko-drawer-body` — `flex-1 overflow-y-auto`, `padding: 20px`, `--color-text-default`
- `.acko-drawer-footer` — `flex items-center justify-end`, `gap: 12px`, `padding: 16px 20px`, `border-top: 1px solid --color-border-subtle`

## Tokens used
- `--z-modal`, `--color-surface-overlay`, `--color-surface-raised`, `--shadow-modal`
- `20px` (panel corners), `--color-border-subtle`
- `--color-text-default`, `--color-text-secondary`, `--color-surface-hover`
- `--shadow-focus-ring`, `--ease-out-cubic`, `--ease-out-quart`
- Spacing and sizing via Tailwind utilities

## Animation
Backdrop: `opacity 0 → 1`, 250ms `--ease-out-cubic`
Panel: `transform` slide-in, 300ms `--ease-out-quart`
