# ACKO Composition Rules

How components combine into layouts, pages, and flows. These rules prevent AI from generating technically correct but structurally wrong UI.

---

## Core Principles

1. **One primary action per view.** Every page, modal, or step should have at most ONE primary button. All other actions use secondary, outline, or ghost variants.
2. **Mobile first.** ACKO users are predominantly on mobile (360px baseline). Design for small screens first, then enhance for larger viewports.
3. **Progressive disclosure.** Don't show everything at once. Use wizards for multi-step flows, accordions for optional details, and modals for confirmations.
4. **Proximity = relationship.** Related elements should be closer together than unrelated ones. Use the spacing scale intentionally.

---

## Layout Patterns

### Form Layout

Standard pattern for insurance forms (quotes, claims, profile):

```
┌─────────────────────────────────┐
│  Heading (heading-lg)           │
│  Subtext (body-md, muted)       │
│                                 │ ← space-8 (32px)
│  ┌─ Form Field ──────────────┐  │
│  │  Label                    │  │
│  │  [Input]                  │  │
│  │  Helper text              │  │
│  └───────────────────────────┘  │ ← space-5 (20px) between fields
│  ┌─ Form Field ──────────────┐  │
│  │  Label                    │  │
│  │  [Input]                  │  │
│  └───────────────────────────┘  │
│                                 │ ← space-8 (32px)
│  [Primary Button, full-width]   │
│  [Ghost link: "Back" or "Skip"] │
└─────────────────────────────────┘
```

**Rules:**
- `space-5` (20px) between form fields
- `space-8` (32px) between the heading block and form, and between form and actions
- Primary button should be full-width on mobile
- Always place secondary/back action below the primary, not next to it on mobile
- Group related fields (e.g., first name + last name) horizontally on desktop, stack on mobile

### Card Layout

For displaying information blocks (policy cards, plan options, claim status):

```
┌─ Card ─────────────────────────┐
│  ┌─ Card Header ─────────────┐ │ ← space-6 padding
│  │  [Badge]  Title           │ │
│  │  Subtitle (muted)         │ │
│  └───────────────────────────┘ │
│  ─── Divider (--color-border-subtle) ───── │
│  ┌─ Card Body ───────────────┐ │ ← space-6 padding
│  │  Content                  │ │
│  └───────────────────────────┘ │
│  ┌─ Card Footer ─────────────┐ │ ← space-4 padding, surface-raised bg
│  │  [Secondary Btn] [Primary]│ │
│  └───────────────────────────┘ │
└────────────────────────────────┘
```

**Rules:**
- Card padding: `space-6` (24px)
- Card border-radius: `radius-3xl` (16px)
- Card default: `--color-card-bg` fill + `--color-card-border` highlight edge (1px solid)
- Cards in a grid: `space-4` (16px) gap on mobile, `space-6` (24px) on desktop
- Never nest a card inside another card
- Footer buttons: right-aligned, primary on the right

**Nested radius rule (R2 = R1 + D):**

Any rectangular element placed inside a card must have its border-radius calculated as `R1 = R2 − D`, where R2 is the card's outer radius (16px) and D is the padding separating the outer edge from the inner element. Because ACKO card padding values (12–24px) meet or exceed the outer radius, all inner rectangular elements floor to `--radius-sm` (4px).

| Element | Apply? | Token |
|---------|--------|-------|
| Icon wrapper box | ✅ | `border-radius: var(--radius-inset-lg)` |
| Image thumbnail | ✅ | `border-radius: var(--radius-inset-lg)` |
| Inset info panel | ✅ | Use `<CardInset>` — applies it automatically |
| Badge, Button, Avatar | ❌ Exempt | Intentional pill / circular shape |

### Wizard/Flow Layout

For multi-step processes (insurance purchase, claim filing):

```
┌─────────────────────────────────┐
│  [NavigationWizard]             │ ← sticky on mobile
│─────────────────────────────────│
│                                 │ ← space-8
│  Step Content (form or info)    │
│                                 │ ← space-8
│─────────────────────────────────│
│  [Back: ghost]  [Next: primary] │ ← sticky bottom on mobile
└─────────────────────────────────┘
```

**Rules:**
- Wizard nav should be sticky at top on mobile
- Action bar should be sticky at bottom on mobile with `space-4` padding and a top border
- "Back" is always ghost/outline variant, "Next" is always primary
- Step content should scroll independently between the sticky header and footer
- Show step count in wizard — users need to know how many steps remain

### Marketing/Hero Layout

For landing pages, promotional sections:

```
┌─────────────────────────────────────────────┐
│                                             │
│  [Overline label: small, muted]             │ ← space-20 top padding
│  [Display heading: 2 lines max]             │ ← space-4 below overline
│  [Body text: 2 lines max, muted]            │ ← space-4 below heading
│  [Primary CTA]  [Ghost CTA]                 │ ← space-8 below body
│                                             │
│              [Illustration/Image]           │ ← right-aligned or below on mobile
│                                             │
└─────────────────────────────────────────────┘
```

