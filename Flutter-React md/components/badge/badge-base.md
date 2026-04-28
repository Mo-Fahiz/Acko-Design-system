# Badge — Base specification (platform-agnostic)

> **Purpose:** Visual and behavioral contract for **Badge** and **CounterBadge**. React and Flutter implement without pixel drift.
>
> **Where to go next:** [`react/badge-react.md`](./react/badge-react.md), [`flutter/badge-flutter.md`](./flutter/badge-flutter.md), [`.cursor/rules/components/badge/badge.styles.md`](../../../.cursor/rules/components/badge/badge.styles.md). CSS: `packages/css/src/badge.css`.

---

## 1. What it is

A **Badge** is a compact label for status, categories, or counts. Variants include **solid** fill, **outline**, and **dot** (leading status dot). **CounterBadge** shows a numeric count with overflow rules.

---

## 2. Properties (API contract)

| Concept | Description |
|---------|-------------|
| `variant` | `solid` (default), `outline`, `dot` |
| `color` | Semantic color role: `purple`, `green`, `blue`, `orange`, `pink`, `gray` |
| `textCase` | `uppercase` (default for marketing emphasis) or `sentence` per content rules |
| `removable` | Optional dismiss with callback (Badge only) |
| CounterBadge: `count`, `max` | Number display; `max` caps display (e.g. 99+) |

---

## 3. Structure

Inline pill-shaped element; optional leading dot for `dot` variant; removable adds trailing dismiss control.

---

## 4. States & motion

Static component; removable hover/active per design. Typography size may follow **responsive** intent (caption vs body-sm) when consumer passes `style` — see playground mobile vs desktop.

---

## 5. Token quick-reference

Use semantic tokens from `Flutter-React md/global.md` — badge maps `color` prop to badge semantic fills and borders in CSS.

---

## 6. Playground parity

Source: `BadgePreview` / `BadgeUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Mobile (&lt; 768px) | Badges with caption-sized padding/font |
| Desktop (768px+) | Badges with body-sm-sized padding/font |
| Solid — ALL CAPS | Six colors, `textCase="uppercase"` |
| Outline — uppercase | Same colors, `variant="outline"` |
| Text case variants | `uppercase` vs `sentence` |
| Dot & removable | Dot per color + removable badge |
| Counter badges | Count 3, 42, 150 with `max={99}` |
| Usage | Notifications card with `CounterBadge` + dot badges in list |

---

## 7. Implementation checklist

- [ ] Solid, outline, dot variants; six color roles.
- [ ] `textCase` uppercase vs sentence.
- [ ] CounterBadge overflow when `max` set.
- [ ] Removable interaction when specified.
