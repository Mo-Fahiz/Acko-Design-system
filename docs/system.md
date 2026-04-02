# ACKO Design System — System architecture

This document describes how the design system is structured **today** (web: React, CSS, Tailwind v4) and how **other platforms** (for example Flutter) can plug in later without forking the *meaning* of the system.

Plain language: **tokens and rules define what “ACKO” looks like and how it behaves; each platform implements those rules with its own tools.**

---

## 1. Layers (bottom to top)

| Layer | What it is | Platform-specific? |
|-------|------------|--------------------|
| **Primitives** | Raw values (hex, numbers) — building blocks | Same *values* everywhere; storage format may differ (CSS vs JSON). |
| **Semantics** | Named roles: `--color-primary`, `--font-heading-lg-size`, etc. | **Canonical intent** — shared across platforms. |
| **Foundation rules** | Typography scale, radii roles, motion, layout gutters, icon meaning (arrow vs chevron), a11y principles | Mostly **agnostic**; *expression* differs (CSS vs Flutter widgets). |
| **Components** | Buttons, inputs, dialogs — structure, states, APIs | **Split**: shared *spec* + **web** implementation + **mobile** implementation. |

**Rule of thumb:** If it references HTML, `aria-*`, `@apply`, or `lucide-react`, it belongs in the **web** track. If it references `Semantics`, `ThemeExtension`, or `Material`/`Cupertino`, it belongs in the **Flutter** track. If it only names **variants, sizes, states, and tokens**, it belongs in the **agnostic spec**.

---

## 2. Canonical sources (what is “truth”)

Today in this monorepo:

1. **`packages/tokens`** — `tokens.css` (CSS custom properties), `theme.css` (Tailwind v4 `@theme inline` mapping). This is the **web** delivery of semantics.
2. **`.cursor/rules/foundation/`** — Written rules and tables (colors, type, motion, layout, …). These are **human- and AI-readable**; they should stay aligned with `tokens.css`.
3. **`.cursor/rules/components/<name>/`** — `*.styles.mdc` (web CSS spec), `*.react.mdc` (React spec).

**Future-friendly option (not required day one):** A single **design-token file** (for example [DTCG](https://tr.designtokens.org/format/) JSON) could generate both `tokens.css` and Flutter `ThemeExtension` / ThemeData. Until then, **semantic names and tables in foundation docs are the contract**; web implements them in CSS, Flutter implements the same names in Dart.

---

## 3. Web stack (current)

```
Consumer app
  └─ imports: tailwindcss, @acko/tokens (tokens.css + theme.css), @acko/css/*.css
  └─ uses: @acko/<component> React packages
```

- **Tokens:** Variables on `:root` and theme scopes (`[data-theme="dark"]`, etc.).
- **Components:** One CSS file per component in `packages/css`, one React package per component in `packages/<name>`. React uses **no** utility classes in TSX — only `clsx` + `acko-*` classes.

See `.cursor/rules/00-system.mdc` for day-to-day web conventions (class naming, `forwardRef`, peer dependencies, etc.).

---

## 4. Flutter stack (planned shape)

Not all of this exists in the repo yet; this section documents the **intended** adaptation so documentation and tooling can grow in one direction.

| Web concept | Flutter direction |
|-------------|------------------|
| CSS variables / semantic tokens | `ThemeExtension` or centralized token class; light/dark/`elevated` via `ThemeData.brightness` + extensions |
| `*.css` + `@apply` | Widget composition + `BoxDecoration`, `TextStyle`, shared sub-widgets |
| `:hover`, `@media (hover: hover)` | `WidgetStateProperty`, hover may be absent on touch-first |
| `:focus-visible` | Focus traversal + `Focus` / `FocusNode`; `FocusIndicator` styling |
| ARIA | `Semantics` widget, platform affordances |
| `lucide-react` (peer) | [`lucide_icons`](https://pub.dev/packages/lucide_icons) or agreed equivalent — same *glyph* vocabulary |

**Principle:** Flutter widgets should **not** introduce new semantic colors or new radii tiers. If a token is missing, add it **once** at the semantic layer and mirror it in both platforms.

---

## 5. Human-readable specs in `docs/`

| Path | Purpose |
|------|---------|
| **`docs/system.md`** (this file) | Map of layers, canonical sources, and platform adapters. |
| **`docs/components/README.md`** | How we split **spec / web / Flutter** per component. |
| **`docs/components/<name>/`** | Optional **Markdown** mirrors of the component contract for reviewers and mobile engineers. |

**`.mdc` vs `.md`:** Cursor rules under `.cursor/rules` stay the **executable** source for codegen and AI. `docs/` is optimized for **people** and onboarding; it should **not** contradict `.mdc` files. When they disagree, fix the drift (prefer updating tokens + `.mdc` first, then `docs/`).

---

## 6. Foundation docs: agnostic vs web-bound

Many foundation `.mdc` files are written for **web implementation** (for example Tailwind utilities in `scales.mdc`, CSS snippets in `layout.mdc`). That is intentional for this repo.

For a **platform-agnostic reading**:

- Treat **numbers and roles** (gutter sizes, breakpoint cutoffs, type steps, semantic color roles) as **portable**.
- Treat **Tailwind class names, `@apply`, and HTML structure** as **web-only bindings**.

Each major foundation file includes a short **Documentation scope** note at the top stating what is portable and what is web-specific.

---

## 7. Component docs: three files per component (target pattern)

For each component we aim for:

1. **`*.spec.md`** — Purpose, anatomy, variants, sizes, **state table**, tokens used, a11y *intent* (no React/CSS/Flutter syntax, or only as examples).
2. **`*.web.md`** — Package names, CSS classes, React props, ARIA, DOM edge cases.
3. **`*.flutter.md`** — Widget API sketch, theming hooks, `Semantics`, platform notes.

The **Button** under `docs/components/button/` is the reference implementation of this pattern. Other components can adopt the same layout over time.

---

## 8. Contributing across platforms

1. Change **semantic** meaning or add a token → update `packages/tokens` *and* foundation docs *and* any Flutter token mirror (when it exists).
2. **Visual / behavior** change → update **spec** first, then web and Flutter tracks.
3. **Web-only** shortcut (for example a hover media query) must not change the **agnostic** state table; document the limitation in `*.web.md`.

---

## 9. Glossary

| Term | Meaning |
|------|---------|
| **Primitive** | Raw palette value; not referenced directly by components. |
| **Semantic token** | Role-based name components are allowed to use. |
| **Foundation** | Cross-cutting rules: type, color roles, motion, layout, icons. |
| **Spec** | Platform-neutral component description. |
| **Track** | Web (React/CSS) vs Flutter implementation doc or codebase. |

---

*Last aligned with monorepo branch **Version-4.1** — web implementation in `packages/*`; Flutter packages may be added under a future `flutter/` or `packages/flutter_*` layout as the system grows.*
