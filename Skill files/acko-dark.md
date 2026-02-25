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

| Semantic Token | Primitive Value | Hex | Notes |
|---------------|----------------|-----|-------|
| `--color-primary` | `purple-500` | `#926FF3` | Lighter purple for contrast on dark |
| `--color-primary-hover` | `purple-400` | `#B59CF5` | Hover goes lighter (not darker) |
| `--color-primary-active` | `purple-300` | `#D1C5FA` | Active goes even lighter |
| `--color-primary-subtle` | `purple-800` | `#18084A` | Tinted dark surface for selections |
| `--color-primary-muted` | `purple-600` | `#4E29BB` | Secondary accent |
| `--color-primary-ring` | `purple-700` | `#2E1773` | Focus rings (darker, subtler) |
| `--color-on-primary` | — | `#FFFFFF` | Text on primary buttons |

### Surfaces

| Semantic Token | Primitive Value | Hex | Notes |
|---------------|----------------|-----|-------|
| `--color-surface` | — | `#0F0F14` | Deepest background |
| `--color-surface-raised` | — | `#1A1A24` | Cards, inputs, raised elements |
| `--color-surface-raised-hover` | — | `#252530` | Hover on cards/buttons |
| `--color-surface-raised-active` | — | `#30303D` | Active press |
| `--color-surface-overlay` | — | `rgba(0,0,0,0.7)` | Modal backdrop (darker for dark mode) |

### Text

| Semantic Token | Hex | Notes |
|---------------|-----|-------|
| `--color-text-strong` | `#F0F0F5` | Headings (not pure white) |
| `--color-text-default` | `#D0D0DA` | Body text |
| `--color-text-secondary` | `#A0A0B0` | Subtitles |
| `--color-text-muted` | `#6B6B80` | Helper text, captions |
| `--color-text-disabled` | `#45455A` | Disabled |

### Borders

| Semantic Token | Hex | Notes |
|---------------|-----|-------|
| `--color-border` | `#35354A` | Default borders |
| `--color-border-strong` | `#50506A` | Hover borders |
| `--color-border-subtle` | `#25253A` | Subtle dividers, card outlines |

### Semantic States

| State | Token | Hex | Notes |
|-------|-------|-----|-------|
| **Success** | `--color-success` | `#55B94D` (green-500) | Brighter for dark bg |
| | `--color-success-subtle` | `#0A1F0A` | Dark tinted green |
| | `--color-success-text` | `#85E37D` (green-400) | Light green text |
| | `--color-success-badge-bg` | `#0F2D0F` | Dark green badge |
| **Error** | `--color-error` | `#EC5FAB` (cerise-500) | Brighter pink |
| | `--color-error-subtle` | `#1F0A15` | Dark tinted pink |
| | `--color-error-text` | `#F8A9D6` (cerise-400) | Light pink text |
| | `--color-error-badge-bg` | `#2D0F1F` | Dark pink badge |
| **Warning** | `--color-warning` | `#F4A024` (orange-500) | Full orange |
| | `--color-warning-subtle` | `#1F150A` | Dark tinted orange |
| | `--color-warning-text` | `#FFC368` (orange-400) | Light orange text |
| | `--color-warning-badge-bg` | `#2D1F0F` | Dark orange badge |
| **Info** | `--color-info` | `#1EB7E7` (blue-500) | Full blue |
| | `--color-info-subtle` | `#0A151F` | Dark tinted blue |
| | `--color-info-text` | `#59D8FF` (blue-400) | Light blue text |
| | `--color-info-badge-bg` | `#0F1F2D` | Dark blue badge |

---

## CSS Custom Properties (Semantic Layer)

```css
[data-theme="dark"] {
  /* Primary */
  --color-primary: #926FF3;
  --color-primary-hover: #B59CF5;
  --color-primary-active: #D1C5FA;
  --color-primary-subtle: #18084A;
  --color-primary-muted: #4E29BB;
  --color-primary-ring: #2E1773;
  --color-on-primary: #FFFFFF;

  /* Surfaces */
  --color-surface: #0F0F14;
  --color-surface-raised: #1A1A24;
  --color-surface-raised-hover: #252530;
  --color-surface-raised-active: #30303D;
  --color-surface-overlay: rgba(0, 0, 0, 0.7);

  /* Text */
  --color-text-strong: #F0F0F5;
  --color-text-default: #D0D0DA;
  --color-text-secondary: #A0A0B0;
  --color-text-muted: #6B6B80;
  --color-text-disabled: #45455A;

  /* Borders */
  --color-border: #35354A;
  --color-border-strong: #50506A;
  --color-border-subtle: #25253A;

  /* Success */
  --color-success: #55B94D;
  --color-success-subtle: #0A1F0A;
  --color-success-text: #85E37D;
  --color-success-badge-bg: #0F2D0F;

  /* Error */
  --color-error: #EC5FAB;
  --color-error-subtle: #1F0A15;
  --color-error-text: #F8A9D6;
  --color-error-badge-bg: #2D0F1F;

  /* Warning */
  --color-warning: #F4A024;
  --color-warning-subtle: #1F150A;
  --color-warning-text: #FFC368;
  --color-warning-badge-bg: #2D1F0F;

  /* Info */
  --color-info: #1EB7E7;
  --color-info-subtle: #0A151F;
  --color-info-text: #59D8FF;
  --color-info-badge-bg: #0F1F2D;

  /* Override shadows — less visible on dark, use border instead */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
  --shadow-lg: 0 4px 24px rgba(0,0,0,0.4);
  --shadow-xl: 0 8px 40px rgba(0,0,0,0.5);
  --shadow-border: 0 0 0 1px rgba(255,255,255,0.08);
}
```

---

## Visual Personality (Dark Mode Adjustments)

| Property | Light Mode | Dark Mode | Notes |
|----------|-----------|-----------|-------|
| Card borders | `box-shadow` border | Subtle `border-subtle` visible | Borders more important when shadows are invisible |
| Card hover | Lift + shadow | Surface color change only | Shadows don't work well on dark |
| Input background | `--color-surface` (white) | `--color-surface-raised` | Slightly raised from page bg |
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
    "primary": { "value": "#926FF3", "type": "color" },
    "primary-hover": { "value": "#B59CF5", "type": "color" },
    "primary-subtle": { "value": "#18084A", "type": "color" },
    "surface": { "value": "#0F0F14", "type": "color" },
    "surface-raised": { "value": "#1A1A24", "type": "color" },
    "text-strong": { "value": "#F0F0F5", "type": "color" },
    "text-default": { "value": "#D0D0DA", "type": "color" },
    "text-muted": { "value": "#6B6B80", "type": "color" },
    "border": { "value": "#35354A", "type": "color" },
    "success": { "value": "#55B94D", "type": "color" },
    "error": { "value": "#EC5FAB", "type": "color" },
    "warning": { "value": "#F4A024", "type": "color" },
    "info": { "value": "#1EB7E7", "type": "color" }
  }
}
```
