# Button — Platform-neutral spec

## Purpose

A **Button** triggers an action (submit, navigate, open something, confirm). It is a primary interactive control and must remain readable, tappable within guidelines, and visually consistent across themes.

## Variants (intent)

| Variant | Use when |
|---------|----------|
| **primary** | Main action on a surface (one primary per logical group when possible). |
| **secondary** | Alternate positive action; less emphasis than primary. |
| **inverted** | On dark or brand-heavy backgrounds where primary fill needs inversion. |
| **ghost** | Low-emphasis actions; toolbar-like contexts. |
| **link** | Looks like text link; inline or minimal chrome. |
| **danger** | Destructive or irreversible actions (delete, remove). |

## Sizes

Heights are **expressions of the same scale** on all platforms (exact px may map to logical pixels on mobile).

| Size | Typical height | Typical use |
|------|----------------|-------------|
| xs | 32px | Dense desktop-only toolbars (use sparingly on touch). |
| sm | 40px | Compact UI. |
| md | 48px | Default. |
| lg | 56px | Prominent actions. |
| xl | 64px | Hero / marketing emphasis. |

**Touch:** Favor **at least ~44px** effective tap height where the primary audience is touch-first. `xs` is mainly for pointer-dense layouts.

## States (canonical)

All platforms must implement these states; **how** they are triggered may differ (for example hover exists mainly on web).

| State | Expected experience |
|-------|---------------------|
| **default** | Resting appearance per variant. |
| **hover** | Slight emphasis (color, shadow, underline for link) — *if* the platform supports hover. |
| **pressed / active** | Clear momentary feedback (for example scale or shade). |
| **focus / keyboard** | Highly visible focus ring for keyboard and switch users. |
| **disabled** | No action; muted colors; not invoked by pointer or keyboard. |
| **loading** | Action in progress; control not repeatable; show a non-blocking loading indicator and expose busy state to assistive tech. |

## Icon usage

- **Leading icon:** Reinforces meaning of the label (“what”).
- **Trailing icon:** Often indicates direction (“where”) — follow system iconography rules (arrow for proceed, chevron for reveal).
- **Icon-only:** Visible icon with **accessible name** available to assistive tech (tooltip, `aria-label` / semantic label).

## Tokens (semantic)

Components must use **semantic** roles only, for example:

- Fills and text: `--color-primary`, `--color-on-primary`, button-specific semantic tokens where defined (secondary, ghost, link, danger, disabled).
- Elevation / depth: `--shadow-btn-inner`, focus ring token (for example `--shadow-focus-ring` on web).
- Radius: interactive controls use **pill** semantics (`--radius-full` in the current web token set).

Exact token names live in `packages/tokens` and `.cursor/rules/foundation/colors-semantic.mdc`.

## Content rules

- Labels use **sentence case** (see typography foundation for exceptions: ACKO, IDV, proper nouns, etc.).
- Do not rely on color alone for danger; the **label** must be explicit.

## Accessibility intent

- The control must be **keyboard activatable** where applicable.
- **Loading** must announce as busy to assistive tech.
- **Disabled** must not receive activation.
- **Focus** must be visible when navigating with keyboard or assistive linear navigation.

Platform mapping: web uses ARIA attributes on a native button; Flutter uses `Semantics` and focus APIs.

## Related docs

- `button.web.md` — React + CSS details.
- `button.flutter.md` — Flutter widget notes.
- `.cursor/rules/components/button/button.styles.mdc` and `button.react.mdc` — authoritative web specs for this repo.
