---
description: InputGroup React implementation — props and behavior
globs: "**/input-group/**,**/InputGroup/**"
---

# InputGroup — React

Package: `@acko/input-group`
Directive: `"use client"` (interactive, contains focusable children)

## Props Interface

```typescript
interface InputGroupProps {
  children: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';     // default: 'md'
  disabled?: boolean;
  error?: boolean;
  className?: string;
}
```

## Key Behaviors

- Wraps a single input/select as children
- Prefix/suffix render in bordered slots
- Focus-within on the group shows focus ring
- Disabled applies pointer-events: none to entire group

## Exports

```typescript
export { InputGroup } from './InputGroup';
export type { InputGroupProps } from './InputGroup';
```
