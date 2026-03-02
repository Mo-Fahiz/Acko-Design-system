---
description: Progress React implementation — props, aria, value/max
globs: "**/progress/**,**/Progress/**"
---

# Progress — React

Package: `@acko/progress`
Directive: None (presentational)

## Props Interface

```typescript
interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'error';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}
```

## Accessibility

- `role="progressbar"`
- `aria-valuenow={value}`
- `aria-valuemin={0}`
- `aria-valuemax={max}`
- `aria-label={label}` when provided

## Exports

```typescript
export { Progress } from './Progress';
export type { ProgressProps } from './Progress';
```
