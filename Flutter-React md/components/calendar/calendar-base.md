# Calendar — Base specification (platform-agnostic)

> **Purpose:** Date picking — **single** day selection in preview. **CSS:** `packages/css/src/calendar.css`.

---

## 1. What it is

**Calendar** supports **variant** (e.g. single date), **display** mode **dropdown** (popover field + panel) or **inline** (always visible grid). **value** / **onChange** with optional **minDate**.

---

## 2. Playground parity

Source: `CalendarPreview` / `CalendarUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Dropdown | Single select, popover trigger |
| Inline | Grid always visible |
| Usage | Policy start date + minDate + confirm button |

---

## 3. Implementation checklist

- [ ] Keyboard date grid navigation.
- [ ] Selected day and today styles per tokens.
