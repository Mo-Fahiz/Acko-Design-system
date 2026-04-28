---
description: OTP Input styles — square cells with semantic OTP tokens per state
globs: "packages/css/src/otp-input.css"
alwaysApply: false
---

# OTP Input — Styles

CSS file: `@acko/css/otp-input.css`

## Class structure
- `.acko-otp` — flex row, `gap-8`
- `.acko-otp-cell` — individual input; **default empty** uses `--color-input-bg`, `--color-input-border`, `--color-text-default`, `caret-color: --color-primary`
- `.acko-otp-cell-filled` — digit present, **not focused** → OTP filled tokens
- `.acko-otp-cell:focus` — **focused** (empty or filled) → OTP focus tokens + `2px` ring
- `.acko-otp-error` / `.acko-otp-cell-error` — error gradient border + OTP error fill
- `.acko-otp-disabled` — parent class; cells use input disabled tokens

## Size classes — perfect squares with per-size radius

| Class | Cell size | Font | Border Radius |
|-------|-----------|------|----------------|
| `.acko-otp-sm` | `40×40` | `--font-body-md-size` | `--radius-2xl` (12px) |
| `.acko-otp-md` | `48×48` | `--font-heading-md-size` | `--radius-3xl` (16px) |
| `.acko-otp-lg` | `56×56` | `--font-heading-lg-size` | `--radius-4xl` (20px) |

## Semantic tokens (see `colors-semantic.md` → OTP Input)

| State | Behavior |
|-------|----------|
| **Default** | `--color-input-bg`, `--color-input-border` (unchanged) |
| **Filled** (not `:focus`) | `--color-otp-filled-bg`, `--color-otp-filled-border`, `--color-otp-filled-text` |
| **Focus** | `--color-otp-focus-bg`, `--color-otp-focus-border`, `box-shadow: 0 0 0 2px var(--color-otp-focus-ring)`, text `--color-text-default` |
| **Error** | Interior `--color-otp-error-fill`; border `linear-gradient(0deg, --color-otp-error-gradient-from, --color-otp-error-gradient-to)` via padding-box/border-box; shake animation. Focus-in-error keeps gradient + `3px` error ring |

### Light theme summary
- Filled: white / `grey-100` / dark digit
- Focus: white / `grey-200` / ring `grey-150`
- Error: white fill; border gradient `grey-150` → `red-100`

### Dark theme summary
- Filled: `grey-750` / `grey-600`
- Focus: `grey-700` / `grey-550` / ring `grey-600`
- Error: `grey-700` fill; border gradient `grey-600` → `red-900`

## Error gradient border technique

Uses double background with `padding-box` / `border-box` for rounded gradient borders. Error selectors override both plain and filled cells.

## Disabled
Matches TextInput disabled: `--color-input-disabled-*`, `--color-text-disabled`
