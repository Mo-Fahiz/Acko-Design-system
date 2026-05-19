---
description: Semantic color tokens — role-based aliases that components reference. Never use primitives (--purple600, --grey200) in component CSS. All values resolved through this layer.
globs: "**/*.css,**/*.tsx,**/*.ts,**/*.jsx,**/*.dart,**/*.swift,**/*.kt"
version: 2.1.0
last_updated: 2026-05-18
naming_convention: camelCase — token names match across CSS custom properties, Dart, Swift, and JSON (e.g. colorPrimary, colorTextDefault, colorWarningText)
color_source: colors-primitive.md
typography_source: typography.md
---

# Semantic Color Tokens

Components reference ONLY these tokens. Never use primitives (`--purple600`, `--grey200`) in component CSS.

```
primitives → semantics → component CSS
--purple600 → --colorPrimary → .acko-btn-primary { background-color: var(--colorPrimary) }
```

## What changed in v2.1

Sync with `colors-primitive.md` v1.2 and `typography.md` v3.5.0.

- **"Required primitive additions" section closed.** All three tokens (`--whiteA0_02`, `--whiteA4_28`, `--whiteA7_48`) were added to `colors-primitive.md` in v1.1. No raw `rgba()` values remain anywhere in this file.
- **`--colorTableStripe` dark corrected.** Was incorrectly mapped to `whiteA8` (`rgba(255,255,255,0.6)`) — the intended value is `whiteA0_02` (`rgba(255,255,255,0.02)`) for the very subtle row stripe. Corrected now that the primitive exists.
- **`globs` expanded** to cover `.tsx`, `.ts`, `.jsx`, `.dart`, `.swift`, `.kt` — matches the `typography.md` glob scope.
- **`naming_convention` and `color_source` / `typography_source` added** to frontmatter — aligns with the camelCase-everywhere convention from `typography.md`.
- **Typography color token names confirmed.** Cross-checked against `typography.md` v3.5.0 Color Integration table. All names align: `--colorTextPrimary`, `--colorTextDefault`, `--colorTextSupporting`, `--colorTextSecondary`, `--colorTextDisabled`, `--colorTextInvert`, `--colorTextBrand`, `--colorTextError`, `--colorTextSuccess`, `--colorTextStatic`, `--colorWarningText`, `--colorLink`, `--colorLinkHover`.
- Updated `last_updated` date and footer.

## What changed in v2.0

This file was audited and reorganised on 2026-05-12. The changes:

1. **Aliases over re-declaration.** Component tokens that had the same value as a global token (e.g. `--colorCheckboxCheckedBg` = `purple600`/`purple500` = `--colorPrimary`) now point at the global. This means a brand colour change updates every dependent component automatically.
2. **Duplicate tokens removed.** Pairs like `--colorErrorText` and `--colorTextError` (identical values, redundant names) were collapsed to one canonical name following the `--colorText*` pattern already used in the Text section.
3. **Raw rgba values replaced with alpha primitives.** Tokens like `--colorSurfaceGhostHover` now reference `--blackA04` / `--whiteA1` instead of inlining `rgba()` values that bypass the primitive layer.
4. **`--colorSurface` conflict resolved.** The token was defined twice with different dark values (`grey750` in the Surfaces section, `grey700` in the Cards table). Reconciled to `grey700` to match how it is used in the surface hierarchy.
5. **Switch thumb duplicate removed.** `--colorSwitchThumb` (the "original" token) and `--colorSwitchThumbOn` had identical values. Kept `--colorSwitchThumbOn`, removed `--colorSwitchThumb`.

## Documentation scope

**Portable across platforms:** The **role** of each semantic token (what it means for UI: primary CTA, surface, error text, border, etc.) and how themes (light / dark / elevated) swap *values*. Component code must always go through **semantic names**, never raw palette keys.

**Web-specific in this file:** CSS custom property syntax (e.g. `--colorTextPrimary`), references to `tokens.css` / `[data-theme]`. Flutter should use the **same semantic identifiers** (e.g. `AckoColors.primary`, or a generated map from a shared token file), not hardcoded hex from this doc's reference columns.

**Token aliasing notation:** Where a semantic token aliases another semantic token, the value column shows `→ --otherToken` instead of a primitive. The resolved primitive is shown in parentheses for reference.

---

## Brand / Primary

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorPrimary` | Main CTA fill | `purple600` | `purple500` |
| `--colorPrimaryHover` | Hover state | `purple700` | `purple400` |
| `--colorPrimaryActive` | Pressed state | `purple800` | `purple300` |
| `--colorPrimaryMuted` | Soft border hints | `purple400` | `purple600` |
| `--colorPrimarySubtle` | Tinted backgrounds | `purple100` | `purple900` |
| `--colorPrimaryRing` | Focus ring | `purple200` | `purple800` |
| `--colorOnPrimary` | Text on primary bg | `greyWhite` | `greyWhite` |

Note: `--colorOnPrimary` previously had `#FFFFFF` for light. Switched to `greyWhite` so the value goes through the primitive layer like everything else.

---

