# ACKO Design System — Global foundation reference

> **Audience:** Any engineer (web, mobile, or future platform) building components for the ACKO design system. This file contains **no framework-specific code**. Every value, rule, and table here is the single source of truth that each platform implementation must respect.

---

## Documentation pipeline (platform-agnostic)

This repo splits documentation so **one visual truth** can power **many platforms**:

| Layer | Location | Role |
|-------|----------|------|
| **Orchestration + foundation** | `docs/global.md` (this file) | Token architecture, primitives, semantics, type, spacing, radii, motion, shadows, layout, icons, a11y — **no framework code.** |
| **Cursor foundation rules** | `.cursor/rules/foundation/*.mdc` | Same rules, optimized for AI; each file marks what is **portable** vs **web-bound** (Tailwind, CSS snippets). |
| **Web system conventions** | `.cursor/rules/00-system.mdc` | Monorepo layout, React/CSS patterns, `forwardRef`, consumer imports. |
| **Per-component base spec** | `docs/components/<name>/<name>-base.md` | Variants, sizes, states, tokens, motion, structure — **must match** playground / `App.tsx` previews. |
| **Per-component styles (web)** | `.cursor/rules/components/<name>/<name>.styles.mdc` (Button: `button.style.mdc`) | `acko-*` classes, `packages/css` — implements the base spec. |
| **React track** | `docs/components/<name>/react/<name>-react.md` | Props, DOM, ARIA, packages — **no visual drift** from `<name>-base.md`. |
| **Flutter track** | `docs/components/<name>/flutter/<name>-flutter.md` | Widgets, `Semantics`, theme — **no visual drift** from `<name>-base.md`. |

**Rules**

1. If it changes **pixels, tokens, or meaning**, update **`global.md`** (tokens/foundation) and/or **`<name>-base.md`** first, then sync `packages/tokens`, `packages/css`, and platform code.
2. **React / Flutter docs** only describe **implementation** (APIs, platform quirks), not new design decisions.
3. **`*.styles.mdc`** / **`button.style.mdc`** stays aligned with **`packages/css/src/<component>.css`** — that CSS is what the playground renders.

**Canonical sources today:** `packages/tokens` (web token delivery), `packages/css` (per-component styles), `packages/<component>` (React). Flutter packages may be added later; semantics must not fork.

---

## Table of contents

