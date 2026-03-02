---
description: Textarea React implementation — props, behavior, accessibility
globs: "**/textarea/**,**/Textarea/**"
---

# Textarea — React

Package: `@acko/textarea`
Directive: `"use client"` (interactive)

## Props Interface

```typescript
interface TextareaProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;                   // default: 4
  resize?: 'vertical' | 'horizontal' | 'both' | 'none';  // default: 'vertical'
  maxLength?: number;
  showCount?: boolean;
  state?: 'default' | 'error' | 'success';
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}
```

## Key Behaviors

- Controlled or uncontrolled: `value` + `onChange` optional
- Internal `focused` state drives focus ring class
- Footer shows helper/error and optional character count

## Accessibility

- `aria-required`, `aria-invalid`, `aria-describedby`
- Label linked via `htmlFor` / `id` when label provided
- Error text with `role="alert"`
- Character count with `aria-live="polite"`

## Exports

```typescript
export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';
```
