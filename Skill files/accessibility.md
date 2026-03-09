# ACKO Accessibility Standards

Every component must pass this checklist before being considered complete. These are not optional — ACKO serves millions of users across India on varied devices and network conditions.

---

## Core Requirements

### 1. Reduced Motion

Always respect user preferences. All animations must be disabled when the user has enabled reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2. Minimum Tap Targets

Every interactive element must have a minimum touch target of **44×44px**:

```css
/* For visually small elements, expand hit area invisibly */
.small-interactive {
  position: relative;
}
.small-interactive::before {
  content: '';
  position: absolute;
  inset: -10px;   /* expands touch area by 10px on each side */
}
```

### 3. Focus States

All interactive elements MUST have visible focus indicators. Never use `outline: none` without providing an alternative:

```css
/* Standard focus ring */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-ring);
}

/* On dark backgrounds */
[data-theme="dark"] :focus-visible {
  box-shadow: 0 0 0 3px var(--color-primary-muted);
}
```

**Rules:**
- Use `:focus-visible` (not `:focus`) to avoid showing focus rings on mouse clicks
- Focus ring must have at least 3:1 contrast against the background
- Focus must be visible on all interactive elements: buttons, links, inputs, checkboxes, radios, dropdown triggers

### 4. Touch Device Handling

Hover effects should only apply on pointer devices:

```css
@media (hover: hover) and (pointer: fine) {
  .element:hover { /* hover styles */ }
}

/* Prevent double-tap zoom on interactive elements */
button, a, input, select, textarea {
  touch-action: manipulation;
}
```

### 5. Color Contrast

| Element | Minimum Ratio |
|---------|--------------|
| Body text (16px+) | 4.5:1 against background |
| Large text (24px+ or 18px+ bold) | 3:1 against background |
| UI components (borders, icons) | 3:1 against background |
| Focus indicators | 3:1 against background |

**Important:** Never convey information through color alone. Always pair color with an icon, text label, or pattern. Example: error states use red color AND an error icon AND error text.

---

## Component-Specific Requirements

### Buttons

```html
<!-- Use semantic <button>, never <div> or <span> -->
<button type="button" aria-label="Close dialog">
  <CloseIcon />
</button>

<!-- Toggle buttons -->
<button aria-pressed="true">Bookmarked</button>

<!-- Loading state -->
<button aria-busy="true" aria-disabled="true">
  <span class="sr-only">Loading, please wait</span>
</button>

<!-- Disabled — prefer aria-disabled for screen reader announcements -->
<button aria-disabled="true">Submit</button>
```

### Text Inputs

```html
<!-- Always associate label with input -->
<label for="email">Email address</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid="true"
  aria-describedby="email-error"
  autocomplete="email"
/>
<span id="email-error" role="alert">Please enter a valid email</span>
```

**Rules:**
- Minimum font size `16px` on inputs (prevents iOS auto-zoom)
- Always use `autocomplete` attributes for standard fields (name, email, tel, address)
- Error messages must use `role="alert"` for screen reader announcements
- Colocate error messages near the field — never in a toast or at page top

### Dropdowns

```html
<button
  role="combobox"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-controls="dropdown-menu"
>
  Select an option
</button>

<ul id="dropdown-menu" role="listbox" aria-label="Options">
  <li role="option" aria-selected="false">Option 1</li>
  <li role="option" aria-selected="true">Option 2</li>
  <li role="option" aria-disabled="true">Option 3 (unavailable)</li>
</ul>
```

**Keyboard:**
- `Enter` / `Space`: open menu, select focused option
- `Arrow Up/Down`: navigate options
- `Escape`: close menu, return focus to trigger
- `Home/End`: jump to first/last option
- Type-ahead: typing letters jumps to matching option

### Checkboxes & Radios

