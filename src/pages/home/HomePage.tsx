import { useEffect, useState } from "react";

import style from './HomePage.module.css';
import SkeletonCard from "../../entities/skeleton-Card/SkeletonCard";
import { fetchSkills } from "../../api/skillsApi";
import type { TSkillCard } from "../../entities/types";
import { FiltersBar } from "../../widgets/FiltersBar/FiltersBar";
import { useSelector } from "../../app/store";
import { selectFilteredSkillCards } from "../../features/skills/selectors";
import { FilterChips } from "../../widgets/FilterChips/FilterChips";


const HomePage = () => {
  const [skills, setSkills] = useState<TSkillCard[]>([]);
  const [loading, setLoading] = useState(false);
  const filteredCards = useSelector(selectFilteredSkillCards);

  useEffect(()=>{
    const loadingSkills = async() =>{
      try {
        const data = await fetchSkills()
        setSkills(data.users);
      } catch (error) {
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    loadingSkills()
  },[])

  return (
    <div className={style.homePage}>
      <div className={style.homePage__filter}>
        <FiltersBar></FiltersBar>
      </div>
      {loading ? <p>Загрузка</p> : 
        <div className={style.homePage__cards}>
          <SkeletonCard title='Популярное' skills={skills}></SkeletonCard>
          <SkeletonCard title='Новое' skills={skills}></SkeletonCard>
          <SkeletonCard title='Рекомендуем' skills={skills}></SkeletonCard>
        </div>
      }
    </div>
  );
};

export default HomePage;
