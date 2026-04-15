# TextInput — React

> **Scope:** Web implementation only. **Do not change** visuals, sizes, states, or motion vs [`../text-input-base.md`](../text-input-base.md). **Playground mapping:** see [`../text-input-base.md`](../text-input-base.md) §10 (Playground parity). Full **CSS class matrix:** `.cursor/rules/components/text-input/text-input.styles.mdc` (must match `packages/css/src/text-input.css`).

---

## Packages

| Artifact | Location |
|----------|----------|
| Component | `@acko/text-input` |
| Styles | `@acko/css/text-input.css` |

## Consumer imports

```tsx
// app.css
@import "@acko/css/text-input.css";
```

```tsx
import { TextInput } from "@acko/text-input";
```

> The same package also exports **`OtpInput`** — a separate component; do not conflate with TextInput.

---

## Props (`TextInputProps`)

| Prop | Type | Default | Notes |
|------|------|---------|--------|
| `id` | `string` | `useId()` | Links `<label htmlFor>` to `<input id>`. |
| `label` | `string` | — | Required. |
| `placeholder` | `string` | — | |
| `value` | `string` | — | Controlled. |
| `onChange` | `(value: string) => void` | — | Required. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Wrapper: `acko-text-input-wrapper-{size}`. |
| `type` | `'text' \| 'email' \| 'password' \| 'tel' \| 'url' \| 'search' \| 'number'` | `'text'` | |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` | Drives error/success modifiers. |
| `helperText` | `string` | — | Shown when not error (see `aria-describedby`). |
| `errorText` | `string` | — | Shown when `state === 'error'`. |
| `disabled` | `boolean` | `false` | |
| `readOnly` | `boolean` | `false` | |
| `required` | `boolean` | `false` | Asterisk + `aria-required`. |
| `iconLeft` | `ReactNode` | — | Wrapped; `aria-hidden`. |
| `iconRight` | `ReactNode` | — | **Hidden when `state === 'success'`** (success check replaces it). |
| `prefix` | `string` | — | |
| `suffix` | `string` | — | |
| `maxLength` | `number` | — | Enables character count row. |
| `autoComplete` | `string` | — | Passed to `<input>`. |
| `className` | `string` | — | Merged on **root** `div` (last). |

Additional `HTMLAttributes<HTMLDivElement>` spread onto the **root** via `...rest` (not on `<input>`).

---

## Ref and focus

- `forwardRef<HTMLDivElement, TextInputProps>` — ref attaches to the **outer** `div.acko-text-input`, **not** the `<input>`.
- To focus the field programmatically, use the **`id`** (or `document.getElementById` / `querySelector`) unless the API is extended with an input ref.

---

## DOM structure (canonical — matches source)

```tsx
<div ref className="acko-text-input" /* ...rest */>
  <label htmlFor={id} className="acko-text-input-label [acko-text-input-label-focused] [acko-text-input-label-disabled]">
    {label}
    {required && <span className="acko-text-input-required" aria-hidden="true">*</span>}
  </label>
  <div className="acko-text-input-wrapper acko-text-input-wrapper-{size} [acko-text-input-focused] [acko-text-input-filled] [acko-text-input-error] [acko-text-input-success] [acko-text-input-disabled] [acko-text-input-readonly]">
    {iconLeft && <span className="acko-text-input-icon-left" aria-hidden="true">…</span>}
    {prefix && <span className="acko-text-input-prefix">{prefix}</span>}
    <input
      id={id}
      className="acko-text-input-el acko-text-input-el-{size}"
      aria-required={required || undefined}
      aria-invalid={isError || undefined}
      aria-describedby={describedBy}
      …
    />
    {suffix && <span className="acko-text-input-suffix">{suffix}</span>}
    {iconRight && !isSuccess && <span className="acko-text-input-icon-right" aria-hidden="true">…</span>}
    {isSuccess && (
      <span className="acko-text-input-success-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" … strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
    )}
  </div>
  {isError && errorText && <span id={errorId} className="acko-text-input-error-text" role="alert">…</span>}
  {!isError && helperText && <span id={helperId} className="acko-text-input-helper-text">…</span>}
  {maxLength != null && <span className="acko-text-input-char-count">{value.length}/{maxLength}</span>}
</div>
```

- **`acko-text-input-filled`:** applied when `value.length > 0` **and** not focused.
- **`describedBy`:** `errorId` if error + `errorText`; else `helperId` if helper; else `undefined`.

---

## Accessibility (web)

| Concern | Implementation |
|---------|------------------|
| Label | `<label htmlFor={id}>` matches `<input id={id}>`. |
| Required | `aria-required` when `required`. |
| Invalid | `aria-invalid` when `state === 'error'`. |
| Described by | `aria-describedby` points to helper **or** error id when present. |
| Error announcement | Error span uses `role="alert"`. |
| Decorative icons | `aria-hidden="true"` on icon wrappers and success SVG. |

---

## Exports

```ts
export { TextInput } from "./TextInput";
export type { TextInputProps } from "./TextInput";
// OtpInput exported separately from package entry.
```

---

## References

- [`../text-input-base.md`](../text-input-base.md) — platform contract.
- `packages/text-input/src/TextInput.tsx` — source of truth for behavior.
- `.cursor/rules/components/text-input/text-input.styles.mdc` — CSS classes.
