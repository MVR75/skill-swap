import { useState } from "react";
import { RadioGroupUI } from "../../shared/ui/RadioGroup/RadioGroup";
import { CheckboxUI } from "../../shared/ui/Checkbox/Checkbox";
import { CheckboxTreeUI } from "../../shared/ui/CheckboxTree/CheckboxTree";

const checkBoxOptions = [
  {value: 'painting', label: 'Рисование и иллюстрация'},
  {value: 'photo', label: 'Фотография'},
  {value: 'video', label: 'Видеомонтаж'},
  {value: 'music', label: 'Музыка и звук'}
];

const HomePage = () => {
  const [state, setState] = useState('any');
  const [checkboxState, setCheckboxState] = useState(false);
  const [checkBoxTreeState, setCheckBoxTreeState] = useState<string[]>([]);

  return (
  <>
    <h1>Каталог навыков</h1>

    <RadioGroupUI
      name="gender"
      legend="Пол автора"
      options={[
        {value: "any", label: 'Не имеет значения'},
        {value: "man", label: 'Мужской'},
        {value: "woman", label: 'Женский'}
      ]}
      value={state}
      onChange={setState}
      direction="vertical"
    />

    <CheckboxUI
      label="Москва"
      checked={checkboxState}
      name="city"
      value="Moscow"
      onChange={setCheckboxState}
    />

    <CheckboxTreeUI
      name='art'
      label='Творчество и искусство'
      options={checkBoxOptions}
      value={checkBoxTreeState}
      onChange={setCheckBoxTreeState}
    />
  </>
  );
};

export default HomePage;
