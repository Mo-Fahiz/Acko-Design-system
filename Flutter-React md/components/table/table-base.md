# Table — Base specification (platform-agnostic)

> **Purpose:** Tabular data with **header**, **body**, **row**, **cell** primitives; optional **striped** and **hoverable**. **CSS:** `packages/css/src/table.css`.

---

## 1. What it is

**Table** composes `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` for semantic HTML table styling.

---

## 2. Playground parity

Source: `TablePreview` / `TableUsage` in `apps/playground/src/App.tsx`.

| Preview | Intent |
|---------|--------|
| Striped + hoverable | ID, Name, Status with Badge cells |
| Usage | Policies table + export button |

---

## 3. Implementation checklist

- [ ] Row hover and zebra striping per CSS.
- [ ] Header typography vs body.
