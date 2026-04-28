---
description: Toast/Snackbar component React API
globs: "packages/toast/src/**"
alwaysApply: false
---

# Toast — React API

## Exports
- `ToastProvider` — wrap the app root
- `useToast` — hook: returns `{ toast, dismiss, dismissAll }`

## ToastProvider props
```tsx
interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;  // default: 'top-right'
  maxToasts?: number;        // default: 5
}
```

## toast() options
```tsx
interface ToastItem {
  id: string;               // auto-generated
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  duration?: number;        // ms, default 4000; Infinity = no auto-dismiss
  dismissible?: boolean;    // default: true
  action?: { label: string; onClick: () => void };
}
```

## Behaviour
- Returns `id` string for programmatic dismiss
- Auto-dismisses after `duration` ms via `setTimeout`
- Max `maxToasts` visible at once — oldest removed when exceeded
- Each toast: `role="status"`, `aria-live="polite"`

## Usage
```tsx
// At app root
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// In any component
const { toast } = useToast();
toast({ variant: 'success', title: 'Saved!', description: 'Your changes were saved.' });
```
