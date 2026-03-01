# Theme: ACKO Dark

Dark mode variant for ACKO. Used for low-light environments and user preference. Same component structure, different token mapping.

**Note:** Dark mode does NOT mean "invert everything." It means carefully remapping surfaces, text, and accents for dark backgrounds while maintaining readability and brand identity.

---

## Design Principles for Dark Mode

1. **Surfaces get darker as they go "back"** — the opposite of light mode where raised = lighter
2. **Text uses lighter values** but NOT pure white (#FFFFFF is too harsh on dark backgrounds)
3. **Primary purple shifts lighter** to maintain contrast against dark surfaces
4. **Reduce shadow intensity** — shadows are less visible on dark backgrounds, use subtle borders or elevation through surface color instead
5. **Semantic colors (success/error/warning/info) shift to their 400-500 range** for better contrast on dark surfaces

---

## Semantic Color Tokens

### Primary (Brand)

| Semantic Token | Primitive Value | Notes |
|---------------|----------------|-------|
| `--color-primary` | `purple-500` | Lighter purple for contrast on dark |
| `--color-primary-hover` | `purple-400` | Hover goes lighter (not darker) |
| `--color-primary-active` | `purple-300` | Active goes even lighter |
| `--color-primary-subtle` | `purple-900` | Tinted dark surface for selections |
| `--color-primary-muted` | `purple-600` | Secondary accent |
| `--color-primary-ring` | `purple-800` | Focus rings (darker, subtler) |
| `--color-on-primary` | `grey-white` | Text on primary buttons |

### Surfaces

| Semantic Token | Primitive Value | Notes |
|---------------|----------------|-------|
| `--color-surface` | `grey-750` | Deepest background |
| `--color-surface-raised` | `grey-700` | Cards, inputs, raised elements |
| `--color-surface-raised-hover` | `grey-650` | Hover on cards/buttons |
| `--color-surface-raised-active` | `grey-600` | Active press |
| `--color-surface-overlay` | `rgba(0,0,0,0.7)` | Modal backdrop (darker for dark mode) |
| `--color-surface-ghost-hover` | `rgba(255,255,255,0.05)` | Ghost/outline hover tint |

### Cards

| Semantic Token | Primitive Value | Notes |
|---------------|----------------|-------|
| `--color-card-bg` | `grey-700` | Default card fill |
| `--color-card-border` | `grey-650` | Default card highlight edge |
| `--color-card-elevated-bg` | `grey-650` | Elevated card fill |
| `--color-card-demoted-bg` | `grey-750` | Demoted card fill |
| `--color-card-demoted-border` | `grey-600` | Demoted card border |
| `--color-card-outline-border` | `grey-600` | Outline card border |

### Text

| Semantic Token | Primitive Value | Notes |
|---------------|----------------|-------|
| `--color-text-strong` | `grey-50` | Headings, user-entered values, active/selected states |
| `--color-text-default` | `grey-100` | Labels, body text, system-provided UI text |
| `--color-text-secondary` | `grey-200` | Subtitles |
| `--color-text-muted` | `grey-350` | Helper text, captions |
| `--color-text-disabled` | `grey-450` | Disabled |

### Borders

| Semantic Token | Primitive Value | Notes |
|---------------|----------------|-------|
| `--color-border` | `grey-600` | Default borders |
| `--color-border-strong` | `grey-550` | Hover borders |
| `--color-border-subtle` | `grey-650` | Subtle dividers, card outlines |

### Disabled

| Semantic Token | Primitive Value | Notes |
|---------------|----------------|-------|
| `--color-disabled-bg` | `grey-600` | Disabled element background |
| `--color-disabled-text` | `grey-450` | Disabled element text |
| `--color-disabled-border` | `grey-600` | Disabled element border |

### Semantic States

| State | Token | Primitive | Notes |
|-------|-------|----------|-------|
| **Success** | `--color-success` | `green-500` | Brighter for dark bg |
| | `--color-success-subtle` | `green-950` | Dark tinted green |
| | `--color-success-text` | `green-400` | Light green text |
| | `--color-success-badge-bg` | `green-900` | Dark green badge |
| | `--color-success-border` | `green-800` | Alert success border |
| **Error** | `--color-error` | `red-600` | Error borders, icons |
| | `--color-error-subtle` | `red-950` | Dark tinted red |
| | `--color-error-text` | `red-400` | Error text |
| | `--color-error-badge-bg` | `red-900` | Dark red badge |
| | `--color-error-border` | `red-800` | Alert error border |
| **Warning** | `--color-warning` | `orange-500` | Full orange |
| | `--color-warning-subtle` | `orange-950` | Dark tinted orange |
| | `--color-warning-text` | `orange-400` | Light orange text |
| | `--color-warning-badge-bg` | `orange-900` | Dark orange badge |
| | `--color-warning-border` | `orange-800` | Alert warning border |
| **Info** | `--color-info` | `blue-500` | Full blue |
| | `--color-info-subtle` | `blue-950` | Dark tinted blue |
| | `--color-info-text` | `blue-400` | Light blue text |
| | `--color-info-badge-bg` | `blue-900` | Dark blue badge |
| | `--color-info-border` | `blue-800` | Alert info border |

---

## CSS Custom Properties (Semantic Layer)

```css
[data-theme="dark"] {
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 4px 28px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 8px 44px rgba(0, 0, 0, 0.6);
  --shadow-border: 0 0 0 1px rgba(255, 255, 255, 0.06);
  --shadow-card: var(--shadow-md);
  --shadow-dropdown: var(--shadow-lg);
  --shadow-modal: var(--shadow-xl);
  --shadow-subtle: var(--shadow-sm);

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
  --color-text-strong: var(--grey-50);
  --color-text-default: var(--grey-100);
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

  /* Input (form controls) */
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

  /* Form Controls */
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

## Visual Personality (Dark Mode Adjustments)

| Property | Light Mode | Dark Mode | Notes |
|----------|-----------|-----------|-------|
| Card borders | White highlight edge | `grey-650` border, subtler | Borders more important when shadows are invisible |
| Card hover | Lift + shadow | Surface color change only | Shadows don't work well on dark |
| Input background | `--color-surface` | `--color-surface-raised` | Slightly raised from page bg |
| Dropdown menu | White + shadow | Raised surface + visible border | Needs border to separate from bg |
| Scrollbar | Default | Custom dark scrollbar | Match the theme |
| Images/illustrations | As-is | Consider `brightness(0.9)` filter | Prevent eye strain |

---

## Activation

To activate dark mode, set `data-theme="dark"` on the root element:

```html
<html data-theme="dark">
```

Or toggle via JavaScript:
```js
document.documentElement.setAttribute('data-theme', 'dark');
```

For system preference detection:
```js
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
```

---

## Logo Selection for This Theme

Since this is a dark background theme:
- Use: **Primary Dark BG** logo or **Horizontal Dark BG** logo
- Never use the light BG variants on dark backgrounds

---

## Figma Token Export

```json
{
  "color": {
    "primary": { "value": "{purple.500}", "type": "color" },
    "primary-hover": { "value": "{purple.400}", "type": "color" },
    "primary-subtle": { "value": "{purple.900}", "type": "color" },
    "surface": { "value": "{grey.750}", "type": "color" },
    "surface-raised": { "value": "{grey.700}", "type": "color" },
    "text-strong": { "value": "{grey.50}", "type": "color" },
    "text-default": { "value": "{grey.100}", "type": "color" },
    "text-muted": { "value": "{grey.350}", "type": "color" },
    "border": { "value": "{grey.600}", "type": "color" },
    "success": { "value": "{green.500}", "type": "color" },
    "error": { "value": "{red.600}", "type": "color" },
    "warning": { "value": "{orange.500}", "type": "color" },
    "info": { "value": "{blue.500}", "type": "color" }
  }
}
```