## Surfaces

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorSurface` | Page background | `grey100` | `grey700` |
| `--colorSurfaceRaised` | Elevated surfaces | `grey100` | `grey700` |
| `--colorSurfaceRaisedHover` | Hovered raised | `grey200` | `grey650` |
| `--colorSurfaceRaisedActive` | Pressed raised | `grey300` | `grey600` |
| `--colorSurfaceOverlay` | Backdrop | `blackA7` | `blackA9` |
| `--colorSurfaceGhostHover` | Ghost interaction bg | `blackA04` | `whiteA1` |

Note: `--colorSurface` dark was `grey750` in v1, conflicting with the Cards section which had `grey700`. Reconciled to `grey700`. `--colorSurfaceOverlay` light was `rgba(10,10,10,0.5)` — replaced with `blackA7` (`rgba(0,0,0,0.5)`). Ghost hover values now reference alpha primitives.

---

## Text

| Token | Typography prop | Light | Dark | Role |
|-------|----------------|-------|------|------|
| `--colorTextPrimary` | `primary` (default) | `grey800` | `grey50` | Headings, values, main content |
| `--colorTextDefault` | — | `grey700` | `grey100` | Labels, body text |
| `--colorTextSupporting` | — | `grey550` | `grey200` | Supporting text (readonly, chevrons) |
| `--colorTextSecondary` | `secondary` | `grey450` | `grey350` | Subtext, placeholders, helpers |
| `--colorTextDisabled` | — | `grey350` | `grey450` | Disabled text |
| `--colorTextInvert` | `invert` | `greyWhite` | `greyWhite` | Text on dark/filled surfaces regardless of theme |
| `--colorTextBrand` | `brand` | → `--colorPrimary` | → `--colorPrimary` | Brand-coloured text — links, emphasis |
| `--colorTextError` | `error` | `red700` | `red400` | Error messages |
| `--colorTextSuccess` | `success` | `green700` | `green400` | Success messages |
| `--colorTextStatic` | `static` | `greyWhite` | `greyWhite` | Fixed color across themes — does not change |

Notes:
- `--colorTextDisabled` value reconciled to `grey350`/`grey450` (was `grey300`/`grey450` in v1 — conflicted with `--colorDisabledText`). The single canonical disabled-text token is now `--colorTextDisabled`. The Disabled section below references it.
- `--colorTextBrand` now aliases `--colorPrimary` (same value, was redundantly redeclared).
- Removed `--colorErrorText` (duplicate of `--colorTextError`) and `--colorSuccessText` (duplicate of `--colorTextSuccess`). See migration notes at end of file.

---

## Borders

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorBorder` | Default border | `grey300` | `grey600` |
| `--colorBorderStrong` | Hover/filled | `grey450` | `grey550` |
| `--colorBorderSubtle` | Faint dividers | `grey200` | `grey650` |

---

## Dividers

