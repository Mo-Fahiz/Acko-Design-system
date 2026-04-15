# OTP input — Base specification (platform-agnostic)

> **Purpose:** One-time code entry as **N** separate cells; **numeric** (default) input; optional **error** state, **masked** display, **sizes** `sm` / `md` / `lg`. **CSS:** `packages/css/src/otp-input.css` (shared styling with `@acko/text-input` package path — see `packages/otp-input`).

---

## 1. What it is

**OtpInput** controls a string of length **length**; focus moves between cells; paste supported in implementation.

---

## 2. Playground parity

Source: `OtpInputPreview` / `OtpInputUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Default | 6 digits, type to test |
| Error test | 4 cells; wrong code shows error copy; `1234` clears |
| Masked | 4-digit masked |
| Sizes | sm / md / lg radii (12 / 16 / 20px) |
| Usage | Verify mobile card with 4-digit OTP + CTA |

---

## 3. Implementation checklist

- [ ] Cell focus order and backspace behavior.
- [ ] Error border token alignment with input family.
