import { forwardRef } from "react";
import { clsx } from "clsx";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  label?: string;
  className?: string;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = "horizontal",
      decorative = true,
      label,
      className,
    },
    ref
  ) => {
    const hasLabel = Boolean(label);

    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={!decorative ? orientation : undefined}
        className={clsx(
          "acko-separator",
          orientation === "horizontal" && "acko-separator-horizontal",
          orientation === "vertical" && "acko-separator-vertical",
          hasLabel && "acko-separator-with-label",
          className
        )}
      >
        {hasLabel ? (
          <>
            <span className="acko-separator-line" aria-hidden="true" />
            <span className="acko-separator-label-text">{label}</span>
            <span className="acko-separator-line" aria-hidden="true" />
          </>
        ) : null}
      </div>
    );
  }
);

Separator.displayName = "Separator";
