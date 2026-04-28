---
description: Switch — CSS classes, sizes, states, asymmetric easing
globs: "**/switch*.css"
alwaysApply: false
---

# Switch — Style Spec

## CSS Classes

| Class | Element | Notes |
|-------|---------|-------|
| `.acko-switch` | Root label wrapper | `inline-flex items-center gap 12px, cursor-pointer` |
| `.acko-switch-track-sm` | Small track | `36px × 20px` |
| `.acko-switch-track-md` | Medium track | `44px × 24px` |
| `.acko-switch-thumb-sm` | Small thumb | `16px × 16px`, left `2px` |
| `.acko-switch-thumb-md` | Medium thumb | `20px × 20px`, left `2px` |
| `.acko-switch-native` | Hidden checkbox input | `sr-only` |
| `.acko-switch-track` | Track background | Rounded full, `transition: background-color 200ms var(--ease-in-out-cubic)` |
| `.acko-switch-thumb` | Sliding circle | Absolute positioned |
| `.acko-switch-checked` | Checked state | Track → `--color-primary`, thumb slides right |
| `.acko-switch-disabled` | Disabled state | `opacity: 0.5`, `cursor: not-allowed` |
| `.acko-switch-label` | Text label | `--font-body-sm-size`, `--color-text-default` |

## Asymmetric Easing

The switch uses different easing curves for enabling vs disabling:

- **Enable (bounce)**: `.acko-switch-checked .acko-switch-thumb` gets `transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)` — a bouncy overshoot effect
- **Disable (ease-out)**: Default `.acko-switch-thumb` uses `transition: transform 250ms ease-out` — smooth deceleration

CSS transitions apply the target state's timing, so when checked class is added the bounce applies, and when removed it falls back to ease-out.

## Token Usage

| State | Track | Thumb | Extra |
|-------|-------|-------|-------|
| Unchecked | `--color-btn-disabled-bg` | `var(--grey-white)` | — |
| Checked | `--color-primary` | `var(--grey-white)` | `inset 0px 1px 2px 1px rgba(255,255,255,0.28)` on track |
| Focus | — | — | `box-shadow: 0 0 0 2px var(--color-primary-ring)` |
| Disabled | inherited + `opacity: 0.5` | `var(--grey-white)` | `cursor: not-allowed` |

### Dark Theme
Automatic via semantic token remapping.
