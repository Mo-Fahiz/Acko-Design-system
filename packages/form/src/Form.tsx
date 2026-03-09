"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { clsx } from "clsx";

/* ─── Types ─────────────────────────────────────── */

export type FormState = "idle" | "submitting" | "success" | "error";

export interface FormFieldError {
  message: string;
}

interface FormContextValue {
  state: FormState;
  errors: Record<string, FormFieldError>;
  setError: (name: string, error: FormFieldError | null) => void;
  clearErrors: () => void;
}

/* ─── Context ────────────────────────────────────── */

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = (): FormContextValue => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within a Form");
  return ctx;
};

/* ─── Form ───────────────────────────────────────── */

export interface FormProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
  children: ReactNode;
  className?: string;
  noValidate?: boolean;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ onSubmit, children, className, noValidate = true }, ref) => {
    const [state, setState] = useState<FormState>("idle");
    const [errors, setErrors] = useState<Record<string, FormFieldError>>({});

    const setError = useCallback(
      (name: string, error: FormFieldError | null) => {
        setErrors((prev) => {
          if (!error) {
            const next = { ...prev };
            delete next[name];
            return next;
          }
          return { ...prev, [name]: error };
        });
      },
      []
    );

    const clearErrors = useCallback(() => setErrors({}), []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (state === "submitting") return;
      setState("submitting");
      try {
        await onSubmit?.(e);
        setState("success");
      } catch {
        setState("error");
      }
    };

    return (
      <FormContext.Provider value={{ state, errors, setError, clearErrors }}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          noValidate={noValidate}
          aria-busy={state === "submitting"}
          className={clsx("acko-form", className)}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = "Form";

/* ─── FormItem ───────────────────────────────────── */

export interface FormItemProps {
  name: string;
  children: ReactNode;
  className?: string;
}

export const FormItem = ({ name, children, className }: FormItemProps) => {
  const { errors } = useFormContext();
  const error = errors[name];

  return (
    <div
      className={clsx(
        "acko-form-item",
        error && "acko-form-item-error",
        className
      )}
      data-name={name}
    >
      {children}
      {error && (
        <p role="alert" className="acko-form-error-text">
          {error.message}
        </p>
      )}
    </div>
  );
};

/* ─── FormLabel ──────────────────────────────────── */

export interface FormLabelProps {
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export const FormLabel = ({
  htmlFor,
  required,
  children,
  className,
}: FormLabelProps) => (
  <label htmlFor={htmlFor} className={clsx("acko-form-label", className)}>
    {children}
    {required && (
      <span className="acko-form-required" aria-hidden="true">
        {" "}*
      </span>
    )}
  </label>
);

/* ─── FormMessage ────────────────────────────────── */

export interface FormMessageProps {
  children?: ReactNode;
  className?: string;
}

export const FormMessage = ({ children, className }: FormMessageProps) => {
  if (!children) return null;
  return (
    <p className={clsx("acko-form-message", className)} role="alert">
      {children}
    </p>
  );
};
