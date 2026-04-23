# Card — Base specification (platform-agnostic)

> **Purpose:** Surface containers for grouped content and actions. **CSS:** `packages/css/src/card.css`.

---

## 1. What it is

A **Card** provides elevation, outline, or flat surfaces with configurable **padding** and optional **header**, **content**, and **footer** regions for actions (e.g. buttons).

---

## 2. Properties (API contract)

| Concept | Description |
|---------|-------------|
| `variant` | `default`, `elevated`, `outline`, `demoted` |
| `padding` | `none`, `sm`, `md`, `lg` — inner padding scale (`none` + consumer breakpoints is a valid playground pattern) |
| Subcomponents | `CardHeader`, `CardContent`, `CardFooter`, `CardInset` — layout regions |

---

## 3. Playground parity

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

## 4. Implementation checklist

- [ ] Four variants; four padding steps including `none`.
- [ ] Footer aligns actions; full-width button respects nested radius rules in `global.md`.
- [ ] Decorative images: `alt=""` or `aria-hidden` on pure decoration; meaningful `alt` when content-bearing.
