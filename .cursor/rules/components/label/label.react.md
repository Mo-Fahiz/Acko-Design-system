---
description: Label React implementation — props, behavior
globs: "**/label/**,**/Label/**"
---

# Label — React

Package: `@acko/label`
Directive: none (presentational)

## Props Interface

```typescript
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';           // default: 'md'
  children: React.ReactNode;
  className?: string;
}
```

## Component Pattern

- Use `forwardRef<HTMLLabelElement, LabelProps>`
- Spread `...rest` for htmlFor, id, etc.
- Required asterisk uses `.acko-label-required` class
