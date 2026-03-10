---
description: NavigationWizard React implementation — props, variants, step management, accessibility
globs: "**/navigation-wizard/**,**/NavigationWizard/**"
---

# NavigationWizard — React

Package: `@acko/navigation-wizard`
Directive: `"use client"` (interactive — clickable steps)

## Props Interface

```typescript
interface WizardStep {
  label: string;
  description?: string;
  status?: 'upcoming' | 'current' | 'completed' | 'error';
}

interface NavigationWizardProps {
  steps: WizardStep[];
  currentStep: number;
  variant?: 'horizontal' | 'vertical' | 'compact';
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}
```

## Variants

### Horizontal (default)
- Steps arranged in a row with connectors between them
- Each step: circle above, label + description below
- Connectors align to vertical center of circle (margin-top: 13px for 28px circle)
- `onStepClick` enables clicking completed/current steps

### Vertical
- Steps stacked vertically
- Left column: circle + vertical connector line
- Right column: label + description
- Connector grows to fill space between steps (`flex: 1`)

### Compact
- Dot-based progress indicator
- Shows dots for each step, current step label, and "N of M" counter
- Current dot has ring highlight

## Step Status Resolution
If `step.status` is not provided, it's auto-resolved:
- `index < currentStep` → `completed`
- `index === currentStep` → `current`
- `index > currentStep` → `upcoming`

## Accessibility

- Wraps in `<nav aria-label="Progress">`
- Steps rendered as `<ol>` list items
- Circle is a `<button>` with `aria-label="Step N: Label"`
- Active step: `aria-current="step"`
- Disabled buttons for non-clickable steps

## Icons
- Completed: inline SVG checkmark (16×16)
- Error: inline SVG alert icon (14×14)
- Upcoming/Current: step number

## Exports

```typescript
export { NavigationWizard } from './NavigationWizard';
export type { NavigationWizardProps, WizardStep } from './NavigationWizard';
```
