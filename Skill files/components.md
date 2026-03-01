# ACKO Components

Complete component API reference. Every component lists its React props interface, variants, sizes, states, and CSS specification. Components consume **semantic tokens** from semantics.md — never reference primitive tokens from primitives.md directly.

---

## Button

Action triggers in the interface.

### React API

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';        // default: 'md'
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconOnly?: boolean;                                 // full pill shape, icon centered
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';             // default: 'button'
  onClick?: () => void;
  children: ReactNode;
}
```

### Variants

| Variant | Use Case | Light Theme | Dark Theme |
|---------|----------|-------------|------------|
| `primary` | Main CTA — one per view | `--color-primary` bg, `--color-on-primary` text, inner shadow | `--color-primary` bg, `--color-on-primary` text, inner shadow |
| `secondary` | Supporting actions | `--color-btn-secondary-bg` bg, `--color-primary` text | `--color-btn-secondary-bg` bg, `--color-text-strong` text |
| `outline` | Tertiary actions | `--color-btn-outline-color` border/text, transparent bg | `--color-btn-outline-color` border/text, transparent bg |
| `ghost` | Inline/subtle actions | `--color-btn-ghost-color` text, transparent bg | `--color-btn-ghost-color` text, transparent bg |
| `danger` | Destructive (delete, remove) | `--color-error` border/text, transparent bg | `--color-error` border/text, transparent bg |

### Sizes

All buttons use full pill shape (`border-radius: 9999px`). Icon sizes match font sizes.

| Size | Height | Padding (horizontal) | Font Size | Line Height | Icon Size |
|------|--------|---------------------|-----------|-------------|-----------|
| `xs` | 32px | 16px | 12px | 16px | 12px |
| `sm` | 40px | 16px | 14px | 18px | 14px |
| `md` | 48px | 16px | 16px | 24px | 16px |
| `lg` | 56px | 24px | 18px | 28px | 18px |
| `xl` | 64px | 32px | 20px | 32px | 20px |

### Icon-Only Buttons

When `iconOnly={true}`, button becomes a square (width equals height) with no horizontal padding:

| Size | Dimensions |
|------|-----------|
| `xs` | 32×32px |
| `sm` | 40×40px |
| `md` | 48×48px |
| `lg` | 56×56px |
| `xl` | 64×64px |

### Full Width

When `fullWidth={true}`, button expands to `width: 100%`.

### States per Variant

#### Light Theme

**Primary:**
| State | Background | Text | Shadow | Extra |
|-------|-----------|------|--------|-------|
| Default | `--color-primary` | `--color-on-primary` | `--shadow-btn-inner` | — |
| Hover | Dark overlay gradient | `--color-on-primary` | `--shadow-btn-inner` + `--shadow-btn-hover` | — |
| Active | Same | `--color-on-primary` | Same | `scale(0.97)` |
| Focus | `--color-primary` | `--color-on-primary` | `--shadow-btn-inner` + `--shadow-focus-ring` | — |
| Disabled | `--color-disabled-bg` | `--color-disabled-text` | None | `cursor: not-allowed` |
| Loading | `--color-primary` | Spinner | `--shadow-btn-inner` | Text transparent |

**Secondary:**
| State | Background | Text | Shadow |
|-------|-----------|------|--------|
| Default | `--color-btn-secondary-bg` | `--color-primary` | None |
| Hover | `--color-surface-raised-hover` | `--color-primary` | `--shadow-btn-secondary-hover` |
| Disabled | `--color-disabled-bg` | `--color-disabled-text` | None |

**Outline:**
| State | Background | Border | Text | Shadow |
|-------|-----------|--------|------|--------|
| Default | Transparent | `--color-btn-outline-color` (1px inset) | `--color-btn-outline-color` | None |
| Hover | `--color-btn-outline-hover-bg` | `--color-btn-outline-color` (1px inset) | `--color-btn-outline-color` | `--shadow-btn-hover` |
| Disabled | Transparent | `--color-disabled-bg` (1px inset) | `--color-disabled-text` | None |

**Ghost:**
| State | Background | Text |
|-------|-----------|------|
| Default | Transparent | `--color-btn-ghost-color` |
| Hover | `--color-btn-ghost-hover-bg` | `--color-btn-ghost-color` |
| Disabled | Transparent | `--color-disabled-text` |

**Danger:**
| State | Background | Border | Text | Shadow |
|-------|-----------|--------|------|--------|
| Default | Transparent | `--color-error` (1px inset) | `--color-error` | None |
| Hover | `--color-error-subtle` | `--color-error` (1px inset) | `--color-error` | `0px 4px 8px color-mix(in srgb, var(--color-error) 8%, transparent)` |
| Disabled | Transparent | `--color-disabled-bg` (1px inset) | `--color-disabled-text` | None |

#### Dark Theme

**Primary:**
| State | Background | Text | Shadow |
|-------|-----------|------|--------|
| Default | `--color-primary` | `--color-on-primary` | `--shadow-btn-inner` |
| Hover | `--color-primary-hover` | `--color-on-primary` | `--shadow-btn-inner` + `--shadow-btn-hover` |
| Disabled | `--color-disabled-bg` | `--color-disabled-text` | None |

**Secondary:**
| State | Background | Text | Shadow |
|-------|-----------|------|--------|
| Default | `--color-btn-secondary-bg` | `--color-text-strong` | None |
| Hover | `--color-surface-raised-hover` | `--color-text-strong` | `--shadow-btn-secondary-hover` |
| Disabled | `--color-disabled-bg` | `--color-disabled-text` | None |

**Outline:**
| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | Transparent | `--color-btn-outline-color` (1px inset) | `--color-btn-outline-color` |
| Hover | `--color-btn-outline-hover-bg` | `--color-btn-outline-color` (1px inset) | `--color-btn-outline-color` |
| Disabled | Transparent | `--color-disabled-bg` (1px inset) | `--color-disabled-text` |

**Ghost:**
| State | Background | Text |
|-------|-----------|------|
| Default | Transparent | `--color-btn-ghost-color` |
| Hover | `--color-btn-ghost-hover-bg` | `--color-btn-ghost-color` |
| Disabled | Transparent | `--color-disabled-text` |

**Danger:**
| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | Transparent | `--color-error` (1px inset) | `--color-error` |
| Hover | `--color-error-subtle` | `--color-error` (1px inset) | `--color-error` |
| Disabled | Transparent | `--color-disabled-bg` (1px inset) | `--color-disabled-text` |

### CSS Specification

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: inherit;
  font-weight: 500;
  line-height: 1;
  border: none;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  position: relative;
  transition: background-color 150ms ease,
              color 150ms ease,
              border-color 150ms ease,
              transform 100ms ease,
              box-shadow 150ms ease;
}

.btn:active:not(:disabled) { transform: scale(0.97); }
.btn:focus-visible { outline: none; box-shadow: var(--shadow-focus-ring); }

/* Disabled state */
.btn:disabled {
  background-color: var(--color-disabled-bg) !important;
  color: var(--color-disabled-text) !important;
  box-shadow: none !important;
  cursor: not-allowed;
  opacity: 1;
  filter: none;
}

/* Icon alignment */
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Loading state */
.btn-loading { position: relative; color: transparent !important; pointer-events: none; }
.spinner {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Loading State

When `loading={true}`:
- Button is disabled (`pointer-events: none`)
- Text becomes transparent
- Centered spinner appears (18×18px, 2px border, 600ms rotation)
- `aria-busy="true"` is set
- Screen reader text "Loading, please wait" is announced

**Spinner colors per variant:**

| Variant | Spinner Color |
|---------|--------------|
| `primary` | `--color-on-primary` |
| `secondary` | `--color-text-default` |
| `outline` | `--color-text-default` |
| `ghost` | `--color-btn-ghost-color` |
| `danger` | `--color-on-primary` |

### Accessibility

- `aria-busy={true}` when loading
- `aria-disabled={true}` when disabled (in addition to native `disabled`)
- Icons use `aria-hidden="true"`
- Loading state includes visually hidden text for screen readers
- Focus ring: `var(--shadow-focus-ring)`

### Behavior Notes

- **Active state**: All buttons scale to `0.97` on press (`:active:not(:disabled)`)
- **Transitions**: All color/shadow changes use 150ms ease, transform uses 100ms ease
- **Disabled active**: No scale transform when disabled
- **Hover states**: Only apply on devices with fine pointer (`@media (hover: hover) and (pointer: fine)`)

### Elevated Theme (Optional)

An elevated theme with gradient backgrounds and glass effects is available via `[data-theme="elevated"]`. Features include:
- **Primary/Danger**: Convex gradient backgrounds with inner highlights and drop shadows
- **Secondary/Outline**: Glassmorphism with `backdrop-filter: blur(14px)`
- **Hover**: `translateY(-1px)` lift effect with enhanced shadows

This theme is implemented in CSS but not exposed in the default UI. To enable, set `data-theme="elevated"` on the document root.

---

## TextInput

Text entry fields with labels, helpers, and validation.

### React API

```tsx
interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';                        // default: 'md'
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number';
  state?: 'default' | 'error' | 'success';          // default: 'default'
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  prefix?: string;                                    // e.g., "₹", "https://"
  suffix?: string;                                    // e.g., ".com", "kg"
  maxLength?: number;
  autoComplete?: string;
}
```

### Sizes

All inputs use full pill shape (`border-radius: 9999px`). Icon sizes match input font sizes.

| Size | Height | Padding | Font Size | Line Height | Icon Size |
|------|--------|---------|-----------|-------------|-----------|
| `sm` | 40px (`--scale-40`) | 0 16px (`--space-4`) | 14px (body-sm) | 20px | 14px |
| `md` | 48px (`--scale-48`) | 0 20px (`--space-5`) | 16px (body-md) | 24px | 16px |
| `lg` | 56px (`--scale-56`) | 0 24px (`--space-6`) | 18px (body-lg) | 28px | 18px |

### States per Theme

#### Light Theme

| State | Border | Background | Label Color | Icon Color | Extra |
|-------|--------|-----------|-------------|------------|-------|
| Default | `--color-border` | `--color-surface` | `--color-text-default` | `--color-text-muted` | — |
| Hover | `--color-border-strong` | `--color-surface` | `--color-text-default` | `--color-text-secondary` | — |
| Focus | `--color-primary` + 1px ring (`--color-primary`) | `--color-surface` | `--color-primary` | `--color-primary` | Placeholder fades to `--color-text-disabled` |
| Filled | `--color-border-strong` | `--color-surface` | `--color-text-default` | `--color-text-muted` | — |
| Disabled | `--color-border-subtle` | `--color-surface-raised` | `--color-text-muted` | `--color-text-disabled` | `cursor: not-allowed` |
| Error | `--color-error` | `--color-surface` | `--color-error-text` | `--color-text-muted` | Subtle horizontal shake animation |
| Success | `--color-border-strong` | `--color-surface` | `--color-text-default` | `--color-success` checkmark | Animated checkmark icon appears |
| Read-only | `--color-border-subtle` | `--color-surface-raised` | `--color-text-default` | `--color-text-muted` | Input text: `--color-text-secondary` |

#### Dark Theme

| State | Border | Background | Label Color | Icon Color | Extra |
|-------|--------|-----------|-------------|------------|-------|
| Default | `--color-border` | `--color-surface-raised` | `--color-text-default` | `--color-text-muted` | — |
| Hover | `--color-border-strong` | `--color-surface-raised` | `--color-text-default` | `--color-text-secondary` | — |
| Focus | `--color-primary` + 1px ring (`--color-primary`) | `--color-surface-raised` | `--color-primary` | `--color-primary` | Placeholder fades to `--color-text-disabled` |
| Filled | `--color-border-strong` | `--color-surface-raised` | `--color-text-default` | `--color-text-muted` | — |
| Disabled | `--color-disabled-bg` | `--color-disabled-bg` | `--color-text-muted` | `--color-disabled-text` | `cursor: not-allowed`, text: `--color-disabled-text` |
| Error | `--color-error` | `--color-surface-raised` | `--color-error-text` | `--color-text-muted` | Subtle horizontal shake animation |
| Success | `--color-border-strong` | `--color-surface-raised` | `--color-text-default` | `--color-success` checkmark | Animated checkmark icon appears |
| Read-only | `--color-border-subtle` | `--color-surface-raised` | `--color-text-default` | `--color-text-muted` | Input text: `--color-text-secondary` |

### Structure

```
┌─ label ──────────────────────────────┐
│ ┌─ input-wrapper ──────────────────┐ │
│ │ [icon] [prefix] input [suffix]   │ │
│ └──────────────────────────────────┘ │
│ helper text / error text             │
└──────────────────────────────────────┘
```

### Animations

| Animation | Trigger | Duration | Effect |
|-----------|---------|----------|--------|
| `shake` | Error state applied | 300ms ease-out | Horizontal oscillation ±4px, settles to center |
| `checkPop` | Success state applied | 300ms ease-out | Scale 0.5 → 1.15 → 1.0 with opacity fade-in |

### Behavior Notes

- **Filled state**: When `value.length > 0` and not focused, border strengthens to `--color-border-strong`
- **Placeholder fade**: On focus, placeholder color transitions from `--color-text-muted` to `--color-text-disabled`
- **Success checkmark**: Replaces any `iconRight` when in success state; uses lucide `Check` icon with `strokeWidth: 2.5`
- **Character count**: Displayed when `maxLength` prop is set, shows `{current}/{max}` in caption style, right-aligned
- **Transition timing**: All border/background/shadow transitions use 200ms ease

### Accessibility

- Label linked via `htmlFor` → `id`
- `aria-required` set when `required={true}`
- `aria-invalid` set when `state="error"`
- `aria-describedby` links to error text or helper text
- Error text uses `role="alert"` for screen reader announcement
- Icons use `aria-hidden="true"`

### CSS Specification

```css
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.label {
  font-size: var(--font-label-lg-size);
  font-weight: var(--font-label-lg-weight);
  letter-spacing: var(--font-label-lg-spacing);
  line-height: var(--font-label-lg-line);
  color: var(--color-text-default);
  transition: color 150ms ease;
}

