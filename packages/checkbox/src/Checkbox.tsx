"use client";

import { forwardRef, useId, useCallback, type ReactNode } from "react";
import { clsx } from "clsx";

export interface CheckboxProps {
  label?: string;
  description?: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      label,
      description,
      checked,
      indeterminate = false,
      onChange,
      size = "md",
      disabled = false,
      error = false,
      className,
      ...rest
    },
    ref
  ) => {
    const id = useId();
    const descriptionId = description ? `${id}-desc` : undefined;
    const isIndeterminate = indeterminate && !checked;

    const inputRef = useCallback(
      (el: HTMLInputElement | null) => {
        if (el) el.indeterminate = isIndeterminate;
      },
      [isIndeterminate]
    );

    return (
      <label
        ref={ref}
        className={clsx(
          "acko-checkbox",
          `acko-checkbox-${size}`,
          checked && "acko-checkbox-checked",
          isIndeterminate && "acko-checkbox-indeterminate",
          disabled && "acko-checkbox-disabled",
          error && "acko-checkbox-error",
          className
        )}
        htmlFor={id}
        {...rest}
      >
        <input
          id={id}
          ref={inputRef}
          type="checkbox"
          className="acko-checkbox-native"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={descriptionId}
        />
        <span className="acko-checkbox-box" aria-hidden="true">
          <span
            className={clsx(
              "acko-checkbox-icon",
              (checked || isIndeterminate) && "acko-checkbox-icon-visible"
            )}
          >
            {isIndeterminate ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12h14" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </span>
        </span>
        {(label || description) && (
          <span className="acko-checkbox-label-content">
            {label && <span className="acko-checkbox-label-text">{label}</span>}
            {description && (
              <span id={descriptionId} className="acko-checkbox-description">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
