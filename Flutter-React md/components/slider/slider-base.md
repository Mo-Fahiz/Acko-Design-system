# Slider — Base specification (platform-agnostic)

> **Purpose:** Numeric value along a track with optional **ticks**, **value label**, **min** / **max** / **step**, sizes **sm** / **md** / **lg**, and **disabled**. **CSS:** `packages/css/src/slider.css`.

---

## 1. What it is

**Slider** is a horizontal track + thumb; supports **showValue**, **showTicks** with **step**, and **aria-label** for accessibility.

---

## 2. Playground parity

Source: `SliderPreview` / `SliderUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Default | Controlled value + `showValue` |
| With ticks | `step={10}`, `showTicks`, `showValue` |
| Disabled | Non-interactive |
| Size variants | sm, md, lg at 50% |
| Usage | Coverage amount 1–100 + quote CTA |

---

## 3. Implementation checklist

- [ ] Thumb hit target meets a11y minimum.
- [ ] Keyboard nudge matches step.
