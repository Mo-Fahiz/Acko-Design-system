---
description: InputGroup — CSS classes, sizes, states
globs: "**/input-group*.css"
alwaysApply: false
---

# InputGroup — Style Spec

## CSS Classes

| Class | Element | Notes |
|-------|---------|-------|
| `.acko-input-group` | Root wrapper | `flex row`, border, rounded-full |
| `.acko-input-group-sm` | Small size | Height: `36px` |
| `.acko-input-group-md` | Medium size | Height: `44px` |
| `.acko-input-group-lg` | Large size | Height: `52px` |
| `.acko-input-group-prefix` | Left addon | `padding: 0 12px`, border-right separator |
| `.acko-input-group-suffix` | Right addon | `padding: 0 12px`, border-left separator |
| `.acko-input-group-inner` | Inner wrapper (contains input) | `flex-1 flex items-center min-w-0`, `padding: 0 12px`, transparent bg |
| `.acko-input-group-inner-sm/md/lg` | Inner size variants | Font size per size (`body-sm/md/lg`) |
| `.acko-input-group-error` | Error state | Gradient border `linear-gradient(0deg, red-200, grey-150)` via padding-box/border-box (dark: red-800 → grey-600) |
| `.acko-input-group-disabled` | Disabled state | `background: var(--color-input-disabled-bg)`, `border-color: var(--color-input-disabled-border)`, `opacity: 0.5`, `cursor: not-allowed`, `pointer-events: none` |

## Token Usage
- Border: `--color-input-border` (`grey-150` light / `grey-600` dark)
- Background: `--color-input-bg` (`grey-white` light / `grey-750` dark)
- Hover: `--color-input-hover-border` (`grey-200` light / `grey-550` dark)
- Focus: `--color-input-focus-border` border, `box-shadow: 0 0 0 2px var(--color-input-focus-ring)`
- Error: gradient border (red-200 → grey-150 light / red-800 → grey-600 dark)
- Disabled: `--color-input-disabled-bg`, `--color-input-disabled-border`
- Addon text: `--color-text-secondary`
- Input text: `--color-text-default`
