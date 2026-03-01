import React, { useId } from 'react';
import styles from './Switch.module.css';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  label?: string;
  id?: string;
  name?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  id: propId,
  name,
  className = '',
}) => {
  const generatedId = useId();
  const id = propId ?? generatedId;

  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
  const isChecked = isControlled ? checked : uncontrolledChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (!isControlled) setUncontrolledChecked(newChecked);
    onChange?.(newChecked);
  };

  const trackClasses = [
    styles.track,
    size === 'sm' ? styles.trackSm : styles.trackMd,
    isChecked ? styles.trackChecked : styles.trackUnchecked,
    isChecked ? styles.thumbChecked : '',
  ]
    .filter(Boolean)
    .join(' ');

  const thumbClasses = [
    styles.thumb,
    size === 'sm' ? styles.thumbSm : styles.thumbMd,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClasses = [
    styles.wrapper,
    disabled && styles.wrapperDisabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={id} className={wrapperClasses}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        aria-checked={isChecked}
        {...(isControlled ? { checked: isChecked } : { defaultChecked })}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        className={styles.nativeInput}
      />
      <span className={trackClasses}>
        <span className={thumbClasses} aria-hidden="true" />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Switch;
