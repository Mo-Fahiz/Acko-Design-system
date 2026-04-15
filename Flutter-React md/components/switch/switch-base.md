# Switch — Base specification (platform-agnostic)

> **Purpose:** On/off toggle with label. **CSS:** `packages/css/src/switch.css`.

---

## 1. What it is

**Switch** is a binary control with **md** (default) and **sm** sizes; **disabled** state non-interactive.

---

## 2. Playground parity

Source: `SwitchPreview` / `SwitchUsage` in `apps/playground/src/App.tsx`.

| Row | Intent |
|-----|--------|
| Default | Medium, interactive |
| Small | `size="sm"` |
| Disabled | Non-interactive |
| Usage | Settings card: notifications + dark mode |

---

## 3. Implementation checklist

- [ ] Track + thumb motion per CSS.
- [ ] `aria-checked` / role switch on web.
