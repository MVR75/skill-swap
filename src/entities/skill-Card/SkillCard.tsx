import React from 'react';
import style from './SkillCard.module.css';
import { Button } from '../../shared/ui/button/Button';
import { useNavigate } from 'react-router-dom';
import Like from '../../shared/ui/like/Like';
import Skills from '../../shared/ui/skills/Skills';
import { Icon } from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import type { TSkillCategory } from '../types';
import { useDispatch, useSelector } from '../../app/store';
import { toggleFavorite, selectIsFavorite } from '../../features/Users/userSlice';

interface SkillCardProps {
  id: string; 
  avatarUrl: string;
  name: string;
  city: string;
  age: number;
  skills: {
    canTeach: TSkillCategory[];
    wantsToLearn: TSkillCategory[];
  }
}

const SkillCard: React.FC<SkillCardProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isFavorite = useSelector((state) => selectIsFavorite(state, props.id));
  
  const handleClick = () => {
    navigate(`/skill/${props.id}`);
  };
  
  const handleLikeClick = () => {
    dispatch(toggleFavorite(props.id));
  };
  
  const canTeachSkills = props.skills.canTeach;
  const wantsToLearn = props.skills.wantsToLearn;

  const getAgeWord = (age: number): string => {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'лет';
    }

    if (lastDigit === 1) {
      return 'год';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'года';
    }

    return 'лет';
  };

  return (
    <div className={style.card}>
      <div className={style.card__info}>
        <Like
          onClick={handleLikeClick}
          onFavorite={isFavorite}
        />
        <div>
          <h3 className={style.card__title}>{props.name}</h3>
          <p className={style.card__subtitle}>{props.city}, {props.age} {getAgeWord(props.age)}</p>
        </div>
        <div className={style.card__imageWrapper}>
          {props.avatarUrl ? (
            <img className={style.card__image} src={props.avatarUrl} alt={props.name} />
          ) : (
            <Icon path={mdiAccount} size={2} color={'white'} />
          )}
        </div>
      </div>
      <div className={style.card__skills}>
        <h3 className={style.card__title}>Может научить:</h3>
        <ul className={style.card__skillsList}>
          {canTeachSkills.map((skill, index) => (
            <Skills key={index} title={skill.categoryTitle} colorTag={skill.color} />
          ))}
        </ul>
        <h3 className={style.card__title}>Хочет научиться:</h3>
        <ul className={style.card__skillsList}>
          {wantsToLearn.length > 1 ? (
            <>
              <Skills title={wantsToLearn[0].categoryTitle} colorTag={wantsToLearn[0].color} />
              <div className={style.categoryNumber}>+{wantsToLearn.length - 1}</div>
            </>
          ) : (
            wantsToLearn.length === 1 && (
              <Skills title={wantsToLearn[0].categoryTitle} colorTag={wantsToLearn[0].color} />
            )
          )}
        </ul>
      </div>
      <div className={style.card__actions}>
        <Button variant="primary" onClick={handleClick} className={style.button}>
          Подробнее
        </Button>
      </div>
    </div>
  );
};

export default SkillCard;