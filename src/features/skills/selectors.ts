import { createSelector } from "@reduxjs/toolkit";
import { selectAllSkillCards } from "./skillsSlice";
import { selectAllFilters } from "../filters/filtersSlice";

export const selectFilteredSkillCards = createSelector(
  [selectAllSkillCards, selectAllFilters],
  (cards, filters) => {
    return cards.filter((card) => {
      const matchesGender =
        filters.gender === "any" || card.gender === filters.gender;

      const matchesCity =
        filters.city.length === 0 || filters.city.includes(card.city);

      const cardCanTeachSkills = card.skills.canTeach.map(
        (skill) => skill.subcategory
      );

      const cardWantsToLearnSkills = card.skills.wantsToLearn.map(
        (skill) => skill.subcategory
      );

      const matchesSkills =
        filters.skills.length === 0 ||
        filters.skills.some((skill) =>
          cardCanTeachSkills.includes(skill) ||
          cardWantsToLearnSkills.includes(skill)
        );

      const matchesSkillExchangeIntent =
        filters.skillExchangeIntent === "all" ||
        (filters.skillExchangeIntent === "canTeach" &&
          filters.skills.some((skill) => cardCanTeachSkills.includes(skill))) ||
        (filters.skillExchangeIntent === "wantToLearn" &&
          filters.skills.some((skill) => cardWantsToLearnSkills.includes(skill)));

      return (
        matchesGender &&
        matchesCity &&
        matchesSkills &&
        matchesSkillExchangeIntent
      );
    });
  }
);
