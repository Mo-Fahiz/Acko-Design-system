# Tabs — Base specification (platform-agnostic)

> **Purpose:** Tab lists with underline or pill indicators; optional **navigation** (bottom tabs). **CSS:** `packages/css/src/tabs.css`.

---

## 1. What it is

**Tabs** manages a selected item from `items[]` with `value` / `onChange`. Variants: **underline** (indicator top or bottom), **pill**, **navigation**. Items may include **icon** and **disabled**.

---

## 2. Playground parity

Source: `TabsPreview` / `TabsUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Underline (bottom) | Icons + disabled item |
| Underline (top) | `indicatorPosition="top"` |
| Pill | Fit-content monthly/yearly |
| Navigation | Bottom tab bar icons |
| Usage | Policy detail tabs with conditional body |

---

## 3. Implementation checklist

- [ ] Selected tab meets contrast; indicator animation per CSS.
- [ ] `aria-selected` and tablist roles on web.