Explicit separator tokens (distinct from borders).

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorDivider` | Standard divider | `grey200` | `grey650` |
| `--colorDividerStrong` | Emphasized divider | `grey300` | `grey600` |
| `--colorDividerSubtle` | Faint divider | `grey150` | `grey700` |

---

## Disabled

Global disabled-state tokens. Components should reference these rather than redeclaring `grey` primitives at the component level.

| Token | Light | Dark |
|-------|-------|------|
| `--colorDisabledBg` | `grey150` | `grey600` |
| `--colorDisabledText` | → `--colorTextDisabled` | → `--colorTextDisabled` |
| `--colorDisabledBorder` | `grey200` | `grey600` |

Note: `--colorDisabledText` now aliases `--colorTextDisabled` (both were `grey350`/`grey450` and represented the same role).

---

## Readonly

Readonly state — distinct from disabled. Elements CAN receive focus, value IS submitted with form.

| Token | Light | Dark |
|-------|-------|------|
| `--colorReadonlyBg` | `grey100` | `grey700` |
| `--colorReadonlyText` | `grey700` | `grey200` |
| `--colorReadonlyBorder` | `grey250` | `grey600` |

---

## Feedback States

### Error

| Token | Light | Dark |
|-------|-------|------|
| `--colorError` | `red600` | `red600` |
| `--colorErrorSubtle` | `red100` | `red950` |
| `--colorErrorBorder` | `red200` | `red800` |
| `--colorErrorBadgeBg` | `red100` | `red900` |
| `--colorErrorGradientFrom` | → `--colorErrorBorder` | → `--colorErrorBorder` |
| `--colorErrorGradientTo` | → `--colorDisabledBg` | → `--colorDisabledBg` |

Note: `--colorErrorGradientFrom` had the same value as `--colorErrorBorder`. Now aliased. `--colorErrorGradientTo` matched `--colorDisabledBg`. Now aliased.

### Success

| Token | Light | Dark |
|-------|-------|------|
| `--colorSuccess` | `green600` | `green500` |
| `--colorSuccessSubtle` | `green100` | `green950` |
| `--colorSuccessBorder` | `green200` | `green800` |
| `--colorSuccessBadgeBg` | `green200` | `green900` |

### Warning

| Token | Light | Dark |
|-------|-------|------|
| `--colorWarning` | `orange600` | `orange500` |
| `--colorWarningText` | `orange700` | `orange400` |
| `--colorWarningSubtle` | `orange50` | `orange950` |
| `--colorWarningBorder` | `orange100` | `orange800` |
| `--colorWarningBadgeBg` | `orange200` | `orange900` |

### Info (uses brand purple — NOT blue)

| Token | Light | Dark |
|-------|-------|------|
| `--colorInfo` | → `--colorPrimary` | → `--colorPrimary` |
| `--colorInfoText` | → `--colorPrimaryHover` | → `--colorPrimaryHover` |
| `--colorInfoSubtle` | → `--colorPrimarySubtle` | → `--colorPrimarySubtle` |
| `--colorInfoBorder` | → `--colorPrimaryRing` | → `--colorPrimaryRing` |
| `--colorInfoBadgeBg` | `purple200` | `purple900` |

Note: Info tokens previously duplicated the Primary scale exactly. Now aliased so brand changes propagate automatically.

---

## Cards

Surface hierarchy (five levels, back → front):

| Level | Token name | Light | Dark | Intent |
|-------|------------|-------|------|--------|
| page.base | `--colorSurface` | (defined in Surfaces section) | (defined in Surfaces section) | Primary page background |
| surface.default | `--colorCardBg` | `grey50` | `grey650` | Default card/container surface |
| surface.secondary | `--colorCardSecondaryBg` | → `--colorSurface` | → `--colorSurface` | Secondary layered surface |
| surface.elevated | `--colorCardElevatedBg` | `grey50` | `grey600` | Elevated cards (modals, highlights) |
| surface.demoted | `--colorCardDemotedBg` | `grey150` | `grey750` | Low emphasis / background containers |

Border tokens:

| Token | Light | Dark |
|-------|-------|------|
| `--colorCardBorder` | `greyWhite` | `grey600` |
| `--colorCardSecondaryBorder` | → `--colorDisabledBg` | → `--colorDisabledBg` |
| `--colorCardDemotedBorder` | → `--colorBorderSubtle` | → `--colorBorderSubtle` |
| `--colorCardOutlineBorder` | → `--colorDisabledBorder` | → `--colorDisabledBorder` |

Note: `--colorCardSecondaryBg` had the same value as `--colorSurface` (`grey100`/`grey700`). Now aliased. `--colorCardSecondaryBorder` matched `--colorDisabledBg`, `--colorCardDemotedBorder` matched `--colorBorderSubtle`, `--colorCardOutlineBorder` matched `--colorDisabledBorder` — all aliased.

---

## Component-Specific Tokens

### Tooltip

| Token | Light | Dark |
|-------|-------|------|
| `--colorTooltipBg` | `grey700` | `grey200` |
| `--colorTooltipText` | → `--colorInputBg` | → `--colorInputBg` |

### Tabs — pill container + inner tab

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `--colorTabPillBg` | → `--colorCardBg` | → `--colorCardBg` | Outer pill track fill |
| `--colorTabPillOuterBorder` | → `--colorCardBorder` | → `--colorCardBorder` | `1px` outer pill border |
| `--colorTabPillActiveBg` | → `--colorPrimarySubtle` | → `--colorPrimarySubtle` | Active inner pill fill |
| `--colorTabPillActiveText` | `purple600` | `greyWhite` | Active label + icon |
| `--colorTabTextInactive` | `grey400` | `grey400` | Inactive pill tab (transparent bg) |
| `--colorTabTextDisabled` | `grey300` | `grey500` | Disabled pill tab label |

Note: `--colorTabPillActiveText` is intentionally NOT aliased to `--colorPrimary` — light uses `purple600` (same value) but dark uses `greyWhite` (different from `--colorPrimary` dark which is `purple500`).

### Toggle

| Token | Light | Dark |
|-------|-------|------|
| `--colorToggleBg` | → `--colorChipBg` | → `--colorChipBg` |
| `--colorToggleBgHover` | → `--colorDisabledBorder` | → `--colorDisabledBorder` |
| `--colorToggleActiveBg` | → `--colorPrimarySubtle` | → `--colorPrimarySubtle` |
| `--colorToggleActiveText` | `purple700` | `purple300` |
| `--colorToggleText` | → `--colorTextSecondary` | → `--colorTextSecondary` |

### Accordion

| Token | Light | Dark |
|-------|-------|------|
| `--colorAccordionBorder` | → `--colorDisabledBorder` | → `--colorDisabledBorder` |
| `--colorAccordionHeaderHover` | → `--colorCardBg` | → `--colorCardBg` |
| `--colorAccordionIcon` | `grey400` | `grey400` |

### Breadcrumb

| Token | Light | Dark |
|-------|-------|------|
| `--colorBreadcrumbText` | `grey400` | `grey400` |
| `--colorBreadcrumbLink` | `grey500` | `grey350` |
| `--colorBreadcrumbLinkHover` | → `--colorLink` | → `--colorLink` |
| `--colorBreadcrumbCurrent` | → `--colorTextDefault` | → `--colorTextDefault` |
| `--colorBreadcrumbSeparator` | `grey300` | `grey550` |

Note: `--colorBreadcrumbLink` and `--colorTableHeaderText` share the same value (`grey500`/`grey350`) but are kept separate since they refer to different roles (breadcrumb interactive link vs static table header label). Treating them as a coincidental collision rather than a forced alias.

### Table

| Token | Light | Dark |
|-------|-------|------|
| `--colorTableHeaderBg` | → `--colorSurface` | → `--colorSurface` |
| `--colorTableHeaderText` | `grey500` | `grey350` |
| `--colorTableBorder` | → `--colorDisabledBorder` | → `--colorDisabledBorder` |
| `--colorTableRowHover` | → `--colorCardBg` | → `--colorCardBg` |
| `--colorTableStripe` | `grey50` | `whiteA0_02` |

Note: `--colorTableStripe` dark corrected from `whiteA8` (`rgba(255,255,255,0.6)`) to `whiteA0_02` (`rgba(255,255,255,0.02)`) — the intended very subtle row stripe. `whiteA0_02` now exists in `colors-primitive.md` v1.1.

### Button

| Token | Light | Dark |
|-------|-------|------|
| `--colorBtnSecondaryBg` | `purple50` | `grey650` |
| `--colorBtnSecondaryBorder` | `purple300` | `purple600` |
| `--colorBtnSecondaryText` | `purple700` | `grey50` |
| `--colorBtnInvertedBg` | `grey100` | `grey100` |
| `--colorBtnInvertedText` | `purple700` | `purple700` |
| `--colorBtnGhostColor` | → `--colorPrimary` | → `--colorPrimary` |
| `--colorBtnGhostHoverBg` | `purple50` | `grey600` |
| `--colorBtnLinkColor` | `blue600` | `blue500` |
| `--colorBtnDangerBg` | → `--colorErrorBadgeBg` | → `--colorErrorBadgeBg` |
| `--colorBtnDangerText` | `red500` | `red200` |
| `--colorBtnDisabledBg` | `grey100` | `grey600` |
| `--colorBtnDisabledText` | → `--colorTextDisabled` | → `--colorTextDisabled` |
| `--colorBtnPrimaryHoverBg` | — | → `--colorPrimary` |

### Input (shared by TextInput, Dropdown, Textarea, InputGroup; **not** OTP filled/focus)

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `--colorInputBg` | `greyWhite` | `grey750` | Default fill |
| `--colorInputBorder` | → `--colorDisabledBg` | → `--colorDisabledBg` | Default border |
| `--colorInputHoverBorder` | `grey300` | `grey550` | Hover border |
| `--colorInputFilledBorder` | `grey200` | `grey550` | Filled (has value) border |
| `--colorInputFocusBorder` | → `--colorInputFilledBorder` | → `--colorInputFilledBorder` | Focus/selected border (error excluded) |
| `--colorInputDisabledBg` | — | `grey650` | Disabled fill (dark only) |
| `--colorInputDisabledBorder` | — | → `--colorDisabledBorder` | Disabled border (dark only) |
| `--colorInputOptionHover` | → `--colorBtnSecondaryBg` | → `--colorBtnSecondaryBg` | Dropdown option hover |
| `--colorInputOptionSelectedBg` | → `--colorPrimarySubtle` | → `--colorPrimarySubtle` | Selected option bg |
| `--colorInputOptionSelectedText` | `purple700` | `purple300` | Selected option text |

### OTP Input (cell-specific — default empty cell still uses `--colorInput*`)

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `--colorOtpFilledBg` | → `--colorInputBg` | → `--colorInputBg` | Digit entered, not focused |
| `--colorOtpFilledBorder` | → `--colorBtnDisabledBg` | → `--colorBtnDisabledBg` | Filled cell border |
| `--colorOtpFilledText` | `grey800` | `grey100` | Digit colour |
| `--colorOtpFocusBg` | `greyWhite` | `grey700` | Focused cell fill |
| `--colorOtpFocusBorder` | → `--colorInputFilledBorder` | → `--colorInputFilledBorder` | Focused cell border |
| `--colorOtpFocusRing` | → `--colorDisabledBg` | → `--colorDisabledBg` | `2px` focus ring |
| `--colorOtpErrorFill` | → `--colorOtpFocusBg` | → `--colorOtpFocusBg` | Error cell interior |
| `--colorOtpErrorGradientFrom` | → `--colorDisabledBg` | → `--colorDisabledBg` | Error border gradient start (`0deg`) |
| `--colorOtpErrorGradientTo` | → `--colorErrorBadgeBg` | → `--colorErrorBadgeBg` | Error border gradient end |

### Slider / Progress

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `--colorTrackInactive` | → `--colorDisabledBorder` | → `--colorDisabledBorder` | Unfinished track area (Progress; slider disabled ticks) |
| `--colorSliderTrackActiveFrom` | `purple300` | `purple800` | Filled segment gradient start (horizontal) |
| `--colorSliderTrackActiveTo` | `purple700` | `purple500` | Filled segment gradient end |
| `--colorSliderTrackInactiveFrom` | `grey150` | `grey500` | Rail gradient start |
| `--colorSliderTrackInactiveTo` | → `--colorInputFilledBorder` | → `--colorInputFilledBorder` | Rail gradient end |
| `--colorSliderThumbBg` | `purple50` | `purple50` | Thumb fill |
| `--colorSliderThumbStrokeFrom` | `purple500` | `purple500` | Thumb border gradient top |
| `--colorSliderThumbStrokeTo` | `purple700` | `purple700` | Thumb border gradient bottom |
| `--shadowSliderThumb` | purple-tint drop shadow | stronger purple-tint | Thumb elevation |

**Slider thumb layout (theme-agnostic, defined on `:root`):**

| Token | Value |
|-------|------|
| `--sliderThumbSizeSm` | `16px` |
| `--sliderThumbSizeMd` | `20px` |
| `--sliderThumbSizeLg` | `24px` |

Referenced in `slider.css` as `width` / `height` on `.acko-slider-thumb`.

### Switch

Complete switch state system.

**OFF State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorSwitchTrackOff` | Track background OFF | → `--colorBorder` | → `--colorBorder` |
| `--colorSwitchTrackOffHover` | Track hover OFF | `grey400` | `grey550` |
| `--colorSwitchThumbOff` | Thumb colour OFF | `greyWhite` | `grey300` |

