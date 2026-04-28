---
description: Dropdown visual specification — CSS classes, variants, sizes, states, and tokens
alwaysApply: false
---
# Dropdown — Visual Specification

## Architecture

All visual styling lives in `packages/css/src/dropdown.css` using `@apply` for structural utilities and raw CSS for transitions, animations, and theme overrides.

---

## Class Inventory

### Base

| Class | Purpose |
|---|---|
| `.acko-dropdown` | Wrapper — `flex flex-col relative` with `gap: 4px` |
| `.acko-dropdown-label` | Label — typography tokens, `color: var(--color-text-default)` |
| `.acko-dropdown-required` | Required asterisk — `color: var(--color-error)` |
| `.acko-dropdown-trigger` | Trigger button — `flex items-center justify-between w-full rounded-full` |
| `.acko-dropdown-value` | Selected value — `flex-1 min-w-0 overflow-hidden text-overflow:ellipsis` |
| `.acko-dropdown-placeholder` | Placeholder text — `color: var(--color-text-secondary)` |
| `.acko-dropdown-chevron` | Chevron icon — `shrink-0 flex items-center ml-8` |
| `.acko-dropdown-menu` | Dropdown menu — `absolute list-none`, shadow, rounded, animated |
| `.acko-dropdown-option` | Single option — `flex items-center cursor-pointer` with `gap: 8px` |
| `.acko-dropdown-search-wrapper` | Search wrapper — `pb-8 mb-8`, `border-bottom: 1px solid --color-border-subtle` |
| `.acko-dropdown-search` | Search input inside menu — `w-full rounded-full` |
| `.acko-dropdown-group-header` | Group header — `padding: 8px 12px`, `--font-caption-size`, `--color-text-secondary` |
| `.acko-dropdown-option-icon` | Option leading icon — `shrink-0 flex items-center` |
| `.acko-dropdown-option-check` | Selected check icon — `ml-auto shrink-0`, `--color-primary` |
| `.acko-dropdown-chevron-open` | Rotated chevron — `transform: rotate(180deg)` |
| `.acko-dropdown-no-results` | No results message — `text-center`, `--color-text-secondary` |

### Sizes

| Class | Height | Padding | Font Size |
|---|---|---|---|
| `.acko-dropdown-trigger-sm` | `h-40` (40px) | `px-16` | `var(--font-body-sm-size)` |
| `.acko-dropdown-trigger-md` | `h-48` (48px) | `px-20` | `var(--font-body-md-size)` |
| `.acko-dropdown-trigger-lg` | `h-56` (56px) | `px-24` | `var(--font-body-lg-size)` |

### Variants

| Variant | Menu rendering | Behavior |
|---|---|---|
| `single` | `<li>` options with check icon | Select one, menu closes |
| `multi` | `CheckboxRow` from `@acko/checkbox` | Select multiple, menu stays open |
| `searchable` | `<li>` options + search input | Filter and select one |
| `grouped` | `<li>` options under group headers | Select one from grouped list |

### States

| Class | Effect |
|---|---|
| `.acko-dropdown-trigger` | Default — `background: var(--color-input-bg)`, `border-color: var(--color-input-border)` (`grey-150` light / `grey-600` dark) |
| `.acko-dropdown-trigger:hover` | Hover — `border-color: var(--color-input-hover-border)` (`grey-200` light / `grey-550` dark) |
| `.acko-dropdown-trigger-open` | Active/open — `border-color: var(--color-input-focus-border)`, `box-shadow: 0 0 0 2px var(--color-input-focus-ring)` |
| `.acko-dropdown-trigger-error` | Error — gradient border `linear-gradient(0deg, red-200, grey-150)` via padding-box/border-box (dark: red-800 → grey-600), shake animation. Label does NOT turn red. |
| `.acko-dropdown-trigger-filled` | Has value — `border-color: var(--color-input-filled-border)` |
| `.acko-dropdown-trigger:disabled` | Disabled — `background: var(--color-input-disabled-bg)`, `border-color: var(--color-input-disabled-border)`, `cursor-not-allowed`, `--color-text-disabled` colors |
| `.acko-dropdown-label-open` | Label when open — `color: var(--color-primary)` |
| `.acko-dropdown-option-focused` | Keyboard-focused — `background-color: var(--color-primary-subtle)` |
| `.acko-dropdown-option-selected` | Selected — `--color-primary-subtle` bg, `--color-primary-hover` text, `font-weight: 500` |
| `.acko-dropdown-option-disabled` | Disabled option — `color: var(--color-text-secondary); cursor-not-allowed` |

