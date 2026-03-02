"use client";

import { createContext, forwardRef, useCallback, useContext, useState, type ReactNode } from "react";
import { clsx } from "clsx";

export interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export interface ToggleGroupProps {
  type: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

export interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed,
      onPressedChange,
      variant = "default",
      size = "md",
      disabled = false,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const isControlled = pressed !== undefined;
    const [internalPressed, setInternalPressed] = useState(false);
    const isPressed = isControlled ? pressed : internalPressed;

    const handleClick = useCallback(() => {
      if (disabled) return;
      const next = !isPressed;
      if (!isControlled) setInternalPressed(next);
      onPressedChange?.(next);
    }, [disabled, isPressed, isControlled, onPressedChange]);

    return (
      <button
        ref={ref}
        type="button"
        role="button"
        aria-pressed={isPressed}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        className={clsx(
          "acko-toggle",
          `acko-toggle-${variant}`,
          `acko-toggle-${size}`,
          isPressed && "acko-toggle-pressed",
          disabled && "acko-toggle-disabled",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

const ToggleGroupContext = createContext<{
  type: "single" | "multiple";
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  variant: "default" | "outline";
  size: "sm" | "md" | "lg";
} | null>(null);

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      type,
      value,
      onValueChange,
      variant = "default",
      size = "md",
      children,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string | string[]>(
      type === "single" ? "" : []
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleValueChange = useCallback(
      (newValue: string | string[]) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    return (
      <ToggleGroupContext.Provider
        value={{
          type,
          value: currentValue,
          onValueChange: handleValueChange,
          variant,
          size,
        }}
      >
        <div
          ref={ref}
          className={clsx("acko-toggle-group", className)}
          role="group"
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, disabled = false, children, className, ...rest }, ref) => {
    const ctx = useContext(ToggleGroupContext);
    if (!ctx) {
      throw new Error("ToggleGroupItem must be used within ToggleGroup");
    }

    const { type, value: groupValue, onValueChange, variant, size } = ctx;
    const isPressed =
      type === "single"
        ? groupValue === value
        : Array.isArray(groupValue) && groupValue.includes(value);

    const handleClick = useCallback(() => {
      if (disabled) return;

      if (type === "single") {
        const next = isPressed ? "" : value;
        onValueChange(next);
      } else {
        const arr = Array.isArray(groupValue) ? [...groupValue] : [];
        const idx = arr.indexOf(value);
        if (idx >= 0) {
          arr.splice(idx, 1);
        } else {
          arr.push(value);
        }
        onValueChange(arr);
      }
    }, [type, value, isPressed, groupValue, onValueChange, disabled]);

    return (
      <button
        ref={ref}
        type="button"
        role="button"
        aria-pressed={isPressed}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        className={clsx(
          "acko-toggle",
          `acko-toggle-${variant}`,
          `acko-toggle-${size}`,
          isPressed && "acko-toggle-pressed",
          disabled && "acko-toggle-disabled",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";
