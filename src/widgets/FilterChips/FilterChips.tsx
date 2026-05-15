import { useDispatch, useSelector } from "../../app/store";
import { deleteFilter } from "../../features/filters/filtersSlice";
import { selectActiveFilterItems } from "../../features/filters/selectors";
import { FilterChipUI } from "../../shared/ui/FilterChip/FilterChipUI";
import styles from './FilterChips.module.css';

export const FilterChips = () => {
  const activeFilterItems = useSelector(selectActiveFilterItems);

  const dispatch = useDispatch();
  
  if (activeFilterItems.length === 0) return null;

  return (
    <div className={styles.filterChips}>
      {activeFilterItems.map((item) => (
        <FilterChipUI
          key={item.value}
          text={item.label}
          onDelete={() => dispatch(deleteFilter({value: item.value, type: item.type}))}
        />
      ))}
    </div>
  );
};
