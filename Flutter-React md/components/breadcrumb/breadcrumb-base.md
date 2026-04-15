# Breadcrumb — Base specification (platform-agnostic)

> **Purpose:** Hierarchical navigation trail. **CSS:** `packages/css/src/breadcrumb.css`.

---

## 1. What it is

**Breadcrumb** renders **items** with labels; optional **href** on segments; optional **icon** on first item; custom **separator** (default chevron); **maxItems** collapses middle with ellipsis; optional **contained** styling in a raised surface (preview wraps in inline container).

---

## 2. Playground parity

Source: `BreadcrumbPreview` / `BreadcrumbUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Default | Home → Insurance → Car insurance |
| With icon | Home icon + segments |
| Custom separator `/` | Slash separators |
| Collapsed | 6 items → `maxItems={3}` |
| Contained | Inside raised bordered box |
| Usage | Card with policy title under trail |

---

## 3. Implementation checklist

- [ ] Current page not linked; focus styles for links.
- [ ] Ellipsis overflow matches CSS.
