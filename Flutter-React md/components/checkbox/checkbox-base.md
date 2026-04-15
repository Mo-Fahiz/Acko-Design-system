# Checkbox — Base specification (platform-agnostic)

> **Purpose:** Binary and indeterminate selection; **CheckboxRow** for label+description; **CheckboxGroup** for fieldset-style lists. **CSS:** `packages/css/src/checkbox.css`.

---

## 1. What it is

**Checkbox** renders a control with optional **label**, **description**, **indeterminate**, **disabled**, and **error** states. Layout variants place label **left** or **right** of the control (preview uses desktop vs mobile classes).

---

## 2. Playground parity

Source: `CheckboxPreview` / `CheckboxUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Atom — interactive | Unchecked, checked, indeterminate, disabled ×2, error |
| Checkbox left (desktop) | `CheckboxRow` list with descriptions |
| Checkbox right (mobile) | Same options, `preview-cb-right` |
| Desktop — dropdown multi | Multi `Dropdown` for add-ons |
| Mobile — bottom sheet | `mobileMode="sheet"` + `forceSheet` multi `Dropdown` |
| Usage | Terms + marketing + `CheckboxGroup` add-ons |

---

## 3. Implementation checklist

- [ ] Focus ring and error border per CSS.
- [ ] Indeterminate state for parent checkboxes.
- [ ] `CheckboxGroup` coordinates array value.
