import { forwardRef, useId } from "react";
import { clsx } from "clsx";

export interface FieldProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      label,
      required = false,
      helperText,
      errorText,
      disabled = false,
      htmlFor,
      className,
      children,
    },
    ref
  ) => {
    const descId = useId();
    const helperOrErrorId = helperText || errorText ? descId : undefined;

    return (
      <div
        ref={ref}
        className={clsx("acko-field", className)}
      >
        {label && (
          <label
            htmlFor={htmlFor}
            className={clsx(
              "acko-field-label",
              disabled && "acko-field-label-disabled"
            )}
          >
            {label}
            {required && <span className="acko-field-required" aria-hidden="true">*</span>}
          </label>
        )}
        {children}
        {helperText && !errorText && (
          <span
            id={helperOrErrorId}
            className="acko-field-helper"
          >
            {helperText}
          </span>
        )}
        {errorText && (
          <span
            id={helperOrErrorId}
            className="acko-field-error"
            role="alert"
          >
            {errorText}
          </span>
        )}
      </div>
    );
  }
);

Field.displayName = "Field";
