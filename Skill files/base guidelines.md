---
name: acko-design-system
description: ACKO Insurance design system. AI reads this file first, then follows the instruction chain to generate consistent, on-brand UI.
metadata:
  author: ACKO Design Team
  version: "3.0.0"
  last_updated: "2026-02-10"
---

# ACKO Design System — Master Skill

This is the entry point for AI-assisted UI generation at ACKO. Read this file first, then follow the chain below before writing any code.

---

## Read Order (mandatory)

Before generating ANY component, page, or layout:

1. **Read** `skills/primitives.md` — design tokens, typography, spacing, assets
2. **Read** `skills/semantics.md` — semantic color mappings and visual personality
3. **Read** `skills/components.md` — component APIs, props, variants, sizes, states
4. **Read** `skills/composition.md` — layout patterns, page templates, do's and don'ts
5. **Verify against** `skills/accessibility.md` — a11y checklist before finalizing

Skip none of these. The order matters — primitives define the raw values, semantics map them to intent, components consume them, composition arranges them, and accessibility validates them.

---

## Active Theme

```
File: skills/themes/acko-light.md
```

To switch themes, change the file path above. Available themes:
- `skills/themes/acko-light.md` — Default ACKO brand (light)
- `skills/themes/acko-dark.md` — Dark mode variant

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Components | React 18+ with TypeScript |
| Styling | CSS Modules with CSS custom properties (design tokens) |
| Icons | Lucide React (UI icons) + custom SVGs (product icons) |
| Font | Euclid Circular B (CDN-hosted, see primitives.md) |
| Animation | CSS transitions + framer-motion for complex sequences |

---

## Code Conventions

### File naming
- Components: `PascalCase.tsx` (e.g., `Button.tsx`, `TextInput.tsx`)
- Styles: `PascalCase.module.css` (e.g., `Button.module.css`)
- Tokens: `tokens.css` (global), `tokens.ts` (JS export)
- Tests: `PascalCase.test.tsx`

### Component structure
```
src/components/
├── Button/
│   ├── Button.tsx           ← component logic
│   ├── Button.module.css    ← scoped styles
│   ├── Button.test.tsx      ← tests
│   └── index.ts             ← barrel export
├── TextInput/
│   └── ...
└── index.ts                 ← barrel export all components
```

### Export pattern
```tsx
// Every component uses named + default export
export interface ButtonProps { ... }
export const Button: React.FC<ButtonProps> = (props) => { ... }
export default Button;
```

### Import pattern
```tsx
// Consumer code
import { Button, TextInput, Badge } from '@acko/design-system';
```

---

## Asset Locations

| Asset Type | Location | Usage |
|-----------|----------|-------|
| ACKO logos | CDN URLs (listed in primitives.md) | Direct `<img>` or background |
| UI icons | `lucide-react` package | `<Icon name="shield" />` |
| Product icons | `/public/assets/icons/` | Insurance-specific (car, health, bike) |
| Illustrations | `/public/assets/illustrations/` | Marketing, empty states |

---

## Rules for AI

1. **Never invent token values.** Every color, spacing, font-size, and border-radius must come from the token system. If a value isn't defined, flag it — don't guess.
2. **Never mix themes.** Use only the active theme's semantic tokens. Don't reference primitive tokens directly in components.
3. **One primary action per view.** A page or modal should have at most one Primary button.
4. **Mobile-first.** ACKO's users are predominantly mobile. Build for 360px width first, then scale up.
5. **Sentence case everywhere.** Buttons, labels, headings, navigation — all sentence case. Never UPPERCASE except the `overline` typography style.
6. **Accessibility is not optional.** Every component must pass the checklist in accessibility.md before being considered complete.
7. **Apply the nested radius rule.** Any rectangular element (icon box, image thumbnail, inset panel) placed inside a rounded container must use `R1 = R2 − D` for its border-radius — never the same radius as its parent. In ACKO cards this always resolves to `--radius-inset-lg` (4px). Use `<CardInset>` for inset panels — it applies the correct radius automatically. Pill-shaped elements (badges, buttons, avatars) are exempt.
8. **Use inverted context on dark backgrounds.** When a section, card, or banner in the light theme uses a dark fill (e.g. `purple-600`, `grey-700`, any background with luminance < 50%), wrap its content with `data-context="inverted"`. This remaps text, border, and surface tokens to maintain WCAG AA contrast. Use the `inverted` button variant for CTAs. Typography should appear as white/light grey. Never put default light-theme components on a dark background without the inverted context.