.inputWrapper {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background-color: var(--color-surface);
  transition: border-color 200ms ease,
              background-color 200ms ease,
              box-shadow 200ms ease;
}

.focused {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: inherit;
  font-weight: 400;
  color: var(--color-text-strong);
  outline: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 0;
}

.input::placeholder {
  color: var(--color-text-muted);
  transition: color 200ms ease;
}

.focused .input::placeholder {
  color: var(--color-text-disabled);
}

/* Filled state (has value, not focused) */
.filled:not(.focused):not(.error):not(.success) {
  border-color: var(--color-border-strong);
}

/* Error state */
.error {
  border-color: var(--color-error);
  background-color: var(--color-surface);
  animation: shake 300ms ease-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(2px); }
}

/* Success state */
.success {
  border-color: var(--color-border-strong);
  background-color: var(--color-surface);
}

.successIcon {
  color: var(--color-success);
  margin-left: var(--space-2);
  animation: checkPop 300ms ease-out;
}

@keyframes checkPop {
  0% { opacity: 0; transform: scale(0.5); }
  60% { opacity: 1; transform: scale(1.15); }
  100% { opacity: 1; transform: scale(1); }
}

/* Disabled */
.disabled {
  border-color: var(--color-disabled-border);
  background-color: var(--color-surface-raised);
  cursor: not-allowed;
}

