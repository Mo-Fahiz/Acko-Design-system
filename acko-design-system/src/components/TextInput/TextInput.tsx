import { type ReactNode, useState, useId } from 'react';
import { Check } from 'lucide-react';
import styles from './TextInput.module.css';

export interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number';
  state?: 'default' | 'error' | 'success';
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  prefix?: string;
  suffix?: string;
  maxLength?: number;
  autoComplete?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  size = 'md',
  type = 'text',
  state = 'default',
  helperText,
  errorText,
  disabled = false,
  readOnly = false,
  required = false,
  iconLeft,
  iconRight,
  prefix,
  suffix,
  maxLength,
  autoComplete,
}) => {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const isError = state === 'error';
  const isSuccess = state === 'success';
  const isFilled = value.length > 0;

  const wrapperSizeClass =
    size === 'sm' ? styles.inputWrapperSm : size === 'lg' ? styles.inputWrapperLg : styles.inputWrapperMd;

  const inputSizeClass =
    size === 'sm' ? styles.inputSm : size === 'lg' ? styles.inputLg : styles.inputMd;

  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

  const inputWrapperClasses = [
    styles.inputWrapper,
    wrapperSizeClass,
    focused && styles.focused,
    isFilled && !focused && styles.filled,
    isError && styles.error,
    isSuccess && styles.success,
    disabled && styles.disabled,
    readOnly && styles.readOnly,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    styles.label,
    focused && !isError && !isSuccess && styles.labelFocused,
    isError && styles.labelError,
    isSuccess && styles.labelSuccess,
    disabled && styles.labelDisabled,
  ]
    .filter(Boolean)
    .join(' ');

  const describedBy = [
    isError && errorText ? errorId : null,
    helperText ? helperId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && <span className={styles.required} aria-hidden="true">*</span>}
      </label>

      <div className={inputWrapperClasses}>
        {iconLeft && <span className={styles.iconLeft} aria-hidden="true">{iconLeft}</span>}
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          id={id}
          type={type}
          className={[styles.input, inputSizeClass].join(' ')}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
          aria-required={required || undefined}
          aria-invalid={isError || undefined}
          aria-describedby={describedBy}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
        {iconRight && !isSuccess && <span className={styles.iconRight} aria-hidden="true">{iconRight}</span>}
        {isSuccess && (
          <span className={styles.successIcon} aria-hidden="true">
            <Check size={iconSize} strokeWidth={2.5} />
          </span>
        )}
      </div>

      {isError && errorText && (
        <span id={errorId} className={styles.errorText} role="alert">{errorText}</span>
      )}
      {!isError && helperText && (
        <span id={helperId} className={styles.helperText}>{helperText}</span>
      )}
      {maxLength && (
        <span className={styles.charCount}>{value.length}/{maxLength}</span>
      )}
    </div>
  );
};

export default TextInput;
