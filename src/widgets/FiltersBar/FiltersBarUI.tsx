import type { FC } from 'react';
import { RadioGroupUI } from '../../shared/ui/RadioGroup/RadioGroup';
import { CheckboxGroupUI } from '../../shared/ui/CheckboxGroup/CheckboxGroup';
import type { TFiltersBarUIProps } from './type';
import styles from './FiltersBarUI.module.css';

export const FiltersBarUI: FC<TFiltersBarUIProps> = ({
  skillExchangeIntentFilter,
  skillsFilter,
  genderFilter,
  cityFilter
}) => (
  <aside className={styles.filtersBar}>
    <h2 className={styles.filtersBar__title}>Фильтры</h2>
    <div className={styles.filtersBar__componentsContainer}>
      <RadioGroupUI {...skillExchangeIntentFilter}/>
      <CheckboxGroupUI {...skillsFilter} />
      <RadioGroupUI {...genderFilter} />
      <CheckboxGroupUI {...cityFilter} />
    </div>
  </aside>
);
