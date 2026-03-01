import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  type: 'single' | 'multiple';
  items: AccordionItem[];
  defaultValue?: string | string[];
  collapsible?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  type,
  items,
  defaultValue,
  collapsible = false,
  className = '',
}) => {
  const baseId = useId();
  const [openValues, setOpenValues] = useState<string[]>(() => {
    if (defaultValue === undefined) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });
  const [contentHeights, setContentHeights] = useState<Record<string, number>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleItem = (value: string) => {
    const item = items.find((i) => i.value === value);
    if (item?.disabled) return;

    setOpenValues((prev) => {
      const isOpen = prev.includes(value);
      if (type === 'single') {
        if (isOpen && collapsible) return [];
        if (isOpen) return prev;
        return [value];
      }
      if (isOpen) return prev.filter((v) => v !== value);
      return [...prev, value];
    });
  };

  useEffect(() => {
    openValues.forEach((value) => {
      const ref = contentRefs.current[value];
      if (ref) {
        setContentHeights((prev) => ({ ...prev, [value]: ref.scrollHeight }));
      }
    });
  }, [openValues]);

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {items.map((item) => {
        const isOpen = openValues.includes(item.value);
        const triggerId = `${baseId}-trigger-${item.value}`;
        const contentId = `${baseId}-content-${item.value}`;
        const height = contentHeights[item.value];
        const maxHeight = isOpen ? (height ?? 0) : 0;

        return (
          <div
            key={item.value}
            className={`${styles.item} ${item.disabled ? styles.itemDisabled : ''}`}
          >
            <button
              type="button"
              id={triggerId}
              className={styles.trigger}
              onClick={() => toggleItem(item.value)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={contentId}
            >
              {item.trigger}
              <ChevronDown
                className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`}
                size={20}
                aria-hidden
              />
            </button>
            <div
              className={styles.contentWrapper}
              style={{ maxHeight: `${maxHeight}px` }}
            >
              <div
                ref={(el) => {
                  contentRefs.current[item.value] = el;
                }}
                id={contentId}
                role="region"
                aria-labelledby={triggerId}
                className={styles.contentInner}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
