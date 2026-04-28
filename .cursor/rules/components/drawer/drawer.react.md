---
description: Drawer/Sheet component React API
globs: "packages/drawer/src/**"
alwaysApply: false
---

# Drawer — React API

## Props
```tsx
type DrawerSide = 'left' | 'right' | 'bottom' | 'top';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;       // default: 'right'
  size?: 'sm' | 'md' | 'lg' | 'full';  // default: 'md'
  title?: string;
  description?: string;
  dismissible?: boolean;   // default: true
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}
```

## Behaviour
- DOM is always present but hidden via `visibility: hidden` when closed (enables CSS transitions)
- Focus moved in on open, restored on close
- `overflow: hidden` on body while open
- Escape key and backdrop click close when `dismissible=true`
- `role="dialog"`, `aria-modal="true"` always present

## Usage
```tsx
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  side="right"
  title="Claim details"
  footer={<Button variant="primary" onClick={handleDone}>Done</Button>}
>
  <p>Detail content here.</p>
</Drawer>
```
