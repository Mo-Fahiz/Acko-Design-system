import { forwardRef } from "react";
import { clsx } from "clsx";

export type TypographyVariant =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "display-sm"
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "label-lg"
  | "label-md"
  | "label-sm"
  | "caption"
  | "overline";

export type TypographyColor =
  | "primary"
  | "secondary"
  | "invert"
  | "brand"
  | "error"
  | "success"
  | "static";

export type TypographyWeight =
  | "regular"
  | "medium"
  | "semibold"
  | "bold";

export type TypographyAlign = "left" | "center" | "right";

export interface TypographyProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    "color" | "children"
  > {
  variant: TypographyVariant;
  as?: React.ElementType;
  color?: TypographyColor;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}

const DEFAULT_AS_MAP: Record<TypographyVariant, React.ElementType> = {
  "display-xl": "h1",
  "display-lg": "h1",
  "display-md": "h1",
  "display-sm": "h1",
  "heading-xl": "h2",
  "heading-lg": "h2",
  "heading-md": "h3",
  "heading-sm": "h3",
  "body-lg": "p",
  "body-md": "p",
  "body-sm": "p",
  "label-lg": "span",
  "label-md": "span",
  "label-sm": "span",
  caption: "span",
  overline: "span",
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant,
      as,
      color = "primary",
      weight,
      align,
      truncate,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const Component = as ?? DEFAULT_AS_MAP[variant];

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={clsx(
          "acko-text",
          `acko-text-${variant}`,
          `acko-text-color-${color}`,
          weight && `acko-text-weight-${weight}`,
          align && `acko-text-align-${align}`,
          truncate && "acko-text-truncate",
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";
