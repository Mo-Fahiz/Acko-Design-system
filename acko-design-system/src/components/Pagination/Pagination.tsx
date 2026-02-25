import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  variant?: 'numbered' | 'simple' | 'compact' | 'load-more';
  siblingCount?: number;
  showInfo?: boolean;
}

function getPageRange(current: number, total: number, siblings: number): (number | 'ellipsis')[] {
  const totalSlots = siblings * 2 + 5; // siblings + boundaries + ellipses + current
  if (total <= totalSlots) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  const pages: (number | 'ellipsis')[] = [1];

  if (showLeftEllipsis) {
    pages.push('ellipsis');
  } else {
    for (let i = 2; i < leftSibling; i++) pages.push(i);
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== total) pages.push(i);
  }

  if (showRightEllipsis) {
    pages.push('ellipsis');
  } else {
    for (let i = rightSibling + 1; i < total; i++) pages.push(i);
  }

  pages.push(total);
  return pages;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  variant = 'numbered',
  siblingCount = 1,
  showInfo = false,
}) => {
  const pages = useMemo(
    () => getPageRange(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount],
  );

  if (totalPages <= 1) return null;

  if (variant === 'simple') {
    return (
      <nav aria-label="Pagination" className={styles.simpleWrapper}>
        <button
          type="button"
          className={styles.navBtn}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        <span className={styles.simpleInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          className={styles.navBtn}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    );
  }

  if (variant === 'compact') {
    return (
      <nav aria-label="Pagination" className={styles.simpleWrapper}>
        <button
          type="button"
          className={styles.navBtn}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        <span className={styles.simpleInfo}>
          {currentPage}/{totalPages}
        </span>
        <button
          type="button"
          className={styles.navBtn}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    );
  }

  if (variant === 'load-more') {
    return (
      <div className={styles.loadMore}>
        <button
          type="button"
          className={styles.navBtn}
          style={{ width: 'auto', padding: '0 var(--space-4)', gap: 'var(--space-2)' }}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Load more
        </button>
        {showInfo && (
          <span className={styles.simpleInfo} style={{ marginLeft: 'var(--space-2)' }}>
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>
    );
  }

  // Default: numbered
  return (
    <nav aria-label="Pagination" className={styles.wrapper}>
      {showInfo && (
        <span className={styles.info}>Page {currentPage} of {totalPages}</span>
      )}

      <button
        type="button"
        className={styles.navBtn}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`e-${i}`} className={styles.ellipsis} aria-hidden="true">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            className={[styles.pageBtn, currentPage === page && styles.current].filter(Boolean).join(' ')}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        className={styles.navBtn}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;
