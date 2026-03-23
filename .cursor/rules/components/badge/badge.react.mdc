---
description: Badge React implementation — props, behavior, accessibility
globs: "**/badge/**,**/Badge/**"
---

# Badge — React

Package: `@acko/badge`
Directive: None (presentational)

## Props Interface

```typescript
type BadgeTextCase = 'uppercase' | 'sentence';

interface BadgeProps {
  variant?: 'solid' | 'outline' | 'dot';
  color?: 'purple' | 'green' | 'blue' | 'orange' | 'pink' | 'gray';
  textCase?: BadgeTextCase;  // default: 'uppercase'
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  children: ReactNode;
}

interface CounterBadgeProps {
  count: number;
  max?: number;
  color?: 'purple' | 'pink' | 'blue';
  className?: string;
}
```

## Component Pattern

Zero Tailwind utilities. Pure `clsx` class composition:
- `acko-badge`, `acko-badge-{variant}-{color}`, text case class

Text case mapping:
- `uppercase` → `acko-badge-uppercase` (default)
- `sentence` → `acko-badge-sentence-case`

## Sizing

No `size` prop. Badge sizing is **responsive via CSS** — handled automatically:
- Mobile (< 768px): `md` sizing (12px font, `6px 8px` padding)
- Desktop (768px+): `lg` sizing (14px font, `6px 8px` padding)

All badges on a page are the same size at any viewport. Developers and AI never choose a size.

## Text Case Selection

| Content type | `textCase` | Example |
|---|---|---|
| Status label (1–2 words) | `uppercase` | `ACTIVE`, `PENDING`, `EXPIRED` |
| Emphasis tag | `uppercase` | `NEW`, `FREE`, `PRO`, `BETA` |
| Category tag | `uppercase` | `HEALTH`, `AUTO`, `TRAVEL` |
| Acronym | `uppercase` | `KYC`, `OTP`, `IDV` |
| Descriptive phrase | `sentence` | `Zero depreciation` |
| Multi-word label | `sentence` | `2 days left`, `Cashless available` |
| Feature callout | `sentence` | `Limited offer` |

**Decision rule:** Short status/tag words → `uppercase`. Natural language phrase → `sentence`. When uncertain, use `uppercase` (the default).

## Exports

```typescript
export { Badge } from './Badge';
export type { BadgeProps, BadgeTextCase } from './Badge';
export { CounterBadge } from './Badge';
export type { CounterBadgeProps } from './Badge';
```
