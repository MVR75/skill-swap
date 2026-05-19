import React from 'react';
import message from '../../../../public/icons/message-text.svg';
import email from '../../../../public/icons/request.svg'
import like from '../../../../public/icons/like.svg';
import idea from '../../../../public/icons/idea.svg';
import person from '../../../../public/icons/user.svg';
import style from './ProfileMenu.module.css'
import { NavLink } from 'react-router-dom';

interface ProfileMenuProps {
    
}

const ProfileMenu: React.FC<ProfileMenuProps> = () => {

    const menuItems = [
        {icon: email,
        alt: 'Иконка почты',
        text: 'Заявки',
        to: '/profile?tab=requests'
        },
        {icon: message,
        alt: 'Иконка сообщения',
        text: 'Мои обмены',
        to: '/profile?tab=exchanges'
        },
        {icon: like,
        alt: 'Иконка лайка',
        text: "Избранное",
        to: '/favorites'
        },
        {icon: idea,
        alt: 'Иконка лампочки',
        text: 'Мои навыки',
        to: '/profile?tab=skills'
        },
        {icon: person,
        alt: 'Иконка профиля',
        text: 'Личные данные',
        to: '/profile'
        },
    ]

    return (
        <nav className={style.profilePage__menu}>
        <ul className={style.profilePage__menuList}>
          {menuItems.map((item) => (
            <NavLink 
              className={({isActive}) => (isActive ? `${style.link_active}` : `${style.profilePage__menuItem}`)} 
              key={item.text} 
              to={item.to}
              end={item.to === '/profile'}
            >
              <img src={item.icon} alt={item.alt} className={style.icon}/>
              {item.text}
            </NavLink>
          ))}
        </ul>
      </nav>
    );
};

export default ProfileMenu;