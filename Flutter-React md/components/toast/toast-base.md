# Toast — Base specification (platform-agnostic)

> **Purpose:** Ephemeral notifications (success, error, warning, info); optional **title**, **description**, **dismissible**, and **action** callback. Delivered via a **provider** / hook in the React app. **CSS:** `packages/css/src/toast.css`.

---

## 1. What it is

**Toast** surfaces short feedback at a viewport edge (playground copy: top-right, auto-dismiss ~4s). Variants map to semantic status colors.

---

## 2. Properties (API contract)

| Concept | Description |
|---------|-------------|
| `variant` | `success`, `error`, `warning`, `info` |
| `title`, `description` | Primary and secondary text |
| `dismissible` | Show dismiss control |
| `action` | Optional `{ label, onClick }` |

---

## 3. Playground parity

Source: `ToastPreview` (`ToastTriggers`) / `ToastUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Four variants | Buttons fire toast per variant with title + description + dismissible |
| Toast with action | Success toast with action button |
| Usage | Same triggers inside explanatory card |

---

## 4. Implementation checklist

- [ ] Stacking and z-index vs dialogs.
- [ ] Live region / polite announcement for new toasts.
