# ACKO Semantic Theme

Semantic color tokens that map **roles** to **primitives.md primitives**. Components reference ONLY these tokens — never raw palette values. Switching themes means remapping these aliases to different primitives.

> **Rule:** If a component needs a color, it MUST exist here first. No primitive (`--purple-600`, `--grey-200`) should ever appear in component CSS.

---

## Architecture

```
primitives.md (Layer 1)        semantics.md (Layer 2)            components.md (Layer 3)
─────────────────────          ──────────────────              ────────────────────────
--purple-600: #6841E6    →     --color-primary                →  btn background
--grey-white: #FFFFFF    →     --color-surface                →  input background
--red-500: #EF4444       →     --color-error                  →  error border/text
--grey-200: #E0E0E1      →     --color-border                →  input/dropdown border
```

---

## Brand / Primary

The primary brand color used for CTAs, active states, focus rings, and interactive elements.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-primary` | Main brand / CTA fill | `var(--purple-600)` | `var(--purple-500)` |
| `--color-primary-hover` | Primary hover / selected text | `var(--purple-700)` | `var(--purple-400)` |
| `--color-primary-active` | Primary active/pressed state | `var(--purple-800)` | `var(--purple-300)` |
| `--color-primary-muted` | Soft primary border (hover hints) | `var(--purple-400)` | `var(--purple-600)` |
| `--color-primary-subtle` | Tinted backgrounds (hover/selected fills) | `var(--purple-100)` | `var(--purple-900)` |
| `--color-primary-ring` | Focus ring around interactive elements | `var(--purple-200)` | `var(--purple-800)` |
| `--color-on-primary` | Text/icon on primary-colored backgrounds | `#FFFFFF` | `var(--grey-white)` |

```css
:root {
  --color-primary: var(--purple-600);
  --color-primary-hover: var(--purple-700);
  --color-primary-active: var(--purple-800);
  --color-primary-subtle: var(--purple-100);
  --color-primary-muted: var(--purple-400);
  --color-primary-ring: var(--purple-200);
  --color-on-primary: #FFFFFF;
}

[data-theme="dark"] {
  --color-primary: var(--purple-500);
  --color-primary-hover: var(--purple-400);
  --color-primary-active: var(--purple-300);
  --color-primary-subtle: var(--purple-900);
  --color-primary-muted: var(--purple-600);
  --color-primary-ring: var(--purple-800);
  --color-on-primary: var(--grey-white);
}
```

---

## Surfaces

Background layers that establish visual depth hierarchy.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-surface` | Base page background | `var(--grey-100)` | `var(--grey-750)` |
| `--color-surface-raised` | Elevated surface (cards, inputs on dark) | `var(--grey-100)` | `var(--grey-700)` |
| `--color-surface-raised-hover` | Hovered raised surface | `var(--grey-200)` | `var(--grey-650)` |
| `--color-surface-raised-active` | Active/pressed raised surface | `var(--grey-300)` | `var(--grey-600)` |
| `--color-surface-overlay` | Backdrop overlays | `rgba(10, 10, 10, 0.5)` | `rgba(0, 0, 0, 0.7)` |
| `--color-surface-ghost-hover` | Ghost/outline hover | `rgba(0, 0, 0, 0.04)` | `rgba(255, 255, 255, 0.05)` |

```css
:root {
  --color-surface: var(--grey-100);
  --color-surface-raised: var(--grey-100);
  --color-surface-raised-hover: var(--grey-200);
  --color-surface-raised-active: var(--grey-300);
  --color-surface-overlay: rgba(10, 10, 10, 0.5);
  --color-surface-ghost-hover: rgba(0, 0, 0, 0.04);
}

[data-theme="dark"] {
  --color-surface: var(--grey-750);
  --color-surface-raised: var(--grey-700);
  --color-surface-raised-hover: var(--grey-650);
  --color-surface-raised-active: var(--grey-600);
  --color-surface-overlay: rgba(0, 0, 0, 0.7);
  --color-surface-ghost-hover: rgba(255, 255, 255, 0.05);
}
```

---

## Text

Typographic hierarchy from strongest (headings) to weakest (disabled placeholders).

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-text-strong` | Headings, user-entered values, active/selected states | `var(--grey-800)` | `var(--grey-50)` |
| `--color-text-default` | Labels, body text, system-provided UI text | `var(--grey-700)` | `var(--grey-100)` |
| `--color-text-secondary` | Secondary/supporting text | `var(--grey-550)` | `var(--grey-200)` |
| `--color-text-muted` | Placeholders, helper text, icons | `var(--grey-450)` | `var(--grey-350)` |
| `--color-text-disabled` | Disabled text, faded placeholders | `var(--grey-300)` | `var(--grey-450)` |

```css
:root {
  --color-text-strong: var(--grey-800);
  --color-text-default: var(--grey-700);
  --color-text-secondary: var(--grey-550);
  --color-text-muted: var(--grey-450);
  --color-text-disabled: var(--grey-300);
}

[data-theme="dark"] {
  --color-text-strong: var(--grey-50);
  --color-text-default: var(--grey-100);
  --color-text-secondary: var(--grey-200);
  --color-text-muted: var(--grey-350);
  --color-text-disabled: var(--grey-450);
}
```

---

## Typography Usage Map

