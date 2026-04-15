# Pagination — Base specification (platform-agnostic)

> **Purpose:** Page navigation for long lists. **CSS:** `packages/css/src/pagination.css`.

---

## 1. What it is

**Pagination** shows **numbered** or **simple** (prev/next) UI; **totalPages**, **currentPage**, **onPageChange**; optional **showInfo**.

---

## 2. Playground parity

Source: `PaginationPreview` / `PaginationUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Numbered | `showInfo`, page 3 of 20 |
| Simple | `variant="simple"` |
| Usage | Search results copy + pagination |

---

## 3. Implementation checklist

- [ ] Previous/next disabled at bounds.
- [ ] Arrow vs chevron per iconography rules.
