import styles from './PreviewModal.module.css';

type PreviewSkillData = {
  teachTitle: string;
  teachAbout: string;
  teachPhotos: string[];
  categoryTitle: string;
  subcategoryTitle: string;
};

type PreviewModalProps = {
  isOpen: boolean;
  data: PreviewSkillData;
  onEdit: () => void;
  onDone: () => void;
};

export const PreviewModal = ({
  isOpen,
  data,
  onEdit,
  onDone,
}: PreviewModalProps) => {
  if (!isOpen) {
    return null;
  }

  const photos = data.teachPhotos ?? [];

  const mainPhoto = photos[0];
  const visibleThumbs = photos.slice(1, 4);
  const extraPhotosCount = Math.max(photos.length - 4, 0);

  const hasThumbs = photos.length > 1;
  const lastVisibleThumbIndex = visibleThumbs.length - 1;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <header className={styles.header}>
          <h2 className={styles.title}>Ваше предложение</h2>
          <p className={styles.subtitle}>
            Пожалуйста, проверьте и подтвердите правильность данных
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className={styles.skillTitle}>{data.teachTitle}</h3>

            <p className={styles.category}>
              {data.categoryTitle} / {data.subcategoryTitle}
            </p>

            <p className={styles.description}>{data.teachAbout}</p>

            <div className={styles.actions}>
              <button
                className={styles.editButton}
                type="button"
                onClick={onEdit}
              >
                Редактировать
                <img
                  className={styles.editIcon}
                  src="/icons/edit.svg"
                  alt=""
                  aria-hidden="true"
                />
              </button>

              <button
                className={styles.doneButton}
                type="button"
                onClick={onDone}
              >
                Готово
              </button>
            </div>
          </div>

          <div
            className={`${styles.gallery} ${
              !hasThumbs ? styles.gallerySingle : ''
            }`}
          >
            {mainPhoto ? (
              <img
                className={styles.mainImage}
                src={mainPhoto}
                alt={data.teachTitle}
              />
            ) : (
              <div className={styles.imagePlaceholder}>Фото не добавлено</div>
            )}

            {hasThumbs && (
              <div className={styles.thumbs}>
                {visibleThumbs.map((photo, index) => {
                  const shouldShowOverlay =
                    extraPhotosCount > 0 && index === lastVisibleThumbIndex;

                  if (shouldShowOverlay) {
                    return (
                      <div className={styles.morePhoto} key={photo}>
                        <img
                          className={styles.thumb}
                          src={photo}
                          alt={`${data.teachTitle} дополнительные фото`}
                        />
                        <span className={styles.moreOverlay}>
                          +{extraPhotosCount}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <img
                      className={styles.thumb}
                      src={photo}
                      alt={`${data.teachTitle} ${index + 2}`}
                      key={photo}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};