import React from 'react';
import styles from './Field.module.css';

export interface FieldProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  label,
  required = false,
  helperText,
  errorText,
  disabled = false,
  htmlFor,
  className = '',
  children,
}) => {
  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ');

  const labelClasses = [
    styles.label,
    disabled && styles.labelDisabled,
  ]
    .filter(Boolean)
    .join(' ');

  const labelContent = (
    <>
      {label}
      {required && <span className={styles.required} aria-hidden>*</span>}
    </>
  );

  return (
    <div className={wrapperClasses}>
      {label && (
        htmlFor ? (
          <label htmlFor={htmlFor} className={labelClasses}>
            {labelContent}
          </label>
        ) : (
          <span className={labelClasses}>{labelContent}</span>
        )
      )}
      {children}
      {errorText && <span className={styles.error} role="alert">{errorText}</span>}
      {!errorText && helperText && (
        <span className={styles.helper}>{helperText}</span>
      )}
    </div>
  );
};

export default Field;
