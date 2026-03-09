---
description: Skeleton React implementation — props, multi-line support
globs: "**/skeleton/**,**/Skeleton/**"
---

# Skeleton — React

Package: `@acko/skeleton`
Directive: none (presentational)

## Props Interface

```typescript
interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}
```

## Behavior

- When `lines` is set, renders multiple stacked text skeletons
- Last line renders at `width: 75%` for visual variation
- Custom `width`/`height` override defaults per variant

## Exports

```typescript
export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';
```
