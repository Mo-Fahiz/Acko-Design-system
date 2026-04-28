# Button — React

> **Scope:** Web implementation only. **Do not change** colors, sizes, states, or motion from [`../button-base.md`](../button-base.md). This file documents packages, DOM structure, props, and ARIA. **Playground mapping:** see [`../button-base.md`](../button-base.md) §21 (Playground parity).

## Packages

| Artifact | Location |
|----------|----------|
| React | `@acko/button` |
| Styles | `@acko/css/button.css` |

## Consumer imports

```tsx
// app.css
@import "tailwindcss";
@import "@acko/tokens/tokens.css";
@import "@acko/tokens/theme.css";
@import "@acko/css/button.css";
```

```tsx
import { Button } from "@acko/button";
```

## CSS surface (summary)

- All visual styling lives in **`@acko/css/button.css`**. React uses **no** Tailwind utility classes on the element — only `acko-*` classes via `clsx`.
- Full class matrix, hover (`@media (hover: hover) and (pointer: fine)`), focus-visible, dark theme, dot-wave keyframes: **`.cursor/rules/components/button/button.style.md`** (must match `packages/css/src/button.css` / playground).

Root modifiers: `acko-btn`, `acko-btn-{variant}`, `acko-btn-{size}`, optional `acko-btn-icon-only`, `acko-btn-loading`, `acko-btn-disabled`, `acko-btn-full-width`.

## Props

`ButtonProps` extends `Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">` plus:

| Prop | Type | Default | Notes |
|------|------|---------|--------|
| `variant` | `primary` \| `secondary` \| `inverted` \| `ghost` \| `link` \| `danger` | — | required |
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md` | |
| `loading` | boolean | — | sets `aria-busy`, disables control |
| `iconLeft` | `ReactNode` | — | decorative; `aria-hidden` on wrapper |
| `iconRight` | `ReactNode` | — | decorative |
| `iconOnly` | boolean | — | label in `sr-only`; square hit target |
| `fullWidth` | boolean | — | `acko-btn-full-width` |
| `type` | `button` \| `submit` \| `reset` | `button` | |
| `children` | `ReactNode` | — | required |
| `disabled` | boolean | — | |

`isDisabled = disabled || loading`. Native `disabled` reflects `isDisabled`.

## DOM structure (canonical — matches source)

Implementations **must** preserve this tree so loading / icon-only CSS works:

```tsx
<button /* clsx acko-btn + modifiers */>
  <span className="acko-btn-content">
    {iconLeft && <span className="acko-btn-icon" aria-hidden="true">…</span>}
    {iconOnly ? (
      <span className="sr-only">{children}</span>
    ) : (
      <span className="acko-btn-label">{children}</span>
    )}
    {iconRight && <span className="acko-btn-icon" aria-hidden="true">…</span>}
  </span>
  {loading && (
    <>
      <span className="acko-btn-dots" aria-hidden="true">
        <span className="acko-btn-dot" />
        <span className="acko-btn-dot" />
        <span className="acko-btn-dot" />
      </span>
      <span className="sr-only">Loading, please wait</span>
    </>
  )}
</button>
```

## Accessibility

| Technique | When |
|-----------|------|
| Native `<button>` | Role + Enter/Space |
| `aria-busy={true}` | `loading` |
| `aria-disabled` | `disabled \|\| loading` |
| `aria-hidden` on icons + dots | Decorative only |
| `sr-only` | Icon-only label; loading copy |

Focus ring: CSS `:focus-visible` → `shadow-focus-ring` (see base spec for danger/secondary compound rules).

## Behavior notes

- `onClick` and other DOM props: `...rest` on `<button>`.
- Loading: `pointer-events: none` via `acko-btn-loading`.
- Sentence case labels: see `Flutter-React md/global.md` → Typography / Text casing.

## Responsive

- Narrow viewports: prefer `fullWidth` for primary/secondary CTAs.
- `xs` (32px height) is not a sufficient touch target; use `sm+` on touch-first layouts.

## References

- [`../button-base.md`](../button-base.md) — full visual specification.
- `.cursor/rules/components/button/button.react.md` — Cursor rule mirror (keep in sync with `packages/button/src/Button.tsx`).
- `.cursor/rules/components/button/button.style.md` — CSS class + token reference.
