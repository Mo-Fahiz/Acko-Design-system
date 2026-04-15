# Typography — Base specification (platform-agnostic)

> **Purpose:** Type scale and color roles for all text. **CSS:** `packages/css/src/typography.css`.

---

## 1. What it is

**Typography** applies the ACKO type scale (`display`, `heading`, `body`, `label`, `caption`, `overline`) and **color intent** (`primary`, `secondary`, `brand`, etc.) to text. Optional **alignment** for paragraphs.

---

## 2. Properties (API contract)

| Concept | Description |
|---------|-------------|
| `variant` | Token-backed level: `display-lg` … `overline` (see playground spec table) |
| `color` | Semantic text color intent |
| `align` | Optional `left` / `center` / `right` where supported |
| `children` | Text content (sentence case per content rules) |

---

## 3. Playground parity

Source: `TypographyPreview` / `TypographyUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Live examples | Overline, display + body, heading + body, label + Badge + caption |
| Spec reference | Each variant: sample “Ag”, label, usage description (display-lg through overline) |
| Usage | Card with overline, heading-xl, body-md, Button |

---

## 4. Implementation checklist

- [ ] Every `variant` resolves to correct font-size, line-height, weight, letter-spacing tokens.
- [ ] Color intents map to `--color-text-*` semantics.
