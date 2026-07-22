import type { FC } from 'react';
import type { TFilterChipUIProps } from './type';
import styles from './FilterChipUI.module.css';

const cross = `${import.meta.env.BASE_URL}icons/cross.svg`;

export const FilterChipUI: FC<TFilterChipUIProps> = ({
  text,
  onDelete
}) => (
  <button
    className={styles.filterChip}
    type='button'
    onClick={onDelete}
  >
    {text}
    <img
      src={cross}
      alt=''
      aria-hidden='true'
    />
  </button>
);
