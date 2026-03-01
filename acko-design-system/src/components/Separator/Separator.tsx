import React from 'react';
import styles from './Separator.module.css';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  className?: string;
  label?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  decorative = false,
  className,
  label,
}) => {
  const classNames = [
    styles.separator,
    styles[orientation],
    label && styles.withLabel,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (label) {
    return (
      <div
        className={classNames}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        aria-label={decorative ? undefined : label}
      >
        <span className={styles.line} aria-hidden />
        <span className={styles.label}>{label}</span>
        <span className={styles.line} aria-hidden />
      </div>
    );
  }

  return (
    <div
      className={classNames}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={!decorative ? orientation : undefined}
    />
  );
};

export default Separator;
