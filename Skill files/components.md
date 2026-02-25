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
| `secondary` | Supporting actions | `--color-surface-raised` bg, `--color-primary` text | `--color-border-subtle` bg, `--color-on-primary` text |
| `outline` | Tertiary actions | `--color-primary` border/text, transparent bg | `--color-on-primary` border/text, transparent bg |
| `ghost` | Inline/subtle actions | `--color-primary` text, transparent bg | `--color-primary-muted` text, transparent bg |
| `danger` | Destructive (delete, remove) | `--color-error-strong` border/text, transparent bg | `--color-error-strong` border/text, transparent bg |

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
| Default | `--color-surface-raised` | `--color-primary` | None |
| Hover | `--color-surface-raised-hover` | `--color-primary` | `--shadow-btn-secondary-hover` |
| Disabled | `--color-disabled-bg` | `--color-disabled-text` | None |

**Outline:**
| State | Background | Border | Text | Shadow |
|-------|-----------|--------|------|--------|
| Default | Transparent | `--color-primary` (1px inset) | `--color-primary` | None |
| Hover | `--color-primary-subtle` | `--color-primary` (1px inset) | `--color-primary` | `--shadow-btn-hover` |
| Disabled | Transparent | `--color-disabled-bg` (1px inset) | `--color-disabled-text` | None |

**Ghost:**
| State | Background | Text |
|-------|-----------|------|
| Default | Transparent | `--color-primary` |
| Hover | `--color-surface-raised` | `--color-primary` |
| Disabled | Transparent | `--color-disabled-text` |

**Danger:**
| State | Background | Border | Text | Shadow |
|-------|-----------|--------|------|--------|
| Default | Transparent | `--color-error-strong` (1px inset) | `--color-error-strong` | None |
| Hover | `--color-error-subtle` | `--color-error-strong` (1px inset) | `--color-error-strong` | `0px 4px 8px var(--color-error-shadow)` |
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
| Default | `--color-border-subtle` | `--color-on-primary` | None |
| Hover | `--color-border-subtle` | `--color-on-primary` | `--shadow-btn-secondary-hover` |
| Disabled | `--color-disabled-bg` | `--color-disabled-text` | None |

**Outline:**
| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | Transparent | `--color-on-primary` (1px inset) | `--color-on-primary` |
| Hover | `--color-surface-ghost-hover` | `--color-on-primary` (1px inset) | `--color-on-primary` |
| Disabled | Transparent | `--color-disabled-bg` (1px inset) | `--color-disabled-text` |

**Ghost:**
| State | Background | Text |
|-------|-----------|------|
| Default | Transparent | `--color-primary-muted` |
| Hover | `--color-border-subtle` | `--color-primary-muted` |
| Disabled | Transparent | `--color-disabled-text` |

**Danger:**
| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | Transparent | `--color-error-strong` (1px inset) | `--color-error-strong` |
| Hover | `--color-error-subtle` | `--color-error-strong` (1px inset) | `--color-error-strong` |
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
| `ghost` | `--color-primary` |
| `danger` | `--color-text-on-color` |

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
| Checked | `--color-primary` | `--color-primary` | `--color-text-on-color` checkmark |
| Indeterminate | `--color-primary` | `--color-primary` | `--color-text-on-color` minus |
| Hover (unchecked) | `--color-primary-muted` | `--color-primary-subtle` | none |
| Hover (checked) | `--color-primary-hover` | `--color-primary-hover` | `--color-text-on-color` checkmark |
| Focus | `--color-primary` + `--shadow-focus-ring` | — | — |
| Disabled (unchecked) | `--color-border-subtle` | `--color-surface-raised` | none |
| Disabled (checked) | `--color-text-muted` | `--color-text-muted` | `--color-text-on-color` checkmark |
| Error | `--color-error-strong` | `--color-surface` | none |

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
- Default: `2px solid var(--color-border-subtle)`, `radius-2xl`
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
| Selected | `--color-primary` | `--color-text-on-color` | bold |
| Range start/end | `--color-primary` | `--color-text-on-color` | half-rounded |
| Range middle | `--color-primary-subtle` | `--color-primary-hover` | — |
| Disabled | `--color-surface` | `--color-text-muted` | `cursor: not-allowed` |
| Outside month | `--color-surface` | `--color-text-disabled` | — |

### Specifications

- Grid: 7 columns, `aspect-ratio: 1` cells, minimum 44px height (tap target)
- Header: month/year label centered, prev/next arrows
- Navigation buttons: 36×36px, `radius-lg`, transparent bg
- Container: 320px wide, `radius-2xl`, `--shadow-dropdown`

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

| Color | Background | Text | Dot |
|-------|-----------|------|-----|
| `purple` | `--badge-purple-bg` | `--badge-purple-text` | `--badge-purple-dot` |
| `green` | `--badge-green-bg` | `--badge-green-text` | `--badge-green-dot` |
| `blue` | `--badge-blue-bg` | `--badge-blue-text` | `--badge-blue-dot` |
| `orange` | `--badge-orange-bg` | `--badge-orange-text` | `--badge-orange-dot` |
| `pink` | `--badge-pink-bg` | `--badge-pink-text` | `--badge-pink-dot` |
| `gray` | `--badge-gray-bg` | `--badge-gray-text` | `--badge-gray-dot` |

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
| `current` | `--color-primary` | `--color-text-on-color` | `--color-text-strong` | `--color-border-subtle` |
| `completed` | `--color-success` | `--color-text-on-color` (checkmark) | `--color-text-strong` | `--color-success` |
| `error` | `--color-error-text` | `--color-text-on-color` (!) | `--color-error-text` | `--color-border-subtle` |

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
| Current | `--color-primary` | `--color-text-on-color` |
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
- Same states as TextInput
