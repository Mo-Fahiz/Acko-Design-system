---
description: Table React implementation — composable sub-components, props
globs: "**/table/**,**/Table/**"
---

# Table — React

Package: `@acko/table`
Directive: none (presentational)

## Props Interfaces

```typescript
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

## Sub-components

`TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`

All are thin wrappers applying the corresponding CSS class via `clsx`.

## Exports

```typescript
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from './Table';
export type { TableProps } from './Table';
```
