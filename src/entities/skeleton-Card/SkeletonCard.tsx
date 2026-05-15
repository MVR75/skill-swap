import React from 'react';
import style from './SkeletonCard.module.css';
import { Icon } from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import type { TSkillCard } from '../types';
import SkillCard from '../skill-Card/SkillCard';

interface SkeletonCardProps {
  title: string;
  skills: TSkillCard[];
}

const SkeletonCard: React.FC<SkeletonCardProps> = (props) => {
  return (
    <div className={style.skeletonCard}>
      <h2 className={style.skeletonCard__title}>{props.title}</h2>
      <div className={style.skeletonCard__buttonWrapper}>
        <button className={style.button} type="button">
          Смотреть все <Icon path={mdiChevronRight} size={1} />
        </button>
      </div>
      <div className={style.skeletonCard__grid}>
        {props.skills.map((skill) => (
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
    </div>
  );
};

export default SkeletonCard;