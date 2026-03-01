import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  delayMs?: number;
  children: React.ReactElement;
  className?: string;
}

const TOOLTIP_ID_PREFIX = 'acko-tooltip-';
let tooltipIdCounter = 0;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = 'top',
  align = 'center',
  delayMs = 300,
  children,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipIdRef = useRef<string | null>(null);

  if (!tooltipIdRef.current) {
    tooltipIdRef.current = `${TOOLTIP_ID_PREFIX}${++tooltipIdCounter}`;
  }
  const tooltipId = tooltipIdRef.current;

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delayMs);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const sideClass = {
    top: styles.sideTop,
    bottom: styles.sideBottom,
    left: styles.sideLeft,
    right: styles.sideRight,
  }[side];

  const alignClass = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
  }[align];

  const tooltipClassNames = [
    styles.tooltip,
    sideClass,
    alignClass,
    visible && styles.visible,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClassNames = [styles.wrapper, className].filter(Boolean).join(' ');

  type TriggerProps = {
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
  };
  const childProps = (children as React.ReactElement<TriggerProps>).props;

  const triggerProps: TriggerProps & { 'aria-describedby'?: string } = {
    onMouseEnter: (e) => {
      childProps.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: (e) => {
      childProps.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e) => {
      childProps.onFocus?.(e);
      show();
    },
    onBlur: (e) => {
      childProps.onBlur?.(e);
      hide();
    },
    'aria-describedby': visible ? tooltipId : undefined,
  };

  return (
    <span className={wrapperClassNames}>
      {React.cloneElement(children as React.ReactElement<TriggerProps>, triggerProps)}
      <div
        id={tooltipId}
        role="tooltip"
        className={tooltipClassNames}
        aria-hidden={!visible}
      >
        {content}
        <span className={styles.arrow} aria-hidden />
      </div>
    </span>
  );
};

export default Tooltip;
