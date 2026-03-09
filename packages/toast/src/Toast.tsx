"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { clsx } from "clsx";

export type ToastVariant = "info" | "success" | "warning" | "error";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title?: string;
  description?: string;
  duration?: number;
  dismissible?: boolean;
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  toast: (options: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS: Record<ToastVariant, ReactNode> = {
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" />
    </svg>
  ),
};

interface ToastNodeProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastNode = ({ toast, onDismiss }: ToastNodeProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const duration = toast.duration ?? 4000;

  useEffect(() => {
    if (duration === Infinity) return;
    timerRef.current = setTimeout(() => onDismiss(toast.id), duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.id, duration, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx("acko-toast", `acko-toast-${toast.variant}`)}
    >
      <span className="acko-toast-icon">{ICONS[toast.variant]}</span>
      <div className="acko-toast-content">
        {toast.title && <div className="acko-toast-title">{toast.title}</div>}
        {toast.description && (
          <div className="acko-toast-description">{toast.description}</div>
        )}
        {toast.action && (
          <button
            type="button"
            className="acko-toast-action"
            onClick={toast.action.onClick}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      {toast.dismissible !== false && (
        <button
          type="button"
          className="acko-toast-dismiss"
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss notification"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export const ToastProvider = ({
  children,
  position = "top-right",
  maxToasts = 5,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(
    (options: Omit<ToastItem, "id">): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => {
        const next = [...prev, { ...options, id }];
        return next.slice(-maxToasts);
      });
      return id;
    },
    [maxToasts]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      <div
        className={clsx(
          "acko-toast-region",
          `acko-toast-region-${position}`
        )}
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastNode key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};
