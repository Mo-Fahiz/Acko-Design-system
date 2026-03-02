import { forwardRef, type ReactNode } from "react";
import { clsx } from "clsx";

export interface BadgeProps {
  variant?: "solid" | "outline" | "dot";
  color?: "purple" | "green" | "blue" | "orange" | "pink" | "gray";
  size?: "sm" | "md" | "lg";
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  children: ReactNode;
}

export interface CounterBadgeProps {
  count: number;
  max?: number;
  color?: "purple" | "pink" | "blue";
  className?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "solid",
      color = "purple",
      size = "md",
      removable = false,
      onRemove,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "acko-badge",
          `acko-badge-${size}`,
          `acko-badge-${variant}-${color}`,
          className
        )}
        {...rest}
      >
        {variant === "dot" && (
          <span className="acko-badge-dot" aria-hidden="true" />
        )}
        {children}
        {removable && (
          <button
            type="button"
            className="acko-badge-remove"
            onClick={onRemove}
            aria-label={`Remove ${typeof children === "string" ? children : ""}`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export const CounterBadge = forwardRef<HTMLSpanElement, CounterBadgeProps>(
  ({ count, max = 99, color = "purple", className, ...rest }, ref) => {
    const displayValue = count > max ? `${max}+` : String(count);

    return (
      <span
        ref={ref}
        className={clsx(
          "acko-counter-badge",
          `acko-counter-badge-${color}`,
          className
        )}
        aria-label={`${count} items`}
        {...rest}
      >
        {displayValue}
      </span>
    );
  }
);

CounterBadge.displayName = "CounterBadge";
