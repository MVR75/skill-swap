import type { TCategory } from "../../../entities/types";

type TOnChangeCategory = (
  categorySkillValues: string[],
  nextValue: string[]
) => void;

export const mapCategoriesToSkillTrees = (
  categories: TCategory[],
  selectedSkills: string[],
  onChangeCategory: TOnChangeCategory
) => {
  return categories.map((category) => {
    const options = category.subcategories.map((subcategory) => ({
      value: subcategory.id,
      label: subcategory.title
    }));

    const categorySkillValues = options.map((option) => option.value);

    return {
      name: category.id,
      label: category.title,
      options,
      value: selectedSkills.filter((skill) =>
        categorySkillValues.includes(skill)
      ),
      onChange: (value: string[]) =>
        onChangeCategory(categorySkillValues, value)
    };
  });
};
