# Progress — Base specification (platform-agnostic)

> **Purpose:** Progress **bar**, **circular**, and **segmented** indicators. **CSS:** `packages/css/src/progress.css`.

---

## 1. What it is

**Progress** shows `value` (0–100 or normalized). Variants: **bar** (sizes `sm`/`md`/`lg`), **circular** (optional center child e.g. Avatar), **segmented** (`segments` count). **color** roles: `primary`, `success`, `error`. Optional **label**, **showLabel**, **animated** (bar).

---

## 2. Playground parity

Source: `ProgressPreview` / `ProgressUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Bar | sm/md/lg; success complete; error; animated |
| Circular | sm/md/lg; lg with Avatar child |
| Segmented | Two examples with labels |
| Usage | Profile completion + segmented steps |

---

## 3. Implementation checklist

- [ ] Determinate value only in preview; indeterminate optional per product.
- [ ] Circular stroke uses semantic colors.
