"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

export interface InputGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "prefix" | "suffix"> {
  children: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  (
    {
      children,
      prefix,
      suffix,
      size = "md",
      disabled = false,
      error = false,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "acko-input-group",
          `acko-input-group-${size}`,
          error && "acko-input-group-error",
          disabled && "acko-input-group-disabled",
          className
        )}
        {...rest}
      >
        {prefix && (
          <span className="acko-input-group-prefix" aria-hidden="true">
            {prefix}
          </span>
        )}
        <div className={`acko-input-group-inner acko-input-group-inner-${size}`}>
          {children}
        </div>
        {suffix && (
          <span className="acko-input-group-suffix" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";