/* Helper / Error text */
.helperText, .errorText {
  font-size: var(--font-caption-size);
  line-height: var(--font-caption-line);
}

.helperText { color: var(--color-text-muted); }
.errorText { color: var(--color-error-text); }

/* Character count */
.charCount {
  font-size: var(--font-caption-size);
  color: var(--color-text-muted);
  text-align: right;
}

/* Dark theme overrides */
[data-theme="dark"] .inputWrapper {
  background-color: var(--color-surface-raised);
  border-color: var(--color-border);
}

[data-theme="dark"] .error {
  border-color: var(--color-error);
}

[data-theme="dark"] .successIcon {
  color: var(--color-success);
}

[data-theme="dark"] .disabled {
  background-color: var(--color-disabled-bg);
  border-color: var(--color-disabled-border);
}

[data-theme="dark"] .disabled .input {
  color: var(--color-disabled-text);
}
```

---

## Dropdown

Selection from a list of options.

### React API

```tsx
interface DropdownProps {
  label: string;
  placeholder?: string;
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  variant?: 'single' | 'multi' | 'searchable' | 'grouped';  // default: 'single'
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'error';
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  errorText?: string;
}

interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  group?: string;            // for grouped variant
}
```

### Sizes

All triggers use full pill shape (`border-radius: 9999px`).

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 40px (`--scale-40`) | `0 16px` | `--font-body-sm-size` (14px) |
| `md` | 48px (`--scale-48`) | `0 20px` | `--font-body-md-size` (16px) |
| `lg` | 56px (`--scale-56`) | `0 24px` | `--font-body-lg-size` (18px) |

### Trigger States — Light Theme

| State | Border | Background | Label | Chevron | Extra |
|-------|--------|------------|-------|---------|-------|
| Default | `--color-border` | `--color-surface` | `--color-text-default` | `--color-text-muted` | — |
| Hover | `--color-border-strong` | `--color-surface` | — | `--color-text-secondary` | — |
| Open | `--color-primary` | `--color-surface` | `--color-primary` | `--color-primary` | `box-shadow: 0 0 0 1px var(--color-primary)` |
| Filled | `--color-border-strong` | `--color-surface` | — | — | — |
| Disabled | `--color-border-subtle` | `--color-surface-raised` | `--color-text-disabled` | `--color-text-disabled` | `cursor: not-allowed` |
| Error | `--color-error` | `--color-surface` | `--color-error-text` | — | Shake animation (300ms) |

### Trigger States — Dark Theme

| State | Border | Background | Label | Chevron | Extra |
|-------|--------|------------|-------|---------|-------|
| Default | `--color-border` | `--color-surface-raised` | `--color-text-default` | `--color-text-muted` | — |
| Hover | `--color-border-strong` | `--color-surface-raised` | — | `--color-text-secondary` | — |
| Open | `--color-primary` | `--color-surface-raised` | `--color-primary` | `--color-primary` | `box-shadow: 0 0 0 1px var(--color-primary)` |
| Filled | `--color-border-strong` | `--color-surface-raised` | — | — | — |
| Disabled | `--color-disabled-bg` | `--color-disabled-bg` | `--color-disabled-text` | `--color-disabled-text` | `cursor: not-allowed` |
| Error | `--color-error` | `--color-surface-raised` | `--color-error-text` | — | Shake animation (300ms) |

### Option States

| State | Background | Text | Border Radius |
|-------|-----------|------|---------------|
| Default | transparent | `--color-text-strong` | `--radius-lg` (8px) |
| Hover | `--color-primary-subtle` | `--color-text-strong` | `--radius-lg` |
| Selected | `--color-primary-subtle` | `--color-primary-hover` | `--radius-lg` |
| Focused (keyboard) | `--color-primary-subtle` | `--color-text-strong` | `--radius-lg` |
| Disabled | transparent | `--color-text-muted` | `--radius-lg` |

### Menu Specification

| Property | Value |
|----------|-------|
| Position | `4px` below trigger |
| Max height | `280px` with overflow scroll |
| Border radius | `--radius-3xl` (16px) — softer than trigger |
| Border | `1px solid var(--color-border)` |
| Padding | `var(--space-2)` (8px) |
| Shadow | `--shadow-dropdown` |
| Enter animation | `opacity 0→1` + `translateY(-8px → 0)` at 150ms `ease-out-cubic` |

### Animations

| Animation | Trigger | Duration | Effect |
|-----------|---------|----------|--------|
| `shake` | Error state | 300ms | Horizontal shake (-4px → 4px → -3px → 2px → 0) |
| `menuEnter` | Menu opens | 150ms | Fade in + slide from -8px |
| `chevronRotate` | Menu opens | 150ms | 180° rotation |

### Accessibility

- Trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`
- Menu: `role="listbox"`, `aria-labelledby`, `aria-multiselectable` (for multi)
- Options: `role="option"`, `aria-selected`, `aria-disabled`
- Keyboard: `Enter/Space` to select, `Arrow` navigation, `Escape` to close, `Home/End` for first/last

### CSS Specification

