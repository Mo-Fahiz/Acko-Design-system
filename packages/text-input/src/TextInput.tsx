"use client";

import { forwardRef, useState, useId, type ReactNode } from "react";
import { clsx } from "clsx";

export interface TextInputProps {
  id?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  type?: "text" | "email" | "password" | "tel" | "url" | "search" | "number";
  state?: "default" | "error" | "success";
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  prefix?: string;
  suffix?: string;
  maxLength?: number;
  autoComplete?: string;
  className?: string;
}

export const TextInput = forwardRef<HTMLDivElement, TextInputProps>(
  (
    {
      id: propId,
      label,
      placeholder,
      value,
      onChange,
      size = "md",
      type = "text",
      state = "default",
      helperText,
      errorText,
      disabled = false,
      readOnly = false,
      required = false,
      iconLeft,
      iconRight,
      prefix,
      suffix,
      maxLength,
      autoComplete,
      className,
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
    const isFilled = value.length > 0;

    const describedBy = [
      isError && errorText ? errorId : null,
      !isError && helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div
        ref={ref}
        className={clsx("acko-text-input", className)}
        {...rest}
      >
        <label
          htmlFor={id}
          className={clsx(
            "acko-text-input-label",
            focused && "acko-text-input-label-focused",
            isError && "acko-text-input-label-error",
            disabled && "acko-text-input-label-disabled"
          )}
        >
          {label}
          {required && (
            <span className="acko-text-input-required" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <div
          className={clsx(
            "acko-text-input-wrapper",
            `acko-text-input-wrapper-${size}`,
            focused && "acko-text-input-focused",
            isFilled && !focused && "acko-text-input-filled",
            isError && "acko-text-input-error",
            isSuccess && "acko-text-input-success",
            disabled && "acko-text-input-disabled",
            readOnly && "acko-text-input-readonly"
          )}
        >
          {iconLeft && (
            <span className="acko-text-input-icon-left" aria-hidden="true">
              {iconLeft}
            </span>
          )}
          {prefix && <span className="acko-text-input-prefix">{prefix}</span>}
          <input
            id={id}
            type={type}
            className={clsx("acko-text-input-el", `acko-text-input-el-${size}`)}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            maxLength={maxLength}
            autoComplete={autoComplete}
            aria-required={required || undefined}
            aria-invalid={isError || undefined}
            aria-describedby={describedBy}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {suffix && <span className="acko-text-input-suffix">{suffix}</span>}
          {iconRight && !isSuccess && (
            <span className="acko-text-input-icon-right" aria-hidden="true">
              {iconRight}
            </span>
          )}
          {isSuccess && (
            <span className="acko-text-input-success-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
          )}
        </div>

        {isError && errorText && (
          <span id={errorId} className="acko-text-input-error-text" role="alert">
            {errorText}
          </span>
        )}
        {!isError && helperText && (
          <span id={helperId} className="acko-text-input-helper-text">
            {helperText}
          </span>
        )}
        {maxLength != null && (
          <span className="acko-text-input-char-count">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
