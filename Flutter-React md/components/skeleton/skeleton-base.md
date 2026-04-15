# Skeleton — Base specification (platform-agnostic)

> **Purpose:** Loading placeholders — **text**, **circular**, **rounded** blocks; **wave** or pulse **animation**. **CSS:** `packages/css/src/skeleton.css`.

---

## 1. What it is

**Skeleton** mimics content layout with neutral shimmer; `lines` for multiline text; **width** / **height** overrides.

---

## 2. Playground parity

Source: `SkeletonPreview` / `SkeletonUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Text 3 lines | Stacked lines |
| Row layout | Circle + two text lines |
| Rounded block | Full width, fixed height, wave |
| Usage | Card loading: avatar + lines + block + buttons |

---

## 3. Implementation checklist

- [ ] `prefers-reduced-motion` respected.
- [ ] Border radius per variant.
