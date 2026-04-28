# Card — Base specification (platform-agnostic)

> **Purpose:** Surface containers for grouped content and actions. **CSS:** `packages/css/src/card.css`.

---

## 1. What it is

A **Card** provides a **default**, **elevated**, **outline**, or **demoted** surface with optional **header**, **content**, **footer**, and **inset** regions. Geometry (outer radius, inner margin, nested radius) is **global and responsive** — see §3 below — so all four variants look geometrically identical and only differ in fill / border / shadow.

---

## 2. Properties (API contract)

| Concept | Description |
|---------|-------------|
| `variant` | `default`, `secondary`, `elevated`, `outline`, `demoted` (geometry constant across all five) |
| `padding` | `none`, `sm`, `md`, `lg` — `md` matches the breakpoint gutter (`--card-content-gutter`); `sm` and `lg` are explicit overrides |
| Subcomponents | `CardHeader`, `CardContent`, `CardFooter`, `CardInset` — layout regions |

---

## 3. Responsive geometry (global)

Card outer radius, content gutter (inner margin), and nested card radius switch together at the device breakpoint. Defined in `packages/tokens/src/tokens.css` and consumed by `packages/css/src/card.css`.

| Viewport | Range | Outer radius | Inner margin | Nested card radius | CTA |
|----------|-------|--------------|--------------|--------------------|-----|
| Narrow | 320–768px (mobile + tablet) | **24px** | 12px | **12px** | Pill (`--radius-full`) |
| Wide | 769px+ (desktop) | **32px** | 16px | **16px** | Pill (`--radius-full`) |

Source tokens:

- `--radius-card-outer` — outer surface radius (24 narrow / 32 wide).
- `--radius-card-nested` — `CardInset` and any card-in-card (12 / 16).
- `--card-content-gutter` — default inner margin (12 / 16).

**Rules**

- The five variants (`default`, `secondary`, `elevated`, `outline`, `demoted`) **never** change geometry — only fill / border / shadow.
- A nested card or `CardInset` uses `--radius-card-nested` directly; do **not** apply the legacy `outer − padding` formula to cards.
- A pill CTA inside a card must not touch the card edge; the gutter provides the breathing room. Minimum card padding when a CTA is present: `pad-md`.

---

## 4. Playground parity

Source: `CardPreview` / `CardUsage` in `apps/playground/src/App.tsx`.

**Playground URL:** append `?c=Card` to open the Card gallery directly (e.g. `http://localhost:5173/?c=Card`). The centre preview panel uses `--color-card-bg` and `--shadow-lg` so it stays visually distinct from the `bg-surface` main column—do not use the same colour as the main column for the preview shell or the frame disappears.

| Section | Intent |
|---------|--------|
| Card gallery (top) | Title, short copy, jump buttons (`Foundations` / `Media & regions` / `Reference layouts`) calling `scrollIntoView` on `#card-preview-*`; page subtitle when Card is selected explains scrolling |
| Foundations (`#card-preview-foundations`) | Variants, padding tiers, responsive padding |
| Media & regions (`#card-preview-media`) | Image strips, overlay, icon header, illustration row, CardInset, footer CTAs |
| Reference layouts (`#card-preview-reference`) | CardsLayout-style organisms (see rows below) |
| Variants | Grid: default, elevated, outline, demoted with `padding="sm"` |
| Padding sizes | `sm`, `md`, `lg` on default variant |
| Responsive padding | `padding="none"` + inner `p-12 md:p-20 lg:p-24` (consumer / playground) |
| Image — top strip | `padding="none"`; hero `div` with `bg-cover bg-center`; content + footer below |
| Image — overlay | Full-bleed background + gradient; `Typography` `color="static"` on dark overlay |
| Icon header | `CardHeader` with leading icon circle + title; footer with icon button |
| Illustration | Filled `img` + Lucide row; demoted card with large `Sparkles` icon |
| CardInset | Nested inset panel with icon + labels inside elevated card |
| Footer CTAs | Dual actions; separate example with full-width primary |
| Event row | Date rail + time/PIN + secondary Apply |
| Social feed | `padding="none"`; padded header/content/footer; hero media; ghost actions (like / comment / save) |
| Profile compact | Narrow centered card: `Avatar` xl + Follow |
| Checklist CTA | `CardChecklistExample` — `CheckboxRow` list + full-width primary Continue |
| Media play | Full-bleed image + dark scrim + centered play control + `Typography` `color="static"` |
| Image + link footer | Tall media + footer row with link button |
| Nav row | Full-width button row: title + `ChevronRight` |
| Horizontal thumb | `padding="none"`; split column: image strip + body + ghost CTA |
| Brand-filled | `bg-primary` shell + `Typography` `color="invert"` + `Button` `variant="inverted"` |
| Facepile | Overlapping `Avatar`s + member copy + Invite |
| Search in card | `CardSearchFieldExample` — controlled `TextInput` + search icon |
| Rating row | Star row + `Badge` + title/body |
| Email capture | `CardEmailSignupExample` — mail lead-in + email field + Subscribe |
| Usage | Elevated plan card (header with Badge), outline row with emoji tile + Badge |

---

## 5. Implementation checklist

- [ ] Five variants (`default`, `secondary`, `elevated`, `outline`, `demoted`); geometry constant across them.
- [ ] Outer radius via `--radius-card-outer` (24 / 32 by breakpoint); never hard-code 20px.
- [ ] Nested cards / `CardInset` use `--radius-card-nested` (12 / 16); legacy 20px formula does not apply.
- [ ] `pad-md` is the canonical default and matches `--card-content-gutter` (12 / 16).
- [ ] Footer aligns actions; full-width button respects nested radius rules in `global.md`.
- [ ] Decorative images: `alt=""` or `aria-hidden` on pure decoration; meaningful `alt` when content-bearing.
