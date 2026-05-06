---
description: Typography tokens — font family, type scale, weight rules, and sizing guidelines
globs: "**/*.css,**/*.tsx"
alwaysApply: true
---
# Typography Tokens

## Font Family

**Euclid Circular B** — all text across the system.

```css
font-family: 'Euclid Circular B', -apple-system, BlinkMacSystemFont, sans-serif;
```

CDN base: `https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/`

Weights: Light (300), Regular (400), Medium (500), Semibold (600), Bold (700).

## Type Scale

Each level is expressed as 4 sub-tokens in `tokens.css`:
- `--font-{level}-size` — font-size
- `--font-{level}-line` — line-height
- `--font-{level}-spacing` — letter-spacing
- `--font-{level}-weight` — font-weight

### Display (marketing, heroes)

| Level | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `--fontDisplayXl-*` | 72px | 80px | -2px | Bold 700 |
| `--fontDisplayLg-*` | 56px | 64px | -1.5px | Bold 700 |
| `--fontDisplayMd-*` | 48px | 56px | -1px | Bold 700 |
| `--fontDisplaySm-*` | 40px | 48px | -0.5px | Semibold 600 |

### Heading (UI sections)

| Level | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `--fontHeadingXl-*` | 32px | 40px | -0.5px | Semibold 600 |
| `--fontHeadingLg-*` | 24px | 32px | -0.3px | Semibold 600 |
| `--fontHeadingMd-*` | 20px | 28px | -0.2px | Semibold 600 |
| `--fontHeadingSm-*` | 18px | 24px | 0px | Semibold 600 |

### Body (content)

| Level | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `--fontBodyLg-*` | 18px | 28px | 0px | Regular 400 |
| `--fontBodyMd-*` | 16px | 24px | 0px | Regular 400 |
| `--fontBodySm-*` | 14px | 20px | 0px | Regular 400 |

### Labels & Utility

| Level | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `--fontLabelLg-*` | 14px | 20px | 0.1px | Medium 500 |
| `--fontLabelMd-*` | 12px | 16px | 0.2px | Medium 500 |
| `--fontLabelSm-*` | 11px | 14px | 0.3px | Medium 500 |
| `--fontCaption-*` | 12px | 16px | 0px | Regular 400 |
| `--fontOverline-*` | 11px | 16px | 0.5px | Semibold 600 |

### Example usage in CSS

```css
.my-heading {
  font-size: var(--fontHeadingLgSize);
  line-height: var(--fontHeadingLgLine);
  letter-spacing: var(--fontHeadingLgSpacing);
  font-weight: var(--fontHeadingLgWeight);
}
```

## Tailwind Mapping

| Token | Tailwind equivalent |
|-------|-------------------|
| 11px | `text-[11px]` |
| 12px / `--fontCaptionSize` | `text-xs` |
| 14px / `--fontBodySmSize` | `text-sm` |
| 16px / `--fontBodyMdSize` | `text-base` |
| 18px / `--fontBodyLgSize` | `text-lg` |
| 20px / `--fontHeadingMdSize` | `text-xl` |
| 24px / `--fontHeadingLgSize` | `text-2xl` |
| Weight 400 | `font-normal` |
| Weight 500 | `font-medium` |
| Weight 600 | `font-semibold` |
| Weight 700 | `font-bold` |

## Button Font Sizes (Intentionally Hardcoded)

Buttons use their own scale — not body tokens:

| Size | Font | Tailwind |
|------|------|----------|
| xs | 12px | `text-xs` |
| sm | 14px | `text-sm` |
| md | 16px | `text-base` |
| lg | 18px | `text-lg` |
| xl | 20px | `text-xl` |

## Rules

- Minimum 14px for body text, 12px for labels, 11px absolute minimum
- Medium (500) for emphasis in body — not Bold
- Semibold (600) for headings, Bold (700) only for display
- Tighter letter-spacing for large text, looser for small text
- Use `text-wrap: balance` on headings
- `font-variant-numeric: tabular-nums` for dynamic numbers

