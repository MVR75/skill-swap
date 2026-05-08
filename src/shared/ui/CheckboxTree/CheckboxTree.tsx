import { useState, type FC } from 'react';
import { CheckboxUI } from '../Checkbox/Checkbox';
import type { TCheckboxTreeUIProps } from './type';
import styles from './CheckboxTree.module.css';
import arrowUp from '../../../../public/icons/chevron-up.svg';
import arrowDown from '../../../../public/icons/vector.svg';

export const CheckboxTreeUI: FC<TCheckboxTreeUIProps> = ({
  name,
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCount = options.filter((option) =>
    value.includes(option.value),
  ).length;

  const isChecked = selectedCount === options.length;
  const isIndeterminate = selectedCount > 0 && selectedCount < options.length;

  const handleParentChange = () => {
    if (isChecked) {
      onChange([]);
      return;
    }

    onChange(options.map((option) => option.value));
  };

  const handleChildChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
      return;
    }

    onChange(value.filter((item) => item !== optionValue));
  };

  return (
    <fieldset className={styles.checkboxTree}>
      <div className={styles.checkboxTree__parent}>
        <CheckboxUI
          name={name}
          value={`${name}-all`}
          label={label}
          checked={isChecked}
          indeterminate={isIndeterminate}
          onChange={handleParentChange}
        />

        <button
          type="button"
          aria-label={isOpen ? 'Свернуть категорию' : 'Раскрыть категорию'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          <img
            src={isOpen ? arrowUp : arrowDown}
            alt=''
            aria-hidden='true'
          />
        </button>
      </div>

      {isOpen && (
        <div className={styles.checkboxTree__children}>
          {options.map((option) => (
            <CheckboxUI
              key={option.value}
              name={name}
              value={option.value}
              label={option.label}
              checked={value.includes(option.value)}
              onChange={(checked) => handleChildChange(option.value, checked)}
            />
          ))}
        </div>
      )}
    </fieldset>
  );
};
