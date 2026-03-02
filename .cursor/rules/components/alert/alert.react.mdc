---
description: Alert React implementation — props, dismiss, default icons
globs: "**/alert/**,**/Alert/**"
---

# Alert — React

Package: `@acko/alert`
Directive: `"use client"` (interactive — has dismiss)

## Props Interface

```typescript
interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}
```

## Default Icons (Inline SVGs)

- info: circle with i (circle-i style)
- success: check-circle
- warning: triangle-alert
- error: x-circle

## Accessibility

- `role="alert"`
- Dismiss button: `aria-label="Dismiss alert"`
- Icon: `aria-hidden="true"`

## Exports

```typescript
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
```
