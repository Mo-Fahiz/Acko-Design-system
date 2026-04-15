# Radio — Base specification (platform-agnostic)

> **Purpose:** Single selection from a set. **RadioGroup** with optional **card** presentation. **CSS:** `packages/css/src/radio.css`.

---

## 1. What it is

**RadioGroup** displays labeled options; one value active. **Card** variant shows title + description per option; options may be **disabled**.

---

## 2. Playground parity

Source: `RadioPreview` / `RadioUsage` in `apps/playground/src/App.tsx`.

| Row | Intent |
|-----|--------|
| Default | Three options, one disabled |
| Card variant | Basic vs Pro with descriptions |
| Usage | Insurance type card group |

---

## 3. Implementation checklist

- [ ] Keyboard roving tabindex / arrow navigation per a11y patterns.
- [ ] Selected state uses brand/semantic tokens in CSS.
