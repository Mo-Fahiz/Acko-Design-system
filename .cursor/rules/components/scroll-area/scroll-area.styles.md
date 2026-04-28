---
description: ScrollArea visual spec — CSS classes, orientation, and scrollbar styling
globs: "**/scroll-area/**,**/ScrollArea/**"
---

# ScrollArea — Styles

CSS file: `@acko/css/scroll-area.css`

## CSS Classes

### Structure
- `.acko-scroll-area` — smooth scroll, thin scrollbar, semantic colors

### Orientation (via `.acko-scroll-area-{vertical|horizontal|both}`)
| Orientation | Overflow |
|-------------|----------|
| vertical | overflow-y: auto; overflow-x: hidden |
| horizontal | overflow-x: auto; overflow-y: hidden |
| both | overflow: auto |

### Scrollbar (design tokens)
- Firefox: scrollbar-width: thin; scrollbar-color: var(--color-primary-muted) transparent
- WebKit: width/height 6px, thumb var(--color-primary-muted), thumb:hover var(--color-primary), border-radius var(--radius-full)