Typography tokens are **theme-agnostic** — they do not change between themes.

## Text Casing

All UI text must follow **sentence case** — capitalize only the first word and proper nouns/exceptions. This applies across the entire system: headings, buttons, labels, tabs, breadcrumbs, navigation items, links, and toast actions.

> Capitalize only the first word of a text label. All other words are lowercase unless they are proper nouns or fall under the exceptions below.

### Examples

**Correct**

- `Get a quote`
- `View my policy`
- `Continue to payment`
- `Check IDV`
- `Claim your NCB`
- `Pay with ACKO Drive`
- `Find clinics near Bengaluru`

**Incorrect**

- `Get A Quote`
- `View My Policy`
- `Continue To Payment`
- `Check Idv`
- `Claim Your NCB`
- `find clinics near bengaluru`

### Exceptions

These terms always retain their defined casing regardless of position in the label.

#### Brand names

- `ACKO` — always all-caps
- `ACKO [Product]` — sub-brands retain their casing (e.g., `ACKO Drive`, `ACKO Clinic`)

#### Proper nouns

City names, state names, country names, and person names retain their standard capitalization. Sentence case applies to common nouns and verbs — not proper nouns.

- `Check plans in Hyderabad` — correct
- `Check plans in hyderabad` — incorrect
- `Aadhaar` — always capitalized as a proper noun (not `AADHAAR` or `aadhaar`)

#### Regulatory & government bodies

- `IRDAI` — Insurance Regulatory and Development Authority of India

#### Insurance & financial acronyms

- `IDV` — Insured Declared Value
- `NCB` — No Claim Bonus
- `KYC` — Know Your Customer
- `GST` — Goods and Services Tax
- `EMI` — Equated Monthly Instalment
- `OTP` — One Time Password

#### Identity & document acronyms

- `PAN` — Permanent Account Number

### All-caps emphasis

Words like `FREE`, `NEW`, `SAVE` must remain lowercase in button, label, and navigation text. All-caps emphasis belongs in the `<Badge>` component (which defaults to `textCase="uppercase"`) — not in text labels.

- `Get a free quote` — correct (button)
- `Get a FREE quote` — incorrect (button)
- `FREE` — correct (inside a `<Badge>`)

### Common nouns

Product and coverage terms like `premium`, `claim`, `policy`, `cover` are common nouns — always lowercase unless they start the sentence.

### Where this applies

| Component | Applies? |
|-----------|----------|
| Button labels | Yes |
| Tab labels | Yes |
| Breadcrumb text | Yes |
| Navigation items | Yes |
| Link text | Yes |
| Toast action labels | Yes |
| Dialog action buttons | Yes |
| Headings | Yes |
| Badge | No — Badge has its own `textCase` prop (`uppercase` or `sentence`, default: `uppercase`). See `badge.react.mdc` → **Text Case Selection** for the decision table. |

## Typography Color System

The `<Typography>` component's `color` prop uses 7 intent-based values. Each prop maps 1:1 to a `--colorText-{prop}` token:

| Value | Token | Use case |
|-------|-------|----------|
| `primary` (default) | `--colorTextPrimary` | General use — headings, values, main content |
| `secondary` | `--colorTextSecondary` | Subtext — captions, helpers, descriptions |
| `invert` | `--colorTextInvert` | Text on dark/filled surfaces (opposite of current theme) |
| `brand` | `--colorTextBrand` | Brand-colored text — links, emphasis |
| `error` | `--colorTextError` | Error messages |
| `success` | `--colorTextSuccess` | Success messages |
| `static` | `--colorTextStatic` | Fixed color across themes — white in both light and dark |

All tokens except `static` auto-adapt across light and dark themes. `static` produces an identical color (`grey-white`) in both themes — use it for text that must remain fixed regardless of theme (e.g., white text on a photo overlay).
