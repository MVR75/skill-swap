import { useState } from "react";
import { RadioGroupUI } from "../../shared/ui/RadioGroup/RadioGroup";
import { CheckboxUI } from "../../shared/ui/Checkbox/Checkbox";
import { CheckboxGroupUI } from "../../shared/ui/CheckboxGroup/CheckboxGroup";

const businessOptions = [
  { value: "painting", label: "Управление командой" },
  { value: "photo", label: "Маркетинг и реклама" },
  { value: "video", label: "Продажи и переговоры" },
  { value: "music", label: "Личный бренд" },
  { value: "sculpture", label: "Резюме и собеседование" },
  { value: "design", label: "Тайм-менеджмент" },
];

const cityOptions = [
  { value: "moscow", label: "Москва" },
  { value: "spb", label: "Санкт-Петербург" },
  { value: "nsk", label: "Новосибирск" },
  { value: "ekb", label: "Екатеринбург" },
  { value: "kazan", label: "Казань" },
  { value: "sochi", label: "Сочи" },
];

const artOptions = [
  { value: "frontend", label: "Рисование и иллюстрация" },
  { value: "backend", label: "Фотография" },
  { value: "qa", label: "Видеомонтаж" },
  { value: "devops", label: "Музыка и звук" },
];

const HomePage = () => {
  const [state, setState] = useState("any");
  const [checkboxState, setCheckboxState] = useState(false);
  const [cityGroupState, setCityGroupState] = useState<string[]>([]);
  const [businessTreeState, setBusinessTreeState] = useState<string[]>([]);
  const [artTreeState, setArtTreeState] = useState<string[]>([]);

  return (
    <>
      <h1>Catalog</h1>

      <RadioGroupUI
        name="gender"
        legend="Пол автора"
        options={[
          { value: "any", label: "Не имеет значения" },
          { value: "man", label: "Мужской" },
          { value: "woman", label: "Женский" },
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

      <CheckboxGroupUI
        type="normal"
        name="cities"
        legend="Город"
        options={cityOptions}
        value={cityGroupState}
        onChange={setCityGroupState}
      />

      <CheckboxGroupUI
        type="tree"
        name="skills"
        legend="Навыки"
        trees={[
          {
            name: "business",
            label: "Бизнес и карьера",
            options: businessOptions,
            value: businessTreeState,
            onChange: setBusinessTreeState,
          },
          {
            name: "art",
            label: "Творчество и искусство",
            options: artOptions,
            value: artTreeState,
            onChange: setArtTreeState,
          },
        ]}
      />
    </>
  );
};

export default HomePage;
