import { useId } from 'react';
import styles from './Radio.module.css';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  disabled?: boolean;
  error?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  size = 'md',
  variant = 'default',
  disabled = false,
  error = false,
  orientation = 'vertical',
}) => {
  const groupId = useId();
  const labelId = `${groupId}-label`;
  const isCard = variant === 'card';

  return (
    <div className={[styles.group, styles[size]].join(' ')} role="radiogroup" aria-labelledby={labelId}>
      <span id={labelId} className={styles.groupLabel}>{label}</span>
      <div className={[styles.options, styles[orientation]].join(' ')}>
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          const isSelected = value === option.value;
          const isDisabled = disabled || option.disabled;

          const itemClasses = [
            isCard ? styles.cardItem : styles.item,
            isSelected && styles.itemSelected,
            isDisabled && styles.itemDisabled,
            error && styles.error,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <label key={option.value} className={itemClasses} htmlFor={optionId}>
              <input
                id={optionId}
                type="radio"
                className={styles.nativeInput}
                name={groupId}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                disabled={isDisabled}
              />
              <span className={styles.circle} aria-hidden="true">
                {isSelected && <span className={styles.dot} />}
              </span>
              <span className={styles.labelContent}>
                <span className={styles.labelText}>{option.label}</span>
                {option.description && (
                  <span className={styles.description}>{option.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
