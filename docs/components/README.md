# Component documentation

Each component uses **one base spec** and **two platform tracks**. Visual truth lives in **`*-base.md`**; React and Flutter docs add **implementation only** (no pixel or token drift).

## Layout

```text
docs/components/<name>/
  <name>-base.md          # Platform-agnostic: variants, sizes, states, tokens, structure
  react/
    <name>-react.md       # React: packages, DOM, props, ARIA
  flutter/
    <name>-flutter.md     # Flutter: widgets, Semantics, theme

.cursor/rules/components/<name>/
  <name>.styles.mdc       # Web: acko-* classes (Button: button.style.mdc)
  <name>.react.mdc        # Web: concise React rule (keep in sync with packages/<name>/src)
```

**Example:** `docs/components/button/button-base.md`, `react/button-react.md`, `flutter/button-flutter.md`.

Orchestration and shared tokens: **`docs/global.md`**.
