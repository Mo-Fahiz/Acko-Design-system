import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import styles from './Calendar.module.css';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface CalendarProps {
  variant?: 'single' | 'range' | 'multi';
  display?: 'inline' | 'dropdown';
  value: Date | DateRange | Date[];
  onChange: (value: Date | DateRange | Date[]) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;
}

type ViewMode = 'days' | 'months' | 'years';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEAR_PAGE_SIZE = 12;

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getCalendarDays(year: number, month: number): { date: Date; currentMonth: boolean }[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  const days: { date: Date; currentMonth: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), currentMonth: false });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: new Date(year, month, d), currentMonth: true });
  }

  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: new Date(year, month + 1, d), currentMonth: false });
  }

  return days;
}

export const Calendar: React.FC<CalendarProps> = ({
  variant = 'single',
  display = 'dropdown',
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  locale = 'en-IN',
}) => {
  const today = new Date();
  const initialDate = variant === 'single' && value instanceof Date ? value : variant === 'range' && value && typeof value === 'object' && 'start' in value ? (value as DateRange).start : today;

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [isOpen, setIsOpen] = useState(display === 'inline');
  const [rangeHover, setRangeHover] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('days');
  const [yearPageStart, setYearPageStart] = useState(viewYear - Math.floor(YEAR_PAGE_SIZE / 2));
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    if (display === 'dropdown') setIsOpen(false);
  }, [display]);

  useEffect(() => {
    if (!isOpen || display === 'inline') return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
        setViewMode('days');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, display, close]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return disabledDates.some((d) => isSameDay(d, date));
  };

  const isSelected = (date: Date) => {
    if (variant === 'single' && value instanceof Date) return isSameDay(date, value);
    if (variant === 'multi' && Array.isArray(value)) return value.some((d) => isSameDay(d, date));
    return false;
  };

  const isRangeStart = (date: Date) => {
    if (variant !== 'range' || !value || typeof value !== 'object' || !('start' in value)) return false;
    const start = (value as DateRange).start;
    if (!start) return false;
    return isSameDay(date, start);
  };

  const isRangeEnd = (date: Date) => {
    if (variant !== 'range' || !value || typeof value !== 'object' || !('end' in value)) return false;
    const end = (value as DateRange).end;
    if (!end) return false;
    return isSameDay(date, end);
  };

  const isInRange = (date: Date) => {
    if (variant !== 'range' || !value || typeof value !== 'object' || !('start' in value)) return false;
    const range = value as DateRange;
    const endDate = rangeHover && !range.end ? rangeHover : range.end;
    if (!endDate) return false;
    const start = range.start < endDate ? range.start : endDate;
    const end = range.start < endDate ? endDate : range.start;
    return date > start && date < end;
  };

  const handleDayClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (variant === 'single') {
      onChange(date);
      close();
    } else if (variant === 'multi') {
      const current = (Array.isArray(value) ? value : []) as Date[];
      const exists = current.findIndex((d) => isSameDay(d, date));
      if (exists >= 0) {
        onChange(current.filter((_, i) => i !== exists));
      } else {
        onChange([...current, date]);
      }
    } else if (variant === 'range') {
      const range = value as DateRange | undefined;
      if (!range || !range.start || (range.start && range.end)) {
        onChange({ start: date, end: undefined as unknown as Date });
      } else {
        const start = range.start;
        if (date < start) {
          onChange({ start: date, end: start });
        } else {
          onChange({ start, end: date });
        }
        close();
      }
    }
  };

  const handleMonthSelect = (month: number) => {
    setViewMonth(month);
    setViewMode('days');
  };

  const handleYearSelect = (year: number) => {
    setViewYear(year);
    setYearPageStart(year - Math.floor(YEAR_PAGE_SIZE / 2));
    setViewMode('months');
  };

  const handleHeaderClick = () => {
    if (viewMode === 'days') {
      setViewMode('months');
    } else if (viewMode === 'months') {
      setYearPageStart(viewYear - Math.floor(YEAR_PAGE_SIZE / 2));
      setViewMode('years');
    }
  };

  const handlePrev = () => {
    if (viewMode === 'days') prevMonth();
    else if (viewMode === 'months') setViewYear(viewYear - 1);
    else setYearPageStart(yearPageStart - YEAR_PAGE_SIZE);
  };

  const handleNext = () => {
    if (viewMode === 'days') nextMonth();
    else if (viewMode === 'months') setViewYear(viewYear + 1);
    else setYearPageStart(yearPageStart + YEAR_PAGE_SIZE);
  };

  const days = getCalendarDays(viewYear, viewMonth);

  const getHeaderLabel = () => {
    if (viewMode === 'days') {
      return new Date(viewYear, viewMonth).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    }
    if (viewMode === 'months') return String(viewYear);
    return `${yearPageStart} – ${yearPageStart + YEAR_PAGE_SIZE - 1}`;
  };

  const formatValue = () => {
    if (variant === 'single' && value instanceof Date) {
      return value.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
    }
    if (variant === 'range' && value && typeof value === 'object' && 'start' in value) {
      const r = value as DateRange;
      const s = r.start.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
      if (r.end) {
        const e = r.end.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
        return `${s} — ${e}`;
      }
      return s;
    }
    if (variant === 'multi' && Array.isArray(value) && value.length > 0) {
      return `${value.length} date${value.length > 1 ? 's' : ''} selected`;
    }
    return null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (viewMode !== 'days') {
        setViewMode('days');
      } else {
        close();
      }
    }
  };

  const headerLabel = getHeaderLabel();

  const renderDaysView = () => (
    <>
      <div className={styles.weekdays} role="row">
        {WEEKDAYS.map((d) => (
          <div key={d} className={styles.weekday} role="columnheader">{d}</div>
        ))}
      </div>

      <div className={styles.days}>
        {days.map(({ date, currentMonth }, i) => {
          const disabled = isDateDisabled(date);
          const selected = isSelected(date);
          const todayDate = isSameDay(date, today);
          const rStart = isRangeStart(date);
          const rEnd = isRangeEnd(date);
          const inRange = isInRange(date);

          const dayClasses = [
            styles.day,
            !currentMonth && styles.outsideMonth,
            todayDate && !selected && !rStart && !rEnd && styles.today,
            selected && styles.selected,
            rStart && styles.rangeStart,
            rEnd && styles.rangeEnd,
            inRange && styles.rangeMiddle,
            disabled && styles.dayDisabled,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={i}
              type="button"
              className={dayClasses}
              disabled={disabled}
              onClick={() => handleDayClick(date)}
              onMouseEnter={() => variant === 'range' && setRangeHover(date)}
              onMouseLeave={() => variant === 'range' && setRangeHover(null)}
              aria-selected={selected || rStart || rEnd || undefined}
              aria-current={todayDate ? 'date' : undefined}
              tabIndex={currentMonth && !disabled ? 0 : -1}
              role="gridcell"
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </>
  );

  const renderMonthsView = () => (
    <div className={styles.pickerGrid}>
      {MONTHS.map((m, i) => {
        const isCurrent = i === today.getMonth() && viewYear === today.getFullYear();
        const isActive = i === viewMonth && viewYear === initialDate.getFullYear();

        const cellClasses = [
          styles.pickerCell,
          isActive && styles.pickerCellSelected,
          isCurrent && !isActive && styles.pickerCellCurrent,
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={m}
            type="button"
            className={cellClasses}
            onClick={() => handleMonthSelect(i)}
          >
            {m}
          </button>
        );
      })}
    </div>
  );

  const renderYearsView = () => {
    const years = Array.from({ length: YEAR_PAGE_SIZE }, (_, i) => yearPageStart + i);

    return (
      <div className={styles.pickerGrid}>
        {years.map((y) => {
          const isCurrent = y === today.getFullYear();
          const isActive = y === viewYear;

          const cellClasses = [
            styles.pickerCell,
            isActive && styles.pickerCellSelected,
            isCurrent && !isActive && styles.pickerCellCurrent,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={y}
              type="button"
              className={cellClasses}
              onClick={() => handleYearSelect(y)}
            >
              {y}
            </button>
          );
        })}
      </div>
    );
  };

  const panel = (
    <div
      className={[styles.panel, display === 'dropdown' && styles.panelDropdown].filter(Boolean).join(' ')}
      role="grid"
      aria-label={headerLabel}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.header}>
        <button type="button" className={styles.navBtn} onClick={handlePrev} aria-label="Previous">
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className={styles.headerLabel}
          onClick={handleHeaderClick}
          aria-label={viewMode === 'days' ? 'Select month' : viewMode === 'months' ? 'Select year' : undefined}
        >
          {headerLabel}
        </button>
        <button type="button" className={styles.navBtn} onClick={handleNext} aria-label="Next">
          <ChevronRight size={18} />
        </button>
      </div>

      {viewMode === 'days' && renderDaysView()}
      {viewMode === 'months' && renderMonthsView()}
      {viewMode === 'years' && renderYearsView()}
    </div>
  );

  if (display === 'inline') return panel;

  const displayValue = formatValue();

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={[styles.trigger, isOpen && styles.triggerOpen].filter(Boolean).join(' ')}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setViewMode('days');
        }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={displayValue ? undefined : styles.triggerPlaceholder}>
          {displayValue || 'Select date'}
        </span>
        <span className={styles.triggerIcon} aria-hidden="true">
          <CalendarIcon size={18} />
        </span>
      </button>
      {isOpen && panel}
    </div>
  );
};

export default Calendar;
