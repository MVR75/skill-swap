export const getSkills = async () => {
  const res = await fetch('/db/skills.json');
  return res.json();
};
