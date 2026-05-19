import React, { useEffect, useState } from 'react';
import style from './ProfilePage.module.css'
import edit from '/icons/edit.svg'
import { Input } from '../../shared/ui/Input/Input';
import { Controller, useForm} from 'react-hook-form';
import { DatePicker } from '../register/steps/Step2/ui/DatePicker/DatePicker';
import { Button } from '../../shared/ui/button/Button';
import { AvatarUpload } from '../../shared/ui/AvatarUpload/AvatarUpload';
import { CITIES } from '../register/steps/Step2/cities';
import ProfileMenu from '../../shared/ui/ProfileMenu/ProfileMenu';
import { useDispatch, useSelector } from '../../app/store';
import { selectUserInfo, updateUserInfo } from '../../features/Users/userSlice';
import { Icon } from '@mdi/react';
import { mdiAccount } from '@mdi/js';


const GENDER_OPTIONS = [
  { value: 'unspecified', label: 'Не указан' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

interface FormValues {
    avatar?: File,
    src?: string,
    email: string,
    name: string,
    birthDate: Date | null,
    role: string,
    gender: "мужской" | "женский",
    city: string,
    about: string
}


const ProfilePage: React.FC = () => {
   const user = useSelector(selectUserInfo);
   const dispatch = useDispatch();
    const { control, register, handleSubmit, formState: {isDirty}, reset, watch } = useForm<FormValues>({
    })

    const onSubmit = (data: FormValues) => {
        console.log(data)
        dispatch(updateUserInfo({...data, src: previewUrl ?? ''}));
    }

    const avatarFile = watch('avatar');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      reset({
        avatar: null,
        src: user.src,
        email: user.email,
        name: user.name,
        birthDate: user.birthDate,
        gender: user.gender,
        city: user.city,
        about: user.about,
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (!avatarFile) {
      setPreviewUrl(user?.src ?? null);
      return;
    }
    const objectUrl = URL.createObjectURL(avatarFile);
    setPreviewUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl)
    }},[avatarFile,user])

    return (
    <div className={style.profilePage}>
      <ProfileMenu/>
    <form className={style.profilePage__user} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.profilePage__userWrapper}>
        {previewUrl ? <img className={style.profilePage__userImage} src={previewUrl}></img> : 
        <div className={style.imageWrapper}>
          <Icon path={mdiAccount} size={4} color={'white'} />
        </div>
        }
        <div className={style.profilePage_changeAvarar}>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <AvatarUpload 
              style='24px' previewUrl={previewUrl} onChange={field.onChange} icon={"/icons/gallery-edit.svg"}/>
            )}
            />
        </div>
      </div>
      <div className={style.profilePage__userBio}>
          <div>
            <Input label='Почта' type='email' {...register('email')}
              rightIcon={<img src={edit} alt='Иконка редактировать'/>}>
            </Input>
            <button type='button' className={style.profilePage__button} onClick={()=>{}}>
            Изменить пароль</button>
          </div>
          <Input label='Имя' type='text' {...register('name')}
          rightIcon={<img src={edit} alt='Иконка редактировать'/>}>
          </Input>
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
        <textarea id='about' rows={4} cols={10} className={style.textarea} {...register('about')}>
        </textarea>
        <span className={style.rightIcon}>
          <img src={edit} alt='Иконка редактировать'/>
        </span>
      </div>
      <Button type="submit" variant="primary" disabled={!isDirty}>
            Сохранить
      </Button>
      </div>
    </form>
    </div>
    );
};

export default ProfilePage;
