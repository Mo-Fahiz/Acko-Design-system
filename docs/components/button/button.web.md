# Button — Web (React + CSS)

## Packages

| Artifact | Location |
|----------|----------|
| React | `@acko/button` |
| Styles | `@acko/css/button.css` (import in the consumer app with tokens + theme) |

## Imports (consumer)

```tsx
// app.css (or equivalent)
@import "tailwindcss";
@import "@acko/tokens/tokens.css";
@import "@acko/tokens/theme.css";
@import "@acko/css/button.css";
```

```tsx
import { Button } from '@acko/button';
```

## CSS model

- Root class: `acko-btn`.
- Modifiers: `acko-btn-{variant}`, `acko-btn-{size}`, `acko-btn-icon-only`, `acko-btn-loading`, `acko-btn-disabled`, `acko-btn-full-width`.
- Icons sit in `acko-btn-icon`; loading uses `acko-btn-spinner` / dot animation per stylesheet.
- **No Tailwind utilities in TSX** — only `acko-*` classes composed with `clsx`.

See `.cursor/rules/components/button/button.styles.mdc` for full class matrix, hover (`@media (hover: hover) and (pointer: fine)`), focus-visible, dark theme, and keyframes.

## React API (summary)

```typescript
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant: 'primary' | 'secondary' | 'inverted' | 'ghost' | 'link' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconOnly?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  className?: string;
}
```

Details and full pattern: `.cursor/rules/components/button/button.react.mdc`.

## Accessibility (web)

| Technique | When |
|-----------|------|
| Native `<button>` | Default role and keyboard activation. |
| `aria-busy` | `loading === true` |
| `aria-disabled` | `disabled || loading` |
| `aria-hidden` on decorative icons | Icon spans and spinner |
| Visually hidden loading text | e.g. “Loading, please wait” for screen readers |
| Focus | CSS `:focus-visible` + `--shadow-focus-ring` |

## Responsive notes

- Consider `fullWidth` for primary actions on narrow viewports.
- `xs` (32px height) is **not** ideal as a touch target; prefer `sm+` on touch-first layouts.

## Alignment with neutral spec

The platform-neutral behavior and token intent are in `button.spec.md`. This file adds **DOM, CSS, and React** specifics only.
