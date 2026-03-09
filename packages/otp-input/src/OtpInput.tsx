"use client";

import {
  forwardRef,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { clsx } from "clsx";

export interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "numeric" | "alphanumeric";
  masked?: boolean;
  className?: string;
  "aria-label"?: string;
}

export const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      value,
      onChange,
      length = 6,
      disabled = false,
      error = false,
      size = "md",
      type = "numeric",
      masked = false,
      className,
      "aria-label": ariaLabel = "One-time password",
    },
    ref
  ) => {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const focusAt = (index: number) => {
      inputs.current[Math.min(Math.max(index, 0), length - 1)]?.focus();
    };

    const handleChange = (index: number, char: string) => {
      const isValid =
        type === "numeric" ? /^\d$/.test(char) : /^[a-zA-Z0-9]$/.test(char);
      if (!isValid && char !== "") return;

      const digits = value.split("");
      digits[index] = char.toUpperCase();
      const next = digits.join("").slice(0, length);
      onChange(next.padEnd(length, " ").trimEnd());

      if (char && index < length - 1) {
        focusAt(index + 1);
      }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (value[index]) {
          handleChange(index, "");
        } else if (index > 0) {
          focusAt(index - 1);
          handleChange(index - 1, "");
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        focusAt(index - 1);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        focusAt(index + 1);
        e.preventDefault();
      }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").slice(0, length);
      const filtered = pasted
        .split("")
        .filter((c) =>
          type === "numeric" ? /^\d$/.test(c) : /^[a-zA-Z0-9]$/.test(c)
        )
        .join("")
        .toUpperCase();
      onChange(filtered.padEnd(length, " ").trimEnd());
      focusAt(Math.min(filtered.length, length - 1));
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={clsx(
          "acko-otp",
          `acko-otp-${size}`,
          error && "acko-otp-error",
          disabled && "acko-otp-disabled",
          className
        )}
      >
        {Array.from({ length }).map((_, i) => {
          const char = value[i] ?? "";
          return (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type={masked ? "password" : "text"}
              inputMode={type === "numeric" ? "numeric" : "text"}
              pattern={type === "numeric" ? "[0-9]*" : "[a-zA-Z0-9]*"}
              maxLength={1}
              value={char.trim()}
              disabled={disabled}
              aria-label={`Digit ${i + 1} of ${length}`}
              className={clsx(
                "acko-otp-cell",
                char.trim() && "acko-otp-cell-filled",
                error && "acko-otp-cell-error"
              )}
              onChange={(e) => handleChange(i, e.target.value.slice(-1))}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              autoComplete={i === 0 ? "one-time-code" : "off"}
            />
          );
        })}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";
