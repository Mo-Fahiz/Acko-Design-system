# Component documentation

Each component uses **one base spec** and **two platform tracks**. Visual truth lives in **`*-base.md`**; React and Flutter docs add **implementation only** (no pixel or token drift).

## Layout

```text
Flutter-React md/components/<name>/
  <name>-base.md          # Platform-agnostic: variants, sizes, states, tokens, structure
  react/
    <name>-react.md       # React: packages, DOM, props, ARIA
  flutter/
    <name>-flutter.md     # Flutter: widgets, Semantics, theme

Flutter-React md/components/_template/
  component-base.template.md   # Authoring template for new <name>-base.md files

.cursor/rules/components/<name>/
  <name>.styles.md       # Web: acko-* classes (Button: button.style.md)
  <name>.react.md        # Web: concise React rule (keep in sync with packages/<name>/src)
```

## Index (playground registry)

| Sidebar name | Folder `Flutter-React md/components/…` |
|--------------|----------------------------|
| Button | [`button/`](./button/) |
| Badge | [`badge/`](./badge/) |
| Alert | [`alert/`](./alert/) |
| Card | [`card/`](./card/) |
| Typography | [`typography/`](./typography/) |
| TextInput | [`text-input/`](./text-input/) |
| Textarea | [`textarea/`](./textarea/) |
| Dropdown | [`dropdown/`](./dropdown/) |
| Checkbox | [`checkbox/`](./checkbox/) |
| Radio | [`radio/`](./radio/) |
| Switch | [`switch/`](./switch/) |
| Toggle | [`toggle/`](./toggle/) |
| Tabs | [`tabs/`](./tabs/) |
| Tooltip | [`tooltip/`](./tooltip/) |
| Progress | [`progress/`](./progress/) |
| Separator | [`separator/`](./separator/) |
| Label & Field | [`label-field/`](./label-field/) |
| InputGroup | [`input-group/`](./input-group/) |
| Breadcrumb | [`breadcrumb/`](./breadcrumb/) |
| Accordion | [`accordion/`](./accordion/) |
| Calendar | [`calendar/`](./calendar/) |
| Table | [`table/`](./table/) |
| Avatar | [`avatar/`](./avatar/) |
| Skeleton | [`skeleton/`](./skeleton/) |
| NavigationWizard | [`navigation-wizard/`](./navigation-wizard/) |
| Pagination | [`pagination/`](./pagination/) |
| ScrollArea | [`scroll-area/`](./scroll-area/) |
| Dialog | [`dialog/`](./dialog/) |
| Drawer | [`drawer/`](./drawer/) |
| Toast | [`toast/`](./toast/) |
| Slider | [`slider/`](./slider/) |
| OtpInput | [`otp-input/`](./otp-input/) |
| Form | [`form/`](./form/) |

**Visual verification:** Run the playground (`apps/playground`, e.g. `http://127.0.0.1:5173/`) and align each **`*Preview()`** in `apps/playground/src/App.tsx` with the **Playground parity** section in that component’s **`*-base.md`**.

Orchestration and shared tokens: **`Flutter-React md/global.md`**.
