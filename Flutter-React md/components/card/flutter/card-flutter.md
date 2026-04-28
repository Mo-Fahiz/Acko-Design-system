# Card — Flutter

> Match [`../card-base.md`](../card-base.md). Use a `Card`-like container widget.

## Property mapping

| Base spec | Flutter implementation |
|-----------|-----------------------|
| `variant` (`default` / `secondary` / `elevated` / `outline` / `demoted`) | Mapped to elevation, border, and background colour via theme |
| `padding` (`none` / `sm` / `md` / `lg`) | `EdgeInsets` matching `--card-content-gutter` breakpoint values |
| `CardHeader` | Compose as a `Row` child with leading icon + title, bottom `Divider` |
| `CardContent` | Body widget(s) — no vertical padding by default |
| `CardFooter` | `Row` with `MainAxisAlignment.end`, top `Divider` |
| `CardInset` | Nested `Container` with `--radius-card-nested` (12/16) and demoted-bg fill |

## Geometry

| Breakpoint | Outer radius | Inner margin | Nested radius |
|-----------|-------------|-------------|---------------|
| Narrow (< 769px) | 32 | 12 | 12 |
| Wide (769px+) | 32 | 16 | 16 |

Use `MediaQuery` or `LayoutBuilder` to select narrow/wide values.

## References

- [`../card-base.md`](../card-base.md)
- [`../../global.md`](../../global.md)
