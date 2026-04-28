# Accordion — React Implementation Spec

## Props

```tsx
interface AccordionItem {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  type: 'single' | 'multiple';
  items: AccordionItem[];
  defaultValue?: string | string[];
  collapsible?: boolean;  // default: true for single
  className?: string;
}
```

## Behavior

- Use state to track open items
- Single: only one open at a time; collapsible allows closing the open item
- Multiple: toggle independently
- Animate by measuring content height and setting max-height on wrapper
- Chevron: inline SVG 18×18 chevron-down
- forwardRef, clsx, named exports, "use client"
