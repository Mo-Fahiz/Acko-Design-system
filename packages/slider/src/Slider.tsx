"use client";

import {
  forwardRef,
  useCallback,
  useRef,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { clsx } from "clsx";

/**
 * Slider — range input with gradient track/fill and branded thumb.
 * Consumer must import `@acko/css/slider.css` (after tokens + theme). Visuals use semantic
 * tokens: `--color-slider-*`, `--slider-thumb-size-*`, `--shadow-slider-thumb`.
 */
export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  showTicks?: boolean;
  /** Track 4px / 6px / 8px; thumb diameter 16px / 20px / 24px via `--slider-thumb-size-*` */
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      showValue = false,
      showTicks = false,
      size = "md",
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
    },
    ref
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const clampAndSnap = useCallback(
      (raw: number): number => {
        const snapped = Math.round((raw - min) / step) * step + min;
        return Math.min(max, Math.max(min, snapped));
      },
      [min, max, step]
    );

    const getValueFromPointer = useCallback(
      (clientX: number): number => {
        const track = trackRef.current;
        if (!track) return value;
        const { left, width } = track.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (clientX - left) / width));
        return clampAndSnap(min + ratio * (max - min));
      },
      [min, max, clampAndSnap, value]
    );

    const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      isDragging.current = true;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      onChange(getValueFromPointer(e.clientX));
    };

    const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDragging.current || disabled) return;
      onChange(getValueFromPointer(e.clientX));
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const delta = step;
      const bigDelta = (max - min) / 10;
      let next = value;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = clampAndSnap(value + delta);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = clampAndSnap(value - delta);
          break;
        case "PageUp":
          next = clampAndSnap(value + bigDelta);
          break;
        case "PageDown":
          next = clampAndSnap(value - bigDelta);
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      onChange(next);
    };

    const percent = ((value - min) / (max - min)) * 100;

    const ticks =
      showTicks && step > 0
        ? Array.from(
            { length: Math.floor((max - min) / step) + 1 },
            (_, i) => min + i * step
          )
        : [];

    return (
      <div
        ref={ref}
        className={clsx(
          "acko-slider",
          `acko-slider-${size}`,
          disabled && "acko-slider-disabled",
          className
        )}
      >
        <div
          ref={trackRef}
          className="acko-slider-track"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className="acko-slider-fill"
            style={{ width: `${percent}%` }}
          />
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-disabled={disabled || undefined}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            className="acko-slider-thumb"
            style={{ left: `${percent}%` }}
            onKeyDown={handleKeyDown}
          />
        </div>
        {showTicks && ticks.length > 0 && (
          <div className="acko-slider-ticks" aria-hidden="true">
            {ticks.map((tick) => (
              <span
                key={tick}
                className={clsx(
                  "acko-slider-tick",
                  tick <= value && "acko-slider-tick-filled"
                )}
                style={{
                  left: `${((tick - min) / (max - min)) * 100}%`,
                }}
              />
            ))}
          </div>
        )}
        {showValue && (
          <div className="acko-slider-value" aria-hidden="true">
            {value}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
