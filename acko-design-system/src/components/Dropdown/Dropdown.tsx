import { type ReactNode, useState, useRef, useEffect, useId, useCallback } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import styles from './Dropdown.module.css';

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
  variant?: 'single' | 'multi' | 'searchable' | 'grouped';
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'error';
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  errorText?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  variant = 'single',
  size = 'md',
  state = 'default',
  disabled = false,
  required = false,
  helperText,
  errorText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const menuId = `${id}-menu`;
  const labelId = `${id}-label`;

  const isMulti = variant === 'multi';
  const isSearchable = variant === 'searchable';
  const isGrouped = variant === 'grouped';
  const isError = state === 'error';

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  const filteredOptions = isSearchable && searchQuery
    ? options.filter((o) => o.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  const groupedOptions = isGrouped
    ? filteredOptions.reduce<Record<string, DropdownOption[]>>((acc, opt) => {
        const group = opt.group || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(opt);
        return acc;
      }, {})
    : null;

  const flatOptions = filteredOptions.filter((o) => !o.disabled);

  const close = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
    setSearchQuery('');
    triggerRef.current?.focus();
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, close]);

  // Focus search input when menu opens
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
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0 && flatOptions[focusedIndex]) {
          handleSelect(flatOptions[focusedIndex].value);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => Math.min(prev + 1, flatOptions.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(flatOptions.length - 1);
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
    }
  };

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && menuRef.current) {
      const focused = menuRef.current.querySelector(`[data-index="${focusedIndex}"]`) as HTMLElement;
      focused?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  const triggerSizeClass =
    size === 'sm' ? styles.triggerSm : size === 'lg' ? styles.triggerLg : styles.triggerMd;

  const hasFilled = selectedValues.length > 0;

  const triggerClasses = [
    styles.trigger,
    triggerSizeClass,
    isOpen && styles.triggerOpen,
    isError && styles.triggerError,
    hasFilled && styles.triggerFilled,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    styles.label,
    isOpen && styles.labelOpen,
    isError && styles.labelError,
  ]
    .filter(Boolean)
    .join(' ');

  const getDisplayValue = () => {
    if (isMulti && selectedValues.length > 0) {
      return (
        <span className={styles.selectedTags}>
          {selectedValues.map((v) => {
            const opt = options.find((o) => o.value === v);
            return (
              <span key={v} className={styles.selectedTag}>
                {opt?.label || v}
                <button
                  type="button"
                  className={styles.tagRemove}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(v);
                  }}
                  aria-label={`Remove ${opt?.label || v}`}
                >
                  <X size={10} />
                </button>
              </span>
            );
          })}
        </span>
      );
    }

    const selected = options.find((o) => o.value === value);
    if (selected) {
      return <span className={styles.triggerValue}>{selected.label}</span>;
    }
    return <span className={[styles.triggerValue, styles.triggerPlaceholder].join(' ')}>{placeholder}</span>;
  };

  const renderOptions = (opts: DropdownOption[]) =>
    opts.map((option) => {
      const flatIndex = flatOptions.findIndex((o) => o.value === option.value);
      const isSelected = selectedValues.includes(option.value);
      const isFocused = focusedIndex === flatIndex;

      return (
        <li
          key={option.value}
          role="option"
          aria-selected={isSelected}
          aria-disabled={option.disabled || undefined}
          data-index={flatIndex}
          className={[
            styles.option,
            isSelected && styles.optionSelected,
            isFocused && styles.optionFocused,
            option.disabled && styles.optionDisabled,
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => {
            if (!option.disabled) handleSelect(option.value);
          }}
        >
          {option.icon && <span className={styles.optionIcon}>{option.icon}</span>}
          {option.label}
          {isSelected && <span className={styles.optionCheck}><Check size={16} /></span>}
        </li>
      );
    });

  return (
    <div className={styles.wrapper} ref={wrapperRef} onKeyDown={handleKeyDown}>
      <span id={labelId} className={labelClasses}>
        {label}
        {required && <span className={styles.required} aria-hidden="true">*</span>}
      </span>

      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? menuId : undefined}
        aria-labelledby={labelId}
        className={triggerClasses}
        disabled={disabled}
        onClick={() => { if (!disabled) setIsOpen(!isOpen); }}
      >
        {getDisplayValue()}
        <span className={[styles.chevron, isOpen && styles.chevronOpen].filter(Boolean).join(' ')} aria-hidden="true">
          <ChevronDown size={18} />
        </span>
      </button>

      {isOpen && (
        <ul
          ref={menuRef}
          id={menuId}
          role="listbox"
          aria-labelledby={labelId}
          aria-multiselectable={isMulti || undefined}
          className={styles.menu}
        >
          {isSearchable && (
            <li className={styles.searchWrapper} role="presentation">
              <input
                ref={searchRef}
                className={styles.searchInput}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setFocusedIndex(0); }}
                aria-label="Search options"
              />
            </li>
          )}
          {groupedOptions
            ? Object.entries(groupedOptions).map(([group, opts]) => (
                <li key={group} role="presentation">
                  <div className={styles.groupHeader}>{group}</div>
                  <ul role="group" aria-label={group} style={{ listStyle: 'none', padding: 0 }}>
                    {renderOptions(opts)}
                  </ul>
                </li>
              ))
            : renderOptions(filteredOptions)}
          {filteredOptions.length === 0 && (
            <li className={styles.noResults} role="presentation">No options found</li>
          )}
        </ul>
      )}

      {isError && errorText && (
        <span className={styles.errorText} role="alert">{errorText}</span>
      )}
      {!isError && helperText && (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default Dropdown;
