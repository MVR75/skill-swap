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
    },
    clearFilter: () => initialState
  },
  selectors: {
    selectSkillExchangeIntent: (state) => state.skillExchangeIntent,
    selectSkills: (state) => state.skills,
    selectGender: (state) => state.gender,
    selectCities: (state) => state.city,
    selectAllFilters: (state) => state,
    selectActiveFilterValues: (state) => {
      const values: string[] = [];

      if (state.gender !== 'any') {
        values.push(state.gender);
      }

      if (state.skillExchangeIntent !== 'all') {
        values.push(state.skillExchangeIntent);
      }

      if (state.city.length > 0) {
        values.push(...state.city);
      }

      if (state.skills.length > 0) {
        values.push(...state.skills);
      }

      return values;
    }
  }
});

export const {
  selectSkillExchangeIntent,
  selectGender,
  selectCities,
  selectSkills,
  selectAllFilters,
  selectActiveFilterValues
} = filtersSlice.selectors;

export const {
  changeSkillIntent,
  changeGender,
  changeCities,
  changeSkills,
  clearFilter
} = filtersSlice.actions;
