import { useId } from 'react';
import { Check, Minus } from 'lucide-react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  label?: string;
  description?: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  checked,
  indeterminate = false,
  onChange,
  size = 'md',
  disabled = false,
  error = false,
}) => {
  const id = useId();
  const descriptionId = description ? `${id}-desc` : undefined;

  const wrapperClasses = [
    styles.wrapper,
    styles[size],
    checked && styles.checked,
    indeterminate && !checked && styles.indeterminate,
    disabled && styles.disabled,
    error && styles.error,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={wrapperClasses} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className={styles.nativeInput}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-describedby={descriptionId}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate && !checked;
        }}
      />
      <span className={styles.box} aria-hidden="true">
        <span className={`${styles.checkIcon} ${(checked || (indeterminate && !checked)) ? styles.checkIconVisible : ''}`}>
          {indeterminate && !checked ? <Minus strokeWidth={3} /> : <Check strokeWidth={3} />}
        </span>
      </span>
      {(label || description) && (
        <span className={styles.labelContent}>
          {label && <span className={styles.labelText}>{label}</span>}
          {description && <span id={descriptionId} className={styles.description}>{description}</span>}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
