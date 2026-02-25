import { type ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?: 'solid' | 'outline' | 'dot';
  color?: 'purple' | 'green' | 'blue' | 'orange' | 'pink' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  children: ReactNode;
}

export interface CounterBadgeProps {
  count: number;
  max?: number;
  color?: 'purple' | 'pink' | 'blue';
}

const colorClassMap = {
  solid: {
    purple: styles.solidPurple,
    green: styles.solidGreen,
    blue: styles.solidBlue,
    orange: styles.solidOrange,
    pink: styles.solidPink,
    gray: styles.solidGray,
  },
  outline: {
    purple: styles.outlinePurple,
    green: styles.outlineGreen,
    blue: styles.outlineBlue,
    orange: styles.outlineOrange,
    pink: styles.outlinePink,
    gray: styles.outlineGray,
  },
  dot: {
    purple: styles.dotPurple,
    green: styles.dotGreen,
    blue: styles.dotBlue,
    orange: styles.dotOrange,
    pink: styles.dotPink,
    gray: styles.dotGray,
  },
} as const;

export const Badge: React.FC<BadgeProps> = ({
  variant = 'solid',
  color = 'purple',
  size = 'md',
  removable = false,
  onRemove,
  children,
}) => {
  const classNames = [
    styles.badge,
    styles[size],
    colorClassMap[variant][color],
  ].join(' ');

  return (
    <span className={classNames}>
      {variant === 'dot' && <span className={styles.dot} aria-hidden="true" />}
      {children}
      {removable && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={onRemove}
          aria-label={`Remove ${typeof children === 'string' ? children : ''}`}
        >
          <X />
        </button>
      )}
    </span>
  );
};

export const CounterBadge: React.FC<CounterBadgeProps> = ({
  count,
  max = 99,
  color = 'purple',
}) => {
  const counterColorClass =
    color === 'pink' ? styles.counterPink : color === 'blue' ? styles.counterBlue : styles.counterPurple;

  const displayValue = count > max ? `${max}+` : String(count);

  return (
    <span className={[styles.counter, counterColorClass].join(' ')} aria-label={`${count} items`}>
      {displayValue}
    </span>
  );
};

export default Badge;
