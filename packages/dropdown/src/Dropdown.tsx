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
import { CheckboxRow } from "@acko/checkbox";
import { Drawer } from "@acko/drawer";

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
  mobileMode?: "sheet" | "inline";
  /** Force the bottom sheet open regardless of viewport — for preview/testing only */
  forceSheet?: boolean;
  size?: "sm" | "md" | "lg";
  state?: "default" | "error";
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  className?: string;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
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
      mobileMode,
      forceSheet = false,
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
    const [sheetOpen, setSheetOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [searchQuery, setSearchQuery] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const id = useId();
    const menuId = `${id}-menu`;
    const labelId = `${id}-label`;

    const isMobile = useIsMobile();
    const isMulti = variant === "multi";
    const isSearchable = variant === "searchable";
    const isGrouped = variant === "grouped";
    const isError = state === "error";

    const resolvedMobileMode = mobileMode ?? (isMulti ? "sheet" : "inline");
    const useSheet = forceSheet || (isMobile && resolvedMobileMode === "sheet");

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
      const handler = (e: MouseEvent | TouchEvent) => {
        const target = (e as TouchEvent).touches
          ? (e as TouchEvent).touches[0]?.target
          : (e as MouseEvent).target;
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(target as Node)
        ) {
          close();
        }
      };
      document.addEventListener("mousedown", handler as EventListener);
      document.addEventListener("touchstart", handler as EventListener);
      return () => {
        document.removeEventListener("mousedown", handler as EventListener);
        document.removeEventListener("touchstart", handler as EventListener);
      };
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
        setSheetOpen(false);
      }
    };

    const handleTriggerClick = () => {
      if (disabled) return;
      if (useSheet) {
        setSheetOpen(true);
      } else {
        setIsOpen(!isOpen);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (!isOpen && !useSheet) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else if (useSheet && !sheetOpen) {
            setSheetOpen(true);
          } else if (focusedIndex >= 0 && flatOptions[focusedIndex]) {
            handleSelect(flatOptions[focusedIndex].value);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen && !useSheet) {
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
          setSheetOpen(false);
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
      if (isMulti) {
        if (selectedValues.length === 0) {
          return (
            <span className="acko-dropdown-value acko-dropdown-placeholder">
              {placeholder}
            </span>
          );
        }
        const count = selectedValues.length;
        const firstLabel = options.find((o) => o.value === selectedValues[0])?.label ?? selectedValues[0];
        const secondLabel = options.find((o) => o.value === selectedValues[1])?.label ?? selectedValues[1];
        let text: string;
        if (count === 1) text = firstLabel;
        else if (count === 2) text = `${firstLabel}, ${secondLabel}`;
        else text = `${firstLabel}, ${secondLabel}, +${count - 2} more`;
        return <span className="acko-dropdown-value">{text}</span>;
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

    const renderSheetContent = () => {
      if (isMulti) {
        return (
          <div className="acko-dropdown-sheet-rows">
            {filteredOptions.map((option) => (
              <CheckboxRow
                key={option.value}
                label={option.label}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleSelect(option.value)}
              />
            ))}
          </div>
        );
      }
      return (
        <ul role="listbox" className="acko-dropdown-sheet-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {renderOptions(filteredOptions)}
        </ul>
      );
    };

    const showInlineMenu = isOpen && !useSheet;

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
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
          aria-expanded={isOpen || sheetOpen}
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
          onClick={handleTriggerClick}
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

        {showInlineMenu && isMulti && (
          <div
            id={menuId}
            role="group"
            aria-labelledby={labelId}
            className="acko-dropdown-menu acko-dropdown-menu-multi"
          >
            {filteredOptions.map((option) => (
              <CheckboxRow
                key={option.value}
                label={option.label}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleSelect(option.value)}
              />
            ))}
            {filteredOptions.length === 0 && (
              <span className="acko-dropdown-no-results">No options found</span>
            )}
          </div>
        )}

        {showInlineMenu && !isMulti && (
          <ul
            ref={menuRef}
            id={menuId}
            role="listbox"
            aria-labelledby={labelId}
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

        {sheetOpen && (
          <Drawer
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            side="bottom"
            size="sm"
            title={label}
          >
            {renderSheetContent()}
          </Drawer>
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
