---
description: Dialog/Modal component styles and tokens
globs: "packages/css/src/dialog.css"
alwaysApply: false
---

# Dialog — Styles

## Class structure
- `.acko-dialog-backdrop` — fixed fullscreen overlay, `z-index: var(--z-modal)`
- `.acko-dialog` — panel container, flex column, `border-radius: 20px`, `box-shadow: 0px 2px 16px 4px rgba(0, 0, 0, 0.04)`
- `.acko-dialog-header` — flex row, title + close button
- `.acko-dialog-title` — `font-size: var(--font-body-lg-size)`, weight 600
- `.acko-dialog-description` — `font-size: var(--font-body-sm-size)`, `color: var(--color-text-secondary)`
- `.acko-dialog-close` — icon button, `width/height: 32px`, pill shape
- `.acko-dialog-body` — scrollable content area, `overflow-y: auto`
- `.acko-dialog-footer` — `border-top: 1px solid var(--color-border-subtle)`, actions right-aligned

## Size variants

Default (no size class): `max-width: 540px`

| Class | Max-width |
|-------|-----------|
| `.acko-dialog-sm` | `360px` |
| `.acko-dialog-md` | `480px` |
| `.acko-dialog-lg` | `600px` |
| `.acko-dialog-xl` | `760px` |
| `.acko-dialog-full` | 100%, no radius |

## Tokens used
- `--z-modal`
- `--color-surface-overlay`
- `--color-surface-raised`
- `0px 2px 16px 4px rgba(0, 0, 0, 0.04)` (panel shadow)
- `20px` (panel border-radius)
- `--color-text-default`, `--color-text-secondary`
- `--color-border-subtle`
- `--color-surface-hover`
- `--shadow-focus-ring`
- `--ease-out-cubic`, `--ease-out-quart`

## Animations
- Backdrop: `acko-dialog-backdrop-in` — `opacity 0 → 1`, 200ms
- Panel: `acko-dialog-in` — `opacity 0, scale 0.95, translateY(8px) → 1, scale(1), 0`, 250ms
