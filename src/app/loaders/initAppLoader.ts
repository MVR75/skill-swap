import type { LoaderFunctionArgs } from "react-router-dom";
import store from "../store";
import { getSkills } from "../../features/skills/skillsSlice";
import { getCategories } from "../../features/categories/categoriesSlice";

export async function initAppLoader(_: LoaderFunctionArgs) {
  const state = store.getState();

  const skillsNotLoaded = state.skills.status === 'idle';
  const categoriesNotLoaded = state.categories.status === 'idle';

  const promises: Promise<unknown>[] = [];

  if (skillsNotLoaded) {
    promises.push(store.dispatch(getSkills()).unwrap());
  }

  if (categoriesNotLoaded) {
    promises.push(store.dispatch(getCategories()).unwrap());
  }

  await Promise.all(promises);

  return null;
}
