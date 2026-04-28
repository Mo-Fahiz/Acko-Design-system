---
description: TextInput CSS — acko-* classes, sizes, states; must match packages/css/src/text-input.css and Flutter-React md/components/text-input/text-input-base.md
globs: "**/text-input/**,**/TextInput/**"
---

# TextInput — Styles (CSS)

**Human spec:** [`Flutter-React md/components/text-input/text-input-base.md`](../../../../Flutter-React%20md/components/text-input/text-input-base.md)

CSS file: `@acko/css/text-input.css` — source: `packages/css/src/text-input.css`

## Architecture

ALL visual styling lives in the CSS file. React composes `acko-*` classes only via `clsx` — no Tailwind utilities in React.

- **`@apply`**: flex, gap, alignment, sizing (`h-*`, `px-*`), radius, input reset, caption alignment
- **Raw CSS**: multi-property `transition`, `@keyframes`, `[data-theme="dark"]` overrides, `@media (hover: hover) and (pointer: fine)` hover blocks, gradient border technique for error

## CSS Classes

### Structure

- `.acko-text-input` — `flex flex-col gap-4` (4px vertical gap between label, field, helper/error, count)
- `.acko-text-input-label` — `font-label-lg-*`; `transition: color 150ms ease`
- `.acko-text-input-label-focused` — `color: var(--color-primary)`
- `.acko-text-input-label-disabled` — `color: var(--color-text-secondary)`
- `.acko-text-input-required` — `color: var(--color-error)`; `margin-left: 2px`
- `.acko-text-input-wrapper` — `flex items-center rounded-full`; `border: 1px solid var(--color-input-border)`; `background-color: var(--color-input-bg)`; transitions border/background/box-shadow `200ms ease`
- `.acko-text-input-el` — flex-1 input; `color: var(--color-text-primary)`; `appearance: none`; placeholder `color: var(--color-text-secondary)`; focused wrapper fades placeholder to `var(--color-text-disabled)`

### Sizes (via `.acko-text-input-wrapper-{size}`)

| Size | Class | Height | Padding | Input font |
|------|-------|--------|---------|------------|
| sm | `.acko-text-input-wrapper-sm` | `h-40` (40px) | `px-16` | `.acko-text-input-el-sm` → `--font-body-sm-*` |
| md | `.acko-text-input-wrapper-md` | `h-48` (48px) | `px-20` | `.acko-text-input-el-md` → `--font-body-md-*` |
| lg | `.acko-text-input-wrapper-lg` | `h-56` (56px) | `px-24` | `.acko-text-input-el-lg` → `--font-body-lg-*` |

### Prefix / suffix

- `.acko-text-input-prefix` / `.acko-text-input-suffix` — `shrink-0`, `select-none`, **`font-size: var(--font-body-sm-size)`** (fixed; not scaled with lg), `color: var(--color-text-secondary)`; prefix `mr-8`, suffix `ml-8`

### Icons

- `.acko-text-input-icon-left` / `.acko-text-input-icon-right` — `inline-flex`, centered; `color: var(--color-text-secondary)`; `transition: color 150ms ease`; margin `mr-8` / `ml-8`
- Width/height per size: sm/md/lg wrappers set icon box to `--font-body-sm-size` / `--font-body-md-size` / `--font-body-lg-size` respectively
- `.acko-text-input-focused` sets icon color to `var(--color-primary)` (left and right)

### Helper / error / count

- `.acko-text-input-helper-text` — `--font-caption-*`, `color: var(--color-text-secondary)`
- `.acko-text-input-error-text` — `--font-caption-*`, `color: var(--color-error-text)`
- `.acko-text-input-char-count` — `--font-caption-*`, `color: var(--color-text-secondary)`, `text-right`

### States

| Class / selector | Behavior |
|------------------|----------|
| Hover | `@media (hover: hover) and (pointer: fine)`: `.acko-text-input-wrapper:hover` **only if** NOT `.acko-text-input-disabled`, NOT `.acko-text-input-error`, NOT `.acko-text-input-success`, NOT `.acko-text-input-readonly`, NOT `.acko-text-input-focused` → `border-color: var(--color-input-hover-border)` |
| `.acko-text-input-focused` | `border-color: var(--color-input-focus-border)`; `box-shadow: 0 0 0 2px var(--color-input-focus-ring)` |
| `.acko-text-input-filled` | When combined: `:not(.acko-text-input-error):not(.acko-text-input-success)` → `border-color: var(--color-input-filled-border)` |
| `.acko-text-input-error` | `border: 1px solid transparent`; background double layer: fill `var(--color-input-bg)` + gradient border `linear-gradient(0deg, var(--color-error-gradient-from), var(--color-error-gradient-to))` (padding-box / border-box split); `animation: acko-text-input-shake 300ms ease-out` |
| `.acko-text-input-success` | `border-color: var(--color-input-hover-border)` |
| `.acko-text-input-success-icon` | `inline-flex`, `ml-8`, `color: var(--color-success)`; `animation: acko-text-input-check-pop 300ms ease-out` |
| `.acko-text-input-disabled` | border/background disabled tokens; `cursor: not-allowed`; input + icons `var(--color-text-disabled)` |
| `.acko-text-input-readonly` | `border-color: var(--color-border-subtle)`; `background-color: var(--color-surface-raised)`; input `color: var(--color-text-supporting)` |

**Note:** When error and focus classes both apply, `.acko-text-input-focused` still adds focus `box-shadow` (no special override in CSS).

### Keyframes

- `acko-text-input-shake`: translateX `0 → -4px → 4px → -3px → 2px → 0` at 0/20/40/60/80/100%
- `acko-text-input-check-pop`: opacity + scale `0% → 60% → 100%` with scale `0.5 → 1.15 → 1`

### Dark theme

`[data-theme="dark"]` repeats error gradient block (same token vars); `.acko-text-input-success-icon` uses `color: var(--color-success-text)`.
