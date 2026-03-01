import React from 'react';
import styles from './InputGroup.module.css';

export interface InputGroupProps {
  children: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  prefix,
  suffix,
  size = 'md',
  disabled = false,
  error = false,
  className = '',
}) => {
  const sizeClass =
    size === 'sm' ? styles.sizeSm : size === 'lg' ? styles.sizeLg : styles.sizeMd;

  const wrapperClasses = [
    styles.wrapper,
    sizeClass,
    error && styles.error,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {prefix && <div className={styles.prefix}>{prefix}</div>}
      <div className={styles.inputSlot}>{children}</div>
      {suffix && <div className={styles.suffix}>{suffix}</div>}
    </div>
  );
};

export default InputGroup;
