# Toggle — Base specification (platform-agnostic)

> **Purpose:** Pressable pill buttons and **ToggleGroup** for single selection among segments. **CSS:** `packages/css/src/toggle.css`.

---

## 1. What it is

**Toggle** is a pressable control with **default** and **outline** variants, **pressed** state, and **disabled**. **ToggleGroup** + **ToggleGroupItem** provide segmented control (`type="single"`).

---

## 2. Playground parity

Source: `TogglePreview` / `ToggleUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Row 1 | Default, pressed, outline ×2, disabled |
| ToggleGroup | Single selection Left/Center/Right |
| Usage | Alignment demo with icon toggles |

---

## 3. Implementation checklist

- [ ] `aria-pressed` on toggle buttons.
- [ ] Group roving focus for keyboard.
