"use client";

import { forwardRef, useId, useCallback, type ReactNode } from "react";
import { clsx } from "clsx";

export interface CheckboxRowOption {
  value: string;
  label: string;
  description?: string;
}

export interface CheckboxRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export interface CheckboxGroupProps {
  label: string;
  options: CheckboxRowOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
  className?: string;
}

export const CheckboxRow = forwardRef<HTMLLabelElement, CheckboxRowProps>(
  (
    {
      label,
      description,
      checked,
      onChange,
      error = false,
      indeterminate = false,
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
          "acko-cb-row",
          checked && "acko-cb-row-checked",
          isIndeterminate && "acko-cb-row-indeterminate",
          error && "acko-cb-row-error",
          className
        )}
        htmlFor={id}
        {...rest}
      >
        <span className="acko-cb-row-content">
          <span className="acko-cb-row-label">{label}</span>
          {description && (
            <span id={descriptionId} className="acko-cb-row-description">
              {description}
            </span>
          )}
        </span>

        <input
          id={id}
          ref={inputRef}
          type="checkbox"
          className="acko-checkbox-native"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
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
      </label>
    );
  }
);

CheckboxRow.displayName = "CheckboxRow";

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      error = false,
      className,
      ...rest
    },
    ref
  ) => {
    const groupId = useId();
    const labelId = `${groupId}-label`;

    const handleToggle = (optionValue: string) => {
      const next = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(next);
    };

    return (
      <div
        ref={ref}
        className={clsx("acko-cb-list", className)}
        role="group"
        aria-labelledby={labelId}
        {...rest}
      >
        {label && <span id={labelId} className="acko-cb-list-label">{label}</span>}
        {options.map((option) => (
          <CheckboxRow
            key={option.value}
            label={option.label}
            description={option.description}
            checked={value.includes(option.value)}
            onChange={() => handleToggle(option.value)}
            error={error}
          />
        ))}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";