**ON State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorSwitchTrackOn` | Track background ON | → `--colorPrimary` | → `--colorPrimary` |
| `--colorSwitchTrackOnHover` | Track hover ON | → `--colorPrimaryHover` | → `--colorPrimaryHover` |
| `--colorSwitchThumbOn` | Thumb colour ON | `greyWhite` | `greyWhite` |

Note: `--colorSwitchThumb` was removed in v2.0 — it duplicated `--colorSwitchThumbOn` exactly. Migrate any callers to `--colorSwitchThumbOn`.

**Error State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorSwitchTrackError` | Track error state | → `--colorError` | → `--colorError` |
| `--colorSwitchThumbError` | Thumb error state | `greyWhite` | `greyWhite` |

**Disabled State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorSwitchTrackDisabledOff` | Track disabled OFF | → `--colorDivider` | → `--colorDivider` |
| `--colorSwitchTrackDisabledOn` | Track disabled ON | → `--colorBorder` | → `--colorBorder` |
| `--colorSwitchThumbDisabled` | Thumb disabled | `grey250` | `grey500` |

**Focus State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorSwitchFocusRing` | Focus ring | → `--colorPrimaryRing` | → `--colorPrimaryRing` |

### Checkbox

Complete checkbox state system.

**Base States (Unchecked):**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorCheckboxBorder` | Default border | `grey300` | `grey550` |
| `--colorCheckboxBg` | Default background | `transparent` | `transparent` |
| `--colorCheckboxHoverBorder` | Hover border | `grey450` | `grey500` |
| `--colorCheckboxHoverBg` | Hover background | `grey50` | `grey700` |

**Checked State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorCheckboxCheckedBg` | Checked background | → `--colorPrimary` | → `--colorPrimary` |
| `--colorCheckboxCheckedBorder` | Checked border | → `--colorPrimary` | → `--colorPrimary` |
| `--colorCheckboxCheckedIcon` | Checkmark icon | `greyWhite` | `greyWhite` |
| `--colorCheckboxCheckedHoverBg` | Checked + hover bg | → `--colorPrimaryHover` | → `--colorPrimaryHover` |
| `--colorCheckboxCheckedHoverBorder` | Checked + hover border | → `--colorPrimaryHover` | → `--colorPrimaryHover` |