```css
.trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  border-radius: var(--radius-full);
  transition: border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease;
}

.triggerOpen {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.triggerError {
  border-color: var(--color-error);
  animation: shake 300ms ease-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(2px); }
}

.menu {
  border-radius: var(--radius-3xl);
  border: 1px solid var(--color-border);
  padding: var(--space-2);
  box-shadow: var(--shadow-dropdown);
  animation: menuEnter 150ms var(--ease-out-cubic);
}

.option {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-lg);
  min-height: 40px;
  transition: background-color 100ms ease;
}

/* Dark theme */
[data-theme="dark"] .trigger {
  background-color: var(--color-surface-raised);
  border-color: var(--color-border);
}

[data-theme="dark"] .menu {
  background-color: var(--color-surface-raised);
  border-color: var(--color-border);
}
```

---

## Checkbox

Multi-selection control.

### React API

```tsx
interface CheckboxProps {
  label?: string;
  description?: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';                        // default: 'md'
  disabled?: boolean;
  error?: boolean;
}
```

### Sizes

| Size | Box | Border Radius | Label Font |
|------|-----|---------------|------------|
| `sm` | 16×16px | 4px | body-sm (14px) |
| `md` | 20×20px | 6px | body-md (16px) |
| `lg` | 24×24px | 6px | body-lg (18px) |

### States

| State | Border | Background | Icon |
|-------|--------|-----------|------|
| Unchecked | `--color-border` | `--color-surface` | none |
| Checked | `--color-primary` | `--color-primary` | `--color-on-primary` checkmark |
| Indeterminate | `--color-primary` | `--color-primary` | `--color-on-primary` minus |
| Hover (unchecked) | `--color-primary-muted` | `--color-primary-subtle` | none |
| Hover (checked) | `--color-primary-hover` | `--color-primary-hover` | `--color-on-primary` checkmark |
| Focus | `--color-primary` + `--shadow-focus-ring` | — | — |
| Disabled (unchecked) | `--color-border-subtle` | `--color-surface-raised` | none |
| Disabled (checked) | `--color-text-muted` | `--color-text-muted` | `--color-on-primary` checkmark |
| Error | `--color-error` | `--color-surface` | none |

---

## Radio

Mutually exclusive single selection.

### React API

```tsx
interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';                      // default: 'default'
  disabled?: boolean;
  error?: boolean;
  orientation?: 'vertical' | 'horizontal';           // default: 'vertical'
}

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
```

### Sizes

| Size | Circle | Dot | Label Font |
|------|--------|-----|------------|
| `sm` | 16×16px | 8px | body-sm (14px) |
| `md` | 20×20px | 10px | body-md (16px) |
| `lg` | 24×24px | 12px | body-lg (18px) |

### Card Variant

When `variant="card"`, each radio option renders as a bordered card:
- Default: `2px solid var(--color-border-subtle)`, `radius-3xl`
- Hover: `border-color: var(--color-primary-muted)`, `bg: var(--color-primary-subtle)`
- Selected: `border-color: var(--color-primary)`, `bg: var(--color-primary-subtle)`
- Focus-within: `var(--shadow-focus-ring)`

---

## Calendar

Date selection.

### React API

```tsx
interface CalendarProps {
  variant?: 'single' | 'range' | 'multi';           // default: 'single'
  display?: 'inline' | 'dropdown';                   // default: 'dropdown'
  value: Date | DateRange | Date[];
  onChange: (value: Date | DateRange | Date[]) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;                                    // default: 'en-IN'
}

interface DateRange {
  start: Date;
  end: Date;
}
```

### Day Cell States

| State | Background | Text | Extra |
|-------|-----------|------|-------|
| Default | `--color-surface` | `--color-text-strong` | — |
| Hover | `--color-primary-subtle` | `--color-text-strong` | — |
| Today | `--color-surface` | `--color-primary` | bold |
| Selected | `--color-primary` | `--color-on-primary` | bold |
| Range start/end | `--color-primary` | `--color-on-primary` | half-rounded |
| Range middle | `--color-primary-subtle` | `--color-primary-hover` | — |
| Disabled | `--color-surface` | `--color-text-muted` | `cursor: not-allowed` |
| Outside month | `--color-surface` | `--color-text-disabled` | — |

### Specifications

- Grid: 7 columns, `aspect-ratio: 1` cells, minimum 44px height (tap target)
- Header: month/year label centered, prev/next arrows
- Navigation buttons: 36×36px, `radius-lg`, transparent bg
- Container: 320px wide, `radius-3xl`, `--shadow-dropdown`

---

## Badge

Status indicators, labels, and tags.

### React API

```tsx
interface BadgeProps {
  variant?: 'solid' | 'outline' | 'dot';            // default: 'solid'
  color?: 'purple' | 'green' | 'blue' | 'orange' | 'pink' | 'gray';
  size?: 'sm' | 'md' | 'lg';                        // default: 'md'
  removable?: boolean;
  onRemove?: () => void;
  children: ReactNode;
}

interface CounterBadgeProps {
  count: number;
  max?: number;                                       // shows "99+" if exceeded
  color?: 'purple' | 'pink' | 'blue';
}
```

### Color Mapping

Each color uses semantic badge tokens from semantics.md:

| Color | Background | Text | Shadow (solid/dot) | Dot | Outline |
|-------|-----------|------|--------------------|-----|---------|
| `purple` | `--color-badge-purple-bg` | `--color-badge-purple-text` | `--color-badge-purple-shadow-top` / `--color-badge-purple-shadow-bottom` | `--color-badge-purple-text` | `--color-badge-purple-outline-color` |
| `green` | `--color-badge-green-bg` | `--color-badge-green-text` | `--color-badge-green-shadow-top` / `--color-badge-green-shadow-bottom` | `--color-badge-green-text` | `--color-badge-green-outline-color` |
| `blue` | `--color-badge-blue-bg` | `--color-badge-blue-text` | `--color-badge-blue-shadow-top` / `--color-badge-blue-shadow-bottom` | `--color-badge-blue-text` | `--color-badge-blue-outline-color` |
| `orange` | `--color-badge-orange-bg` | `--color-badge-orange-text` | `--color-badge-orange-shadow-top` / `--color-badge-orange-shadow-bottom` | `--color-badge-orange-text` | `--color-badge-orange-outline-color` |
| `pink` | `--color-badge-pink-bg` | `--color-badge-pink-text` | `--color-badge-pink-shadow-top` / `--color-badge-pink-shadow-bottom` | `--color-badge-pink-text` | `--color-badge-pink-outline-color` |
| `gray` | `--color-badge-gray-bg` | `--color-badge-gray-text` | `--color-badge-gray-shadow-top` / `--color-badge-gray-shadow-bottom` | `--color-badge-gray-text` | `--color-badge-gray-outline-color` |

### Sizes

| Size | Padding | Font Size | Height |
|------|---------|-----------|--------|
| `sm` | 2px 8px | 11px | 18px |
| `md` | 4px 10px | 12px | 22px |
| `lg` | 6px 12px | 14px | 28px |

---

## NavigationWizard

Step-by-step progress indicator.

### React API

```tsx
interface WizardProps {
  steps: WizardStep[];
  currentStep: number;                                // 0-indexed
  variant?: 'horizontal' | 'vertical' | 'compact';  // default: 'horizontal'
  onStepClick?: (stepIndex: number) => void;         // if steps are clickable
}

interface WizardStep {
  label: string;
  description?: string;
  status?: 'upcoming' | 'current' | 'completed' | 'error';
}
```

