import React from 'react';
import styles from './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  required = false,
  disabled = false,
  size = 'md',
  children,
  className,
  ...rest
}) => {
  const classNames = [
    styles.label,
    styles[size],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label
      className={classNames}
      aria-required={required || undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
      {required && <span className={styles.required} aria-hidden> *</span>}
    </label>
  );
};

export default Label;
