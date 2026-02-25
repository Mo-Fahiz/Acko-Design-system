import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconOnly?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'md',
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  iconOnly = false,
  fullWidth = false,
  type = 'button',
  onClick,
  children,
  className,
  ...rest
}) => {
  const classNames = [
    styles.btn,
    styles[variant],
    styles[size],
    iconOnly && styles.iconOnly,
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {iconLeft && <span className={styles.icon} aria-hidden="true">{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles.icon} aria-hidden="true">{iconRight}</span>}
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {loading && <span className="sr-only">Loading, please wait</span>}
    </button>
  );
};

export default Button;
