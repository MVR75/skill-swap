import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TSkillCard } from "../../entities/types";
import { fetchSkills, fetchSkillById } from "../../api/skillsApi";

export const getSkills = createAsyncThunk<TSkillCard[], void, { rejectValue: string }>(
  'skills/getSkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSkills();
      return response.users;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не удалось загрузить данные';
      return rejectWithValue(message);
    }
  }
);

export const getSkillById = createAsyncThunk<TSkillCard, string, { rejectValue: string }>(
  'skills/getSkillById',
  async (id, { rejectWithValue }) => {
    try {
      const skill = await fetchSkillById(id);
      return skill;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Навык не найден';
      return rejectWithValue(message);
    }
  }
);

type TSkillsState = {
  cards: TSkillCard[];
  currentSkill: TSkillCard | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TSkillsState = {
  cards: [],
  currentSkill: null,
  isLoading: false,
  error: null,
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.isLoading = false;
      })
      .addCase(getSkills.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки навыков';
      })
      .addCase(getSkillById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentSkill = null;
      })
      .addCase(getSkillById.fulfilled, (state, action) => {
        state.currentSkill = action.payload;
        state.isLoading = false;
      })
      .addCase(getSkillById.rejected, (state, action) => {
        state.currentSkill = null;
        state.isLoading = false;
        state.error = action.payload || 'Навык не найден';
      });
  },
});

export const selectAllSkillCards = (state: { skills: TSkillsState }) => state.skills.cards;
export const selectCurrentSkill = (state: { skills: TSkillsState }) => state.skills.currentSkill;
export const selectSkillsLoading = (state: { skills: TSkillsState }) => state.skills.isLoading;
export const selectSkillsError = (state: { skills: TSkillsState }) => state.skills.error;