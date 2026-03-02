import { forwardRef } from "react";
import { clsx } from "clsx";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      required = false,
      disabled = false,
      size = "md",
      children,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <label
        ref={ref}
        className={clsx(
          "acko-label",
          size === "sm" && "acko-label-sm",
          size === "md" && "acko-label-md",
          disabled && "acko-label-disabled",
          className
        )}
        {...rest}
      >
        {children}
        {required && <span className="acko-label-required" aria-hidden="true">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";
