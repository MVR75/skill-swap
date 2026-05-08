import React from 'react';
import style from './SkeletonCard.module.css';
import {Icon} from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';

interface SkeletonCardProps {
    title: string,
}

const SkeletonCard: React.FC<SkeletonCardProps> = (props) => {
    return (
        <div className={style.skeletonCard}>
        <h2 className={style.skeletonCard__title}>{props.title}</h2>
        <div className={style.skeletonCard__buttonWrapper}>
        <button className={style.button} type='button'>Смотреть все 
<Icon path={mdiChevronRight} size={1} /></button></div>
        <div className={style.skeletonCard__grid}>
            {/* сюда вставим карточки из массива */}
        </div>
        </div>
    );
};

export default SkeletonCard;