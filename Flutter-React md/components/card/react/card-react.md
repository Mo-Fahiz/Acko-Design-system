# Card — React

> **Scope:** Web. Base spec: [`../card-base.md`](../card-base.md).

## Packages

| Artifact | Location |
|----------|----------|
| Components | `@acko/card` (`Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardInset`) |
| Styles | `@acko/css/card.css` |
| Tokens | `@acko/tokens/tokens.css` — `--radius-card-outer`, `--radius-card-nested`, `--card-content-gutter` |

## Import

```tsx
import { Card, CardHeader, CardContent, CardFooter, CardInset } from "@acko/card";
```

## Props

### `Card`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default"` \| `"secondary"` \| `"elevated"` \| `"outline"` \| `"demoted"` | `"default"` | Visual style |
| `padding` | `"none"` \| `"sm"` \| `"md"` \| `"lg"` | `"md"` | Inner padding tier |
| `className` | `string` | — | Additional CSS classes |
| `children` | `ReactNode` | — | Card content |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

### `CardHeader` / `CardContent` / `CardFooter` / `CardInset`

All accept `className`, `children`, `ref`, and standard `HTMLDivElement` attributes.

## CSS classes

| Class | Role |
|-------|------|
| `.acko-card` | Root — applies `border-radius: var(--radius-card-outer)` (32px) |
| `.acko-card-{variant}` | Variant fill/border/shadow |
| `.acko-card-pad-{tier}` | Padding tier |
| `.acko-card-header` | Header region — flex row, bottom border |
| `.acko-card-content` | Content region — no vertical padding |
| `.acko-card-footer` | Footer region — flex row, top border |
| `.acko-card-inset` | Nested inset — `--radius-card-nested`, demoted bg |

## Usage examples

```tsx
{/* Basic elevated card */}
<Card variant="elevated" padding="md">
  <CardContent className="space-y-16">
    <Typography variant="heading-sm" color="primary">Title</Typography>
    <Typography variant="body-sm" color="secondary">Body text</Typography>
  </CardContent>
  <CardFooter>
    <Button variant="primary" size="sm">Action</Button>
  </CardFooter>
</Card>

{/* Full-bleed media card */}
<Card variant="default" padding="none">
  <div className="h-200 bg-cover bg-center" style={{ backgroundImage: `url(...)` }} />
  <CardContent className="space-y-8">
    <Typography variant="label-md" color="primary">Caption</Typography>
  </CardContent>
</Card>
```

## References

- `packages/card/src/Card.tsx`
- `packages/css/src/card.css`
- [`../card-base.md`](../card-base.md)
