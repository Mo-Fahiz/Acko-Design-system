"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { clsx } from "clsx";

export type DrawerSide = "left" | "right" | "bottom" | "top";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: "sm" | "md" | "lg" | "full";
  title?: string;
  description?: string;
  dismissible?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      side = "right",
      size = "md",
      title,
      description,
      dismissible = true,
      children,
      footer,
      className,
    },
    ref
  ) => {
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;
      const prev = document.activeElement as HTMLElement | null;
      drawerRef.current?.focus();
      return () => {
        prev?.focus();
      };
    }, [open]);

    useEffect(() => {
      if (!open) return;
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }, [open]);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape" && dismissible) onClose();
    };

    return (
      <div
        className={clsx("acko-drawer-root", open && "acko-drawer-open")}
        aria-hidden={!open}
      >
        <div
          className="acko-drawer-backdrop"
          aria-hidden="true"
          onClick={dismissible ? onClose : undefined}
        />
        <div
          ref={(node) => {
            drawerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "acko-drawer-title" : undefined}
          aria-describedby={description ? "acko-drawer-desc" : undefined}
          tabIndex={-1}
          className={clsx(
            "acko-drawer",
            `acko-drawer-${side}`,
            `acko-drawer-size-${size}`,
            className
          )}
          onKeyDown={handleKeyDown}
        >
          <div className="acko-drawer-header">
            {(title || description) && (
              <div className="acko-drawer-heading">
                {title && (
                  <h2 id="acko-drawer-title" className="acko-drawer-title">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="acko-drawer-desc" className="acko-drawer-description">
                    {description}
                  </p>
                )}
              </div>
            )}
            {dismissible && (
              <button
                type="button"
                className="acko-drawer-close"
                onClick={onClose}
                aria-label="Close drawer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className="acko-drawer-body">{children}</div>
          {footer && <div className="acko-drawer-footer">{footer}</div>}
        </div>
      </div>
    );
  }
);

Drawer.displayName = "Drawer";
