# Textarea — Base specification (platform-agnostic)

> **Purpose:** Multi-line text field with label above, shared input-token family with TextInput. **CSS:** `packages/css/src/textarea.css`.

---

## 1. What it is

**Textarea** is a multi-line control with label, optional **character count**, **helper** / **error** messaging, and states: default, error, disabled.

---

## 2. Properties (API contract)

| Concept | Description |
|---------|-------------|
| `value` / `onChange` | Controlled string |
| `label`, `placeholder` | Required label; optional placeholder |
| `state` | `default`, `error` |
| `helperText`, `errorText` | Mutually exclusive messaging |
| `maxLength`, `showCount` | Optional count `{current}/{max}` |
| `disabled` | Disabled styling |

---

## 3. Playground parity

Source: `TextareaPreview` / `TextareaUsage` in `apps/playground/src/App.tsx`.

| Row | Intent |
|-----|--------|
| Default | Message + placeholder + maxLength + showCount |
| Error | Empty value, error text |
| Disabled | Read-only style value |
| Usage | Feedback form with helper + submit |

---

## 4. Implementation checklist

- [ ] Shares border/focus/error patterns with TextInput family in `global.md`.
- [ ] Count and helper/error placement match CSS.
