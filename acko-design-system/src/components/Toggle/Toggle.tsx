import React, { createContext, useContext, useCallback, useState } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface ToggleGroupProps {
  type: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ToggleGroupContextValue {
  type: 'single' | 'multiple';
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  variant: 'default' | 'outline';
  size: 'sm' | 'md' | 'lg';
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

export const Toggle: React.FC<ToggleProps> = ({
  pressed = false,
  onPressedChange,
  variant = 'default',
  size = 'md',
  disabled = false,
  children,
  className = '',
}) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onPressedChange?.(!pressed);
  }, [disabled, pressed, onPressedChange]);

  const classNames = [
    styles.toggle,
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    pressed && styles.pressed,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="button"
      aria-pressed={pressed}
      aria-disabled={disabled}
      disabled={disabled}
      className={classNames}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  type,
  value: controlledValue,
  onValueChange,
  variant = 'default',
  size = 'md',
  children,
  className = '',
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
    type === 'single' ? '' : []
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const handleValueChange = useCallback(
    (next: string | string[]) => {
      if (!isControlled) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const contextValue: ToggleGroupContextValue = {
    type,
    value,
    onValueChange: handleValueChange,
    variant,
    size,
  };

  const groupClasses = [styles.toggleGroup, className].filter(Boolean).join(' ');

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div role="group" className={groupClasses}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
};

export const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({
  value: itemValue,
  disabled = false,
  children,
  className = '',
}) => {
  const context = useContext(ToggleGroupContext);
  if (!context) {
    throw new Error('ToggleGroupItem must be used within ToggleGroup');
  }

  const { type, value, onValueChange, variant, size } = context;
  const isPressed =
    type === 'single'
      ? value === itemValue
      : (value as string[]).includes(itemValue);

  const handleClick = useCallback(() => {
    if (disabled) return;

    if (type === 'single') {
      onValueChange(isPressed ? '' : itemValue);
    } else {
      const current = value as string[];
      const next = isPressed
        ? current.filter((v) => v !== itemValue)
        : [...current, itemValue];
      onValueChange(next);
    }
  }, [disabled, type, value, itemValue, isPressed, onValueChange]);

  const classNames = [
    styles.toggle,
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    isPressed && styles.pressed,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="button"
      aria-pressed={isPressed}
      aria-disabled={disabled}
      disabled={disabled}
      data-value={itemValue}
      className={classNames}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