### Step States

| Status | Circle BG | Circle Text | Label Color | Connector |
|--------|-----------|-------------|-------------|-----------|
| `upcoming` | `--color-surface-raised-hover` | `--color-text-muted` | `--color-text-muted` | `--color-border-subtle` |
| `current` | `--color-primary` | `--color-on-primary` | `--color-text-strong` | `--color-border-subtle` |
| `completed` | `--color-success` | `--color-on-primary` (checkmark) | `--color-text-strong` | `--color-success` |
| `error` | `--color-error-text` | `--color-on-primary` (!) | `--color-error-text` | `--color-border-subtle` |

### Specifications

- Circle: 32×32px, `radius-full`
- Current step circle has 4px ring in `--color-primary-ring`
- Connector: `60px × 2px` between steps
- Label: 14px, medium weight
- Transitions: 200ms ease on all color changes

---

## Pagination

Page navigation for data sets.

### React API

```tsx
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  variant?: 'numbered' | 'simple' | 'compact' | 'load-more';
  siblingCount?: number;                              // pages shown around current, default: 1
  showInfo?: boolean;                                 // "Page 3 of 20"
}
```

### Page Button States

| State | Background | Text |
|-------|-----------|------|
| Default | transparent | `--color-text-default` |
| Hover | `--color-primary-subtle` | `--color-text-strong` |
| Current | `--color-primary` | `--color-on-primary` |
| Disabled | transparent, `opacity: var(--opacity-48)` | `--color-text-muted` |

### Specifications

- Button size: 40×40px, `radius-lg`
- Prev/Next: `--color-surface-raised` bg, arrow icon
- Ellipsis: centered "..." in muted color
- Mobile responsive: wraps, info line moves to top at `640px`

---

## Textarea

Multi-line text input (extends TextInput).

### React API

```tsx
interface TextareaProps extends Omit<TextInputProps, 'type' | 'iconLeft' | 'iconRight' | 'prefix' | 'suffix'> {
  rows?: number;                                      // default: 4
  resize?: 'vertical' | 'horizontal' | 'both' | 'none';  // default: 'vertical'
  maxLength?: number;
  showCount?: boolean;                                // shows character count
}
```

### Specifications

- Min height: 120px
- Padding: `space-3` vertical, `space-4` horizontal
- Line height: 1.5
- Border radius: `--radius-3xl`
- Same states as TextInput (border, label, helper/error text)

---

## Card

Surface container for grouping related content.

### React API

```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'elevated' | 'demoted';  // default: 'default'
  padding?: 'none' | 'sm' | 'md' | 'lg';                     // default: 'lg'
  children: React.ReactNode;
}
```

### Sub-components

```tsx
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * CardInset — a nested rectangular panel inside a Card.
 * Automatically applies the nested radius rule (R1 = R2 − D, floored to 4px).
 * Use for: icon boxes, image thumbnails, demoted info panels, inset data grids.
 * Never use --radius-3xl on rectangular elements nested inside a card.
 */
interface CardInsetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
```

### Variants

| Variant | Fill | Stroke | Shadow |
|---------|------|--------|--------|
| `default` | `--color-card-bg` (grey-50) | `1px solid --color-card-border` (white highlight edge) | none |
| `outline` | `transparent` | `1px solid --color-card-outline-border` (grey-200) | none |
| `elevated` | `--color-card-elevated-bg` (white) | `none` | `--shadow-card` |
| `demoted` | `--color-card-demoted-bg` (grey-150) | `1px solid --color-card-demoted-border` (grey-200) | none |

### Padding Scale

| Value | CSS | px |
|-------|-----|----|
| `none` | `0` | 0 |
| `sm` | `var(--space-3)` | 12px |
| `md` | `var(--space-5)` | 20px |
| `lg` | `var(--space-6)` | 24px |

### Sub-component Layout

| Sub-component | Padding | Border | Notes |
|---------------|---------|--------|-------|
| `CardHeader` | `padding-bottom: var(--space-4)` | `border-bottom: 1px solid var(--color-border-subtle)` | flex row, gap `--space-3` |
| `CardContent` | `padding: var(--space-5) 0` | none | |
| `CardFooter` | `padding-top: var(--space-4)` | `border-top: 1px solid var(--color-border-subtle)` | flex row, justify-end |
| `CardInset` | `padding: var(--space-3)` | `1px solid --color-card-demoted-border` | `border-radius: --radius-inset-lg` (4px) |

### Nested Radius Rule

Card outer radius is always `--radius-3xl` (16px). Any **rectangular** child element (icon wrapper, image block, inset panel) must use the nested radius formula:

```
R1 = R2 − D    →    inner radius = outer card radius − card padding
```

| Card padding | D | R2 | R1 | Use |
|---|---|---|---|---|
| `sm` | 12px | 16px | 4px | `--radius-inset-sm` |
| `md` | 20px | 16px | floor → 4px | `--radius-inset-md` |
| `lg` | 24px | 16px | floor → 4px | `--radius-inset-lg` |

**Use `<CardInset>`** for any demoted/info panel — it applies `--radius-inset-lg` automatically.  
For icon boxes and image thumbnails, apply `border-radius: var(--radius-inset-lg)` directly.  
Pills, buttons, badges, and avatars are **exempt** — their radius is intentional, not geometric.

### Organism example

A full card organism demonstrating the nested radius rule — icon box, `CardInset` data panel, subtle text, `Alert`, `TextInput`, and footer CTAs:

```tsx
<Card padding="lg" variant="default">
  <CardHeader>
    {/* Icon box — rectangular nested element, uses --radius-inset-lg (4px) */}
    <div style={{
      width: 40, height: 40,
      borderRadius: 'var(--radius-inset-lg)',   // R1 = 4px
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border-subtle)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Car size={18} color="var(--color-primary)" />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>Car Insurance</span>
        <Badge color="green" size="sm">Active</Badge>
      </div>
      <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>
        Policy #MH12XY4321 · Expires Nov 2025
      </p>
    </div>
  </CardHeader>

  <CardContent>
    {/* CardInset — nested panel, border-radius: --radius-inset-lg (4px) applied automatically */}
    <CardInset style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
      <div><p style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>PLAN</p><p style={{ fontWeight: 600 }}>Comprehensive</p></div>
      <div><p style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>IDV</p><p style={{ fontWeight: 600 }}>₹6,40,000</p></div>
      <div><p style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>NCB</p><p style={{ fontWeight: 600 }}>20%</p></div>
      <div><p style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>ADD-ONS</p><p style={{ fontWeight: 600 }}>Zero dep</p></div>
    </CardInset>

    {/* Subtle body copy */}
    <p style={{ fontSize: 13, color: 'var(--color-text-subtle)', lineHeight: 1.6 }}>
      Your policy renews in <strong>12 days</strong>. Lock in your current premium now.
    </p>

    {/* Alert — contextual inline warning */}
    <Alert variant="warning" title="Premium increase incoming" dismissible onDismiss={...}>
      Rates go up ~8% after Nov 30. Renew now to save ₹640.
    </Alert>

    {/* Input */}
    <TextInput
      label="Vehicle registration number"
      placeholder="MH 12 XY 4321"
      value={reg}
      onChange={setReg}
      state={regState}
      errorText="Enter a valid registration number"
      helperText="We'll pre-fill your vehicle details"
    />
  </CardContent>

  <CardFooter>
    <Button variant="ghost" size="sm">View policy</Button>
    <Button variant="primary" size="sm" iconRight={<ChevronRight size={15} />}>Renew now</Button>
  </CardFooter>
</Card>
```

