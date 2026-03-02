import { forwardRef } from "react";
import { clsx } from "clsx";

export interface ScrollAreaProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
  className?: string;
  orientation?: "vertical" | "horizontal" | "both";
  maxHeight?: string | number;
  maxWidth?: string | number;
  style?: React.CSSProperties;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      children,
      className,
      orientation = "vertical",
      maxHeight,
      maxWidth,
      style,
      ...rest
    },
    ref
  ) => {
    const resolvedStyle: React.CSSProperties = {
      ...style,
      ...(maxHeight != null && {
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
      }),
      ...(maxWidth != null && {
        maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
      }),
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "acko-scroll-area",
          `acko-scroll-area-${orientation}`,
          className
        )}
        style={resolvedStyle}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";
