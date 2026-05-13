import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TFiltersState = {
  skillExchangeIntent: string;
  skills: string[];
  gender: string;
  city: string[];
};

const initialState: TFiltersState = {
  skillExchangeIntent: 'all',
  skills: [],
  gender: 'any',
  city: []
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeSkillIntent: (state, action: PayloadAction<string>) => {
      state.skillExchangeIntent = action.payload;
    },
    changeSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    changeGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    changeCities: (state, action: PayloadAction<string[]>) => {
      state.city = action.payload;
    }
  },
  selectors: {
    selectSkillExchangeIntent: (state) => state.skillExchangeIntent,
    selectSkills: (state) => state.skills,
    selectGender: (state) => state.gender,
    selectCities: (state) => state.city,
    selectAllFilters: (state) => state,
  }
});

export const {
  selectSkillExchangeIntent,
  selectGender,
  selectCities,
  selectSkills,
  selectAllFilters
} = filtersSlice.selectors;

export const {
  changeSkillIntent,
  changeGender,
  changeCities,
  changeSkills
} = filtersSlice.actions;
