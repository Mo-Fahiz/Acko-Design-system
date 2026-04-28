---
description: Radio React implementation — props, behavior, accessibility
globs: "**/radio/**,**/Radio/**"
---

# Radio — React

Package: `@acko/radio`
Directive: `"use client"` (interactive)

## Props Interface

```typescript
interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  disabled?: boolean;
  error?: boolean;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}
```

## Accessibility

- `role="radiogroup"` with `aria-labelledby`
- Hidden native `<input type="radio">` with visually hidden class
- `:focus-visible` on native input targets the custom circle

## Exports

```typescript
export { RadioGroup } from './RadioGroup';
export type { RadioGroupProps, RadioOption } from './RadioGroup';
```
