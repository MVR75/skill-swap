import { createSelector } from "@reduxjs/toolkit";
import { selectActiveFilterValues } from "./filtersSlice";
import { selectCategories } from "../categories/categoriesSlice";

const selectSkillLabels = createSelector(
  [selectCategories],
  (categories) => {
    const skillLabels = new Map<string, string>();

    categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        skillLabels.set(subcategory.id, subcategory.title);
      });
    });

    return skillLabels;
  }
);

const genderLabels = {
  male: 'Мужской',
  female: 'Женский'
};

const skillExchangeIntentLabels = {
  canTeach: 'Могу научить',
  wantsToLearn: 'Хочу научиться'
};

export const selectActiveFilterLabels = createSelector(
  [selectActiveFilterValues, selectSkillLabels],
  (values, skillLabels) => {
    return values.map((value) => {
      if (value in genderLabels) {
        return genderLabels[value as keyof typeof genderLabels];
      }

      if (value in skillExchangeIntentLabels) {
        return skillExchangeIntentLabels[
          value as keyof typeof skillExchangeIntentLabels
        ];
      }

      const skillLabel = skillLabels.get(value);

      if (skillLabel) return skillLabel;

      return value;
    });
  }
);
