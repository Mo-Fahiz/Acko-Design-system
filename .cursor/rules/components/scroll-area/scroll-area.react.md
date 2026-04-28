---
description: ScrollArea React implementation — props and behavior
globs: "**/scroll-area/**,**/ScrollArea/**"
---

# ScrollArea — React

Package: `@acko/scroll-area`
Directive: None (presentational)

## Props Interface

```typescript
interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';  // default: 'vertical'
  maxHeight?: string | number;
  maxWidth?: string | number;
  style?: React.CSSProperties;
}
```

## Key Behaviors

- Presentational wrapper with custom scrollbar styling
- maxHeight/maxWidth accept px numbers or CSS strings
- orientation controls overflow direction(s)

## Exports

```typescript
export { ScrollArea } from './ScrollArea';
export type { ScrollAreaProps } from './ScrollArea';
```
