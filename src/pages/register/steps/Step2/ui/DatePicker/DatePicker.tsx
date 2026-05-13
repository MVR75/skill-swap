import { useRef, useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import { Button } from '../../../../../../shared/ui/Button/Button';
import styles from './DatePicker.module.css';

type DatePickerProps = {
  label: string;
  placeholder?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
};

export function DatePicker({
  label,
  placeholder = 'дд.мм.гггг',
  value,
  onChange,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftDate, setDraftDate] = useState<Date | undefined>(
    value ?? undefined
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const labelId = `field-label-${label
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-|-$/g, '')}`;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
    if (isOpen) {
      setDraftDate(value ?? undefined);
    }
  }, [isOpen, value]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (draftDate) {
      onChange(draftDate);
    }
    setIsOpen(false);
  };

  const displayValue = value ? format(value, 'dd.MM.yyyy') : '';

  return (
    <div className={styles.field} ref={containerRef}>
      <label id={labelId} className={styles.label}>
        {label}
      </label>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
        aria-labelledby={labelId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <span
          className={`${styles.triggerText} ${
            !displayValue ? styles.placeholder : ''
          }`}
        >
          {displayValue || placeholder}
        </span>
        <img
          src="/icons/calendar.svg"
          alt=""
          className={styles.calendarIcon}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className={styles.popup} role="dialog" aria-label="Выбор даты">
          <DayPicker
            mode="single"
            selected={draftDate}
            onSelect={setDraftDate}
            locale={ru}
            captionLayout="dropdown"
            startMonth={new Date(1925, 0)}
            endMonth={new Date()}
            classNames={{
              root: styles.calendar,
              months: styles.months,
              month: styles.month,
              caption_label: styles.captionLabel,
              dropdowns: styles.dropdowns,
              dropdown: styles.dropdown,
              weekdays: styles.weekdays,
              weekday: styles.weekday,
              week: styles.week,
              day: styles.day,
              day_button: styles.dayButton,
              selected: styles.selectedDay,
              today: styles.todayDay,
              outside: styles.outsideDay,
            }}
          />

          <div className={styles.actions}>
            <Button variant="outline" onClick={handleCancel}>
              Отменить
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Выбрать
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
