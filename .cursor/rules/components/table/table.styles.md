---
description: Table visual spec — CSS classes, striped/hoverable, header styling, and token usage
globs: "**/table/**,**/Table/**"
---

# Table — Styles

CSS file: `@acko/css/table.css`

## CSS Classes

### Wrapper
- `.acko-table-wrapper` — `overflow-x: auto`, `border: 1px solid var(--color-table-border)`, `border-radius: --radius-3xl`

### Table
- `.acko-table` — `width: 100%`, `border-collapse: collapse`, `--font-body-sm-size`

### Header
- `.acko-table-header` — container for header row
- `.acko-table-head` — `padding: 12px 16px`, `background: --color-table-header-bg`, `color: --color-table-header-text`, `font-weight: --font-label-lg-weight`, `text-transform: uppercase`, `letter-spacing: 0.05em`, `--font-label-md-size`, `border-bottom: 1px solid --color-table-border`

### Body
- `.acko-table-body` — container for body rows
- `.acko-table-cell` — `padding: 12px 16px`, `color: --color-text-default`, `border-bottom: 1px solid --color-table-border` (last row has no border)

### Row
- `.acko-table-row` — base row

### Caption
- `.acko-table-caption` — `padding: 12px`, `--color-text-secondary`, `--font-body-sm-size`, `caption-side: bottom`

### Variants
- `.acko-table-striped` — even rows `background: --color-table-stripe`
- `.acko-table-hoverable` — rows `transition: background 150ms var(--ease-out-quad)`, hover `background: --color-table-row-hover`