0. [Documentation pipeline (platform-agnostic)](#documentation-pipeline-platform-agnostic)
1. [How to read this document](#1-how-to-read-this-document)
2. [Token architecture](#2-token-architecture)
3. [Color — Primitives](#3-color--primitives)
4. [Color — Semantics](#4-color--semantics)
5. [Themes](#5-themes)
6. [Typography](#6-typography)
7. [Spacing and sizing](#7-spacing-and-sizing)
8. [Border radius](#8-border-radius)
9. [Shadows and elevation](#9-shadows-and-elevation)
10. [Motion](#10-motion)
11. [Iconography](#11-iconography)
12. [Layout](#12-layout)
13. [Accessibility fundamentals](#13-accessibility-fundamentals)
14. [Orchestration — how it all fits together](#14-orchestration--how-it-all-fits-together)

---

## 1. How to read this document

- **Token names** appear in backticks (e.g. `color-primary`). Each platform maps these to its own format: CSS custom properties on web (`--color-primary`), Dart constants or `ThemeExtension` fields in Flutter, etc.
- **Pixel values** are logical pixels. On web they translate 1:1; on mobile they are logical-pixel equivalents (dp on Android, pt on iOS).
- **"Must", "never", "always"** indicate non-negotiable rules. "Prefer" or "should" indicate strong guidance that may be overridden with documented rationale.
- Primitive hex values appear for reference and debugging only. Components must never hard-code them; always go through **semantic tokens**.

---

## 2. Token architecture

```
Layer 1 — Primitives        Raw values (hex, numbers). Building blocks.
    ↓
Layer 2 — Semantics         Named roles that describe *what* a value does, not what it looks like.
    ↓
Layer 3 — Component tokens  Per-component overrides (e.g. button-disabled-bg) that still reference semantics.
    ↓
Layer 4 — Theme scopes      Light, dark, elevated — swap the primitives behind every semantic token.
```

**Golden rule:** Component code references Layer 2 or 3 only. Never Layer 1.

---

## 3. Color — Primitives

Primitives are the raw palette. They exist so that semantic tokens can point to them. **Components must never reference these directly.**

### Grey (extended neutral — 17 steps)

| Name | Hex |
|------|-----|
| grey-white | #FFFFFF |
| grey-50 | #FBFBFB |
| grey-100 | #F5F5F5 |
| grey-150 | #EBEBEB |
| grey-200 | #E0E0E1 |
| grey-250 | #CCCCCD |
| grey-300 | #B7B7B8 |
| grey-350 | #8F8E92 |
| grey-400 | #7A7B7D |
| grey-450 | #605F63 |
| grey-500 | #474649 |
| grey-550 | #333333 |
| grey-600 | #242324 |
| grey-650 | #19191A |
| grey-700 | #141414 |
| grey-750 | #0F0F10 |
| grey-800 | #0A0A0A |
| grey-black | #000000 |

### Purple (brand)

| Name | Hex |
|------|-----|
| purple-50 | #F5F3FF |
| purple-100 | #EAEAFD |
| purple-200 | #D9D8FC |
| purple-300 | #BDB8FA |
| purple-400 | #9B8FF6 |
| purple-500 | #7A62F0 |
| purple-600 | #6841E6 |
| purple-700 | #582FD2 |
| purple-800 | #4E29BB |
| purple-900 | #3E2290 |
| purple-950 | #241362 |

### Red

| Name | Hex |
|------|-----|
| red-50 | #FEF2F2 |
| red-100 | #FEE2E2 |
| red-200 | #FECACA |
| red-300 | #FCA5A5 |
| red-400 | #F87171 |
| red-500 | #EF4444 |
| red-600 | #DC2626 |
| red-700 | #B91C1C |
| red-800 | #991B1B |
| red-900 | #7F1D1D |
| red-950 | #450A0A |

### Green

| Name | Hex |
|------|-----|
| green-50 | #F0FDF4 |
| green-100 | #DCFCE7 |
| green-200 | #BBF7D0 |
| green-300 | #86EFAC |
| green-400 | #4ADE80 |
| green-500 | #22C55E |
| green-600 | #16A34A |
| green-700 | #15803D |
| green-800 | #166534 |
| green-900 | #14532D |
| green-950 | #052E16 |

### Blue

| Name | Hex |
|------|-----|
| blue-50 | #EFF6FF |
| blue-100 | #DBEAFE |
| blue-200 | #BFDBFE |
| blue-300 | #93C5FD |
| blue-400 | #60A5FA |
| blue-500 | #3B82F6 |
| blue-600 | #2563EB |
| blue-700 | #1D4ED8 |
| blue-800 | #1E40AF |
| blue-900 | #1E3A8A |
| blue-950 | #172554 |

### Orange

| Name | Hex |
|------|-----|
| orange-50 | #FFF3E5 |
| orange-100 | #FFE5CC |
| orange-200 | #FFCB9E |
| orange-300 | #FFB56B |
| orange-400 | #FFA85C |
| orange-500 | #FF8D28 |
| orange-600 | #EB740A |
| orange-700 | #B65C0C |
| orange-800 | #8D4301 |
| orange-900 | #521F00 |
| orange-950 | #300212 |

### Pink

| Name | Hex |
|------|-----|
| pink-50 | #FDF2F8 |
| pink-100 | #FCE7F3 |
| pink-200 | #FBCFE8 |
| pink-300 | #F9ABD4 |
| pink-400 | #F472B6 |
| pink-500 | #EC4899 |
| pink-600 | #DB2777 |
| pink-700 | #BE185D |
| pink-800 | #9D174D |
| pink-900 | #831843 |
| pink-950 | #500724 |

### Yellow

| Name | Hex |
|------|-----|
| yellow-50 | #FEFAE8 |
| yellow-100 | #FEF9C3 |
| yellow-200 | #FEF08A |
| yellow-300 | #FDE047 |
| yellow-400 | #FACC15 |
| yellow-500 | #EAB308 |
| yellow-600 | #D18C0A |
| yellow-700 | #A76406 |
| yellow-800 | #875008 |
| yellow-900 | #62360F |
| yellow-950 | #302012 |

### Lime

| Name | Hex |
|------|-----|
| lime-50 | #F4FDF0 |
| lime-100 | #E7FCDC |
| lime-200 | #CFF7BB |
| lime-300 | #A9EF86 |
| lime-400 | #7BDE4A |
| lime-500 | #58C522 |
| lime-600 | #45A316 |
| lime-700 | #398015 |
| lime-800 | #306516 |
| lime-900 | #214210 |
| lime-950 | #132E05 |

### Teal

| Name | Hex |
|------|-----|
| teal-50 | #EDFDFE |
| teal-100 | #D1FBFC |
| teal-200 | #A9EFFB |
| teal-300 | #6FE2F1 |
| teal-400 | #29CEE7 |
| teal-500 | #17B6D3 |
| teal-600 | #0891B2 |
| teal-700 | #0E7490 |
| teal-800 | #155E75 |
| teal-900 | #164E63 |
| teal-950 | #083344 |

### Cerise

| Name | Hex |
|------|-----|
| cerise-100 | #FDF2F8 |
| cerise-200 | #FBCFE8 |
| cerise-300 | #F9ABD4 |
| cerise-400 | #F472B6 |
| cerise-500 | #EC4899 |
| cerise-600 | #DB2777 |
| cerise-700 | #BE185D |
| cerise-800 | #9D174D |

### Zinc

| Name | Hex |
|------|-----|
| zinc-50 | #FAFAFB |
| zinc-100 | #F3F4F6 |
| zinc-200 | #E5E7EB |
| zinc-300 | #D1D5DB |
| zinc-400 | #9CA3AF |
| zinc-500 | #6B7280 |
| zinc-600 | #485563 |
| zinc-700 | #374151 |
| zinc-800 | #1F2937 |
| zinc-900 | #1A1F2A |
| zinc-950 | #030712 |

### Earth grey

| Name | Hex |
|------|-----|
| earth-grey-50 | #FAFAFA |
| earth-grey-100 | #F5F5F5 |
| earth-grey-200 | #E5E5E5 |
| earth-grey-300 | #D4D4D4 |
| earth-grey-400 | #A3A3A3 |
| earth-grey-500 | #737373 |
| earth-grey-600 | #525252 |
| earth-grey-700 | #404040 |
| earth-grey-800 | #262626 |
| earth-grey-900 | #171717 |
| earth-grey-950 | #0A0A0A |

---

## 4. Color — Semantics

Every color a component uses must come from this layer. When themes switch, the *primitive behind* the semantic name changes automatically — the component code stays the same.

### Brand / Primary

| Token | Role | Light value | Dark value |
|-------|------|-------------|------------|
| `color-primary` | Main CTA fill | purple-600 | purple-500 |
| `color-primary-hover` | Hover state | purple-700 | purple-400 |
| `color-primary-active` | Pressed state | purple-800 | purple-300 |
| `color-primary-muted` | Soft border hints | purple-400 | purple-600 |
| `color-primary-subtle` | Tinted backgrounds | purple-100 | purple-900 |
| `color-primary-ring` | Focus ring | purple-200 | purple-800 |
| `color-on-primary` | Text on primary fill | grey-white| grey-white |

### Surfaces

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `color-surface` | Page background | grey-100 | grey-750 |
| `color-surface-raised` | Elevated surfaces (cards, inputs) | grey-100 | grey-700 |
| `color-surface-raised-hover` | Hovered raised surface | grey-200 | grey-650 |
| `color-surface-raised-active` | Pressed raised surface | grey-300 | grey-600 |
| `color-surface-overlay` | Backdrop behind modals/drawers | rgba(10,10,10,0.5) | rgba(0,0,0,0.7) |
| `color-surface-ghost-hover` | Ghost interaction background | rgba(0,0,0,0.04) | rgba(255,255,255,0.05) |

### Text

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `color-text-primary` | Headings, main content, values | grey-800 | grey-50 |
| `color-text-default` | Labels, body text | grey-700 | grey-100 |
| `color-text-supporting` | Supporting text (readonly, chevrons) | grey-550 | grey-200 |
| `color-text-secondary` | Subtext, placeholders, helpers | grey-450 | grey-350 |
| `color-text-disabled` | Disabled text | grey-300 | grey-450 |
| `color-text-invert` | Text on dark/filled surfaces (fixed light) | grey-white| grey-white |
| `color-text-brand` | Brand-colored text, links, emphasis | purple-600 | purple-500 |
| `color-text-error` | Error messages | red-700 | red-400 |
| `color-text-success` | Success messages | green-700 | green-400 |
| `color-text-static` | Fixed across themes (always white) | grey-white | grey-white |

### Borders

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `color-border` | Default border | grey-300 | grey-600 |
| `color-border-strong` | Hover or filled input border | grey-450 | grey-550 |
| `color-border-subtle` | Faint dividers | grey-200 | grey-650 |

### Disabled state

| Token | Light | Dark |
|-------|-------|------|
| `color-disabled-bg` | grey-150 | grey-600 |
| `color-disabled-text` | grey-350 | grey-450 |
| `color-disabled-border` | grey-200 | grey-600 |

### Feedback — Error

| Token | Light | Dark |
|-------|-------|------|
| `color-error` | red-600 | red-600 |
| `color-error-text` | red-700 | red-400 |
| `color-error-subtle` | red-100 | red-950 |
| `color-error-border` | red-200 | red-800 |
| `color-error-badge-bg` | red-100 | red-900 |

### Feedback — Success

| Token | Light | Dark |
|-------|-------|------|
| `color-success` | green-600 | green-500 |
| `color-success-text` | green-700 | green-400 |
| `color-success-subtle` | green-100 | green-950 |
| `color-success-border` | green-200 | green-800 |
| `color-success-badge-bg` | green-200 | green-900 |

### Feedback — Warning

| Token | Light | Dark |
|-------|-------|------|
| `color-warning` | orange-600 | orange-500 |
| `color-warning-text` | orange-700 | orange-400 |
| `color-warning-subtle` | orange-50 | orange-950 |
| `color-warning-border` | orange-100 | orange-800 |
| `color-warning-badge-bg` | orange-200 | orange-900 |

### Feedback — Info (uses brand purple, not blue)

| Token | Light | Dark |
|-------|-------|------|
| `color-info` | purple-600 | purple-500 |
| `color-info-text` | purple-700 | purple-400 |
| `color-info-subtle` | purple-100 | purple-950 |
| `color-info-border` | purple-200 | purple-800 |
| `color-info-badge-bg` | purple-200 | purple-900 |

### Cards

| Token | Light | Dark |
|-------|-------|------|
| `color-card-bg` | grey-50 | grey-650 |
| `color-card-border` | grey-white | grey-650 |
| `color-card-elevated-bg` | grey-white | grey-650 |
| `color-card-demoted-bg` | grey-150 | grey-750 |
| `color-card-demoted-border` | grey-200 | grey-600 |
| `color-card-outline-border` | grey-200 | grey-600 |

### Component-specific tokens

These extend the semantic layer for individual components. The same rules apply: never hard-code the primitive; always reference the token.

**Button**

| Token | Light | Dark |
|-------|-------|------|
| `color-btn-secondary-bg` | purple-50 | grey-650 |
| `color-btn-secondary-border` | purple-300 | purple-600 |
| `color-btn-secondary-text` | purple-700 | grey-50 |
| `color-btn-inverted-bg` | grey-100 | grey-100 |
| `color-btn-inverted-text` | purple-700 | purple-700 |
| `color-btn-ghost-color` | purple-600 | purple-500 |
| `color-btn-ghost-hover-bg` | purple-50 | grey-600 |
| `color-btn-link-color` | blue-600 | blue-500 |
| `color-btn-danger-bg` | red-100 | red-900 |
| `color-btn-danger-text` | red-500 | red-200 |
| `color-btn-disabled-bg` | grey-100 | grey-600 |
| `color-btn-disabled-text` | grey-350 | grey-450 |
| `color-btn-primary-hover-bg` | — | purple-600 |

**Input** (shared by text input, dropdown, textarea, input group)

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `color-input-bg` | Default fill | grey-white | grey-750 |
| `color-input-border` | Default border | grey-150 | grey-600 |
| `color-input-hover-border` | Hover border | grey-300 | grey-550 |
| `color-input-filled-border` | Has-value border | grey-200 | grey-550 |
| `color-input-focus-border` | Focus border | grey-200 | grey-550 |
| `color-input-disabled-bg` | Disabled fill (dark only) | — | grey-650 |
| `color-input-disabled-border` | Disabled border (dark only) | — | grey-600 |
| `color-input-option-hover` | Dropdown option hover | purple-50 | grey-650 |
| `color-input-option-selected-bg` | Selected option bg | purple-100 | purple-900 |
| `color-input-option-selected-text` | Selected option text | purple-700 | purple-300 |

**OTP Input** (cell-specific — empty cells use input tokens)

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `color-otp-filled-bg` | Digit entered, unfocused | grey-white | grey-750 |
| `color-otp-filled-border` | Filled cell border | grey-100 | grey-600 |
| `color-otp-filled-text` | Digit color | grey-800 | grey-100 |
| `color-otp-focus-bg` | Focused cell fill | grey-white | grey-700 |
| `color-otp-focus-border` | Focused cell border | grey-200 | grey-550 |
| `color-otp-focus-ring` | Focus ring (2px) | grey-150 | grey-600 |
| `color-otp-error-fill` | Error cell interior | grey-white | grey-700 |

**Tabs (pill style)**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `color-tab-pill-bg` | Outer pill track fill | grey-50 | grey-650 |
| `color-tab-pill-outer-border` | 1px outer pill border | grey-white | grey-600 |
| `color-tab-pill-active-bg` | Active inner pill fill | purple-100 | purple-900 |
| `color-tab-pill-active-text` | Active label + icon | purple-600 | grey-white |
| `color-tab-text-inactive` | Inactive tab text | grey-400 | grey-400 |
| `color-tab-text-disabled` | Disabled tab text | grey-300 | grey-500 |

**Toggle**

| Token | Light | Dark |
|-------|-------|------|
| `color-toggle-bg` | grey-150 | grey-650 |
| `color-toggle-bg-hover` | grey-200 | grey-600 |
| `color-toggle-active-bg` | purple-100 | purple-900 |
| `color-toggle-active-text` | purple-700 | purple-300 |
| `color-toggle-text` | grey-450 | grey-350 |

**Slider / Progress**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `color-track-inactive` | Unfilled track | grey-200 | grey-600 |
| `color-slider-track-active-from` | Filled gradient start | purple-300 | purple-800 |
| `color-slider-track-active-to` | Filled gradient end | purple-700 | purple-500 |
| `color-slider-thumb-bg` | Thumb fill | purple-50 | purple-50 |

**Calendar**

| Token | Light | Dark |
|-------|-------|------|
| `color-cal-selected-bg` | purple-600 | purple-500 |
| `color-cal-selected-text` | grey-white | grey-white |
| `color-cal-range-bg` | purple-50 | purple-950 |
| `color-cal-range-text` | purple-700 | purple-300 |
| `color-cal-today-text` | purple-600 | purple-400 |

**Switch**

| Token | Light | Dark |
|-------|-------|------|
| `color-switch-thumb` | grey-white | grey-white |

**Wizard (navigation stepper)**

| Token | Light | Dark |
|-------|-------|------|
| `color-wizard-active-bg` | purple-500 | purple-600 |
| `color-wizard-active-text` | grey-50 | grey-white |
| `color-wizard-done-bg` | purple-200 | purple-700 |
| `color-wizard-done-text` | purple-600 | purple-300 |
| `color-wizard-upcoming-border` | grey-250 | grey-500 |
| `color-wizard-upcoming-text` | grey-350 | grey-450 |

---

## 5. Themes

The system supports three theme scopes. Semantic token values change per scope; component code stays unchanged.

### Light (default)

| Property | Description |
|----------|-------------|
| Mood | Clean, trustworthy, approachable |
| Shadows | Light and diffused — never harsh |
| Card borders | White highlight edge on grey-50 fill — floating feel |
| Gradients | Avoid in UI — solid colors only |

### Dark

| Property | Description |
|----------|-------------|
| Surfaces | Get darker as they go "back" — opposite of light |
| Text | Lighter values but never pure #FFFFFF (too harsh) |
| Primary | Shifts lighter (purple-500) to maintain contrast |
| Shadows | Heavier to remain visible on dark surfaces |
| Feedback colors | Shift to the 400–500 range for contrast |
| Hover direction | Primary hover goes *lighter* (not darker) |

### Elevated

A third scope for specific contexts (e.g. surfaces that sit above the normal stack). Follows the same token-swap mechanism.

### Theme-switching principle

On web: `data-theme` attribute on the root element. On mobile: brightness mode + theme extensions in the widget tree. The mechanism differs; the **token values must match**.

---

## 6. Typography

### Font family

**Euclid Circular B** — used for all text across the system.

Fallback stack (for web): `-apple-system, BlinkMacSystemFont, sans-serif`.

Available weights:

| Weight name | Numeric value |
|-------------|---------------|
| Light | 300 |
| Regular | 400 |
| Medium | 500 |
| Semibold | 600 |
| Bold | 700 |

### Type scale

Every level has four properties: **size**, **line height**, **letter spacing**, and **weight**.

#### Display (marketing, heroes)

| Level | Size | Line height | Letter spacing | Weight |
|-------|------|-------------|----------------|--------|
| display-xl | 72px | 80px | −2px | Bold 700 |
| display-lg | 56px | 64px | −1.5px | Bold 700 |
| display-md | 48px | 56px | −1px | Bold 700 |
| display-sm | 40px | 48px | −0.5px | Semibold 600 |

#### Heading (UI sections)

| Level | Size | Line height | Letter spacing | Weight |
|-------|------|-------------|----------------|--------|
| heading-xl | 32px | 40px | −0.5px | Semibold 600 |
| heading-lg | 24px | 32px | −0.3px | Semibold 600 |
| heading-md | 20px | 28px | −0.2px | Semibold 600 |
| heading-sm | 18px | 24px | 0px | Semibold 600 |

#### Body (content)

| Level | Size | Line height | Letter spacing | Weight |
|-------|------|-------------|----------------|--------|
| body-lg | 18px | 28px | 0px | Regular 400 |
| body-md | 16px | 24px | 0px | Regular 400 |
| body-sm | 14px | 20px | 0px | Regular 400 |

#### Labels and utility

| Level | Size | Line height | Letter spacing | Weight |
|-------|------|-------------|----------------|--------|
| label-lg | 14px | 20px | 0.1px | Medium 500 |
| label-md | 12px | 16px | 0.2px | Medium 500 |
| label-sm | 11px | 14px | 0.3px | Medium 500 |
| caption | 12px | 16px | 0px | Regular 400 |
| overline | 11px | 16px | 0.5px | Semibold 600 |

#### Button-specific (intentionally decoupled from body scale)

| Button size | Font size |
|-------------|-----------|
| xs | 12px |
| sm | 14px |
| md | 16px |
| lg | 18px |
| xl | 20px |

### Typography rules

- Minimum font size for body text: **14px**. For labels: **12px**. Absolute minimum: **11px**.
- Use **Medium 500** for emphasis in body text, not Bold.
- Use **Semibold 600** for headings. **Bold 700** is reserved for display levels only.
- Tighter letter spacing for large text; slightly looser for small text.
- Use **tabular numerals** for dynamic numbers (prices, counters, data tables).
- Typography tokens are **theme-agnostic** — they do not change between themes.

### Text casing

All UI text follows **sentence case**: capitalize only the first word and proper nouns.

This applies to: button labels, tab labels, headings, breadcrumbs, navigation items, links, toast actions, dialog buttons.

**Correct:** `Get a quote`, `View my policy`, `Continue to payment`

**Incorrect:** `Get A Quote`, `View My Policy`

#### Exceptions that keep their own casing

| Category | Examples |
|----------|---------|
| Brand names | `ACKO` (always all-caps), `ACKO Drive`, `ACKO Clinic` |
| Proper nouns | City/state/country names, person names, `Aadhaar` |
| Insurance/financial acronyms | `IDV`, `NCB`, `KYC`, `GST`, `EMI`, `OTP`, `PAN` |
| Regulatory bodies | `IRDAI` |

**All-caps emphasis** (`FREE`, `NEW`) must NOT appear in button/label/nav text. If needed, use a Badge component (which defaults to uppercase).

### Typography color intent

Text color is chosen by **role**, not by raw value. Components exposing a color prop should offer these intents:

| Intent | Purpose |
|--------|---------|
| primary | Headings, values, main content (default) |
| secondary | Subtext, captions, helpers |
| invert | Text on dark/filled surfaces |
| brand | Links, emphasis in brand color |
| error | Error messages |
| success | Success messages |
| static | Fixed color across themes (always white) |

All except `static` adapt across light and dark themes automatically.

---

## 7. Spacing and sizing

### Spacing system

Spacing uses a **1px base**. The number **is** the pixel value — no multiplier, no indirection.

| Value | Use case |
|-------|----------|
| 4px | Micro gaps |
| 8px | Icon padding, tight gaps, inline elements |
| 12px | Form field gaps, small component padding |
| 16px | Standard padding, card gaps, button padding |
| 20px | Medium gaps, card padding (md) |
| 24px | Card padding (lg), section gaps |
| 28px | Component internal spacing |
| 32px | Large component gaps |
| 36px | Section padding |
| 40px | Large spacing |
| 48px | Section margins |
| 64px | Page sections |
| 80px | Hero spacing |
| 96px | Large section breaks |

### Component heights (interactive controls)

| Height | Used by |
|--------|---------|
| 32px | Button xs |
| 36px | Switch sm track, InputGroup sm |
| 40px | Button sm, TextInput sm, Dropdown sm |
| 44px | Switch md track, InputGroup md, minimum tap target |
| 48px | Button md, TextInput md, Dropdown md |
| 52px | InputGroup lg |
| 56px | Button lg, TextInput lg, Dropdown lg |
| 64px | Button xl |

### Inter-component spacing

| Between | Gap |
|---------|-----|
| Label → input | 8px |
| Input → helper/error text | 8px |
| Form fields | 20px |
| Section heading → content | 32px |
| Cards in a grid | 16px (mobile), 24px (desktop) |
| Buttons in a group | 12px |
| Icon → adjacent text | 8px |

### Opacity scale

Token names follow the pattern `opacity-{n}` where n is the percentage value (e.g. `opacity-48` = 0.48). Range: 0 to 100 in defined steps (0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 64, 72, 80, 88, 96, 100).

### Z-index scale

| Token | Value | Use case |
|-------|-------|----------|
| `z-dropdown` | 100 | Dropdown menus, select popups |
| `z-sticky` | 150 | Sticky headers, floating elements |
| `z-modal` | 200 | Modal dialogs, sheets |
| `z-tooltip` | 300 | Tooltips, popovers |
| `z-toast` | 400 | Toast notifications |

### Hairline border

A responsive border width: **1px** on standard displays, **0.5px** on high-DPI (≥2x) displays. Each platform should implement this using its pixel-ratio detection.

### Rules

1. Never hard-code pixel values for spacing in component code — always go through the spacing system.
2. All tokens on this page are **theme-agnostic** — they do not change between themes.

---

## 8. Border radius

### Token scale

| Token | Value | Role |
|-------|-------|------|
| `radius-sm` | 4px | Nested insets |
| `radius-md` | 6px | Checkboxes (md/lg) |
| `radius-lg` | 8px | Options, table cells |
| `radius-xl` | 10px | Tooltip |
| `radius-2xl` | 12px | — |
| `radius-3xl` | 16px | — |
| `radius-4xl` | 20px | Cards, dialogs, drawers, toasts, dropdown menus, calendar panels |
| `radius-full` | 9999px | Buttons, inputs, pills (effectively a capsule) |

### Role assignment

| Component role | Radius token |
|----------------|--------------|
| Interactive controls (buttons, chips, badges, pagination, tabs) | `radius-full` (pill) |
| Input containers (text input, dropdown trigger, input group) | `radius-full` (pill) |
| Surface containers (cards, dialogs, drawers, toasts, dropdown menus, calendars) | `radius-4xl` (20px) |
| Small controls (checkboxes, tooltips) | `radius-sm` / `radius-md` (4–6px) |

### Nested radius rule

When a child element fills a container edge-to-edge, its radius must be `container radius − padding`:

```
Container (radius-4xl = 20px)
├── padding 12px → child uses radius-inset-sm (8px)
├── padding 16px → child uses radius-inset-md (4px)
└── padding 24px → child uses radius-inset-lg (0px)
```

**Exempt from nesting:** Buttons, badges, avatars — they keep their own pill/circular shape regardless of parent.

**Pill buttons inside cards:** A pill CTA must never touch the card edge. The card's content padding creates the visual separation. Minimum card padding when a CTA is present: 16px.

Radius tokens are **theme-agnostic**.

---

## 9. Shadows and elevation

### Tiered shadow scale (primitive)

| Tier | Light value (offset-y blur spread opacity) | Use case |
|------|---------------------------------------------|----------|
| xs | 0 1px 2px rgba(0,0,0,0.04) | Subtle depth |
| sm | 0 1px 4px rgba(0,0,0,0.06) | Light elevation |
| md | 0 2px 8px rgba(0,0,0,0.06) | Medium elevation |
| lg | 0 2px 16px 4px rgba(0,0,0,0.04) | Cards, dropdowns |
| xl | 0 4px 24px rgba(0,0,0,0.10) | Modals, dialogs |
| 2xl | 0 8px 32px rgba(0,0,0,0.14) | Maximum elevation |

### Semantic shadow aliases

| Token | Maps to | Use case |
|-------|---------|----------|
| `shadow-card` | shadow-lg | Elevated cards |
| `shadow-dropdown` | shadow-lg | Dropdown menus, popovers |
| `shadow-modal` | shadow-xl | Modals, dialogs |
| `shadow-subtle` | shadow-xs | Small element depth |

### Component-specific shadows

| Token | Light | Dark | Used by |
|-------|-------|------|---------|
| `shadow-btn-inner` | inset 0 1px 2px rgba(255,255,255,0.28) | inset 0 1px 2px rgba(255,255,255,0.15) | Primary, secondary buttons |
| `shadow-btn-hover` | 0 4px 8px rgba(0,0,0,0.08) | 0 4px 8px rgba(0,0,0,0.3) | Button hover |
| `shadow-btn-secondary-hover` | inset 0 2px 4px rgba(255,255,255,0.48) | inset 0 2px 4px rgba(0,0,0,0.2) | Secondary hover |
| `shadow-focus-ring` | 0 0 0 3px color-primary-ring | same | All focusable elements |

### Rules

- In dark mode, shadows are **heavier** to remain visible on dark surfaces.
- Never use harsh drop shadows — keep them diffused.
- Always use semantic shadow tokens in component code, not raw shadow strings.
- Badge and counter badge components use **gradient fills with borders**, not shadows (see color semantics section).

---

## 10. Motion

### Easing curves

| Name | Cubic-bezier | Use for |
|------|-------------|---------|
| ease-out-quad | (0.25, 0.46, 0.45, 0.94) | Standard exit |
| ease-out-cubic | (0.215, 0.61, 0.355, 1) | Dropdown/modal enter |
| ease-out-quart | (0.165, 0.84, 0.44, 1) | Strong deceleration |
| ease-in-out-cubic | (0.645, 0.045, 0.355, 1) | On-screen movement |
| ease-in-out-quart | (0.77, 0, 0.175, 1) | Emphatic transitions |

### When to use which easing

| Scenario | Easing |
|----------|--------|
| Element entering or exiting | ease-out |
| Movement within the screen | ease-in-out |
| Hover / color transitions | platform default ease |
| Something the user sees 100+ times daily | Do not animate |

### Duration guidance

No fixed duration tokens exist. Use appropriate durations per context:

| Context | Typical duration |
|---------|-----------------|
| Hover color change | ~150ms |
| Button press feedback | ~100ms |
| Dropdown/menu enter | ~150ms |
| Modal/dialog enter | ~200–300ms |
| Page transitions | ~300ms |

Exit animations should be **20–30% faster** than their entrance counterpart.

### Named animations (intent, not syntax)

These describe what should happen. Each platform implements them using its own animation system.

| Name | Description | Used by |
|------|-------------|---------|
| spin | Continuous 360° rotation, 600ms, linear | Loading spinners |
| shake | Horizontal shake (±4px, decaying), 300ms, ease-out | Input error feedback |
| check-pop | Scale from 0.5→1.15→1 with fade-in, 300ms, ease-out | Success checkmark |
| menu-enter | Translate up 8px→0 with fade-in, 150ms, ease-out-cubic | Dropdown menus |
| tick-pop | Scale from 0.3→1.15→1 with fade-in, 250ms, ease-out | Selected-item tick |
| dot-wave | 3 dots at 6px, staggered opacity pulse (0, 0.15s, 0.3s delays) | Button loading |

### Performance rules

1. Only animate **transform** and **opacity** (GPU-friendly on all platforms).
2. Never animate padding, margin, height, or width directly.
3. Respect the user's reduced-motion preference (web: `prefers-reduced-motion`, mobile: system accessibility setting).

Motion tokens are **theme-agnostic**.

---

## 11. Iconography

### Icon library

The canonical glyph set is **Lucide**. All platforms must use the same Lucide icon names. Do not mix in icons from unrelated libraries.

### Arrow vs chevron — the decision rule

> **Will the user leave the current context or trigger a state change?**
> - **Yes** → Use an **arrow**.
> - **No, content reveals in place** → Use a **chevron**.

#### Arrows mean "go" or "perform an action"

| Context | Icon |
|---------|------|
| Primary CTA / submit | ArrowRight (trailing) |
| Back navigation | ArrowLeft (leading) |
| External link | ArrowUpRight (trailing) |
| Pagination next/prev | ArrowRight / ArrowLeft |
| Download / send | Download / Send |

#### Chevrons mean "reveal" or "browse within context"

| Context | Icon |
|---------|------|
| Accordion expand/collapse | ChevronDown / ChevronUp |
| Dropdown trigger | ChevronDown |
| Side navigation expand | ChevronRight |
| Carousel browse | ChevronLeft / ChevronRight |
| Breadcrumb separator | ChevronRight |

### Icon sizing

| Component size | Icon size |
|----------------|-----------|
| xs | 12px |
| sm | 16px |
| md | 16px |
| lg | 24px |
| xl | 32px |

### Icon placement

| Position | Meaning |
|----------|---------|
| Leading (left) | Reinforces the label — describes *what* |
| Trailing (right) | Indicates direction — describes *where* |

- **CTA buttons:** arrow on the right (trailing) — it points where you're going.
- **Back buttons:** arrow on the left (leading) — it points where you came from.
- **Destructive actions:** icon on the left (leading) — e.g. trash icon reinforces the label.

### Rules

- Icons must inherit text color from the theme (use the equivalent of `currentColor`).
- Icons inside components derive their size from the component's size tier. Do not manually override icon dimensions inside buttons.
- Decorative icons must be hidden from assistive technology. Icon-only buttons must provide an accessible name.

---

## 12. Layout

### Breakpoints

| Name | Range | First applies at |
|------|-------|------------------|
| Mobile | 0–767px | Default (no query needed) |
| Tablet | 768–1023px | 768px |
| Desktop | 1024px and above | 1024px |

Always design **mobile-first**: start with the narrowest styles, then add overrides at wider breakpoints.

### Gutters (horizontal padding on the content container)

| Breakpoint | Gutter |
|------------|--------|
| Mobile | 16px |
| Tablet | 32px |
| Desktop | 40px |

Gutters are **internal padding**, not margin.

### Content container

- Fills 100% width until **1280px**, then **caps and centers**.
- Content must never touch viewport edges on desktop.

### Full-bleed sections

For hero banners, edge-to-edge media, or background-driven storytelling:

- **Outer wrapper:** spans the full viewport width (carries the background).
- **Inner wrapper:** constrains content using standard container rules (gutters, max width, centering).

Both layers are required. Never skip the inner container.

### Desktop typography scaling

Between 1024px and 1280px, **only typography scales**. Grid column count, spacing, and component density remain constant. Above 1280px, typography stops scaling.

### Grid rules

- Use **relative units** for columns, never fixed pixel widths.
- Avoid using the full viewport width inside constrained containers; use 100% of the parent instead.
- Grid structure must not change between 1024px and 1280px.

---

## 13. Accessibility fundamentals

These apply to every component on every platform:

1. **Keyboard / assistive activation:** Every interactive element must be activatable by keyboard (web) or focus-based navigation (mobile).
2. **Focus visibility:** When navigating with keyboard or assistive tech, a visible focus indicator must appear. The system uses `shadow-focus-ring` for this.
3. **Touch targets:** Minimum effective size **44px** on touch-first layouts. The `xs` size (32px) is reserved for dense pointer interfaces.
4. **Color is never the only indicator.** Error, success, and state changes must also be conveyed through text, icons, or shape.
5. **Loading state** must announce "busy" to assistive technology.
6. **Disabled** elements must not be activatable.
7. **Decorative icons** must be hidden from screen readers. Icon-only controls must have an accessible text label.
8. **Reduced motion:** Respect the user's system-level preference to reduce animations.

---

## 14. Orchestration — how it all fits together

### Token flow (any platform)

```
Primitives  →  Semantic tokens  →  Component tokens  →  Themed component
(raw hex)      (named roles)       (per-component)       (light / dark / elevated)
```

A component never decides "I need purple-600." It says "I need the primary fill." The theme decides which primitive backs that name.

### Building a component — the checklist

1. **Identify variants, sizes, and states** from `docs/components/<name>/<name>-base.md`.
2. **Map each visual property to a semantic or component token** from this file. If no token exists, propose one — do not invent raw values.
3. **Pick sizes from the component height table** and **spacing from the spacing table**.
4. **Apply the correct radius** by component role (pill for controls, 4xl for surfaces, nested rule for children).
5. **Choose shadows** from the semantic alias table, not raw blur values.
6. **Set typography** using the type scale — headings at heading levels, labels at label levels, never mix them.
7. **Follow the icon rules** — arrow vs chevron, leading vs trailing, correct size per component tier.
8. **Implement all canonical states** — default, hover (if applicable), pressed, focus, disabled, loading (if applicable).
9. **Apply sentence case** to all visible text labels (except Badge, which defaults to uppercase).
10. **Verify accessibility** — focus ring, touch target, assistive-tech labels, no color-only signals, reduced-motion support.

### What each platform owns

| Concern | Owned by this document | Owned by platform implementation |
|---------|------------------------|----------------------------------|
| Token names and values | Yes | — |
| Variant/size/state definitions | Yes | — |
| Radius roles and nesting math | Yes | — |
| Icon meaning and sizing | Yes | — |
| CSS class names | — | Web |
| React props / component API | — | Web |
| Widget tree / ThemeExtension | — | Flutter |
| ARIA attributes | — | Web |
| Semantics widget | — | Flutter |
| Hover media queries | — | Web |
| WidgetState management | — | Flutter |

### Adding a new token

1. Add the token to this document with its role, light value, and dark value.
2. Add it to the web token file (`tokens.css`) and theme mapping (`theme.css`).
3. Add it to the Flutter theme extension (when it exists).
4. Never let a token exist in only one platform — the global doc is the contract.

---

*This document is aligned with the ACKO Design System monorepo. Per component: `docs/components/<name>/<name>-base.md`, `react/<name>-react.md`, `flutter/<name>-flutter.md`, and `.cursor/rules/components/<name>/<name>.styles.mdc` (Button: `button.style.mdc`) for web CSS.*
