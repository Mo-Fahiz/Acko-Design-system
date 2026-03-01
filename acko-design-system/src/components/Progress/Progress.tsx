import React from 'react';
import styles from './Progress.module.css';

export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'error';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  animated = false,
  className,
}) => {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = max > 0 ? (clampedValue / max) * 100 : 0;

  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  }[size];

  const colorClass = {
    primary: styles.colorPrimary,
    success: styles.colorSuccess,
    error: styles.colorError,
  }[color];

  const displayLabel = label ?? `${Math.round(percentage)}%`;

  const classNames = [styles.root, className].filter(Boolean).join(' ');
  const trackClassNames = [styles.track, sizeClass].filter(Boolean).join(' ');
  const barClassNames = [
    styles.bar,
    colorClass,
    animated && styles.animated,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="progressbar" aria-valuenow={clampedValue} aria-valuemin={0} aria-valuemax={max}>
      {showLabel && (
        <div className={styles.labelWrapper}>
          <span />
          <span className={`${styles.label} ${styles.labelRight}`}>
            {displayLabel}
          </span>
        </div>
      )}
      <div className={trackClassNames}>
        <div
          className={barClassNames}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
