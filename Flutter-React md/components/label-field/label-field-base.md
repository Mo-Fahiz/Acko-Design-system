# Label & field — Base specification (platform-agnostic)

> **Purpose:** Documentation of the **label + text field** composition pattern used in forms. The playground demonstrates **`TextInput`** with required, helper, error, and disabled — see also [`../text-input/text-input-base.md`](../text-input/text-input-base.md). Optional wrappers: **`Field`** / **`Label`** from `@acko/field` and `@acko/label` when used in codebase.

---

## 1. What it is

A **field** pairs a **label** (and optional required indicator) with a control (here, **TextInput**). States: default + helper, **error**, **disabled**.

---

## 2. Playground parity

Source: `LabelFieldPreview` / `LabelFieldUsage` in `apps/playground/src/App.tsx`.

| Row | Intent |
|-----|--------|
| Default + helper | Required username + helper text |
| Error | Password validation error |
| Disabled | Non-editable field |
| Usage | Registration: name + email + CTA |

---

## 3. Implementation checklist

- [ ] Same token and spacing rules as TextInput base spec.
- [ ] When using `Field` from `@acko/field`, follow `packages/css/src/field.css`.
