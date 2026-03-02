import { forwardRef, type ReactNode } from "react";
import { clsx } from "clsx";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
  className?: string;
}

const DefaultSeparator = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 4l4 4-4 4" />
  </svg>
);

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, maxItems, className, ...rest }, ref) => {
    const sep = separator ?? <DefaultSeparator />;

    const shouldCollapse = maxItems != null && items.length > maxItems;
    const visibleItems = shouldCollapse
      ? [items[0], ...items.slice(-(maxItems! - 1))]
      : items;
    const showEllipsis = shouldCollapse;

    const elements: ReactNode[] = [];

    visibleItems.forEach((item, i) => {
      const isLast = i === visibleItems.length - 1;

      if (showEllipsis && i === 1) {
        elements.push(
          <li key="ellipsis" className="acko-breadcrumb-ellipsis-item" aria-hidden>
            <span className="acko-breadcrumb-separator">{sep}</span>
            <button
              type="button"
              className="acko-breadcrumb-ellipsis"
              aria-label="Show more breadcrumb items"
            >
              &hellip;
            </button>
          </li>
        );
      }

      if (i > 0) {
        elements.push(
          <li key={`sep-${i}`} className="acko-breadcrumb-separator-item" aria-hidden>
            {sep}
          </li>
        );
      }

      const content = (
        <>
          {item.icon && (
            <span className="acko-breadcrumb-icon">{item.icon}</span>
          )}
          {item.label}
        </>
      );

      elements.push(
        <li key={i}>
          {isLast ? (
            <span className="acko-breadcrumb-current" aria-current="page">
              {content}
            </span>
          ) : item.href ? (
            <a href={item.href} className="acko-breadcrumb-link">
              {content}
            </a>
          ) : (
            <span className="acko-breadcrumb-link">{content}</span>
          )}
        </li>
      );
    });

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={clsx("acko-breadcrumb", className)}
        {...rest}
      >
        <ol className="acko-breadcrumb-list">{elements}</ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";
