"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { clsx } from "clsx";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant: "primary" | "secondary" | "inverted" | "ghost" | "link" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconOnly?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size = "md",
      disabled,
      loading,
      iconLeft,
      iconRight,
      iconOnly,
      fullWidth,
      type = "button",
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        className={clsx(
          "acko-btn",
          `acko-btn-${variant}`,
          `acko-btn-${size}`,
          iconOnly && "acko-btn-icon-only",
          loading && "acko-btn-loading",
          isDisabled && "acko-btn-disabled",
          fullWidth && "acko-btn-full-width",
          className
        )}
        {...rest}
      >
        <span className="acko-btn-content">
          {iconLeft && (
            <span className="acko-btn-icon" aria-hidden="true">
              {iconLeft}
            </span>
          )}
          {iconOnly ? (
            <span className="sr-only">{children}</span>
          ) : (
            <span className="acko-btn-label">{children}</span>
          )}
          {iconRight && (
            <span className="acko-btn-icon" aria-hidden="true">
              {iconRight}
            </span>
          )}
        </span>
        {loading && (
          <>
            <span className="acko-btn-dots" aria-hidden="true">
              <span className="acko-btn-dot" />
              <span className="acko-btn-dot" />
              <span className="acko-btn-dot" />
            </span>
            <span className="sr-only">Loading, please wait</span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
