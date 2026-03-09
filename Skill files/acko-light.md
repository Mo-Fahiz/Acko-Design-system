# Theme: ACKO Light

The default ACKO brand theme. This file maps semantic tokens to primitive color values. Components reference ONLY the semantic tokens below — never primitive values directly.

---

## Semantic Color Tokens

### Primary (Brand)

| Semantic Token | Primitive Value | Hex | Usage |
|---------------|----------------|-----|-------|
| `--color-primary` | `purple-600` | `#4E29BB` | Primary buttons, active states, links |
| `--color-primary-hover` | `purple-700` | `#2E1773` | Hover state for primary elements |
| `--color-primary-active` | `purple-800` | `#18084A` | Active/pressed state |
| `--color-primary-subtle` | `purple-100` | `#F8F7FD` | Ghost button hover, selected option bg |
| `--color-primary-muted` | `purple-400` | `#B59CF5` | Disabled primary, secondary accents |
| `--color-primary-ring` | `purple-200` | `#ECEBFF` | Focus rings |
| `--color-on-primary` | — | `#FFFFFF` | Text on primary backgrounds |

### Surfaces

| Semantic Token | Primitive Value | Hex | Usage |
|---------------|----------------|-----|-------|
| `--color-surface` | `grey-100` | `#F5F5F5` | Page background |
| `--color-surface-raised` | `grey-100` | `#F5F5F5` | Elevated surfaces |
| `--color-surface-raised-hover` | `grey-200` | `#E0E0E1` | Hover on raised surfaces |
| `--color-surface-raised-active` | `grey-300` | `#B7B7B8` | Active press on raised surfaces |
| `--color-surface-overlay` | — | `rgba(10,10,10,0.5)` | Modal/drawer backdrop |
| `--color-surface-ghost-hover` | — | `rgba(0,0,0,0.04)` | Ghost/outline hover |

### Text

| Semantic Token | Primitive Value | Hex | Usage |
|---------------|----------------|-----|-------|
| `--color-text-default` | `grey-800` | `#0A0A0A` | Headings, labels, body text, user-entered values |
| `--color-text-secondary` | `grey-550` | `#333333` | Subtitles, read-only text |
| `--color-text-muted` | `grey-450` | `#605F63` | Helper text, captions, placeholders |
| `--color-text-disabled` | `grey-300` | `#B7B7B8` | Disabled text, inactive states |

### Borders

| Semantic Token | Primitive Value | Hex | Usage |
|---------------|----------------|-----|-------|
| `--color-border` | `grey-300` | `#B7B7B8` | Default input borders, dividers |
| `--color-border-strong` | `grey-450` | `#605F63` | Hover borders |
| `--color-border-subtle` | `grey-200` | `#E0E0E1` | Disabled borders, card borders, subtle dividers |

### Semantic States

| State | Token | Primitive | Usage |
|-------|-------|----------|-------|
| **Success** | `--color-success` | `green-600` | Success borders, icons |
| | `--color-success-subtle` | `green-100` | Success tinted bg |
| | `--color-success-text` | `green-700` | Success labels, messages |
| | `--color-success-badge-bg` | `green-200` | Success badge bg |
| | `--color-success-border` | `green-200` | Alert success border |
| **Error** | `--color-error` | `red-600` | Error borders, icons |
| | `--color-error-subtle` | `red-50` | Error tinted bg |
| | `--color-error-text` | `red-700` | Error labels, messages |
| | `--color-error-badge-bg` | `red-100` | Error badge bg |
| | `--color-error-border` | `red-200` | Alert error border |
| **Warning** | `--color-warning` | `orange-600` | Warning borders, icons |
| | `--color-warning-subtle` | `orange-100` | Warning tinted bg |
| | `--color-warning-text` | `orange-700` | Warning labels, messages |
| | `--color-warning-badge-bg` | `orange-200` | Warning badge bg |
| | `--color-warning-border` | `orange-200` | Alert warning border |
| **Info** | `--color-info` | `blue-600` | Info borders, icons |
| | `--color-info-subtle` | `blue-100` | Info tinted bg |
| | `--color-info-text` | `blue-700` | Info labels, messages |
| | `--color-info-badge-bg` | `blue-200` | Info badge bg |
| | `--color-info-border` | `blue-200` | Alert info border |

---

## CSS Custom Properties (Semantic Layer)

```css
[data-theme="light"], :root {
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
}
```

---

## Visual Personality

These traits define the *feel* of this theme — not just the colors, but the character:

| Property | Value | Notes |
|----------|-------|-------|
| Overall mood | Clean, trustworthy, approachable | Insurance = trust. Nothing too playful. |
| Button press | `scale(0.97)` on active | Subtle physical feedback |
| Card borders | Default uses highlight edge (white border on grey-50 fill) | Floating feel, not stroke |
| Card variants | 4 variants: default, outline, elevated (shadow), demoted | Contextual surface hierarchy |
| Input focus | Border color change + focus ring | Prominent but not aggressive |
| Dropdown enter | `translateY(-8px) → 0` + `opacity 0 → 1` | Slides in from above |
| Border radius | Pill buttons (`9999px`), `16px` cards/containers | Friendly, rounded |
| Shadows | Light and diffused | Never harsh drop shadows |
| Gradients | Avoid in UI components | Solid colors only for buttons, inputs, etc. |
| Illustrations | Flat, geometric, ACKO brand style | Not 3D, not photorealistic |

---

## Logo Selection for This Theme

Since this is a light background theme:
- Use: **Primary Light BG** logo or **Horizontal Light BG** logo
- Never use the dark BG variants on light backgrounds

---

## Figma Token Export Format

For syncing to Figma via Tokens Studio, export semantic tokens in this structure:

```json
{
  "color": {
    "primary": { "value": "{purple.600}", "type": "color" },
    "primary-hover": { "value": "{purple.700}", "type": "color" },
    "primary-subtle": { "value": "{purple.100}", "type": "color" },
    "surface": { "value": "{grey.100}", "type": "color" },
    "surface-raised": { "value": "{grey.100}", "type": "color" },
    "text-default": { "value": "{grey.800}", "type": "color" },
    "text-muted": { "value": "{grey.450}", "type": "color" },
    "border": { "value": "{grey.300}", "type": "color" },
    "success": { "value": "{green.600}", "type": "color" },
    "error": { "value": "{red.600}", "type": "color" },
    "warning": { "value": "{orange.600}", "type": "color" },
    "info": { "value": "{blue.600}", "type": "color" }
  }
}
```
