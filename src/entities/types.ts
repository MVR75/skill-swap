export type TSkillCategory = {
  subcategory: string;
  title: string;
  category: string;
  categoryTitle: string;
  color: string;
};

export type TSkillCard = {
  id: string;
  name: string;
  favorites: boolean;
  city: string;
  age: number;
  birthDate: string;
  gender: string;
  email: string;
  avatarUrl: string;
  shortAbout: string;
  teachTitle: string;
  teachAbout: string;
  teachPhotos: string[];
  skills: {
    canTeach: TSkillCategory[];
    wantsToLearn: TSkillCategory[];
  }
};

type TSubcategory = {
  id: string;
  title: string;
};

export type TCategory = {
  id: string;
  title: string;
  color: string;
  subcategories: TSubcategory[];
};

export const ROLE = {
    ADMIN: 'admin',
    USER: 'user',
} as const;

export type Role = typeof ROLE[keyof typeof ROLE];

export type User = {
  id: string,
    email: string,
    date: Date,
    name: string,
    role: Role,
    gender: string,
    skills: string[]
}
