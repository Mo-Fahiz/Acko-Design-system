---
description: Dropdown React implementation spec — props, behavior, accessibility
globs: "**/dropdown*"
alwaysApply: false
---

# Dropdown — React Implementation

## Package

`@acko/dropdown` — `packages/dropdown/src/Dropdown.tsx`

## Directive

`"use client"` — interactive component with state management.

## Props Interface

```ts
interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  group?: string;
}

interface DropdownProps {
  label: string;
  placeholder?: string;         // default: "Select an option"
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  variant?: 'single' | 'multi' | 'searchable' | 'grouped';  // default: 'single'
  mobileMode?: 'sheet' | 'inline';  // default: 'sheet' for multi, 'inline' otherwise
  size?: 'sm' | 'md' | 'lg';   // default: 'md'
  state?: 'default' | 'error';  // default: 'default'
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  className?: string;
}
```

## Component Pattern

```tsx
<div ref={ref} className={clsx('acko-dropdown', className)} onKeyDown={handleKeyDown} {...rest}>
  <span className={clsx('acko-dropdown-label', isOpen && 'acko-dropdown-label-open')}>
    {label}
    {required && <span className="acko-dropdown-required">*</span>}
  </span>
  <button className={clsx('acko-dropdown-trigger', ...)} ...>
    {displayValue}
    <span className={clsx('acko-dropdown-chevron', isOpen && 'acko-dropdown-chevron-open')}>…</span>
  </button>

  {/* Multi-select: CheckboxRow inside menu */}
  {isOpen && isMulti && (
    <div className="acko-dropdown-menu acko-dropdown-menu-multi">
      {options.map(opt => <CheckboxRow key={opt.value} ... />)}
    </div>
  )}

  {/* Single/searchable/grouped: <li> options inside menu */}
  {isOpen && !isMulti && (
    <ul className="acko-dropdown-menu">…</ul>
  )}
</div>
```

## Key Behaviors

1. **Single select**: `onChange(string)`, menu closes on selection, renders `<li>` options
2. **Multi select**: `onChange(string[])`, menu stays open, renders `CheckboxRow` from `@acko/checkbox` inside `acko-dropdown-menu`. Trigger shows up to 2 selected labels then a count (e.g. "English, Hindi, +1 more"). This is the standard pattern for any multi-select dropdown — filters, preferences, permissions, features, etc.
3. **Searchable**: Search input appears at top of menu, filters options in real-time
4. **Grouped**: Options grouped by `group` property with section headers
5. **Outside click**: Closes menu when clicking outside the wrapper
6. **Keyboard navigation**: Arrow keys, Enter/Space to select, Home/End, Escape to close
7. **Scroll into view**: Focused option auto-scrolls into view
8. **Mobile mode (`mobileMode`)**: Controls whether the menu opens as a bottom sheet (`Drawer`) or inline panel on mobile. On desktop, the menu always opens inline regardless of this prop.

### `mobileMode` prop

| Value | Default for | Behavior on mobile |
|-------|------------|-------------------|
| `'sheet'` | `variant="multi"` | Trigger opens a `Drawer side="bottom"` with the same menu content |
| `'inline'` | all other variants | Menu opens inline, same as desktop |

When `mobileMode="sheet"`:
- The `Drawer` renders `CheckboxRow` items for `variant="multi"`, or `<li>` options for single/searchable/grouped.
- The `Drawer` title is set to the `label` prop value.
- Mobile detection uses `matchMedia('(max-width: 767px)')`.

This allows a single `<Dropdown>` to handle both desktop inline and mobile bottom sheet behavior without manual composition.

### Single vs Multi select rendering

| Variant | Menu element | Item rendering | Trigger display |
|---------|-------------|----------------|-----------------|
| `single` | `<ul role="listbox">` | `<li>` options with check icon | Selected label |
| `multi` | `<div role="group">` | `CheckboxRow` from `@acko/checkbox` | Up to 2 labels, then "+N more" (e.g. "English, Hindi, +1 more") |

## Accessibility

- Trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`
- Menu: `role="listbox"`, `aria-labelledby`, `aria-multiselectable` for multi
- Options: `role="option"`, `aria-selected`, `aria-disabled`
- Search: `aria-label="Search options"`
- Error text: `role="alert"`
- Label connected via `aria-labelledby`

## Icons

Inline SVGs only — no `lucide-react` dependency.

- Chevron down (18×18) for trigger
- Check mark (16×16) for selected option indicator (single-select only)

## Dependencies

- `@acko/checkbox` — `CheckboxRow` is imported and rendered for `variant="multi"`
- `@acko/drawer` — `Drawer` is imported and rendered when `mobileMode="sheet"` on mobile devices

## Consumer Usage

### Single select (pick one)

```tsx
import '@acko/css/dropdown.css';
import { Dropdown } from '@acko/dropdown';

<Dropdown
  label="City"
  options={[
    { value: 'mum', label: 'Mumbai' },
    { value: 'del', label: 'Delhi' },
  ]}
  value={city}
  onChange={setCity}
/>
```

### Multi select (pick many — inline on mobile)

```tsx
<Dropdown
  label="Filter by category"
  variant="multi"
  mobileMode="inline"
  options={[
    { value: 'health', label: 'Health' },
    { value: 'motor', label: 'Motor' },
    { value: 'travel', label: 'Travel' },
  ]}
  value={selectedCategories}
  onChange={setSelectedCategories}
/>
```

### Multi select (bottom sheet on mobile — default)

```tsx
<Dropdown
  label="Select add-ons"
  variant="multi"
  mobileMode="sheet"
  options={addOnOptions}
  value={selected}
  onChange={setSelected}
/>
```

`mobileMode="sheet"` is the default for `variant="multi"`, so it can be omitted.

### Single select (bottom sheet on mobile)

```tsx
<Dropdown
  label="Language"
  mobileMode="sheet"
  options={languages}
  value={lang}
  onChange={setLang}
/>
```

Use `variant="multi"` for **any** multi-select context — it is not limited to specific domains.
Use `mobileMode` to control mobile behavior without manual `Drawer` composition.