### Specifications

- Outer border-radius: `--radius-3xl` (16px)
- Nested rectangular elements: `--radius-inset-lg` (4px) — see Nested Radius Rule above
- Footer children: right-aligned (`justify-content: flex-end`)

---

## Typography

Text rendering with the full type scale.

### React API

```tsx
interface TypographyProps {
  variant:
    | 'display-xl' | 'display-lg' | 'display-md' | 'display-sm'
    | 'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm'
    | 'body-lg' | 'body-md' | 'body-sm'
    | 'label-lg' | 'label-md' | 'label-sm'
    | 'caption' | 'overline';
  as?: React.ElementType;
  color?: 'default' | 'strong' | 'muted' | 'disabled' | 'primary' | 'error' | 'success';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

### Variant → Token Mapping

Each variant maps to the `--font-{variant}-*` tokens in primitives.md:

| Variant | Size Token | Line Token | Spacing Token | Default Weight |
|---------|-----------|-----------|---------------|----------------|
| `display-xl` | `--font-display-xl-size` | `--font-display-xl-line` | `--font-display-xl-spacing` | 700 |
| `display-lg` | `--font-display-lg-size` | `--font-display-lg-line` | `--font-display-lg-spacing` | 700 |
| `display-md` | `--font-display-md-size` | `--font-display-md-line` | `--font-display-md-spacing` | 700 |
| `display-sm` | `--font-display-sm-size` | `--font-display-sm-line` | `--font-display-sm-spacing` | 600 |
| `heading-xl` | `--font-heading-xl-size` | `--font-heading-xl-line` | `--font-heading-xl-spacing` | 600 |
| `heading-lg` | `--font-heading-lg-size` | `--font-heading-lg-line` | `--font-heading-lg-spacing` | 600 |
| `heading-md` | `--font-heading-md-size` | `--font-heading-md-line` | `--font-heading-md-spacing` | 600 |
| `heading-sm` | `--font-heading-sm-size` | `--font-heading-sm-line` | `--font-heading-sm-spacing` | 600 |
| `body-lg` | `--font-body-lg-size` | `--font-body-lg-line` | `--font-body-lg-spacing` | 400 |
| `body-md` | `--font-body-md-size` | `--font-body-md-line` | `--font-body-md-spacing` | 400 |
| `body-sm` | `--font-body-sm-size` | `--font-body-sm-line` | `--font-body-sm-spacing` | 400 |
| `label-lg` | `--font-label-lg-size` | `--font-label-lg-line` | `--font-label-lg-spacing` | 500 |
| `label-md` | `--font-label-md-size` | `--font-label-md-line` | `--font-label-md-spacing` | 500 |
| `label-sm` | `--font-label-sm-size` | `--font-label-sm-line` | `--font-label-sm-spacing` | 500 |
| `caption` | `--font-caption-size` | `--font-caption-line` | `--font-caption-spacing` | 400 |
| `overline` | `--font-overline-size` | `--font-overline-line` | `--font-overline-spacing` | 600 |

### Color → Token Mapping

| Color | Token |
|-------|-------|
| `default` | `--color-text-default` |
| `strong` | `--color-text-strong` |
| `muted` | `--color-text-muted` |
| `disabled` | `--color-text-disabled` |
| `primary` | `--color-primary` |
| `error` | `--color-error-text` |
| `success` | `--color-success-text` |

### Weight Overrides

| Weight | CSS value |
|--------|-----------|
| `regular` | 400 |
| `medium` | 500 |
| `semibold` | 600 |
| `bold` | 700 |

### Specifications

- Font family: `'Euclid Circular B', system-ui, sans-serif`
- `overline` applies `text-transform: uppercase`
- `truncate` applies `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`

---

## Alert

Contextual feedback messages.

### React API

```tsx
interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}
```

### Variant Styling

| Variant | Background | Border | Icon/Title Color |
|---------|-----------|--------|-----------------|
| `info` | `--color-info-subtle` | `--color-info-border` | `--color-info-text` |
| `success` | `--color-success-subtle` | `--color-success-border` | `--color-success-text` |
| `warning` | `--color-warning-subtle` | `--color-warning-border` | `--color-warning-text` |
| `error` | `--color-error-subtle` | `--color-error-border` | `--color-error-text` |

### Specifications

- Layout: `flex row`, `gap: var(--space-3)`, `padding: var(--space-4)`
- Border radius: `--radius-3xl` (16px)
- Border: `1px solid`
- Icon size: 20×20px
- Title: `--font-body-sm-size`, weight 600
- Body: `--font-body-sm-size`, `--color-text-default`
- Dismiss button: 24×24px, positioned absolute `top: var(--space-3), right: var(--space-3)`, icon 16×16px, `opacity: 0.7` → `1` on hover
- Transition: `opacity 200ms var(--ease-out-cubic)`

### Accessibility

- Dismiss: `focus-visible` with `2px solid var(--color-primary-ring)`, `offset: 2px`

---

## Progress

Determinate progress indicator bar.

### React API

```tsx
interface ProgressProps {
  value: number;
  max?: number;                                            // default: 100
  size?: 'sm' | 'md' | 'lg';                              // default: 'md'
  color?: 'primary' | 'success' | 'error';                // default: 'primary'
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}
```

### Sizes

| Size | Track Height |
|------|-------------|
| `sm` | 4px |
| `md` | 8px |
| `lg` | 12px |

### Color → Token Mapping

| Color | Bar Fill |
|-------|---------|
| `primary` | `--color-primary` |
| `success` | `--color-success` |
| `error` | `--color-error` |

### Specifications

- Track: `width: 100%`, `border-radius: --radius-full`, `background: --color-border-subtle`
- Bar: `border-radius: --radius-full`, `transition: width 500ms var(--ease-out-cubic)`
- Label wrapper: `flex row`, `justify-content: space-between`, `margin-bottom: var(--space-1)`
- Label: `--font-caption-size`, `--color-text-muted`
- Animated shimmer: `rgba(255, 255, 255, 0.25)` gradient sweep at `1.5s ease-in-out infinite`
- Dark theme shimmer: `rgba(255, 255, 255, 0.12)`

---

## Switch

Binary on/off toggle.

### React API

```tsx
interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';                                     // default: 'md'
  label?: string;
  id?: string;
  name?: string;
  className?: string;
}
```

### Sizes

| Size | Track | Thumb |
|------|-------|-------|
| `sm` | 36×20px | 16×16px |
| `md` | 44×24px | 20×20px |

### States

| State | Track Color | Thumb Position | Extra |
|-------|-----------|----------------|-------|
| Unchecked | `--color-border` | `left: 2px` | — |
| Checked | `--color-primary` | `translateX(16px)` / `translateX(20px)` | — |
| Focus | — | — | `box-shadow: 0 0 0 2px var(--color-primary-ring)` |
| Disabled | — | — | `opacity: 0.5`, `cursor: not-allowed` |

### Specifications

- Track: `border-radius: --radius-full`, `transition: background-color 200ms var(--ease-out-cubic)`
- Thumb: `background: --color-on-primary`, `box-shadow: --shadow-sm`, `transition: transform 200ms var(--ease-out-cubic)`, `border-radius: --radius-full`
- Label: `--font-body-sm-size`, `--color-text-default`, `gap: var(--space-3)`
- Hidden native input uses visually-hidden pattern
- Dark theme unchecked track: `--grey-550`

---

## Separator

Visual divider between content sections.

### React API

```tsx
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';                 // default: 'horizontal'
  decorative?: boolean;
  className?: string;
  label?: string;
}
```

### Specifications

- Horizontal: `width: 100%, height: 1px`, `background: --color-control-border-selector`
- Vertical: `width: 1px, height: 100%`, `background: --color-control-border-selector`
- With label: `flex row`, label in `--font-caption-size` / `--color-text-muted`, flanked by `flex: 1` lines
- When `decorative={true}`: `role="none"` (no semantic meaning)

---

## Label

Form field label element.

### React API

```tsx
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';                                     // default: 'md'
  children: React.ReactNode;
}
```

### Sizes

| Size | Font Size |
|------|-----------|
| `sm` | `--font-caption-size` |
| `md` | `--font-body-sm-size` |

### States

| State | Color |
|-------|-------|
| Default | `--color-text-strong` |
| Disabled | `--color-text-disabled` |
| Required indicator (*) | `--color-error` |

### Specifications

- Font weight: 500
- `cursor: default`

---

## Accordion

Collapsible content panels.

### React API

```tsx
interface AccordionItem {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  type: 'single' | 'multiple';
  items: AccordionItem[];
  defaultValue?: string | string[];
  collapsible?: boolean;
  className?: string;
}
```

### Specifications

- Wrapper: `border: 1px solid var(--color-accordion-border)`, `border-radius: --radius-3xl`, `overflow: hidden`
- Items separated by `border-bottom: 1px solid var(--color-accordion-border)`, last item has none
- Trigger: full-width `flex row`, `justify-content: space-between`, `padding: var(--space-4)`
- Trigger font: `--font-body-md-size`, weight `--font-label-lg-weight`, `--color-text-default`
- Trigger hover: `background: --color-accordion-header-hover`
- Chevron: `--color-accordion-icon`, `transition: transform 200ms ease`
- Chevron open: `rotate(180deg)`
- Content panel: `transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1)`, `overflow: hidden`
- Content inner: `padding: 0 var(--space-4) var(--space-4)`, `--color-text-secondary`, `--font-body-sm-size`
- Disabled items: `opacity: 0.5`, `pointer-events: none`

---

## Tabs

Tabbed content navigation.

### React API

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
  variant?: 'underline' | 'pill' | 'enclosed';            // default: 'underline'
  size?: 'sm' | 'md';                                     // default: 'md'
  fullWidth?: boolean;
  className?: string;
}
```

