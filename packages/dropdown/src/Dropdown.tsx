"use client";

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
  type ReactNode,
} from "react";
import { clsx } from "clsx";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  group?: string;
}

export interface DropdownProps {
  label: string;
  placeholder?: string;
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  variant?: "single" | "multi" | "searchable" | "grouped";
  size?: "sm" | "md" | "lg";
  state?: "default" | "error";
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  className?: string;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      label,
      placeholder = "Select an option",
      options,
      value,
      onChange,
      variant = "single",
      size = "md",
      state = "default",
      disabled = false,
      required = false,
      helperText,
      errorText,
      className,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [searchQuery, setSearchQuery] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const id = useId();
    const menuId = `${id}-menu`;
    const labelId = `${id}-label`;

    const isMulti = variant === "multi";
    const isSearchable = variant === "searchable";
    const isGrouped = variant === "grouped";
    const isError = state === "error";

    const selectedValues = Array.isArray(value)
      ? value
      : value
        ? [value]
        : [];

    const filteredOptions =
      isSearchable && searchQuery
        ? options.filter((o) =>
            o.label.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : options;

    const groupedOptions = isGrouped
      ? filteredOptions.reduce<Record<string, DropdownOption[]>>((acc, opt) => {
          const group = opt.group || "Other";
          if (!acc[group]) acc[group] = [];
          acc[group].push(opt);
          return acc;
        }, {})
      : null;

    const flatOptions = filteredOptions.filter((o) => !o.disabled);

    const close = useCallback(() => {
      setIsOpen(false);
      setFocusedIndex(-1);
      setSearchQuery("");
      triggerRef.current?.focus();
    }, []);

    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          close();
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, close]);

    useEffect(() => {
      if (isOpen && isSearchable) {
        searchRef.current?.focus();
      }
    }, [isOpen, isSearchable]);

    const handleSelect = (optionValue: string) => {
      if (isMulti) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue];
        onChange(newValues);
      } else {
        onChange(optionValue);
        close();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else if (focusedIndex >= 0 && flatOptions[focusedIndex]) {
            handleSelect(flatOptions[focusedIndex].value);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex((prev) =>
              Math.min(prev + 1, flatOptions.length - 1)
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusedIndex(flatOptions.length - 1);
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    };

    useEffect(() => {
      if (focusedIndex >= 0 && menuRef.current) {
        const focused = menuRef.current.querySelector(
          `[data-index="${focusedIndex}"]`
        ) as HTMLElement;
        focused?.scrollIntoView({ block: "nearest" });
      }
    }, [focusedIndex]);

    const hasFilled = selectedValues.length > 0;

    const getDisplayValue = () => {
      if (isMulti && selectedValues.length > 0) {
        return (
          <span className="acko-dropdown-tags">
            {selectedValues.map((v) => {
              const opt = options.find((o) => o.value === v);
              return (
                <span key={v} className="acko-dropdown-tag">
                  {opt?.label || v}
                  <button
                    type="button"
                    className="acko-dropdown-tag-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(v);
                    }}
                    aria-label={`Remove ${opt?.label || v}`}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              );
            })}
          </span>
        );
      }

      const selected = options.find((o) => o.value === value);
      if (selected) {
        return (
          <span className="acko-dropdown-value">{selected.label}</span>
        );
      }
      return (
        <span className="acko-dropdown-value acko-dropdown-placeholder">
          {placeholder}
        </span>
      );
    };

    const renderOptions = (opts: DropdownOption[]) =>
      opts.map((option) => {
        const flatIndex = flatOptions.findIndex(
          (o) => o.value === option.value
        );
        const isSelected = selectedValues.includes(option.value);
        const isFocused = focusedIndex === flatIndex;

        return (
          <li
            key={option.value}
            role="option"
            aria-selected={isSelected}
            aria-disabled={option.disabled || undefined}
            data-index={flatIndex}
            className={clsx(
              "acko-dropdown-option",
              isSelected && "acko-dropdown-option-selected",
              isFocused && "acko-dropdown-option-focused",
              option.disabled && "acko-dropdown-option-disabled"
            )}
            onClick={() => {
              if (!option.disabled) handleSelect(option.value);
            }}
            onMouseEnter={() => {
              if (!option.disabled && flatIndex >= 0)
                setFocusedIndex(flatIndex);
            }}
          >
            {option.icon && (
              <span className="acko-dropdown-option-icon">{option.icon}</span>
            )}
            {option.label}
            {isSelected && (
              <span className="acko-dropdown-option-check">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
            )}
          </li>
        );
      });

    return (
      <div
        ref={ref}
        className={clsx("acko-dropdown", className)}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <span
          id={labelId}
          className={clsx(
            "acko-dropdown-label",
            isOpen && "acko-dropdown-label-open"
          )}
        >
          {label}
          {required && (
            <span className="acko-dropdown-required" aria-hidden="true">
              *
            </span>
          )}
        </span>

        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? menuId : undefined}
          aria-labelledby={labelId}
          className={clsx(
            "acko-dropdown-trigger",
            `acko-dropdown-trigger-${size}`,
            isOpen && "acko-dropdown-trigger-open",
            isError && "acko-dropdown-trigger-error",
            hasFilled && "acko-dropdown-trigger-filled"
          )}
          disabled={disabled}
          onClick={() => {
            if (!disabled) setIsOpen(!isOpen);
          }}
        >
          {getDisplayValue()}
          <span
            className={clsx(
              "acko-dropdown-chevron",
              isOpen && "acko-dropdown-chevron-open"
            )}
            aria-hidden="true"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            ref={menuRef}
            id={menuId}
            role="listbox"
            aria-labelledby={labelId}
            aria-multiselectable={isMulti || undefined}
            className="acko-dropdown-menu"
          >
            {isSearchable && (
              <li className="acko-dropdown-search-wrapper" role="presentation">
                <input
                  ref={searchRef}
                  className="acko-dropdown-search"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setFocusedIndex(0);
                  }}
                  aria-label="Search options"
                />
              </li>
            )}
            {groupedOptions
              ? Object.entries(groupedOptions).map(([group, opts]) => (
                  <li key={group} role="presentation">
                    <div className="acko-dropdown-group-header">{group}</div>
                    <ul
                      role="group"
                      aria-label={group}
                      style={{ listStyle: "none", padding: 0 }}
                    >
                      {renderOptions(opts)}
                    </ul>
                  </li>
                ))
              : renderOptions(filteredOptions)}
            {filteredOptions.length === 0 && (
              <li className="acko-dropdown-no-results" role="presentation">
                No options found
              </li>
            )}
          </ul>
        )}

        {isError && errorText && (
          <span className="acko-dropdown-error-text" role="alert">
            {errorText}
          </span>
        )}
        {!isError && helperText && (
          <span className="acko-dropdown-helper-text">{helperText}</span>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
