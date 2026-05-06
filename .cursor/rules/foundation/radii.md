---
description: Border radius tokens, responsive card geometry, and nested radius rule (camelCase CSS vars)
---

# Border Radius Tokens

## Documentation scope

**Portable across platforms:** Token **names**, **pixel** radii, **role** mapping (pill for interactive, 4xl for non-card surfaces, nested-radius math).

**Web-specific:** Tailwind utility column (`rounded-full`, etc.). CSS variables use **camelCase** (e.g. `--radiusSm`, `--radiusCardOuter`).

## Core radius scale

| Token | Value | Use Case | Tailwind |
|-------|-------|----------|----------|
| `--radiusSm` | 4px | Nested insets | `rounded` |
| `--radiusMd` | 6px | Checkboxes md/lg | `rounded-md` |
| `--radiusLg` | 8px | Options, table cells | `rounded-lg` |
| `--radiusXl` | 10px | Tooltip | `rounded-xl` |
| `--radius2xl` | 12px | Nested surfaces (narrow) | `rounded-2xl` |
| `--radius3xl` | 16px | Nested surfaces (wide) | `rounded-[16px]` |
| `--radius4xl` | 20px | Dialogs, drawers, toasts, dropdown menus, calendar panels | `rounded-[20px]` |
| `--radius5xl` | 24px | Card outer (narrow viewport) | `rounded-[24px]` |
| `--radius6xl` | 32px | Card outer (wide viewport) | `rounded-[32px]` |
| `--radiusFull` | 9999px | Buttons, inputs, pills | `rounded-full` |

**`--radius4xl` (20px)** is the standard for **non-card** surface containers (dialogs, drawers, toasts, dropdowns, calendar).

## Card geometry (responsive)

Card surfaces use **dedicated responsive tokens**. Geometry is global for card variants — only fill, border, and shadow differ by variant.

| Viewport | Range | Outer radius | Content gutter | Nested card radius | Token (outer) | Token (nested) |
|----------|-------|--------------|----------------|-------------------|---------------|----------------|
| Narrow | 320–768px | **24px** | 12px | **12px** | `--radiusCardOuter` → `--radius5xl` | `--radiusCardNested` → `--radius2xl` |
| Wide | 769px+ | **32px** | 16px | **16px** | `--radiusCardOuter` → `--radius6xl` | `--radiusCardNested` → `--radius3xl` |

`--radiusCardOuter`, `--radiusCardNested`, and `--cardContentGutter` remap at the **769px** breakpoint in `packages/tokens/src/tokens.css`. Components should consume these tokens rather than duplicating breakpoint logic.

CTAs inside cards remain **`--radiusFull`** at every breakpoint.

## Nested radius rule

When a rectangular element nests inside a rounded container:

```
inner radius = outer radius − padding
```

For **cards**, prefer **`--radiusCardNested`** over manual math — it tracks the responsive outer radius.

### Legacy inset tokens (20px outer reference)

When a **non-card** 20px-radius surface (`--radius4xl`) wraps inset content, use **`--radiusInsetSm`**, **`--radiusInsetMd`**, **`--radiusInsetLg`** (see `tokens.css`) — derived from 20px − padding.

| Token | Effective | When |
|-------|-----------|------|
| `--radiusInsetSm` | 8px (`--radiusLg`) | 12px inner padding |
| `--radiusInsetMd` | 4px (`--radiusSm`) | 16px inner padding |
| `--radiusInsetLg` | 0px | 24px inner padding |

### Applies to

- Icon wrappers, thumbnails, inset panels (non-card or legacy)

### Exempt

- Buttons, badges, avatars — intentional pill/circular shapes

Radius tokens are **theme-agnostic**.
