import React from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import styles from './Alert.module.css';

export interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const DEFAULT_ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
} as const;

export const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  children,
  icon,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const DefaultIcon = DEFAULT_ICONS[variant];

  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';

  const variantCapitalized = variant.charAt(0).toUpperCase() + variant.slice(1);

  const alertClasses = [
    styles.alert,
    styles[`alert${variantCapitalized}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconClasses = [
    styles.icon,
    styles[`icon${variantCapitalized}`],
  ]
    .filter(Boolean)
    .join(' ');

  const titleClasses = [
    styles.title,
    styles[`title${variantCapitalized}`],
  ]
    .filter(Boolean)
    .join(' ');

  const dismissClasses = [
    styles.dismiss,
    styles[`dismiss${variantCapitalized}`],
  ]
    .filter(Boolean)
    .join(' ');

  const iconContent = icon ?? <DefaultIcon size={20} aria-hidden />;

  return (
    <div className={alertClasses} role={role}>
      <span className={iconClasses} aria-hidden>
        {iconContent}
      </span>
      <div className={styles.content}>
        {title && <div className={titleClasses}>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
      {dismissible && onDismiss && (
        <button
          type="button"
          className={dismissClasses}
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X className={styles.dismissIcon} aria-hidden />
        </button>
      )}
    </div>
  );
};

export default Alert;
