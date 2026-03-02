import { forwardRef } from "react";
import { clsx } from "clsx";

export interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  animation?: "pulse" | "wave" | "none";
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      width,
      height,
      lines = 1,
      className,
      animation = "pulse",
    },
    ref
  ) => {
    const style: React.CSSProperties = {};
    if (width !== undefined)
      style.width = typeof width === "number" ? `${width}px` : width;
    if (height !== undefined)
      style.height = typeof height === "number" ? `${height}px` : height;

    if (lines > 1) {
      return (
        <div
          ref={ref}
          className={clsx("acko-skeleton-lines", className)}
          style={style}
        >
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                "acko-skeleton",
                "acko-skeleton-text",
                animation !== "none" && `acko-skeleton-${animation}`
              )}
              style={
                i === lines - 1 ? { width: "75%" } : undefined
              }
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(
          "acko-skeleton",
          `acko-skeleton-${variant}`,
          animation !== "none" && `acko-skeleton-${animation}`,
          className
        )}
        style={style}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
