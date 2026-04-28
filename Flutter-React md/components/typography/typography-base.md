# Typography — Base specification (platform-agnostic)

> **Purpose:** Type scale and color roles for all text. **CSS:** `packages/css/src/typography.css`.

---

## 1. What it is

**Typography** applies the ACKO type scale (`display`, `heading`, `body`, `label`, `caption`, `overline`) and **color intent** (`primary`, `secondary`, `brand`, etc.) to text. Optional **weight override** and **alignment** for paragraphs.

---

## 2. Properties (API contract)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | See type scale below | — | Token-backed typographic level |
| `color` | `"primary"` \| `"secondary"` \| `"invert"` \| `"brand"` \| `"error"` \| `"success"` \| `"static"` | `"primary"` | Semantic text color intent |
| `weight` | `"regular"` \| `"medium"` \| `"semibold"` \| `"bold"` | (variant default) | Override the variant's default font-weight |
| `align` | `"left"` \| `"center"` \| `"right"` | — | Text alignment |
| `as` | element type | (auto from variant) | Override the rendered HTML element |
| `truncate` | `boolean` | `false` | Single-line truncation with ellipsis |
| `children` | node | — | Text content (sentence case per content rules) |

---

## 3. Type scale

| Variant | Size | Line height | Weight | Letter spacing | Default element |
|---------|------|-------------|--------|----------------|-----------------|
| `display-xl` | 72px | 80px | **700** (bold) | -2px | `h1` |
| `display-lg` | 56px | 64px | **700** (bold) | -1.5px | `h1` |
| `display-md` | 48px | 56px | **700** (bold) | -1px | `h1` |
| `display-sm` | 40px | 48px | **600** (semibold) | -0.5px | `h1` |
| `heading-xl` | 32px | 40px | **600** (semibold) | -0.5px | `h2` |
| `heading-lg` | 24px | 32px | **600** (semibold) | -0.3px | `h2` |
| `heading-md` | 20px | 28px | **600** (semibold) | -0.2px | `h3` |
| `heading-sm` | 18px | 24px | **600** (semibold) | 0px | `h3` |
| `body-lg` | 18px | 28px | **400** (regular) | 0px | `p` |
| `body-md` | 16px | 24px | **400** (regular) | 0px | `p` |
| `body-sm` | 14px | 20px | **400** (regular) | 0px | `p` |
| `label-lg` | 14px | 20px | **500** (medium) | 0.1px | `span` |
| `label-md` | 12px | 16px | **500** (medium) | 0.2px | `span` |
| `label-sm` | 11px | 14px | **500** (medium) | 0.3px | `span` |
| `caption` | 12px | 16px | **400** (regular) | 0px | `span` |
| `overline` | 11px | 16px | **600** (semibold) | 0.5px | `span` |

---

## 4. Weight system

### Available weights

| Weight name | CSS value | Font file | Use case |
|-------------|-----------|-----------|----------|
| `regular` | 400 | Euclid Circular B Regular | Body text, captions — default reading weight |
| `medium` | 500 | Euclid Circular B Medium | Labels, form fields, UI controls — slightly emphasized |
| `semibold` | 600 | Euclid Circular B Semibold | Headings, overlines, section titles — structural emphasis |
| `bold` | 700 | Euclid Circular B Bold | Display text, strong emphasis, hero headlines |

### Figma ↔ code mapping

| Figma style | Font weight | CSS class | Typography `weight` prop |
|-------------|-------------|-----------|--------------------------|
| `um_text_regular` | 400 | `.acko-text-weight-regular` | `"regular"` |
| `um_text_medium` | 500 | `.acko-text-weight-medium` | `"medium"` |
| `um_text_semibold` | 600 | `.acko-text-weight-semibold` | `"semibold"` |
| `um_text_bold` | **700** | `.acko-text-weight-bold` | `"bold"` |