### Variants

**Underline:**
- Tab list: `border-bottom: 1px solid var(--color-border-subtle)`
- Tab: `padding: var(--space-2) var(--space-4)`, `border-bottom: 2px solid transparent`, `margin-bottom: -1px`
- Active: `color: --color-primary`, `border-bottom-color: --color-primary`
- Hover: `color: --color-text-default`

**Pill:**
- Tab list: `background: --color-tab-pill-bg`, `border-radius: --radius-full`, `padding: 3px`
- Tab: `border-radius: --radius-full`, `padding: var(--space-1) var(--space-4)`
- Active: `background: --color-tab-pill-active-bg`, `color: --color-text-strong`, `box-shadow: --shadow-sm`
- Hover: `color: --color-text-default`

**Enclosed:**
- Tab: `border: 1px solid var(--color-border-subtle)`, `border-bottom: none`, `border-radius: --radius-lg --radius-lg 0 0`
- Active: `background: --color-card-bg`, `border-bottom: 1px solid --color-card-bg`, `color: --color-text-strong`

### Sizes

| Size | Font Size | Padding |
|------|-----------|---------|
| `sm` | 12px | `var(--space-1) var(--space-3)` |
| `md` | `--font-body-sm-size` | `var(--space-2) var(--space-4)` |

### Specifications

- All tabs: `font-weight: 500`, `--color-text-muted` default, `cursor: pointer`
- Icon: 16×16px, `flex-shrink: 0`, `gap: var(--space-2)`
- Transitions: `color, background-color, border-color, box-shadow` all `200ms var(--ease-out-cubic)`
- Disabled: `opacity: 0.5`, `cursor: not-allowed`, `pointer-events: none`
- `fullWidth`: each tab `flex: 1`, `justify-content: center`

---

## Toggle

Pressable button for toggling a value on/off.

### React API

```tsx
interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'default' | 'outline';                        // default: 'default'
  size?: 'sm' | 'md' | 'lg';                              // default: 'md'
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

### Variants

| Variant | Default State | Pressed State |
|---------|--------------|---------------|
| `default` | `bg: --color-toggle-bg`, `color: --color-toggle-text` | `bg: --color-toggle-active-bg`, `color: --color-toggle-active-text` |
| `outline` | `bg: transparent`, `border: 1px solid --color-border`, `color: --color-toggle-text` | `bg: --color-toggle-active-bg`, `color: --color-toggle-active-text` |

### Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 32px | `0 var(--space-2)` | `--font-label-md-size` |
| `md` | 40px | `0 var(--space-3)` | `--font-body-sm-size` |
| `lg` | 48px | `0 var(--space-4)` | `--font-body-md-size` |

### Specifications

- Shape: `border-radius: --radius-full`
- Hover: `background: --color-toggle-bg-hover`
- Focus: `box-shadow: 0 0 0 3px var(--color-primary-ring)`
- Disabled: `opacity: 0.5`, `cursor: not-allowed`
- Transition: `background-color 150ms ease, color 150ms ease`
- ToggleGroup: `display: inline-flex`, `gap: var(--space-1)`

---

## Tooltip

Contextual information popup on hover/focus.

### React API

```tsx
interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';            // default: 'top'
  align?: 'start' | 'center' | 'end';                     // default: 'center'
  delayMs?: number;                                         // default: 200
  children: React.ReactElement;
  className?: string;
}
```

### Specifications

- Background: `--color-tooltip-bg`
- Text: `--color-tooltip-text`, `--font-caption-size`
- Padding: `var(--space-1) var(--space-2)`
- Border radius: `--radius-xl`
- Z-index: `--z-tooltip`
- Arrow: 6px CSS triangle in `--color-tooltip-bg`
- Enter animation: `opacity 0→1` + `translateY(8px→0)` (or translateX for side variants), `150ms var(--ease-out-quad)`
- `pointer-events: none`, `white-space: nowrap`

---

## Breadcrumb

Navigation trail showing page hierarchy.

### React API

```tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}
```

### States

| Element | Color | Font |
|---------|-------|------|
| Link | `--color-breadcrumb-link` | `--font-body-sm-size` |
| Link hover | `--color-breadcrumb-link-hover` | underline |
| Current (last item) | `--color-breadcrumb-current` | `--font-label-lg-weight` |
| Separator | `--color-breadcrumb-separator` | — |
| Ellipsis | `--color-breadcrumb-text` | `--font-body-sm-size` |

### Specifications

- Layout: `flex row`, `flex-wrap: wrap`, `gap: var(--space-1)`
- Separator margin: `0 var(--space-1)`
- Ellipsis button: `padding: var(--space-1) var(--space-2)`, `border-radius: --radius-full`
- Ellipsis hover: `background: --color-surface-raised-hover`
- Link transition: `color 150ms`
- `maxItems` collapses middle items into `...` button

---

## Table

Data table with header, body, and optional features.

### React API

```tsx
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

