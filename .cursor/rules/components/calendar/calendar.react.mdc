---
description: Calendar React implementation spec — props, behavior, accessibility
globs: "**/calendar*"
alwaysApply: false
---

# Calendar — React Implementation

## Package

`@acko/calendar` — `packages/calendar/src/Calendar.tsx`

## Directive

`"use client"` — interactive component with complex state management.

## Props Interface

```ts
interface DateRange {
  start: Date;
  end: Date;
}

interface CalendarProps {
  variant?: 'single' | 'range' | 'multi';  // default: 'single'
  display?: 'inline' | 'dropdown';          // default: 'dropdown'
  value: Date | DateRange | Date[];
  onChange: (value: Date | DateRange | Date[]) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;        // default: 'en-IN'
  className?: string;
}
```

## Component Pattern

```tsx
// Dropdown mode wraps panel in a wrapper + trigger
<div ref={ref} className={clsx('acko-cal-wrapper', className)} {...rest}>
  <button className={clsx('acko-cal-trigger', isOpen && 'acko-cal-trigger-open')}>…</button>
  {isOpen && <div className={clsx('acko-cal-panel', 'acko-cal-panel-dropdown')}>…</div>}
</div>

// Inline mode renders panel directly
<div ref={ref} className={clsx('acko-cal', className)} {...rest}>
  <div className="acko-cal-panel">…</div>
</div>
```

## Key Behaviors

1. **Single select**: Select one date, dropdown closes on selection
2. **Range select**: Two-click flow (start → end), with hover preview of range band
3. **Multi select**: Toggle dates on/off, dropdown stays open
4. **View drilling**: Click header label to switch days → months → years
5. **Year pagination**: 12-year pages with prev/next navigation
6. **Min/Max date**: Dates outside range are disabled
7. **Disabled dates**: Specific dates can be disabled via array
8. **Outside click**: Closes dropdown
9. **Escape key**: Returns to days view first, then closes dropdown
10. **Locale support**: `toLocaleDateString()` for localized month/day names

## View Modes

| Mode | Grid | Cell action |
|---|---|---|
| `days` | 7×6 day buttons | Select date |
| `months` | 3×4 month buttons | Set month, return to days |
| `years` | 3×4 year buttons | Set year, return to months |

## Trigger Display Format

| Variant | Format |
|---|---|
| `single` | `"2 Mar 2026"` |
| `range` | `"2 Mar — 15 Mar 2026"` or `"2 Mar"` (start only) |
| `multi` | `"3 dates selected"` |
| empty | `"Select date"` (placeholder) |

## Accessibility

- Panel: `role="grid"`, `aria-label` with current header label
- Days: `role="gridcell"`, `aria-selected`, `aria-current="date"` for today
- Weekdays: `role="columnheader"`
- Trigger: `aria-haspopup="dialog"`, `aria-expanded`
- Nav buttons: `aria-label="Previous"` / `"Next"`
- Header label: `aria-label="Select month"` / `"Select year"`
- Tab index: only current-month non-disabled days are focusable

## Icons

Inline SVGs only — no `lucide-react` dependency.

- Chevron left (18×18) for previous nav
- Chevron right (18×18) for next nav
- Calendar icon (18×18) for dropdown trigger

## Consumer Usage

```tsx
import '@acko/css/calendar.css';
import { Calendar } from '@acko/calendar';

// Inline calendar
<Calendar display="inline" value={date} onChange={setDate} />

// Dropdown with date range
<Calendar variant="range" value={range} onChange={setRange} />
```
