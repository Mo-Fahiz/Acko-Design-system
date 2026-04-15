# Form — Base specification (platform-agnostic)

> **Purpose:** Form wrapper with async **onSubmit**, field scoping via **FormItem** / **FormMessage**, and integration with inputs (e.g. **TextInput**). **CSS:** `packages/css/src/form.css`.

---

## 1. What it is

**Form** coordinates submit handling (preview uses a Promise with delay). **FormItem** names fields; **FormMessage** shows helper text below a field.

---

## 2. Playground parity

Source: `FormPreview` / `FormUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Basic form | Name, email + FormMessage, phone; Cancel + Submit; submit sets submitted state |
| Usage | Vehicle + pincode in `Card`; FormMessage on pincode; full-width submit |

---

## 3. Implementation checklist

- [ ] Submit button **type="submit"**; prevent double submit while pending.
- [ ] Field-level validation messages per design.
