# Tabs — React Implementation Spec

## Props

```tsx
interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'underline' | 'pill' | 'enclosed';  // default: 'underline'
  size?: 'sm' | 'md';                           // default: 'md'
  fullWidth?: boolean;
  className?: string;
}
```

## Behavior

- Controlled: value + onChange
- role="tablist", role="tab", aria-selected, aria-disabled
- forwardRef, clsx, named exports, "use client"
