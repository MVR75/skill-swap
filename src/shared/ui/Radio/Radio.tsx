import type { FC } from 'react';
import type { TRadioUIProps } from "./type";
import styles from './Radio.module.css';

export const RadioUI: FC<TRadioUIProps> = ({
  children,
  name,
  value,
  checked,
  onChange,
  className
}) => {
  return (
    <label className={`${styles.radio} ${className ?? ''}`}>
      <input
        className={styles.input}
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />

      <span className={styles.control} aria-hidden='true'></span>

      <span className={styles.label}>{children}</span>
    </label>
  );
};
