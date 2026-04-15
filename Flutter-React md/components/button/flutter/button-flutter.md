# Button — Flutter

> **Scope:** Flutter implementation only. **Do not change** visuals or tokens vs [`../button-base.md`](../button-base.md). Describe widgets, theme hooks, and platform mapping — same pixels and semantics as web.

> **Status:** This monorepo is web-first; Flutter is the intended parallel track.

## Goals

- Match **variants, sizes, and states** in [`../button-base.md`](../button-base.md).
- Use the **same semantic token names** (`color-primary`, `color-btn-secondary-bg`, …) via `ThemeExtension`, `ColorScheme`, or generated Dart from tokens.
- **Never** invent new semantic colors or radii in widgets — extend tokens in `packages/tokens` / `global.md` first.

## Suggested API shape

| Concept | Direction |
|---------|-----------|
| Widget | e.g. `AckoButton` |
| `variant` / `size` | Enums mirroring React |
| Theming | `ThemeExtension` or centralized ACKO theme |
| Loading | Same 3-dot wave (6px dots, 4px gap, timings in base spec) or simplified when `MediaQuery.disableAnimations` |
| Icons | [`lucide_icons`](https://pub.dev/packages/lucide_icons) — same metaphors as web (arrow vs chevron per `Flutter-React md/global.md`) |

## Platform mapping

| Web | Flutter |
|-----|---------|
| `@media (hover: hover)` | `WidgetState.hovered` where applicable; no hover on typical phones |
| `:focus-visible` | `Focus` / `FocusNode` + focus indicator matching `shadow-focus-ring` intent |
| `aria-busy` / `aria-disabled` | `Semantics` (`enabled`, `label`, `hint`) |
| `pointer-events: none` when loading | `AbsorbPointer` or ignoring gestures |

## Structure parity

Mirror the web tree conceptually:

- Content row: leading icon → label (or offscreen label if icon-only) → trailing icon.
- Loading overlay: three dots centered; main content visually hidden but layout size retained.

See [`../button-base.md`](../button-base.md) §15 — DOM / widget structure.

## Touch targets

Minimum **~44 logical px** height on mobile. Treat `xs` (32px) as **desktop-dense** only.

## Testing

- Golden tests: variants × light/dark.
- `iconOnly`: semantic label present.
- Loading: no double activation; parent owns async.

## References

- [`../button-base.md`](../button-base.md) — full specification.
- [`react/button-react.md`](../react/button-react.md) — reference implementation behavior (web).
- `.cursor/rules/components/button/button.style.mdc` — CSS reference for pixel parity.
