# Typography — Flutter

> Map each `variant` to `TextStyle` from theme matching [`../typography-base.md`](../typography-base.md) and [`../../global.md`](../../global.md) type scale.

## Weight mapping

| Base spec weight | Flutter `FontWeight` |
|-----------------|---------------------|
| `regular` (400) | `FontWeight.w400` |
| `medium` (500) | `FontWeight.w500` |
| `semibold` (600) | `FontWeight.w600` |
| `bold` (700) | `FontWeight.w700` |

### Figma parity

- `um_text_bold` → `FontWeight.w700` (true bold)
- `um_text_semibold` → `FontWeight.w600`

## Color mapping

Map `color` prop values to `Theme.colorScheme` or custom `AckoColors` extension:

| Color intent | Flutter mapping |
|-------------|----------------|
| `primary` | `colorScheme.onSurface` |
| `secondary` | `AckoColors.textSecondary` |
| `brand` | `colorScheme.primary` |
| `error` | `colorScheme.error` |
| `invert` | `colorScheme.onPrimary` |

## References

- [`../typography-base.md`](../typography-base.md)
- [`../../global.md`](../../global.md)
