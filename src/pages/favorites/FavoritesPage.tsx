import React, { useMemo } from 'react';
import { useSelector } from '../../app/store';
import { selectFavorites } from '../../features/Users/userSlice';
import { selectAllSkillCards } from '../../features/skills/skillsSlice';
import SkillCard from '../../entities/skill-Card/SkillCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui/button/Button';
import styles from './FavoritesPage.module.css';
import ProfileMenu from '../../shared/ui/ProfileMenu/ProfileMenu';

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const favoritesIds = useSelector(selectFavorites);
  const allCards = useSelector(selectAllSkillCards);
  
  const favoriteCards = useMemo(() => {
    return allCards.filter(card => favoritesIds.includes(card.id));
  }, [allCards, favoritesIds]);

  if (favoriteCards.length === 0) {
    return (
      <div className={styles.favoritesPage}>
      <ProfileMenu></ProfileMenu>
      <div className={styles.emptyState}>
        <h2>У вас пока нет избранных карточек</h2>
        <p>Нажмите на сердечко на карточке, чтобы добавить её в избранное</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Вернуться в каталог
        </Button>
      </div>
    </div>
    );
  }

  return (
    <div className={styles.favoritesPage}>
      <ProfileMenu></ProfileMenu>
        <div className={styles.cardsGrid}>
          {favoriteCards.map((card) => (
            <SkillCard
              key={card.id}
              id={card.id}
              avatarUrl={card.avatarUrl}
              name={card.name}
              city={card.city}
              age={card.age}
              skills={card.skills}
            />
          ))}
        </div>
    </div>
  );
};

export default FavoritesPage;