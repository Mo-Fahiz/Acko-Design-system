import { forwardRef } from "react";
import { clsx } from "clsx";

export interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "error";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      size = "md",
      color = "primary",
      showLabel,
      label,
      animated,
      className,
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        className={clsx("acko-progress", animated && "acko-progress-animated", className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        {(showLabel || label) && (
          <div className="acko-progress-label-wrapper">
            {label && (
              <span className="acko-progress-label">{label}</span>
            )}
            {showLabel && (
              <span className="acko-progress-label">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          className={clsx(
            "acko-progress-track",
            `acko-progress-track-${size}`
          )}
        >
          <div
            className={clsx(
              "acko-progress-bar",
              `acko-progress-bar-${color}`
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";
