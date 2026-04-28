# Typography — React

> [`../typography-base.md`](../typography-base.md)

## Packages

| Artifact | Location |
|----------|----------|
| Component | `@acko/typography` |
| Styles | `@acko/css/typography.css` |
| Tokens | `@acko/tokens/tokens.css` — `--font-*-size`, `--font-*-line`, `--font-*-weight`, `--font-*-spacing` |

## Import

```tsx
import { Typography } from "@acko/typography";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `TypographyVariant` | — | Type scale level (see base spec §3) |
| `color` | `"primary"` \| `"secondary"` \| `"invert"` \| `"brand"` \| `"error"` \| `"success"` \| `"static"` | `"primary"` | Semantic color |
| `weight` | `"regular"` \| `"medium"` \| `"semibold"` \| `"bold"` | (variant default) | Weight override |
| `align` | `"left"` \| `"center"` \| `"right"` | — | Text alignment |
| `as` | `React.ElementType` | (auto) | Override rendered element |
| `truncate` | `boolean` | `false` | Truncate with ellipsis |
| `className` | `string` | — | Additional classes |
| `children` | `ReactNode` | — | Text content |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## CSS class mapping

| Class pattern | Role |
|--------------|------|
| `.acko-text` | Base — inherits font-family |
| `.acko-text-{variant}` | Size, line-height, weight, spacing |
| `.acko-text-color-{color}` | Semantic text color |
| `.acko-text-weight-{weight}` | Weight override (400/500/600/700) |
| `.acko-text-align-{align}` | Text alignment |
| `.acko-text-truncate` | Overflow ellipsis |

## Usage examples

```tsx
{/* Default heading */}
<Typography variant="heading-lg" color="primary">Section title</Typography>

{/* Bold override for emphasis */}
<Typography variant="body-md" weight="bold">Important note</Typography>

{/* Semibold heading for card titles */}
<Typography variant="heading-sm" weight="semibold" color="primary">Card title</Typography>
```

## References

- `packages/typography/src/Typography.tsx`
- `packages/css/src/typography.css`
- [`../typography-base.md`](../typography-base.md)
