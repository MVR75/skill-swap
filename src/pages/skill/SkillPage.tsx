import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Header } from '../../widgets/Header/Header';
import styles from './SkillPage.module.css';

type SkillType = 'teach' | 'learn';

interface Skill {
  id: string;
  title: string;
  description: string;
  type: SkillType;
  category: string;
  authorId: string;
  authorName: string;
  tags: string[];
  createdAt: string;
}

interface SimilarOffer {
  id: string;
  name: string;
  city: string;
  age: number;
  avatarClass: string;
  canTeach: string[];
  wantsToLearn: string[];
}

const categoryLabels: Record<string, string> = {
  programming: 'Программирование',
  languages: 'Иностранные языки',
  design: 'Дизайн',
};

const typeLabels: Record<SkillType, string> = {
  teach: 'Учу',
  learn: 'Учусь',
};

const authorInfo = {
  name: 'Иван',
  city: 'Санкт-Петербург',
  age: 34,
  description:
    'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое.',
  canTeach: ['Английский язык'],
  wantsToLearn: ['Тайм менеджмент', 'Медитация'],
};

const similarOffers: SimilarOffer[] = [
  {
    id: '1',
    name: 'Илона',
    city: 'Екатеринбург',
    age: 33,
    avatarClass: 'avatarOne',
    canTeach: ['Английский язык'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация'],
  },
  {
    id: '2',
    name: 'Михаил',
    city: 'Новосибирск',
    age: 29,
    avatarClass: 'avatarTwo',
    canTeach: ['Английский язык'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация'],
  },
  {
    id: '3',
    name: 'Мария',
    city: 'Краснодар',
    age: 21,
    avatarClass: 'avatarThree',
    canTeach: ['Английский язык'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация'],
  },
  {
    id: '4',
    name: 'Виктория',
    city: 'Кемерово',
    age: 30,
    avatarClass: 'avatarFour',
    canTeach: ['Английский язык'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация'],
  },
];

const SkillPage = () => {
  const { id } = useParams();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await fetch('/db/skills.json');

        if (!response.ok) {
          throw new Error('Не удалось загрузить данные навыков');
        }

        const data: Skill[] = await response.json();
        setSkills(data);
      } catch {
        setError('Не удалось загрузить страницу навыка');
      } finally {
        setIsLoading(false);
      }
    };

    loadSkills();
  }, []);

  const skill = useMemo(
    () => skills.find((item) => item.id === id),
    [skills, id]
  );

  if (isLoading) {
    return <main className={styles.status}>Загрузка...</main>;
  }

  if (error) {
    return <main className={styles.status}>{error}</main>;
  }

  if (!skill) {
    return (
      <main className={styles.status}>
        <p>Навык не найден</p>
        <Link className={styles.backLink} to="/">
          Вернуться на главную
        </Link>
      </main>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header isAuthenticated userName="Мария" userAvatar="/images/avatar.jpg" />

      <main className={styles.page}>
        <div className={styles.contentGrid}>
          <aside className={styles.authorCard}>
            <div className={styles.authorTop}>
              <div className={styles.authorAvatar} />
              <div>
                <h2 className={styles.authorName}>{authorInfo.name}</h2>
                <p className={styles.authorMeta}>
                  {authorInfo.city}, {authorInfo.age} года
                </p>
              </div>
            </div>

            <p className={styles.authorDescription}>{authorInfo.description}</p>

            <div className={styles.skillsBlock}>
              <h3 className={styles.blockTitle}>Может научить</h3>
              <div className={styles.chips}>
                {authorInfo.canTeach.map((item) => (
                  <span className={styles.chipYellow} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.skillsBlock}>
              <h3 className={styles.blockTitle}>Хочет научиться</h3>
              <div className={styles.chips}>
                {authorInfo.wantsToLearn.map((item) => (
                  <span className={styles.chipBlue} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <section className={styles.skillCard}>
            <div className={styles.cardActions}>
              <button
                className={styles.actionButton}
                type="button"
                aria-label="Добавить в избранное"
              >
                ♡
              </button>
              <button
                className={styles.actionButton}
                type="button"
                aria-label="Поделиться"
              >
                ⤴
              </button>
              <button
                className={styles.actionButton}
                type="button"
                aria-label="Открыть меню"
              >
                ⋯
              </button>
            </div>

            <div className={styles.skillInfo}>
              <h1 className={styles.title}>{skill.title}</h1>

              <p className={styles.category}>
                {categoryLabels[skill.category] || skill.category}
              </p>

              <div className={styles.tagRow}>
                <span
                  className={`${styles.typeBadge} ${
                    skill.type === 'teach'
                      ? styles.teachBadge
                      : styles.learnBadge
                  }`}
                >
                  {typeLabels[skill.type]}
                </span>

                {skill.tags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className={styles.description}>{skill.description}</p>

              <button className={styles.exchangeButton} type="button">
                Предложить обмен
              </button>
            </div>

            <div className={styles.gallery}>
              <div className={styles.mainImage}>
                <span className={styles.imageText}>Фото навыка</span>
                <button className={styles.galleryArrow} type="button">
                  ‹
                </button>
                <button
                  className={`${styles.galleryArrow} ${styles.galleryArrowRight}`}
                  type="button"
                >
                  ›
                </button>
              </div>

              <div className={styles.thumbnails}>
                <div className={styles.thumbnailOne} />
                <div className={styles.thumbnailTwo} />
                <div className={styles.thumbnailThree}>+3</div>
              </div>
            </div>
          </section>
        </div>

        <section className={styles.similarSection}>
          <h2 className={styles.sectionTitle}>Похожие предложения</h2>

          <div className={styles.similarGrid}>
            {similarOffers.map((offer) => (
              <article className={styles.offerCard} key={offer.id}>
                <button className={styles.likeButton} type="button">
                  ♡
                </button>

                <div className={styles.offerHeader}>
                  <div
                    className={`${styles.offerAvatar} ${
                      styles[offer.avatarClass]
                    }`}
                  />
                  <div>
                    <h3 className={styles.offerName}>{offer.name}</h3>
                    <p className={styles.offerMeta}>
                      {offer.city}, {offer.age} года
                    </p>
                  </div>
                </div>

                <div className={styles.offerBlock}>
                  <h4>Может научить:</h4>
                  <div className={styles.chips}>
                    {offer.canTeach.map((item) => (
                      <span className={styles.chipYellow} key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.offerBlock}>
                  <h4>Хочет научиться:</h4>
                  <div className={styles.chips}>
                    {offer.wantsToLearn.map((item) => (
                      <span className={styles.chipBlue} key={item}>
                        {item}
                      </span>
                    ))}
                    <span className={styles.chipMore}>+2</span>
                  </div>
                </div>

                <Link className={styles.moreButton} to={`/skill/${skill.id}`}>
                  Подробнее
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>✦ SkillSwap</div>

        <div className={styles.footerLinks}>
          <a href="#about">О проекте</a>
          <a href="#skills">Все навыки</a>
        </div>

        <div className={styles.footerLinks}>
          <a href="#contacts">Контакты</a>
          <a href="#blog">Блог</a>
        </div>

        <div className={styles.footerLinks}>
          <a href="#privacy">Политика конфиденциальности</a>
          <a href="#terms">Пользовательское соглашение</a>
        </div>

        <span className={styles.copyright}>SkillSwap — 2025</span>
      </footer>
    </div>
  );
};

export default SkillPage;