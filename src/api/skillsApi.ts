import type { TSkillCard } from "../entities/types";

type TSkillsResponse = {
  users: TSkillCard[];
};

export const fetchSkills = async (): Promise<TSkillsResponse> => {
  const response = await fetch('/db/skills.json');

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }

  const skills: TSkillsResponse = await response.json();

  return skills;
};

export const fetchSkillById = async (id: string): Promise<Skill> => {
  const skills = await fetchSkills();

  const skill = skills.find((s) => s.id === id);

  if (!skill) {
    throw new Error('Навык не найден');
  }

  return skill;
};