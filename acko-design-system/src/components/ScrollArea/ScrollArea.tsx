import React from 'react';
import styles from './ScrollArea.module.css';

export interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';
  maxHeight?: string | number;
  maxWidth?: string | number;
  style?: React.CSSProperties;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className = '',
  orientation = 'vertical',
  maxHeight,
  maxWidth,
  style,
}) => {
  const orientationClass =
    orientation === 'horizontal'
      ? styles.horizontal
      : orientation === 'both'
        ? styles.both
        : styles.vertical;

  const classes = [styles.root, orientationClass, className].filter(Boolean).join(' ');

  const inlineStyle: React.CSSProperties = {
    ...style,
    maxHeight: maxHeight != null ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : undefined,
    maxWidth: maxWidth != null ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : undefined,
  };

  return (
    <div className={classes} style={inlineStyle}>
      {children}
    </div>
  );
};

export default ScrollArea;
