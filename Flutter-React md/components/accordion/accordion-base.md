# Accordion — Base specification (platform-agnostic)

> **Purpose:** Expandable sections; single or multiple open. **CSS:** `packages/css/src/accordion.css`.

---

## 1. What it is

**Accordion** takes **items** with `value`, **trigger** label, **content** body; optional **disabled** item. `type="single"` + **collapsible** in preview.

---

## 2. Playground parity

Source: `AccordionPreview` / `AccordionUsage` in `apps/playground/src/App.tsx`.

| Preview | Intent |
|---------|--------|
| FAQ items | Three items, one disabled |
| Usage | Card with shorter FAQ |

---

## 3. Implementation checklist

- [ ] `aria-expanded` on triggers; panel ids for a11y.
- [ ] Chevron rotation / motion per CSS.
