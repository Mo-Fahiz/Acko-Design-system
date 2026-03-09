"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { clsx } from "clsx";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  dismissible?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      size = "md",
      dismissible = true,
      children,
      footer,
      className,
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;
      const prev = document.activeElement as HTMLElement | null;
      dialogRef.current?.focus();
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

    const handleBackdropClick = () => {
      if (dismissible) onClose();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape" && dismissible) onClose();
    };

    if (!open) return null;

    return (
      <div
        className="acko-dialog-backdrop"
        aria-hidden="true"
        onClick={handleBackdropClick}
      >
        <div
          ref={(node) => {
            dialogRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "acko-dialog-title" : undefined}
          aria-describedby={description ? "acko-dialog-desc" : undefined}
          tabIndex={-1}
          className={clsx(
            "acko-dialog",
            `acko-dialog-${size}`,
            className
          )}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          <div className="acko-dialog-header">
            {title && (
              <h2 id="acko-dialog-title" className="acko-dialog-title">
                {title}
              </h2>
            )}
            {description && (
              <p id="acko-dialog-desc" className="acko-dialog-description">
                {description}
              </p>
            )}
            {dismissible && (
              <button
                type="button"
                className="acko-dialog-close"
                onClick={onClose}
                aria-label="Close dialog"
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
          <div className="acko-dialog-body">{children}</div>
          {footer && <div className="acko-dialog-footer">{footer}</div>}
        </div>
      </div>
    );
  }
);

Dialog.displayName = "Dialog";
