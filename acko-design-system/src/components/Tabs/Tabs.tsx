import React, { useCallback, useRef } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'underline' | 'pill' | 'enclosed';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  className = '',
}) => {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

      e.preventDefault();
      const enabledItems = items.filter((item) => !item.disabled);
      const currentEnabledIndex = enabledItems.findIndex((item) => item.value === value);
      let nextIndex: number;

      if (e.key === 'ArrowRight') {
        nextIndex = currentEnabledIndex < enabledItems.length - 1 ? currentEnabledIndex + 1 : 0;
      } else {
        nextIndex = currentEnabledIndex > 0 ? currentEnabledIndex - 1 : enabledItems.length - 1;
      }

      const nextItem = enabledItems[nextIndex];
      if (nextItem) {
        onChange(nextItem.value);
        const nextButton = tabListRef.current?.querySelector(
          `[data-tab-value="${nextItem.value}"]`
        ) as HTMLButtonElement | null;
        nextButton?.focus();
      }
    },
    [items, value, onChange]
  );

  const variantCapitalized = variant.charAt(0).toUpperCase() + variant.slice(1);
  const tabListClasses = [
    styles.tabList,
    styles[`tabList${variantCapitalized}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getTabClasses = (item: TabItem, isActive: boolean) => {
    const base = styles[`tab${variantCapitalized}`];
    const sizeClass = size === 'sm' ? styles.tabSm : '';
    const activeClass = isActive ? styles[`tab${variantCapitalized}Active`] : '';
    const fullWidthClass = fullWidth ? styles.tabFullWidth : '';
    const disabledClass = item.disabled ? styles.tabDisabled : '';
    return [base, sizeClass, activeClass, fullWidthClass, disabledClass]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div
      ref={tabListRef}
      className={tabListClasses}
      role="tablist"
      aria-label="Tabs"
    >
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={item.disabled}
            disabled={item.disabled}
            data-tab-value={item.value}
            className={getTabClasses(item, isActive)}
            onClick={() => !item.disabled && onChange(item.value)}
            onKeyDown={handleKeyDown}
          >
            {item.icon && <span className={styles.tabIcon}>{item.icon}</span>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
