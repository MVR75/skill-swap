import type { FC } from 'react';
import { RadioGroupUI } from '../../shared/ui/RadioGroup/RadioGroup';
import { CheckboxGroupUI } from '../../shared/ui/CheckboxGroup/CheckboxGroup';
import type { TFiltersBarUIProps } from './type';
import styles from './FiltersBarUI.module.css';

const crossIcon = `${import.meta.env.BASE_URL}icons/cross-green.svg`;

export const FiltersBarUI: FC<TFiltersBarUIProps> = ({
  skillExchangeIntentFilter,
  skillsFilter,
  genderFilter,
  cityFilter,
  filterCount,
  onClear
}) => (
  <aside className={styles.filtersBar}>
    <div className={styles.filtersBar__titleContainer}>
      <h2 className={styles.filtersBar__title}>{`Фильтры ${filterCount ? `(${filterCount})` : ''}`}</h2>
      {filterCount > 0 && <button className={styles.filtersBar__clearButton} type='button' onClick={onClear}>
        Сбросить
        <img
          src={crossIcon}
          alt=''
          aria-hidden='true'
        />
      </button>}
    </div>
    <div className={styles.filtersBar__componentsContainer}>
      <RadioGroupUI {...skillExchangeIntentFilter}/>
      <CheckboxGroupUI {...skillsFilter} />
      <RadioGroupUI {...genderFilter} />
      <CheckboxGroupUI {...cityFilter} />
    </div>
  </aside>
);
