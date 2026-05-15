import React, { useState } from 'react';
import style from './SkillCard.module.css';
import {Button} from '../../shared/ui/button/Button';
import { useNavigate } from 'react-router-dom';
import Like from '../../shared/ui/like/Like';
import Skills from '../../shared/ui/skills/Skills';
import { Icon } from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import type { TSkillCategory } from '../types';

interface SkillCardProps {
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
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/skill/:1');
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
          onClick={() => {
            setLike(!like);
          }}
          onFavorite={like}
        ></Like>
        <div>
          <h3 className={style.card__title}>{props.name}</h3>
          <p className={style.card__subtitle}>{props.city}, {props.age} {getAgeWord(props.age)}</p>
        </div>
        <div className={style.card__imageWrapper}>
          {props.avatarUrl ? (
            <img className={style.card__image} src={props.avatarUrl}></img>
          ) : (
            <Icon path={mdiAccount} size={2} color={'white'} />
          )}
      </div>
      </div>
      <div className={style.card__skills}>
        <h3 className={style.card__title}>Может научить:</h3>
        <ul className={style.card__skillsList}>
          {canTeachSkills.map((skill)=>{
            return(<Skills title={skill.categoryTitle} colorTag={skill.color}></Skills>)
          })}
        </ul>
        <h3 className={style.card__title}>Хочет научиться:</h3>
        <ul className={style.card__skillsList}>
         {wantsToLearn.length > 1 ? <> <Skills title={wantsToLearn[0].categoryTitle} colorTag={wantsToLearn[0].color}></Skills>
    <div className={style.categoryNumber}>+{wantsToLearn.length - 1}</div>
    </> : <Skills title={wantsToLearn[0].categoryTitle} colorTag={wantsToLearn[0].color}></Skills>} 
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