**Indeterminate State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorCheckboxIndeterminateBg` | Indeterminate background | → `--colorPrimary` | → `--colorPrimary` |
| `--colorCheckboxIndeterminateBorder` | Indeterminate border | → `--colorPrimary` | → `--colorPrimary` |
| `--colorCheckboxIndeterminateIcon` | Minus icon | `greyWhite` | `greyWhite` |

**Error State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorCheckboxErrorBorder` | Error unchecked border | → `--colorError` | → `--colorError` |
| `--colorCheckboxErrorBg` | Error unchecked bg | `transparent` | `transparent` |
| `--colorCheckboxErrorCheckedBg` | Error checked bg | → `--colorError` | → `--colorError` |
| `--colorCheckboxErrorCheckedBorder` | Error checked border | → `--colorError` | → `--colorError` |
| `--colorCheckboxErrorCheckedIcon` | Error checked icon | `greyWhite` | `greyWhite` |

**Disabled State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorCheckboxDisabledBorder` | Disabled unchecked border | → `--colorReadonlyBorder` | → `--colorReadonlyBorder` |
| `--colorCheckboxDisabledBg` | Disabled unchecked bg | → `--colorDividerSubtle` | → `--colorDividerSubtle` |
| `--colorCheckboxDisabledCheckedBg` | Disabled checked bg | `grey350` | `grey550` |
| `--colorCheckboxDisabledCheckedBorder` | Disabled checked border | `grey350` | `grey550` |
| `--colorCheckboxDisabledCheckedIcon` | Disabled checked icon | → `--colorDisabledBorder` | → `--colorDisabledBorder` |

**Focus State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorCheckboxFocusRing` | Focus ring | → `--colorPrimaryRing` | → `--colorPrimaryRing` |
| `--colorCheckboxErrorFocusRing` | Error focus ring | → `--colorErrorBorder` | → `--colorErrorBorder` |

### Radio

Complete radio button state system.

