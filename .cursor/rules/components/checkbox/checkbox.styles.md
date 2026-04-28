---
description: Checkbox visual spec — atom, row, group CSS classes and responsive behavior
globs: "**/checkbox/**,**/Checkbox/**"
---

# Checkbox — Styles

CSS file: `@acko/css/checkbox.css`

## Atom Classes (unchanged)

### Base
- `.acko-checkbox` — inline-flex, items-start, `gap: 12px`, cursor-pointer, select-none
- `.acko-checkbox-native` — visually hidden native input
- `.acko-checkbox-box` — custom box with border `--color-control-border-selector`, bg `--color-card-bg`

### Atom Sizes (via `.acko-checkbox-{size}`)

| Size | Box | Icon SVG | Label font |
|------|-----|----------|------------|
| sm | `16px`, radius-sm | `10px` | `--font-body-sm-size` |
| md | `20px`, radius-md | `12px` | `--font-body-md-size` |
| lg | `24px`, radius-md | `14px` | `--font-body-lg-size` |

### Atom States

| State | Border | Background | Icon |
|-------|--------|-----------|------|
| Unchecked | `--color-control-border-selector` | `--color-card-bg` | none |
| Checked | `--color-primary` | `--color-primary` | `--color-on-primary` checkmark |
| Indeterminate | `--color-primary` | `--color-primary` | `--color-on-primary` minus |
| Hover unchecked | `--color-primary-muted` | `--color-primary-subtle` | none |
| Hover checked | `--color-primary-hover` | `--color-primary-hover` | checkmark |
| Focus | `--color-primary` + ring | — | — |
| Disabled unchecked | `--color-border-subtle` | `--color-surface-raised` | none |
| Disabled checked | `--color-disabled-border` | `--color-disabled-bg` | `--color-disabled-text` |
| Error | `--color-error` | `--color-card-bg` | none |

### Atom Animations
- Checked bounce: `acko-checkbox-bounce` 300ms spring
- Line-draw tick: `stroke-dashoffset` 300ms ease-out
- Icon pop: scale(0.3→1) spring
- Error shake: `acko-checkbox-shake` 300ms

---

## CheckboxRow Classes

### Base — `.acko-cb-row`
- Full-width flex row, `gap: 12px`, cursor-pointer
- Reuses `.acko-checkbox-box` and `.acko-checkbox-icon` from the atom

### Separator — `::after` pseudo-element
- 1px line via `::after` positioned absolutely at the bottom of each row
- Independent of `border-radius` — always renders as a straight line
- Hidden on last row (`:last-child::after { display: none }`)
- **Visible by default** on both desktop and mobile, in all contexts (page-level, inside card, inside drawer)
- **Only hidden** inside `acko-dropdown-menu-multi` on desktop (scoped rule in `dropdown.css`) — hover provides visual distinction there

| Context | Desktop | Mobile |
|---------|---------|--------|
| Inside dropdown menu (multi-select) | Hidden | Visible |
| Page-level list / inside any container | Visible | Visible |

### Responsive Layout

| Viewport | Direction | Box size | Min height | Padding | Font | Interaction |
|----------|-----------|----------|-----------|---------|------|-------------|
| Desktop (≥768px) | `row-reverse` (checkbox left) | 20px (md) | min-h-44 | py-12 (vertical only) | `--font-body-md-size` | hover bg |
| Mobile (<768px) | `row` (checkbox right) | 24px (lg) | min-h-52 | py-16 (vertical only) | `--font-body-lg-size` | :active bg |

No horizontal padding — rows inherit padding from parent container.

The responsive flip is **CSS-only** — no props or JS needed.

### Row Content
- `.acko-cb-row-content` — flex column, holds label + description
- `.acko-cb-row-label` — `--color-text-default`
- `.acko-cb-row-description` — `--font-caption-size`, `--color-text-secondary`

### Row States
- `.acko-cb-row-checked` — checked box with bounce animation
- `.acko-cb-row-indeterminate` — filled box
- `.acko-cb-row-error` — error-colored box border

### Row Hover/Active
- Desktop: `@media (hover: hover)` → `background: --color-surface-hover` on row
- Mobile: `:active` → `background: --color-surface-hover` on row

---

## CheckboxGroup Classes

### Container — `.acko-cb-list`
- Flex column layout

### Label — `.acko-cb-list-label`
- `--font-label-lg-size`, `--font-label-lg-weight`, bottom margin 8px

No items container — rows are rendered directly as a flat list with bottom-border separators.

---

## Multi-Select Integration

`CheckboxRow` is the universal selection item for any multi-select context. Only the container changes.

### Desktop — `Dropdown variant="multi"` + `CheckboxRow` inside `acko-dropdown-menu`

CSS in `dropdown.css`:
- `.acko-dropdown-menu-multi .acko-cb-row` — forces `flex-direction: row-reverse` (checkbox left), adds `px-12` padding and `border-radius: --radius-lg` to align with single-select options
- Hover override: `--color-primary-subtle` (matches single-select option hover)

The dropdown menu provides: absolute positioning, border, shadow, max-height scroll, open/close animation. The menu's base `p-8` padding is shared across single and multi variants.

### Mobile — `Drawer side="bottom"` + `CheckboxRow`
- Trigger: button styled like a dropdown field, shows selected count
- Drawer header → title (context-appropriate, e.g. "Select items", "Filter by category")
- Drawer body → `CheckboxRow` items with `flexDirection: row` (checkbox right)
- Drawer provides: backdrop, slide-up animation, body scroll lock, escape dismiss

These patterns apply to any domain — filters, preferences, permissions, features, etc.
