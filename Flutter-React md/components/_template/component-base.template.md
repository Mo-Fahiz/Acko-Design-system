# {ComponentName} — Base specification (platform-agnostic)

> **Purpose:** The **visual and behavioral contract** for {ComponentName}. Every platform must match this document; React and Flutter only add **how** to implement it (no pixel or token drift).
>
> **Where to go next:** `react/{name}-react.md` (web), `flutter/{name}-flutter.md` (Flutter), `.cursor/rules/components/{name}/{name}.styles.mdc` (CSS class matrix, if applicable).

Copy this file to `Flutter-React md/components/{name}/{name}-base.md` and replace `{ComponentName}` / `{name}`. Remove sections that do not apply. Do **not** introduce framework-specific APIs here.

---

## Table of contents

1. [What it is](#1-what-it-is)
2. [Properties (API contract)](#2-properties-api-contract)
3. [Variants / sizes / layout](#3-variants--sizes--layout)
4. [Structure](#4-structure)
5. [States](#5-states)
6. [Motion](#6-motion)
7. [Theme](#7-theme)
8. [Accessibility intent](#8-accessibility-intent)
9. [Token quick-reference](#9-token-quick-reference)
10. [Implementation checklist](#10-implementation-checklist)
11. [Playground parity](#11-playground-parity)

---

## 1. What it is

One short paragraph: user-facing role, where it is used, and what it is **not**.

---

## 2. Properties (API contract)

Table of conceptual props / capabilities every platform must expose (idiomatic names per platform). Types as enums or booleans; defaults and required fields.

---

## 3. Variants / sizes / layout

Tables using **semantic token names** only (no raw hex). Include heights, padding, radii, typography levels as defined in `Flutter-React md/global.md`.

---

## 4. Structure

Nested list or tree: order of regions, slots, and children (label above vs inline, icon positions, etc.).

---

## 5. States

Default, hover (if applicable), focus, active, disabled, error, loading, etc. For each: which tokens change and any interaction rules (e.g. hover suppressed when disabled).

---

## 6. Motion

Durations, easing, and named animations (reference keyframe **intent**, not only CSS). Note reduced-motion expectations.

---

## 7. Theme

When **light**, **dark**, or **elevated** requires different semantics, document it here (match `[data-theme="..."]` or token remaps in CSS — still describe in plain language).

---

## 8. Accessibility intent

Roles, naming, focus order, live regions — **requirements**, not a full ARIA tutorial (platform tracks add details).

---

## 9. Token quick-reference

One table: semantic roles used by this component → token names.

---

## 10. Implementation checklist

Verifiable bullets for implementers on any platform (checkbox list).

---

## 11. Playground parity

**Mandatory** for components with a preview in `apps/playground/src/App.tsx`.

- **Preview function:** `{Name}Preview` (see `apps/playground/src/App.tsx`).
- **Playground:** run `apps/playground` (e.g. `http://127.0.0.1:5173/`) and select the component.
- **Table:** one row per distinct preview row or section (label, props, intent). If the preview has multiple sections (e.g. Variants, Sizes), list each section and what it demonstrates.

This section ties the written spec to **what ships** in the playground; update it when `App.tsx` previews change.

---

*After authoring: add `react/{name}-react.md` and `flutter/{name}-flutter.md`, and keep `.styles.mdc` aligned with `packages/css/src/{component}.css`.*
