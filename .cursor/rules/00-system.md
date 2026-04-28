---
description: Architecture and conventions for the ACKO Design System
alwaysApply: true
---

# ACKO Design System — System Rules

**Human-readable architecture + doc pipeline:** see [`Flutter-React md/global.md`](../../Flutter-React%20md/global.md) — foundation encyclopedia **and** how `*-base.md`, `react/`, `flutter/`, and `*.style.md` connect across platforms.

You are generating components for the ACKO Design System — a pnpm monorepo of standalone React component packages with a shared CSS package and a dedicated tokens package.

---

## Monorepo Layout

```
packages/
  tokens/      @acko/tokens — CSS custom properties + Tailwind v4 theme mapping
  css/         @acko/css    — one CSS file per component (button.css, card.css, …)
  button/      @acko/button — React component
  text-input/  @acko/text-input
  dropdown/    @acko/dropdown
  card/        @acko/card
  badge/       @acko/badge
  checkbox/    @acko/checkbox
  …
  react/       @acko/react  — meta re-export of all components
apps/
  playground/  Vite React app for development and demo
```

## Package Conventions

Each React component package follows this structure:

```
packages/<name>/
  package.json
  tsconfig.json    extends @acko/tsconfig/react-library.json
  src/
    index.ts       public API — named exports only
    <Name>.tsx     component implementation
```

### package.json shape

```json
{
  "name": "@acko/<name>",
  "version": "1.0.0",
  "type": "module",
  "sideEffects": false,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "dependencies": {
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@acko/tsconfig": "workspace:*",
    "typescript": "~5.9.0"
  }
}
```

### tsconfig.json shape

```json
{
  "extends": "@acko/tsconfig/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src"]
}
```

Build is **tsc only** — no bundler. Output is ESM JavaScript + declaration files.

---

## Token Architecture

```
@acko/tokens/tokens.css   →  @acko/tokens/theme.css   →  @acko/css/button.css   →  Consumer app
(CSS custom properties)       (@theme inline mapping)      (@apply + raw CSS)
```

### `@acko/tokens` Package

Contains two files:

1. **`tokens.css`** — All CSS custom properties: primitives, semantics, all 3 themes (light/dark/elevated), typography tokens, scale, opacity, z-index, hairline border, font-face declarations
2. **`theme.css`** — `@theme inline` block mapping semantic tokens to Tailwind v4 utilities

### `@theme inline` — Key Design Decision

Tailwind v4's `@theme inline` creates utility classes WITHOUT generating CSS custom properties. This avoids namespace collisions since `tokens.css` already defines `--color-primary`, `--shadow-*`, etc. on `:root`.

```css
/* theme.css */
@theme inline {
  --color-primary: var(--color-primary);
  --color-on-primary: var(--color-on-primary);
  --shadow-btn-inner: var(--shadow-btn-inner);
  --radius-full: var(--radius-full);
  /* … all semantic tokens mapped … */
}
```

### Token Flow

```
primitives (raw values) → semantics (role mappings) → component CSS
--purple-600              --color-primary             .acko-btn-primary { @apply bg-primary text-on-primary; }
--grey-200                --color-border              .acko-text-input { @apply border-border; }
```

### Absolute rules

1. Component CSS MUST only reference **semantic tokens** (`--color-primary`, `--color-border`, etc.)
2. **Never** use primitive tokens (`--purple-600`, `--grey-200`) in component CSS
3. Theme switching is automatic via `[data-theme="dark"]` or `[data-theme="elevated"]` on `<html>`
4. Spacing and sizing use **Tailwind utilities** powered by `--spacing: 0.0625rem` (1px base). The utility number equals the pixel value (`gap-12` = 12px, `h-48` = 48px). No `--scale-*` or `--space-*` tokens exist.
5. Color and shadow tokens remap between themes — always go through semantics
6. **Never use raw pixel values** for `border-radius`, spacing, or component dimensions — always use a `--radius-*` token or a Tailwind spacing utility
7. Shadow values use the tiered `--shadow-xs` through `--shadow-2xl` scale — never paste raw `box-shadow` values

### Universal Border Radius Rule

Components are assigned radius by **semantic role**, not arbitrary size:

| Role | Token | Value | Used by |
|---|---|---|---|
| Interactive controls | `--radius-full` | pill | Buttons, chips, badges, pagination, tabs |
| Input containers | `--radius-full` | pill | TextInput, Dropdown trigger, InputGroup |
| Surface containers | `--radius-4xl` | 20px | Cards, dialogs, drawers, toasts, dropdown menus, calendar panels |
| Small controls | `--radius-sm` / `--radius-md` | 4–6px | Checkboxes, tooltips |

**Nested radius formula:** When a child element fills a container edge-to-edge, its radius must be `container radius − padding`. Use the `--radius-inset-*` tokens:

```
Container (--radius-4xl: 20px)
├── pad-sm (p-12, 12px)  → child uses --radius-inset-sm (8px)
├── pad-md (p-16, 16px)  → child uses --radius-inset-md (4px)
└── pad-lg (p-24, 24px)  → child uses --radius-inset-lg (0px)
```

