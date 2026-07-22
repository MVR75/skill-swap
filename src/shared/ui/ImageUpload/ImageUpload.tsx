import { useRef, useState, useEffect } from 'react';
import styles from './ImageUpload.module.css';

const MAX_FILES = 6;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 МБ
const ACCEPTED_TYPES = ['image/jpeg'];

type ImageUploadProps = {
  value: File[];
  onChange: (files: File[]) => void;
};

type RejectedFile = {
  name: string;
  reason: string;
};

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<RejectedFile[]>([]);

  useEffect(() => {
    if (value.length === 0) {
      setPreviewUrls([]);
      return;
    }
    const urls = value.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const handleAddClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const accepted: File[] = [];
    const rejected: RejectedFile[] = [];

    const isSameFile = (a: File, b: File) =>
      a.name === b.name &&
      a.size === b.size &&
      a.lastModified === b.lastModified;

    for (const file of newFiles) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        rejected.push({
          name: file.name,
          reason: 'допустим только JPG',
        });
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        rejected.push({
          name: file.name,
          reason: 'превышает 5 МБ',
        });
        continue;
      }
      const isDuplicateInValue = value.some((existing) =>
        isSameFile(existing, file)
      );
      const isDuplicateInAccepted = accepted.some((existing) =>
        isSameFile(existing, file)
      );
      if (isDuplicateInValue || isDuplicateInAccepted) {
        rejected.push({
          name: file.name,
          reason: 'уже добавлен',
        });
        continue;
      }
      accepted.push(file);
    }

    if (accepted.length > 0) {
      const combined = [...value, ...accepted].slice(0, MAX_FILES);
      onChange(combined);
    }
    setRejectedFiles(rejected);

    event.target.value = '';
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  const canAddMore = value.length < MAX_FILES;
  const isEmpty = value.length === 0;

  return (
    <div className={styles.wrapper}>
      {isEmpty ? (
        <button
          type="button"
          className={styles.emptyButton}
          onClick={handleAddClick}
        >
          <span className={styles.emptyText}>
            Перетащите или выберите изображения навыка
          </span>
          <span className={styles.emptyAction}>
            <img
              src={`${import.meta.env.BASE_URL}icons/gallery-add.svg`}
              alt=""
              className={styles.galleryIcon}
              aria-hidden="true"
            />
            Выбрать изображения
          </span>
        </button>
      ) : (
        <div className={styles.gallery}>
          {value.map((_file, index) => {
            const url = previewUrls[index];
            return (
              <div key={index} className={styles.previewItem}>
                {url && (
                  <img
                    src={url}
                    alt={`Изображение ${index + 1}`}
                    className={styles.previewImage}
                  />
                )}
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemove(index)}
                  aria-label="Удалить изображение"
                >
                  <img src={`${import.meta.env.BASE_URL}icons/cross.svg`} alt="" aria-hidden="true" />
                </button>
              </div>
            );
          })}
          {canAddMore && (
            <button
              type="button"
              className={styles.addMoreButton}
              onClick={handleAddClick}
              aria-label="Добавить изображение"
            >
              <img
                src={`${import.meta.env.BASE_URL}icons/gallery-add.svg`}
                alt=""
                className={styles.addIcon}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      )}

      {rejectedFiles.length > 0 && (
        <ul className={styles.errors} role="alert">
          {rejectedFiles.map((file) => (
            <li
              key={`${file.name}-${file.reason}`}
              className={styles.errorItem}
            >
              Файл «{file.name}» — {file.reason}
            </li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg"
        multiple
        className={styles.hiddenInput}
        onChange={handleFileChange}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
