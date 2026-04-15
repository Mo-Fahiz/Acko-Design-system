# Alert — Base specification (platform-agnostic)

> **Purpose:** Inline alert banners for info, success, warning, and error. **Where to go next:** [`react/alert-react.md`](./react/alert-react.md), [`flutter/alert-flutter.md`](./flutter/alert-flutter.md), `packages/css/src/alert.css`.

---

## 1. What it is

An **Alert** communicates important feedback: policy updates, payments, pending actions, or errors. Optional **title**, body content, and **dismissible** behavior.

---

## 2. Properties (API contract)

| Concept | Description |
|---------|-------------|
| `variant` / intent | `info`, `success`, `warning`, `error` — drives color and icon intent |
| `title` | Optional heading |
| Children | Primary message body |
| `dismissible` | When true, show dismiss control and `onDismiss` |

---

## 3. Playground parity

Source: `AlertPreview` / `AlertUsage` in `apps/playground/src/App.tsx`.

| Row | Intent |
|-----|--------|
| Info | Title + body |
| Success | Payment received |
| Warning | Document pending |
| Error | Claim rejected |
| Usage | Dismissible success; restore via button |

---

## 4. Implementation checklist

- [ ] Four variants with distinct semantic colors and icons per CSS.
- [ ] Dismissible clears from UI and calls handler.
