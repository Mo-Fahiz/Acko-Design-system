"use client";

import { forwardRef, type ReactNode } from "react";
import { clsx } from "clsx";

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: "bar" | "circular" | "segmented";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "error";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  segments?: number;
  children?: ReactNode;
  className?: string;
}

const CIRCULAR_SIZES = { sm: 48, md: 64, lg: 96 } as const;
const CIRCULAR_STROKE = { sm: 3, md: 4, lg: 5 } as const;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      variant = "bar",
      size = "md",
      color = "primary",
      showLabel,
      label,
      animated,
      segments = 4,
      children,
      className,
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    if (variant === "circular") {
      const dim = CIRCULAR_SIZES[size];
      const stroke = CIRCULAR_STROKE[size];
      const radius = (dim - stroke) / 2;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percentage / 100) * circumference;

      return (
        <div
          ref={ref}
          className={clsx("acko-progress-circular", `acko-progress-circular-${size}`, className)}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          style={{ width: dim, height: dim }}
        >
          <svg width={dim} height={dim} className="acko-progress-circular-svg">
            <circle
              className="acko-progress-circular-track"
              cx={dim / 2}
              cy={dim / 2}
              r={radius}
              fill="none"
              strokeWidth={stroke}
            />
            <circle
              className={clsx("acko-progress-circular-bar", `acko-progress-circular-bar-${color}`)}
              cx={dim / 2}
              cy={dim / 2}
              r={radius}
              fill="none"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
            />
          </svg>
          {children && <div className="acko-progress-circular-content">{children}</div>}
          {!children && showLabel && (
            <div className="acko-progress-circular-content">
              <span className="acko-progress-circular-label">{Math.round(percentage)}%</span>
            </div>
          )}
        </div>
      );
    }

    if (variant === "segmented") {
      const filledSegments = Math.round((percentage / 100) * segments);
      return (
        <div
          ref={ref}
          className={clsx("acko-progress", className)}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        >
          {(showLabel || label) && (
            <div className="acko-progress-label-wrapper">
              {label && <span className="acko-progress-label">{label}</span>}
              {showLabel && <span className="acko-progress-label">{Math.round(percentage)}%</span>}
            </div>
          )}
          <div className={clsx("acko-progress-segmented", `acko-progress-track-${size}`)}>
            {Array.from({ length: segments }, (_, i) => (
              <div
                key={i}
                className={clsx(
                  "acko-progress-segment",
                  i < filledSegments && `acko-progress-segment-filled acko-progress-bar-${color}`
                )}
              />
            ))}
          </div>
        </div>
      );
    }

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
            {label && <span className="acko-progress-label">{label}</span>}
            {showLabel && <span className="acko-progress-label">{Math.round(percentage)}%</span>}
          </div>
        )}
        <div className={clsx("acko-progress-track", `acko-progress-track-${size}`)}>
          <div
            className={clsx("acko-progress-bar", `acko-progress-bar-${color}`)}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";
