"use client";

import { forwardRef, type ReactNode } from "react";
import { clsx } from "clsx";

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: "underline" | "pill" | "enclosed";
  size?: "sm" | "md";
  fullWidth?: boolean;
  className?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      value,
      onChange,
      variant = "underline",
      size = "md",
      fullWidth = false,
      className,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={clsx("acko-tabs", className)}>
        <div
          role="tablist"
          className={clsx(
            "acko-tabs-list",
            `acko-tabs-list-${variant}`,
            fullWidth && "acko-tab-full-width"
          )}
        >
          {items.map((item) => {
            const isActive = value === item.value;
            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-disabled={item.disabled}
                disabled={item.disabled}
                onClick={() => !item.disabled && onChange(item.value)}
                className={clsx(
                  "acko-tab",
                  `acko-tab-${variant}`,
                  `acko-tab-${size}`,
                  isActive && `acko-tab-${variant}-active`,
                  item.disabled && "acko-tab-disabled"
                )}
              >
                {item.icon && (
                  <span className="acko-tab-icon" aria-hidden>
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";
