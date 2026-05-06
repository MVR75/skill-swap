import React from 'react';
// import like from '../../../../public/icons/Like.svg';
import style from './Like.module.css';
import {Icon} from '@mdi/react';
import { mdiHeart } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';

interface LikeProps {
    onClick: () => void,
    onFavorite: boolean,
}

const Like: React.FC<LikeProps> = (props) => {
    return (
        <button onClick={props.onClick} className={style.button_wrapper}>
            {props.onFavorite ? 
          <Icon path={mdiHeart} size={1} color='#ABD27A' title='Like' />
          :
          <Icon path={mdiHeartOutline} size={1} title='Like' />
          }
        </button>
    );
};

export default Like;
