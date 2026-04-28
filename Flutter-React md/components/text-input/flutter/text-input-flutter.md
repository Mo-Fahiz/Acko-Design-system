# TextInput — Flutter

> **Scope:** Flutter implementation only. **Do not change** visuals or tokens vs [`../text-input-base.md`](../text-input-base.md). Web CSS reference: `packages/css/src/text-input.css`.

> **Status:** This monorepo is web-first; this document defines the **intended** Flutter mapping so implementations match the current preview and CSS.

---

## Goals

- Match **structure, sizes, states, motion, and semantic tokens** in [`../text-input-base.md`](../text-input-base.md).
- Map the same token names (`color-input-border`, `color-primary`, `font-body-md-size`, …) via **`ThemeExtension`**, generated Dart from tokens, or a centralized ACKO theme — **never** hard-code primitive hex values in widgets.

---

## Suggested API shape

| Concept | Direction |
|---------|-----------|
| Widget | e.g. `AckoTextInput` |
| `size` | `sm` / `md` / `lg` enum mirroring web |
| `state` | `default` / `error` / `success` |
| Value | `String` + `ValueChanged<String>` or `TextEditingController` |
| Slots | `Widget?` leading/trailing icon; optional prefix/suffix **Text**; helper/error **String** |
| **Success vs trailing icon** | When `state == success`, show **only** the check icon in the trailing slot (do not also show `iconRight`). |

---

## Layout parity

Use a **`Column`** (or `Flex` vertical) with:

1. **Label row** — `Text` + optional `Text('*', style: error color)` with `Semantics` excluding asterisk if you mirror `aria-hidden` behavior.
2. **Field row** — `Row` inside a **DecoratedBox** / **Container** with:
   - `BorderRadius` = full pill (**match `--radius-full`** from theme / global radii).
   - Height and horizontal padding: **40 / 48 / 56** and **16 / 20 / 24** per size.
3. **Helper or error** — single `Text` below, caption style; error can use `Semantics(liveRegion: true)` for announcement.
4. **Character count** — `Align(alignment: Alignment.centerRight, child: Text('$current/$max'))`, caption + secondary color.

Spacing between blocks: **4 logical px** (same as web `gap-4` intent).

---

## Decoration mapping (pixel parity)

| Web (concept) | Flutter approach |
|---------------|------------------|
| `rounded-full` + 1px border | `BoxDecoration(borderRadius: pill, border: Border.all(width: 1))` |
| Focus: border + **2px outer ring** | `BoxDecoration(boxShadow: [BoxShadow(spreadRadius: 2, color: focusRing)])` **or** stack: inner container + outer transparent padding with ring — match **0 0 0 2px** ring color `color-input-focus-ring`. |
| Error: gradient border | Use **`Decoration`** with a custom painter or the **double-layer gradient** pattern (inner fill + gradient border) equivalent to CSS `padding-box` / `border-box` split — colors `color-error-gradient-from` → `color-error-gradient-to`. |
| Readonly / disabled | Same border/bg/token rules as base spec. |

---

## Typography

| Role | Token / style |
|------|----------------|
| Label | `font-label-lg-*` (size, weight, line height, letter spacing) |
| Value (`sm` / `md` / `lg`) | `font-body-sm` / `font-body-md` / `font-body-lg` |
| Prefix/suffix | **Body sm** size + secondary text color (fixed; not scaled with `lg`) |
| Helper, error, count | Caption tokens; secondary color for helper/count; error text color for errors |

Use **`TextStyle`** from theme extensions that read the same semantic names as `Flutter-React md/global.md`.

---

## Icons

- Leading/trailing slot size: **square** with side length equal to **body font size** for that input size (12 / 16 / 18 logical px alignment with web).
- **Success check:** 16×16 logical px, stroke width **2.5**, Lucide **Check** path equivalent (`lucide_icons` package). Color: `color-success` (light) / `color-success-text` where the web uses dark override.

---

## Motion

- **Shake:** `AnimationController` 300ms, ease-out; horizontal offsets **0, -4, +4, -3, +2, 0** logical px (same as `@keyframes acko-text-input-shake`).
- **Check pop:** opacity 0→1, scale 0.5→1.15→1 over 300ms ease-out.
- Border/background/shadow: **200ms** ease; label/icon color: **150ms** ease.
- Honor **`MediaQuery.disableAnimations`** / reduced motion.

---

## Platform mapping

| Web | Flutter |
|-----|---------|
| `:hover` (pointer fine) | `WidgetState.hovered` on desktop; optional no-op on touch-only |
| `:focus` / `.acko-text-input-focused` | `FocusNode` + `Focus` decoration / manual ring when `hasFocus` |
| `aria-invalid`, `aria-required`, `aria-describedby` | `Semantics` (`hint`, `error`, `label`, `value`) |
| `role="alert"` on error | `Semantics(liveRegion: true)` or `Assertive` semantics for error text updates |

---

## Touch

Minimum tap height for the field row should meet platform guidelines (~48dp); `sm` (40px) may be **desktop-dense** — document product choice if mobile uses `md` minimum.

---

## Testing

- Golden tests: default, error, success, disabled × light/dark.
- Success: trailing custom icon **not** shown when success check is shown.
- Focus ring and error gradient visually match web snapshots.

---

## References

- [`../text-input-base.md`](../text-input-base.md) — full contract.
- [`../react/text-input-react.md`](../react/text-input-react.md) — reference behavior (web).
- `.cursor/rules/components/text-input/text-input.styles.md` — CSS class ↔ visual detail.
- [`../../global.md`](../../global.md) — tokens and foundations.
