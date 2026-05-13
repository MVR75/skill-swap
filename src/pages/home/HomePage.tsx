import { useState } from 'react';
import { FiltersBarUI } from '../../widgets/FiltersBar/FiltersBarUI';

const genderOptions = [
  { value: 'any', label: 'Не имеет значения' },
  { value: 'man', label: 'Мужской' },
  { value: 'woman', label: 'Женский' },
];

const skillExchangeIntentOptions = [
  { value: 'all', label: 'Все' },
  { value: 'wantToTeach', label: 'Хочу научиться' },
  { value: 'canToTeach', label: 'Могу научить' },
];

const businessOptions = [
  { value: 'painting', label: 'Управление командой' },
  { value: 'photo', label: 'Маркетинг и реклама' },
  { value: 'video', label: 'Продажи и переговоры' },
  { value: 'music', label: 'Личный бренд' },
  { value: 'sculpture', label: 'Резюме и собеседование' },
  { value: 'design', label: 'Тайм-менеджмент' },
];

const cityOptions = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'nsk', label: 'Новосибирск' },
  { value: 'ekb', label: 'Екатеринбург' },
  { value: 'kazan', label: 'Казань' },
  { value: 'sochi', label: 'Сочи' },
];

const artOptions = [
  { value: 'frontend', label: 'Рисование и иллюстрация' },
  { value: 'backend', label: 'Фотография' },
  { value: 'qa', label: 'Видеомонтаж' },
  { value: 'devops', label: 'Музыка и звук' },
];

const HomePage = () => {
  const [gender, setGender] = useState('any');
  const [skillExchangeIntent, setSkillExchangeIntent] = useState('all');
  const [cityGroupState, setCityGroupState] = useState<string[]>([]);
  const [businessTreeState, setBusinessTreeState] = useState<string[]>([]);
  const [artTreeState, setArtTreeState] = useState<string[]>([]);

  const skillsFilter = {
    type: 'tree' as const,
    name: 'skills',
    legend: 'Навыки',
    trees: [
      {
        name: 'business',
        label: 'Бизнес и карьера',
        options: businessOptions,
        value: businessTreeState,
        onChange: setBusinessTreeState,
      },
      {
        name: 'art',
        label: 'Творчество и искусство',
        options: artOptions,
        value: artTreeState,
        onChange: setArtTreeState,
      },
    ],
  };

  const genderFilter = {
    name: 'gender',
    legend: 'Пол автора',
    options: genderOptions,
    value: gender,
    onChange: setGender,
  };

  const skillExchangeIntentFilter = {
    name: 'skillExchangeIntent',
    options: skillExchangeIntentOptions,
    value: skillExchangeIntent,
    onChange: setSkillExchangeIntent,
  };

  const cityFilter = {
    type: 'normal' as const,
    name: 'cities',
    legend: 'Город',
    options: cityOptions,
    value: cityGroupState,
    onChange: setCityGroupState,
  };

  return (
    <>
      <h1>Catalog</h1>

      <FiltersBarUI
        skillExchangeIntentFilter={skillExchangeIntentFilter}
        skillsFilter={skillsFilter}
        genderFilter={genderFilter}
        cityFilter={cityFilter}
      />
    </>
  );
};

export default HomePage;