**Pill buttons inside cards:** A pill CTA must never touch the card edge. Full-width buttons sit inside the padded content zone — the card's padding creates the visual separation. Minimum card padding when a CTA is present: `pad-md` (`p-16`, 16px).

---

## CSS Package (`@acko/css`)

The CSS package contains one CSS file per component:

```
packages/css/
  src/
    button.css       Button-specific styles
    text-input.css   TextInput-specific styles
    …
  package.json
```

> **Note:** `tokens.css` has moved to `@acko/tokens`. The CSS package only contains component styles.

### CSS Class Naming

Use the `acko-` prefix with flat kebab-case. No BEM. No CSS Modules.

```
acko-btn              base
acko-btn-primary      variant
acko-btn-sm           size
acko-btn-loading      state
acko-btn-disabled     state
acko-btn-spinner      child element
acko-btn-full-width   modifier
```

Pattern: `acko-{component}[-{variant|size|state|child|modifier}]`

### What uses `@apply` vs Raw CSS

| Uses `@apply` | Uses Raw CSS |
|----|----|
| Layout: `inline-flex`, `flex`, `grid` | Multi-property `transition` |
| Alignment: `items-center`, `justify-center` | `@keyframes` animations |
| Spacing: `gap-12`, `p-16`, `m-8` (number = px) | `[data-theme="dark"]` overrides |
| Sizing: `h-48`, `w-240`, `w-full`, `min-h-*` | `[data-theme="elevated"]` overrides |
| Typography: `text-base`, `font-medium`, `leading-6` | `@media (hover:hover)` hover blocks |
| Colors: `bg-primary`, `text-on-primary` | `::before`/`::after` pseudo-elements |
| Shadows: `shadow-btn-inner` | Compound `box-shadow` stacks |
| Border radius: `rounded-full`, `rounded-2xl` | `backdrop-filter` |
| Cursor: `cursor-pointer`, `cursor-not-allowed` | `text-shadow` |
| Selection: `select-none` | |
| Position: `relative`, `absolute` | |
| Whitespace: `whitespace-nowrap` | |
| Display: `hidden` (sr-only) | |

**Rule**: ALL styling goes in the CSS file. React components contain zero Tailwind utilities — they only compose CSS class names via `clsx`.

---

## React Component Pattern

```tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size = 'md', loading, disabled, className, children, ...rest }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={clsx(
          'acko-btn',
          `acko-btn-${variant}`,
          `acko-btn-${size}`,
          loading && 'acko-btn-loading',
          isDisabled && 'acko-btn-disabled',
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
```

### Hard rules for React components

1. Always use `forwardRef` — consumers need ref access
2. Always spread `...rest` onto the root element
3. Always accept `className` prop and merge it last via `clsx`
4. Always use named exports — no default exports
5. Interactive components must include `"use client"` directive at top of file
6. Pure presentational components (Badge, Typography, Card) omit it
7. Never import from `@acko/css` in the React package — CSS is consumer-imported
8. Use `clsx` for class composition — no template literals for conditional classes
9. Type all props with explicit interfaces — export the interface
10. **Zero Tailwind utilities in React** — all visual styling is in the CSS file via `@apply`

### Consumer usage

```tsx
// app.css — CSS import chain
@import "tailwindcss";
@import "@acko/tokens/tokens.css";
@import "@acko/tokens/theme.css";
@import "@acko/css/button.css";
```

```tsx
// App.tsx
import { Button } from '@acko/button';

<Button variant="primary" size="md">Get Quote</Button>
```

---

## Dependencies

| Package | Used for |
|---|----|
| `clsx` | Class name composition in React components |
| `lucide-react` | UI icons (peer dependency — consumer installs) |
| `react` / `react-dom` | Peer dependency ≥18 |

`lucide-react` is a **peer dependency** — listed in `peerDependencies` only when the component uses icons. Never bundle it.

---

## Skill File Read Order

When generating a component, read these files in order:

1. [`Flutter-React md/global.md`](../../Flutter-React%20md/global.md) — tokens, foundation, **documentation pipeline**
2. This file (`00-system.md`) — web monorepo architecture and conventions
3. `foundation/colors-semantic.md` — which tokens to use for colors
4. `Flutter-React md/components/<name>/<name>-base.md` — platform-agnostic visual + behavior contract
5. `components/<name>/<name>.styles.md` — CSS classes (`acko-*`), `@apply`, raw CSS (Button uses `button.style.md`; same role)
6. `components/<name>/<name>.react.md` — React props, DOM, a11y
7. `Flutter-React md/components/<name>/react/<name>-react.md` and `Flutter-React md/components/<name>/flutter/<name>-flutter.md` — human-readable platform tracks

Foundation files (`typography`, `radii`, `shadows`, `motion`, `scales`, `layout`, …) are reference material. Each includes a **Documentation scope** section: portable rules vs web-only phrasing.
