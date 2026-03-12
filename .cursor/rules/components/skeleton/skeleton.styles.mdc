---
description: Skeleton visual spec — CSS classes, variants, animations
globs: "**/skeleton/**,**/Skeleton/**"
---

# Skeleton — Styles

CSS file: `@acko/css/skeleton.css`

## CSS Classes

### Base
`.acko-skeleton` — `display: block`, `background: --color-disabled-bg`

### Variants

| Class | Default Size | Border Radius |
|-------|-------------|---------------|
| `.acko-skeleton-text` | `100% × 16px` | `--radius-sm` |
| `.acko-skeleton-circular` | 40px × 40px | `50%` |
| `.acko-skeleton-rectangular` | custom | `0` |
| `.acko-skeleton-rounded` | custom | `--radius-3xl` |

### Animations

| Class | Effect |
|-------|--------|
| `.acko-skeleton-pulse` | `opacity 0.4→1→0.4` at `1.5s ease-in-out infinite` |
| `.acko-skeleton-wave` | Gradient sweep `200% background-size` at `1.5s linear infinite` |
| `.acko-skeleton-none` | Static, no animation |

### Wave Gradient
- Base: `--color-disabled-bg`
- Highlight: `--color-surface`
- Pattern: `--color-disabled-bg` → `--color-surface` → `--color-disabled-bg`

### Multi-line
When `lines` prop is set, renders stacked text skeletons with `gap: 8px`. Last line is `width: 75%`.
