import style from './HomePage.module.css';
import SkeletonCard from '../../entities/skeleton-Card/SkeletonCard';
import { FiltersBar } from '../../widgets/FiltersBar/FiltersBar';
import { useSelector } from '../../app/store';
import { selectFilteredSkillCards } from '../../features/skills/selectors';
import { FilterChips } from '../../widgets/FilterChips/FilterChips';
import { selectAllSkillCards } from '../../features/skills/skillsSlice';
import { selectHasActiveFilters } from '../../features/filters/filtersSlice';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

const recomendedPageSize = 9;

const HomePage = () => {
  const filteredCards = useSelector(selectFilteredSkillCards);
  const skills = useSelector(selectAllSkillCards);
  const hasActiveFilters = useSelector(selectHasActiveFilters);

  const {
    visibleItems: visibleRecommendedSkills,
    isLoading,
    hasMore,
    observerRef,
  } = useInfiniteScroll({
    items: skills,
    pageSize: recomendedPageSize,
    loadDelay: 500,
  });

  return (
    <div className={style.homePage}>
      <div className={style.homePage__filter}>
        <FiltersBar></FiltersBar>
      </div>
      {hasActiveFilters ? (
        <div className={style.homePage__filteredCards}>
          <FilterChips />
          <SkeletonCard
            title={`Подходящие предложения: ${filteredCards.length}`}
            skills={filteredCards}
          />
        </div>
      ) : (
        <div className={style.homePage__cards}>
          <SkeletonCard title="Популярное" skills={skills.slice(0, 3)} />
          <SkeletonCard title="Новое" skills={skills.slice(3, 6)} />
          <div className={style.homePage__recommended}>
            <SkeletonCard
              title="Рекомендуем"
              skills={visibleRecommendedSkills}
            />

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
