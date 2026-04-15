# Avatar — Base specification (platform-agnostic)

> **Purpose:** User or entity image, **initials**, or **fallback** icon; **sizes** `xs`–`xl`; **shapes** `circle` | `square`. **CSS:** `packages/css/src/avatar.css`.

---

## 1. What it is

**Avatar** displays `src` image with **alt**; or **initials**; or placeholder icon. Broken image falls back to initials or icon per props.

---

## 2. Playground parity

Source: `AvatarPreview` / `AvatarUsage` in `apps/playground/src/App.tsx`.

| Section | Intent |
|---------|--------|
| Image — all sizes | xs→xl with photo |
| Initials — all sizes | xs→xl |
| Fallback icon | No image, no initials |
| Image error → initials | Broken URL + initials |
| Image error → icon | No initials |
| Shapes | Circle vs square, image and fallback |

---

## 3. Implementation checklist

- [ ] Size map to pixel dimensions in CSS.
- [ ] `alt` text for accessibility.
