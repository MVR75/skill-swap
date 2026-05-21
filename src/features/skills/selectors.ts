import { createSelector } from "@reduxjs/toolkit";
import { selectAllSkillCards } from "./skillsSlice";
import { selectAllFilters } from "../filters/filtersSlice";
import { selectCategories } from "../categories/categoriesSlice";

export const selectFilteredSkillCards = createSelector(
  [selectAllSkillCards, selectAllFilters, selectCategories],
  (cards, filters, categories) => {
    const isSkillSelected = (cardSkills: string[]) =>
      (filters.skills.length === 0 && cardSkills.length > 0) ||
      filters.skills.some((skill) => cardSkills.includes(skill));

    const categoryToSubcategories: Record<string, string[]> = {};
    categories.forEach((category) => {
      categoryToSubcategories[category.title] = category.subcategories.map(
        (sub) => sub.id
      );
    });

    const searchQueryToSubcategories = (query: string): string[] => {
      const lowerQuery = query.toLowerCase().trim();
      const result: string[] = [];

      for (const [categoryTitle, subcategories] of Object.entries(categoryToSubcategories)) {
        if (categoryTitle.toLowerCase().includes(lowerQuery)) {
          result.push(...subcategories);
        }
      }

      categories.forEach((category) => {
        category.subcategories.forEach((sub) => {
          if (sub.title.toLowerCase().includes(lowerQuery)) {
            result.push(sub.id);
          }
        });
      });

      return [...new Set(result)];
    };

    const matchesSearchQuery = (card: typeof cards[0]) => {
      if (!filters.searchQuery.trim()) return true;
      
      const targetSubcategories = searchQueryToSubcategories(filters.searchQuery);
      
      if (targetSubcategories.length === 0) {
        const query = filters.searchQuery.toLowerCase().trim();
        
        if (filters.skillExchangeIntent === "canTeach") {
          return card.skills.canTeach.some(
            (skill) => skill.title.toLowerCase().includes(query) ||
                      skill.categoryTitle.toLowerCase().includes(query)
          );
        }
        
        if (filters.skillExchangeIntent === "wantsToLearn") {
          return card.skills.wantsToLearn.some(
            (skill) => skill.title.toLowerCase().includes(query) ||
                      skill.categoryTitle.toLowerCase().includes(query)
          );
        }
        
        return card.skills.canTeach.some(
          (skill) => skill.title.toLowerCase().includes(query) ||
                    skill.categoryTitle.toLowerCase().includes(query)
        ) || card.skills.wantsToLearn.some(
          (skill) => skill.title.toLowerCase().includes(query) ||
                    skill.categoryTitle.toLowerCase().includes(query)
        );
      }
      
      if (filters.skillExchangeIntent === "canTeach") {
        return card.skills.canTeach.some(s => 
          targetSubcategories.includes(s.subcategory)
        );
      }
      
      if (filters.skillExchangeIntent === "wantsToLearn") {
        return card.skills.wantsToLearn.some(s => 
          targetSubcategories.includes(s.subcategory)
        );
      }
      
      const allCardSubcategories = [
        ...card.skills.canTeach.map(s => s.subcategory),
        ...card.skills.wantsToLearn.map(s => s.subcategory)
      ];
      
      return targetSubcategories.some(target => 
        allCardSubcategories.includes(target)
      );
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