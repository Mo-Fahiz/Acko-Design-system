---
description: Progress visual spec — bar, circular, segmented variants, CSS classes, token usage
globs: "**/progress/**,**/Progress/**"
---

# Progress — Styles

CSS file: `@acko/css/progress.css`

## Variants

### Bar (default)
- `.acko-progress` — `w-full`
- `.acko-progress-track` — `w-full rounded-full overflow-hidden`, bg `--color-border-subtle`
- `.acko-progress-track-sm/md/lg` — heights `4px`/`8px`/`12px`
- `.acko-progress-bar` — `h-full rounded-full`, transition `width 500ms var(--ease-out-cubic)`
- Color classes: `.acko-progress-bar-primary/success/error` → respective `--color-*` tokens

### Circular
- `.acko-progress-circular` — relative, inline-flex, items-center justify-center
- `.acko-progress-circular-svg` — SVG with two circles (track + bar)
- Track: `stroke: var(--color-border-subtle)`, no fill
- Bar: `stroke-dasharray` + `stroke-dashoffset` for arc progress, `stroke-linecap: round`
- Bar color classes: `.acko-progress-circular-bar-primary/success/error` → respective stroke colors
- Transition: `stroke-dashoffset 500ms var(--ease-out-cubic)`
- Sizes: sm (48px), md (64px), lg (96px) with stroke widths 3/4/5
- `.acko-progress-circular-content` — absolute inset-0 centered, accepts children (e.g., Avatar)
- `.acko-progress-circular-label` — `--font-caption-size`, font-weight 600, `color: var(--color-text-primary)`. Large size uses `--font-body-sm-size`

### Segmented
- `.acko-progress-segmented` — flex row, `gap: 2px`, full width
- `.acko-progress-segment` — flex-1, rounded-full, bg `--color-border-subtle`
- `.acko-progress-segment-filled` — gets the `acko-progress-bar-{color}` class for bg
- Height inherited from track size classes
- Transition: `background-color 300ms var(--ease-out-cubic)`

## Labels
- `.acko-progress-label-wrapper` — flex justify-between, margin-bottom `4px`
- `.acko-progress-label` — `--font-caption-size`, `--color-text-secondary`

## Animated Shimmer (bar only)
- `.acko-progress-animated .acko-progress-bar` — `acko-progress-shimmer` keyframe, 1.5s ease-in-out infinite

## Dark Theme

Under `[data-theme="dark"]`:
- Bar track: `var(--grey-600)`
- Segments: `var(--grey-600)`
- Circular track stroke: `var(--grey-600)`

## React Props
- `variant`: `"bar" | "circular" | "segmented"` (default: `"bar"`)
- `segments`: number (for segmented, default: 4)
- `children`: ReactNode (for circular center content, e.g., Avatar)
- `size`, `color`, `value`, `max`, `showLabel`, `label`, `animated`
