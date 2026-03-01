import React, { useId } from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  state?: 'default' | 'error' | 'success';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  errorText,
  state = 'default',
  resize = 'vertical',
  fullWidth = false,
  onChange,
  disabled = false,
  className = '',
  id: propId,
  ...rest
}) => {
  const generatedId = useId();
  const id = propId ?? generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const isError = state === 'error';
  const isSuccess = state === 'success';

  const textareaClasses = [
    styles.textarea,
    styles[`resize${resize.charAt(0).toUpperCase() + resize.slice(1)}`],
    fullWidth && styles.fullWidth,
    isError && styles.error,
    isSuccess && styles.success,
    disabled && styles.disabled,
    className,
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
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={textareaClasses}
        disabled={disabled}
        aria-invalid={isError || undefined}
        aria-describedby={describedBy}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        {...rest}
      />
      {isError && errorText && (
        <span id={errorId} className={styles.errorText} role="alert">
          {errorText}
        </span>
      )}
      {!isError && helperText && (
        <span id={helperId} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Textarea;
