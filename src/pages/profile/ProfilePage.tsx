import React from 'react';
import style from './ProfilePage.module.css'
import message from '../../../public/icons/message-text.svg'
import email from '../../../public/icons/request.svg'
import like from '../../../public/icons/like.svg';
import idea from '../../../public/icons/idea.svg';
import person from '../../../public/icons/user.svg';
import edit from '../../../public/icons/edit.svg'
import { Input } from '../../shared/ui/Input/Input';
import { NavLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '../register/steps/Step2/ui/DatePicker/DatePicker';
import { Button } from '../../shared/ui/Button/Button';
import { AvatarUpload } from '../../shared/ui/AvatarUpload/AvatarUpload';
import { CITIES } from '../register/steps/Step2/cities';

interface ProfilePageProps {
    
}

const GENDER_OPTIONS = [
  { value: 'unspecified', label: 'Не указан' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

interface FormValues {
    avatar?: File,
    src: string,
    email: string,
    name: string,
    birthDate: Date | null,
    role: string,
    gender: "мужской" | "женский",
    city: string,
    about: string
}

const ProfilePage: React.FC = () => {
    const { control, register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            src: "https://avatars.mds.yandex.net/i?id=f83c2d898ae716aefd02824274a270a0_l-10139465-images-thumbs&n=13",
            email: "ivan@example.com",
            name: "Иван",
            birthDate: new Date('2011-05-24'),
            role: "user",
            gender: "мужской",
            city: 'Москва',
            about: ''
        }
    })

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    const menuItems = [
        {icon: email,
        alt: 'Иконка почты',
        text: 'Заявки',
        to: '/profile/application'
        },
        {icon: message,
        alt: 'Иконка сообщения',
        text: 'Мои обмены',
        to: '/profile/message'
        },
        {icon: like,
        alt: 'Иконка лайка',
        text: "Избранное",
        to: '/favorites'
        },
        {icon: idea,
        alt: 'Иконка лампочки',
        text: 'Мои навыки',
        to: '/profile/skills'
        },
        {icon: person,
        alt: 'Иконка профиля',
        text: 'Личные данные',
        to: '/profile'
        },
    ]

    return (
        <div className={style.profilePage}>
            <nav className={style.profilePage__menu}>
                    <ul className={style.profilePage__menuList}>
                       {menuItems.map((item) => (
                        <NavLink className={({isActive}) =>(isActive ? `${style.link_active}` : `${style.profilePage__menuItem}`)} key={item.text} to={item.to}>
                        <img src={item.icon} alt={item.alt} aria-hidden='true' className={style.icon}/>{item.text}</NavLink>
                       ))}
                    </ul>
            </nav>
            <form className={style.profilePage__user} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.profilePage__userWrapper}>
                <img className={style.profilePage__userImage} src="https://avatars.mds.yandex.net/i?id=f83c2d898ae716aefd02824274a270a0_l-10139465-images-thumbs&n=13"></img>
                <div className={style.profilePage_changeAvarar}>
                    <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                    <AvatarUpload value={field.value} style='24px' onChange={field.onChange} icon={"/icons/gallery-edit.svg"}/>
                    )}
                    />
                </div>
                </div>
                <div className={style.profilePage__userBio}>
                    <div>
                    <Input label='Почта' type='email' 
                        rightIcon={<img src={edit} alt='Иконка редактировать' aria-hidden="true"/>}></Input>
                    <button type='button' className={style.profilePage__button} onClick={()=>{}}>Изменить пароль</button>
                    </div>
                    <Input label='Имя' type='text' 
                        rightIcon={<img src={edit} alt='Иконка редактировать' aria-hidden="true"/>}></Input>
                    <div className={style.profilePage__wrapper}>
                    <Controller
            name="birthDate"
            control={control}
            render={({field}) => (
              <DatePicker
                label="Дата рождения"
                value={field.value ?? null}
                onChange={field.onChange}
              />
            )}
          />
            <div className={style.field}>
          <label className={style.label} htmlFor="gender">
            Пол
          </label>
          <select id="gender" className={style.select} {...register('gender')}>
            {GENDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className={style.field}>
        <label className={style.label} htmlFor="city">
          Город
        </label>
        <select id="city" className={style.select} {...register('city')}>
          <option value="">Не указан</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className={style.field}>
        <label className={style.label} htmlFor="about">О себе</label>
        <textarea id='about' rows={4} cols={10} className={style.textarea}>
        </textarea>
         <span className={style.rightIcon}>
                <img src={edit} alt='Иконка редактировать' aria-hidden="true"/>
            </span>
        </div>
        <Button type="submit" variant="primary">
            Сохранить
        </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;
