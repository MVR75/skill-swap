import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TSkillCard } from "../../entities/types"
import { fetchSkills } from "../../api/skillsApi";

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
}

const initialState: TSkillsState = {
  cards: []
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
  }
});
