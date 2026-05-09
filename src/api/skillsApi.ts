export type SkillType = 'teach' | 'learn';

export type Skill = {
  id: string;
  title: string;
  description: string;
  type: SkillType;
  category: string;
  authorId: string;
  authorName: string;
  tags: string[];
  createdAt: string;
};

export const fetchSkills = async (): Promise<Skill[]> => {
  const response = await fetch('/db/skills.json');

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }

  const skills: Skill[] = await response.json();

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