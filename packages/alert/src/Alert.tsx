"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

const InfoIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const SuccessIcon = () => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const WarningIcon = () => (
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
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

const ErrorIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
);

const DEFAULT_ICONS = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
} as const;

export interface AlertProps {
  variant: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant,
      title,
      children,
      icon,
      dismissible,
      onDismiss,
      className,
    },
    ref
  ) => {
    const displayIcon = icon ?? DEFAULT_ICONS[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={clsx(
          "acko-alert",
          `acko-alert-${variant}`,
          className
        )}
      >
        <span className="acko-alert-icon" aria-hidden="true">
          {displayIcon}
        </span>
        <div className="acko-alert-content">
          {title && (
            <div className="acko-alert-title">{title}</div>
          )}
          <div className="acko-alert-body">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            type="button"
            className="acko-alert-dismiss"
            onClick={onDismiss}
            aria-label="Dismiss alert"
          >
            <svg
              width="16"
              height="16"
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
    );
  }
);

Alert.displayName = "Alert";
