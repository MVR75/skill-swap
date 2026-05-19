import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../app/store';
import {
  getSkillById,
  getSkills,
  selectAllSkillCards,
  selectCurrentSkill,
  selectSkillsLoading,
  selectSkillsError,
} from '../../features/skills/skillsSlice';
import SkillCard from '../../entities/skill-Card/SkillCard';
import Skills from '../../shared/ui/skills/Skills';
import Like from '../../shared/ui/like/Like';
import { ErrorPage } from '../error/ErrorPage';
import { Button } from '../../shared/ui/button/Button';
import { Icon } from '@mdi/react';
import { mdiHeart, mdiHeartOutline, mdiChevronLeft, mdiChevronRight, mdiClockOutline } from '@mdi/js';
import styles from './SkillPage.module.css';

const getYearsText = (age: number) => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'лет';
  if (lastDigit === 1) return 'год';
  if (lastDigit >= 2 && lastDigit <= 4) return 'года';
  return 'лет';
};

const SkillPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const skill = useSelector(selectCurrentSkill);
  const allSkills = useSelector(selectAllSkillCards);
  const isLoading = useSelector(selectSkillsLoading);
  const error = useSelector(selectSkillsError);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isExchangeProposed, setIsExchangeProposed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getSkillById(id));
      dispatch(getSkills());
    }
  }, [dispatch, id]);

  useEffect(() => {
    setPhotoIndex(0);
    setIsLiked(false);
    setIsExchangeProposed(false);
  }, [id]);

  const canTeachSkill = skill?.skills.canTeach[0];

  const similarSkills = useMemo(() => {
    if (!skill || !canTeachSkill) return [];
    return allSkills
      .filter(
        (item) =>
          item.id !== skill.id &&
          item.skills.canTeach.some((t) => t.category === canTeachSkill.category)
      )
      .slice(0, 4);
  }, [allSkills, skill, canTeachSkill]);

  if (isLoading) return <main className={styles.status}>Загрузка...</main>;
  if (error || !skill || !canTeachSkill)
    return <ErrorPage code={404} />;

  const photos = skill.teachPhotos;
  const visibleThumbs = photos.slice(0, 4);
  const hiddenCount = photos.length > 4 ? photos.length - 4 : 0;

  const prevPhoto = () =>
    setPhotoIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  const nextPhoto = () =>
    setPhotoIndex((i) => (i === photos.length - 1 ? 0 : i + 1));

  return (
    <main className={styles.page}>
      <section className={styles.contentGrid}>
        {/* Левая колонка — автор */}
        <aside className={styles.authorCard}>
          <div className={styles.authorTop}>
            <img
              className={styles.authorAvatar}
              src={skill.avatarUrl}
              alt={skill.name}
            />
            <div>
              <h2 className={styles.authorName}>{skill.name}</h2>
              <p className={styles.authorMeta}>
                {skill.city}, {skill.age} {getYearsText(skill.age)}
              </p>
            </div>
          </div>

          <p className={styles.authorDescription}>{skill.shortAbout}</p>

          <div className={styles.skillsBlock}>
            <h3 className={styles.blockTitle}>Может научить</h3>
            <div className={styles.chips}>
              {skill.skills.canTeach.map((item) => (
                <Skills
                  key={item.subcategory}
                  title={item.title}
                  colorTag={item.color}
                />
              ))}
            </div>
          </div>

          <div className={styles.skillsBlock}>
            <h3 className={styles.blockTitle}>Хочет научиться</h3>
            <div className={styles.chips}>
              {skill.skills.wantsToLearn.map((item) => (
                <Skills
                  key={item.subcategory}
                  title={item.title}
                  colorTag={item.color}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Правая колонка — навык */}
        <section className={styles.skillCard}>
          <div className={styles.cardActions}>
            <button className={styles.actionButton} aria-label="Лайк" onClick={() => setIsLiked(!isLiked)}>
              <Icon path={isLiked ? mdiHeart : mdiHeartOutline} size={0.85} color={isLiked ? '#ABD27A' : '#000'} />
            </button>
            <button className={styles.actionButton} aria-label="Поделиться">
              <img src="/icons/share.svg" alt="" />
            </button>
            <button className={styles.actionButton} aria-label="Ещё">
              <img src="/icons/more.svg" alt="" />
            </button>
          </div>

          <div className={styles.skillInfo}>
            <div className={styles.skillInfoTop}>
              <h1 className={styles.title}>{skill.teachTitle}</h1>
              <p className={styles.category}>
                {canTeachSkill.categoryTitle} / {canTeachSkill.title}
              </p>
              <p className={styles.description}>{skill.teachAbout}</p>
            </div>
            <Button
              variant={isExchangeProposed ? 'outline' : 'primary'}
              className={styles.exchangeButton}
              onClick={() => setIsExchangeProposed(!isExchangeProposed)}
              leftIcon={isExchangeProposed ? <Icon path={mdiClockOutline} size={0.9} /> : undefined}
            >
              {isExchangeProposed ? 'Обмен предложен' : 'Предложить обмен'}
            </Button>
          </div>

          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              {photos[photoIndex] && (
                <img src={photos[photoIndex]} alt={skill.teachTitle} />
              )}
              {photos.length > 1 && (
                <>
                  <button
                    className={styles.galleryArrow}
                    onClick={prevPhoto}
                    aria-label="Назад"
                  >
                    <Icon path={mdiChevronLeft} size={1} />
                  </button>
                  <button
                    className={`${styles.galleryArrow} ${styles.galleryArrowRight}`}
                    onClick={nextPhoto}
                    aria-label="Вперёд"
                  >
                    <Icon path={mdiChevronRight} size={1} />
                  </button>
                </>
              )}
            </div>

            <div className={styles.thumbnails}>
              {visibleThumbs.map((photo, index) => (
                <button
                  key={photo}
                  className={`${styles.thumbnail} ${
                    photoIndex === index ? styles.thumbnailActive : ''
                  }`}
                  onClick={() => setPhotoIndex(index)}
                >
                  <img src={photo} alt={`${skill.teachTitle} ${index + 1}`} />
                  {index === 3 && hiddenCount > 0 && (
                    <span className={styles.thumbnailMore}>+{hiddenCount}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* Похожие предложения */}
      <section className={styles.similarSection}>
        <h2 className={styles.sectionTitle}>Похожие предложения</h2>
        {similarSkills.length > 0 ? (
          <div className={styles.similarGrid}>
            {similarSkills.map((item) => (
              <SkillCard
                key={item.id}
                id={item.id}
                avatarUrl={item.avatarUrl}
                name={item.name}
                city={item.city}
                age={item.age}
                skills={item.skills}
              />
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>
            Похожие предложения пока не найдены.
          </p>
        )}
      </section>
    </main>
  );
};

export default SkillPage;