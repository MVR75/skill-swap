import type { TCreatedSkill } from '../../../entities/types';

const CREATED_SKILLS_STORAGE_KEY = 'createdSkills';
export function getCreatedSkillsFromStorage(): TCreatedSkill[] {
  const savedSkills = localStorage.getItem(CREATED_SKILLS_STORAGE_KEY);
  if (!savedSkills) {
    return [];
  }
  try {
    return JSON.parse(savedSkills) as TCreatedSkill[];
  } catch {
    return [];
  }
}

export function saveCreatedSkillsToStorage(skills: TCreatedSkill[]) {
  localStorage.setItem(CREATED_SKILLS_STORAGE_KEY, JSON.stringify(skills));
}
