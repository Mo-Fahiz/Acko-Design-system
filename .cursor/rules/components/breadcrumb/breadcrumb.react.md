---
description: Breadcrumb React implementation — props, behavior, accessibility
globs: "**/breadcrumb/**,**/Breadcrumb/**"
---

# Breadcrumb — React

Package: `@acko/breadcrumb`
Directive: None (presentational)

## Props Interface

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
  className?: string;
}
```

## Key Behaviors

- `maxItems` collapses middle items into an ellipsis button
- Default separator is a chevron-right SVG
- Last item renders as `<span>` with `aria-current="page"`
- Items with `href` render as `<a>`, otherwise `<span>`

## Accessibility

- `<nav aria-label="Breadcrumb">`
- `<ol>` for ordered list semantics
- `aria-current="page"` on the current (last) item
- Separator items have `aria-hidden`
- Ellipsis button has `aria-label="Show more breadcrumb items"`

## Exports

```typescript
export { Breadcrumb } from './Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb';
```
