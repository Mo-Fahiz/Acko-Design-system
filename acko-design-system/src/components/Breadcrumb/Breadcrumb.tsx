import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  maxItems,
  className,
}) => {
  const defaultSeparator = <ChevronRight size={14} aria-hidden />;
  const sep = separator ?? defaultSeparator;

  const shouldCollapse = maxItems != null && items.length > maxItems;
  const visibleItems: BreadcrumbItem[] = shouldCollapse
    ? [
        items[0],
        ...items.slice(-(maxItems - 1)),
      ]
    : items;
  const showEllipsis = shouldCollapse && items.length > maxItems;

  const renderItem = (item: BreadcrumbItem, isLast: boolean) => {
    const content = (
      <>
        {item.icon && <span className={styles.icon}>{item.icon}</span>}
        {item.label}
      </>
    );

    if (isLast) {
      return (
        <span className={styles.current} aria-current="page">
          {content}
        </span>
      );
    }

    if (item.href) {
      return (
        <a href={item.href} className={styles.link}>
          {content}
        </a>
      );
    }

    return <span className={styles.link}>{content}</span>;
  };

  const elements: React.ReactNode[] = [];
  visibleItems.forEach((item, i) => {
    if (showEllipsis && i === 1) {
      elements.push(
        <li key="ellipsis" className={styles.ellipsisItem} aria-hidden>
          <span className={styles.separator}>{sep}</span>
          <button type="button" className={styles.ellipsis} aria-label="Show more breadcrumb items">
            …
          </button>
        </li>
      );
    } else if (i > 0) {
      elements.push(
        <li key={`sep-${i}`} className={styles.separatorItem} aria-hidden>
          {sep}
        </li>
      );
    }
    elements.push(
      <li key={i}>
        {renderItem(item, i === visibleItems.length - 1)}
      </li>
    );
  });

  return (
    <nav aria-label="Breadcrumb" className={[styles.nav, className].filter(Boolean).join(' ')}>
      <ol className={styles.list}>
        {elements}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
