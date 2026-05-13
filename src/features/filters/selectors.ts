import { createSelector } from "@reduxjs/toolkit";
import { selectAllFilters } from "./filtersSlice";
import { selectCategories } from "../categories/categoriesSlice";
import type { TActiveFilterItem } from './types';

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

export const selectActiveFilterItems = createSelector(
  [selectAllFilters, selectSkillLabels],
  (filters, skillLabels) => {
    const activeFilterItems: TActiveFilterItem[] = [];

    if (filters.gender !== 'any') {
      activeFilterItems.push({
        type: 'gender',
        value: filters.gender,
        label: genderLabels[filters.gender as keyof typeof genderLabels]
      });
    }

    if (filters.skillExchangeIntent !== 'all') {
      activeFilterItems.push({
        type: 'skillExchangeIntent',
        value: filters.skillExchangeIntent,
        label: skillExchangeIntentLabels[filters.skillExchangeIntent as keyof typeof skillExchangeIntentLabels]
      });
    }

    if (filters.city.length > 0) {
      const cityItems: TActiveFilterItem[] = filters.city.map((item) => ({
        type: 'city',
        value: item,
        label: item
      }));

      activeFilterItems.push(...cityItems);
    }

    if (filters.skills.length > 0) {
      const skillsItems: TActiveFilterItem[] = filters.skills.map((skill) => ({
        type: 'skill',
        value: skill,
        label: skillLabels.get(skill) ?? skill
      }));

      activeFilterItems.push(...skillsItems);
    }

    return activeFilterItems;
  }
);
