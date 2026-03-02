# Tooltip — React Implementation Spec

## Props

```tsx
interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';  // default: 'top'
  align?: 'start' | 'center' | 'end';         // default: 'center'
  delayMs?: number;                            // default: 200
  children: React.ReactElement;
  className?: string;
}
```

## Behavior

- onMouseEnter/onMouseLeave with delay timeout
- Position via getBoundingClientRect on trigger
- Render via createPortal to document.body
- Show/hide with opacity + transform animation
- useRef for trigger element
- forwardRef, clsx, named exports, "use client"
