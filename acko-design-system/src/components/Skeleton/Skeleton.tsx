import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

const toCssValue = (v: string | number): string =>
  typeof v === 'number' ? `${v}px` : v;

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
  animation = 'pulse',
}) => {
  const baseClass = styles.skeleton;
  const variantClass = styles[variant];
  const animClass = animation === 'none' ? '' : styles[animation];

  const style: React.CSSProperties = {};
  if (width !== undefined) style.width = toCssValue(width);
  if (height !== undefined) style.height = toCssValue(height);

  if (variant === 'text' && lines > 1) {
    return (
      <div
        className={`${styles.lines} ${className}`.trim()}
        aria-hidden="true"
        role="presentation"
      >
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${styles.line} ${i === lines - 1 ? styles.lineLast : ''} ${animation === 'pulse' ? styles.linePulse : animation === 'wave' ? styles.lineWave : ''}`.trim()}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={`${baseClass} ${variantClass} ${animClass} ${className}`.trim()}
      style={style}
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default Skeleton;
