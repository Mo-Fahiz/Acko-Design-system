---
description: Dialog/Modal component React API
globs: "packages/dialog/src/**"
alwaysApply: false
---

# Dialog — React API

## Props
```tsx
interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';  // default: 'md'
  dismissible?: boolean;                          // default: true
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}
```

## Behaviour
- Renders `null` when `open` is false (no hidden DOM)
- Focus is moved into the dialog on open, restored on close
- `document.body.style.overflow = 'hidden'` while open
- Escape key closes when `dismissible=true`
- Backdrop click closes when `dismissible=true`
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`/`aria-describedby` wired automatically

## Usage
```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm action"
  description="This cannot be undone."
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
  </>}
>
  <p>Body content here.</p>
</Dialog>
```