### Sub-components

`TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`

### Specifications

- Wrapper: `overflow-x: auto`, `border: 1px solid var(--color-table-border)`, `border-radius: --radius-3xl`
- Table: `width: 100%`, `border-collapse: collapse`, `--font-body-sm-size`
- Header cell: `padding: var(--space-3) var(--space-4)`, `background: --color-table-header-bg`, `color: --color-table-header-text`, `font-weight: --font-label-lg-weight`, `text-transform: uppercase`, `letter-spacing: 0.05em`, `--font-label-md-size`, `border-bottom: 1px solid --color-table-border`
- Body cell: `padding: var(--space-3) var(--space-4)`, `color: --color-text-default`, `border-bottom: 1px solid --color-table-border`, last row has no border
- Striped: even rows `background: --color-table-stripe`
- Hoverable: rows `transition: background 150ms var(--ease-out-quad)`, hover `background: --color-table-row-hover`
- Caption: `padding: var(--space-3)`, `--color-text-muted`, `--font-body-sm-size`, `caption-side: bottom`

---

## Avatar

User or entity representation.

### React API

```tsx
interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';               // default: 'md'
  shape?: 'circle' | 'square';                             // default: 'circle'
  className?: string;
}
```

### Sizes

| Size | Dimensions | Initials Font | Icon Size |
|------|-----------|--------------|-----------|
| `xs` | 24×24px | 10px | 12px |
| `sm` | 32×32px | 12px | 16px |
| `md` | 40×40px | 14px | 20px |
| `lg` | 48×48px | 16px | 24px |
| `xl` | 64×64px | 20px | 32px |

### Shape

| Shape | Border Radius |
|-------|--------------|
| `circle` | `--radius-full` |
| `square` | `--radius-lg` |

### Fallback Hierarchy

1. `src` → renders `<img>` with `object-fit: cover`
2. `initials` → renders text, `background: --color-primary-subtle`, `color: --color-primary`
3. Neither → renders fallback User icon, same background/color as initials

### Specifications

- `display: inline-flex`, `align-items: center`, `justify-content: center`
- `overflow: hidden`, `flex-shrink: 0`
- Initials: `font-weight: 500`
- Transition: `opacity 200ms ease`

---

## Skeleton

Content placeholder while loading.

### React API

```tsx
interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';  // default: 'text'
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';                  // default: 'pulse'
}
```

### Variants

| Variant | Default Size | Border Radius |
|---------|-------------|---------------|
| `text` | `100% × 16px` | `--radius-sm` |
| `circular` | `40×40px` | `50%` |
| `rectangular` | custom | `0` |
| `rounded` | custom | `--radius-3xl` |

### Animations

| Animation | Effect |
|-----------|--------|
| `pulse` | `opacity 0.4→1→0.4` at `1.5s ease-in-out infinite` |
| `wave` | Gradient sweep `200% background-size` at `1.5s linear infinite` |
| `none` | Static |

### Specifications

- Base color: `--color-disabled-bg`
- Wave gradient: `--color-disabled-bg` → `--color-surface` → `--color-disabled-bg`
- Multi-line: `lines` prop renders stacked text skeletons with `gap: var(--space-2)`, last line is `width: 75%`

---

## Field

Form field wrapper with label, helper text, and error handling.

### React API

```tsx
interface FieldProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}
```

### Specifications

- Layout: `flex column`, `gap: var(--space-2)`
- Label: `--font-body-sm-size`, `weight: 500`, `--color-text-strong`
- Label disabled: `--color-text-disabled`
- Required indicator: `*` in `--color-error`, `margin-left: 2px`
- Helper text: `--font-caption-size`, `--color-text-muted`
- Error text: `--font-caption-size`, `--color-error-text`

---

## InputGroup

Compound input with prefix/suffix addons.

### React API

```tsx
interface InputGroupProps {
  children: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';                              // default: 'md'
  disabled?: boolean;
  error?: boolean;
  className?: string;
}
```

### Sizes

| Size | Height | Input Font |
|------|--------|-----------|
| `sm` | 36px | `--font-body-sm-size` |
| `md` | 44px | `--font-body-md-size` |
| `lg` | 52px | `--font-body-lg-size` |

### Specifications

- Wrapper: `flex row`, `border: 1px solid var(--color-input-border)`, `border-radius: --radius-full`, `background: --color-input-bg`
- Focus-within: `border-color: --color-primary`, `box-shadow: 0 0 0 3px var(--color-primary-ring)`
- Error: `border-color: --color-error`
- Prefix/suffix: `padding: 0 var(--space-3)`, `color: --color-text-muted`, separated by `border-right` / `border-left` using `--color-input-border`
- Inner input: `flex: 1`, transparent bg, `padding: 0 var(--space-3)`, `--color-text-default`
- Disabled: `opacity: 0.5`, `cursor: not-allowed`, `pointer-events: none`
- Transition: `border-color 150ms ease, box-shadow 150ms ease`

---

## ScrollArea

Custom-styled scrollable container.

### React API

```tsx
interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';       // default: 'vertical'
  maxHeight?: string | number;
  maxWidth?: string | number;
  style?: React.CSSProperties;
}
```

### Specifications

- `scroll-behavior: smooth`
- Scrollbar: `scrollbar-width: thin`, `scrollbar-color: var(--color-border) transparent`
- Webkit scrollbar: `width/height: var(--scale-6)`, thumb `--color-border`, thumb hover `--color-border-strong`, `border-radius: 9999px`
- `vertical`: `overflow-y: auto`, `overflow-x: hidden`
- `horizontal`: `overflow-x: auto`, `overflow-y: hidden`
- `both`: `overflow: auto`
