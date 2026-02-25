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
| `--color-primary-hover` | Primary hover / selected text | `var(--purple-700)` | `var(--purple-600)` |
| `--color-primary-muted` | Soft primary border (hover hints) | `var(--purple-400)` | `var(--purple-300)` |
| `--color-primary-subtle` | Tinted backgrounds (hover/selected fills) | `var(--purple-50)` | `rgba(122, 98, 240, 0.1)` |
| `--color-primary-ring` | Focus ring around interactive elements | `rgba(104, 65, 230, 0.3)` | `rgba(122, 98, 240, 0.35)` |
| `--color-on-primary` | Text/icon on primary-colored backgrounds | `var(--grey-50)` | `var(--grey-white)` |

> **Note on rgba derivations:**
> - `rgba(104, 65, 230, 0.3)` = `--purple-600` (#6841E6) + `--opacity-30`
> - `rgba(122, 98, 240, 0.1)` = `--purple-500` (#7A62F0) + `--opacity-10`
> - `rgba(122, 98, 240, 0.35)` = `--purple-500` (#7A62F0) + `--opacity-35`

```css
:root {
  --color-primary: var(--purple-600);
  --color-primary-hover: var(--purple-700);
  --color-primary-muted: var(--purple-400);
  --color-primary-subtle: var(--purple-50);
  --color-primary-ring: rgba(104, 65, 230, 0.3);
  --color-on-primary: var(--grey-50);
}

[data-theme="dark"] {
  --color-primary: var(--purple-500);
  --color-primary-hover: var(--purple-600);
  --color-primary-muted: var(--purple-300);
  --color-primary-subtle: rgba(122, 98, 240, 0.1);
  --color-primary-ring: rgba(122, 98, 240, 0.35);
  --color-on-primary: var(--grey-white);
}
```

---

## Surfaces

Background layers that establish visual depth hierarchy.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-surface` | Base page background | `var(--grey-100)` | `var(--grey-750)` |
| `--color-surface-raised` | Elevated surface (cards, inputs on dark) | `var(--grey-50)` | `var(--grey-650)` |
| `--color-surface-raised-hover` | Hovered raised surface | `var(--grey-100)` | `var(--grey-600)` |
| `--color-surface-overlay` | Backdrop overlays, subtle fills | `var(--grey-100)` | `var(--grey-600)` |
| `--color-surface-sunken` | Recessed areas, wells | `var(--grey-100)` | `var(--grey-750)` |
| `--color-surface-ghost-hover` | Ghost/outline hover on dark theme | `rgba(0, 0, 0, 0.03)` | `rgba(255, 255, 255, 0.05)` |

> **Note on rgba derivations:**
> - `rgba(0, 0, 0, 0.03)` = `--grey-black` (#000000) + ~3% opacity
> - `rgba(255, 255, 255, 0.05)` = `--grey-white` (#FFFFFF) + ~5% opacity

```css
:root {
  --color-surface: var(--grey-100);
  --color-surface-raised: var(--grey-50);
  --color-surface-raised-hover: var(--grey-100);
  --color-surface-overlay: var(--grey-100);
  --color-surface-sunken: var(--grey-100);
  /* Derived from: --grey-black + ~3% opacity */
  --color-surface-ghost-hover: rgba(0, 0, 0, 0.03);
}

[data-theme="dark"] {
  --color-surface: var(--grey-750);
  --color-surface-raised: var(--grey-700);
  --color-surface-raised-hover: var(--grey-650);
  --color-surface-overlay: var(--grey-600);
  --color-surface-sunken: var(--grey-750);
  /* Derived from: --grey-white + ~5% opacity */
  --color-surface-ghost-hover: rgba(255, 255, 255, 0.05);
}
```

---

## Text

Typographic hierarchy from strongest (headings) to weakest (disabled placeholders).

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-text-strong` | Headings, high-emphasis body | `var(--grey-650)` | `var(--grey-white)` |
| `--color-text-default` | Standard body text, labels | `var(--grey-500)` | `var(--grey-100)` |
| `--color-text-secondary` | Secondary/supporting text | `var(--grey-400)` | `var(--grey-250)` |
| `--color-text-muted` | Placeholders, helper text, icons | `var(--grey-350)` | `var(--grey-350)` |
| `--color-text-disabled` | Disabled text, faded placeholders | `var(--grey-300)` | `var(--grey-450)` |
| `--color-text-on-color` | Text on any solid color fill (primary, error, success) | `var(--grey-white)` | `var(--grey-white)` |

```css
:root {
  --color-text-strong: var(--grey-650);
  --color-text-default: var(--grey-500);
  --color-text-secondary: var(--grey-400);
  --color-text-muted: var(--grey-350);
  --color-text-disabled: var(--grey-300);
  --color-text-on-color: var(--grey-white);
}

[data-theme="dark"] {
  --color-text-strong: var(--grey-white);
  --color-text-default: var(--grey-100);
  --color-text-secondary: var(--grey-250);
  --color-text-muted: var(--grey-350);
  --color-text-disabled: var(--grey-450);
  --color-text-on-color: var(--grey-white);
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

### Unused Tokens (defined but not referenced)

These tokens exist in `tokens.css` but have no current component consumer:

| Token Group | Properties | Intended Use |
|-------------|-----------|-------------|
| `--font-display-xl` | `72px / 80px / -2px / 700` | Marketing hero headlines |
| `--font-display-lg` | `56px / 64px / -1.5px / 700` | Secondary marketing headlines |
| `--font-display-md` | `48px / 56px / -1px / 700` | Section hero text |
| `--font-display-sm` | `40px / 48px / -0.5px / 600` | Feature headlines |
| `--font-heading-xl` | `32px / 40px / -0.5px / 600` | Page titles |
| `--font-heading-lg` | `24px / 32px / -0.3px / 600` | Section headings |
| `--font-heading-md` | `20px / 28px / -0.2px / 600` | Card titles, subsection headings |
| `--font-heading-sm` | `18px / 24px / 0 / 600` | Minor headings |
| `--font-label-md` | `12px / 16px / 0.2px / 500` | Compact labels |
| `--font-overline` | `11px / 16px / 0.5px / 600` | Category labels, section overlines |

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
| `--color-border` | Default input/container border | `var(--grey-200)` | `var(--grey-550)` |
| `--color-border-strong` | Hovered/filled input border | `var(--grey-300)` | `var(--grey-450)` |
| `--color-border-subtle` | Faint borders, disabled state, dividers | `var(--grey-150)` | `var(--grey-600)` |

```css
:root {
  --color-border: var(--grey-200);
  --color-border-strong: var(--grey-300);
  --color-border-subtle: var(--grey-150);
}

[data-theme="dark"] {
  --color-border: var(--grey-550);
  --color-border-strong: var(--grey-450);
  --color-border-subtle: var(--grey-600);
}
```

---

## Feedback — Error

Destructive actions, validation failures, and error states.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-error` | Error border and label text on inputs/triggers | `var(--red-600)` | `var(--red-600)` |
| `--color-error-text` | Error message text below inputs | `var(--red-600)` | `var(--red-600)` |
| `--color-error-strong` | Danger button border/text | `var(--red-600)` | `var(--red-500)` |
| `--color-error-subtle` | Danger hover background | `var(--red-50)` | `rgba(239, 68, 68, 0.1)` |
| `--color-error-shadow` | Danger hover shadow tint | `rgba(239, 68, 68, 0.08)` | `rgba(239, 68, 68, 0.1)` |

> **Note on rgba derivations:**
> - `rgba(239, 68, 68, 0.08)` = `--red-500` (#EF4444) + `--opacity-8`
> - `rgba(239, 68, 68, 0.1)` = `--red-500` (#EF4444) + `--opacity-10`

```css
:root {
  --color-error: var(--red-600);
  --color-error-text: var(--red-600);
  --color-error-strong: var(--red-700);
  --color-error-subtle: var(--red-50);
  /* Derived from: --red-600 + --opacity-8 */
  --color-error-shadow: rgba(220, 38, 38, 0.08);
}

[data-theme="dark"] {
  --color-error: var(--red-600);
  --color-error-text: var(--red-600);
  --color-error-strong: var(--red-600);
  --color-error-subtle: rgba(239, 68, 68, 0.1);
  --color-error-shadow: rgba(239, 68, 68, 0.1);
}
```

---

## Feedback — Success

Validation success, completed steps.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-success` | Success fill (wizard completed, icons) | `var(--green-500)` | `var(--green-400)` |
| `--color-success-text` | Success label text | `var(--green-700)` | `var(--green-400)` |
| `--color-success-strong` | Success button/border emphasis | `var(--green-600)` | `var(--green-500)` |
| `--color-success-subtle` | Success tinted background | `var(--green-50)` | `rgba(34, 197, 94, 0.1)` |

> **Note:** `rgba(34, 197, 94, 0.1)` is derived from `--green-500` (#22C55E) + `--opacity-10`

```css
:root {
  --color-success: var(--green-500);
  --color-success-text: var(--green-700);
  --color-success-strong: var(--green-600);
  --color-success-subtle: var(--green-50);
}

[data-theme="dark"] {
  --color-success: var(--green-400);
  --color-success-text: var(--green-400);
  --color-success-strong: var(--green-500);
  /* Derived from: --green-500 + --opacity-10 */
  --color-success-subtle: rgba(34, 197, 94, 0.1);
}
```

---

## Feedback — Warning

Cautionary states, alerts.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-warning` | Warning indicators | `var(--yellow-500)` | `var(--yellow-400)` |
| `--color-warning-text` | Warning label text | `var(--yellow-700)` | `var(--yellow-400)` |
| `--color-warning-strong` | Warning button/border emphasis | `var(--yellow-600)` | `var(--yellow-500)` |
| `--color-warning-subtle` | Warning tinted background | `var(--yellow-50)` | `rgba(234, 179, 8, 0.1)` |

> **Note:** `rgba(234, 179, 8, 0.1)` is derived from `--yellow-500` (#EAB308) + `--opacity-10`

```css
:root {
  --color-warning: var(--yellow-500);
  --color-warning-text: var(--yellow-700);
  --color-warning-strong: var(--yellow-600);
  --color-warning-subtle: var(--yellow-50);
}

[data-theme="dark"] {
  --color-warning: var(--yellow-400);
  --color-warning-text: var(--yellow-400);
  --color-warning-strong: var(--yellow-500);
  /* Derived from: --yellow-500 + --opacity-10 */
  --color-warning-subtle: rgba(234, 179, 8, 0.1);
}
```

---

## Feedback — Info

Informational states, neutral alerts, links.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-info` | Info indicators, links | `var(--blue-500)` | `var(--blue-400)` |
| `--color-info-text` | Info label text | `var(--blue-700)` | `var(--blue-400)` |
| `--color-info-strong` | Info button/border emphasis | `var(--blue-600)` | `var(--blue-500)` |
| `--color-info-subtle` | Info tinted background | `var(--blue-50)` | `rgba(59, 130, 246, 0.1)` |

> **Note:** `rgba(59, 130, 246, 0.1)` is derived from `--blue-500` (#3B82F6) + `--opacity-10`

```css
:root {
  --color-info: var(--blue-500);
  --color-info-text: var(--blue-700);
  --color-info-strong: var(--blue-600);
  --color-info-subtle: var(--blue-50);
}

[data-theme="dark"] {
  --color-info: var(--blue-400);
  --color-info-text: var(--blue-400);
  --color-info-strong: var(--blue-500);
  /* Derived from: --blue-500 + --opacity-10 */
  --color-info-subtle: rgba(59, 130, 246, 0.1);
}
```

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
| `--color-card-bg` | Card resting fill | `var(--grey-50)` | `var(--grey-700)` |
| `--color-card-border` | Card resting border (highlight edge) | `var(--grey-white)` | `var(--grey-650)` |

> **Design intent:** On a `--color-surface` (grey-100) page, cards use grey-50 fill with a white border — the border is *lighter* than the fill, creating a floating highlight edge rather than a traditional stroke.

---

## Form Controls

Shared tokens for checkbox and radio button borders.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-control-border` | Default radio/checkbox border | `var(--grey-250)` | `var(--grey-450)` |

---

## Component — Button

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-btn-secondary-bg` | Secondary button fill | `var(--grey-150)` | `var(--grey-600)` |
| `--color-btn-ghost-hover-bg` | Ghost button hover fill | `var(--grey-150)` | `var(--grey-600)` |
| `--color-btn-ghost-color` | Ghost button text color | `var(--purple-600)` | `var(--purple-400)` |
| `--color-btn-primary-hover-bg` | Primary button hover fill (dark only) | — | `var(--purple-600)` |

---

## Component — Radio

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-radio-card-hover-border` | Card radio hover border | `var(--purple-200)` | `var(--purple-700)` |
| `--color-radio-card-hover-bg` | Card radio hover fill | `var(--purple-50)` | `var(--purple-950)` |
| `--color-radio-card-active-border` | Card radio selected border | `var(--purple-300)` | `var(--purple-600)` |
| `--color-radio-card-active-bg` | Card radio selected fill | `var(--purple-100)` | `var(--purple-900)` |

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
| `--color-wizard-done-bg` | Completed step circle fill | `var(--purple-300)` | `var(--purple-800)` |
| `--color-wizard-done-text` | Completed step circle icon | `var(--purple-700)` | `var(--purple-300)` |
| `--color-wizard-upcoming-border` | Upcoming step circle border | `var(--grey-250)` | `var(--grey-500)` |
| `--color-wizard-upcoming-text` | Upcoming step text/number | `var(--grey-350)` | `var(--grey-450)` |
| `--color-wizard-connector-done` | Completed connector line | `var(--purple-300)` | `var(--purple-800)` |
| `--color-wizard-connector-upcoming` | Upcoming connector line | `var(--grey-250)` | `var(--grey-500)` |

Active step uses the same dual inset shadow as badges/counters:

```css
box-shadow:
  inset 0 -1px 2px 0 var(--color-wizard-active-shadow-bottom),
  inset 0 1px 1px 0 var(--color-wizard-active-shadow-top);
```

---

## Badge Colors

Multi-color badge system. Each badge color maps to four tokens — `bg`, `text`, `shadow-top`, `shadow-bottom` — enabling a subtle convex inner shadow effect.

### Inner Shadow Spec (from Figma)

All solid and dot badges use a dual inner shadow:

```css
box-shadow:
  inset 0 -1px 2px 0 var(--shadow-top),    /* darker tone, Y:-1, blur:2 */
  inset 0 1px 1px 0 var(--shadow-bottom);   /* lighter tone, Y:1, blur:1 */
```

### Light Theme

| Color | `bg` | `text` | `shadow-top` | `shadow-bottom` |
|-------|------|--------|-------------|----------------|
| `purple` | `purple-200` | `purple-800` | `purple-300` | `purple-100` |
| `green` | `green-200` | `green-800` | `green-300` | `green-100` |
| `blue` | `blue-200` | `blue-800` | `blue-300` | `blue-100` |
| `orange` | `orange-200` | `orange-800` | `orange-300` | `orange-100` |
| `pink` | `red-200` | `red-800` | `red-300` | `red-100` |
| `gray` | `grey-200` | `grey-600` | `grey-250` | `grey-100` |

### Dark Theme

| Color | `bg` | `text` | `shadow-top` | `shadow-bottom` |
|-------|------|--------|-------------|----------------|
| `purple` | `purple-900` | `purple-200` | `purple-800` | `purple-950` |
| `green` | `green-900` | `green-200` | `green-800` | `green-950` |
| `blue` | `blue-900` | `blue-200` | `blue-800` | `blue-950` |
| `orange` | `orange-900` | `orange-200` | `orange-800` | `orange-950` |
| `pink` | `red-900` | `red-200` | `red-800` | `red-950` |
| `gray` | `grey-600` | `grey-200` | `grey-550` | `grey-650` |

### Counter Badges

Saturated pill counters with the same dual inner shadow. Uses mid-tone 500/600 as base.

| Color | Light `bg` / `shadow-top` / `shadow-bottom` | Dark `bg` / `shadow-top` / `shadow-bottom` |
|-------|---------------------------------------------|---------------------------------------------|
| `pink` | `red-500` / `red-400` / `red-700` | `red-600` / `red-500` / `red-800` |
| `purple` | `purple-500` / `purple-400` / `purple-700` | `purple-600` / `purple-500` / `purple-800` |
| `blue` | `blue-500` / `blue-400` / `blue-700` | `blue-600` / `blue-500` / `blue-800` |

---

## Complete Combined Output

All semantic tokens in one block for implementation.

```css
:root {
  /* Brand / Primary */
  --color-primary: var(--purple-600);
  --color-primary-hover: var(--purple-700);
  --color-primary-muted: var(--purple-400);
  --color-primary-subtle: var(--purple-50);
  --color-primary-ring: rgba(104, 65, 230, 0.3);  /* --purple-600 + --opacity-30 */
  --color-on-primary: var(--grey-50);

  /* Surfaces */
  --color-surface: var(--grey-white);
  --color-surface-raised: var(--grey-50);
  --color-surface-raised-hover: var(--grey-100);
  --color-surface-overlay: var(--grey-100);
  --color-surface-sunken: var(--grey-100);
  /* Derived from: --grey-black + ~3% opacity */
  --color-surface-ghost-hover: rgba(0, 0, 0, 0.03);

  /* Text */
  --color-text-strong: var(--grey-650);
  --color-text-default: var(--grey-500);
  --color-text-secondary: var(--grey-400);
  --color-text-muted: var(--grey-350);
  --color-text-disabled: var(--grey-300);
  --color-text-on-color: var(--grey-white);

  /* Borders */
  --color-border: var(--grey-200);
  --color-border-strong: var(--grey-300);
  --color-border-subtle: var(--grey-150);

  /* Error */
  --color-error: var(--red-600);
  --color-error-text: var(--red-600);
  --color-error-strong: var(--red-700);
  --color-error-subtle: var(--red-50);
  --color-error-shadow: rgba(220, 38, 38, 0.08);  /* --red-600 + --opacity-8 */

  /* Success */
  --color-success: var(--green-500);
  --color-success-text: var(--green-700);
  --color-success-strong: var(--green-600);
  --color-success-subtle: var(--green-50);

  /* Warning */
  --color-warning: var(--yellow-500);
  --color-warning-text: var(--yellow-700);
  --color-warning-strong: var(--yellow-600);
  --color-warning-subtle: var(--yellow-50);

  /* Info */
  --color-info: var(--blue-500);
  --color-info-text: var(--blue-700);
  --color-info-strong: var(--blue-600);
  --color-info-subtle: var(--blue-50);

  /* Disabled */
  --color-disabled-bg: var(--grey-100);
  --color-disabled-text: var(--grey-350);
  --color-disabled-border: var(--grey-150);

  /* Shadows - General (from Foundation) */
  --shadow-card: var(--shadow-md);
  --shadow-dropdown: var(--shadow-lg);
  --shadow-modal: var(--shadow-xl);
  --shadow-subtle: var(--shadow-sm);
  --shadow-border-alt: var(--shadow-border);

  /* Shadows - Component-specific */
  --shadow-btn-inner: inset 0px 1px 2px rgba(255, 255, 255, 0.28);  /* --grey-white + --opacity-28 */
  --shadow-btn-hover: 0px 4px 8px rgba(0, 0, 0, 0.08);  /* --grey-black + --opacity-8 */
  --shadow-btn-secondary-hover: inset 0px 2px 4px rgba(255, 255, 255, 0.48);  /* --grey-white + --opacity-48 */
  --shadow-focus-ring: 0 0 0 3px var(--color-primary-ring);

  /* Z-Index */
  --z-dropdown: 100;
  --z-sticky: 150;
  --z-modal: 200;
  --z-tooltip: 300;
  --z-toast: 400;

  /* Badge Colors - Light */
  --badge-purple-bg: var(--purple-200);
  --badge-purple-text: var(--purple-700);
  --badge-purple-dot: var(--purple-500);
  --badge-green-bg: var(--green-200);
  --badge-green-text: var(--green-700);
  --badge-green-dot: var(--green-500);
  --badge-blue-bg: var(--blue-200);
  --badge-blue-text: var(--blue-700);
  --badge-blue-dot: var(--blue-500);
  --badge-orange-bg: var(--orange-200);
  --badge-orange-text: var(--orange-700);
  --badge-orange-dot: var(--orange-500);
  --badge-pink-bg: var(--pink-200);
  --badge-pink-text: var(--pink-700);
  --badge-pink-dot: var(--pink-500);
  --badge-gray-bg: var(--grey-200);
  --badge-gray-text: var(--grey-450);
  --badge-gray-dot: var(--grey-350);
}

[data-theme="dark"] {
  /* Brand / Primary */
  --color-primary: var(--purple-500);
  --color-primary-hover: var(--purple-600);
  --color-primary-muted: var(--purple-300);
  --color-primary-subtle: rgba(122, 98, 240, 0.1);  /* --purple-500 + --opacity-10 */
  --color-primary-ring: rgba(122, 98, 240, 0.35);  /* --purple-500 + --opacity-35 */
  --color-on-primary: var(--grey-white);

  /* Surfaces */
  --color-surface: var(--grey-700);
  --color-surface-raised: var(--grey-650);
  --color-surface-raised-hover: var(--grey-600);
  --color-surface-overlay: var(--grey-600);
  --color-surface-sunken: var(--grey-750);
  /* Derived from: --grey-white + ~5% opacity */
  --color-surface-ghost-hover: rgba(255, 255, 255, 0.05);

  /* Text */
  --color-text-strong: var(--grey-white);
  --color-text-default: var(--grey-100);
  --color-text-secondary: var(--grey-250);
  --color-text-muted: var(--grey-350);
  --color-text-disabled: var(--grey-450);
  --color-text-on-color: var(--grey-white);

  /* Borders */
  --color-border: var(--grey-550);
  --color-border-strong: var(--grey-450);
  --color-border-subtle: var(--grey-600);

  /* Error */
  --color-error: var(--red-600);
  --color-error-text: var(--red-600);
  --color-error-strong: var(--red-600);
  --color-error-subtle: rgba(220, 38, 38, 0.1);  /* --red-600 + --opacity-10 */
  --color-error-shadow: rgba(220, 38, 38, 0.1);

  /* Success */
  --color-success: var(--green-400);
  --color-success-text: var(--green-400);
  --color-success-strong: var(--green-500);
  --color-success-subtle: rgba(34, 197, 94, 0.1);  /* --green-500 + --opacity-10 */

  /* Warning */
  --color-warning: var(--yellow-400);
  --color-warning-text: var(--yellow-400);
  --color-warning-strong: var(--yellow-500);
  --color-warning-subtle: rgba(234, 179, 8, 0.1);  /* --yellow-500 + --opacity-10 */

  /* Info */
  --color-info: var(--blue-400);
  --color-info-text: var(--blue-400);
  --color-info-strong: var(--blue-500);
  --color-info-subtle: rgba(59, 130, 246, 0.1);  /* --blue-500 + --opacity-10 */

  /* Disabled */
  --color-disabled-bg: var(--grey-600);
  --color-disabled-text: var(--grey-450);
  --color-disabled-border: var(--grey-600);

  /* Shadows */
  --shadow-btn-inner: inset 0px 1px 2px rgba(255, 255, 255, 0.15);  /* --grey-white + --opacity-15 */
  --shadow-btn-hover: 0px 4px 8px rgba(0, 0, 0, 0.3);  /* --grey-black + --opacity-30 */
  --shadow-btn-secondary-hover: inset 0px 2px 4px rgba(0, 0, 0, 0.2);  /* --grey-black + --opacity-20 */

  /* Badge Colors - Dark */
  --badge-purple-bg: var(--purple-900);
  --badge-purple-text: var(--purple-200);
  --badge-purple-dot: var(--purple-400);
  --badge-green-bg: var(--green-900);
  --badge-green-text: var(--green-200);
  --badge-green-dot: var(--green-400);
  --badge-blue-bg: var(--blue-900);
  --badge-blue-text: var(--blue-200);
  --badge-blue-dot: var(--blue-400);
  --badge-orange-bg: var(--orange-900);
  --badge-orange-text: var(--orange-200);
  --badge-orange-dot: var(--orange-400);
  --badge-pink-bg: var(--pink-900);
  --badge-pink-text: var(--pink-200);
  --badge-pink-dot: var(--pink-400);
  --badge-gray-bg: var(--grey-600);
  --badge-gray-text: var(--grey-200);
  --badge-gray-dot: var(--grey-350);
}
```

---

## Token Naming Convention

| Prefix | Category | Examples |
|--------|----------|---------|
| `--color-primary-*` | Brand interaction colors | `primary`, `primary-hover`, `primary-subtle`, `primary-ring` |
| `--color-surface-*` | Background layers | `surface`, `surface-raised`, `surface-overlay`, `surface-sunken`, `surface-ghost-hover` |
| `--color-text-*` | Typography hierarchy | `text-strong`, `text-default`, `text-muted`, `text-on-color` |
| `--color-border-*` | Stroke/divider colors | `border`, `border-strong`, `border-subtle` |
| `--color-error-*` | Destructive/validation | `error`, `error-text`, `error-strong`, `error-subtle`, `error-shadow` |
| `--color-success-*` | Positive feedback | `success`, `success-text`, `success-strong`, `success-subtle` |
| `--color-warning-*` | Cautionary feedback | `warning`, `warning-text`, `warning-strong`, `warning-subtle` |
| `--color-info-*` | Informational feedback | `info`, `info-text`, `info-strong`, `info-subtle` |
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
