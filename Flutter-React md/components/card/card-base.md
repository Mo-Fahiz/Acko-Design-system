# Card — Base specification (platform-agnostic)

> **Purpose:** Surface containers for grouped content and actions. **CSS:** `packages/css/src/card.css`.

---

## 1. What it is

A **Card** provides a **default**, **secondary**, **elevated**, **outline**, or **demoted** surface with optional **header**, **content**, **footer**, and **inset** regions. Geometry (outer radius, inner margin, nested radius) is **global and responsive** — see §3 below — so all five variants look geometrically identical and only differ in fill / border / shadow.

---

## 2. Properties (API contract)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `"default"` \| `"secondary"` \| `"elevated"` \| `"outline"` \| `"demoted"` | `"default"` | Visual style — geometry is constant across all five; only fill, border, and shadow change. |
| `padding` | `"none"` \| `"sm"` \| `"md"` \| `"lg"` | `"md"` | Inner margin. `md` matches the breakpoint gutter (`--card-content-gutter`); `sm` and `lg` are explicit overrides. |
| `className` | `string` | — | Additional CSS classes merged onto the root element. |
| `children` | node | — | Card content — typically composed with subcomponents below. |

### Subcomponents

| Subcomponent | Purpose | CSS class |
|-------------|---------|-----------|
| `CardHeader` | Title row with optional leading icon; bottom border. | `.acko-card-header` |
| `CardContent` | Main body region; no vertical padding by default. | `.acko-card-content` |
| `CardFooter` | Action row; top border; actions align right. | `.acko-card-footer` |
| `CardInset` | Nested inset panel; uses nested radius and demoted-bg fill. | `.acko-card-inset` |

All subcomponents accept `className` and `children` and forward `ref`.

---

## 3. Variant visual mapping

| Variant | Background | Border | Shadow |
|---------|-----------|--------|--------|
| `default` | `--color-card-bg` | 1px `--color-card-border` | — |
| `secondary` | `--color-card-secondary-bg` | 1px `--color-card-secondary-border` | — |
| `elevated` | `--color-card-elevated-bg` | — | `--shadow-lg` |
| `outline` | transparent | 1px `--color-card-outline-border` | — |
| `demoted` | `--color-card-demoted-bg` | 1px `--color-card-demoted-border` | — |

---

## 4. Responsive geometry (global)

Card outer radius, content gutter (inner margin), and nested card radius are defined in `packages/tokens/src/tokens.css` and consumed by `packages/css/src/card.css`.

| Viewport | Range | Outer radius | Inner margin | Nested card radius | CTA shape |
|----------|-------|--------------|--------------|--------------------|-----------|
| Narrow | 320–768px (mobile + tablet) | **32px** | 12px | **12px** | Pill (`--radius-full`) |
| Wide | 769px+ (desktop) | **32px** | 16px | **16px** | Pill (`--radius-full`) |

Source tokens:

- `--radius-card-outer` — outer surface radius (32px at all breakpoints via `--radius-6xl`).
- `--radius-card-nested` — `CardInset` and any card-in-card (12px narrow / 16px wide).
- `--card-content-gutter` — default inner margin (12px narrow / 16px wide).

### Padding tiers

| Tier | CSS class | Value |
|------|-----------|-------|
| `none` | `.acko-card-pad-none` | `0` |
| `sm` | `.acko-card-pad-sm` | `--card-content-gutter - 4px` |
| `md` | `.acko-card-pad-md` | `--card-content-gutter` (canonical default) |
| `lg` | `.acko-card-pad-lg` | `--card-content-gutter + 8px` |

**Rules**

- The five variants **never** change geometry — only fill / border / shadow.
- A nested card or `CardInset` uses `--radius-card-nested` directly; do **not** apply the legacy `outer − padding` formula to cards.
- A pill CTA inside a card must not touch the card edge; the gutter provides the breathing room. Minimum card padding when a CTA is present: `pad-md`.
- `CardContent` has **no vertical padding** by default (`py-0`). Vertical spacing between content blocks should be handled by consumer layout utilities (e.g. `space-y-*`).

---

## 5. Accessibility

- Cards are `div` elements by default; they are **not** interactive landmarks.
- When a card is clickable, wrap the trigger in a `<button>` or `<a>` — do not put `onClick` on the card root unless `role="button"` and keyboard handling are added.
- Decorative images: `alt=""` or `aria-hidden` on pure decoration; meaningful `alt` when content-bearing.
- Colour contrast must meet WCAG 2.1 AA for all text-on-surface combinations in both light and dark themes.

---

## 6. Playground parity

Source: `CardPreview` / `CardUsage` in `apps/playground/src/App.tsx`.

**Playground URL:** append `?c=Card` to open the Card gallery directly (e.g. `http://localhost:5173/?c=Card`).

| Section | Intent |
|---------|--------|
| Card gallery (top) | Title, short copy, jump buttons (`Foundations` / `Media & regions` / `Reference layouts`) calling `scrollIntoView` on `#card-preview-*` |
| Foundations (`#card-preview-foundations`) | Variants, padding tiers, responsive padding |
| Media & regions (`#card-preview-media`) | Image strips, overlay, icon header, illustration row, CardInset, footer CTAs |
| Reference layouts (`#card-preview-reference`) | CardsLayout-style organisms |
| Breakpoint preview | Mobile (375px) / Tablet (768px) / Desktop (full width) tabs to preview responsive behaviour |

---

## 7. Implementation checklist

- [x] Five variants (`default`, `secondary`, `elevated`, `outline`, `demoted`); geometry constant across them.
- [x] Outer radius via `--radius-card-outer` (32px at all breakpoints); never hard-code pixel values.
- [x] Nested cards / `CardInset` use `--radius-card-nested` (12 / 16); legacy 20px formula does not apply.
- [x] `pad-md` is the canonical default and matches `--card-content-gutter` (12 / 16).
- [x] `CardContent` has no vertical padding (`py-0`).
- [ ] Footer aligns actions; full-width button respects nested radius rules in `global.md`.
- [ ] Decorative images: `alt=""` or `aria-hidden` on pure decoration; meaningful `alt` when content-bearing.
