# Navigation wizard — Base specification (platform-agnostic)

> **Purpose:** Multi-step progress UI — **horizontal**, **vertical**, and **compact** layouts. **CSS:** `packages/css/src/navigation-wizard.css`.

---

## 1. What it is

**NavigationWizard** shows **steps** (label + optional description), **currentStep** index, optional **onStepClick** for horizontal navigation. **variant**: default horizontal, **vertical**, **compact**.

---

## 2. Playground parity

Source: `NavigationWizardPreview` / `NavigationWizardUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Horizontal | 4 steps + Back/Next |
| Vertical | 4 steps, current fixed at 2 |
| Compact | Dense step indicators |
| Usage | Card with 4 steps at step 3 |

---

## 3. Implementation checklist

- [ ] Completed vs upcoming step colors per CSS.
- [ ] Compact variant spacing.
