import { useMemo } from "react";
import { useDispatch, useSelector } from "../../app/store";
import { selectCategories } from "../../features/categories/categoriesSlice";
import {
  changeCities,
  changeGender,
  changeSkillIntent,
  changeSkills,
  clearFilter,
  selectActiveFilterValues,
  selectCities,
  selectGender,
  selectSkillExchangeIntent,
  selectSkills
} from "../../features/filters/filtersSlice";
import { selectAllSkillCards } from "../../features/skills/skillsSlice";
import { FiltersBarUI } from "./FiltersBarUI";
import { mapCategoriesToSkillTrees } from "./model/mapCategoriesToSkillTrees";

const skillExchangeIntentOptions = [
  { value: "all", label: "Все" },
  { value: "wantsToLearn", label: "Хочу научиться" },
  { value: "canTeach", label: "Могу научить" },
];

const genderOptions = [
  { value: "any", label: "Не имеет значения" },
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
];

export const FiltersBar = () => {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const skillCards = useSelector(selectAllSkillCards);

  const skillExchangeIntent = useSelector(selectSkillExchangeIntent);
  const skills = useSelector(selectSkills);
  const gender = useSelector(selectGender);
  const cities = useSelector(selectCities);
  const activeFilterValues = useSelector(selectActiveFilterValues);

  const cityOptions = useMemo(() => {
    const uniqueCities = new Set(skillCards.map((card) => card.city));

    return Array.from(uniqueCities)
      .sort((cityA, cityB) => cityA.localeCompare(cityB))
      .map((city) => ({
        value: city,
        label: city
      }));
  }, [skillCards]);

  const skillTrees = useMemo(() => {
    const handleCategorySkillsChange = (
      categorySkillValues: string[],
      nextValue: string[]
    ) => {
      const skillsFromOtherCategories = skills.filter(
        (skill) => !categorySkillValues.includes(skill)
      );

      dispatch(changeSkills([...skillsFromOtherCategories, ...nextValue]));
    };

    return mapCategoriesToSkillTrees(
      categories,
      skills,
      handleCategorySkillsChange
    );
  }, [categories, skills, dispatch]);

  const skillExchangeIntentFilter = {
    name: 'skillExchangeIntent',
    options: skillExchangeIntentOptions,
    value: skillExchangeIntent,
    onChange: (value: string) => dispatch(changeSkillIntent(value))
  };

  const skillsFilter = {
    type: "tree" as const,
    name: "skills",
    legend: "Навыки",
    trees: skillTrees
  };

  const genderFilter = {
    name: 'gender',
    legend: 'Пол автора',
    options: genderOptions,
    value: gender,
    onChange: (value: string) => dispatch(changeGender(value))
  };

  const cityFilter = {
    type: "normal" as const,
    name: "cities",
    legend: "Город",
    options: cityOptions,
    value: cities,
    onChange: (value: string[]) => dispatch(changeCities(value))
  };

  return (
    <FiltersBarUI
      skillExchangeIntentFilter={skillExchangeIntentFilter}
      skillsFilter={skillsFilter}
      genderFilter={genderFilter}
      cityFilter={cityFilter}
      filterCount={activeFilterValues.length}
      onClear={() => dispatch(clearFilter())}
    />
  );
};