Font tokens defined in `primitives.md` are referenced directly by components (they don't change between themes). This map documents exactly where each token is used.

### Actively Used Tokens

| Token Group | Properties | Used By |
|-------------|-----------|---------|
| `--font-body-sm` | `size: 14px`, `line: 20px`, `weight: 400` | TextInput (sm), Dropdown (sm options), Prefix/suffix, Pagination |
| `--font-body-md` | `size: 16px`, `line: 24px`, `weight: 400` | TextInput (md), Dropdown (md options), Calendar trigger, globals.css base |
| `--font-body-lg` | `size: 18px`, `line: 28px`, `weight: 400` | TextInput (lg), Dropdown (lg options) |
| `--font-label-lg` | `size: 14px`, `line: 20px`, `spacing: 0.1px`, `weight: 500` | TextInput label, Dropdown label, Radio group label, Calendar header label |
| `--font-label-sm` | `size: 11px`, `line: 14px`, `spacing: 0.3px`, `weight: 500` | Calendar weekday headers, Dropdown group headings |
| `--font-caption` | `size: 12px`, `line: 16px`, `weight: 400` | Helper/error/success text, char count, descriptions (Radio, Checkbox), NavigationWizard step labels |

### All Tokens Active

All font tokens defined in `tokens.css` are now consumed by the `Typography` component (16 variants). No orphaned tokens remain.

### Raw Font Sizes (not using tokens)

These components use hardcoded pixel values that map to existing tokens but aren't referencing them:

| Component | Raw Value | Should Map To |
|-----------|-----------|---------------|
| Button sizes (xs–xl) | `12px, 14px, 16px, 18px, 20px` | Intentional — buttons follow their own size scale |
| Badge sizes (sm/md/lg) | `11px, 12px, 14px` | `--font-label-sm`, `--font-caption`, `--font-body-sm` |
| Badge counter | `11px` | `--font-label-sm-size` |
| Calendar day cells | `14px` | `--font-body-sm-size` |
| Calendar picker cells | `14px` | `--font-body-sm-size` |
| Checkbox/Radio label sizes | `14px, 16px, 18px` | `--font-body-sm`, `--font-body-md`, `--font-body-lg` |
| Dropdown option text | `14px` | `--font-body-sm-size` |
| NavigationWizard step text | `14px` | `--font-body-sm-size` |
| Pagination page buttons | `14px` | `--font-body-sm-size` |

> **Note:** Button font sizes are intentionally hardcoded to their own scale (12–20px across 5 sizes) and should not use body tokens. All other raw values above are candidates for token migration.

---

## Borders

Stroke colors for containers, dividers, and input boundaries.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-border` | Default input/container border | `var(--grey-300)` | `var(--grey-600)` |
| `--color-border-strong` | Hovered/filled input border | `var(--grey-450)` | `var(--grey-550)` |
| `--color-border-subtle` | Faint borders, disabled state, dividers | `var(--grey-200)` | `var(--grey-650)` |

```css
:root {
  --color-border: var(--grey-300);
  --color-border-strong: var(--grey-450);
  --color-border-subtle: var(--grey-200);
}

[data-theme="dark"] {
  --color-border: var(--grey-600);
  --color-border-strong: var(--grey-550);
  --color-border-subtle: var(--grey-650);
}
```

---

## Feedback — Error

Destructive actions, validation failures, and error states.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-error` | Error border and label text | `var(--red-600)` | `var(--red-600)` |
| `--color-error-text` | Error heading/icon text | `var(--red-700)` | `var(--red-400)` |
| `--color-error-subtle` | Error alert fill | `var(--red-100)` | `var(--red-950)` |
| `--color-error-border` | Alert error border | `var(--red-200)` | `var(--red-800)` |
| `--color-error-badge-bg` | Error badge background | `var(--red-100)` | `var(--red-900)` |

```css
:root {
  --color-error: var(--red-600);
  --color-error-text: var(--red-700);
  --color-error-subtle: var(--red-100);
  --color-error-border: var(--red-200);
  --color-error-badge-bg: var(--red-100);
}

[data-theme="dark"] {
  --color-error: var(--red-600);
  --color-error-text: var(--red-400);
  --color-error-subtle: var(--red-950);
  --color-error-border: var(--red-800);
  --color-error-badge-bg: var(--red-900);
}
```

---

## Feedback — Success

Validation success, completed steps.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-success` | Success fill (wizard completed, icons) | `var(--green-600)` | `var(--green-500)` |
| `--color-success-text` | Success heading/icon text | `var(--green-700)` | `var(--green-400)` |
| `--color-success-subtle` | Success alert fill | `var(--green-100)` | `var(--green-950)` |
| `--color-success-border` | Alert success border | `var(--green-200)` | `var(--green-800)` |
| `--color-success-badge-bg` | Success badge background | `var(--green-200)` | `var(--green-900)` |

```css
:root {
  --color-success: var(--green-600);
  --color-success-text: var(--green-700);
  --color-success-subtle: var(--green-100);
  --color-success-border: var(--green-200);
  --color-success-badge-bg: var(--green-200);
}

[data-theme="dark"] {
  --color-success: var(--green-500);
  --color-success-text: var(--green-400);
  --color-success-subtle: var(--green-950);
  --color-success-border: var(--green-800);
  --color-success-badge-bg: var(--green-900);
}
```

---

## Feedback — Warning

Cautionary states, alerts.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-warning` | Warning indicators | `var(--orange-600)` | `var(--orange-500)` |
| `--color-warning-text` | Warning heading/icon text | `var(--orange-700)` | `var(--orange-400)` |
| `--color-warning-subtle` | Warning alert fill | `var(--orange-50)` | `var(--orange-950)` |
| `--color-warning-border` | Alert warning border | `var(--orange-100)` | `var(--orange-800)` |
| `--color-warning-badge-bg` | Warning badge background | `var(--orange-200)` | `var(--orange-900)` |

```css
:root {
  --color-warning: var(--orange-600);
  --color-warning-text: var(--orange-700);
  --color-warning-subtle: var(--orange-50);
  --color-warning-border: var(--orange-100);
  --color-warning-badge-bg: var(--orange-200);
}

[data-theme="dark"] {
  --color-warning: var(--orange-500);
  --color-warning-text: var(--orange-400);
  --color-warning-subtle: var(--orange-950);
  --color-warning-border: var(--orange-800);
  --color-warning-badge-bg: var(--orange-900);
}
```

---

## Feedback — Info

Informational states, neutral alerts. Uses **purple** (brand color) — not blue.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-info` | Info indicators | `var(--purple-600)` | `var(--purple-500)` |
| `--color-info-text` | Info heading/icon text | `var(--purple-700)` | `var(--purple-400)` |
| `--color-info-subtle` | Info alert fill | `var(--purple-100)` | `var(--purple-950)` |
| `--color-info-border` | Alert info border | `var(--purple-200)` | `var(--purple-800)` |
| `--color-info-badge-bg` | Info badge background | `var(--purple-200)` | `var(--purple-900)` |

```css
:root {
  --color-info: var(--purple-600);
  --color-info-text: var(--purple-700);
  --color-info-subtle: var(--purple-100);
  --color-info-border: var(--purple-200);
  --color-info-badge-bg: var(--purple-200);
}

[data-theme="dark"] {
  --color-info: var(--purple-500);
  --color-info-text: var(--purple-400);
  --color-info-subtle: var(--purple-950);
  --color-info-border: var(--purple-800);
  --color-info-badge-bg: var(--purple-900);
}
```

---

## Alert Body Text

A dedicated token for alert card body/sub text, separate from heading color.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-alert-body` | Alert body/sub text | `var(--grey-550)` | `var(--grey-100)` |

---

## Interactive — Disabled

Unified disabled appearance across all components.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-disabled-bg` | Disabled element background | `var(--grey-150)` | `var(--grey-600)` |
| `--color-disabled-text` | Disabled element text/icon | `var(--grey-350)` | `var(--grey-450)` |
| `--color-disabled-border` | Disabled element border | `var(--grey-200)` | `var(--grey-600)` |

```css
:root {
  --color-disabled-bg: var(--grey-150);
  --color-disabled-text: var(--grey-350);
  --color-disabled-border: var(--grey-200);
}

[data-theme="dark"] {
  --color-disabled-bg: var(--grey-600);
  --color-disabled-text: var(--grey-450);
  --color-disabled-border: var(--grey-600);
}
```

---

## Shadows (semantic)

Semantic shadow tokens that reference primitives.md shadow primitives or compose new values from Foundation colors + opacity.

### General Shadows (from Foundation)

These map directly to Foundation shadow primitives:

| Token | Foundation Reference | Use Case |
|-------|---------------------|----------|
| `--shadow-card` | `var(--shadow-md)` | Cards, raised surfaces |
| `--shadow-dropdown` | `var(--shadow-lg)` | Dropdowns, popovers, menus |
| `--shadow-modal` | `var(--shadow-xl)` | Modals, dialogs, drawers |
| `--shadow-subtle` | `var(--shadow-sm)` | Subtle depth on small elements |
| `--shadow-border-alt` | `var(--shadow-border)` | Border alternative using shadow |

### Component-Specific Shadows

These compose values from Foundation colors + opacity tokens:

| Token | Role | Derivation |
|-------|------|-----------|
| `--shadow-btn-inner` | Convex inner glow on primary buttons | `--grey-white` + `--opacity-28` (light) / `--opacity-15` (dark) |
| `--shadow-btn-hover` | Elevated shadow on button hover | `--grey-black` + `--opacity-8` (light) / `--opacity-30` (dark) |
| `--shadow-btn-secondary-hover` | Inner highlight on secondary button hover | `--grey-white` + `--opacity-48` (light) / `--grey-black` + `--opacity-20` (dark) |
| `--shadow-focus-ring` | Keyboard focus ring | 3px ring using `--color-primary-ring` |

| Token | Light | Dark |
|-------|-------|------|
| `--shadow-btn-inner` | `inset 0px 1px 2px rgba(255,255,255,0.28)` | `inset 0px 1px 2px rgba(255,255,255,0.15)` |
| `--shadow-btn-hover` | `0px 4px 8px rgba(0,0,0,0.08)` | `0px 4px 8px rgba(0,0,0,0.3)` |
| `--shadow-btn-secondary-hover` | `inset 0px 2px 4px rgba(255,255,255,0.48)` | `inset 0px 2px 4px rgba(0,0,0,0.2)` |
| `--shadow-focus-ring` | `0 0 0 3px var(--color-primary-ring)` | `0 0 0 3px var(--color-primary-ring)` |

> **Note on rgba values:** CSS cannot compose `var(--color) + var(--opacity)` natively. The rgba values above are derived from Foundation primitives:
> - `rgba(255,255,255,...)` = `--grey-white` (#FFFFFF)
> - `rgba(0,0,0,...)` = `--grey-black` (#000000)
> - Opacity values (0.28, 0.15, 0.08, 0.20, 0.30, 0.48) map to `--opacity-28`, `--opacity-15`, `--opacity-8`, `--opacity-20`, `--opacity-30`, `--opacity-48`

```css
:root {
  /* General shadows (map to Foundation) */
  --shadow-card: var(--shadow-md);
  --shadow-dropdown: var(--shadow-lg);
  --shadow-modal: var(--shadow-xl);
  --shadow-subtle: var(--shadow-sm);
  --shadow-border-alt: var(--shadow-border);

  /* Component shadows (composed from Foundation colors + opacity) */
  /* Derived from: --grey-white + --opacity-28 */
  --shadow-btn-inner: inset 0px 1px 2px rgba(255, 255, 255, 0.28);
  /* Derived from: --grey-black + --opacity-8 */
  --shadow-btn-hover: 0px 4px 8px rgba(0, 0, 0, 0.08);
  /* Derived from: --grey-white + --opacity-48 */
  --shadow-btn-secondary-hover: inset 0px 2px 4px rgba(255, 255, 255, 0.48);
  --shadow-focus-ring: 0 0 0 3px var(--color-primary-ring);
}

[data-theme="dark"] {
  /* Derived from: --grey-white + --opacity-15 */
  --shadow-btn-inner: inset 0px 1px 2px rgba(255, 255, 255, 0.15);
  /* Derived from: --grey-black + --opacity-30 */
  --shadow-btn-hover: 0px 4px 8px rgba(0, 0, 0, 0.3);
  /* Derived from: --grey-black + --opacity-20 */
  --shadow-btn-secondary-hover: inset 0px 2px 4px rgba(0, 0, 0, 0.2);
}
```

---

## Z-Index (semantic)

Semantic z-index tokens that reference primitives.md z-index scale.

| Token | Foundation Reference | Use Case |
|-------|---------------------|----------|
| `--z-dropdown` | `var(--z-dropdown)` | Dropdowns, popovers |
| `--z-sticky` | `var(--z-sticky)` | Sticky headers, navbars |
| `--z-modal` | `var(--z-modal)` | Modals, dialogs |
| `--z-tooltip` | `var(--z-tooltip)` | Tooltips |
| `--z-toast` | `var(--z-toast)` | Toast notifications |

```css
:root {
  --z-dropdown: 100;
  --z-sticky: 150;
  --z-modal: 200;
  --z-tooltip: 300;
  --z-toast: 400;
}
```

---

## Cards

Global card surface tokens used by any card-shaped component (Radio card, bento tiles, preview containers).

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-card-bg` | Default card fill | `var(--grey-50)` | `var(--grey-700)` |
| `--color-card-border` | Default card border (highlight edge) | `var(--grey-white)` | `var(--grey-650)` |
| `--color-card-elevated-bg` | Elevated card fill | `var(--grey-white)` | `var(--grey-650)` |
| `--color-card-demoted-bg` | Demoted card fill | `var(--grey-150)` | `var(--grey-750)` |
| `--color-card-demoted-border` | Demoted card border | `var(--grey-200)` | `var(--grey-600)` |
| `--color-card-outline-border` | Outline card border | `var(--grey-200)` | `var(--grey-600)` |

> **Design intent:** On a `--color-surface` (grey-100) page, default cards use grey-50 fill with a white border — the border is *lighter* than the fill, creating a floating highlight edge rather than a traditional stroke.

---

## Form Controls

Shared tokens for checkbox and radio button borders.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-control-border-selector` | Checkbox/radio outer ring | `var(--grey-200)` | `var(--grey-500)` |

---

## Component — Button

6 variants: **Primary**, **Secondary**, **Inverted**, **Ghost**, **Link**, **Danger**, plus **Disabled** state.

### Variant spec

| Variant | Light Fill | Light Border | Light Text | Dark Fill | Dark Border | Dark Text |
|---------|-----------|-------------|-----------|----------|------------|----------|
| **Primary** | `--color-primary` (purple-600) | — | `--color-on-primary` (#FFF) | `--color-primary` (purple-500) | — | `--color-on-primary` |
| **Secondary** | `--color-btn-secondary-bg` (purple-50) | `--color-btn-secondary-border` (purple-300) | `--color-btn-secondary-text` (purple-700) | grey-650 | purple-600 | grey-50 |
| **Inverted** | `--color-btn-inverted-bg` (grey-100) | — | `--color-btn-inverted-text` (purple-700) | grey-100 | — | purple-700 |
| **Ghost** | transparent | — | `--color-btn-ghost-color` (purple-600) | transparent | — | purple-500 |
| **Link** | transparent | — | `--color-btn-link-color` (blue-600) | transparent | — | blue-500 |
| **Disabled** | `--color-btn-disabled-bg` (grey-100) | — | `--color-btn-disabled-text` (grey-350) | grey-600 | — | grey-450 |
| **Danger** | `--color-btn-danger-bg` (red-100) | — | `--color-btn-danger-text` (red-500) | red-900 | — | red-200 |

### Hover states

| Variant | Light hover | Dark hover |
|---------|------------|-----------|
| **Primary** | Darken overlay + drop shadow | `--color-btn-primary-hover-bg` (purple-600) + drop shadow |
| **Secondary** | `brightness(0.96)` | `brightness(1.1)` |
| **Inverted** | `brightness(0.96)` | `brightness(0.9)` |
| **Ghost** | `--color-btn-ghost-hover-bg` (purple-50) | grey-600 fill |
| **Link** | Underline | Underline |
| **Danger** | `brightness(0.96)` | `brightness(1.1)` |

### Button tokens

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-btn-secondary-bg` | Secondary button fill | `var(--purple-50)` | `var(--grey-650)` |
| `--color-btn-secondary-border` | Secondary button border | `var(--purple-300)` | `var(--purple-600)` |
| `--color-btn-secondary-text` | Secondary button text | `var(--purple-700)` | `var(--grey-50)` |
| `--color-btn-inverted-bg` | Inverted button fill | `var(--grey-100)` | `var(--grey-100)` |
| `--color-btn-inverted-text` | Inverted button text | `var(--purple-700)` | `var(--purple-700)` |
| `--color-btn-ghost-hover-bg` | Ghost button hover fill | `var(--purple-50)` | `var(--grey-600)` |
| `--color-btn-ghost-color` | Ghost button text | `var(--purple-600)` | `var(--purple-500)` |
| `--color-btn-link-color` | Link button text | `var(--blue-600)` | `var(--blue-500)` |
| `--color-btn-danger-bg` | Danger button fill | `var(--red-100)` | `var(--red-900)` |
| `--color-btn-danger-text` | Danger button text | `var(--red-500)` | `var(--red-200)` |
| `--color-btn-disabled-bg` | Disabled button fill | `var(--grey-100)` | `var(--grey-600)` |
| `--color-btn-disabled-text` | Disabled button text | `var(--grey-350)` | `var(--grey-450)` |
| `--color-btn-primary-hover-bg` | Primary hover fill (dark) | — | `var(--purple-600)` |

---

## Component — Radio

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-radio-card-hover-border` | Card radio hover border | `var(--purple-200)` | `var(--purple-700)` |
| `--color-radio-card-hover-bg` | Card radio hover fill | `var(--purple-50)` | `var(--purple-950)` |
| `--color-radio-card-active-border` | Card radio selected border | `var(--purple-300)` | `var(--purple-600)` |
| `--color-radio-card-active-bg` | Card radio selected fill | `var(--purple-100)` | `var(--purple-900)` |

---

## Component — Tooltip

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-tooltip-bg` | Tooltip background | `var(--grey-700)` | `var(--grey-200)` |
| `--color-tooltip-text` | Tooltip text | `var(--grey-white)` | `var(--grey-750)` |

---

## Component — Tabs (Pill)

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-tab-pill-bg` | Pill container background | `var(--grey-150)` | `var(--grey-650)` |
| `--color-tab-pill-active-bg` | Active pill tab fill | `var(--grey-white)` | `var(--grey-550)` |

---

## Component — Toggle

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-toggle-bg` | Toggle resting fill | `var(--grey-150)` | `var(--grey-650)` |
| `--color-toggle-bg-hover` | Toggle hover fill | `var(--grey-200)` | `var(--grey-600)` |
| `--color-toggle-active-bg` | Toggle active fill | `var(--purple-100)` | `var(--purple-900)` |
| `--color-toggle-active-text` | Toggle active text | `var(--purple-700)` | `var(--purple-300)` |
| `--color-toggle-text` | Toggle resting text | `var(--grey-450)` | `var(--grey-350)` |

---

## Component — Input (Shared)

Shared form input container tokens used by Dropdown, InputGroup, TextInput, and Textarea.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-input-bg` | Input/trigger background | `var(--grey-white)` | `var(--grey-700)` |
| `--color-input-border` | Input/trigger default border | `var(--color-border-subtle)` | `var(--grey-450)` |
| `--color-input-hover-border` | Input/trigger hover border | `var(--grey-350)` | `var(--grey-500)` |
| `--color-input-option-hover` | Option hover fill (Dropdown) | `var(--grey-100)` | `var(--grey-600)` |
| `--color-input-option-selected-bg` | Selected option fill (Dropdown) | `var(--purple-100)` | `var(--purple-900)` |
| `--color-input-option-selected-text` | Selected option text (Dropdown) | `var(--purple-700)` | `var(--purple-300)` |

---

## Component — Accordion

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-accordion-border` | Accordion item border | `var(--grey-200)` | `var(--grey-600)` |
| `--color-accordion-header-hover` | Header hover fill | `var(--grey-50)` | `var(--grey-650)` |
| `--color-accordion-icon` | Chevron/icon color | `var(--grey-400)` | `var(--grey-400)` |

---

## Component — Breadcrumb

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-breadcrumb-text` | Default breadcrumb text | `var(--grey-400)` | `var(--grey-400)` |
| `--color-breadcrumb-link` | Breadcrumb link | `var(--grey-500)` | `var(--grey-350)` |
| `--color-breadcrumb-link-hover` | Breadcrumb link hover | `var(--purple-600)` | `var(--purple-400)` |
| `--color-breadcrumb-current` | Current/active breadcrumb | `var(--grey-700)` | `var(--grey-100)` |
| `--color-breadcrumb-separator` | Separator character | `var(--grey-300)` | `var(--grey-550)` |

---

## Component — Table

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-table-header-bg` | Table header background | `var(--grey-100)` | `var(--grey-700)` |
| `--color-table-header-text` | Table header text | `var(--grey-500)` | `var(--grey-350)` |
| `--color-table-border` | Table border/divider | `var(--grey-200)` | `var(--grey-600)` |
| `--color-table-row-hover` | Row hover fill | `var(--grey-50)` | `var(--grey-650)` |
| `--color-table-stripe` | Alternating row fill | `var(--grey-50)` | `rgba(255, 255, 255, 0.02)` |

---

## Component — Calendar

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-cal-selected-bg` | Selected day fill | `var(--purple-600)` | `var(--purple-500)` |
| `--color-cal-selected-text` | Selected day text | `var(--grey-white)` | `var(--grey-white)` |
| `--color-cal-range-bg` | Range middle band fill | `var(--purple-50)` | `var(--purple-950)` |
| `--color-cal-range-text` | Range middle band text | `var(--purple-700)` | `var(--purple-300)` |
| `--color-cal-hover-bg` | Day hover fill | `var(--purple-50)` | `var(--purple-950)` |
| `--color-cal-today-text` | Today indicator text | `var(--purple-600)` | `var(--purple-400)` |
| `--color-cal-cell-hover-bg` | Month/year picker cell hover | `var(--grey-100)` | `var(--grey-650)` |

---

## Component — NavigationWizard

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-wizard-active-bg` | Active step circle fill | `var(--purple-500)` | `var(--purple-600)` |
| `--color-wizard-active-text` | Active step circle text | `var(--grey-50)` | `var(--grey-white)` |
| `--color-wizard-active-shadow-top` | Active circle inset highlight | `var(--purple-400)` | `var(--purple-500)` |
| `--color-wizard-active-shadow-bottom` | Active circle inset shade | `var(--purple-700)` | `var(--purple-800)` |
| `--color-wizard-done-bg` | Completed step circle fill | `var(--purple-200)` | `var(--purple-700)` |
| `--color-wizard-done-text` | Completed step circle icon | `var(--purple-600)` | `var(--purple-300)` |
| `--color-wizard-upcoming-border` | Upcoming step circle border | `var(--grey-250)` | `var(--grey-500)` |
| `--color-wizard-upcoming-text` | Upcoming step text/number | `var(--grey-350)` | `var(--grey-450)` |
| `--color-wizard-connector-done` | Completed connector line | `var(--purple-200)` | `var(--purple-700)` |
| `--color-wizard-connector-upcoming` | Upcoming connector line | `var(--grey-250)` | `var(--grey-500)` |

Active step uses the same dual inset shadow as badges/counters:

```css
box-shadow:
  inset 0 -1px 2px 0 var(--color-wizard-active-shadow-bottom),
  inset 0 1px 1px 0 var(--color-wizard-active-shadow-top);
```

---

## Badge Colors

Flat badge system. Each badge color maps to two tokens — `bg` and `text`. No shadows (inner or drop).

### Semantic Mapping

| Badge label | Color key | Use case |
|-------------|-----------|----------|
| Default / Purple | `purple` | Default state, informational |
| Active | `green` | Active policies, live status |
| Info | `blue` | Informational alerts, tips |
| Expired | `pink` | Expired, failed, overdue |
| Archived | `gray` | Archived, inactive, disabled |
| Warning | `orange` | Caution, approaching deadline |

### Light Theme

| Color | `bg` | `text` |
|-------|------|--------|
| `purple` | `purple-200` | `purple-900` |
| `green` (Active) | `lime-200` | `green-800` |
| `blue` (Info) | `blue-200` | `blue-800` |
| `orange` (Warning) | `orange-200` | `orange-800` |
| `pink` (Expired) | `red-200` | `red-800` |
| `gray` (Archived) | `grey-200` | `grey-400` |

### Dark Theme

| Color | `bg` | `text` |
|-------|------|--------|
| `purple` | `purple-900` | `purple-100` |
| `green` | `green-900` | `green-200` |
| `blue` | `blue-900` | `blue-200` |
| `orange` | `orange-800` | `orange-100` |
| `pink` | `red-900` | `red-200` |
| `gray` | `grey-600` | `grey-200` |

### Outline Badges

Border and text use the 600 shade of the color. No fill.

| Color | Light `outline-color` | Dark `outline-color` |
|-------|-----------------------|----------------------|
| `purple` | `purple-600` | `purple-400` |
| `green` | `green-600` | `green-600` |
| `blue` | `blue-600` | `blue-600` |
| `orange` | `orange-600` | `orange-600` |
| `pink` | `red-600` | `red-600` |
| `gray` | `grey-600` | `grey-500` |

### Counter Badges

Saturated pill counters. No shadows.

| Color | Light `bg` | Dark `bg` |
|-------|------------|-----------|
| `pink` | `red-500` | `red-600` |
| `purple` | `purple-500` | `purple-600` |
| `blue` | `blue-500` | `blue-600` |

---

## Complete Combined Output

All semantic tokens in one block, mirroring the actual `tokens.css` `:root` and `[data-theme="dark"]` scopes.

```css
:root {
  /* Primary */
  --color-primary: var(--purple-600);
  --color-primary-hover: var(--purple-700);
  --color-primary-active: var(--purple-800);
  --color-primary-subtle: var(--purple-100);
  --color-primary-muted: var(--purple-400);
  --color-primary-ring: var(--purple-200);
  --color-on-primary: #FFFFFF;

  /* Surfaces */
  --color-surface: var(--grey-100);
  --color-surface-raised: var(--grey-100);
  --color-surface-raised-hover: var(--grey-200);
  --color-surface-raised-active: var(--grey-300);
  --color-surface-overlay: rgba(10, 10, 10, 0.5);
  --color-surface-ghost-hover: rgba(0, 0, 0, 0.04);

  /* Cards */
  --color-card-bg: var(--grey-50);
  --color-card-border: var(--grey-white);
  --color-card-elevated-bg: var(--grey-white);
  --color-card-demoted-bg: var(--grey-150);
  --color-card-demoted-border: var(--grey-200);
  --color-card-outline-border: var(--grey-200);

  /* Text */
  --color-text-default: var(--grey-800);
  --color-text-secondary: var(--grey-550);
  --color-text-muted: var(--grey-450);
  --color-text-disabled: var(--grey-300);

  /* Borders */
  --color-border: var(--grey-300);
  --color-border-strong: var(--grey-450);
  --color-border-subtle: var(--grey-200);

  /* Disabled */
  --color-disabled-bg: var(--grey-150);
  --color-disabled-text: var(--grey-350);
  --color-disabled-border: var(--grey-200);

  /* Success */
  --color-success: var(--green-600);
  --color-success-subtle: var(--green-100);
  --color-success-text: var(--green-700);
  --color-success-badge-bg: var(--green-200);
  --color-success-border: var(--green-200);

  /* Error */
  --color-error: var(--red-600);
  --color-error-subtle: var(--red-50);
  --color-error-text: var(--red-700);
  --color-error-badge-bg: var(--red-100);
  --color-error-border: var(--red-200);

  /* Warning */
  --color-warning: var(--orange-600);
  --color-warning-subtle: var(--orange-100);
  --color-warning-text: var(--orange-700);
  --color-warning-badge-bg: var(--orange-200);
  --color-warning-border: var(--orange-200);

  /* Info */
  --color-info: var(--blue-600);
  --color-info-subtle: var(--blue-100);
  --color-info-text: var(--blue-700);
  --color-info-badge-bg: var(--blue-200);
  --color-info-border: var(--blue-200);

  /* Tooltip */
  --color-tooltip-bg: var(--grey-700);
  --color-tooltip-text: var(--grey-white);

  /* Tabs pill */
  --color-tab-pill-bg: var(--grey-150);
  --color-tab-pill-active-bg: var(--grey-white);

  /* Toggle */
  --color-toggle-bg: var(--grey-150);
  --color-toggle-bg-hover: var(--grey-200);
  --color-toggle-active-bg: var(--purple-100);
  --color-toggle-active-text: var(--purple-700);
  --color-toggle-text: var(--grey-450);

  /* Input (shared by Dropdown, InputGroup, and form inputs) */
  --color-input-bg: var(--grey-white);
  --color-input-border: var(--color-border-subtle);
  --color-input-hover-border: var(--grey-350);
  --color-input-option-hover: var(--purple-50);
  --color-input-option-selected-bg: var(--purple-100);
  --color-input-option-selected-text: var(--purple-700);

  /* Accordion */
  --color-accordion-border: var(--grey-200);
  --color-accordion-header-hover: var(--grey-50);
  --color-accordion-icon: var(--grey-400);

  /* Breadcrumb */
  --color-breadcrumb-text: var(--grey-400);
  --color-breadcrumb-link: var(--grey-500);
  --color-breadcrumb-link-hover: var(--purple-600);
  --color-breadcrumb-current: var(--grey-700);
  --color-breadcrumb-separator: var(--grey-300);

  /* Table */
  --color-table-header-bg: var(--grey-100);
  --color-table-header-text: var(--grey-500);
  --color-table-border: var(--grey-200);
  --color-table-row-hover: var(--grey-50);
  --color-table-stripe: var(--grey-50);

  /* Form Controls (checkbox/radio outer ring) */
  --color-control-border-selector: var(--grey-200);

  /* Button */
  --color-btn-secondary-bg: var(--grey-150);
  --color-btn-ghost-hover-bg: var(--grey-150);
  --color-btn-ghost-color: var(--purple-600);
  --color-btn-outline-color: var(--purple-600);
  --color-btn-outline-hover-bg: var(--purple-50);

  /* Radio */
  --color-radio-card-hover-border: var(--purple-200);
  --color-radio-card-hover-bg: var(--purple-50);
  --color-radio-card-active-border: var(--purple-300);
  --color-radio-card-active-bg: var(--purple-100);

  /* Calendar */
  --color-cal-selected-bg: var(--purple-600);
  --color-cal-selected-text: var(--grey-white);
  --color-cal-range-bg: var(--purple-50);
  --color-cal-range-text: var(--purple-700);
  --color-cal-hover-bg: var(--purple-50);
  --color-cal-today-text: var(--purple-600);
  --color-cal-cell-hover-bg: var(--grey-100);

  /* Badge — solid */
  --color-badge-purple-bg: var(--purple-200);
  --color-badge-purple-text: var(--purple-800);
  --color-badge-purple-shadow-top: var(--purple-100);
  --color-badge-purple-shadow-bottom: var(--purple-300);

  --color-badge-green-bg: var(--green-200);
  --color-badge-green-text: var(--green-800);
  --color-badge-green-shadow-top: var(--green-100);
  --color-badge-green-shadow-bottom: var(--green-300);

  --color-badge-blue-bg: var(--blue-200);
  --color-badge-blue-text: var(--blue-800);
  --color-badge-blue-shadow-top: var(--blue-100);
  --color-badge-blue-shadow-bottom: var(--blue-300);

  --color-badge-orange-bg: var(--orange-200);
  --color-badge-orange-text: var(--orange-800);
  --color-badge-orange-shadow-top: var(--orange-100);
  --color-badge-orange-shadow-bottom: var(--orange-300);

  --color-badge-pink-bg: var(--red-200);
  --color-badge-pink-text: var(--red-800);
  --color-badge-pink-shadow-top: var(--red-100);
  --color-badge-pink-shadow-bottom: var(--red-300);

  --color-badge-gray-bg: var(--grey-200);
  --color-badge-gray-text: var(--grey-600);
  --color-badge-gray-shadow-top: var(--grey-100);
  --color-badge-gray-shadow-bottom: var(--grey-250);

  /* Badge — outline */
  --color-badge-purple-outline-color: var(--purple-600);
  --color-badge-green-outline-color: var(--green-600);
  --color-badge-blue-outline-color: var(--blue-600);
  --color-badge-orange-outline-color: var(--orange-600);
  --color-badge-pink-outline-color: var(--red-600);
  --color-badge-gray-outline-color: var(--grey-600);

  /* Counter badge */
  --color-counter-pink-bg: var(--red-500);
  --color-counter-pink-shadow-top: var(--red-400);
  --color-counter-pink-shadow-bottom: var(--red-700);

  --color-counter-purple-bg: var(--purple-500);
  --color-counter-purple-shadow-top: var(--purple-400);
  --color-counter-purple-shadow-bottom: var(--purple-700);

  --color-counter-blue-bg: var(--blue-500);
  --color-counter-blue-shadow-top: var(--blue-400);
  --color-counter-blue-shadow-bottom: var(--blue-700);

  /* Wizard */
  --color-wizard-active-bg: var(--purple-500);
  --color-wizard-active-text: var(--grey-50);
  --color-wizard-active-shadow-top: var(--purple-400);
  --color-wizard-active-shadow-bottom: var(--purple-700);
  --color-wizard-done-bg: var(--purple-200);
  --color-wizard-done-text: var(--purple-600);
  --color-wizard-upcoming-border: var(--grey-250);
  --color-wizard-upcoming-text: var(--grey-350);
  --color-wizard-connector-done: var(--purple-200);
  --color-wizard-connector-upcoming: var(--grey-250);
}

[data-theme="dark"] {
  /* Primary */
  --color-primary: var(--purple-500);
  --color-primary-hover: var(--purple-400);
  --color-primary-active: var(--purple-300);
  --color-primary-subtle: var(--purple-900);
  --color-primary-muted: var(--purple-600);
  --color-primary-ring: var(--purple-800);
  --color-on-primary: var(--grey-white);

  /* Surfaces */
  --color-surface: var(--grey-750);
  --color-surface-raised: var(--grey-700);
  --color-surface-raised-hover: var(--grey-650);
  --color-surface-raised-active: var(--grey-600);
  --color-surface-overlay: rgba(0, 0, 0, 0.7);
  --color-surface-ghost-hover: rgba(255, 255, 255, 0.05);

  /* Cards */
  --color-card-bg: var(--grey-700);
  --color-card-border: var(--grey-650);
  --color-card-elevated-bg: var(--grey-650);
  --color-card-demoted-bg: var(--grey-750);
  --color-card-demoted-border: var(--grey-600);
  --color-card-outline-border: var(--grey-600);

  /* Text */
  --color-text-default: var(--grey-50);
  --color-text-secondary: var(--grey-200);
  --color-text-muted: var(--grey-350);
  --color-text-disabled: var(--grey-450);

  /* Borders */
  --color-border: var(--grey-600);
  --color-border-strong: var(--grey-550);
  --color-border-subtle: var(--grey-650);

  /* Disabled */
  --color-disabled-bg: var(--grey-600);
  --color-disabled-text: var(--grey-450);
  --color-disabled-border: var(--grey-600);

  /* Success */
  --color-success: var(--green-500);
  --color-success-subtle: var(--green-950);
  --color-success-text: var(--green-400);
  --color-success-badge-bg: var(--green-900);
  --color-success-border: var(--green-800);

  /* Error */
  --color-error: var(--red-600);
  --color-error-subtle: var(--red-950);
  --color-error-text: var(--red-400);
  --color-error-badge-bg: var(--red-900);
  --color-error-border: var(--red-800);

  /* Warning */
  --color-warning: var(--orange-500);
  --color-warning-subtle: var(--orange-950);
  --color-warning-text: var(--orange-400);
  --color-warning-badge-bg: var(--orange-900);
  --color-warning-border: var(--orange-800);

  /* Info */
  --color-info: var(--blue-500);
  --color-info-subtle: var(--blue-950);
  --color-info-text: var(--blue-400);
  --color-info-badge-bg: var(--blue-900);
  --color-info-border: var(--blue-800);

  /* Tooltip */
  --color-tooltip-bg: var(--grey-200);
  --color-tooltip-text: var(--grey-750);

  /* Tabs pill */
  --color-tab-pill-bg: var(--grey-650);
  --color-tab-pill-active-bg: var(--grey-550);

  /* Toggle */
  --color-toggle-bg: var(--grey-650);
  --color-toggle-bg-hover: var(--grey-600);
  --color-toggle-active-bg: var(--purple-900);
  --color-toggle-active-text: var(--purple-300);
  --color-toggle-text: var(--grey-350);

  /* Input (shared by Dropdown, InputGroup, and form inputs) */
  --color-input-bg: var(--grey-700);
  --color-input-border: var(--grey-450);
  --color-input-hover-border: var(--grey-500);
  --color-input-option-hover: var(--grey-650);
  --color-input-option-selected-bg: var(--purple-900);
  --color-input-option-selected-text: var(--purple-300);

  /* Accordion */
  --color-accordion-border: var(--grey-600);
  --color-accordion-header-hover: var(--grey-650);
  --color-accordion-icon: var(--grey-400);

  /* Breadcrumb */
  --color-breadcrumb-text: var(--grey-400);
  --color-breadcrumb-link: var(--grey-350);
  --color-breadcrumb-link-hover: var(--purple-400);
  --color-breadcrumb-current: var(--grey-100);
  --color-breadcrumb-separator: var(--grey-550);

  /* Table */
  --color-table-header-bg: var(--grey-700);
  --color-table-header-text: var(--grey-350);
  --color-table-border: var(--grey-600);
  --color-table-row-hover: var(--grey-650);
  --color-table-stripe: rgba(255, 255, 255, 0.02);

  /* Form Controls (checkbox/radio outer ring) */
  --color-control-border-selector: var(--grey-500);

  /* Button */
  --color-btn-secondary-bg: var(--grey-600);
  --color-btn-ghost-hover-bg: var(--grey-600);
  --color-btn-primary-hover-bg: var(--purple-600);
  --color-btn-ghost-color: var(--purple-400);
  --color-btn-outline-color: var(--purple-400);
  --color-btn-outline-hover-bg: var(--purple-950);

  /* Radio */
  --color-radio-card-hover-border: var(--purple-700);
  --color-radio-card-hover-bg: var(--purple-950);
  --color-radio-card-active-border: var(--purple-600);
  --color-radio-card-active-bg: var(--purple-900);

  /* Calendar */
  --color-cal-selected-bg: var(--purple-500);
  --color-cal-selected-text: var(--grey-white);
  --color-cal-range-bg: var(--purple-950);
  --color-cal-range-text: var(--purple-300);
  --color-cal-hover-bg: var(--purple-950);
  --color-cal-today-text: var(--purple-400);
  --color-cal-cell-hover-bg: var(--grey-650);

  /* Badge — solid */
  --color-badge-purple-bg: var(--purple-900);
  --color-badge-purple-text: var(--purple-100);
  --color-badge-purple-shadow-top: var(--purple-700);
  --color-badge-purple-shadow-bottom: var(--purple-950);

  --color-badge-green-bg: var(--green-900);
  --color-badge-green-text: var(--green-200);
  --color-badge-green-shadow-top: var(--green-700);
  --color-badge-green-shadow-bottom: var(--green-950);

  --color-badge-blue-bg: var(--blue-900);
  --color-badge-blue-text: var(--blue-200);
  --color-badge-blue-shadow-top: var(--blue-700);
  --color-badge-blue-shadow-bottom: var(--blue-950);

  --color-badge-orange-bg: var(--orange-800);
  --color-badge-orange-text: var(--orange-100);
  --color-badge-orange-shadow-top: var(--orange-700);
  --color-badge-orange-shadow-bottom: var(--orange-950);

  --color-badge-pink-bg: var(--red-900);
  --color-badge-pink-text: var(--red-200);
  --color-badge-pink-shadow-top: var(--red-700);
  --color-badge-pink-shadow-bottom: var(--red-950);

  --color-badge-gray-bg: var(--grey-600);
  --color-badge-gray-text: var(--grey-200);
  --color-badge-gray-shadow-top: var(--grey-500);
  --color-badge-gray-shadow-bottom: var(--grey-650);

  /* Badge — outline */
  --color-badge-purple-outline-color: var(--purple-400);
  --color-badge-green-outline-color: var(--green-600);
  --color-badge-blue-outline-color: var(--blue-600);
  --color-badge-orange-outline-color: var(--orange-600);
  --color-badge-pink-outline-color: var(--red-600);
  --color-badge-gray-outline-color: var(--grey-500);

  /* Counter badge */
  --color-counter-pink-bg: var(--red-600);
  --color-counter-pink-shadow-top: var(--red-400);
  --color-counter-pink-shadow-bottom: var(--red-800);

  --color-counter-purple-bg: var(--purple-600);
  --color-counter-purple-shadow-top: var(--purple-400);
  --color-counter-purple-shadow-bottom: var(--purple-800);

  --color-counter-blue-bg: var(--blue-600);
  --color-counter-blue-shadow-top: var(--blue-400);
  --color-counter-blue-shadow-bottom: var(--blue-800);

  /* Wizard */
  --color-wizard-active-bg: var(--purple-600);
  --color-wizard-active-text: var(--grey-white);
  --color-wizard-active-shadow-top: var(--purple-500);
  --color-wizard-active-shadow-bottom: var(--purple-800);
  --color-wizard-done-bg: var(--purple-700);
  --color-wizard-done-text: var(--purple-300);
  --color-wizard-upcoming-border: var(--grey-500);
  --color-wizard-upcoming-text: var(--grey-450);
  --color-wizard-connector-done: var(--purple-700);
  --color-wizard-connector-upcoming: var(--grey-500);
}
```

---

## Token Naming Convention

| Prefix | Category | Examples |
|--------|----------|---------|
| `--color-primary-*` | Brand interaction colors | `primary`, `primary-hover`, `primary-active`, `primary-subtle`, `primary-muted`, `primary-ring` |
| `--color-surface-*` | Background layers | `surface`, `surface-raised`, `surface-raised-hover`, `surface-raised-active`, `surface-overlay`, `surface-ghost-hover` |
| `--color-text-*` | Typography hierarchy | `text-default`, `text-muted`, `text-disabled` |
| `--color-border-*` | Stroke/divider colors | `border`, `border-strong`, `border-subtle` |
| `--color-error-*` | Destructive/validation | `error`, `error-text`, `error-subtle`, `error-border`, `error-badge-bg` |
| `--color-success-*` | Positive feedback | `success`, `success-text`, `success-subtle`, `success-border`, `success-badge-bg` |
| `--color-warning-*` | Cautionary feedback | `warning`, `warning-text`, `warning-subtle`, `warning-border`, `warning-badge-bg` |
| `--color-info-*` | Informational feedback | `info`, `info-text`, `info-subtle`, `info-border`, `info-badge-bg` |
| `--color-input-*` | Shared form input tokens | `input-bg`, `input-border`, `input-hover-border`, `input-option-hover`, `input-option-selected-bg`, `input-option-selected-text` |
| `--color-disabled-*` | Disabled states | `disabled-bg`, `disabled-text`, `disabled-border` |
| `--color-on-*` | Contrast text on fills | `on-primary` |
| `--shadow-*` | Semantic shadow presets | `card`, `dropdown`, `modal`, `btn-inner`, `btn-hover`, `btn-secondary-hover`, `focus-ring` |
| `--z-*` | Z-index scale | `dropdown`, `sticky`, `modal`, `tooltip`, `toast` |
| `--badge-{color}-*` | Badge color sets | `badge-purple-bg`, `badge-green-text`, `badge-blue-dot` |

---

## Rules

1. **Components MUST only use semantic tokens** — never `--purple-600` or `--grey-200` directly
2. **Every new color need must be registered here first** — add the semantic token, map it to a primitive, then use it in the component
3. **Dark theme is automatic** — components written with semantic tokens get dark mode for free via the `[data-theme="dark"]` remapping
4. **Badge colors are the exception** — they use a structured `--badge-{color}-{role}` pattern since badges support multiple color options
5. **Shadows follow the same pattern** — component-level shadow tokens reference foundation shadows where possible

---

## Architectural Decisions

### What Lives Where

| Category | Location | Reason |
|----------|----------|--------|
| **Colors** (primitives) | primitives.md | Raw palette values that never change between themes |
| **Colors** (semantic) | semantics.md | Role-based aliases that remap between light/dark |
| **Spacing** | primitives.md only | Spacing doesn't change between themes |
| **Border Radius** | primitives.md only | Radius doesn't change between themes |
| **Typography** | primitives.md only | Font scales are theme-agnostic |
| **Easing Curves** | primitives.md only | Animation timing is theme-agnostic |
| **Duration** | primitives.md only | Animation duration is theme-agnostic |
| **Z-Index** | semantics.md (semantic aliases) | For documentation; values don't change between themes |
| **Shadows** (primitives) | primitives.md | Raw shadow values |
| **Shadows** (semantic) | semantics.md | Role-based aliases that may change between themes |

### Why Some Tokens Stay in Foundation Only

Tokens that don't change between light and dark themes don't need semantic aliases in semantics.md:

- **Spacing** (`--space-*`): A 16px gap is 16px in both themes
- **Border Radius** (`--radius-*`): A rounded corner is the same shape regardless of theme
- **Typography** (`--font-*`): Font sizes and weights don't change with theme
- **Easing** (`--ease-*`): Animation curves are identical across themes
- **Duration** (`--duration-*`): Timing doesn't depend on color scheme

Components can reference these Foundation tokens directly without violating the architecture — only **color-related** tokens must go through semantics.md's semantic layer.

### Why rgba Values Can't Reference Variables

CSS doesn't support composing a color variable with an opacity variable:

```css
/* ❌ This doesn't work */
--color-primary-ring: rgba(var(--purple-600), var(--opacity-30));

/* ✅ We must use the computed value */
--color-primary-ring: rgba(104, 65, 230, 0.3);
```

To maintain traceability, every rgba value in this file includes a comment documenting which Foundation primitives it derives from. If you change `--purple-600` in Foundation, you must update the corresponding rgba values here.

### Complete Token Dependency Graph

```
primitives.md                    semantics.md                         components.md
─────────────────────            ─────────────────────             ─────────────────────
Color Primitives ─────────────→  Semantic Color Tokens ─────────→  Component Styles
  --purple-600                     --color-primary                   background-color
  --grey-200                       --color-border                    border-color
  --red-500                        --color-error                     color

Shadow Primitives ────────────→  Semantic Shadow Tokens ────────→  Component Styles
  --shadow-md                      --shadow-card                     box-shadow
  --shadow-lg                      --shadow-dropdown

Spacing Tokens ───────────────────────────────────────────────────→  Component Styles
  --space-4                                                          padding, gap

Radius Tokens ────────────────────────────────────────────────────→  Component Styles
  --radius-lg                                                        border-radius

Duration Tokens ──────────────────────────────────────────────────→  Component Styles
  --duration-normal                                                  transition-duration

Easing Tokens ────────────────────────────────────────────────────→  Component Styles
  --ease-out-cubic                                                   transition-timing-function
```

---

## Phase 1 Components — Token & Style Reference

### Card

| Variant | Fill | Stroke | Shadow | Light | Dark |
|---------|------|--------|--------|-------|------|
| `default` | `--color-card-bg` | `--color-card-border` | none | `grey-50` fill, `white` border | `grey-700` fill, `grey-650` border |
| `elevated` | `--color-card-elevated-bg` | none | `--shadow-md` | `white` fill, drop shadow | `grey-650` fill, drop shadow |
| `outline` | transparent | `--color-card-outline-border` | none | `grey-200` border | `grey-600` border |
| `demoted` | `--color-card-demoted-bg` | `--color-card-demoted-border` | none | `grey-150` fill, `grey-200` border | `grey-750` fill, `grey-600` border |

Radius: `--radius-3xl` (`16px`). Padding: `none` / `sm` (`--space-3`) / `md` (`--space-5`) / `lg` (`--space-6`).
Shadow (elevated): `--shadow-card` → `var(--shadow-md)`.

**Sub-components:**

| Sub-component | Spacing | Divider |
|---------------|---------|---------|
| `CardHeader` | gap: `--space-3`, padding-bottom: `--space-4` | bottom border: `--color-border-subtle` |
| `CardContent` | padding: `--space-5` top/bottom | — |
| `CardFooter` | gap: `--space-3`, padding-top: `--space-4` | top border: `--color-border-subtle` |
| `CardInset` | padding: `--space-3` | `--color-card-demoted-bg` fill + `--color-card-demoted-border` stroke |

**Nested radius tokens** (applied automatically by `CardInset` and icon wrapper patterns):

| Token | Value | Role |
|-------|-------|------|
| `--radius-inset-sm` | `var(--radius-sm)` · 4px | Inner rectangular element in `padding="sm"` card |
| `--radius-inset-md` | `var(--radius-sm)` · 4px | Inner rectangular element in `padding="md"` card |
| `--radius-inset-lg` | `var(--radius-sm)` · 4px | Inner rectangular element in `padding="lg"` card |

> **Rule:** Any rectangular element (icon box, image thumbnail, inset panel) placed inside a card must use `--radius-inset-{size}`, not `--radius-3xl`. See `primitives.md → Nested Radius Rule` for the full formula.

### Avatar

| Property | Token | Value |
|----------|-------|-------|
| Fallback bg | `--color-primary-subtle` | `purple-100` |
| Fallback text | `--color-primary` | `purple-600` |
| Shape (circle) | `--radius-full` | `9999px` |
| Shape (square) | `--radius-lg` | `8px` |

Sizes: `xs` (24px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (64px)

### Separator

| Property | Token | Value |
|----------|-------|-------|
| Line color | `--color-border-subtle` | `grey-200` |
| Label text | `--color-text-muted` | `grey-450` |
| Label size | `--font-caption-size` | `12px` |

Orientations: `horizontal`, `vertical`. Optional label with centered text.

### Label

| Property | Token | Value |
|----------|-------|-------|
| Color | `--color-text-default` | `grey-800` |
| Disabled | `--color-text-disabled` | `grey-300` |
| Required marker | `--color-error` | `red-600` |
| Size sm | `--font-caption-size` | `12px` |
| Size md | `--font-body-sm-size` | `14px` |

### Skeleton

| Property | Token | Value |
|----------|-------|-------|
| Background | `--color-disabled-bg` | `grey-150` |
| Wave highlight | `--color-surface` | `grey-100` |

Variants: `text`, `circular`, `rectangular`, `rounded`
Animations: `pulse`, `wave`, `none`

### Switch

| Property | Token / CSS | Light | Dark |
|----------|-------------|-------|------|
| Track (off) | `--color-btn-disabled-bg` | `grey-100` | `grey-600` |
| Track (on) | `--color-primary` | `purple-600` | `purple-600` |
| Track (on) shadow | `inset 0px 1px 2px 1px` | `rgba(255,255,255,0.28)` | `rgba(255,255,255,0.15)` |
| Track disabled (off) | `--grey-300` | `grey-300` | `grey-500` |
| Track disabled (on) | `--color-primary` + `opacity: 0.5` | — | — |
| Thumb | `--grey-white` | `#FFFFFF` | `#FFFFFF` |
| Thumb shadow | `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | same |
| Focus ring | `--color-primary-ring` | `purple-200` | `purple-200` |
| Label | `--font-body-sm-size` | `14px` | `14px` |
| Label disabled | `--color-text-muted` | `grey-450` | `grey-450` |
| Animation | `ease-in-out-cubic` | `200ms` | `200ms` |

Sizes: `sm` (36×20px), `md` (44×24px)

> **Rule**: Active switch uses the same inset shadow as the primary button. Disabled switch removes opacity-based dimming in favor of explicit semantic fills — `--color-btn-disabled-bg` for off track, `--grey-300` for disabled off, `opacity: 0.5` on the primary fill for disabled on. Thumb is always `--grey-white` (pure white circle).

### Textarea

Follows the same visual language as TextInput — same border, focus, hover, error, disabled states.

| Property | Token | Light | Dark |
|----------|-------|-------|------|
| Border | `--color-input-border` | `grey-250` | `grey-450` |
| Background | `--color-surface` | `grey-white` | `--color-surface-raised` |
| Radius | `--radius-3xl` | `16px` | `16px` |
| Hover border | `--color-border` | `grey-300` | `--color-input-hover-border` |
| Focus border | `--color-primary` | `purple-600` | `purple-600` |
| Focus ring | `0 0 0 1px var(--color-primary)` | purple-600 | purple-600 |
| Error border | `--color-error` | `red-600` | `red-600` |
| Error animation | `shake 300ms ease-out` | — | — |
| Success border | `--color-border` | `grey-300` (subtle) | `grey-300` |
| Disabled bg | `--color-surface-raised` | `grey-100` | `--color-disabled-bg` |
| Disabled border | `--color-border-subtle` | `grey-200` | `--color-disabled-border` |
| Error text | `--color-error-text` | `red-700` | `red-700` |
| Helper text | `--color-text-muted` | `grey-450` | `grey-450` |
| Label focus color | `--color-primary` | `purple-600` | `purple-600` |
| Label error color | `--color-error` | `red-600` | `red-600` |

#### Textarea sizing rules

- **Resize is disabled** (`resize: none`). Content scrolls vertically when it overflows.
- **Minimum height**: 3 lines of body text — `calc(3 * var(--font-body-md-line) + 2 * var(--space-3))` (~96px).
- Same 3-line minimum height guideline applies to **TextInput** (multiline) when applicable.
- Custom scrollbar (4px, brand purple thumb) is inherited from global styles.

### Typography

Font family: **Euclid Circular B** (Light 300, Regular 400, Medium 500, Semibold 600, Bold 700)

#### Full Type Scale

| Category | Variant | Size | Line Height | Tracking | Weight | Tag | Use Case |
|----------|---------|------|-------------|----------|--------|-----|----------|
| **Display** | `display-xl` | 72px | 80px | -2px | Bold 700 | `h1` | Marketing hero headlines |
| | `display-lg` | 56px | 64px | -1.5px | Bold 700 | `h1` | Secondary marketing headlines |
| | `display-md` | 48px | 56px | -1px | Bold 700 | `h1` | Section hero text, feature pages |
| | `display-sm` | 40px | 48px | -0.5px | Semibold 600 | `h2` | Feature headlines, hero subtext |
| **Heading** | `heading-xl` | 32px | 40px | -0.5px | Semibold 600 | `h1` | Page titles, dashboard headers |
| | `heading-lg` | 24px | 32px | -0.3px | Semibold 600 | `h2` | Section headings, modal titles |
| | `heading-md` | 20px | 28px | -0.2px | Semibold 600 | `h3` | Card titles, subsection headings |
| | `heading-sm` | 18px | 24px | 0 | Semibold 600 | `h4` | Minor headings, sidebar sections |
| **Body** | `body-lg` | 18px | 28px | 0 | Regular 400 | `p` | Lead paragraphs, prominent body text |
| | `body-md` | 16px | 24px | 0 | Regular 400 | `p` | Default body text, form descriptions |
| | `body-sm` | 14px | 20px | 0 | Regular 400 | `p` | Secondary content, table cells, compact text |
| **Label** | `label-lg` | 14px | 20px | 0.1px | Medium 500 | `label` | Form labels, input labels |
| | `label-md` | 12px | 16px | 0.2px | Medium 500 | `label` | Compact labels, metadata |
| | `label-sm` | 11px | 14px | 0.3px | Medium 500 | `label` | Calendar weekdays, group headings |
| **Utility** | `caption` | 12px | 16px | 0 | Regular 400 | `span` | Helper text, timestamps, descriptions |
| | `overline` | 11px | 16px | 0.5px | Semibold 600 | `span` | Category labels, section overlines (UPPERCASE) |

#### Color Props

`default`, `strong`, `muted`, `disabled`, `primary`, `error`, `success`

#### Design Rules

**Minimum sizes:**
- Body text: never below **14px** (accessibility minimum for readable paragraphs)
- UI labels: **11px** minimum (only for secondary/utility text like captions)
- Interactive elements (buttons, inputs): **12px** minimum

**Line-height ratios:**
- Display (large text): ~1.1–1.14x — tight for visual impact
- Headings: ~1.25–1.33x — balanced readability
- Body: ~1.43–1.56x — comfortable reading rhythm
- Labels/Captions: ~1.27–1.33x — compact but legible

**Letter-spacing rules:**
- Display/Heading (≥20px): **negative tracking** (-0.2 to -2px) — large text looks better tighter
- Body (14–18px): **0** — neutral, let the font's natural spacing breathe
- Labels/Overlines (≤14px): **positive tracking** (0.1–0.5px) — small text needs extra spacing for legibility

**Weight usage:**
| Weight | Name | Use |
|--------|------|-----|
| 300 | Light | Decorative/display only — never for body or UI |
| 400 | Regular | Body text, captions, descriptions |
| 500 | Medium | Labels, form labels, metadata |
| 600 | Semibold | Headings, buttons, emphasis |
| 700 | Bold | Display headlines, strong emphasis |

### Progress

| Property | Token | Value |
|----------|-------|-------|
| Track | `--color-border-subtle` | `grey-200` |
| Bar (primary) | `--color-primary` | `purple-600` |
| Bar (success) | `--color-success` | `green-600` |
| Bar (error) | `--color-error` | `red-600` |
| Label text | `--color-text-muted` | `grey-450` |
| Radius | `--radius-full` | `9999px` |

Sizes: `sm` (4px), `md` (8px), `lg` (12px)

### Tooltip

| Property | Token | Value |
|----------|-------|-------|
| Background | `--color-text-default` | `grey-800` |
| Text color | `--color-surface` | `grey-100` |
| Font size | `--font-caption-size` | `12px` |
| Radius | `--radius-md` | `6px` |
| Z-index | `--z-tooltip` | `300` |

Sides: `top`, `bottom`, `left`, `right`. Default delay: 300ms.

### Alert

#### Light Theme

| Variant | Fill | Border | Heading/Icon | Body text |
|---------|------|--------|-------------|-----------|
| `error` | `red-100` | `red-200` | `red-700` | `grey-550` |
| `warning` | `orange-50` | `orange-100` | `orange-700` | `grey-550` |
| `success` | `green-100` | `green-200` | `green-700` | `grey-550` |
| `info` | `purple-100` | `purple-200` | `purple-700` | `grey-550` |

#### Dark Theme

| Variant | Fill | Border | Heading/Icon | Body text |
|---------|------|--------|-------------|-----------|
| `error` | `red-950` | `red-800` | `red-400` | `grey-100` |
| `warning` | `orange-950` | `orange-800` | `orange-400` | `grey-100` |
| `success` | `green-950` | `green-800` | `green-400` | `grey-100` |
| `info` | `purple-950` | `purple-800` | `purple-400` | `grey-100` |

#### Alert Tokens

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-error-subtle` | Error fill | `red-100` | `red-950` |
| `--color-error-border` | Error border | `red-200` | `red-800` |
| `--color-error-text` | Error heading/icon | `red-700` | `red-400` |
| `--color-warning-subtle` | Warning fill | `orange-50` | `orange-950` |
| `--color-warning-border` | Warning border | `orange-100` | `orange-800` |
| `--color-warning-text` | Warning heading/icon | `orange-700` | `orange-400` |
| `--color-success-subtle` | Success fill | `green-100` | `green-950` |
| `--color-success-border` | Success border | `green-200` | `green-800` |
| `--color-success-text` | Success heading/icon | `green-700` | `green-400` |
| `--color-info-subtle` | Info fill | `purple-100` | `purple-950` |
| `--color-info-border` | Info border | `purple-200` | `purple-800` |
| `--color-info-text` | Info heading/icon | `purple-700` | `purple-400` |
| `--color-alert-body` | Body/sub text | `grey-550` | `grey-100` |

> **Note:** Info variant uses **purple** (brand color), not blue. Icons follow the same color as heading text.

Default icons: `Info`, `CheckCircle`, `AlertTriangle`, `XCircle` (lucide-react).
Radius: `--radius-3xl`. Padding: `--space-2`. Height: `fit-content`.

### Tabs

| Variant | Active Indicator | Active Color | Inactive |
|---------|-----------------|-------------|----------|
| `underline` | Sliding 2px bottom bar | `--color-primary` | `--color-text-muted` |
| `pill` | Sliding pill bg + shadow | `--color-text-default` | `--color-text-muted` |
| `enclosed` | Card bg + top border | `--color-text-default` | `--color-text-muted` |

Pill track bg: `--color-tab-pill-bg`. Pill container: `width: fit-content`, `padding: 4px`, `border-radius: --radius-full`.
Pill tab buttons: `padding: 4px 16px` (min 4px vertical).
Sizes: `sm`, `md`. Arrow key navigation.

#### Sliding Indicator Animation

Both `underline` and `pill` variants use a **sliding indicator** that smoothly transitions between tabs:
- Duration: `300ms`, easing: `--ease-in-out-cubic`
- Indicator position and width are computed from the active tab's DOM rect
- `ResizeObserver` updates indicator on layout changes
- The indicator element is separate from the tab buttons (positioned absolutely)
- For underline: 2px-high bar at the bottom with `border-radius: 1px`
- For pill: full-height background pill with `--shadow-sm` and `--radius-full`

All tab variants use `ease-in-out-cubic` for color/background transitions (250ms).

### Inverted Context

When placing components on a dark background in light theme, apply `data-context="inverted"` to remap semantic tokens.

| Token | Normal | Inverted |
|-------|--------|----------|
| `--color-text-default` | `grey-700` | `grey-white` |
| `--color-text-secondary` | `grey-550` | `grey-200` |
| `--color-text-muted` | `grey-450` | `grey-300` |
| `--color-surface` | `grey-white` | `grey-700` |
| `--color-surface-raised` | `grey-100` | `grey-600` |
| `--color-border` | `grey-250` | `grey-500` |
| `--color-input-border` | `grey-250` | `grey-500` |
| `--color-alert-body` | `grey-550` | `grey-100` |

Use `Button variant="inverted"` for CTAs on dark backgrounds. Typography and form inputs auto-adapt via the token remap.

### Field

| Property | Token | Value |
|----------|-------|-------|
| Label | `--color-text-strong` | `grey-800` |
| Required marker | `--color-error` | `red-600` |
| Disabled label | `--color-text-disabled` | `grey-300` |
| Helper text | `--color-text-muted` | `grey-450` |
| Error text | `--color-error-text` | `red-700` |
| Gap | `--space-2` | `8px` |

Wraps any form control (TextInput, Textarea, Dropdown, etc.) with label + helper/error.

---

## Phase 2 Components — Token & Style Reference

### Toggle / ToggleGroup

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-toggle-bg` | Default background | `var(--grey-150)` | `var(--grey-650)` |
| `--color-toggle-bg-hover` | Hover background | `var(--grey-200)` | `var(--grey-600)` |
| `--color-toggle-active-bg` | Pressed/active background | `var(--purple-100)` | `var(--purple-900)` |
| `--color-toggle-active-text` | Pressed/active text | `var(--purple-700)` | `var(--purple-300)` |
| `--color-toggle-text` | Default text color | `var(--grey-450)` | `var(--grey-350)` |

Variants: `default` (filled bg), `outline` (1px border, transparent bg).
Sizes: `sm` (32px), `md` (40px), `lg` (48px). Border-radius: `--radius-lg`.
ToggleGroup supports `single` and `multiple` selection via React Context.
ARIA: `aria-pressed` on each toggle, `role="group"` on group wrapper.

### Dropdown

The single canonical select/dropdown component. Follows TextInput visual language for the trigger. Consolidates the former `Select` primitive.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-input-border` | Trigger default border | `var(--color-border-subtle)` | `var(--grey-450)` |
| `--color-border` | Trigger hover / filled border | `var(--grey-300)` | `var(--grey-300)` |
| `--color-input-bg` | Trigger and menu background | `var(--grey-white)` | `var(--grey-700)` |
| `--color-primary` | Open/focus border + ring | `var(--purple-600)` | `var(--purple-500)` |
| `--color-error` | Error state border + ring | `var(--red-600)` | `var(--red-600)` |
| `--grey-100` | Option hover bg (light) | `grey-100` | — |
| `--grey-600` | Option hover bg (dark) | — | `grey-600` |
| `--color-primary-hover` | Selected option text | `var(--purple-700)` | `var(--purple-300)` |
| `--color-text-muted` | Placeholder, group headers, chevron, disabled label | — | — |
| `--color-text-strong` | Selected value text | — | — |
| `--color-text-disabled` | Disabled text and chevron | — | — |

#### Trigger states

| State | Border | Ring | Label color |
|-------|--------|------|-------------|
| Default | `--color-input-border` | — | `--color-text-default` |
| Hover | `--color-border` | — | `--color-text-default` |
| Open / Focus | `--color-primary` | `0 0 0 1px var(--color-primary)` | `--color-primary` |
| Filled (closed) | `--color-border` | — | `--color-text-default` |
| Error | `--color-error` | — | `--color-error` |
| Error + Open | `--color-error` | `0 0 0 1px var(--color-error)` | `--color-error` |
| Disabled | `--color-border-subtle` | — | `--color-text-muted` |

Variants: `single`, `multi` (tag chips with × remove), `searchable` (inline search input), `grouped` (category headers).
Sizes: `sm` (40px), `md` (48px), `lg` (56px). Menu: `max-height 280px`, shadow `--shadow-lg`, radius `--radius-3xl`.
Trigger radius: `--radius-full` (pill). Option radius: `--radius-lg`.
ChevronDown rotates 180° when open. Mouse hover syncs with keyboard focus index.
Selected item shows an animated tick (`tickPop` keyframe: scale 0.3→1.15→1, 250ms ease-out).
Searchable variant auto-focuses the search input when the menu opens.
ARIA: `role="combobox"` on trigger, `role="listbox"` on menu, `role="option"` on each item, `aria-multiselectable` for multi variant.

### Accordion

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-accordion-border` | Outer border + item separators | `var(--grey-200)` | `var(--grey-600)` |
| `--color-accordion-header-hover` | Trigger hover bg | `var(--grey-50)` | `var(--grey-650)` |
| `--color-accordion-icon` | Chevron icon color | `var(--grey-400)` | `var(--grey-400)` |

Types: `single` (one open, optional `collapsible`), `multiple` (all expandable).
Content animation: `max-height` transition 300ms cubic-bezier(0.4, 0, 0.2, 1).
Chevron rotates 180° when open. Border-radius: `--radius-lg`. Overflow hidden.
ARIA: `aria-expanded`, `aria-controls` on trigger; `role="region"`, `aria-labelledby` on content.

### Breadcrumb

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-breadcrumb-text` | Ellipsis/general text | `var(--grey-400)` | `var(--grey-400)` |
| `--color-breadcrumb-link` | Link text | `var(--grey-500)` | `var(--grey-350)` |
| `--color-breadcrumb-link-hover` | Link hover color | `var(--purple-600)` | `var(--purple-400)` |
| `--color-breadcrumb-current` | Current page text | `var(--grey-700)` | `var(--grey-100)` |
| `--color-breadcrumb-separator` | Separator icon color | `var(--grey-300)` | `var(--grey-550)` |

Default separator: ChevronRight (14px). Font size: `--font-size-sm`.
`maxItems` support: collapses middle items with "…" ellipsis button.
ARIA: `nav` with `aria-label="Breadcrumb"`, last item gets `aria-current="page"`.

### Table

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-table-header-bg` | Header row background | `var(--grey-100)` | `var(--grey-700)` |
| `--color-table-header-text` | Header text | `var(--grey-500)` | `var(--grey-350)` |
| `--color-table-border` | All table borders | `var(--grey-200)` | `var(--grey-600)` |
| `--color-table-row-hover` | Hoverable row hover bg | `var(--grey-50)` | `var(--grey-650)` |
| `--color-table-stripe` | Alternate row stripe | `var(--grey-50)` | `rgba(255, 255, 255, 0.02)` |

Composable: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`.
Props: `striped` (alternating row colors), `hoverable` (row hover effect).
Header text: uppercase, letter-spacing 0.05em, font-weight medium. Border-radius: `--radius-lg`.

### ScrollArea / Global Scrollbar

| Property | Token | Value |
|----------|-------|-------|
| Scrollbar width | — | 4px (max) |
| Thumb color | `--color-primary-muted` | Purple-400 / purple-600 (dark) |
| Thumb hover | `--color-primary` | Purple-600 / purple-500 (dark) |
| Thumb radius | `--radius-full` | 9999px (pill) |
| Track | — | transparent |

Global scrollbar styling applied via `globals.css` to all elements. Uses `scrollbar-width: thin` for Firefox and `::-webkit-scrollbar` for Chrome/Safari. Max width/height: 4px.
Props (ScrollArea): `maxHeight`, `maxWidth` for constraining the scroll area. Smooth scrolling enabled.

### InputGroup

| Property | Token | Value |
|----------|-------|-------|
| Background | `--color-input-bg` | White / grey-700 |
| Border | `--color-input-border` | Grey neutral |
| Focus border | `--color-primary` | Purple brand |
| Focus ring | `--color-primary-ring` | Purple ring |
| Error border | `--color-error` | Red |
| Prefix/suffix text | `--color-text-muted` | Muted grey |
| Prefix/suffix divider | `--color-input-border` | Grey neutral |

Sizes: `sm` (36px), `md` (44px), `lg` (52px). Prefix/suffix slots with divider borders.
Child `<input>` automatically styled: no border, transparent bg, full width.
Focus-within applies primary border + ring. Error state applies red border.
Disabled: opacity 0.5, pointer-events none.
