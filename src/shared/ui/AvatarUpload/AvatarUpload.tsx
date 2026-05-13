import { useRef, useState, useEffect } from 'react';
import styles from './AvatarUpload.module.css';

type AvatarUploadProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  icon?: string;
  style?: string;
};

export function AvatarUpload({ value, onChange, icon, style }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [value]);

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
        {previewUrl ? (
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
