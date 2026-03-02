"use client";

import { forwardRef, useId, type ReactNode } from "react";
import { clsx } from "clsx";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "card";
  disabled?: boolean;
  error?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      size = "md",
      variant = "default",
      disabled = false,
      error = false,
      orientation = "vertical",
      className,
      ...rest
    },
    ref
  ) => {
    const groupId = useId();
    const labelId = `${groupId}-label`;
    const isCard = variant === "card";

    return (
      <div
        ref={ref}
        className={clsx("acko-radio-group", `acko-radio-${size}`, className)}
        role="radiogroup"
        aria-labelledby={labelId}
        {...rest}
      >
        <span id={labelId} className="acko-radio-group-label">
          {label}
        </span>
        <div
          className={clsx(
            "acko-radio-options",
            `acko-radio-${orientation}`
          )}
        >
          {options.map((option) => {
            const optionId = `${groupId}-${option.value}`;
            const isSelected = value === option.value;
            const isDisabled = disabled || option.disabled;

            return (
              <label
                key={option.value}
                className={clsx(
                  isCard ? "acko-radio-card-item" : "acko-radio-item",
                  isSelected && "acko-radio-item-selected",
                  isDisabled && "acko-radio-item-disabled",
                  error && "acko-radio-error"
                )}
                htmlFor={optionId}
              >
                <input
                  id={optionId}
                  type="radio"
                  className="acko-radio-native"
                  name={groupId}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => onChange(option.value)}
                  disabled={isDisabled}
                />
                <span className="acko-radio-circle" aria-hidden="true">
                  {isSelected && <span className="acko-radio-dot" />}
                </span>
                <span className="acko-radio-label-content">
                  <span className="acko-radio-label-text">{option.label}</span>
                  {option.description && (
                    <span className="acko-radio-description">
                      {option.description}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
