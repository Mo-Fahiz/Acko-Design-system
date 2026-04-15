# Dropdown — Base specification (platform-agnostic)

> **Purpose:** Select one or many options from a menu; supports **searchable** and **multi** variants; mobile may use **bottom sheet**. **CSS:** `packages/css/src/dropdown.css`.

---

## 1. What it is

**Dropdown** is a labeled trigger opening a list of options. Variants: single select, **multi** select, **searchable** filter. Optional **disabled** state.

---

## 2. Properties (API contract)

| Concept | Description |
|---------|-------------|
| `label`, `placeholder` | Field chrome |
| `options` | `{ value, label }[]` |
| `value` / `onChange` | `string` or `string[]` for multi |
| `variant` | `searchable`, `multi`, default single |
| `disabled` | Disables trigger |
| `mobileMode` / `forceSheet` | Sheet behavior for multi-select (see React) |

---

## 3. Playground parity

Source: `DropdownPreview` / `DropdownUsage` in `apps/playground/src/App.tsx`.

| Row | Intent |
|-----|--------|
| City | Single select |
| Languages | `variant="multi"` |
| Disabled | Disabled trigger |
| Usage | Car make + searchable city |

---

## 4. Implementation checklist

- [ ] Menu surface uses surface radius tokens; focus and keyboard per a11y rules.
- [ ] Multi-select value is array; searchable filters options.
