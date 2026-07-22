import type { TCategory } from "../entities/types";

type TCategoriesResponse = TCategory[];

export const fetchCategories = async (): Promise<TCategoriesResponse> => {
  const response = await fetch(`${import.meta.env.BASE_URL}/db/categories.json`);

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }

  const categories: TCategoriesResponse = await response.json();

  return categories;
};
