"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from "react";
import { clsx } from "clsx";

export interface AccordionItem {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  type: "single" | "multiple";
  items: AccordionItem[];
  defaultValue?: string | string[];
  collapsible?: boolean;
  className?: string;
}

const ChevronDownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type,
      items,
      defaultValue,
      collapsible = type === "single",
      className,
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => rootRef.current!);

    const getInitialOpen = useCallback((): Set<string> => {
      if (defaultValue == null) return new Set();
      const arr = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      return new Set(arr);
    }, [defaultValue]);

    const [openValues, setOpenValues] = useState<Set<string>>(getInitialOpen);

    const toggle = useCallback(
      (value: string) => {
        const item = items.find((i) => i.value === value);
        if (item?.disabled) return;

        setOpenValues((prev) => {
          const next = new Set(prev);
          const wasOpen = next.has(value);

          if (type === "single") {
            next.clear();
            if (collapsible && wasOpen) {
              return next;
            }
            next.add(value);
          } else {
            if (wasOpen) {
              next.delete(value);
            } else {
              next.add(value);
            }
          }
          return next;
        });
      },
      [items, type, collapsible]
    );

    return (
      <div ref={rootRef} className={clsx("acko-accordion", className)} role="group">
        {items.map((item) => {
          const isOpen = openValues.has(item.value);
          return (
            <AccordionItemRow
              key={item.value}
              item={item}
              isOpen={isOpen}
              onToggle={() => toggle(item.value)}
            />
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

interface AccordionItemRowProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItemRow({ item, isOpen, onToggle }: AccordionItemRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(isOpen ? "none" : "0");

  useEffect(() => {
    if (!isOpen) {
      setMaxHeight("0");
      return;
    }
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setMaxHeight(`${el.scrollHeight}px`);
    requestAnimationFrame(measure);
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "acko-accordion-item",
        item.disabled && "acko-accordion-item-disabled"
      )}
    >
      <button
        type="button"
        className="acko-accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-disabled={item.disabled}
        disabled={item.disabled}
      >
        {item.trigger}
        <span
          className={clsx(
            "acko-accordion-chevron",
            isOpen && "acko-accordion-chevron-open"
          )}
          aria-hidden
        >
          <ChevronDownIcon />
        </span>
      </button>
      <div
        className="acko-accordion-content-wrapper"
        style={{ maxHeight }}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className="acko-accordion-content">
          {item.content}
        </div>
      </div>
    </div>
  );
}
