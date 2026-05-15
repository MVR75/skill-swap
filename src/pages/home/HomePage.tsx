import style from './HomePage.module.css';
import SkeletonCard from "../../entities/skeleton-Card/SkeletonCard";
import { FiltersBar } from "../../widgets/FiltersBar/FiltersBar";
import { useSelector } from "../../app/store";
import { selectFilteredSkillCards } from "../../features/skills/selectors";
import { FilterChips } from "../../widgets/FilterChips/FilterChips";
import { selectAllSkillCards } from "../../features/skills/skillsSlice";
import { selectHasActiveFilters } from "../../features/filters/filtersSlice";

const HomePage = () => {
  const filteredCards = useSelector(selectFilteredSkillCards);
  const skills = useSelector(selectAllSkillCards);
  const hasActiveFilters = useSelector(selectHasActiveFilters);

  return (
    <div className={style.homePage}>
      <div className={style.homePage__filter}>
        <FiltersBar></FiltersBar>
      </div>
      {hasActiveFilters ? (
        <div className={style.homePage__filteredCards}>
          <FilterChips/>
          <SkeletonCard title={`Подходящие предложения: ${filteredCards.length}`} skills={filteredCards} />
        </div>
      ) : (
        <div className={style.homePage__cards}>
          <SkeletonCard title='Популярное' skills={skills} />
          <SkeletonCard title='Новое' skills={skills} />
          <SkeletonCard title='Рекомендуем' skills={skills} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
