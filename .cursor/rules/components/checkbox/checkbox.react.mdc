---
description: Checkbox system — atom, row, group, and multi-select integration patterns
globs: "**/checkbox/**,**/Checkbox/**"
---

# Checkbox — React

Package: `@acko/checkbox`
Directive: `"use client"` (interactive)

## Component Hierarchy

```
Checkbox (atom)           — standalone toggle for single confirmations
CheckboxRow               — universal selection item for any multi-select list
CheckboxGroup             — convenience wrapper: list of CheckboxRows with shared state
```

## Composition Principle

`CheckboxRow` is the **single source of truth** for multi-select list items in any context.
The container changes based on context — the selection item stays the same:

```
Inline list (page/card)   → CheckboxRow items directly in page
Desktop multi-select      → Dropdown variant="multi" renders CheckboxRow inside acko-dropdown-menu
Mobile multi-select       → Drawer side="bottom" contains CheckboxRow items
```

This pattern applies to **any domain** — filters, preferences, permissions, features, categories, tags, etc. It is not limited to any specific use case.

## Checkbox (atom)

For standalone, single-use checkboxes (confirmations, opt-ins, inline toggles).

```typescript
interface CheckboxProps {
  label?: string;
  description?: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
  className?: string;
}
```

## CheckboxRow

Full-width tappable row. Responsive by default: checkbox on LEFT for desktop, checkbox on RIGHT for mobile (CSS-driven via media query, no prop needed).

```typescript
interface CheckboxRowProps {
  label: string;
  description?: string;   // omit for title-only rows
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
  indeterminate?: boolean;
  className?: string;
}
```

- Pass `description` for title + subtext rows; omit it for title-only rows.
- Desktop: `md` box (20px), min-h-44, py-12, hover background.
- Mobile: `lg` box (24px), min-h-52, py-16, active background.
- No horizontal padding — inherited from parent container.

## CheckboxGroup

Wraps multiple `CheckboxRow`s as a flat list with shared state.

```typescript
interface CheckboxRowOption {
  value: string;
  label: string;
  description?: string;
}

interface CheckboxGroupProps {
  label: string;
  options: CheckboxRowOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
  className?: string;
}
```

## When to Use Which

Use `CheckboxRow` / `Dropdown variant="multi"` for **any** multi-select context. These are generic, reusable patterns — not tied to any specific domain.

| Need | Component |
|------|-----------|
| User confirms a single statement (T&C, opt-in) | `Checkbox` (atom) |
| User selects multiple items from a visible list | `CheckboxRow` directly, or `CheckboxGroup` |
| User selects multiple items from a collapsed list (desktop) | `Dropdown variant="multi"` |
| User selects multiple items from a collapsed list (mobile) | `Dropdown variant="multi" mobileMode="sheet"` (default) |
| User picks one item from a list | `Dropdown variant="single"` (no checkbox) |

### Example contexts (not exhaustive)

- Insurance add-ons, policy features
- Filter panels (categories, tags, statuses)
- Permissions and role management
- Notification preferences
- Feature toggles in settings
- Multi-city or multi-item selection

## Multi-Select Patterns

### Desktop — `Dropdown variant="multi"`

The `Dropdown` component internally renders `CheckboxRow` inside `acko-dropdown-menu` when `variant="multi"`. The menu forces `flex-direction: row-reverse` (checkbox left), adds `px-12` padding and `border-radius` to match single-select option alignment, and uses `--color-primary-subtle` for hover.

```tsx
<Dropdown
  label="Filter by category"
  variant="multi"
  options={categoryOptions}
  value={selectedCategories}
  onChange={setSelectedCategories}
/>
```

### Mobile — `Dropdown mobileMode="sheet"`

Use the `Dropdown` component's built-in `mobileMode="sheet"` prop. It automatically opens a `Drawer side="bottom"` with `CheckboxRow` items on mobile, eliminating the need for manual `Drawer` + trigger composition.

```tsx
<Dropdown
  label="Select items"
  variant="multi"
  mobileMode="sheet"
  options={options}
  value={selected}
  onChange={setSelected}
/>
```

Since `mobileMode="sheet"` is the default for `variant="multi"`, the prop can be omitted:

```tsx
<Dropdown
  label="Select items"
  variant="multi"
  options={options}
  value={selected}
  onChange={setSelected}
/>
```

### Platform rule

Never render a dropdown panel on mobile — use a bottom sheet (`mobileMode="sheet"`).
Never render a bottom sheet on desktop — use `Dropdown variant="multi"` inline.
Prefer using `<Dropdown mobileMode="sheet">` over manual `Drawer` + trigger composition.

## Interaction Rules

- The **entire row** is the tap/click target, not just the checkbox box
- Indeterminate: clicking checks all children; clicking again unchecks all
- Desktop only: hover background on row
- Mobile only: `:active` background (no hover)

## Do Not

- Do not render an inline dropdown on mobile — use a bottom sheet
- Do not place the checkbox on the right on desktop
- Do not place the checkbox on the left on mobile
- Do not use the atom for list selection — use `CheckboxRow` or `CheckboxGroup`
- Do not override atom token colors per-instance
- Do not assume checkbox multi-select is only for "add-ons" — it applies to any multi-select context

## Exports

```typescript
export { Checkbox } from './Checkbox';
export { CheckboxRow, CheckboxGroup } from './CheckboxRow';
export type { CheckboxProps } from './Checkbox';
export type { CheckboxRowProps, CheckboxGroupProps, CheckboxRowOption } from './CheckboxRow';
```
