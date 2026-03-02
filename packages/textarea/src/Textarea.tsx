"use client";

import { forwardRef, useState, useId } from "react";
import { clsx } from "clsx";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  resize?: "vertical" | "horizontal" | "both" | "none";
  maxLength?: number;
  showCount?: boolean;
  state?: "default" | "error" | "success";
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      value = "",
      onChange,
      placeholder,
      rows = 4,
      resize = "vertical",
      maxLength,
      showCount = false,
      state = "default",
      helperText,
      errorText,
      disabled = false,
      required = false,
      className,
      id: propId,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const generatedId = useId();
    const id = propId ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const isError = state === "error";
    const isSuccess = state === "success";
    const currentLength = value.length;

    const describedBy = [
      isError && errorText ? errorId : null,
      !isError && helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    };

    const hasFooter = showCount || (isError && errorText) || (!isError && helperText);

    return (
      <div className={clsx("acko-textarea", className)}>
        {label && (
          <label
            htmlFor={id}
            className="acko-textarea-label"
          >
            {label}
            {required && (
              <span className="acko-textarea-required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          aria-required={required || undefined}
          aria-invalid={isError || undefined}
          aria-describedby={describedBy}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={clsx(
            "acko-textarea-el",
            `acko-textarea-resize-${resize}`,
            focused && "acko-textarea-focused",
            isError && "acko-textarea-error",
            isSuccess && "acko-textarea-success",
            disabled && "acko-textarea-disabled"
          )}
          {...rest}
        />
        {hasFooter && (
          <div className="acko-textarea-footer">
            <span>
              {isError && errorText && (
                <span id={errorId} className="acko-textarea-error-text" role="alert">
                  {errorText}
                </span>
              )}
              {!isError && helperText && (
                <span id={helperId} className="acko-textarea-helper-text">
                  {helperText}
                </span>
              )}
            </span>
            {showCount && maxLength != null && (
              <span className="acko-textarea-count" aria-live="polite">
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
