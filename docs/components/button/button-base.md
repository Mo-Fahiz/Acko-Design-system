# Button — Base specification (platform-agnostic)

> **Purpose:** The **visual and behavioral contract** for Button. Every platform must match this document; React and Flutter only add **how** to implement it (no pixel or token changes).
>
> **Where to go next:** `react/button-react.md` (web), `flutter/button-flutter.md` (Flutter), `.cursor/rules/components/button/button.style.mdc` (CSS class matrix for this repo).

---

## Table of contents

1. [What is it](#1-what-is-it)
2. [Properties (API contract)](#2-properties-api-contract)
3. [Variants](#3-variants)
4. [Sizes](#4-sizes)
5. [Icon slots](#5-icon-slots)
6. [States](#6-states)
7. [Loading indicator](#7-loading-indicator)
8. [Hover behavior](#8-hover-behavior)
9. [Active / pressed behavior](#9-active--pressed-behavior)
10. [Focus behavior](#10-focus-behavior)
11. [Disabled behavior](#11-disabled-behavior)
12. [Dark theme adjustments](#12-dark-theme-adjustments)
13. [Transitions and motion](#13-transitions-and-motion)
14. [Full width mode](#14-full-width-mode)
15. [DOM / widget structure](#15-dom--widget-structure)
16. [Accessibility](#16-accessibility)
17. [Content rules](#17-content-rules)
18. [Responsive guidance](#18-responsive-guidance)
19. [Token quick-reference](#19-token-quick-reference)
20. [Implementation checklist](#20-implementation-checklist)

---

## 1. What is it

A **Button** is the primary interactive control for triggering actions: submitting forms, navigating forward, confirming choices, or performing destructive operations. It is always a tappable/clickable region with a text label and optional icons.

---

## 2. Properties (API contract)

Every platform implementation must expose these properties (using idiomatic naming for that platform):

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| `variant` | enum: `primary`, `secondary`, `inverted`, `ghost`, `link`, `danger` | — | **Yes** | Visual intent of the button. |
| `size` | enum: `xs`, `sm`, `md`, `lg`, `xl` | `md` | No | Controls height, padding, font size, icon size. |
| `disabled` | boolean | `false` | No | Prevents interaction. |
| `loading` | boolean | `false` | No | Shows loading indicator and prevents interaction. |
| `iconLeft` | icon element | none | No | Icon rendered before the label. |
| `iconRight` | icon element | none | No | Icon rendered after the label. |
| `iconOnly` | boolean | `false` | No | Renders icon-only with the label hidden visually but available to assistive tech. |
| `fullWidth` | boolean | `false` | No | Stretches the button to fill its parent's width. |
| `type` | enum: `button`, `submit`, `reset` | `button` | No | Semantic type (relevant on web; ignored on mobile). |
| `children` / `label` | text or element | — | **Yes** | The visible label (or accessible label when `iconOnly`). |
| `className` / `style` | platform-native | — | No | Escape hatch for consumer overrides (merged last). |

**Stateless:** The button holds no internal state. `disabled` and `loading` are controlled externally.

---

## 3. Variants

Each variant defines a **fill**, **text color**, **border/shadow**, and **hover treatment** combination.

### 3.1 Primary

The main call-to-action. Use sparingly — ideally one per logical group.

| Property | Token |
|----------|-------|
| Fill | `color-primary` |
| Text | `color-on-primary` |
| Inner shadow | `shadow-btn-inner` |

### 3.2 Secondary

Lower-emphasis positive action.

| Property | Token |
|----------|-------|
| Fill | `color-btn-secondary-bg` |
| Text | `color-btn-secondary-text` |
| Border | 1px inset stroke using `color-btn-secondary-border` |

### 3.3 Inverted

For use on dark or brand-heavy backgrounds.

| Property | Token |
|----------|-------|
| Fill | `color-btn-inverted-bg` |
| Text | `color-btn-inverted-text` |
| Border/shadow | None |

### 3.4 Ghost

Low-emphasis, toolbar-style actions.

| Property | Token |
|----------|-------|
| Fill | Transparent |
| Text | `color-btn-ghost-color` |
| Border/shadow | None |

### 3.5 Link

Looks like a text link — minimal chrome.

| Property | Token |
|----------|-------|
| Fill | Transparent |
| Text | `color-btn-link-color` |
| Border/shadow | None |
| Padding | **No horizontal padding** (left and right padding are 0) |

### 3.6 Danger

Destructive or irreversible actions.

| Property | Token |
|----------|-------|
| Fill | `color-btn-danger-bg` |
| Text | `color-btn-danger-text` |
| Border/shadow | None |
| Focus ring | 3px ring using `color-error` at 20% opacity (instead of the standard primary ring) |

---

## 4. Sizes

### Dimensions

| Size | Height | Horizontal padding | Font size | Line height | Border radius |
|------|--------|-------------------|-----------|-------------|---------------|
| `xs` | 32px | 16px | 12px | 16px | pill (9999px) |
| `sm` | 40px | 16px | 14px | 18px | pill |
| `md` | 48px | 16px | 16px | 24px | pill |
| `lg` | 56px | 24px | 18px | 28px | pill |
| `xl` | 64px | 32px | 20px | 32px | pill |

Font weight for all sizes: **Medium 500**.

### Icon dimensions (within icon slots)

| Size | Icon width × height |
|------|---------------------|
| `xs` | 12 × 12px |
| `sm` | 16 × 16px |
| `md` | 16 × 16px |
| `lg` | 24 × 24px |
| `xl` | 32 × 32px |

### Icon-only mode dimensions

When `iconOnly` is true, the button becomes a **square** (width equals height) with **zero** padding:

| Size | Width × Height |
|------|----------------|
| `xs` | 32 × 32px |
| `sm` | 40 × 40px |
| `md` | 48 × 48px |
| `lg` | 56 × 56px |
| `xl` | 64 × 64px |

### Gap between elements

The gap between icon slots and the label is **8px**, always.

---

## 5. Icon slots

### Placement rules

| Slot | Position | Meaning | Example |
|------|----------|---------|---------|
| `iconLeft` | Before the label | Reinforces *what* the action is | Trash icon on "Delete" |
| `iconRight` | After the label | Indicates *direction* | ArrowRight on "Continue" |

### Icon library

Use **Lucide** icons exclusively. See `global.md` → Iconography for the arrow-vs-chevron decision rule.

### Icon rendering rules

- Icons must inherit text color from the button (equivalent of `currentColor`).
- Icon sizing is controlled by the button's size tier (see table above) — do **not** manually set icon dimensions inside the button.
- Icons are **decorative** — they must be hidden from assistive technology. The label carries the meaning.

### Icon-only mode

When `iconOnly` is true:

- The label text is **visually hidden** but **remains in the accessibility tree** (screen reader can still read it).
- The button is rendered as a square (see dimensions above).
- A tooltip showing the label is recommended for pointer users.

---

## 6. States

Every button can be in exactly one of these states at any time:

| State | Trigger | Visual change | Interactive? |
|-------|---------|---------------|-------------|
| **Default** | No interaction | Resting appearance per variant | Yes |
| **Hover** | Pointer hovers (pointer devices only) | See [section 8](#8-hover-behavior) | Yes |
| **Active / Pressed** | Pointer down or touch | See [section 9](#9-active--pressed-behavior) | Yes (momentary) |
| **Focused** | Keyboard / assistive nav reaches the button | See [section 10](#10-focus-behavior) | Yes |
| **Loading** | `loading` prop is true | See [section 7](#7-loading-indicator) | **No** |
| **Disabled** | `disabled` prop is true (or `loading` is true) | See [section 11](#11-disabled-behavior) | **No** |

**Priority:** `disabled` and `loading` override all interactive states. When `loading` is true, the button is implicitly disabled.

---

## 7. Loading indicator

### What happens

1. The button label and icons become **invisible** (hidden, not removed — the button keeps its size).
2. A **three-dot wave animation** appears centered in the button.
3. The button becomes **non-interactive** (no click, no hover, no focus activation).
4. Assistive technology is told the button is **busy**.

### Dot specification

| Property | Value |
|----------|-------|
| Number of dots | 3 |
| Dot diameter | 6px |
| Dot shape | Circle |
| Gap between dots | 4px |
| Dot color | Matches the variant's **text color** (see table below) |

**Dot color per variant:**

| Variant | Dot color token |
|---------|-----------------|
| primary | `color-on-primary` |
| secondary | `color-btn-secondary-text` |
| inverted | `color-btn-inverted-text` |
| ghost | `color-btn-ghost-color` |
| link | `color-btn-link-color` |
| danger | `color-btn-danger-text` |

### Dot animation: `dot-wave`

Each dot animates **vertically** in a wave pattern with staggered delays:

| Property | Value |
|----------|-------|
| Animation name | dot-wave |
| Duration | 1.2s |
| Easing | ease-in-out |
| Iteration | Infinite |
| Keyframes | At 0% and 100%: translateY(0), opacity 0.4. At 30%: translateY(−6px), opacity 1. At 60%: translateY(0), opacity 0.4. |
| Dot 1 delay | 0s |
| Dot 2 delay | 0.15s |
| Dot 3 delay | 0.3s |

### Accessibility during loading

- The button must announce "busy" to assistive tech (web: `aria-busy="true"`; mobile: semantic equivalent).
- A visually hidden text "Loading, please wait" must be present for screen readers.

---

## 8. Hover behavior

Hover effects apply **only on devices that support hover** (pointer devices with fine precision). On touch-only devices, hover states must **not** activate.

| Variant | Light theme hover | Dark theme hover |
|---------|-------------------|------------------|
| **primary** | Dark overlay gradient (rgba(0,0,0,0.08) over fill) + compound shadow (`shadow-btn-inner` + `shadow-btn-hover`) | Flat fill swap to `color-btn-primary-hover-bg` (no gradient) + same compound shadow |
| **secondary** | Brightness filter: 96% (slight darken) + retain 1px inset border | Brightness filter: 110% (slight lighten) |
| **inverted** | Brightness filter: 96% | Brightness filter: 90% |
| **ghost** | Fill changes to `color-btn-ghost-hover-bg` | Fill changes to `color-btn-ghost-hover-bg` |
| **link** | Text underline appears (no background change) | Text underline appears |
| **danger** | Brightness filter: 96% | Brightness filter: 110% |

**Never** apply hover when the button is disabled.

---

## 9. Active / pressed behavior

When the user presses down (mouse-down, touch-start, or equivalent):

| Property | Value |
|----------|-------|
| Transform | Scale to **0.97** (shrink slightly) |
| Duration | Governed by the 100ms transform transition |
| Condition | Only when **not disabled** |

On release, the button springs back to scale 1.0.

Disabled buttons must **not** scale on press.

---

## 10. Focus behavior

Focus indicators appear when the button receives focus through **keyboard navigation or assistive technology** — not on pointer click.

### Standard focus ring (all variants except danger and secondary)

| Property | Value |
|----------|-------|
| Style | 3px solid ring around the button |
| Color | `color-primary-ring` |
| Outline | None (the ring is rendered as a box-shadow, not an outline) |

### Secondary focus

Secondary adds a **compound** indicator: the existing 1px inset border **plus** the 3px focus ring outside.

### Danger focus

Danger uses a different ring color: 3px ring using `color-error` at **20% opacity** instead of the primary ring.

---

## 11. Disabled behavior

When `disabled` is true (or `loading` is true, which implies disabled):

| Property | Value |
|----------|-------|
| Fill | `color-btn-disabled-bg` (overrides variant fill) |
| Text | `color-btn-disabled-text` (overrides variant text) |
| Shadow | None (all shadows removed) |
| Opacity | **1.0** (do not dim — the muted colors are sufficient) |
| Filter | None (no brightness adjustments) |
| Cursor | Not-allowed (web) / non-tappable (mobile) |
| Pointer events | None (no click, no hover) |
| Press scale | None (no transform on press) |

**Exception:** The `link` variant keeps a **transparent** background when disabled (not the disabled-bg token).

---

## 12. Dark theme adjustments

When the active theme is **dark**, semantic tokens automatically remap. The button implementation does not need conditional logic — it reads the same token names and the values change.

Key differences to be aware of when verifying:

| Variant | What changes in dark |
|---------|----------------------|
| primary | Fill becomes `color-primary` (dark value: purple-500); hover is flat fill (`color-btn-primary-hover-bg`), not gradient overlay |
| secondary | Fill, border, and text all remap to darker equivalents; hover brightens (+10%) instead of darkening |
| inverted | Fill and text remap; hover darkens to 90% brightness (not 96%) |
| ghost | Text remaps; hover bg remaps |
| link | Text remaps |
| danger | Fill and text remap; hover brightens (+10%) |
| disabled | bg and text remap to dark disabled tokens |

Shadows also remap: `shadow-btn-inner` and `shadow-btn-hover` use heavier values in dark to stay visible on dark surfaces.

---

## 13. Transitions and motion

### Transition properties

All buttons animate the following properties on state change:

| Property | Duration | Easing |
|----------|----------|--------|
| Background color | 150ms | ease |
| Text color | 150ms | ease |
| Border color | 150ms | ease |
| Transform (scale) | 100ms | ease |
| Box shadow | 150ms | ease |

### Loading animation

See [section 7](#7-loading-indicator) for the dot-wave keyframe specification.

### Reduced motion

When the user has requested reduced motion (system preference), all animations should be suppressed or replaced with instant state changes. The dot-wave can be replaced with a static "..." or a single pulsing dot.

---

## 14. Full width mode

When `fullWidth` is true, the button stretches to **100% of its parent's width**. All other properties (height, padding, font, radius, variant styling) remain unchanged.

---

## 15. DOM / widget structure

The internal structure must follow this hierarchy for correct styling and accessibility. Platform implementations should mirror this tree:

```
[button element]                           ← root interactive element
  ├── [content wrapper]                    ← inline-flex container, 8px gap, centers children
  │   ├── [icon-left wrapper]?             ← if iconLeft is provided; decorative (hidden from a11y)
  │   │   └── {icon element}
  │   ├── [label]                          ← visible text (or visually-hidden if iconOnly)
  │   └── [icon-right wrapper]?            ← if iconRight is provided; decorative
  │       └── {icon element}
  ├── [loading dots container]?            ← if loading; absolutely positioned, centered
  │   ├── [dot 1]
  │   ├── [dot 2]
  │   └── [dot 3]
  └── [loading screen-reader text]?        ← if loading; visually hidden, "Loading, please wait"
```

### When loading is true

- The **content wrapper** remains in the DOM but is **visually hidden** (invisible, not display:none — so the button keeps its dimensions).
- The **loading dots container** is absolutely positioned on top, centered.

### When iconOnly is true

- The **label** is present in the accessibility tree but **visually hidden** (equivalent of `sr-only` / offscreen text).
- Only the icon is visible.

---

## 16. Accessibility

### Minimum requirements

| Requirement | Detail |
|-------------|--------|
| **Semantic element** | Must be a native button (or the platform's equivalent semantic control). Not a styled div/span. |
| **Keyboard activation** | Enter and Space must trigger the button's action. |
| **Focus indicator** | Visible focus ring when navigated via keyboard (see section 10). |
| **Busy state** | When `loading` is true: announce busy to assistive tech + provide hidden "Loading, please wait" text. |
| **Disabled state** | When `disabled` or `loading`: element must not be activatable. Assistive tech should report it as disabled. |
| **Icon-only accessible name** | When `iconOnly` is true: the label text must still be available to screen readers (visually hidden, not removed). |
| **Decorative icons hidden** | Icon wrappers must be hidden from assistive tech (web: `aria-hidden="true"`; mobile: exclude from semantics). |
| **Touch target** | Minimum 44px effective tap height on touch devices. `xs` (32px) is only for pointer-dense desktop UIs. |

---

## 17. Content rules

### Sentence case

All button labels follow **sentence case**: capitalize only the first word and proper nouns.

| Correct | Incorrect |
|---------|-----------|
| `Get a quote` | `Get A Quote` |
| `Continue to payment` | `Continue To Payment` |
| `Check IDV` | `Check Idv` |
| `Pay with ACKO Drive` | `Pay With Acko Drive` |

**Exceptions:** Brand names (`ACKO`), acronyms (`IDV`, `NCB`, `OTP`), proper nouns (city names, `Aadhaar`), and regulatory bodies (`IRDAI`) retain their defined casing.

**All-caps emphasis** (`FREE`, `NEW`) must **not** appear in button labels. Use a Badge component for that.

### Label guidance

- Labels should be concise action phrases: "Get a quote", "Continue", "Delete account".
- Do not rely on color alone for the danger intent — the label must explicitly communicate the destructive nature.

---

## 18. Responsive guidance

- On narrow viewports (below ~640px): use `fullWidth` for primary and secondary CTAs so they span the screen.
- `xs` (32px height) does **not** meet the 44px touch-target minimum — use it only in dense desktop UIs.
- On touch-only devices: hover states do not apply (see section 8).

---

## 19. Token quick-reference

Every token the button uses, collected in one place. Light and dark values can be looked up in `global.md` → Color — Semantics.

### Fill tokens

| Variant | Fill token | Hover fill (light) | Hover fill (dark) |
|---------|-----------|-------------------|------------------|
| primary | `color-primary` | same + dark overlay gradient | `color-btn-primary-hover-bg` |
| secondary | `color-btn-secondary-bg` | same + brightness(0.96) | same + brightness(1.1) |
| inverted | `color-btn-inverted-bg` | brightness(0.96) | brightness(0.9) |
| ghost | transparent | `color-btn-ghost-hover-bg` | `color-btn-ghost-hover-bg` |
| link | transparent | transparent (underline only) | transparent (underline only) |
| danger | `color-btn-danger-bg` | brightness(0.96) | brightness(1.1) |
| disabled (all) | `color-btn-disabled-bg` | — | — |

### Text tokens

| Variant | Text token |
|---------|-----------|
| primary | `color-on-primary` |
| secondary | `color-btn-secondary-text` |
| inverted | `color-btn-inverted-text` |
| ghost | `color-btn-ghost-color` |
| link | `color-btn-link-color` |
| danger | `color-btn-danger-text` |
| disabled (all) | `color-btn-disabled-text` |

### Border / Shadow tokens

| Variant | Shadow or border |
|---------|-----------------|
| primary | `shadow-btn-inner` |
| primary (hover) | `shadow-btn-inner` + `shadow-btn-hover` |
| secondary | 1px inset using `color-btn-secondary-border` |
| secondary (focus) | 1px inset border + `shadow-focus-ring` |
| danger (focus) | 3px ring at `color-error` 20% opacity |
| all others (focus) | `shadow-focus-ring` |
| disabled | none |

### Sizing tokens

| Property | xs | sm | md | lg | xl |
|----------|----|----|----|----|-----|
| Height | 32px | 40px | 48px | 56px | 64px |
| H-padding | 16px | 16px | 16px | 24px | 32px |
| Font size | 12px | 14px | 16px | 18px | 20px |
| Line height | 16px | 18px | 24px | 28px | 32px |
| Icon size | 12px | 16px | 16px | 24px | 32px |
| Icon-only width | 32px | 40px | 48px | 56px | 64px |
| Radius | pill | pill | pill | pill | pill |
| Font weight | 500 | 500 | 500 | 500 | 500 |
| Element gap | 8px | 8px | 8px | 8px | 8px |

---

## 20. Implementation checklist

Use this to verify completeness after building the button on any platform:

- [ ] All 6 variants render with correct fill, text, and border/shadow tokens.
- [ ] All 5 sizes produce the correct height, padding, font size, and radius.
- [ ] `iconLeft` and `iconRight` render in correct positions with correct icon dimensions per size.
- [ ] `iconOnly` hides label visually but keeps it accessible; button is square.
- [ ] `loading` hides content, shows 3-dot wave, disables interaction, announces busy.
- [ ] Dot wave: 3 circles at 6px, 4px gap, correct color per variant, correct animation timing.
- [ ] `disabled` overrides fill/text to disabled tokens, removes shadows, prevents interaction.
- [ ] `disabled` + `link` variant keeps transparent background.
- [ ] `loading` implies disabled (no double-tap, no hover).
- [ ] Hover applies only on hover-capable pointer devices; correct treatment per variant (gradient, brightness, underline).
- [ ] Light vs dark hover differences verified (primary gradient vs flat fill; brightness direction flips for secondary/danger).
- [ ] Active/pressed: scale(0.97) on press, spring back on release, no scale when disabled.
- [ ] Focus ring: 3px `color-primary-ring` for most variants; compound for secondary; error-tinted for danger.
- [ ] Focus only appears on keyboard/assistive navigation, not on pointer click.
- [ ] `fullWidth` stretches to 100% parent width.
- [ ] Transitions: background 150ms, color 150ms, border-color 150ms, transform 100ms, box-shadow 150ms, all ease.
- [ ] Dark theme: all tokens remap correctly; verify each variant in dark mode.
- [ ] Sentence case enforced on all labels.
- [ ] Touch target ≥ 44px for touch-first layouts.
- [ ] Reduced motion: dot-wave suppressed or simplified.
- [ ] Semantic button element (not a div); keyboard Enter/Space triggers action.
- [ ] Screen reader: busy announced during loading; disabled announced; icon-only label accessible.

---

*Aligned with the ACKO Design System monorepo. Platform tracks: `react/button-react.md`, `flutter/button-flutter.md`.*
