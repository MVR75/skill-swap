import { useState, type FC } from 'react';
import type { TCheckboxGroupUIProps } from './type';
import { CheckboxTreeUI } from '../CheckboxTree/CheckboxTree';
import { CheckboxUI } from '../Checkbox/Checkbox';
import arrowUp from '../../../../public/icons/chevron-up.svg';
import arrowDown from '../../../../public/icons/vector.svg';
import styles from './CheckboxGroup.module.css';

const VISIBLE_ITEMS_LIMIT = 5;

export const CheckboxGroupUI: FC<TCheckboxGroupUIProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const itemsCount =
    props.type === 'tree'
      ? props.trees.length
      : props.options.length;

  const shouldShowToggle = itemsCount > VISIBLE_ITEMS_LIMIT;

  const getVisibleItems = <T,>(items: T[]) => {
    if (isExpanded) {
      return items;
    }

    return items.slice(0, VISIBLE_ITEMS_LIMIT);
  };

  const renderItems = () => {
    if (props.type === 'tree') {
      return getVisibleItems(props.trees).map((tree) => (
        <CheckboxTreeUI
          key={tree.name}
          name={tree.name}
          label={tree.label}
          options={tree.options}
          value={tree.value}
          onChange={tree.onChange}
        />
      ));
    }

    return getVisibleItems(props.options).map((option) => (
      <CheckboxUI
          key={option.value}
          label={option.label}
          checked={props.value.includes(option.value)}
          name={props.name}
          value={option.value}
          disabled={option.disabled}
          onChange={(checked) => {
            if (checked) {
              props.onChange([...props.value, option.value]);
              return;
            }

            props.onChange(
              props.value.filter((item) => item !== option.value)
            );
          }}
        />
    ))
  };

  return (
    <fieldset className={styles.checkboxGroup}>
      {props.legend && (
        <legend className={styles.checkboxGroup__legend}>
          {props.legend}
        </legend>
      )}

      <div className={styles.checkboxGroup__items}>
        {renderItems()}
      </div>

      {shouldShowToggle && (
        <button
          className={styles.checkboxGroup__hideButton}
          type='button'
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
        >
          {isExpanded ? 'Скрыть' : 'Показать все'}
          <img
            src={isExpanded ? arrowUp : arrowDown}
            alt=''
            aria-hidden='true'
          />
        </button>
      )}
    </fieldset>
  );
};
