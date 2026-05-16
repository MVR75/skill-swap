import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { TSkillCard, TCreatedSkill } from '../../entities/types';
import { fetchSkills } from '../../api/skillsApi';
import {
  getCreatedSkillsFromStorage,
  saveCreatedSkillsToStorage,
} from '../../pages/shared/lib/createdSkillsStorage';

export const getSkills = createAsyncThunk<
  TSkillCard[],
  void,
  { rejectValue: string }
>('skills/get', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchSkills();
    return response.users;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Не удалось загрузить данные';
    return rejectWithValue(message);
  }
});

type TSkillsState = {
  cards: TSkillCard[];
  createdSkills: TCreatedSkill[];
};

const initialState: TSkillsState = {
  cards: [],
  createdSkills: getCreatedSkillsFromStorage(),
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addCreatedSkill: (state, action: PayloadAction<TCreatedSkill>) => {
      state.createdSkills.push(action.payload);
      saveCreatedSkillsToStorage(state.createdSkills);
    },

    removeCreatedSkill: (state, action: PayloadAction<string>) => {
      state.createdSkills = state.createdSkills.filter(
        (skill) => skill.id !== action.payload
      );

      saveCreatedSkillsToStorage(state.createdSkills);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSkills.fulfilled, (state, action) => {
      state.cards = action.payload;
    });
  },
  selectors: {
    selectAllSkillCards: (state) => state.cards,
    selectCreatedSkills: (state) => state.createdSkills,
  },
});

export const { addCreatedSkill, removeCreatedSkill } = skillsSlice.actions;
export const { selectAllSkillCards, selectCreatedSkills } = skillsSlice.selectors;