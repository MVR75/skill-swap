import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  type TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
<<<<<<< feature/register-step-2
import { skillsSlice } from '../features/skills/skillsSlice';
import { categoriesSlice } from '../features/categories/categoriesSlice';

export const rootReducer = combineSlices(skillsSlice, categoriesSlice);
=======
import { skillsSlice } from "../features/skills/skillsSlice";
import { categoriesSlice } from "../features/categories/categoriesSlice";
import { filtersSlice } from "../features/filters/filtersSlice";

export const rootReducer = combineSlices(
  skillsSlice,
  categoriesSlice,
  filtersSlice
);
>>>>>>> main

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
