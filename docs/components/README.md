# Component documentation layout

Component guidance lives in two places, on purpose:

| Location | Audience | Format |
|----------|----------|--------|
| **`.cursor/rules/components/<name>/`** | Cursor / codegen / agents | `*.styles.mdc` (web CSS), `*.react.mdc` (React) |
| **`docs/components/<name>/`** | Humans (design, web, Flutter) | Markdown: `*.spec.md`, `*.web.md`, `*.flutter.md` |

## File roles

1. **`<name>.spec.md`** — *Platform-neutral.* What the component is for, variants, sizes, states, which **semantic tokens** apply, and accessibility **intent**. Avoid HTML/CSS/Dart except short illustrations.
2. **`<name>.web.md`** — *React + CSS.* Packages, class names, props, ARIA, web-only behavior (hover media queries, focus-visible).
3. **`<name>.flutter.md`** — *Flutter.* Widgets, theming, `Semantics`, touch-only vs hover, differences from web.

## Why three files?

Web and Flutter diverge in **state expression** (pseudo-classes vs `WidgetState`), **overlays**, **focus**, and **gestures**. One merged doc either becomes vague or wrong for one platform. The spec stays **single source for intent**; web and Flutter add **implementation truth**.

## Drift prevention

- If you change behavior, update **spec** and the affected platform file(s).
- `.mdc` rules should stay aligned with `docs/`; they are the machine-oriented mirror of the same contract.

## Reference example

See `docs/components/button/` for a full three-file example.
