import { useState, useMemo } from 'react';
import style from './HomePage.module.css';
import SkeletonCard from '../../entities/skeleton-Card/SkeletonCard';
import { FiltersBar } from '../../widgets/FiltersBar/FiltersBar';
import { useSelector } from '../../app/store';
import { selectFilteredSkillCards } from '../../features/skills/selectors';
import { FilterChips } from '../../widgets/FilterChips/FilterChips';
import { selectAllSkillCards } from '../../features/skills/skillsSlice';
import { selectHasActiveFilters } from '../../features/filters/filtersSlice';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import SkillCard from '../../entities/skill-Card/SkillCard';

const POPULAR_PAGE_SIZE = 3;
const NEW_PAGE_SIZE = 3;
const RECOMMENDED_PAGE_SIZE = 9;

const HomePage = () => {
  const [isPopularExpanded, setIsPopularExpanded] = useState(false);
  const [isNewExpanded, setIsNewExpanded] = useState(false);
  const [isFilteredNewestFirst, setIsFilteredNewestFirst] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const filteredCards = useSelector(selectFilteredSkillCards);
  const allSkills = useSelector(selectAllSkillCards);
  const hasActiveFilters = useSelector(selectHasActiveFilters);

  const getNewestFirst = (cards: typeof allSkills) => {
    return [...cards].reverse();
  };

  const displayedFilteredCards = useMemo(() => {
    if (!hasActiveFilters) return [];
    return isFilteredNewestFirst ? getNewestFirst(filteredCards) : filteredCards;
  }, [filteredCards, hasActiveFilters, isFilteredNewestFirst]);

  const allPopularSkills = useMemo(() => allSkills.slice(0, 9), [allSkills]);
  
  const displayedPopularSkills = useMemo(() => {
    if (isPopularExpanded) {
      return allPopularSkills;
    }
    return allPopularSkills.slice(0, POPULAR_PAGE_SIZE);
  }, [allPopularSkills, isPopularExpanded]);

  const allNewSkills = useMemo(() => {
    return [...allSkills].reverse();
  }, [allSkills]);

  const displayedNewSkills = useMemo(() => {
    if (isNewExpanded) {
      return allNewSkills;
    }
    return allNewSkills.slice(0, NEW_PAGE_SIZE);
  }, [allNewSkills, isNewExpanded]);

  const { visibleItems: recommendedSkills, isLoading, hasMore, observerRef } = useInfiniteScroll({
    items: allSkills,
    pageSize: RECOMMENDED_PAGE_SIZE,
    loadDelay: 500,
  });

  const handlePopularToggle = () => {
    setIsPopularExpanded(!isPopularExpanded);
  };

  const handleNewToggle = () => {
    setIsNewExpanded(!isNewExpanded);
  };

  const handleFilteredToggle = () => {
    setIsFilteredNewestFirst(!isFilteredNewestFirst);
  };

  const getPopularButtonText = () => {
    return isPopularExpanded ? 'Сначала новые' : 'Смотреть все';
  };

  const getNewButtonText = () => {
    return isNewExpanded ? 'Сначала новые' : 'Смотреть все';
  };

  const getFilteredButtonText = () => {
    return isFilteredNewestFirst ? 'Смотреть все' : 'Сначала новые';
  };

  return (
    <div className={style.homePage}>
      <button
        type="button"
        className={style.homePage__filterToggle}
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        aria-label={isFiltersOpen ? 'Закрыть фильтры' : 'Открыть фильтры'}
        aria-expanded={isFiltersOpen}
      >
        <img src={`${import.meta.env.BASE_URL}icons/sort.svg`} alt="" aria-hidden="true" />
        <span>Фильтры</span>
      </button>

      {isFiltersOpen && (
        <div
          className={style.homePage__filterOverlay}
          onClick={() => setIsFiltersOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={`${style.homePage__filter} ${isFiltersOpen ? style.homePage__filterOpen : ''}`}>
        <button
          type="button"
          className={style.homePage__filterClose}
          onClick={() => setIsFiltersOpen(false)}
          aria-label="Закрыть фильтры"
        >
          ✕
        </button>
        <FiltersBar />
      </div>
      {hasActiveFilters ? (
        <div className={style.homePage__filteredCards}>
          <FilterChips />
          <SkeletonCard
            title={`Подходящие предложения: ${displayedFilteredCards.length}`}
            skills={displayedFilteredCards}
            buttonText={getFilteredButtonText()}
            onButtonClick={handleFilteredToggle}
          />
        </div>
      ) : (
        <div className={style.homePage__cards}>
          <SkeletonCard 
            title="Популярное" 
            skills={displayedPopularSkills}
            buttonText={getPopularButtonText()}
            onButtonClick={handlePopularToggle}
          />
          <SkeletonCard 
            title="Новое" 
            skills={displayedNewSkills}
            buttonText={getNewButtonText()}
            onButtonClick={handleNewToggle}
          />
          <div className={style.homePage__recommended}>
            <h2 className={style.homePage__recommendedTitle}>Рекомендуем</h2>
            <div className={style.homePage__recommendedGrid}>
              {recommendedSkills.map((skill) => (
                <SkillCard 
                  key={skill.id}
                  id={skill.id}
                  avatarUrl={skill.avatarUrl} 
                  name={skill.name}
                  city={skill.city}
                  age={skill.age}
                  skills={skill.skills}
                />
              ))}
            </div>

            {hasMore && (
              <div
                ref={observerRef}
                className={style.homePage__scrollTrigger}
                aria-hidden="true"
              />
            )}

            {isLoading && (
              <p className={style.homePage__loading}>
                Загружаем предложения, подождите
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;