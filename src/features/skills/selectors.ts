import { createSelector } from "@reduxjs/toolkit";
import { selectAllSkillCards } from "./skillsSlice";
import { selectAllFilters } from "../filters/filtersSlice";

export const selectFilteredSkillCards = createSelector(
  [selectAllSkillCards, selectAllFilters],
  (cards, filters) => {
    const isSkillSelected = (cardSkills: string[]) =>
      (filters.skills.length === 0 && cardSkills.length > 0) ||
      filters.skills.some((skill) => cardSkills.includes(skill));

    const matchesSearchQuery = (card: typeof cards[0]) => {
      if (!filters.searchQuery.trim()) return true;
      
      const query = filters.searchQuery.toLowerCase().trim();
      
      const inCanTeach = card.skills.canTeach.some(
        (skill) => skill.title.toLowerCase().includes(query) ||
                  skill.categoryTitle.toLowerCase().includes(query)
      );
      
      const inWantsToLearn = card.skills.wantsToLearn.some(
        (skill) => skill.title.toLowerCase().includes(query) ||
                  skill.categoryTitle.toLowerCase().includes(query)
      );
      
      return inCanTeach || inWantsToLearn;
    };

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

      const matchesSkillExchangeIntent =
        (filters.skillExchangeIntent === "all" &&
          isSkillSelected([
            ...cardCanTeachSkills,
            ...cardWantsToLearnSkills
          ])) ||
        (filters.skillExchangeIntent === "canTeach" &&
          isSkillSelected(cardCanTeachSkills)) ||
        (filters.skillExchangeIntent === "wantsToLearn" &&
          isSkillSelected(cardWantsToLearnSkills));

      return (
        matchesGender &&
        matchesCity &&
        matchesSkillExchangeIntent &&
        matchesSearchQuery(card)
      );
    });
  }
);