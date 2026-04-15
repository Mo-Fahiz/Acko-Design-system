# Dialog — Base specification (platform-agnostic)

> **Purpose:** Modal overlay for focused tasks and confirmations. **CSS:** `packages/css/src/dialog.css`.

---

## 1. What it is

**Dialog** is **open** / **onClose** controlled; **title**, optional **description**, **children** body, **footer** actions; **size** (e.g. `sm` for confirm). Focus trap and backdrop per implementation.

---

## 2. Playground parity

Source: `DialogPreview` / `DialogUsage` in `apps/playground/src/App.tsx`.

| Flow | Intent |
|------|--------|
| Standard | Open — title, description, body, Cancel + Confirm |
| Confirm destructive | `size="sm"`, danger confirm |
| Usage | Renewal details dialog with policy rows |

---

## 3. Implementation checklist

- [ ] Focus returns to trigger on close.
- [ ] `aria-modal` and labelledby on web.
