# Input group — Base specification (platform-agnostic)

> **Purpose:** Group **prefix** / **suffix** addons with a native `<input>` using shared border styling. **CSS:** `packages/css/src/input-group.css`. Often composed with **`Field`** from `@acko/field`.

---

## 1. What it is

**InputGroup** wraps slot content and applies `acko-input-group-*` classes; consumers use **`acko-input-group-input`** on the inner input. States: **error**; sizes **sm** / **md** / **lg**.

---

## 2. Playground parity

Source: `InputGroupPreview` / `InputGroupUsage` in `apps/playground/src/App.tsx`.

| Row | Intent |
|-----|--------|
| URL builder | prefix `https://` suffix `.com` |
| Currency | prefix `$`, lg |
| Error | prefix `@`, sm, error state |
| Usage | Rupee amount inside `Field` label |

---

## 3. Implementation checklist

- [ ] Addon and input share one pill border; focus ring wraps group.
- [ ] Error border token matches input family.