> **Note:** In the Figma source, `um_text_bold` was historically assigned as semibold (600). In the design system implementation, **`um_text_bold` maps to true bold (700)**. A separate `um_text_semibold` (600) is available for cases where the slightly lighter emphasis is preferred.

---

## 5. Hierarchy and usability guidelines

### Typographic hierarchy principles

A well-structured page uses **3–4 distinct levels** of visual weight to create scannable content. Too many weight/size changes create noise; too few flatten the hierarchy.

| Level | Purpose | Recommended variants | Weight |
|-------|---------|---------------------|--------|
| **L1 — Hero / page title** | Anchor the page; one per view | `display-*` or `heading-xl` | bold (700) |
| **L2 — Section heading** | Group related content; scannable landmarks | `heading-lg` or `heading-md` | semibold (600) |
| **L3 — Subsection / card title** | Within a card or content block | `heading-sm` or `label-lg` | semibold (600) or medium (500) |
| **L4 — Body / supporting text** | Readable paragraphs and descriptions | `body-md` or `body-sm` | regular (400) |
| **L5 — Meta / auxiliary** | Timestamps, captions, fine print | `caption` or `label-sm` | regular (400) or medium (500) |

### When to use each weight

- **Bold (700):** Reserve for the highest-priority element on screen — page titles, hero headlines, marketing display text. Overusing bold dilutes its impact.
- **Semibold (600):** The workhorse for structural headings. All `heading-*` variants default to semibold. Use it for section titles, card titles, and navigation items that need to stand out without the heaviness of bold.
- **Medium (500):** Labels, form field labels, button text, and interactive elements. Provides emphasis without competing with headings.
- **Regular (400):** Body copy, descriptions, helper text. Optimized for sustained reading comfort.

### Practical rules

1. **Maximum 2 weight changes per content block.** A card with a semibold title and regular body is clear. Adding bold, medium, *and* semibold within the same card creates visual clutter.
2. **Size before weight.** Prefer changing font size to changing weight when establishing hierarchy. A larger regular-weight heading is often clearer than a smaller bold heading.
3. **Consistency within patterns.** All card titles across a page should use the same variant+weight combination. Do not mix `heading-sm` with `weight="bold"` on one card and default weight on another.
4. **Weight overrides are escape hatches.** The `weight` prop exists for exceptions — e.g. making a `body-md` snippet bold for inline emphasis. If you find yourself overriding weight on most instances of a variant, consider whether a different variant is more appropriate.

---

## 6. Color intents

| Color | Token | Use case |
|-------|-------|----------|
| `primary` | `--color-text-primary` | Default text, headings |
| `secondary` | `--color-text-secondary` | Supporting text, descriptions |
| `invert` | `--color-text-invert` | Text on dark/brand surfaces |
| `brand` | `--color-text-brand` | Brand-colored accent text |
| `error` | `--color-text-error` | Error messages, validation |
| `success` | `--color-text-success` | Success confirmations |
| `static` | `--color-text-static` | Text on image overlays (always light) |

---

## 7. Playground parity

Source: `TypographyPreview` / `TypographyUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Live examples | Overline, display + body, heading + body, label + Badge + caption |
| Spec reference | Each variant: sample "Ag", label, usage description (display-lg through overline) |
| Weight showcase | Regular, medium, semibold, and bold applied to body-md for comparison |
| Usage | Card with overline, heading-xl, body-md, Button |

---

## 8. Implementation checklist

- [x] Every `variant` resolves to correct font-size, line-height, weight, letter-spacing tokens.
- [x] Color intents map to `--color-text-*` semantics.
- [x] `weight` prop override with `regular` (400), `medium` (500), `semibold` (600), `bold` (700).
- [x] `um_text_bold` in Figma → `weight="bold"` (700) in code.
- [x] `um_text_semibold` in Figma → `weight="semibold"` (600) in code.
- [ ] Truncation via `truncate` prop (overflow-hidden + text-overflow: ellipsis).
- [ ] Alignment via `align` prop.
