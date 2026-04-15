# Drawer — Base specification (platform-agnostic)

> **Purpose:** Slide-in panel from **right**, **left**, or **bottom**. **CSS:** `packages/css/src/drawer.css`.

---

## 1. What it is

**Drawer**: **open** / **onClose** / **side**; **title**, **description**, **children**, **footer**; backdrop dismiss.

---

## 2. Playground parity

Source: `DrawerPreview` / `DrawerUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Triggers | Buttons set side then open (right / left / bottom) |
| Panel | Title, description, body, footer |
| Usage | Claims side panel with key-value rows |

---

## 3. Implementation checklist

- [ ] Sheet animation duration/easing per CSS.
- [ ] Focus management when open.
