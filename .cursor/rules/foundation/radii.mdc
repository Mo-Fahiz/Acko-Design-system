---
description: Border radius tokens and nested radius rule
---

# Border Radius Tokens

## Documentation scope

**Portable across platforms:** Token **names**, **pixel** radii, **role** mapping (pill for interactive, 4xl for surfaces, nested-radius math). Flutter `BorderRadius.circular(...)` should use the **same** numeric values per token.

**Web-specific in this file:** Tailwind utility column (`rounded-full`, etc.).

| Token | Value | Use Case | Tailwind |
|-------|-------|----------|----------|
| `--radius-sm` | 4px | Nested insets | `rounded` |
| `--radius-md` | 6px | Checkboxes md/lg | `rounded-md` |
| `--radius-lg` | 8px | Options, table cells | `rounded-lg` |
| `--radius-xl` | 10px | Tooltip | `rounded-xl` |
| `--radius-2xl` | 12px | Nested card (narrow) | `rounded-2xl` |
| `--radius-3xl` | 16px | Nested card (wide) | `rounded-[16px]` |
| `--radius-4xl` | 20px | Dialogs, drawers, toasts, dropdown menus | `rounded-[20px]` |
| `--radius-5xl` | 24px | Card outer (narrow) | `rounded-[24px]` |
| `--radius-6xl` | 32px | Card outer (wide) | `rounded-[32px]` |
| `--radius-full` | 9999px | Buttons, inputs, pills | `rounded-full` |

**`--radius-4xl` (20px)** is the standard for non-card surface containers: dialogs, drawers, toasts, dropdown menus, calendar panels.

## Card Geometry (Responsive)

Card surfaces use **dedicated responsive tokens** instead of a single fixed radius. Geometry is **global** for all card variants — only fill/border/shadow differ by variant.

| Viewport | Range | Outer radius | Content gutter (inner margin) | Nested card radius | Token (outer) | Token (nested) |
|----------|-------|--------------|-------------------------------|--------------------|----------------|-----------------|
| Narrow | 320–768px | **24px** | 12px | **12px** | `--radius-card-outer` → `--radius-5xl` | `--radius-card-nested` → `--radius-2xl` |
| Wide | 769px+ | **32px** | 16px | **16px** | `--radius-card-outer` → `--radius-6xl` | `--radius-card-nested` → `--radius-3xl` |

The `--radius-card-outer`, `--radius-card-nested`, and `--card-content-gutter` tokens **automatically remap** at the 769px media query in `tokens.css`. Components consuming them do not need to write their own breakpoint logic.

CTAs inside cards remain **`--radius-full` (pill)** at every breakpoint per the button spec.

## Nested Radius Rule (legacy non-card)

When a non-card rectangular element fills a rounded container edge-to-edge, its radius is still derived from the formula:

```
inner radius = outer radius − padding
```

The legacy `--radius-inset-*` tokens are **based on `--radius-4xl` (20px)** and remain available for non-card insets that still derive from a 20px container:

| Token | Value | When |
|-------|-------|------|
| `--radius-inset-sm` | 8px (`--radius-lg`) | Inner elements in 20px-radius surface with 12px padding → 20 − 12 |
| `--radius-inset-md` | 4px (`--radius-sm`) | 20px-radius surface with 16px padding → 20 − 16 |
| `--radius-inset-lg` | 0px | 20px-radius surface with 24px padding → 20 − 24 |

For **cards specifically**, prefer `--radius-card-nested` over the inset formula — it is breakpoint-aware and matches the canonical 12 / 16 nested values.

### Applies to
- Icon wrapper boxes, image thumbnails, inset panels (`<CardInset>` uses `--radius-card-nested`)

### Exempt (keep their own radius)
- Buttons, badges, avatars — intentional pill/circular shape

Radius tokens are **theme-agnostic**.