**Base States (Unselected):**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorRadioBorder` | Default outer ring | `grey300` | `grey550` |
| `--colorRadioHoverBorder` | Hover outer ring | `grey450` | `grey500` |
| `--colorRadioHoverBg` | Hover background tint | `grey50` | `grey700` |

**Selected State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorRadioSelectedBorder` | Selected outer ring | → `--colorPrimary` | → `--colorPrimary` |
| `--colorRadioSelectedDot` | Selected inner dot | → `--colorPrimary` | → `--colorPrimary` |
| `--colorRadioSelectedHoverBorder` | Selected + hover ring | → `--colorPrimaryHover` | → `--colorPrimaryHover` |
| `--colorRadioSelectedHoverDot` | Selected + hover dot | → `--colorPrimaryHover` | → `--colorPrimaryHover` |

**Error State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorRadioErrorBorder` | Error unselected ring | → `--colorError` | → `--colorError` |
| `--colorRadioErrorSelectedBorder` | Error selected ring | → `--colorError` | → `--colorError` |
| `--colorRadioErrorSelectedDot` | Error selected dot | → `--colorError` | → `--colorError` |

**Disabled State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorRadioDisabledBorder` | Disabled unselected ring | → `--colorReadonlyBorder` | → `--colorReadonlyBorder` |
| `--colorRadioDisabledBg` | Disabled background | → `--colorDividerSubtle` | → `--colorDividerSubtle` |
| `--colorRadioDisabledSelectedBorder` | Disabled selected ring | `grey350` | `grey550` |
| `--colorRadioDisabledSelectedDot` | Disabled selected dot | `grey350` | `grey550` |

**Focus State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorRadioFocusRing` | Focus ring | → `--colorPrimaryRing` | → `--colorPrimaryRing` |
| `--colorRadioErrorFocusRing` | Error focus ring | → `--colorErrorBorder` | → `--colorErrorBorder` |

### Form Controls

| Token | Light | Dark |
|-------|-------|------|
| `--colorControlBorderSelector` | `grey200` | `grey500` |

### Radio Card

| Token | Light | Dark |
|-------|-------|------|
| `--colorRadioCardHoverBorder` | `purple200` | `purple700` |
| `--colorRadioCardHoverBg` | `purple50` | `purple950` |
| `--colorRadioCardActiveBorder` | `purple300` | `purple600` |
| `--colorRadioCardActiveBg` | → `--colorPrimarySubtle` | → `--colorPrimarySubtle` |

### Calendar

| Token | Light | Dark |
|-------|-------|------|
| `--colorCalSelectedBg` | → `--colorPrimary` | → `--colorPrimary` |
| `--colorCalSelectedText` | `greyWhite` | `greyWhite` |
| `--colorCalRangeBg` | → `--colorRadioCardHoverBg` | → `--colorRadioCardHoverBg` |
| `--colorCalRangeText` | `purple700` | `purple300` |
| `--colorCalHoverBg` | → `--colorRadioCardHoverBg` | → `--colorRadioCardHoverBg` |
| `--colorCalTodayText` | → `--colorLink` | → `--colorLink` |
| `--colorCalCellHoverBg` | `grey100` | `grey650` |

### Chip / Tag

Interactive chips (selectable, dismissible).

**Base States:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorChipBg` | Default background | `grey150` | `grey650` |
| `--colorChipText` | Default text | `grey700` | `grey200` |
| `--colorChipBorder` | Default border | → `--colorDisabledBorder` | → `--colorDisabledBorder` |
| `--colorChipHoverBg` | Hover background | → `--colorDisabledBorder` | → `--colorDisabledBorder` |
| `--colorChipActiveBg` | Pressed background | `grey250` | `grey550` |

**Selected State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorChipSelectedBg` | Selected background | → `--colorPrimarySubtle` | → `--colorPrimarySubtle` |
| `--colorChipSelectedText` | Selected text | `purple700` | `purple300` |
| `--colorChipSelectedBorder` | Selected border | → `--colorPrimaryRing` | → `--colorPrimaryRing` |

**Error State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorChipErrorBg` | Error background | → `--colorErrorSubtle` | → `--colorErrorSubtle` |
| `--colorChipErrorText` | Error text | → `--colorTextError` | → `--colorTextError` |
| `--colorChipErrorBorder` | Error border | → `--colorErrorBorder` | → `--colorErrorBorder` |

**Disabled State:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorChipDisabledBg` | Disabled background | → `--colorSurface` | → `--colorSurface` |
| `--colorChipDisabledText` | Disabled text | `grey300` | `grey500` |

**Dismiss Icon:**

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorChipCloseIcon` | Close icon | `grey500` | `grey400` |
| `--colorChipCloseIconHover` | Close icon hover | `grey700` | `grey200` |

### Badge — Solid (gradient fill + border)

Pattern: one token per role, e.g. `--colorBadgePurpleGradientFrom`, `--colorBadgePurpleGradientTo`, `--colorBadgePurpleBorder`, `--colorBadgePurpleText` (name the hue in camelCase: purple, green, etc.).

Background is `linear-gradient(0deg, gradientFrom, gradientTo)` with a `1px solid border`.