**Rules:**
- Titles should never exceed 3 lines
- Use display typography — `display-md` or `display-lg`
- Maximum 2 CTAs in a hero (1 primary + 1 ghost/outline)
- Images/illustrations positioned right on desktop, below text on mobile
- Use Crocus Purple as primary accent on light backgrounds

---

## Component Combination Rules

### Do's

| Combination | Pattern |
|-------------|---------|
| Form field + error | TextInput with `state="error"` + `errorText` — error text appears directly below the field |
| Card + Badge | Badge inside card header to show status (Active, Pending, Expired) |
| Wizard + Form | Each wizard step contains one form section, with validation per step |
| Button pair | Primary + Secondary side by side. Primary on the right (LTR). |
| Radio card group | Use `variant="card"` Radio for plan/option selection in purchase flows |
| Calendar + Input | Calendar `display="dropdown"` attached to a TextInput for date fields |
| Table + Pagination | Pagination below the table, right-aligned on desktop, centered on mobile |

### Don'ts

| Anti-pattern | Why | Fix |
|-------------|-----|-----|
| Two primary buttons on one page | Confuses the user about what's most important | Make one secondary or outline |
| Ghost button as the main CTA | Too subtle, users miss it | Use primary for main actions |
| Badge inside a button | Breaks tap target and readability | Place badge next to the button |
| Card inside a card | Creates visual nesting confusion | Use a divider or section within the card |
| Same border-radius on a nested rectangular element as its parent card | Inner corners visually "poke out" — breaks geometric harmony | Apply `--radius-inset-lg` (4px) or use `<CardInset>` |
| Disabled button without explanation | User doesn't know why they can't proceed | Add helper text explaining what's needed |
| Text input without a label | Accessibility failure, placeholder is not a label | Always include a label |
| More than 5 wizard steps visible | Overwhelming — users abandon | Group into fewer high-level steps |
| Alert inside a modal | Two layers of attention-grabbing is jarring | Use inline error styling or text instead |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column, stacked elements, full-width buttons |
| Tablet | 640–1024px | Two columns where appropriate, side padding increases |
| Desktop | > 1024px | Max content width 1200px, centered, multi-column layouts |

### Mobile-Specific Rules

- All primary/secondary buttons become `fullWidth` below 640px
- Form fields stack vertically (never side-by-side on mobile)
- Navigation wizard switches from horizontal to compact variant
- Cards fill full width with `space-4` horizontal margin
- Modals become bottom sheets (slide up from bottom, full width)
- Touch targets minimum 44px height
- Hover-only interactions use `@media (hover: hover) and (pointer: fine)`

### Desktop Enhancements

- Form fields can sit side-by-side in 2-column grids
- Buttons can be inline (not full-width) 
- Cards arrange in 2 or 3 column grids
- Navigation wizard uses full horizontal variant with labels
- Modals are centered with max-width 560px

---

## Page Templates (ACKO-Specific)

### Motor Insurance Quote Flow

```
Step 1: Vehicle Details
  → TextInput (registration number)
  → Dropdown (vehicle make)
  → Dropdown (vehicle model)
  → Radio cards (fuel type)

Step 2: Personal Details
  → TextInput (full name)
  → TextInput (email)
  → TextInput (phone, type="tel")
  → Calendar dropdown (date of birth)

Step 3: Coverage Selection
  → Radio cards (plan options with price)
  → Checkbox group (add-ons)
  → Card (price summary)

Step 4: Review & Pay
  → Card (vehicle summary)
  → Card (coverage summary)
  → Card (price breakdown)
  → Primary button ("Pay ₹X,XXX")
```

### Claims Dashboard

```
Header:
  → Navbar with ACKO logo + user avatar
  
Content:
  → Heading ("Your claims")
  → Filter badges (All, Active, Resolved, Rejected)
  → Card list:
      Each card shows:
      → Badge (status: green/orange/pink)
      → Claim ID + date
      → Policy type + description
      → Ghost button ("View details")
  → Pagination (bottom)

Empty state:
  → Illustration
  → Heading ("No claims yet")
  → Body text (muted)
  → Primary button ("File a claim")
```

---

## Spacing Guidelines (Quick Reference)

| Between... | Spacing |
|-----------|---------|
| Label and input | `space-2` (8px) |
| Input and helper/error text | `space-2` (8px) |
| Form fields | `space-5` (20px) |
| Section heading and content | `space-8` (32px) |
| Cards in a grid | `space-4` (16px) mobile, `space-6` (24px) desktop |
| Page sections | `space-16` (64px) |
| Icon and adjacent text | `space-2` (8px) |
| Buttons in a group | `space-3` (12px) |
| Badge and adjacent text | `space-2` (8px) |
