# Scroll area — Base specification (platform-agnostic)

> **Purpose:** Scrollable region with max height and custom scrollbar styling. **CSS:** `packages/css/src/scroll-area.css`.

---

## 1. What it is

**ScrollArea** wraps children; **maxHeight** constrains viewport; optional **className** for border/padding (preview uses border + radius + padding).

---

## 2. Playground parity

Source: `ScrollAreaPreview` / `ScrollAreaUsage` in `apps/playground/src/App.tsx`.

| Preview | Intent |
|---------|--------|
| Basic | 15 placeholder lines, maxHeight 120 |
| Usage | Activity log with icons in card |

---

## 3. Implementation checklist

- [ ] Scrollbar thumb uses design tokens.
- [ ] Overscroll behavior per platform.
