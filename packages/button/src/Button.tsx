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
        {iconLeft && (
          <span className="acko-btn-icon" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {children}
        {iconRight && (
          <span className="acko-btn-icon" aria-hidden="true">
            {iconRight}
          </span>
        )}
        {loading && (
          <>
            <span className="acko-btn-spinner" aria-hidden="true" />
            <span className="sr-only">Loading, please wait</span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
