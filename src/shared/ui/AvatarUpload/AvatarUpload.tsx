import { useRef } from 'react';
import styles from './AvatarUpload.module.css';

type AvatarUploadProps = {
  value?: File | null;
  previewUrl?: string | null;
  onChange: (file: File | null) => void;
  icon?: string;
  style?: string;
};

export function AvatarUpload({ value, previewUrl, onChange, icon, style }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onChange(file);
    event.target.value = '';
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.avatarButton}
        style={{width:style, height: style}}
        onClick={handleClick}
        aria-label={value ? 'Изменить аватар' : 'Загрузить аватар'}
      >
        {previewUrl && value ? (
          <img
            src={previewUrl}
            alt=""
            className={styles.preview}
            aria-hidden="true"
          />
        ) : (
          <img
            src={icon}
            alt=""
            className={styles.placeholder}
            aria-hidden="true"
          />
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleFileChange}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
