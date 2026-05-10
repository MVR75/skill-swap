import { useState } from "react";
import { RadioGroupUI } from "../../shared/ui/RadioGroup/RadioGroup";

const HomePage = () => {
  const [state, setState] = useState('any');

  return (
  <>
    <h1>Каталог навыков</h1>
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
  </>
  );
};
export default HomePage;
