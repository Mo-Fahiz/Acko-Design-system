---
description: Field React implementation — props, composition
globs: "**/field/**,**/Field/**"
---

# Field — React

Package: `@acko/field`
Directive: none (presentational)

## Props Interface

```typescript
interface FieldProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}
```

## Component Pattern

- Use `forwardRef<HTMLDivElement, FieldProps>`
- Renders: label (with htmlFor), children (input), helper text or error text
- When errorText is present, show error instead of helper
- Error span uses `role="alert"` for a11y
