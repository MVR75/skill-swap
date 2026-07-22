import type { TSkillCard } from '../entities/types';

type TSkillsResponse = {
  users: TSkillCard[];
};

export const fetchSkills = async (): Promise<TSkillsResponse> => {
  const response = await fetch(`${import.meta.env.BASE_URL}/db/skills.json`);

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }

  const skills: TSkillsResponse = await response.json();

  return skills;
};

export const fetchSkillById = async (id: string): Promise<TSkillCard> => {
  const { users } = await fetchSkills();

  const skill = users.find((item) => item.id === id);

  if (!skill) {
    throw new Error('Навык не найден');
  }

  return skill;
};