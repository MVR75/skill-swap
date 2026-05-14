import React, { useState, useMemo } from 'react';
import { useSelector } from '../../app/store';
import { selectFavorites } from '../../features/Users/userSlice';
import { selectAllSkillCards } from '../../features/skills/skillsSlice';
import SkillCard from '../../entities/skill-Card/SkillCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui/button/Button';
import styles from './FavoritesPage.module.css';

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const favoritesIds = useSelector(selectFavorites);
  const allCards = useSelector(selectAllSkillCards);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const favoriteCards = useMemo(() => {
    return allCards.filter(card => favoritesIds.includes(card.id));
  }, [allCards, favoritesIds]);
  
  const filteredCards = useMemo(() => {
    if (!searchTerm.trim()) return favoriteCards;
    return favoriteCards.filter(card =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [favoriteCards, searchTerm]);

  if (favoriteCards.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>У вас пока нет избранных карточек</h2>
        <p>Нажмите на сердечко на карточке, чтобы добавить её в избранное</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Вернуться в каталог
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.header}>
        <h1>Избранное</h1>
        <p className={styles.count}>Найдено: {filteredCards.length} из {favoriteCards.length}</p>
      </div>
      
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Фильтровать по имени..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className={styles.clearBtn}>
            ✕
          </button>
        )}
      </div>
      
      {filteredCards.length === 0 ? (
        <div className={styles.noResults}>
          <p>Ничего не найдено по запросу "{searchTerm}"</p>
          <button onClick={() => setSearchTerm('')} className={styles.resetBtn}>
            Сбросить фильтр
          </button>
        </div>
      ) : (
        <div className={styles.cardsGrid}>
          {filteredCards.map((card) => (
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
      )}
    </div>
  );
};

export default FavoritesPage;