```html
<!-- Checkbox with description -->
<div role="group" aria-labelledby="preferences-label">
  <span id="preferences-label">Notification preferences</span>
  <label>
    <input type="checkbox" aria-describedby="email-desc" />
    Email notifications
    <span id="email-desc" class="helper-text">Receive updates via email</span>
  </label>
</div>

<!-- Radio group -->
<div role="radiogroup" aria-labelledby="plan-label">
  <span id="plan-label">Select your plan</span>
  <label><input type="radio" name="plan" value="basic" /> Basic</label>
  <label><input type="radio" name="plan" value="premium" /> Premium</label>
</div>
```

**Keyboard:**
- Checkbox: `Space` to toggle
- Radio: `Arrow` keys to move selection within group, `Tab` to leave group

### Calendar

```html
<div role="grid" aria-label="February 2026">
  <div role="row">
    <div role="columnheader">Sun</div>
    <!-- ... -->
  </div>
  <div role="row">
    <div role="gridcell" tabindex="-1" aria-selected="false">1</div>
    <div role="gridcell" tabindex="0" aria-selected="true" aria-current="date">10</div>
    <!-- ... -->
  </div>
</div>
```

**Keyboard:**
- `Arrow` keys: navigate days
- `Page Up/Down`: previous/next month
- `Home/End`: first/last day of week
- `Enter/Space`: select date

### Navigation Wizard

```html
<nav aria-label="Progress">
  <ol>
    <li aria-current="step">
      <span class="wizard-circle" aria-hidden="true">2</span>
      <span>Personal details</span>
    </li>
  </ol>
</nav>
```

- Use `aria-current="step"` for the active step
- Completed steps can be links if users can navigate back
- Announce step changes: `aria-live="polite"` on a status region

### Modals / Dialogs

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm cancellation</h2>
  <p>Are you sure you want to cancel your policy?</p>
  <button>Keep policy</button>
  <button>Yes, cancel</button>
</div>
```

**Rules:**
- Focus must move to first interactive element when modal opens
- Focus must be trapped inside the modal while open
- `Escape` closes the modal
- Focus returns to the trigger element when modal closes
- Background content must have `aria-hidden="true"` or `inert` attribute

---

## Screen Reader Utilities

Include these utility classes in the global stylesheet:

```css
/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  z-index: 9999;
  transition: top 150ms ease;
}

.skip-link:focus {
  top: 0;
}
```

---

## Live Regions

For dynamic content updates (form validation, step changes, loading states):

```html
<!-- Polite: announced when user is idle -->
<div aria-live="polite" aria-atomic="true">
  Step 2 of 4: Personal details
</div>

<!-- Assertive: announced immediately (use sparingly) -->
<div aria-live="assertive" role="alert">
  Payment failed. Please try again.
</div>
```

---

## Keyboard Navigation Principles

1. Tab order must follow visual reading order (top to bottom, left to right)
2. Users should only tab through **visible, interactive** elements
3. Hidden panels must use `visibility: hidden` (not `display: none` alone) — this removes them from tab order
4. Support `Ctrl+Enter` for form submission
5. Ensure keyboard navigation scrolls focused elements into the viewport

```js
// Form submission shortcut
function handleKeyDown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    handleSubmit();
  }
}
```

---

## Checklist (Verify Before Shipping)

For every component or page, confirm:

- [ ] All interactive elements are reachable by keyboard
- [ ] Focus indicator is visible on every interactive element
- [ ] Tab order matches visual order
- [ ] Color is not the sole means of conveying information
- [ ] Text contrast meets WCAG 2.1 AA minimums
- [ ] Touch targets are at least 44×44px
- [ ] Inputs have associated labels (not just placeholders)
- [ ] Error messages are announced to screen readers (`role="alert"`)
- [ ] Reduced motion is respected
- [ ] Modals trap focus and restore it on close
- [ ] Dynamic content updates use `aria-live` regions
- [ ] Images/icons have `alt` text or `aria-label` (or `aria-hidden="true"` if decorative)
