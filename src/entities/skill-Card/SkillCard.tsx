import React, { useState } from 'react';
import style from './SkillCard.module.css';
import Button from '../../shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import Like from '../../shared/ui/like/Like';
import Skills from '../../shared/ui/skills/Skills';
import { Icon } from '@mdi/react';
import { mdiAccount } from '@mdi/js';

interface SkillCardProps {
  image?: string;
}

const SkillCard: React.FC<SkillCardProps> = (props) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/skill/:1');
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
          <h3 className={style.card__title}>Иван</h3>
          <p className={style.card__subtitle}>Санкт-Петербург, 34 года</p>
        </div>
        <div className={style.card__imageWrapper}>
          {props.image ? (
            <img className={style.card__image} src={props.image}></img>
          ) : (
            <Icon path={mdiAccount} size={2} color={'white'} />
          )}
        <div className={style.card__info}>
            <Like onClick={()=>{setLike(!like)}} onFavorite={like}></Like>
            <div className={style.card__bio}>
                <h3 className={style.card__title}>Иван</h3>
                <p className={style.card__subtitle}>Санкт-Петербург, 34 года</p>
            </div>
            <div className={style.card__imageWrapper}>
                {props.image ? 
                <img className={style.card__image}
                src={props.image}>
                </img> : <Icon path={mdiAccount} size={2} color={'white'}/>}
            </div>
        </div>
        <div className={style.card__skills}>
            <h3 className={style.card__title}>Может научить:</h3>
            <ul className={style.card__skillsList}>
                <Skills title='Игра на барабанах' colorTag='tag'></Skills>
            </ul>
            <h3 className={style.card__title}>Хочет научиться:</h3>
            <ul className={style.card__skillsList}>
                <Skills title='Тайм менеджмент' colorTag='tag'></Skills>
                <Skills title='Медитация' colorTag='tag'></Skills>
            </ul>
        </div>
      </div>
      <div className={style.card__skills}>
        <h3 className={style.card__title}>Может научить:</h3>
        <ul className={style.card__skillsList}>
          <Skills title="Игра на барабанах" colorTag="tag"></Skills>
        </ul>
        <h3 className={style.card__title}>Хочет научиться:</h3>
        <ul className={style.card__skillsList}>
          <Skills title="Тайм менеджмент" colorTag="tag"></Skills>
          <Skills title="Медитация" colorTag="tag"></Skills>
          <Skills title="Навык" colorTag="tag"></Skills>
        </ul>
      </div>
      <div className={style.card__actions}>
        <Button variant="primary" onClick={handleClick}>
          Подробнее
        </Button>
      </div>
    </div>
  );
};

export default SkillCard;
