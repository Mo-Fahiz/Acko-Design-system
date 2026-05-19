---
description: |
  ACKO Typography System — MANDATORY token rules for AI agents and developers.
  MUST use token names (e.g. var(--ackoFontBodyMd), AckoTypography.bodyMd) — NEVER hardcoded values like `font-size: 16px` or `font-weight: 600`. If no token fits, STOP and ask — do not invent values. All values shown in this file are documentation only, not for use in code.
globs: "**/*.css,**/*.tsx,**/*.ts,**/*.jsx,**/*.js,**/*.dart,**/*.swift,**/*.kt,**/*.json"
alwaysApply: true
priority: highest
version: 3.4.0
last_updated: 2026-05-12
w3c_dtcg_compliant: true
source_unit: px
css_output_unit: rem (auto-converted via Style Dictionary)
naming_convention: camelCase (all platforms)
color_source: colors-semantic.md (typography never declares color values)
enforcement: |
  - Any literal numeric typographic value (font-size, font-weight, line-height, letter-spacing) in component code is a violation.
  - Any hex color in text styling is a violation.
  - Any reference to a primitive scale token (fontSizeRaw*, fontWeightRaw*) from component code is a violation.
  - Only semantic aliases (fontBodyMd, fontHeading1, fontLabelLg, etc.) are valid in components.
---

# ACKO Typography Tokens

