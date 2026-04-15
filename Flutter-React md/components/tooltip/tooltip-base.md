# Tooltip — Base specification (platform-agnostic)

> **Purpose:** Contextual hint on hover/focus around a trigger. **CSS:** `packages/css/src/tooltip.css`.

---

## 1. What it is

**Tooltip** wraps a child (trigger) and shows **content** in a floating surface. **side**: `top`, `bottom`, `left`, `right` (positioning).

---

## 2. Playground parity

Source: `TooltipPreview` / `TooltipUsage` in `apps/playground/src/App.tsx`.

| Row | Intent |
|-----|--------|
| Top / Bottom / Left / Right | Secondary buttons as triggers |
| Usage | Icon-only toolbar with tooltips |

---

## 3. Implementation checklist

- [ ] Trigger remains focusable; tooltip dismisses on escape.
- [ ] Portal/layer z-index per design tokens.
