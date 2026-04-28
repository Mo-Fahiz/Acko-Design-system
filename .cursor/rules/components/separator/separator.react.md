---
description: Separator React implementation — props, behavior, accessibility
globs: "**/separator/**,**/Separator/**"
---

# Separator — React

Package: `@acko/separator`
Directive: none (presentational)

## Props Interface

```typescript
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';   // default: 'horizontal'
  decorative?: boolean;                      // default: true
  label?: string;
  className?: string;
}
```

## Component Pattern

- Use `forwardRef<HTMLDivElement, SeparatorProps>`
- When decorative: `role="none"`
- When not decorative: `role="separator"`, `aria-orientation={orientation}`