> ## 🛑 MANDATORY RULES FOR AI AGENTS AND DEVELOPERS
>
> **You MUST follow these rules without exception when writing any code that uses typography.**
>
> ### RULE 1 — NEVER hardcode typography values
>
> Do **NOT** write `font-size: 16px`, `font-size: 1rem`, `font-weight: 600`, `line-height: 1.5`, `letter-spacing: -0.5px`, or any other literal typographic value in component code, stylesheets, JSX, Dart, or Swift.
>
> Always reference a token by name.
>
> ### RULE 2 — Tokens are the ONLY source of values
>
> Every `font-size`, `font-weight`, `line-height`, `letter-spacing`, `font-family`, `text-transform`, and text-related color **must** come from a token defined in this file. If a needed token doesn't exist, **stop and ask** — do not invent a value.
>
> ### RULE 3 — Use semantic aliases, not primitive scale tokens
>
> Components reference **semantic aliases** (`fontBodyMd`, `fontHeading2`, `fontLabelLg`). They never reference primitive scale tokens (`fontSizeRaw16`, `fontWeightRaw600`) — those are for the semantic layer only.
>
> ### RULE 4 — Numbers in this document are documentation, not code
>
> Every px value, rem value, ratio, and hex code shown in tables and examples below is **reference material to explain what the token resolves to**. It is **not** a value you should type into code.
>
> ---
>
> ### ✅ CORRECT vs ❌ WRONG
>
> | What you want to write | ❌ Wrong | ✅ Correct (Web/CSS) | ✅ Correct (Flutter) |
> |------------------------|---------|---------------------|---------------------|
> | Default body text | `font-size: 16px;` | `font: var(--ackoFontBodyMd);` | `style: AckoTypography.bodyMd` |
> | Page heading | `font-size: 30px; font-weight: 700;` | `font: var(--ackoFontHeading1);` | `style: AckoTypography.heading1` |
> | Form label | `font-size: 14px; font-weight: 600;` | `font: var(--ackoFontLabelLg);` | `style: AckoTypography.labelLg` |
> | Body text color | `color: #505050;` | `color: var(--colorTextDefault);` | `color: theme.textDefault` |
> | Heading color | `color: #343434;` | `color: var(--colorTextPrimary);` | `color: theme.textPrimary` |
> | Bold body | `font-weight: 700;` | `font-weight: var(--fontWeightBold);` | `fontWeight: AckoTypography.bold` |
> | Tight line height | `line-height: 1.2;` | `line-height: var(--lineHeightTight);` | `height: AckoTypography.lineHeightTight` |
> | Letter-spacing on heading | `letter-spacing: -0.5px;` | (already inside `--ackoFontHeading1`) — don't add separately | (already inside `AckoTypography.heading1`) |
>
> ### ❌ Examples that violate the rules (REJECT in code review)
>
> ```css
> /* ❌ Hardcoded px */
> .card-title { font-size: 18px; font-weight: 600; line-height: 24px; }
>
> /* ❌ Hardcoded rem */
> .body { font-size: 1rem; line-height: 1.5; }
>
> /* ❌ Inlining a hex color */
> .error { color: #B91C1C; }
>
> /* ❌ Referencing a primitive scale token directly */
> .nav-item { font-size: var(--ackoFontSizeRaw14); }
>
> /* ❌ Inventing a value because "it's just a one-off" */
> .promo-banner { font-size: 17px; }
> ```
>
> ### ✅ Same examples written correctly
>
> ```css
> .card-title  { font: var(--ackoFontHeading4); }
> .body        { font: var(--ackoFontBodyMd);   color: var(--colorTextDefault); }
> .error       { font: var(--ackoFontBodySm);   color: var(--colorTextError); }
> .nav-item    { font: var(--ackoFontNavDefault); }
> .promo-banner { font: var(--ackoFontBodyLg); } /* If no existing token fits, STOP and ask — don't invent. */
> ```
>
> ### Decision flow for AI agents
>
> 1. Need to style text? → Pick the matching **semantic alias** from the [Semantic Aliases](#semantic-aliases) section by role (body, heading, label, nav, code, display).
> 2. Need a text color? → Pick from the [Color Integration](#color-integration) table — always `var(--colorText*)`, never a hex.
> 3. Need a weight outside what the alias provides? → Use `var(--fontWeightLight|Normal|Medium|Semibold|Bold)`. Never a numeric weight literal.
> 4. **No alias fits?** → STOP. Do not invent a value. Ask the user or the design system team to add the missing token.
>
> ### Single-line summary
>
> > **If you are typing a number or a hex code into typography-related CSS/Dart/Swift, you are doing it wrong. Use a token name.**

---

**Complete type foundation for web and mobile.** This system provides font family, weights, type scale, responsive sizing, spacing, dark mode, density variants, motion, RTL support, and accessibility-compliant typography across all ACKO products.

Benchmarked against: **Material Design 3**, **Apple HIG**, **IBM Carbon**, **Atlassian Design System**, **Microsoft Fluent 2**, **Adobe Spectrum**, and the **W3C Design Token Community Group Format 2025.10**.

---

## Table of Contents

1. [Token Architecture](#token-architecture) — **NEW: 3-tier model**
2. [Unit Policy](#unit-policy) — **NEW: px-source, rem-output for CSS**
3. [Font Family](#font-family)
4. [Font Weights](#font-weights) — All 5 weights
5. [Type Scale](#type-scale) — 15 sizes (px-source, rem-output)
6. [Style Variants](#style-variants) — 16 variants
7. [Letter Spacing](#letter-spacing)
8. [Line Height](#line-height)
9. [Paragraph Spacing](#paragraph-spacing)
10. [Measure (Line Length)](#measure-line-length)
11. [Text Transform](#text-transform)
12. [Text Alignment & RTL](#text-alignment--rtl) — **EXPANDED: RTL/bidirectional**
13. [Paragraph Indent](#paragraph-indent)
14. [OpenType Features](#opentype-features)
15. [Semantic Aliases](#semantic-aliases)
16. [Dark Mode Typography](#dark-mode-typography) — **NEW**
17. [High-Contrast Mode](#high-contrast-mode) — **NEW**
18. [Density Variants](#density-variants) — **NEW: compact/comfortable/spacious**
19. [Motion & Text Animation](#motion--text-animation) — **NEW**
20. [Responsive Typography](#responsive-typography)
21. [Accessibility (WCAG)](#accessibility-wcag-compliance)
22. [Flutter Implementation](#flutter-implementation)
23. [Color Integration](#color-integration)
24. [Tooling & Export](#tooling--export) — **NEW: Style Dictionary, W3C DTCG**
25. [Implementation Checklist](#implementation-checklist)
26. [Changelog](#changelog)

---

## Token Architecture

**3-tier model** — the same architecture used by Material 3, Fluent 2, IBM Carbon, and Atlassian.

```
Tier 1: PRIMITIVE TOKENS (raw values, stored in px)
  └── fontSizeRaw16: 16px
  └── fontWeightRaw600: 600

Tier 2: SEMANTIC TOKENS (role-based references)
  └── fontBodyMdSize: {fontSizeRaw16}
  └── fontLabelLgWeight: {fontWeightRaw600}

Tier 3: COMPONENT TOKENS (scoped overrides)
  └── buttonLabelSize: {fontLabelMdSize}
  └── cardTitleWeight: {fontHeading4Weight}
```

**Rules:**
- Components ONLY reference Tier 2 semantic tokens — never raw Tier 1 values.
- Theming (dark mode, high-contrast, density, brand) is done by remapping Tier 2 values at the `:root` or theme scope — components never change.
- Tier 1 primitive token naming: `font{Property}Raw{Value}` (e.g. `fontSizeRaw14`, `fontWeightRaw600`, `lineHeightRawTight`).
- Tier 2 semantic token naming: `font{Role}{Modifier}` (e.g. `fontBodyMdSize`, `fontHeading3Weight`).
- **Casing is camelCase across all platforms** — Figma, JSON, Flutter (Dart), iOS (Swift), Android (XML), and CSS. The CSS build uses Style Dictionary's `name/cti/camel` transform to keep `--ackoFontBodyMdSize` identical to its name elsewhere (rather than the default kebab-case).

---

## Unit Policy

**Source values are stored in `px`. Platform-specific units are generated automatically.**

This keeps token names and values identical across Figma, Flutter, and React — designers and developers all reference the same number under the same name. The build step handles platform conversion.

### Conversion matrix

| Platform | Source | Output | Reason |
|----------|--------|--------|--------|
| **Figma** (Tokens Studio) | `16px` | `16px` | Figma works in px natively |
| **Flutter** (Dart) | `16px` | `16.0` (logical pixels) | Flutter's `fontSize` is in logical pixels |
| **iOS** (Swift) | `16px` | `16.0` (points) | UIKit/SwiftUI use points; 1pt ≈ 1px |
| **Android** (XML) | `16px` | `16sp` | `sp` respects user font-scale |
| **React / Web CSS** | `16px` | `1rem` | **Auto-converted** for WCAG 1.4.4 zoom support |

### Why CSS auto-converts to `rem`

Hardcoded `px` font sizes in CSS **ignore the user's browser font-size preference**. A low-vision user who sets their browser default to 20px expects all text to scale — `font-size: 16px` won't, `font-size: 1rem` will. This is WCAG 1.4.4 (Resize Text), a Level AA requirement.

The conversion is automatic and lossless:
- Base reference: `16px = 1rem`
- Formula: `rem_value = px_value / 16`
- `12px → 0.75rem`, `14px → 0.875rem`, `16px → 1rem`, `24px → 1.5rem`, etc.

### Conventions

- **Designers write in px.** Figma tokens, design specs, and this documentation all use px values.
- **Mobile developers consume px directly.** Flutter and native iOS/Android read the source values without conversion.
- **Web developers never hand-write px for font sizes.** The Style Dictionary build outputs CSS variables in `rem`. Hand-coded `font-size: 16px` in a stylesheet is a lint error.
- **Non-typography values** (border-radius, shadow blur, icon sizes, hairline borders) **stay in `px`** in CSS — they're not affected by user font-size preferences and benefit from pixel-accurate rendering.

### Style Dictionary configuration

The conversion is a single transform line in the CSS platform config:

```js
// style-dictionary.config.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      // Replace default 'css' transformGroup so output is camelCase, not kebab-case
      transforms: [
        'attribute/cti',
        'name/cti/camel',  // ← emits --ackoFontBodyMdSize, not --acko-font-body-md-size
        'time/seconds',
        'content/icon',
        'size/pxToRem',    // ← px → rem auto-conversion for font sizes
        'color/css'
      ],
      prefix: 'acko',
      buildPath: 'dist/css/',
      files: [{ destination: 'typography.css', format: 'css/variables' }]
    },
    flutter: {
      transformGroup: 'flutter',
      // No conversion — px values pass through as Dart doubles
      buildPath: 'dist/flutter/',
      files: [{ destination: 'acko_typography.dart', format: 'flutter/class.dart' }]
    },
    ios: {
      transformGroup: 'ios-swift',
      // px → points (1:1 ratio)
      buildPath: 'dist/ios/',
      files: [{ destination: 'AckoTypography.swift', format: 'ios-swift/class.swift' }]
    },
    android: {
      transformGroup: 'android',
      transforms: ['size/pxToSp'], // px → sp for accessibility scaling
      buildPath: 'dist/android/',
      files: [{ destination: 'typography.xml', format: 'android/resources' }]
    }
  }
};
```

**Why `name/cti/camel`?** Style Dictionary's default `css` transformGroup uses `name/cti/kebab`, which emits `--acko-font-body-md-size`. ACKO uses camelCase token names everywhere (Figma, JSON, Flutter, Swift) — so we swap in `name/cti/camel` to keep CSS names identical: `--ackoFontBodyMdSize`. One token, one name, every platform.

A custom `size/pxToRem` transform (if not already in your Style Dictionary version):

```js
StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  matcher: (token) => token.attributes.category === 'size' && token.value.endsWith('px'),
  transformer: (token) => `${parseFloat(token.value) / 16}rem`
});
```

---

## Font Family

**Euclid Circular B** — all text across the ACKO system.

```css
/* Tier 1 — Primitive */
--fontFamilyPrimary: 'Euclid Circular B', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--fontFamilyMono: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;

/* Tier 2 — Semantic */
--fontFamilyDefault: var(--fontFamilyPrimary);
--fontFamilyCode:    var(--fontFamilyMono);
```

**CDN base:** `https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/`

**Font files required (10 total):** 5 weights × 2 styles (normal + italic)

| Weight | Normal file | Italic file |
|--------|-------------|-------------|
| 300 Light | `EuclidCircularB-Light.woff2` | `EuclidCircularB-LightItalic.woff2` |
| 400 Regular | `EuclidCircularB-Regular.woff2` | `EuclidCircularB-RegularItalic.woff2` |
| 500 Medium | `EuclidCircularB-Medium.woff2` | `EuclidCircularB-MediumItalic.woff2` |
| 600 Semibold | `EuclidCircularB-Semibold.woff2` | `EuclidCircularB-SemiboldItalic.woff2` |
| 700 Bold | `EuclidCircularB-Bold.woff2` | `EuclidCircularB-BoldItalic.woff2` |

**Fallback stack rationale:**
- **Euclid Circular B:** Primary brand font
- **-apple-system:** iOS/macOS native (San Francisco)
- **BlinkMacSystemFont:** Chromium on macOS
- **Segoe UI:** Windows native
- **sans-serif:** Ultimate fallback

---

## Font Weights

**Available weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

```css
/* Tier 1 — Primitive */
--fontWeightRaw300: 300;
--fontWeightRaw400: 400;
--fontWeightRaw500: 500;
--fontWeightRaw600: 600;
--fontWeightRaw700: 700;

/* Tier 2 — Semantic aliases */
--fontWeightLight:    var(--fontWeightRaw300);
--fontWeightNormal:   var(--fontWeightRaw400);
--fontWeightMedium:   var(--fontWeightRaw500);
--fontWeightSemibold: var(--fontWeightRaw600);
--fontWeightBold:     var(--fontWeightRaw700);
```

| Weight | Numeric | Semantic Token | Tailwind | Flutter | Use Case |
|--------|---------|----------------|----------|---------|----------|
| **Light** | 300 | `--fontWeightLight` | `font-light` | `FontWeight.w300` | Large display text, elegant subheadings |
| **Regular** | 400 | `--fontWeightNormal` | `font-normal` | `FontWeight.w400` | Body text, default |
| **Medium** | 500 | `--fontWeightMedium` | `font-medium` | `FontWeight.w500` | Labels, emphasis, buttons |
| **Semibold** | 600 | `--fontWeightSemibold` | `font-semibold` | `FontWeight.w600` | Navigation active states, prominent labels |
| **Bold** | 700 | `--fontWeightBold` | `font-bold` | `FontWeight.w700` | Headings, strong emphasis |

---

## Type Scale

> **⚠️ REFERENCE ONLY — DO NOT COPY VALUES INTO CODE.** The values below define what each token resolves to. Components must reference tokens by name (e.g. `var(--ackoFontBodyMd)`), never by value (`16px`, `1rem`). If you find yourself writing `font-size: 16px`, replace it with the token.

**15 font sizes.** Source values are in **px** (the same values Figma and Flutter consume). The CSS build automatically converts to `rem` for WCAG 1.4.4 zoom support — see [Unit Policy](#unit-policy).

### Source values (px — what designers write, what Figma and Flutter consume)

```json
{
  "fontSizeRaw": {
    "10":  { "$value": "10px", "$type": "dimension" },
    "12":  { "$value": "12px", "$type": "dimension" },
    "14":  { "$value": "14px", "$type": "dimension" },
    "16":  { "$value": "16px", "$type": "dimension" },
    "18":  { "$value": "18px", "$type": "dimension" },
    "20":  { "$value": "20px", "$type": "dimension" },
    "24":  { "$value": "24px", "$type": "dimension" },
    "30":  { "$value": "30px", "$type": "dimension" },
    "36":  { "$value": "36px", "$type": "dimension" },
    "48":  { "$value": "48px", "$type": "dimension" },
    "54":  { "$value": "54px", "$type": "dimension" },
    "60":  { "$value": "60px", "$type": "dimension" },
    "72":  { "$value": "72px", "$type": "dimension" },
    "96":  { "$value": "96px", "$type": "dimension" },
    "128": { "$value": "128px", "$type": "dimension" }
  }
}
```

### CSS build output (rem — auto-generated, do not hand-edit)

```css
/* Output of: style-dictionary build --platform css */
:root {
  --ackoFontSizeRaw10:  0.625rem;   /* from 10px  */
  --ackoFontSizeRaw12:  0.75rem;    /* from 12px  */
  --ackoFontSizeRaw14:  0.875rem;   /* from 14px  */
  --ackoFontSizeRaw16:  1rem;       /* from 16px  */
  --ackoFontSizeRaw18:  1.125rem;   /* from 18px  */
  --ackoFontSizeRaw20:  1.25rem;    /* from 20px  */
  --ackoFontSizeRaw24:  1.5rem;     /* from 24px  */
  --ackoFontSizeRaw30:  1.875rem;   /* from 30px  */
  --ackoFontSizeRaw36:  2.25rem;    /* from 36px  */
  --ackoFontSizeRaw48:  3rem;       /* from 48px  */
  --ackoFontSizeRaw54:  3.375rem;   /* from 54px  */
  --ackoFontSizeRaw60:  3.75rem;    /* from 60px  */
  --ackoFontSizeRaw72:  4.5rem;     /* from 72px  */
  --ackoFontSizeRaw96:  6rem;       /* from 96px  */
  --ackoFontSizeRaw128: 8rem;       /* from 128px */
}
```

### Flutter build output (logical pixels — px values pass through directly)

```dart
// Output of: style-dictionary build --platform flutter
class AckoFontSizes {
  static const double raw10  = 10.0;
  static const double raw12  = 12.0;
  static const double raw14  = 14.0;
  static const double raw16  = 16.0;
  static const double raw18  = 18.0;
  static const double raw20  = 20.0;
  static const double raw24  = 24.0;
  static const double raw30  = 30.0;
  static const double raw36  = 36.0;
  static const double raw48  = 48.0;
  static const double raw54  = 54.0;
  static const double raw60  = 60.0;
  static const double raw72  = 72.0;
  static const double raw96  = 96.0;
  static const double raw128 = 128.0;
}
```

### Line heights (unitless ratios — identical across all platforms)

Line heights are unitless because the W3C DTCG spec, CSS, Flutter (`height` property), and iOS/Android all support unitless ratios. No conversion needed.

```json
{
  "lineHeightRaw": {
    "10":  { "$value": 1.2,   "$type": "number" },
    "12":  { "$value": 1.333, "$type": "number" },
    "14":  { "$value": 1.428, "$type": "number" },
    "16":  { "$value": 1.5,   "$type": "number" },
    "18":  { "$value": 1.333, "$type": "number" },
    "20":  { "$value": 1.4,   "$type": "number" },
    "24":  { "$value": 1.333, "$type": "number" },
    "30":  { "$value": 1.2,   "$type": "number" },
    "36":  { "$value": 1.222, "$type": "number" },
    "48":  { "$value": 1.166, "$type": "number" },
    "54":  { "$value": 1.185, "$type": "number" },
    "60":  { "$value": 1.2,   "$type": "number" },
    "72":  { "$value": 1.111, "$type": "number" },
    "96":  { "$value": 1.125, "$type": "number" },
    "128": { "$value": 1.093, "$type": "number" }
  }
}
```

### Full scale reference

| Step | Source (px) | CSS output (rem) | Line Height | Letter Spacing | Tailwind |
|------|-------------|------------------|-------------|----------------|----------|
| 1 | `10px` | `0.625rem` | 1.2 | 0 | `text-[10px] leading-[1.2]` |
| 2 | `12px` | `0.75rem` | 1.333 | 0 | `text-xs leading-[1.333]` |
| 3 | `14px` | `0.875rem` | 1.428 | 0 | `text-sm leading-[1.428]` |
| 4 | `16px` | `1rem` | 1.5 | 0 | `text-base leading-normal` |
| 5 | `18px` | `1.125rem` | 1.333 | 0 | `text-lg leading-[1.333]` |
| 6 | `20px` | `1.25rem` | 1.4 | 0 | `text-xl leading-[1.4]` |
| 7 | `24px` | `1.5rem` | 1.333 | 0 | `text-2xl leading-[1.333]` |
| 8 | `30px` | `1.875rem` | 1.2 | -0.5px | `text-[30px] leading-[1.2]` |
| 9 | `36px` | `2.25rem` | 1.222 | -0.75px | `text-[36px] leading-[1.222]` |
| 10 | `48px` | `3rem` | 1.166 | -1px | `text-5xl leading-[1.166]` |
| 11 | `54px` | `3.375rem` | 1.185 | -1.25px | `text-[54px] leading-[1.185]` |
| 12 | `60px` | `3.75rem` | 1.2 | -1.5px | `text-[60px] leading-[1.2]` |
| 13 | `72px` | `4.5rem` | 1.111 | -1.75px | `text-[72px] leading-[1.111]` |
| 14 | `96px` | `6rem` | 1.125 | -2px | `text-[96px] leading-[1.125]` |
| 15 | `128px` | `8rem` | 1.093 | -2.5px | `text-[128px] leading-[1.093]` |

**Notes:**
- Designers and Flutter developers reference the **px values** — token names are identical (`fontSizeRaw16`).
- Web developers reference the **CSS custom properties** that Style Dictionary generates — they get `rem` output without hand-converting.
- Letter spacing stays in `px` everywhere (it's a fine-tuning value, not user-scalable).
- Negative letter-spacing on large sizes (30px+) creates optically balanced text.

---

## Style Variants

**16 named variants.** Each combines weight, font style, and text-decoration.

| # | Variant | Weight | Italic | Underline | Use Case |
|---|---------|--------|--------|-----------|----------|
| 1 | `normal` | 400 | — | — | Body text, default |
| 2 | `medium` | 500 | — | — | Labels, emphasis |
| 3 | `bold` | 700 | — | — | Headings |
| 4 | `italic` | 400 | ✓ | — | Emphasis, citations |
| 5 | `mediumItalic` | 500 | ✓ | — | Medium emphasis |
| 6 | `underline` | 400 | — | ✓ | Links (rare) |
| 7 | `mediumUnderline` | 500 | — | ✓ | Emphasized links |
| 8 | `boldUnderline` | 700 | — | ✓ | Strong links |
| 9 | `underlineItalic` | 400 | ✓ | ✓ | Stylistic (rare) |
| 10 | `mediumUnderItalic` | 500 | ✓ | ✓ | Stylistic (rare) |
| 11 | `light` | 300 | — | — | Subheadings, captions |
| 12 | `semibold` | 600 | — | — | Prominent labels, nav active |
| 13 | `lightItalic` | 300 | ✓ | — | Light emphasis |
| 14 | `semiboldItalic` | 600 | ✓ | — | Strong emphasis |
| 15 | `boldItalic` | 700 | ✓ | — | Strongest emphasis |
| 16 | `semiboldUnderline` | 600 | — | ✓ | Prominent links |

**Total combinations:** 15 sizes × 16 variants = **240 text styles**

### Referencing a Style

Pattern: `{role}/{variant}` e.g. `bodyMd/semibold`, `heading3/normal`, `displayXl/bold`

**CSS composite token pattern (W3C DTCG composite type):**
```css
/* Tier 2 — Semantic composite tokens */
--font16Semibold: {
  font-family: var(--fontFamilyDefault);
  font-size: var(--fontSizeRaw16);
  font-weight: var(--fontWeightSemibold);
  font-style: normal;
  text-decoration: none;
  line-height: var(--lineHeightRaw16);
  letter-spacing: 0;
}
```

---

## Letter Spacing

```css
/* Tier 1 — Primitive */
--letterSpacingRawTightest: -0.05em;
--letterSpacingRawTight:    -0.025em;
--letterSpacingRawNormal:   0;
--letterSpacingRawWide:     0.025em;
--letterSpacingRawWidest:   0.05em;

/* Tier 2 — Semantic */
--letterSpacingTightest: var(--letterSpacingRawTightest); /* 72px+ display */
--letterSpacingTight:    var(--letterSpacingRawTight);    /* 30–60px headings */
--letterSpacingNormal:   var(--letterSpacingRawNormal);   /* 10–24px body */
--letterSpacingWide:     var(--letterSpacingRawWide);     /* Small caps, uppercase */
--letterSpacingWidest:   var(--letterSpacingRawWidest);   /* Uppercase headings */
```

### Letter Spacing Rules

**By weight:**
- **Light (300):** Tight spacing (0 to -0.025em) — prevents letters from appearing disconnected
- **Regular/Medium (400–500):** Normal (0)
- **Semibold/Bold (600–700):** Slightly wider (+0.5px to +1px) — prevents crowding

**By size:**
- **10–20px:** Normal (0)
- **24–48px:** Slightly tight (-0.025em to -0.05em)
- **54px+:** Tight (-0.05em) — optical balance

**By case:**
- **Sentence case:** Normal (0)
- **ALL CAPS:** Wide (+0.025em to +0.05em) — improves legibility

---

## Line Height

```css
/* Tier 1 — Primitive */
--lineHeightRawTight:   1.2;
--lineHeightRawSnug:    1.35;
--lineHeightRawNormal:  1.5;
--lineHeightRawRelaxed: 1.75;

/* Tier 2 — Semantic */
--lineHeightTight:   var(--lineHeightRawTight);   /* Headings, UI elements */
--lineHeightSnug:    var(--lineHeightRawSnug);    /* Compact body, cards */
--lineHeightNormal:  var(--lineHeightRawNormal);  /* Body text (WCAG minimum) */
--lineHeightRelaxed: var(--lineHeightRawRelaxed); /* Long-form reading */
```

### Line Height Rules

**By content length:**
- **Short text (1–2 lines):** Tight (1.2–1.3)
- **Medium text (1–2 paragraphs):** Normal (1.4–1.5)
- **Long-form content:** Relaxed (1.5–1.75)

**By measure (line length):**
- **Short lines (<50 characters):** Can use tighter line-height (1.3)
- **Long lines (60–80 characters):** Need more line-height (1.5+)

**Accessibility minimum (WCAG 1.4.12):**
- Body text: **1.5× minimum**
- Headings: **1.2× minimum**

---

## Paragraph Spacing

```css
/* Tier 1 — Primitive */
--paragraphSpacingRawSm: 0.5em;
--paragraphSpacingRawMd: 1em;
--paragraphSpacingRawLg: 1.5em;

/* Tier 2 — Semantic */
--paragraphSpacingSm: var(--paragraphSpacingRawSm); /* Captions, small UI copy */
--paragraphSpacingMd: var(--paragraphSpacingRawMd); /* Standard — 1 blank line */
--paragraphSpacingLg: var(--paragraphSpacingRawLg); /* Editorial, emphasis */
```

**Never mix indent AND spacing** — choose one method per content area.

**WCAG guidance:** Minimum 0.5em between paragraphs, maximum 1.5em (more disrupts reading flow).

---

## Measure (Line Length)

```css
/* Tier 1 — Primitive */
--measureRawTight:  45ch;
--measureRawNormal: 65ch;
--measureRawWide:   80ch;

/* Tier 2 — Semantic */
--measureTight:  var(--measureRawTight);  /* Captions, sidebars */
--measureNormal: var(--measureRawNormal); /* Body text — OPTIMAL */
--measureWide:   var(--measureRawWide);   /* Max readable (WCAG 1.4.8) */
```

**Research-backed standards:**
- **Optimal:** 50–75 CPL (general consensus)
- **Perfect:** 66 CPL (Emil Ruder)
- **Maximum:** 80 CPL (WCAG 1.4.8)

**By device:**
- **Mobile (portrait):** 30–50 CPL
- **Tablet:** 50–65 CPL
- **Desktop:** 60–75 CPL
- **Large desktop (>1920px):** Must limit to 80ch max

**CSS:**
```css
.article-body {
  max-width: var(--measureNormal); /* 65ch */
  margin-inline: auto;
}
```

**Flutter:**
```dart
Container(
  constraints: BoxConstraints(maxWidth: 520), // ~65ch at 16px
  child: Text(content),
)
```

---

## Text Transform

```css
--textTransformNone:       none;       /* Default — sentence case */
--textTransformUppercase:  uppercase;  /* Acronyms only */
--textTransformLowercase:  lowercase;  /* URLs, email addresses */
--textTransformCapitalize: capitalize; /* Title case (rare) */
--textTransformSmallCaps:  small-caps; /* Subheadings (OpenType required) */
```

**Avoid ALL CAPS** except for: acronyms (ACKO, API, KYC), badge components, logo lockups.

**Why:** Screen readers may spell letter-by-letter; reading speed drops 10–20%; Hindi, Tamil, and Telugu have no uppercase concept.

---

## Text Alignment & RTL

```css
/* Tier 2 — Semantic */
--textAlignStart:   start;   /* Default for all text (LTR/RTL aware) */
--textAlignEnd:     end;     /* End-aligned, tables */
--textAlignCenter:  center;  /* Headings, hero copy (short only) */
/* justify is PROHIBITED — never use */
```

### RTL / Bidirectional Text

ACKO serves users who read in Hindi (Devanagari), Tamil, and Urdu (Arabic script — RTL). The system uses logical CSS properties throughout to support both LTR and RTL without overrides.

**Always use logical CSS properties:**

```css
/* ❌ Physical — breaks RTL */
margin-left: 1rem;
padding-right: 1.5rem;
text-align: left;

/* ✅ Logical — works for both LTR and RTL */
margin-inline-start: 1rem;
padding-inline-end: 1.5rem;
text-align: start;
```

**HTML lang attribute requirements:**

```html
<!-- Document level -->
<html lang="en">

<!-- Inline overrides -->
<span lang="hi">नमस्ते</span>        <!-- Hindi (LTR) -->
<span lang="ta">வணக்கம்</span>       <!-- Tamil (LTR) -->
<span lang="ur" dir="rtl">ہیلو</span> <!-- Urdu (RTL) -->
```

**RTL font considerations:**
- Euclid Circular B does not include Devanagari, Tamil, or Arabic glyphs.
- For Hindi/Tamil/Urdu text, the OS system font will take over via the fallback stack — this is expected and correct.
- Always test mixed-script layouts (English + Hindi) for bidirectional reflow.

**Alignment rules:**
- Use `start` / `end` — never `left` / `right` for alignment tokens.
- Center alignment: ONLY for short text (1–2 lines) — hero headings, card titles, modals. Never for body text.
- `justify` is **prohibited** in digital UI (creates whitespace rivers; breaks dyslexic users; unusable on narrow viewports).

---

## Paragraph Indent

```css
--paragraphIndentNone:     0;    /* Default — web convention */
--paragraphIndentStandard: 2em;  /* Long-form articles, blog posts */
--paragraphIndentLarge:    4em;  /* Quotations, pull quotes */
```

**Golden rule:** Never use indent AND spacing together — pick ONE method per content area.

---

## OpenType Features

Euclid Circular B supports OpenType features. Enable selectively based on context.

### Default Settings

```css
body {
  font-feature-settings:
    "kern" 1,   /* Kerning */
    "liga" 1,   /* Standard ligatures (fi, fl, ff) */
    "calt" 1,   /* Contextual alternates */
    "lnum" 1,   /* Lining figures */
    "zero" 0;   /* Slashed zero OFF */
}
```

### Context-Specific

```css
/* Tables, pricing, data */
.data-table { font-feature-settings: "tnum" 1; }

/* Code, technical IDs */
.code-block { font-feature-settings: "zero" 1; }

/* Editorial elegance */
.editorial { font-feature-settings: "onum" 1; }
```

| Feature | Code | Effect | When to Use |
|---------|------|--------|-------------|
| Kerning | `kern` | Optical letter spacing | Always ON |
| Ligatures | `liga` | Combines fi, fl, ff | Always ON |
| Contextual alternates | `calt` | Smart glyph substitution | Always ON |
| Lining figures | `lnum` | Numbers align to cap height | Default ON |
| Tabular numbers | `tnum` | Monospaced numbers | Tables, pricing |
| Old-style figures | `onum` | Lowercase-height numbers | Editorial |
| Slashed zero | `zero` | Distinguishes 0 from O | Code, specs |
| Small caps | `smcp` | True small capitals | Subheadings |

---

## Semantic Aliases

> **✅ THIS IS THE SECTION TO USE.** These are the tokens components reference. Find the role that matches what you're styling, then use the token name. The Size / Line Height / Weight columns describe what the token resolves to — they are not values to copy.
>
> **CSS:** `font: var(--ackoFontBodyMd);` (composite token applies family, size, weight, line-height, letter-spacing in one declaration)
> **Flutter:** `style: AckoTypography.bodyMd`
> **Figma:** Apply the matching text style by name

**Role-based tokens** — use these in components, never raw scale tokens.

**Reading the Size column:** Mobile and Desktop sizes are listed separately. Tablet values are in the [Responsive Typography](#responsive-typography) section. All values are documentation — don't copy them into code.

### Display (Hero Text)

| Alias | Mobile | Desktop | Line Height | Weight | Letter Spacing | Use |
|-------|--------|---------|-------------|--------|----------------|-----|
| `fontDisplayXl` | 36px | 72px | 1.111 | **600 semibold** | -1.75px | Primary marketing `<h1>` |
| `fontDisplayLg` | 30px | 60px | 1.2 | **300 light** | -1.5px | Section heroes |
| `fontDisplayMd` | 24px | 48px | 1.166 | 400 | -1px | Large headings |
| `fontDisplaySm` | 20px | 36px | 1.222 | 400 | -0.75px | Subheadings |

**Display XL vs LG:** The main hero `<h1>` is always semibold (600). `fontDisplayLg` stays light (300) — large section text reads as elegant at light weight.

### Headings

| Alias | Mobile | Desktop | Line Height | Weight | Use |
|-------|--------|---------|-------------|--------|-----|
| `fontHeading1` | 24px | 30px | 1.2 | 700 | Page title (H1) |
| `fontHeading2` | 20px | 24px | 1.333 | 700 | Section heading (H2) |
| `fontHeading3` | 18px | 20px | 1.4 | **600 semibold** | Subsection (H3) |
| `fontHeading4` | 16px | 18px | 1.333 | **600 semibold** | Card titles (H4) |
| `fontHeading5` | 14px | 16px | 1.5 | 500 | Small headings (H5) |
| `fontHeading6` | 12px | 14px | 1.428 | 500 | Tiny headings (H6) |

### Body Text

| Alias | Mobile | Desktop | Line Height | Weight | Use |
|-------|--------|---------|-------------|--------|-----|
| `fontBodyLg` | 16px | 18px | 1.333 | 400 | Lead paragraph, intro text |
| `fontBodyMd` | 14px | 16px | 1.5 | 400 | **Default body text** |
| `fontBodySm` | 12px | 14px | 1.428 | 400 | Secondary body, helper text |
| `fontBodyXs` | 10px | 12px | 1.333 | 400 | Fine print, legal copy |

### Labels

Fixed across all viewports — UI chrome doesn't scale with screen size.

| Alias | Mobile = Desktop | Line Height | Weight | Use |
|-------|-----------------|-------------|--------|-----|
| `fontLabelLg` | 14px | 1.428 | **600 semibold** | Form labels, section labels |
| `fontLabelMd` | 12px | 1.333 | **600 semibold** | Input labels, button text |
| `fontLabelSm` | 10px | 1.2 | 500 | Metadata, badges |

### Navigation

| Alias | Mobile | Desktop | Line Height | Weight | Use |
|-------|--------|---------|-------------|--------|-----|
| `fontNavDefault` | 12px | 14px | 1.428 | 400 | Inactive nav item |
| `fontNavActive` | 12px | 14px | 1.428 | **600 semibold** | Active/current page |
| `fontNavSmall` | 10px | 12px | 1.333 | 400 | Secondary nav, breadcrumbs |

### Code & Monospace

Fixed across all viewports.

| Alias | Mobile = Desktop | Font Family | Use |
|-------|-----------------|-------------|-----|
| `fontCode` | 14px | `fontFamilyMono` | Code snippets, IDs |
| `fontCodeSm` | 12px | `fontFamilyMono` | Inline code, policy numbers |

---

## Dark Mode Typography

**NEW SECTION** — Text rendering adjustments for dark backgrounds. Typography tokens themselves (size, weight, line height) do not change in dark mode. Only **color** and **font-smoothing** change.

### Font Smoothing

Light text on dark backgrounds renders thinner optically. Compensate:

```css
/* Light mode (default) */
:root {
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
}

/* Dark mode — antialiased reduces perceived weight */
@media (prefers-color-scheme: dark) {
  :root {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

### Dark Mode Text Colors — Handled by Semantics, Not Typography

**Important:** typography does NOT redefine text colors for dark mode. The semantic color layer (`colors-semantic.md`) already maps every text token to both light and dark values. Typography just references the semantic token by name — the value swaps automatically when the theme changes.

```css
/* ✅ Correct — reference the semantic token, theme handles light/dark */
.heading {
  color: var(--colorTextPrimary);
  /* In light theme: resolves to grey800
     In dark theme:  resolves to grey50
     Typography file does nothing — semantics owns this */
}

/* ❌ Wrong — duplicates dark-mode logic that semantics already owns */
.heading {
  color: var(--colorTextPrimary);
}
@media (prefers-color-scheme: dark) {
  .heading { color: var(--grey100); }  /* Bypasses semantic layer */
}
```

The dark-mode column for every text token is defined in `colors-semantic.md` under the **Text** section. See the [Color Integration](#color-integration) table below for the full mapping.

### Dark Mode Weight Adjustment

At very small sizes (10–12px), consider increasing weight by one step in dark mode (e.g. Regular → Medium) to compensate for antialiasing thinning:

```css
@media (prefers-color-scheme: dark) {
  .caption, .label-sm {
    font-weight: var(--fontWeightMedium); /* Bump from 400 → 500 */
  }
}
```

### Forced Colors (Windows High Contrast)

```css
@media (forced-colors: active) {
  /* Let the OS override — remove custom color, keep size/weight */
  body { color: CanvasText; background: Canvas; }
  a { color: LinkText; }
  :disabled { color: GrayText; }
}
```

---

## High-Contrast Mode

**NEW SECTION** — Required by WCAG 1.4.6 (Enhanced Contrast — Level AAA). Atlassian and Fluent 2 both ship dedicated high-contrast themes.

High-contrast mode is a **color-layer concern**, not a typography concern. Typography references semantic tokens by name; the high-contrast theme overrides the underlying primitive values without changing token names. The semantic file (`colors-semantic.md`) owns the high-contrast value mapping; typography inherits.

### Where high-contrast values live

```
colors-primitive.md  →  defines raw values
colors-semantic.md   →  maps each role to primitives per theme (light, dark, high-contrast)
typography.md        →  references --colorTextPrimary; never sets a value
```

### What typography contributes to high contrast

Three rules typography enforces regardless of color theme:

```css
/* Honor system forced-colors mode (Windows High Contrast, macOS Increase Contrast) */
@media (forced-colors: active) {
  body { color: CanvasText; background: Canvas; }
  a    { color: LinkText; }
  :disabled { color: GrayText; }
}

/* In any high-contrast theme, never use Light (300) weight at body sizes —
   it loses too much stroke weight against high-contrast backgrounds */
[data-theme="high-contrast"] [style*="font-weight: 300"],
[data-theme="high-contrast-dark"] [style*="font-weight: 300"] {
  font-weight: var(--fontWeightNormal); /* Force 400 minimum */
}

/* Honor user preference for higher contrast */
@media (prefers-contrast: more) {
  body { font-weight: var(--fontWeightMedium); }
}
```

### WCAG AAA contrast verification

These values are derived from `colors-primitive.md` and `colors-semantic.md`. If the primitive values change, this table must be regenerated.

| Semantic token | Light value (primitive) | Hex | Contrast on white | WCAG AAA |
|----------------|------------------------|-----|-------------------|----------|
| `--colorTextPrimary` | `grey800` | `#343434` | 12.6:1 | ✅ Pass |
| `--colorTextDefault` | `grey700` | `#505050` | 8.6:1 | ✅ Pass |
| `--colorTextSupporting` | `grey550` | `#7A7A7A` | 4.8:1 | ✅ Large text only |
| `--colorTextSecondary` | `grey450` | `#969696` | 3.0:1 | ❌ Use for non-text only |
| `--colorTextDisabled` | `grey350` | `#B2B2B2` | 1.9:1 | (Disabled — not subject to AA) |
| `--colorTextBrand` (= `--colorPrimary`) | `purple600` | `#6841E6` | 5.0:1 | ✅ Large text / AA only |
| `--colorTextError` | `red700` | `#B91C1C` | 5.9:1 | ✅ Large text only |
| `--colorTextSuccess` | `green700` | `#15803D` | 5.0:1 | ✅ Large text only |
| `--colorWarningText` | `orange700` | `#B65C0C` | 4.6:1 | ⚠️ Borderline — large text only |
| `--colorLink` | `purple600` | `#6841E6` | 5.0:1 | ✅ Large text / AA only |

**Action for AAA-strict contexts:** override `--colorTextBrand` / `--colorLink` to `purple800` (`#3A1BA5`, 9.7:1) at the theme layer. Typography stays unchanged.

---

## Density Variants

**NEW SECTION** — Compact, Comfortable, and Spacious density modes. Modeled after Material 3's density system and Atlassian's cozy/compact views.

Density affects **line height** and **paragraph spacing** — not font size.

```css
/* Default = Comfortable */
:root {
  --densityLineHeightMultiplier: 1;
  --densitySpacingMultiplier:    1;
}

/* Compact — dashboards, data-heavy UIs */
.density-compact {
  --densityLineHeightMultiplier: 0.85;
  --densitySpacingMultiplier:    0.75;
}

/* Spacious — editorial, reading, accessibility preference */
.density-spacious {
  --densityLineHeightMultiplier: 1.15;
  --densitySpacingMultiplier:    1.5;
}
```

**Usage in components:**
```css
.card-body {
  line-height: calc(var(--lineHeightNormal) * var(--densityLineHeightMultiplier));
  margin-block-end: calc(var(--paragraphSpacingMd) * var(--densitySpacingMultiplier));
}
```

**Rules:**
- Font size is NEVER altered by density — only spacing and line height.
- Minimum line height in compact mode: 1.2 (WCAG heading minimum).
- Minimum line height in compact body text: 1.35 (below WCAG 1.5 — use only for single-line UI labels, never flowing paragraphs).
- Density preference should be persisted in user settings.

---

## Motion & Text Animation

**NEW SECTION** — Text entrance/exit animation tokens. Modeled after Material 3 motion tokens and Fluent 2 motion guidelines.

```css
/* Tier 1 — Primitive motion tokens */
--motionDurationFast:   150ms;
--motionDurationNormal: 250ms;
--motionDurationSlow:   400ms;

--motionEaseStandard:  cubic-bezier(0.2, 0, 0, 1);   /* M3 standard */
--motionEaseEmphasized: cubic-bezier(0.05, 0.7, 0.1, 1); /* M3 emphasized */
--motionEaseDecelerate: cubic-bezier(0, 0, 0, 1);    /* Entering elements */
--motionEaseAccelerate: cubic-bezier(0.3, 0, 1, 1);  /* Exiting elements */

/* Tier 2 — Semantic text transition tokens */
--fontTransitionColor:     color var(--motionDurationFast) var(--motionEaseStandard);
--fontTransitionOpacity:   opacity var(--motionDurationNormal) var(--motionEaseDecelerate);
--fontTransitionTransform: transform var(--motionDurationNormal) var(--motionEaseEmphasized);
```

### Text Animation Patterns

**Fade in (content loading):**
```css
.text-enter {
  opacity: 0;
  animation: fadeIn var(--motionDurationNormal) var(--motionEaseDecelerate) forwards;
}
@keyframes fadeIn {
  to { opacity: 1; }
}
```

**Slide up (hero text):**
```css
.text-hero-enter {
  opacity: 0;
  transform: translateY(0.5rem);
  animation: slideUp var(--motionDurationSlow) var(--motionEaseEmphasized) forwards;
}
@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}
```

**Color transition (interactive labels):**
```css
.nav-item {
  transition: var(--fontTransitionColor);
}
```

### Motion Safety

```css
/* ALWAYS wrap animations in prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Rules:**
- Text animations must not exceed 400ms (feels sluggish on slower devices).
- Never animate `font-size` directly — it causes reflow. Animate `transform: scale()` instead.
- Always respect `prefers-reduced-motion: reduce`.
- Motion is decoration — content must be readable without animation.

---

## Responsive Typography

Three breakpoints. Every semantic alias has one explicit size per breakpoint — no fluid scaling, no ranges.

| Breakpoint | Prefix | Viewport |
|------------|--------|----------|
| **Mobile** | default (no media query) | < 768px |
| **Tablet** | `@media (min-width: 768px)` | 768px – 1023px |
| **Desktop** | `@media (min-width: 1024px)` | ≥ 1024px |

---

### Display

| Alias | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `fontDisplayXl` | 36px | 54px | 72px |
| `fontDisplayLg` | 30px | 48px | 60px |
| `fontDisplayMd` | 24px | 36px | 48px |
| `fontDisplaySm` | 20px | 30px | 36px |

### Headings

| Alias | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `fontHeading1` | 24px | 28px | 30px |
| `fontHeading2` | 20px | 22px | 24px |
| `fontHeading3` | 18px | 18px | 20px |
| `fontHeading4` | 16px | 16px | 18px |
| `fontHeading5` | 14px | 14px | 16px |
| `fontHeading6` | 12px | 12px | 14px |

### Body Text

| Alias | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `fontBodyLg` | 16px | 16px | 18px |
| `fontBodyMd` | 14px | 14px | 16px |
| `fontBodySm` | 12px | 12px | 14px |
| `fontBodyXs` | 10px | 10px | 12px |

### Labels

Labels are UI elements — they don't change with viewport.

| Alias | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `fontLabelLg` | 14px | 14px | 14px |
| `fontLabelMd` | 12px | 12px | 12px |
| `fontLabelSm` | 10px | 10px | 10px |

### Navigation

| Alias | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `fontNavDefault` | 12px | 14px | 14px |
| `fontNavActive` | 12px | 14px | 14px |
| `fontNavSmall` | 10px | 12px | 12px |

### Code & Monospace

Code doesn't scale — it is always the same size.

| Alias | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `fontCode` | 14px | 14px | 14px |
| `fontCodeSm` | 12px | 12px | 12px |

---

### CSS token implementation

The responsive values above map directly to CSS token overrides per breakpoint. The component never changes — only the token value swaps.

```css
/* ── Mobile (default) ── */
:root {
  /* Display */
  --ackoFontDisplayXlSize: var(--ackoFontSizeRaw36);
  --ackoFontDisplayLgSize: var(--ackoFontSizeRaw30);
  --ackoFontDisplayMdSize: var(--ackoFontSizeRaw24);
  --ackoFontDisplaySmSize: var(--ackoFontSizeRaw20);

  /* Headings */
  --ackoFontHeading1Size: var(--ackoFontSizeRaw24);
  --ackoFontHeading2Size: var(--ackoFontSizeRaw20);
  --ackoFontHeading3Size: var(--ackoFontSizeRaw18);
  --ackoFontHeading4Size: var(--ackoFontSizeRaw16);
  --ackoFontHeading5Size: var(--ackoFontSizeRaw14);
  --ackoFontHeading6Size: var(--ackoFontSizeRaw12);

  /* Body */
  --ackoFontBodyLgSize: var(--ackoFontSizeRaw16);
  --ackoFontBodyMdSize: var(--ackoFontSizeRaw14);
  --ackoFontBodySmSize: var(--ackoFontSizeRaw12);
  --ackoFontBodyXsSize: var(--ackoFontSizeRaw10);

  /* Navigation */
  --ackoFontNavDefaultSize: var(--ackoFontSizeRaw12);
  --ackoFontNavActiveSize:  var(--ackoFontSizeRaw12);
  --ackoFontNavSmallSize:   var(--ackoFontSizeRaw10);

  /* Labels — fixed across all breakpoints */
  --ackoFontLabelLgSize: var(--ackoFontSizeRaw14);
  --ackoFontLabelMdSize: var(--ackoFontSizeRaw12);
  --ackoFontLabelSmSize: var(--ackoFontSizeRaw10);

  /* Code — fixed across all breakpoints */
  --ackoFontCodeSize:   var(--ackoFontSizeRaw14);
  --ackoFontCodeSmSize: var(--ackoFontSizeRaw12);
}

/* ── Tablet (768px+) ── */
@media (min-width: 768px) {
  :root {
    /* Display */
    --ackoFontDisplayXlSize: var(--ackoFontSizeRaw54);
    --ackoFontDisplayLgSize: var(--ackoFontSizeRaw48);
    --ackoFontDisplayMdSize: var(--ackoFontSizeRaw36);
    --ackoFontDisplaySmSize: var(--ackoFontSizeRaw30);

    /* Headings */
    --ackoFontHeading1Size: var(--ackoFontSizeRaw28);
    --ackoFontHeading2Size: var(--ackoFontSizeRaw22);
    --ackoFontHeading3Size: var(--ackoFontSizeRaw18);
    --ackoFontHeading4Size: var(--ackoFontSizeRaw16);
    --ackoFontHeading5Size: var(--ackoFontSizeRaw14);
    --ackoFontHeading6Size: var(--ackoFontSizeRaw12);

    /* Body */
    --ackoFontBodyLgSize: var(--ackoFontSizeRaw16);
    --ackoFontBodyMdSize: var(--ackoFontSizeRaw14);
    --ackoFontBodySmSize: var(--ackoFontSizeRaw12);
    --ackoFontBodyXsSize: var(--ackoFontSizeRaw10);

    /* Navigation */
    --ackoFontNavDefaultSize: var(--ackoFontSizeRaw14);
    --ackoFontNavActiveSize:  var(--ackoFontSizeRaw14);
    --ackoFontNavSmallSize:   var(--ackoFontSizeRaw12);
  }
}

/* ── Desktop (1024px+) ── */
@media (min-width: 1024px) {
  :root {
    /* Display */
    --ackoFontDisplayXlSize: var(--ackoFontSizeRaw72);
    --ackoFontDisplayLgSize: var(--ackoFontSizeRaw60);
    --ackoFontDisplayMdSize: var(--ackoFontSizeRaw48);
    --ackoFontDisplaySmSize: var(--ackoFontSizeRaw36);

    /* Headings */
    --ackoFontHeading1Size: var(--ackoFontSizeRaw30);
    --ackoFontHeading2Size: var(--ackoFontSizeRaw24);
    --ackoFontHeading3Size: var(--ackoFontSizeRaw20);
    --ackoFontHeading4Size: var(--ackoFontSizeRaw18);
    --ackoFontHeading5Size: var(--ackoFontSizeRaw16);
    --ackoFontHeading6Size: var(--ackoFontSizeRaw14);

    /* Body */
    --ackoFontBodyLgSize: var(--ackoFontSizeRaw18);
    --ackoFontBodyMdSize: var(--ackoFontSizeRaw16);
    --ackoFontBodySmSize: var(--ackoFontSizeRaw14);
    --ackoFontBodyXsSize: var(--ackoFontSizeRaw12);

    /* Navigation */
    --ackoFontNavDefaultSize: var(--ackoFontSizeRaw14);
    --ackoFontNavActiveSize:  var(--ackoFontSizeRaw14);
    --ackoFontNavSmallSize:   var(--ackoFontSizeRaw12);
  }
}
```

**Note on 28px and 22px:** `fontHeading1` and `fontHeading2` use intermediate sizes at tablet (28px, 22px) that aren't in the primitive scale. Add `--ackoFontSizeRaw28: 28px` and `--ackoFontSizeRaw22: 22px` to `tokens/typography.json` if these breakpoints are used. Alternatively, round to the nearest existing step (24px, 20px) if you prefer to keep the scale minimal.

### Flutter implementation

In Flutter, breakpoints are handled with `LayoutBuilder` or `MediaQuery`. The same token values apply — mobile/tablet/desktop — passed as the `fontSize` of a `TextStyle`.

```dart
TextStyle responsiveHeading1(BuildContext context) {
  final width = MediaQuery.of(context).size.width;
  double size;
  if (width >= 1024) {
    size = 30; // desktop
  } else if (width >= 768) {
    size = 28; // tablet
  } else {
    size = 24; // mobile
  }
  return AckoTypography.heading1.copyWith(fontSize: size);
}
```

### Rules

- **Weight and line height never change** between breakpoints — only `font-size`.
- **Labels and code are fixed** — they are UI chrome, not reading content. No breakpoint overrides needed.
- **Body text is conservative** — 14px on mobile keeps text readable in compact layouts; 16px on desktop takes advantage of wider screens and longer lines.
- **Display sizes drop significantly on mobile** — 72px on desktop becomes 36px on mobile (half). This is intentional; large display text on a 375px screen would leave no space for anything else.
- **Components never read the breakpoint** — they use the token. The token resolves to the right size for the current viewport automatically.

---

## Accessibility (WCAG Compliance)

### WCAG 2.1 Contrast Requirements

**Normal text (< 18.66px or < 14pt bold):**
- Level AA (minimum): 4.5:1
- Level AAA (enhanced): 7:1

**Large text (≥ 18.66px or ≥ 14pt bold):**
- Level AA: 3:1
- Level AAA: 4.5:1

### ACKO Text Color Validation (light background #FFFFFF)

All hex values verified against `colors-primitive.md`. All token names verified against `colors-semantic.md`.

| Semantic Token | Resolves to | Hex | Contrast | AA Normal | AAA Normal |
|----------------|-------------|-----|----------|-----------|------------|
| `--colorTextPrimary` | `grey800` | `#343434` | 12.6:1 | ✅ | ✅ |
| `--colorTextDefault` | `grey700` | `#505050` | 8.6:1 | ✅ | ✅ |
| `--colorTextSupporting` | `grey550` | `#7A7A7A` | 4.8:1 | ✅ | ❌ (large only) |
| `--colorTextSecondary` | `grey450` | `#969696` | 3.0:1 | ❌ | ❌ (non-text only) |
| `--colorTextBrand` (= `--colorPrimary`) | `purple600` | `#6841E6` | 5.0:1 | ✅ | ❌ (large only) |
| `--colorTextError` | `red700` | `#B91C1C` | 5.9:1 | ✅ | ❌ (large only) |
| `--colorTextSuccess` | `green700` | `#15803D` | 5.0:1 | ✅ | ❌ (large only) |
| `--colorWarningText` | `orange700` | `#B65C0C` | 4.6:1 | ✅ | ❌ (large only) |
| `--colorLink` | `purple600` | `#6841E6` | 5.0:1 | ✅ | ❌ (large only) |

**For AAA compliance at body sizes:** the theme layer should remap `--colorTextBrand` and `--colorLink` to `purple800` (`#3A1BA5`, 9.7:1) — this is a *color* change, not a typography change.

**Action:** Use `purple700` (not `purple600`) for body-size brand text to achieve AAA.

### WCAG 1.4.4: Resize Text

All CSS font sizes ship as `rem` — generated automatically from the px source tokens by Style Dictionary. This means user browser font-size preferences scale the entire UI without designers or developers managing rem math.

```css
/* ❌ Bad — ignores browser zoom (hand-written px in a stylesheet) */
font-size: 16px;

/* ✅ Good — generated from token, respects browser font-size */
font-size: var(--ackoFontBodyMdSize); /* outputs 1rem */
```

**Web rule:** Never hand-write typography values in a stylesheet — always reference a CSS variable. Add a stylelint rule to enforce this across all typography properties:

```json
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "font-size":     ["/^\\d/", "/px$/"],
      "font-weight":   ["/^\\d+$/"],
      "line-height":   ["/^\\d/", "/px$/"],
      "letter-spacing": ["/^-?\\d.*px$/", "/^-?\\d.*em$/"]
    },
    "declaration-property-unit-allowed-list": {
      "font-size": ["rem", "em", "%"]
    },
    "color-no-hex": [true, {
      "message": "Use a semantic color token (var(--colorText*)) instead of a hex value."
    }]
  }
}
```

This blocks `font-size: 16px`, `font-weight: 600`, `line-height: 1.5`, `letter-spacing: -0.5px`, and `color: #B91C1C` — forcing the developer (or AI agent) to use tokens.

**Mobile platforms:** Flutter, iOS, and Android consume px values directly — they handle accessibility scaling at the OS level (Dynamic Type, font scale).

Test at 200% zoom in Chrome, Firefox, and Safari. Ensure no text overflow or hidden content.

### WCAG 1.4.8: Visual Presentation

| Requirement | ACKO Value | Status |
|-------------|-----------|--------|
| Max line length | `65ch` | ✅ (under 80ch) |
| Body line height | 1.5 | ✅ |
| Paragraph spacing | `1em` | ✅ |
| Letter spacing | Adjustable | ✅ |

### WCAG 1.4.12: Text Spacing

Content must not be lost when users set:
- Line height to 1.5× font size
- Paragraph spacing to 2× font size
- Letter spacing to 0.12× font size
- Word spacing to 0.16× font size

**Test with the bookmarklet:** [Text Spacing Editor](https://www.html5accessibility.com/tests/tsbookmarklet.html)

### Screen Reader Accessibility

**ALL CAPS:** Avoid — screen readers may spell letter-by-letter. Use sentence case; apply `text-transform: uppercase` via CSS if visual uppercase is needed.

**Abbreviations:**
```html
<abbr title="Know Your Customer">KYC</abbr>
```

**Language tags:**
```html
<span lang="hi">आधार</span>
<span lang="ta">தமிழ்</span>
<span lang="ur" dir="rtl">اردو</span>
```

### Dynamic Type Support (Apple Platforms)

On iOS/iPadOS, support Dynamic Type to respect user font-size preferences:

```swift
// SwiftUI
Text("Policy Details")
    .font(.body) // Uses system Dynamic Type

// UIKit
label.font = UIFont.preferredFont(forTextStyle: .body)
label.adjustsFontForContentSizeCategory = true
```

Minimum font size at the smallest Dynamic Type setting: **11pt** (Apple HIG requirement).

---

## Flutter Implementation

### AckoTypography Class

```dart
class AckoTypography {
  static const String fontFamily = 'Euclid Circular B';

  // Font weights
  static const FontWeight light    = FontWeight.w300;
  static const FontWeight regular  = FontWeight.w400;
  static const FontWeight medium   = FontWeight.w500;
  static const FontWeight semibold = FontWeight.w600;
  static const FontWeight bold     = FontWeight.w700;

  // Display
  static const TextStyle displayXl = TextStyle(
    fontFamily: fontFamily,
    fontSize: 72,
    height: 1.111,
    letterSpacing: -1.75,
    fontWeight: semibold,
    color: AckoColors.textPrimary,
  );

  static const TextStyle displayLg = TextStyle(
    fontFamily: fontFamily,
    fontSize: 60,
    height: 1.2,
    letterSpacing: -1.5,
    fontWeight: light,
    color: AckoColors.textPrimary,
  );

  // Headings
  static const TextStyle heading1 = TextStyle(
    fontFamily: fontFamily,
    fontSize: 30,
    height: 1.2,
    letterSpacing: -0.5,
    fontWeight: bold,
    color: AckoColors.textPrimary,
  );

  static const TextStyle heading2 = TextStyle(
    fontFamily: fontFamily,
    fontSize: 24,
    height: 1.333,
    letterSpacing: 0,
    fontWeight: bold,
    color: AckoColors.textPrimary,
  );

  static const TextStyle heading3 = TextStyle(
    fontFamily: fontFamily,
    fontSize: 20,
    height: 1.4,
    letterSpacing: 0,
    fontWeight: semibold,
    color: AckoColors.textPrimary,
  );

  static const TextStyle heading4 = TextStyle(
    fontFamily: fontFamily,
    fontSize: 18,
    height: 1.333,
    letterSpacing: 0,
    fontWeight: semibold,
    color: AckoColors.textPrimary,
  );

  // Body
  static const TextStyle bodyLg = TextStyle(
    fontFamily: fontFamily,
    fontSize: 18,
    height: 1.333,
    letterSpacing: 0,
    fontWeight: regular,
    color: AckoColors.textDefault,
  );

  static const TextStyle bodyMd = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 1.5,
    letterSpacing: 0,
    fontWeight: regular,
    color: AckoColors.textDefault,
  );

  static const TextStyle bodySm = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.428,
    letterSpacing: 0,
    fontWeight: regular,
    color: AckoColors.textDefault,
  );

  static const TextStyle bodyXs = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    height: 1.333,
    letterSpacing: 0,
    fontWeight: regular,
    color: AckoColors.textDefault,
  );

  // Labels
  static const TextStyle labelLg = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.428,
    letterSpacing: 0,
    fontWeight: semibold,
    color: AckoColors.textDefault,
  );

  static const TextStyle labelMd = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    height: 1.333,
    letterSpacing: 0,
    fontWeight: semibold,
    color: AckoColors.textDefault,
  );

  static const TextStyle labelSm = TextStyle(
    fontFamily: fontFamily,
    fontSize: 10,
    height: 1.2,
    letterSpacing: 0,
    fontWeight: medium,
    color: AckoColors.textDefault,
  );
}
```

### Flutter-Specific Considerations

**Line height:** `height` in Flutter = unitless ratio (not px). Example: 24px on 16px text = `height: 1.5`.

**Letter spacing:** Specified in logical pixels. Negative values allowed for large text.

**Dark mode:** Flutter uses `ThemeData` to swap color values per brightness — same semantic name, different value. The `*Dark` suffix pattern is **not used** anywhere in this system; tokens resolve through the theme.

```dart
// ✅ Correct — let Theme resolve the color
Text('Heading', style: AckoTypography.heading1.copyWith(
  color: Theme.of(context).extension<AckoColors>()!.textPrimary,
));

// AckoColors is registered as a ThemeExtension with separate light/dark instances:
// MaterialApp(
//   theme:     ThemeData(extensions: [AckoColors.light]),
//   darkTheme: ThemeData(extensions: [AckoColors.dark]),
// )
// — same field name (.textPrimary), different resolved value per theme.
```

**No hover states:** Mobile has no hover — use tap states only via `InkWell` ripple.

**Touch targets:** Interactive text (buttons, links) needs minimum 48×48 dp.

**Dynamic type (accessibility):**
```dart
// Respect user font scale
Text(
  'Hello',
  style: AckoTypography.bodyMd.copyWith(
    fontSize: AckoTypography.bodyMd.fontSize! *
      MediaQuery.of(context).textScaler.scale(1.0),
  ),
)
```

**Font loading (`pubspec.yaml`):**
```yaml
flutter:
  fonts:
    - family: Euclid Circular B
      fonts:
        - asset: fonts/EuclidCircularB-Light.ttf
          weight: 300
        - asset: fonts/EuclidCircularB-LightItalic.ttf
          weight: 300
          style: italic
        - asset: fonts/EuclidCircularB-Regular.ttf
          weight: 400
        - asset: fonts/EuclidCircularB-RegularItalic.ttf
          weight: 400
          style: italic
        - asset: fonts/EuclidCircularB-Medium.ttf
          weight: 500
        - asset: fonts/EuclidCircularB-MediumItalic.ttf
          weight: 500
          style: italic
        - asset: fonts/EuclidCircularB-Semibold.ttf
          weight: 600
        - asset: fonts/EuclidCircularB-SemiboldItalic.ttf
          weight: 600
          style: italic
        - asset: fonts/EuclidCircularB-Bold.ttf
          weight: 700
        - asset: fonts/EuclidCircularB-BoldItalic.ttf
          weight: 700
          style: italic
```

---

## Color Integration

Typography tokens are **color-agnostic** — they define size, weight, line height, and spacing only. Components combine a typography role with a semantic color token from `colors-semantic.md`. The color theme (light / dark / high-contrast) swaps values at the semantic layer; typography stays the same.

### Text → Semantic color mapping

Every typography role has a recommended default semantic color. The values below come from `colors-semantic.md` — this table is a reference, not a redeclaration. If `colors-semantic.md` changes, that's the source of truth.

| Typography role | Semantic token | Light resolves to | Dark resolves to |
|------------------|----------------|-------------------|------------------|
| Headings (display, h1–h6) | `--colorTextPrimary` | `grey800` | `grey50` |
| Body text (default) | `--colorTextDefault` | `grey700` | `grey100` |
| Supporting text | `--colorTextSupporting` | `grey550` | `grey200` |
| Secondary / placeholder | `--colorTextSecondary` | `grey450` | `grey350` |
| Disabled | `--colorTextDisabled` | `grey350` | `grey450` |
| On colored fill (e.g. button) | `--colorTextInvert` | `greyWhite` | `greyWhite` |
| Static (fixed across themes) | `--colorTextStatic` | `greyWhite` | `greyWhite` |
| Brand emphasis | `--colorTextBrand` *(aliases `--colorPrimary`)* | `purple600` | `purple500` |
| Links | `--colorLink` | `purple600` | `purple400` |
| Link hover | `--colorLinkHover` | `purple700` | `purple300` |
| Error messages | `--colorTextError` | `red700` | `red400` |
| Success messages | `--colorTextSuccess` | `green700` | `green400` |
| Warning messages | `--colorWarningText` | `orange700` | `orange400` |

### Token name corrections (vs. earlier drafts of this file)

| Was (incorrect) | Now (matches `colors-semantic.md`) |
|-----------------|------------------------------------|
| `--colorLinkDefault` | `--colorLink` |
| `--colorTextWarning` | `--colorWarningText` |
| `--colorTextPrimaryDark` (and other `*Dark` suffix tokens) | Removed — semantics handle dark mode via theme swap, not duplicate tokens |

### Usage

```css
/* ✅ Correct — semantic name, theme-agnostic */
.heading {
  font-size: var(--fontHeading2Size);
  font-weight: var(--fontWeightBold);
  line-height: var(--lineHeightTight);
  color: var(--colorTextPrimary);
  /* Light theme: text renders as grey800 (#343434)
     Dark theme:  text renders as grey50  (#FBFBFB)
     Component CSS doesn't change. */
}

.body-text {
  font-size: var(--fontBodyMdSize);
  font-weight: var(--fontWeightNormal);
  line-height: var(--lineHeightNormal);
  color: var(--colorTextDefault);
}

.label {
  font-size: var(--fontLabelLgSize);
  font-weight: var(--fontWeightSemibold);
  line-height: var(--lineHeightSnug);
  color: var(--colorTextDefault);
}

.error-message {
  font-size: var(--fontBodySmSize);
  font-weight: var(--fontWeightMedium);
  color: var(--colorTextError); /* Not colorErrorText — that was removed in semantic v2 */
}

.inline-link {
  color: var(--colorLink); /* Not colorLinkDefault — that token doesn't exist */
}

.inline-link:hover {
  color: var(--colorLinkHover);
}
```

### Rules

1. **Never invent a color token in typography.** If you need a text color, it must already exist in `colors-semantic.md`. If it doesn't, request it from the design system team — don't define it locally.
2. **Never hardcode a hex in typography.** All color values come from primitives via semantic aliases.
3. **Never reference primitives directly** (`grey800`, `purple600`). Always go through the semantic layer.
4. **Never define `*Dark` suffix tokens.** Dark mode is handled by `[data-theme="dark"]` overrides in `colors-semantic.md` — the token name stays the same, the value swaps.

---

## Tooling & Export

**NEW SECTION** — How to transform these tokens into platform-specific formats.

### W3C Design Token Community Group Format (2025.10)

This system is compliant with the [W3C DTCG Format 2025.10](https://www.designtokens.org/tr/drafts/format/). Typography composite tokens are expressed as:

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "font": {
    "body": {
      "md": {
        "$type": "typography",
        "$value": {
          "fontFamily": "{font.family.primary}",
          "fontSize": "1rem",
          "fontWeight": 400,
          "lineHeight": 1.5,
          "letterSpacing": "0"
        },
        "$description": "Default body text"
      }
    }
  }
}
```

### Style Dictionary Configuration

[Style Dictionary](https://amzn.github.io/style-dictionary/) transforms tokens into CSS, iOS Swift, Android XML, and Flutter Dart in one pipeline.

See the canonical config in [Unit Policy → Style Dictionary configuration](#unit-policy). Key points:

- **CSS platform** uses `name/cti/camel` (not the default `kebab`) so output reads `--ackoFontBodyMdSize` — identical to the token name across every other platform.
- **CSS platform** runs `size/pxToRem` so all font sizes ship as `rem` for WCAG 1.4.4 zoom support.
- **Flutter platform** consumes px values directly as Dart `double` (logical pixels).
- **iOS platform** treats px as points (1:1 ratio).
- **Android platform** runs `size/pxToSp` so font sizes use `sp` units (respects user accessibility scale).

```js
// Example platform block (see Unit Policy section for full config)
css: {
  transforms: [
    'attribute/cti',
    'name/cti/camel',  // camelCase output
    'size/pxToRem',    // px → rem for fonts
    'color/css'
  ],
  prefix: 'acko',
  buildPath: 'dist/css/',
  files: [{ destination: 'typography.css', format: 'css/variables' }]
}
```

### Figma Integration

- Use **Tokens Studio for Figma** (formerly Figma Tokens) to sync JSON tokens with Figma variables.
- Typography tokens map to Figma **Text Styles** and **Variables** (string type for font family, number for size/weight).
- Set up a GitHub Actions CI/CD pipeline to auto-export tokens on merge to `main`.

### Token Versioning

Follow semantic versioning (`major.minor.patch`):
- **Major:** Breaking token renames or removals
- **Minor:** New tokens added
- **Patch:** Value corrections, documentation fixes

Announce deprecations at least one major version in advance. Deprecated tokens should be aliased to their replacements before removal.

---

## Implementation Checklist

### For Designers

- [ ] Use semantic aliases in Figma text styles — never raw scale values
- [ ] Set max-width constraints on text frames (`65ch` equivalent in Figma)
- [ ] Apply density-appropriate line heights
- [ ] Validate contrast ratios in both light AND dark mode (use Stark or Contrast plugin)
- [ ] Use `start`/`end` alignment — never `left`/`right` — in auto layout
- [ ] Test with Hindi, Tamil, and Urdu text placeholder content
- [ ] Review all text against WCAG AA in both themes

### For Developers (Web)

- [ ] Load Euclid Circular B from CDN (all 10 font files as `.woff2`)
- [ ] Consume the generated `acko-*` CSS custom properties — never hand-write `font-size: 16px`
- [ ] Add stylelint rule blocking `px` on `font-size` (forces use of generated `rem` vars)
- [ ] Run `style-dictionary build` in CI on every token change
- [ ] Implement measure limits (`max-width: 65ch`)
- [ ] Enable OpenType features (`font-feature-settings`)
- [ ] Implement dark mode token overrides via `@media (prefers-color-scheme: dark)`
- [ ] Implement high-contrast mode class
- [ ] Use logical CSS properties (`margin-inline-start`, `text-align: start`)
- [ ] Add `lang` attribute for Hindi, Tamil, Urdu text spans
- [ ] Add `dir="rtl"` for Urdu text spans
- [ ] Wrap all animations in `@media (prefers-reduced-motion: reduce)`
- [ ] Test at 200% zoom (WCAG 1.4.4)
- [ ] Validate contrast with axe DevTools

### For Developers (Flutter)

- [ ] Add all 10 Euclid Circular B font files to `pubspec.yaml`
- [ ] Define `AckoTypography` class with all styles
- [ ] Implement dark mode with `ThemeData.brightness`
- [ ] Respect `textScaler` for accessibility scaling
- [ ] Implement touch target sizes (48×48 dp minimum)
- [ ] Add `Semantics` labels for screen reader support
- [ ] Test on multiple screen densities (1x, 2x, 3x)

### Testing

- [ ] Visual regression tests for all 240 text styles (light + dark = 480 renders)
- [ ] Accessibility audit (contrast, zoom, screen readers)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile testing (iOS, Android, various screen sizes)
- [ ] RTL layout test with Urdu content
- [ ] Localization testing (Hindi, Tamil, English, Urdu)
- [ ] Forced colors test (Windows High Contrast mode)
- [ ] Reduced motion test
- [ ] Density variant test (compact, comfortable, spacious)

---

## Changelog

### v3.5.0 (2026-05-12)

**Responsive typography replaced with explicit per-alias breakpoint mapping. No clamp(), no ranges.**

**Changed:**
- Responsive Typography section fully rewritten. Previous version had two partial examples (body and display only), a fluid `clamp()` section, and bullet-point rules. Replaced with complete mapping tables — every alias, every breakpoint, one px value per cell. Nothing to interpret.
- Semantic Aliases tables updated — Size column now shows Mobile / Desktop instead of a single desktop-only value. Readers see the actual values per viewport for each token.
- Labels and Code tables now explicitly note they are fixed across all viewports (no breakpoint changes needed).
- CSS implementation block now covers all aliases across all three breakpoints in one place.
- Flutter responsive implementation example added.

**Removed:**
- Fluid typography (`clamp()`) — not needed, adds complexity and inconsistency.
- "Responsive Rules" bullet list — replaced by concrete mapping tables.

### v3.4.0 (2026-05-12)

**Hardened against AI agents and developers inlining hardcoded values.**

Real-world feedback: an AI coding agent reading the previous version inlined raw `font-size: 16px` and `font-weight: 600` values into components instead of using token names. Root cause: the document read as *educational reference* (with tables full of px/rem values shown for context) rather than *enforceable rules*. Fixed by reordering and reframing how agents encounter the file.

**Added:**
- **Top-of-document mandatory rules block** (before everything else, even the introduction). Four numbered rules in blockquote format that agents read first: never hardcode values, tokens are the only source, use semantic aliases not primitives, numbers below are documentation only.
- **Wrong vs. correct comparison table** at the top showing concrete violations and their fixes for CSS, Flutter, and color tokens.
- **"Decision flow for AI agents"** — explicit step-by-step: find role → use semantic alias → if none fits, STOP and ask.
- **Single-line summary** at the end of the rules block: "If you are typing a number or a hex code into typography-related CSS/Dart/Swift, you are doing it wrong."
- **Reference-only warnings** at the top of [Type Scale](#type-scale) and [Semantic Aliases](#semantic-aliases) sections — sections most likely to be misread as "values to copy."
- **Frontmatter `enforcement` block** — declares the violation patterns explicitly so tools that parse frontmatter (Cursor rules, linters, agent configs) pick them up automatically.
- **Frontmatter `priority: highest`** and `alwaysApply: true` — signals to agent frameworks that this file's rules dominate.
- **Frontmatter `description` rewritten** as a load-bearing instruction (multi-line YAML) rather than a passive summary. Now reads: "MUST use token names...NEVER hardcoded values...If no token fits, STOP and ask."
- **Frontmatter `globs` expanded** to cover `.ts`, `.jsx`, `.js`, `.swift`, `.kt` — so the rules trigger on every relevant file type, not just CSS/TSX/Dart/JSON.

**Changed:**
- Stylelint config in WCAG 1.4.4 section expanded from one rule (`font-size` unit) to four rules covering `font-size`, `font-weight`, `line-height`, `letter-spacing`, and a `color-no-hex` rule for text colors. Now blocks the full set of common violations, not just unit issues.

**Why this works:** AI agents (Cursor, Copilot, Claude, etc.) read frontmatter and top-of-file content with the highest weight. By making the first thing they encounter a numbered rules block with concrete violation examples — rather than a friendly description and a table of contents — the agent treats tokens as the only valid path. The wrong/right table gives the agent a direct substitution template instead of relying on inference.

**Pairs with:** the stylelint config provides a hard backstop. Even if an agent slips up, the lint rule rejects the PR.

### v3.3.0 (2026-05-12)

**Color tokens reconciled with `colors-semantic.md`. Typography no longer declares color values.**

Audit found the typography file was inventing color token names that don't exist in the semantic layer, defining a parallel dark-mode override that duplicated work already done by semantics, and quoting incorrect hex values for WCAG contrast claims.

**Fixed (broken token names):**
- `--colorLinkDefault` → `--colorLink` (the semantic name; `Default` suffix was never used in semantics)
- `--colorTextWarning` → `--colorWarningText` (semantic file uses the `*Text` suffix for warning, not the `Text*` prefix used by error/success — kept as-is rather than forcing inconsistency in semantics)
- Removed all `*Dark` suffix tokens (`--colorTextPrimaryDark`, `--colorLinkDefaultDark`, etc.) — these were never in `colors-semantic.md`. Dark mode is handled by theme swap on the existing token names.
- `--colorTextBrand` now correctly described as **aliasing `--colorPrimary`** (which is `purple600`, not `purple700` as previously claimed)

**Fixed (broken hex values):**
- `grey550` hex corrected: `#727272` → `#7A7A7A` (primitives source of truth)
- `purple700` hex corrected: `#4B2DB5` → `#491FD4` (primitives source of truth)
- All contrast ratios recalculated against verified hex values:
  - `--colorTextPrimary` 15.3:1 → 12.6:1
  - `--colorTextDefault` 11.8:1 → 8.6:1
  - `--colorTextSupporting` 7.2:1 → 4.8:1
  - `--colorTextBrand` 7.1:1 (with wrong `purple700` hex) → 5.0:1 (with correct `purple600` per semantic alias)
- AAA-strict guidance now points to `purple800` (`#3A1BA5`, 9.7:1) as the correct upgrade path

**Changed (architecture):**
- **Dark Mode Typography** section rewritten: typography no longer overrides `--colorText*` tokens via `@media (prefers-color-scheme: dark)`. The semantic layer already maps every text token to both light and dark — typography just references the name and inherits.
- **High-Contrast Mode** section rewritten: token-value overrides removed (those belong in `colors-semantic.md`). What remains are the three typography rules that survive any color theme: `forced-colors` mode handling, light-weight (300) guard against high-contrast backgrounds, and `prefers-contrast: more` weight bump.
- **Color Integration** table fully rebuilt against `colors-semantic.md`. Every typography role maps to a real semantic token. Light/dark resolved values shown for reference — the table is documentation, not a declaration.
- Flutter "Dark mode" example replaced — was using nonexistent `AckoColors.textPrimaryDark`; now uses `ThemeExtension` so the same field (`.textPrimary`) resolves through whichever theme is active.

**Added:**
- Explicit rules in Color Integration: never invent a color token in typography, never hardcode a hex, never reference primitives directly, never define `*Dark` suffix tokens.
- "Token name corrections" sub-table showing the broken → correct mapping for migration.
- Coverage of `--colorTextInvert` and `--colorTextStatic` (text on filled surfaces, theme-fixed text) which weren't previously documented in typography.

**Why this matters:** The semantic layer exists precisely so that typography, components, and templates never need to know about dark mode or color values. A heading uses `var(--colorTextPrimary)`; that variable resolves to `grey800` in light mode and `grey50` in dark mode, with zero code change anywhere except the theme attribute on `<html>`. The earlier version was breaking that contract.

### v3.2.0 (2026-05-12)

**camelCase enforced across every platform — CSS included.**

CSS output was using kebab-case (Style Dictionary's default) while every other platform — Figma, JSON tokens, Flutter, Swift — was camelCase. That broke the "one name everywhere" promise from v3.1.0.

**Changed:**
- CSS output now emits camelCase: `--ackoFontBodyMdSize` (was `--acko-font-body-md-size`)
- Style Dictionary CSS platform config swaps `name/cti/kebab` → `name/cti/camel`
- Tier 1 primitive token names cleaned up — hyphen-suffix removed across the board:
  - `fontSizeRaw-16` → `fontSizeRaw16`
  - `fontWeightRaw-600` → `fontWeightRaw600`
  - `lineHeightRaw-tight` → `lineHeightRawTight`
  - `letterSpacingRaw-tight` → `letterSpacingRawTight`
  - `paragraphSpacingRaw-sm` → `paragraphSpacingRawSm`
  - `measureRaw-tight` → `measureRawTight`
- Token Architecture rule updated: explicit "camelCase across all platforms" with rationale
- Frontmatter declares `naming_convention: camelCase (all platforms)`
- Removed duplicated Style Dictionary config in Tooling section — now references canonical config in Unit Policy (single source of truth)

**Why it matters:** A designer looking up `fontBodyMdSize` in Figma now finds the exact same name in the Flutter Dart class, in the iOS Swift file, and as `--ackoFontBodyMdSize` in CSS. The only platform-specific affix is the leading `--` and `acko` prefix that CSS variables require — the name itself never changes.

**Note:** CSS *properties* (`font-size`, `line-height`, `letter-spacing`) remain kebab-case because they're defined by the CSS spec, not by ACKO. Only ACKO's custom variables go camelCase.

### v3.1.0 (2026-05-12)

**Unit policy clarified — single source, automatic platform conversion.**

After a working-session with the React engineering team, the system now formalizes what was implicit: source values live in **px**, and the CSS build emits **rem**. Token names stay identical across Figma, Flutter, iOS, Android, and React, so there is one number per role across the entire stack.

**Added:**
- **Unit Policy section** (new) — px-source / rem-output rule, conversion matrix per platform, Style Dictionary transform config, custom `size/pxToRem` transform
- Per-table dual columns showing `px (source) → rem (CSS output)` so all consumers can read the same row
- JSON token examples (W3C DTCG format) with `"$value": "16px"` shown as authoritative source
- Flutter Dart output example (px values pass through as logical-pixel doubles)
- Stylelint rule snippet enforcing `rem` for CSS `font-size` (blocks regressions)

**Changed:**
- Type Scale section reorganized: source values (px), CSS output (rem), Flutter output (logical pixels), line heights (unitless ratios) shown as separate generated artifacts of one source
- Semantic alias tables (Display, Headings, Body, Labels, Navigation, Code) now show `px → rem` in the Size column
- WCAG 1.4.4 section updated: rule shifts from "use rem" (manual) to "consume the generated CSS variable" (build-step enforced)
- Web developer checklist: replaced "use rem units" with "consume generated CSS vars + add stylelint rule"
- Frontmatter declares `source_unit: px` and `css_output_unit: rem (auto-converted)`

**Rationale:** Mature design systems (M3, Carbon, Fluent, Atlassian) all store dimension tokens in a single source unit and transform per-platform at build time. Storing in px keeps Figma↔Flutter↔Design parity intact while CSS users still get full WCAG 1.4.4 zoom support. Asking React developers to hand-convert px → rem per usage was the wrong layer — the build does it once, correctly, everywhere.

### v3.0.0 (2026-05-12)

**Benchmarked against:** Material Design 3, Apple HIG, IBM Carbon, Atlassian Design System, Microsoft Fluent 2, Adobe Spectrum, W3C DTCG Format 2025.10.

**Added:**
- **3-tier token architecture** (primitive → semantic → component) — aligns with M3, Fluent 2, Carbon, Atlassian
- **Dark mode typography section** — font-smoothing adjustment, color token remapping, weight bump at small sizes
- **High-contrast mode section** — WCAG AAA compliant theme class for light and dark
- **Density variants** — compact / comfortable / spacious (modeled after M3 density and Atlassian cozy/compact)
- **Motion & text animation tokens** — easing curves, duration tokens, animation patterns, `prefers-reduced-motion` guard
- **RTL / bidirectional text section** — logical CSS properties, `lang` attribute guidance, Urdu (`dir="rtl"`) support
- **W3C DTCG 2025.10 compliance** — composite token JSON examples
- **Style Dictionary tooling section** — multi-platform export config (CSS, iOS Swift, Android XML, Flutter Dart)
- **Figma token sync guidance** — Tokens Studio integration
- **Token versioning policy** — semantic versioning, deprecation process
- **Dynamic Type support** — Flutter `textScaler`, iOS `adjustsFontForContentSizeCategory`
- **Dark mode color table** — full color token mapping for both modes
- `--lineHeightSnug` (1.35) — fills gap between tight and normal

**Changed:**
- All font sizes moved to a token-based scale (final unit policy clarified in v3.1.0)
- Line heights converted to unitless ratios — correct for all platforms
- Token naming aligned to `font{Role}{Modifier}` pattern throughout
- `colorTextBrand` corrected from `purple600` to `purple700` for WCAG AAA compliance
- Flutter `pubspec.yaml` font list updated to include all 10 files explicitly
- Accessibility section: added `forced-colors` guidance, Dynamic Type iOS guidance
- Implementation checklist expanded to cover all new sections

**Fixed:**
- Version footer now correctly reads `v3.0.0` (was inconsistently labeled `v2.0.0` in footer vs `v2.0.1` in changelog)
- `--textAlignJustify` re-stated as prohibited with rationale

### v2.0.1 (2026-05-11)

**Changed:** `--fontDisplayXl` weight to 600 (semibold) for primary marketing hero `<h1>`. `--fontDisplayLg` remains 300 (light).

### v2.0.0 (2026-04-30)

**Added:** Light (300) and Semibold (600) weight variants; 6 new style variants; paragraph spacing, measure, text transform, text alignment, paragraph indent, OpenType features, responsive typography, WCAG accessibility, Flutter implementation, letter spacing scale, color integration mapping.

**Changed:** Style variants expanded from 10 to 16; total text styles from 150 to 240.

---

## Maintainer

**ACKO Design System Team**

---

**End of ACKO Typography System v3.5.0**