| Color | `gradientFrom` Light | `gradientTo` Light | `border` Light | `text` Light |
|-------|----------------------|--------------------|--------------:|-------------|
| purple | `purple200` | `purple100` | `purple200` | `purple800` |
| green (lime) | `lime200` | `lime100` | `lime200` | `green800` |
| blue | `blue200` | `blue100` | `blue200` | `blue800` |
| orange | `orange200` | `orange100` | `orange200` | `orange800` |
| pink | `red200` | `red100` | `red200` | `red800` |
| gray | `grey200` | `grey100` | `grey200` | `grey600` |

Dark solid/dot badges use **reduced intensity**: gradient stops are the `*A90` alpha tokens from the **`950` → `900`** step of each hue, with a solid **`900`** border (grey uses `grey800A90` → `grey700A90`, border `grey600`). Pink badge hues map to **red** primitives. Outline badges unchanged.

| Color | `gradientFrom` Dark | `gradientTo` Dark | `border` Dark | `text` Dark |
|-------|---------------------|-------------------|-------------:|------------|
| purple | `purple950A90` | `purple900A90` | `purple900` | `purple200` |
| green (lime) | `lime950A90` | `lime900A90` | `lime900` | `green200` |
| blue | `blue950A90` | `blue900A90` | `blue900` | `blue200` |
| orange | `orange950A90` | `orange900A90` | `orange900` | `orange200` |
| pink | `red950A90` | `red900A90` | `red900` | `red200` |
| gray | `grey800A90` | `grey700A90` | `grey600` | `grey200` |

Note: Dark badge gradients now reference the `*A90` alpha primitive tokens directly instead of inline `color-mix(...)` expressions.

### Badge — Outline

Pattern: `--colorBadge{Hue}OutlineColor` (e.g. `--colorBadgePurpleOutlineColor`).

| Color | Light | Dark |
|-------|-------|------|
| purple | `purple600` | `purple400` |
| green (lime) | `lime600` | `lime600` |
| blue | `blue600` | `blue600` |
| orange | `orange600` | `orange600` |
| pink | `red600` | `red600` |
| gray | `grey600` | `grey500` |

### Counter Badge (gradient fill + border)

Pattern: `--colorCounter{Hue}GradientFrom` / `GradientTo` / `Border` (e.g. `--colorCounterPinkGradientFrom`).

Background is `linear-gradient(0deg, gradientFrom, gradientTo)` with a `1px solid border`. Text is always `--colorOnPrimary` (white).

| Color | `gradientFrom` Light | `gradientTo` Light | `border` Light |
|-------|----------------------|--------------------|---------------|
| pink | `red500` | `red400` | `red500` |
| purple | `purple500` | `purple400` | `purple500` |
| blue | `blue500` | `blue400` | `blue500` |

| Color | `gradientFrom` Dark | `gradientTo` Dark | `border` Dark |
|-------|---------------------|-------------------|--------------|
| pink | `red950A90` | `red900A90` | `red900` |
| purple | `purple950A90` | `purple900A90` | `purple900` |
| blue | `blue950A90` | `blue900A90` | `blue900` |

### Toast

Floating notification tokens.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorToastBg` | Toast background | `grey750` | `grey200` |
| `--colorToastText` | Toast text | → `--colorInputBg` | → `--colorInputBg` |
| `--colorToastBorder` | Toast border | `grey600` | `grey300` |
| `--colorToastSuccessBg` | Success toast bg | → `--colorSuccess` | → `--colorSuccess` |
| `--colorToastSuccessText` | Success toast text | `greyWhite` | `greyWhite` |
| `--colorToastErrorBg` | Error toast bg | → `--colorError` | → `--colorError` |
| `--colorToastErrorText` | Error toast text | `greyWhite` | `greyWhite` |
| `--colorToastWarningBg` | Warning toast bg | → `--colorWarning` | → `--colorWarning` |
| `--colorToastWarningText` | Warning toast text | `greyWhite` | `greyWhite` |
| `--colorToastInfoBg` | Info toast bg | `purple600` | `purple600` |
| `--colorToastInfoText` | Info toast text | `greyWhite` | `greyWhite` |
| `--colorToastCloseIcon` | Close icon | `whiteA9` | `blackA8` |
| `--colorToastCloseIconHover` | Close icon hover | → `--colorInputBg` | → `--colorInputBg` |

Note: `--colorToastCloseIcon` previously used inline `rgba()` values. Now references alpha primitives. `--colorToastInfoBg` light/dark are both `purple600` (intentionally fixed, doesn't shift with theme) so kept as primitive reference rather than aliasing `--colorPrimary` which shifts to `purple500` in dark.

### Skeleton

Loading placeholder shimmer.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorSkeletonBg` | Base skeleton fill | → `--colorChipBg` | → `--colorChipBg` |
| `--colorSkeletonShimmer` | Shimmer gradient overlay | `whiteA7` | `whiteA1` |
| `--colorSkeletonBorder` | Skeleton border | → `--colorDisabledBorder` | → `--colorDisabledBorder` |

Note: `--colorSkeletonShimmer` previously used inline `rgba(255,255,255,0.5)` and `rgba(255,255,255,0.05)`. Now references `whiteA7` and `whiteA1`.

### Progress Bar

