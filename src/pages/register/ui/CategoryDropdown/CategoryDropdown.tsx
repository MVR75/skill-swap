import { useRef, useState, useEffect } from 'react';
import { CheckboxGroupUI } from '../../../../shared/ui/CheckboxGroup/CheckboxGroup';
import styles from './CategoryDropdown.module.css';

type Option = {
  value: string;
  label: string;
};

type CategoryDropdownProps = {
  label: string;
  placeholder: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  mode?: 'single' | 'multi';
};

const MAX_VISIBLE_LABELS = 2;

export function CategoryDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
  mode = 'multi',
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleChange = (newValue: string[]) => {
    if (mode === 'single') {
      const added = newValue.find((v) => !value.includes(v));
      onChange(added ? [added] : []);
      setIsOpen(false);
      return;
    }
    onChange(newValue);
  };

  const selectedLabels = options
    .filter((option) => value.includes(option.value))
    .map((option) => option.label);

  const fieldId = `category-dropdown-${label.replace(/\s+/g, '-')}`;

  let triggerText: string;
  if (value.length === 0) {
    triggerText = placeholder;
  } else if (selectedLabels.length <= MAX_VISIBLE_LABELS) {
    triggerText = selectedLabels.join(', ');
  } else {
    const visible = selectedLabels.slice(0, MAX_VISIBLE_LABELS);
    const rest = selectedLabels.length - MAX_VISIBLE_LABELS;
    triggerText = `${visible.join(', ')} и ещё ${rest}`;
  }

  return (
    <div className={styles.field} ref={containerRef}>
      <label id={fieldId} className={styles.label}>
        {label}
      </label>
      <button
        aria-labelledby={fieldId}
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''} ${
          value.length === 0 ? styles.triggerPlaceholder : ''
        }`}
        onClick={toggleOpen}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.triggerText}>{triggerText}</span>
        <img
          src={isOpen ? `${import.meta.env.BASE_URL}icons/chevron-up.svg` : `${import.meta.env.BASE_URL}icons/vector.svg`}
          alt=""
          className={styles.chevron}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <CheckboxGroupUI
            type="normal"
            name={label}
            options={options}
            value={value}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
