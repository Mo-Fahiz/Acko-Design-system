---
description: Slider component styles and tokens
globs: "packages/css/src/slider.css"
alwaysApply: false
---

# Slider — Styles

## Class structure
- `.acko-slider` — flex column, `width: 100%`, `user-select: none`
- `.acko-slider-track` — relative container, `cursor: pointer`, `touch-action: none`; **rail** = horizontal gradient `--color-slider-track-inactive-from` → `--color-slider-track-inactive-to`
- `.acko-slider-fill` — absolute, left-anchored, **filled segment** = horizontal gradient `--color-slider-track-active-from` → `--color-slider-track-active-to`, `border-radius: var(--radius-full)`
- `.acko-slider-thumb` — absolute, `transform: translateX(-50%)`, pill circle; fill `--color-slider-thumb-bg`; **vertical** gradient border `--color-slider-thumb-stroke-from` → `--color-slider-thumb-stroke-to` (180deg); `box-shadow: var(--shadow-slider-thumb)`; `cursor: grab`
- `.acko-slider-ticks` — tick mark row beneath track
- `.acko-slider-tick` — `width/height: 2px`; unfilled uses `--color-slider-track-inactive-to`
- `.acko-slider-tick-filled` — `--color-slider-track-active-to`
- `.acko-slider-value` — right-aligned numeric label

## Size classes
| Class | Track height | Thumb (diameter) | Token |
|-------|-------------|-------------------|--------|
| `.acko-slider-sm` | `4px` | **16px** | `var(--slider-thumb-size-sm)` |
| `.acko-slider-md` | `6px` | **20px** | `var(--slider-thumb-size-md)` |
| `.acko-slider-lg` | `8px` | **24px** | `var(--slider-thumb-size-lg)` |

Thumb sizes are semantic layout tokens on `:root` in `tokens.css` (also mapped in `theme.css` for Tailwind context).

## Semantic tokens (see `colors-semantic.md` → Slider / Progress)
All referenced only via `var(--token)` in component CSS — no primitives in `slider.css`.

## States
- **Thumb hover:** `box-shadow: var(--shadow-slider-thumb), var(--shadow-md)`
- **Thumb focus-visible:** `box-shadow: var(--shadow-slider-thumb), var(--shadow-focus-ring)`
- **Thumb active:** `cursor: grabbing`; `transform: translateX(-50%) scale(1.1)`
- **Disabled:** `opacity: 0.45`, `pointer-events: none`; fill flat `--color-text-disabled`; thumb flat `--color-disabled-bg` + `--color-disabled-border`; ticks use `--color-track-inactive`

## Theme
Light/dark differ only via `:root` / `[data-theme="dark"]` semantic tokens in `tokens.css` — no extra `[data-theme="dark"]` overrides in `slider.css` for the track.
