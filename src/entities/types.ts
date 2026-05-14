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