### Multi-select Menu

| Class | Purpose |
|---|---|
| `.acko-dropdown-menu-multi` | Applied alongside `.acko-dropdown-menu` for `variant="multi"` |
| `.acko-dropdown-menu-multi .acko-cb-row` | Forces `flex-direction: row-reverse` (checkbox left), `px-12`, `border-radius: --radius-lg` to align with single-select options |

Desktop overrides (`@media (hover: hover) and (pointer: fine)`):
- `.acko-dropdown-menu-multi .acko-cb-row::after` → `display: none` (separator hidden — hover provides visual distinction)
- `.acko-dropdown-menu-multi .acko-cb-row:hover` → `--color-primary-subtle` (matches single-select option hover)

On mobile (touch devices), separators remain visible inside the dropdown menu (Drawer).

The menu's base `p-8` padding is shared across single and multi variants.

### Sheet Mode (Drawer)

When `mobileMode="sheet"` and the viewport is mobile (≤767px), the inline menu is suppressed and a `Drawer side="bottom"` renders the menu content instead.

- `variant="multi"` → `CheckboxRow` items inside the Drawer
- `variant="single"` / other → `<li>` options inside the Drawer, closing on selection

The Drawer receives `title={label}`, `size="sm"`, and `side="bottom"`.
No additional CSS is required — the Drawer's own styles handle the bottom sheet layout.

### Helper/Error Text

| Class | Color |
|---|---|
| `.acko-dropdown-helper-text` | `var(--color-text-secondary)` |
| `.acko-dropdown-error-text` | `var(--color-error-text)` |

---

## Animations

| Keyframe | Purpose |
|---|---|
| `acko-dropdown-menu-enter` | Menu fade-in + translateY(-8px → 0) over 150ms |
| `acko-dropdown-shake` | Error shake — 300ms horizontal oscillation |

---

## Tokens Used

| Token | Usage |
|---|---|
| `--color-input-border` | Default trigger border (`grey-150` light / `grey-600` dark) |
| `--color-input-bg` | Trigger and menu background (`grey-white` light / `grey-750` dark) |
| `--color-input-hover-border` | Hover trigger border (`grey-200` light / `grey-550` dark) |
| `--color-input-filled-border` | Filled trigger border (`grey-200` light / `grey-550` dark) |
| `--color-input-focus-border` | Open/focus border |
| `--color-input-focus-ring` | Focus ring `box-shadow: 0 0 0 2px` (`grey-150` light / `grey-600` dark) |
| `--color-primary-subtle` | Option hover/focused/selected bg |
| `--color-primary-hover` | Selected option text |
| `--color-primary-subtle` | Multi-select CheckboxRow hover inside menu |
| `--color-text-primary` | Value and option text |
| `--color-text-secondary` | Placeholder, helper text, chevron, disabled option |
| `--color-text-disabled` | Disabled trigger text |
| `--color-error` | Required asterisk |
| `--color-error-text` | Error text (helper text below only; label does NOT turn red) |
| `--color-input-disabled-bg` | Disabled trigger bg (`grey-100` light / `grey-700` dark) |
| `--color-input-disabled-border` | Disabled trigger border (`grey-150` light / `grey-600` dark) |
| `--shadow-dropdown` | Menu shadow |
| `--z-dropdown` | Menu z-index |
| `--radius-full` | Trigger and tag border-radius |
| `20px` | Menu panel border-radius |
| `--radius-lg` | Option border-radius |
| `--ease-out-cubic` | Chevron rotation, menu animation |

---

## Dark Theme Overrides

Scoped under `[data-theme="dark"]`:
- Trigger: `--color-input-bg` (`grey-750`) bg, `--color-input-border` (`grey-600`) border
- Error trigger: gradient border `linear-gradient(0deg, red-800, grey-600)`
- Disabled trigger: `--color-input-disabled-bg` (`grey-700`) bg, `--color-input-disabled-border` (`grey-600`) border
- Menu: `--color-surface-raised` bg, `--color-border` border
- Search: `--color-surface` bg, `--color-border` border
