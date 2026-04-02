# Button — Flutter

> **Status:** This repo is web-first today. This document defines the **intended** Flutter track so mobile engineers can mirror the web implementation without guessing.

## Goals

- Match **variants, sizes, and states** in `button.spec.md`.
- Use the **same semantic token names** as Dart constants or `ThemeExtension` fields (values aligned with `tokens.css`).
- Do **not** introduce new semantics (colors, radii) in widgets — add tokens at source if something is missing.

## Suggested structure (illustrative)

| Concept | Flutter direction |
|---------|-------------------|
| Widget | `AckoButton` (name to be finalized with package naming). |
| Variants / sizes | Enum or constructor variants matching web `variant` + `size`. |
| Theme | `ThemeExtension<AckoButtonTokens>` or shared `AckoTheme` with button text styles and fills. |
| Loading | `WidgetState` or explicit `isLoading` + `AbsorbPointer`; show three-dot or `CircularProgressIndicator` sized to match design. |
| Icons | [`lucide_icons`](https://pub.dev/packages/lucide_icons) or agreed Lucide port — **same metaphors** as web (arrow vs chevron per iconography rules). |

## Platform differences (honest)

| Web | Flutter |
|-----|---------|
| `:hover` media queries | No hover on most phones; use `WidgetState.hovered` on desktop/embed. |
| `:focus-visible` | `FocusNode`, `Focus`, and themed focus indicators. |
| `aria-busy`, `aria-disabled` | `Semantics(label:, hint:, enabled:, inMutuallyExclusiveGroup:, …)` — map loading/disabled explicitly. |
| `cursor`, `pointer-events` | Gestures + `HitTestBehavior`; consider splash (`InkWell`) vs spec (may stay custom per ACKO). |

## Touch targets

Prefer **min height ~44 logical pixels** for consumer mobile flows. Parity with web `xs` may be **desktop-only** in Flutter.

## Tests / review checklist

- Golden tests per variant × theme (light/dark/elevated).
- Semantic label present for `iconOnly`.
- Loading state prevents duplicate submission at call site (Flutter pattern: parent owns async; button reflects `isLoading`).

## Related

- `button.spec.md` — canonical intent.
- `button.web.md` — reference implementation in this monorepo.
