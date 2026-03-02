---
description: Accessibility checklist and ARIA patterns for all components
---

# Accessibility

Checklist and patterns to verify before finalizing any component.

## Universal Rules

1. All interactive elements must be keyboard-operable
2. Focus must be visible — use `--shadow-focus-ring` on `:focus-visible`
3. Never remove `outline` without providing an alternative focus indicator
4. Color alone must not convey meaning — use icons, text, or patterns too
5. Touch targets minimum 44×44px on mobile
6. Hover states gated by `@media (hover: hover) and (pointer: fine)`

## ARIA Pattern Reference

### Button
- Native `<button>` — no ARIA role needed
- `aria-busy="true"` when loading
- `aria-disabled="true"` when disabled
- Loading: include `<span className="sr-only">Loading, please wait</span>`

### TextInput
- `<label htmlFor={id}>` linked to `<input id={id}>`
- `aria-required` when required
- `aria-invalid` when error state
- `aria-describedby` → error or helper text element
- Error text: `role="alert"` for screen reader announcement

### Dropdown
- Trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`
- Menu: `role="listbox"`, `aria-labelledby`
- Options: `role="option"`, `aria-selected`, `aria-disabled`
- Multi: `aria-multiselectable="true"` on listbox
- Keyboard: Enter/Space select, Arrow nav, Escape close, Home/End first/last

### Checkbox
- Hidden native `<input type="checkbox">` — SR interacts with native input
- `aria-invalid` on error
- `aria-describedby` for description text
- Visual box: `aria-hidden="true"`
- `indeterminate` set via JS property (not HTML attribute)

### Card
- No special ARIA — semantic structure via children
- Consumers add headings (`h2`, `h3`) for card titles

### Badge
- Removable: `aria-label="Remove {text}"` on remove button
- Dot indicator: `aria-hidden="true"`
- CounterBadge: `aria-label="{count} items"`

## Focus Management

- Dropdown: on open → focus first option or search input; on close → return focus to trigger
- Modal (future): trap focus within, return to trigger on close
- Wizard (future): focus step heading on navigation

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Include in `@acko/css/tokens.css`.

## Screen Reader Utility

Components use `sr-only` class for visually hidden text:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

Tailwind provides this as the `sr-only` utility class.
