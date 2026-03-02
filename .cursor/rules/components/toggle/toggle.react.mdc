# Toggle — React Implementation Spec

## Props

```tsx
interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ToggleGroupProps {
  type: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

## Behavior

- Toggle: controlled (pressed/onPressedChange) or uncontrolled
- ToggleGroup: single = one selected, multiple = toggle independently
- forwardRef, clsx, named exports, "use client"