Linear progress indicator.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorProgressTrackBg` | Track background | → `--colorDivider` | → `--colorDivider` |
| `--colorProgressFillBg` | Fill progress | → `--colorPrimary` | → `--colorPrimary` |
| `--colorProgressSuccessBg` | Success state fill | → `--colorSuccess` | → `--colorSuccess` |
| `--colorProgressErrorBg` | Error state fill | `red600` | `red500` |
| `--colorProgressWarningBg` | Warning state fill | → `--colorWarning` | → `--colorWarning` |
| `--colorProgressText` | Label text | → `--colorReadonlyText` | → `--colorReadonlyText` |

### Link

Link state tokens.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--colorLink` | Default link | `purple600` | `purple400` |
| `--colorLinkHover` | Link hover | `purple700` | `purple300` |
| `--colorLinkActive` | Link pressed | `purple800` | `purple200` |
| `--colorLinkVisited` | Visited link | `purple700` | `purple500` |
| `--colorLinkDisabled` | Disabled link | `grey400` | `grey500` |

### Wizard

| Token | Light | Dark |
|-------|-------|------|
| `--colorWizardActiveBg` | `purple500` | `purple600` |
| `--colorWizardActiveText` | `grey50` | `greyWhite` |
| `--colorWizardActiveShadowTop` | `purple400` | `purple500` |
| `--colorWizardActiveShadowBottom` | `purple700` | `purple800` |
| `--colorWizardDoneBg` | `purple200` | `purple700` |
| `--colorWizardDoneText` | `purple600` | `purple300` |
| `--colorWizardUpcomingBorder` | `grey250` | `grey500` |
| `--colorWizardUpcomingText` | → `--colorTextDisabled` | → `--colorTextDisabled` |
| `--colorWizardConnectorDone` | `purple200` | `purple700` |
| `--colorWizardConnectorUpcoming` | `grey250` | `grey500` |

## Shadows (Semantic)

| Token | Light | Dark |
|-------|-------|------|
| `--shadowCard` | `var(--shadowMd)` | `var(--shadowMd)` |
| `--shadowDropdown` | `var(--shadowLg)` | `var(--shadowLg)` |
| `--shadowModal` | `var(--shadowXl)` | `var(--shadowXl)` |
| `--shadowSubtle` | `var(--shadowSm)` | `var(--shadowSm)` |
| `--shadowBtnInner` | `inset 0 1px 2px var(--whiteA4_28)` | `inset 0 1px 2px var(--whiteA3)` |
| `--shadowBtnHover` | `0 4px 8px var(--blackA08)` | `0 4px 8px var(--blackA5)` |
| `--shadowFocusRing` | `0 0 0 3px var(--colorPrimaryRing)` | same |
| `--shadowBtnSecondaryHover` | `inset 0 2px 4px var(--whiteA7_48)` | `inset 0 2px 4px var(--blackA4)` |

Note: Shadow tokens previously used inline `rgba()`. The exact 0.28 and 0.48 values are now covered by `--whiteA4_28` and `--whiteA7_48` in `colors-primitive.md` v1.1. All shadow tokens now fully resolved through primitives.

---

# Primitive additions — RESOLVED ✅

All alpha tokens previously flagged as missing are now present in `colors-primitive.md` v1.1:

| Token | Value | Status |
|-------|-------|--------|
| `--whiteA0_02` | `rgba(255, 255, 255, 0.02)` | ✅ Added in primitives v1.1 |
| `--whiteA4_28` | `rgba(255, 255, 255, 0.28)` | ✅ Added in primitives v1.1 |
| `--whiteA7_48` | `rgba(255, 255, 255, 0.48)` | ✅ Added in primitives v1.1 |

No raw `rgba()` literals remain in this file. All transparency values reference primitive tokens.

---

# Migration notes (v1 → v2)

Search-and-replace mapping for any code referencing the old tokens:

| Old token (v1) | New token (v2) | Notes |
|---|---|---|
| `--colorErrorText` | `--colorTextError` | Identical value, consolidated to `--colorText*` naming pattern |
| `--colorSuccessText` | `--colorTextSuccess` | Same reason |
| `--colorSwitchThumb` | `--colorSwitchThumbOn` | The "original" token had identical value to `--colorSwitchThumbOn` |

All other token names are unchanged. The value reorganisation (aliases pointing at globals) is invisible to consumers — components still reference the same token names and get the same rendered values.

---

# Verification

After applying v2, the following should be true:

1. No two semantic tokens with different names resolve to the same hex value unless one is an alias of the other (via `→ --otherToken`).
2. No `rgba()` literal appears as a value anywhere in this file. All transparency goes through alpha primitives.
3. `--colorSurface` has exactly one definition with consistent light/dark values.
4. Every component-level "primary purple" token (checkbox checked, radio selected, switch on, calendar selected, progress fill, etc.) resolves through `--colorPrimary` so a brand colour change automatically propagates.
5. Every component-level disabled-text and error-state token resolves through `--colorTextDisabled` / `--colorError` / `--colorErrorBorder` respectively.

Run a CSS lint pass to confirm.

---

**Maintainer:** Design System Team
**Last Review:** 2026-05-18
**Next Review:** 2026-08-18 (quarterly)
