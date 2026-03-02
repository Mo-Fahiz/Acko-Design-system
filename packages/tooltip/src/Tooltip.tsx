"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, type ReactElement, type ReactNode } from "react";
import ReactDOM from "react-dom";
import { clsx } from "clsx";

export interface TooltipProps {
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delayMs?: number;
  children: ReactElement;
  className?: string;
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  (
    {
      content,
      side = "top",
      align = "center",
      delayMs = 200,
      children,
      className,
    },
    ref
  ) => {
    const triggerRef = useRef<HTMLSpanElement | null>(null);
    useImperativeHandle(ref, () => triggerRef.current!);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scheduleShow = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(true), delayMs);
    }, [delayMs]);

    const scheduleHide = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVisible(false);
    }, []);

    const updatePosition = useCallback(() => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      const tooltipHeight = tooltipEl?.offsetHeight ?? 40;
      const tooltipWidth = tooltipEl?.offsetWidth ?? 100;
      const gap = 8;

      let x = 0;
      let y = 0;

      if (side === "top") {
        y = rect.top - tooltipHeight - gap;
        x = rect.left + rect.width / 2 - tooltipWidth / 2;
      } else if (side === "bottom") {
        y = rect.bottom + gap;
        x = rect.left + rect.width / 2 - tooltipWidth / 2;
      } else if (side === "left") {
        x = rect.left - tooltipWidth - gap;
        y = rect.top + rect.height / 2 - tooltipHeight / 2;
      } else {
        x = rect.right + gap;
        y = rect.top + rect.height / 2 - tooltipHeight / 2;
      }

      if (align === "start") {
        if (side === "top" || side === "bottom") x = rect.left;
        else y = rect.top;
      } else if (align === "end") {
        if (side === "top" || side === "bottom") x = rect.right - tooltipWidth;
        else y = rect.bottom - tooltipHeight;
      }

      setCoords({ x, y });
    }, [side, align]);

    useEffect(() => {
      if (visible) {
        updatePosition();
        requestAnimationFrame(updatePosition);
      } else {
        setCoords(null);
      }
    }, [visible, updatePosition]);

    const portalContent =
      visible && coords ? (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={clsx(
            "acko-tooltip",
            `acko-tooltip-${side}`,
            `acko-tooltip-align-${align}`,
            "acko-tooltip-visible",
            className
          )}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        >
          {content}
          <span className={`acko-tooltip-arrow acko-tooltip-arrow-${side}`} aria-hidden />
        </div>
      ) : null;

    return (
      <>
        <span
          ref={(node) => {
            triggerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref && typeof ref === "object") ref.current = node;
          }}
          className="acko-tooltip-trigger"
          onMouseEnter={scheduleShow}
          onMouseLeave={scheduleHide}
        >
          {children}
        </span>
        {typeof document !== "undefined" &&
          ReactDOM.createPortal(portalContent, document.body)}
      </>
    );
  }
);

Tooltip.displayName = "Tooltip";
