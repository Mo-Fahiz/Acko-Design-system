# TextInput — Base specification (platform-agnostic)

> **Purpose:** The **visual and behavioral contract** for TextInput. Every platform must match this document; React and Flutter only add **how** to implement it (no pixel or token drift).
>
> **Where to go next:** [`react/text-input-react.md`](./react/text-input-react.md) (web), [`flutter/text-input-flutter.md`](./flutter/text-input-flutter.md) (Flutter), [`.cursor/rules/components/text-input/text-input.styles.md`](../../../.cursor/rules/components/text-input/text-input.styles.md) (CSS class matrix). Web implementation: `packages/css/src/text-input.css`, `packages/text-input/src/TextInput.tsx`.

---

## Table of contents

1. [What it is](#1-what-it-is)
2. [Layout structure](#2-layout-structure-canonical)
3. [Sizes](#3-sizes)
4. [States](#4-states-field-container)
5. [Motion](#5-motion)
6. [Content and validation](#6-content-and-validation-presentation)
7. [Accessibility intent](#7-accessibility-intent-platform-neutral)
8. [Token quick-reference](#8-token-quick-reference-semantic-only)
9. [Implementation checklist](#9-implementation-checklist)
10. [Playground parity](#10-playground-parity)
11. [Related documents](#11-related-documents)

---

## 1. What it is

A **TextInput** is a **single-line** text field with a **label placed above** the field (not a floating label). It supports optional leading/trailing icons, prefix/suffix text, validation states (error, success), helper or error messaging, optional character count, and readonly/disabled modes.

---

## 2. Layout structure (canonical)

Top to bottom:

1. **Label row** — Primary label text. If required, a **red asterisk** follows the label (decorative for screen readers; required state is also exposed semantically).
2. **Field row** — A **pill-shaped** container (`radius-full` intent) in one horizontal row:
   - Optional **leading icon** (decorative slot).
   - Optional **prefix** text (non-editable).
   - **Editable value** (single line).
   - Optional **suffix** text (non-editable).
   - **Either** optional **trailing icon** **or** the **success checkmark** — success state **replaces** the trailing icon slot; do not show both.
3. **Helper or error line** — At most one: **error message** when in error state and message is provided; otherwise **helper** when provided. Error takes precedence for visibility when `state === error` and error text exists.
4. **Character count** (optional) — Shown when a maximum length is set: `{current}/{max}`, right-aligned below the helper/error line.

**Spacing:** Vertical gap between label and field row, and between field row and helper/error, follows the system spacing scale (web: `gap-4` = 4px between stacked blocks in the column).

---

## 3. Sizes

| Size | Field height | Horizontal padding (field inner) | Value typography | Icon box (width × height) |
|------|--------------|-----------------------------------|------------------|---------------------------|
| `sm` | 40px | 16px | `font-body-sm` (size + line) | matches `font-body-sm` size |
| `md` | 48px | 20px | `font-body-md` | matches `font-body-md` size |
| `lg` | 56px | 24px | `font-body-lg` | matches `font-body-lg` size |

**Label** uses **label-lg** typography tokens (size, weight, line-height, letter-spacing) across all sizes.

**Prefix and suffix** use **body-sm** text size and secondary text color — they do **not** scale up on `lg` in the web implementation (parity: keep fixed unless product changes base spec).

**Helper, error, and character count** use **caption** typography; character count is **secondary** text color and **right-aligned**.

---

## 4. States (field container)

States are **combinable** where noted; implementation applies modifiers in a defined order (see React/CSS reference).

| State | Border | Background | Notes |
|-------|--------|------------|--------|
| **Default** | `color-input-border` | `color-input-bg` | — |
| **Hover** (pointer devices) | `color-input-hover-border` | unchanged | Suppressed when disabled, error, success, readonly, or focused |
| **Focused** | `color-input-focus-border` + **outer ring** 2px `color-input-focus-ring` | `color-input-bg` | Placeholder text fades to disabled text color; leading/trailing icons use primary brand color |
| **Filled** (has value, not focused) | `color-input-filled-border` | unchanged | Not applied when error or success |
| **Error** | **Gradient** border using `color-error-gradient-from` → `color-error-gradient-to` (fill masked so interior matches `color-input-bg`) | `color-input-bg` | **Shake** animation on entry; label stays default color (does not turn red) |
| **Success** | `color-input-hover-border` | unchanged | **Trailing slot** shows animated check icon; use `color-success` (light); dark theme may use `color-success-text` for the icon |
| **Disabled** | `color-input-disabled-border` | `color-input-disabled-bg` | Value and icons use disabled text color; not-allowed cursor |
| **Read-only** | `color-border-subtle` | `color-surface-raised` | Value uses supporting text color; hover border **not** applied |

**Label color:** Default label uses `color-text-default`. On focus (and not disabled), label uses `color-primary`. When disabled, label uses `color-text-secondary`.

**Required asterisk:** `color-error`.

**Theme:** Web CSS may scope adjustments under `[data-theme="dark"]` for error gradient and success icon color. Verify **light**, **dark**, and **elevated** in the playground when documenting edge cases.

---

## 5. Motion

| Element | Duration | Easing | Notes |
|---------|----------|--------|--------|
| Wrapper border / background / box-shadow | 200ms | ease | — |
| Label color | 150ms | ease | — |
| Icon color | 150ms | ease | — |
| Placeholder color | 200ms | ease | Fades to disabled tone when focused |
| Error shake | 300ms | ease-out | Horizontal keyframes: 0 → -4px → +4px → -3px → +2px → 0 |
| Success check | 300ms | ease-out | Scale + opacity pop (0.5 → 1.15 → 1) |

Respect **reduced motion** on platforms that expose it (`prefers-reduced-motion` on web).

---

## 6. Content and validation presentation

- **Controlled value:** Parent owns the string; component reflects `value` always.
- **Error vs helper:** When showing an error message, helper is not described alongside error for assistive tech in the web implementation (see platform docs).
- **Character count:** Shown only when max length is defined; format `current/max`.

---

## 7. Accessibility intent (platform-neutral)

- **Label** must be programmatically associated with the editable control.
- **Required** must be exposed to assistive tech (not only the asterisk).
- **Invalid** state must be exposed when in error.
- **Error message** should be announced when it appears (e.g. live region / alert semantics).
- Decorative icons: hide from accessibility tree.
- **Success** checkmark: decorative if the valid state is clear from message or context; platform docs refine.

---

## 8. Token quick-reference (semantic only)

Use **semantic** tokens only — never primitive palette names in components.

| Role | Tokens |
|------|--------|
| Field border (family) | `color-input-border`, `color-input-hover-border`, `color-input-filled-border`, `color-input-focus-border`, `color-input-focus-ring`, `color-input-disabled-border` |
| Field fill | `color-input-bg`, `color-input-disabled-bg` |
| Error border | `color-error-gradient-from`, `color-error-gradient-to` |
| Value text | `color-text-primary` (default); `color-text-disabled` (disabled); `color-text-supporting` (readonly) |
| Label | `color-text-default` → `color-primary` (focused); `color-text-secondary` (disabled) |
| Helper | `color-text-secondary` |
| Error text | `color-error-text` |
| Icons | `color-text-secondary` → `color-primary` (focused); `color-success` / `color-success-text` (success check, theme-dependent) |
| Required mark | `color-error` |

---

## 9. Implementation checklist

- [ ] Pill field; label above; optional icons, prefix/suffix, helper/error, count.
- [ ] Sizes: 40 / 48 / 56 height; padding 16 / 20 / 24; body typography per size.
- [ ] All states: hover rules, focus ring, filled, error gradient + shake, success + check animation, disabled, readonly.
- [ ] Success replaces trailing icon; no duplicate trailing affordances.
- [ ] Semantic colors only; dark theme uses same tokens (CSS may scope overrides under `[data-theme="dark"]` for error gradient / success icon).
- [ ] Motion timings match §5.

---

## 10. Playground parity

**Visual source of truth:** run the playground (`apps/playground`, e.g. `http://127.0.0.1:5173/`) and compare with **`TextInputPreview`** in [`apps/playground/src/App.tsx`](../../../apps/playground/src/App.tsx).

| Preview row | Intent |
|-------------|--------|
| Default | Controlled empty/default field with placeholder (`label="Default"`, `placeholder="Type here..."`). |
| Error | `state="error"`, `errorText="Invalid email"`, sample value `bad@`. |
| Success | `state="success"`, sample value `user@acko.com`. |
| Disabled | `disabled`, value `Locked`. |

**Usage panel (`TextInputUsage`):** in-context email + password fields inside a card — documents typical `type`, `placeholder`, and stacking; not a separate visual variant matrix.

---

## 11. Related documents

| Document | Role |
|----------|------|
| [`react/text-input-react.md`](./react/text-input-react.md) | React: props, DOM, ARIA, package |
| [`flutter/text-input-flutter.md`](./flutter/text-input-flutter.md) | Flutter: widgets, theme, parity |
| [`../../global.md`](../../global.md) | Tokens, spacing, radii, themes |
