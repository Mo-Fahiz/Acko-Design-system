---
description: Form component React API
globs: "packages/form/src/**"
alwaysApply: false
---

# Form — React API

## Exports
- `Form` — root form element with state management context
- `FormItem` — wraps a single field (label + input + error message)
- `FormLabel` — label element with required indicator
- `FormMessage` — helper/error text
- `useFormContext` — access form state in nested components

## Form props
```tsx
interface FormProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
  children: ReactNode;
  className?: string;
  noValidate?: boolean;  // default: true
}
```

## FormItem props
```tsx
interface FormItemProps {
  name: string;       // field name — keys into error map
  children: ReactNode;
  className?: string;
}
```

## FormLabel props
```tsx
interface FormLabelProps {
  htmlFor?: string;
  required?: boolean;  // appends * in error color
  children: ReactNode;
  className?: string;
}
```

## Context value (useFormContext)
```tsx
interface FormContextValue {
  state: 'idle' | 'submitting' | 'success' | 'error';
  errors: Record<string, { message: string }>;
  setError: (name: string, error: { message: string } | null) => void;
  clearErrors: () => void;
}
```

## Behaviour
- `onSubmit` is wrapped: sets `state = 'submitting'` while promise is pending
- `aria-busy` is set on `<form>` while submitting
- `FormItem` reads errors keyed by `name` and auto-renders error text with `role="alert"`
- Programmatic errors via `setError('field', { message: '...' })` from `useFormContext`

## Usage
```tsx
<Form onSubmit={handleSubmit}>
  <FormItem name="email">
    <FormLabel htmlFor="email" required>Email</FormLabel>
    <TextInput id="email" value={email} onChange={setEmail} label="Email" />
    <FormMessage>We'll send your policy documents here.</FormMessage>
  </FormItem>
  <Button variant="primary" type="submit">Submit</Button>
</Form>
```
