# Separator — Base specification (platform-agnostic)

> **Purpose:** Horizontal or vertical divider; optional **label** (e.g. “OR”). **CSS:** `packages/css/src/separator.css`.

---

## 1. What it is

**Separator** draws a 1px (hairline) rule using border semantic tokens; **vertical** orientation for inline layouts.

---

## 2. Playground parity

Source: `SeparatorPreview` / `SeparatorUsage` in `apps/playground/src/App.tsx`.

| Row | Intent |
|-----|--------|
| Default | Full-width horizontal |
| With label | “OR” centered |
| Vertical | Between Left / Right text |
| Usage | OAuth vs email split |

---

## 3. Implementation checklist

- [ ] `orientation` horizontal vs vertical.
- [ ] Label variant uses flex + line caps per CSS.
