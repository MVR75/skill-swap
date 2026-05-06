import type { FC } from 'react';
import type { TRadioGroupProps } from './type';
import { RadioUI } from '../Radio/Radio';
import styles from './RadioGroup.module.css'

export const RadioGroupUI: FC<TRadioGroupProps> = ({
  legend,
  name,
  options,
  value,
  onChange,
  direction
}) => {
  return (
    <fieldset className={styles.radioGroup}>
      {legend && <legend className={styles.radioGroup__legend}>{legend}</legend>}
      <div
        className={styles.radioGroup__radioContainer}
        style={{ flexDirection: direction === "horizontal" ? "row" : "column" }}
      >
        {options.map(item => (
          <RadioUI
            name={name}
            value={item.value}
            checked={value===item.value}
            onChange={onChange}
          >{item.label}</RadioUI>
        ))}
      </div>
    </fieldset>
  );
};
