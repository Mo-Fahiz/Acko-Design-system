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
| `--color-surface` | `onyx-100` | `#FFFFFF` | Page background, input bg, card bg |
| `--color-surface-raised` | `onyx-200` | `#F6F6F6` | Secondary button bg, disabled input bg, card footer |
| `--color-surface-raised-hover` | `onyx-300` | `#E7E7E7` | Hover on raised surfaces |
| `--color-surface-raised-active` | `onyx-400` | `#B0B0B0` | Active press on raised surfaces |
| `--color-surface-overlay` | — | `rgba(10,10,10,0.5)` | Modal/drawer backdrop |

### Text

| Semantic Token | Primitive Value | Hex | Usage |
|---------------|----------------|-----|-------|
| `--color-text-strong` | `onyx-800` | `#0A0A0A` | Headings, input values, important text |
| `--color-text-default` | `onyx-700` | `#121212` | Body text, labels, button text |
| `--color-text-secondary` | `onyx-600` | `#2F2F2F` | Subtitles, read-only text |
| `--color-text-muted` | `onyx-500` | `#5D5D5D` | Helper text, captions, placeholders |
| `--color-text-disabled` | `onyx-400` | `#B0B0B0` | Disabled text, inactive states |

### Borders

| Semantic Token | Primitive Value | Hex | Usage |
|---------------|----------------|-----|-------|
| `--color-border` | `onyx-400` | `#B0B0B0` | Default input borders, dividers |
| `--color-border-strong` | `onyx-500` | `#5D5D5D` | Hover borders |
| `--color-border-subtle` | `onyx-300` | `#E7E7E7` | Disabled borders, card borders, subtle dividers |

### Semantic States

| State | Token | Primitive | Hex | Usage |
|-------|-------|----------|-----|-------|
| **Success** | `--color-success` | `green-600` | `#149A40` | Success borders, icons |
| | `--color-success-subtle` | `green-100` | `#F3FFF2` | Success input bg |
| | `--color-success-text` | `green-700` | `#1C772C` | Success labels, messages |
| | `--color-success-badge-bg` | `green-200` | `#DAFAD7` | Success badge bg |
| **Error** | `--color-error` | `cerise-600` | `#D82A7B` | Error borders, icons |
| | `--color-error-subtle` | `cerise-100` | `#FDF2F8` | Error input bg |
| | `--color-error-text` | `cerise-700` | `#981950` | Error labels, messages |
| | `--color-error-badge-bg` | `cerise-200` | `#FCE7F4` | Error badge bg |
| **Warning** | `--color-warning` | `orange-600` | `#D97700` | Warning borders, icons |
| | `--color-warning-subtle` | `orange-100` | `#FFF8E7` | Warning input bg |
| | `--color-warning-text` | `orange-700` | `#B15A08` | Warning labels, messages |
| | `--color-warning-badge-bg` | `orange-200` | `#FFEDC5` | Warning badge bg |
| **Info** | `--color-info` | `blue-600` | `#009DE0` | Info borders, icons |
| | `--color-info-subtle` | `blue-100` | `#EEFAFF` | Info bg |
| | `--color-info-text` | `blue-700` | `#006A97` | Info labels, messages |
| | `--color-info-badge-bg` | `blue-200` | `#DEF7FF` | Info badge bg |

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
  --color-surface: var(--onyx-100);
  --color-surface-raised: var(--onyx-200);
  --color-surface-raised-hover: var(--onyx-300);
  --color-surface-raised-active: var(--onyx-400);
  --color-surface-overlay: rgba(10, 10, 10, 0.5);

  /* Text */
  --color-text-strong: var(--onyx-800);
  --color-text-default: var(--onyx-700);
  --color-text-secondary: var(--onyx-600);
  --color-text-muted: var(--onyx-500);
  --color-text-disabled: var(--onyx-400);

  /* Borders */
  --color-border: var(--onyx-400);
  --color-border-strong: var(--onyx-500);
  --color-border-subtle: var(--onyx-300);

  /* Success */
  --color-success: var(--green-600);
  --color-success-subtle: var(--green-100);
  --color-success-text: var(--green-700);
  --color-success-badge-bg: var(--green-200);

  /* Error */
  --color-error: var(--cerise-600);
  --color-error-subtle: var(--cerise-100);
  --color-error-text: var(--cerise-700);
  --color-error-badge-bg: var(--cerise-200);

  /* Warning */
  --color-warning: var(--orange-600);
  --color-warning-subtle: var(--orange-100);
  --color-warning-text: var(--orange-700);
  --color-warning-badge-bg: var(--orange-200);

  /* Info */
  --color-info: var(--blue-600);
  --color-info-subtle: var(--blue-100);
  --color-info-text: var(--blue-700);
  --color-info-badge-bg: var(--blue-200);
}
```

---

## Visual Personality

These traits define the *feel* of this theme — not just the colors, but the character:

| Property | Value | Notes |
|----------|-------|-------|
| Overall mood | Clean, trustworthy, approachable | Insurance = trust. Nothing too playful. |
| Button press | `scale(0.97)` on active | Subtle physical feedback |
| Card borders | `box-shadow` border, not CSS border | Sharper on retina, softer feel |
| Card hover | Subtle lift (`translateY(-2px)` + `shadow-md`) | Indicates interactivity |
| Input focus | Border color change + focus ring | Prominent but not aggressive |
| Dropdown enter | `translateY(-8px) → 0` + `opacity 0 → 1` | Slides in from above |
| Border radius | Generally rounded (`10px` buttons, `12px` cards) | Friendly, not sharp |
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
    "primary": { "value": "#4E29BB", "type": "color" },
    "primary-hover": { "value": "#2E1773", "type": "color" },
    "primary-subtle": { "value": "#F8F7FD", "type": "color" },
    "surface": { "value": "#FFFFFF", "type": "color" },
    "surface-raised": { "value": "#F6F6F6", "type": "color" },
    "text-strong": { "value": "#0A0A0A", "type": "color" },
    "text-default": { "value": "#121212", "type": "color" },
    "text-muted": { "value": "#5D5D5D", "type": "color" },
    "border": { "value": "#B0B0B0", "type": "color" },
    "success": { "value": "#149A40", "type": "color" },
    "error": { "value": "#D82A7B", "type": "color" },
    "warning": { "value": "#D97700", "type": "color" },
    "info": { "value": "#009DE0", "type": "color" }
  }
}
```
