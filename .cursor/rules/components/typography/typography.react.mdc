---
description: Typography React implementation — props, polymorphic as, defaults
globs: "**/typography/**,**/Typography/**"
---

# Typography — React

Package: `@acko/typography`
Directive: None (presentational)

## Props Interface

```typescript
interface TypographyProps {
  variant: 'display-xl' | 'display-lg' | 'display-md' | 'display-sm' | 'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm' | 'body-lg' | 'body-md' | 'body-sm' | 'label-lg' | 'label-md' | 'label-sm' | 'caption' | 'overline';
  as?: React.ElementType;
  color?: 'primary' | 'secondary' | 'invert' | 'brand' | 'error' | 'success' | 'static';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

## Color Prop

| Value | CSS class | Token | Use case |
|-------|-----------|-------|----------|
| `primary` (default) | `acko-text-color-primary` | `--color-text-primary` | General use — headings, values, main content |
| `secondary` | `acko-text-color-secondary` | `--color-text-secondary` | Subtext — helpers, captions, descriptions |
| `invert` | `acko-text-color-invert` | `--color-text-invert` | Text on dark/filled backgrounds regardless of theme |
| `brand` | `acko-text-color-brand` | `--color-text-brand` | Brand-colored text — links, emphasis |
| `error` | `acko-text-color-error` | `--color-text-error` | Error messages |
| `success` | `acko-text-color-success` | `--color-text-success` | Success messages |
| `static` | `acko-text-color-static` | `--color-text-static` | Fixed color across themes — does not change |

## Default `as` Mapping

- display-* → h1
- heading-xl/lg → h2
- heading-md/sm → h3
- body-* → p
- label-* → span
- caption → span
- overline → span

## Exports

```typescript
export { Typography } from './Typography';
export type { TypographyProps, TypographyVariant, TypographyColor, TypographyWeight, TypographyAlign } from './Typography';
```
