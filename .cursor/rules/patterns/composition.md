---
description: Layout patterns, component combination rules, and page templates
---

# Composition Patterns

Rules for how components combine into layouts. Prevents structurally wrong UI.

## Core Principles

1. **One primary action per view** — at most ONE primary button per page/modal/step
2. **Mobile first** — 360px baseline, enhance for larger viewports
3. **Progressive disclosure** — wizards for multi-step, accordions for optional details
4. **Proximity = relationship** — related elements closer together

## Layout Patterns

### Form Layout
- `20px` between form fields
- `32px` between heading block and form, and between form and actions
- Primary button full-width on mobile
- Secondary/back action below primary on mobile, not beside it

### Card Layout
- Card padding: `24px` default
- Card gap in grid: `16px` mobile, `24px` desktop
- Footer buttons: right-aligned, primary on the right
- Never nest a card inside another card

### Wizard Layout
- Wizard nav sticky at top on mobile
- Action bar sticky at bottom with top border
- "Back" = ghost/outline, "Next" = primary
- Max 5 visible steps

## Component Combination Rules

### Do
| Combination | Pattern |
|-------------|---------|
| Form field + error | TextInput `state="error"` + `errorText` |
| Card + Badge | Badge inside CardHeader for status |
| Wizard + Form | One form section per step, validate per step |
| Button pair | Primary + Secondary side by side, primary on right |
| Calendar + Input | Calendar `display="dropdown"` for date fields |
| Table + Pagination | Pagination below table, right-aligned desktop |

### Don't
| Anti-pattern | Fix |
|-------------|-----|
| Two primary buttons on one page | Make one secondary/outline |
| Ghost button as main CTA | Use primary for main actions |
| Badge inside a button | Place badge next to button |
| Card inside a card | Use divider or section within card |
| Same radius on nested rect as parent card | Use `--radius-inset-lg` (4px) |
| Disabled button without explanation | Add helper text |
| Text input without label | Always include label |
| Alert inside modal | Use inline error styling |

## Spacing Quick Reference

| Between | Spacing |
|---------|---------|
| Label → input | `8px` (`gap-8`) |
| Input → helper/error | `8px` (`gap-8`) |
| Form fields | `20px` (`gap-20`) |
| Section heading → content | `32px` (`gap-32`) |
| Cards in grid | `16px` / `24px` |
| Page sections | `64px` (`gap-64`) |
| Buttons in group | `12px` (`gap-12`) |
