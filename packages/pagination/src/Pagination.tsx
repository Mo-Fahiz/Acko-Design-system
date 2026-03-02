"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  variant?: "numbered" | "simple" | "compact" | "load-more";
  siblingCount?: number;
  showInfo?: boolean;
  className?: string;
}

const ChevronLeftIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12.5 15L7.5 10L12.5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M7.5 5L12.5 10L7.5 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function getVisiblePageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "ellipsis")[] {
  const totalVisible = siblingCount * 2 + 3;
  if (totalPages <= totalVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftPart = Array.from({ length: rightSibling }, (_, i) => i + 1);
    return [...leftPart, "ellipsis", totalPages];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightPart = Array.from(
      { length: totalPages - leftSibling + 1 },
      (_, i) => leftSibling + i
    );
    return [1, "ellipsis", ...rightPart];
  }
  const middlePart = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  );
  return [1, "ellipsis", ...middlePart, "ellipsis", totalPages];
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      totalPages,
      currentPage,
      onPageChange,
      variant = "numbered",
      siblingCount = 1,
      showInfo = false,
      className,
    },
    ref
  ) => {
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    if (variant === "load-more") {
      return (
        <div ref={ref} className={clsx("acko-pagination", className)}>
          {showInfo && (
            <span className="acko-pagination-info">
              Page {currentPage} of {totalPages}
            </span>
          )}
          <button
            type="button"
            className="acko-pagination-load-more"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNext}
          >
            Load more
          </button>
        </div>
      );
    }

    if (variant === "simple" || variant === "compact") {
      return (
        <div ref={ref} className={clsx("acko-pagination", className)}>
          <button
            type="button"
            className="acko-pagination-nav"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrev}
            aria-label="Previous page"
          >
            <ChevronLeftIcon />
          </button>
          <span className="acko-pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="acko-pagination-nav"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNext}
            aria-label="Next page"
          >
            <ChevronRightIcon />
          </button>
        </div>
      );
    }

    const visiblePages = getVisiblePageRange(
      currentPage,
      totalPages,
      siblingCount
    );

    return (
      <nav ref={ref} className={clsx("acko-pagination", className)} aria-label="Pagination">
        {showInfo && (
          <span className="acko-pagination-info">
            Page {currentPage} of {totalPages}
          </span>
        )}
        <button
          type="button"
          className="acko-pagination-nav"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          aria-label="Previous page"
        >
          <ChevronLeftIcon />
        </button>
        {visiblePages.map((page, i) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="acko-pagination-ellipsis"
              aria-hidden
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={clsx(
                "acko-pagination-btn",
                page === currentPage && "acko-pagination-btn-current"
              )}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          )
        )}
        <button
          type="button"
          className="acko-pagination-nav"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          aria-label="Next page"
        >
          <ChevronRightIcon />
        </button>
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";
