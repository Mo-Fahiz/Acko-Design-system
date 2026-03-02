"use client";

import { forwardRef, useId, useCallback } from "react";
import { clsx } from "clsx";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  label?: string;
  id?: string;
  name?: string;
  className?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      disabled = false,
      size = "md",
      label,
      id: idProp,
      name,
      className,
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const isControlled = checked !== undefined;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked);
      },
      [onChange]
    );

    return (
      <label
        htmlFor={id}
        className={clsx(
          "acko-switch",
          size === "sm" && "acko-switch-sm",
          size === "md" && "acko-switch-md",
          (isControlled ? checked : defaultChecked) && "acko-switch-checked",
          disabled && "acko-switch-disabled",
          className
        )}
      >
        <input
          id={id}
          ref={ref}
          type="checkbox"
          role="switch"
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          disabled={disabled}
          name={name}
          className="acko-switch-native"
          aria-checked={isControlled ? checked : undefined}
        />
        <span className={clsx("acko-switch-track", `acko-switch-track-${size}`)}>
          <span className={clsx("acko-switch-thumb", `acko-switch-thumb-${size}`)} />
        </span>
        {label && (
          <span className="acko-switch-label" id={`${id}-label`}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";
