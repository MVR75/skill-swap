import {useEffect, useRef, type FC} from 'react';
import type { TCheckboxProps } from './type';
import styles from './Checkbox.module.css';

const emptyCheckbox = '/icons/checkbox-empty.svg';
const doneCheckbox = '/icons/checkbox-done.svg';
const indeterminateCheckbox = '/icons/checkbox-indeterminate.svg';

export const CheckboxUI: FC<TCheckboxProps> = ({
  label,
  checked,
  name,
  value,
  indeterminate=false,
  disabled=false,
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const icon = indeterminate
    ? indeterminateCheckbox
    : checked
      ? doneCheckbox
      : emptyCheckbox;

  return (
    <label className={`${styles.checkbox} ${disabled ? styles.checkbox_disabled : ''}`}>
      <input
        ref={inputRef}
        className={styles.checkbox__input}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.currentTarget.checked)}
      />

      <img
        className={styles.checkbox__icon}
        src={icon}
        alt=''
        aria-hidden='true'
      />

      <span className={styles.checkbox__label}>{label}</span>
    </label>
  );
};
