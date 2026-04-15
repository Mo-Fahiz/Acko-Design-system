# Card — Base specification (platform-agnostic)

> **Purpose:** Surface containers for grouped content and actions. **CSS:** `packages/css/src/card.css`.

---

## 1. What it is

A **Card** provides elevation, outline, or flat surfaces with configurable **padding** and optional **header**, **content**, and **footer** regions for actions (e.g. buttons).

---

## 2. Properties (API contract)

| Concept | Description |
|---------|-------------|
| `variant` | `default`, `elevated`, `outline`, `demoted` |
| `padding` | `sm`, `md`, `lg` — inner padding scale |
| Subcomponents | `CardHeader`, `CardContent`, `CardFooter` — layout regions |

---

## 3. Playground parity

Source: `CardPreview` / `CardUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Variants | 2×2 grid: default, elevated, outline, demoted with `padding="sm"` |
| Padding sizes | `sm`, `md`, `lg` on default variant |
| Card with CTA | Elevated + `CardFooter` with two buttons; default + full-width primary |
| Usage | Elevated plan card (header with Badge), outline row with icon + Badge |

---

## 4. Implementation checklist

- [ ] Four variants; three padding steps.
- [ ] Footer aligns actions; full-width button respects nested radius rules in `global.md`.
