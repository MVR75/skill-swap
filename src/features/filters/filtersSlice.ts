import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TDeleteFilterPayload } from "./types";

type TFiltersState = {
  filters: {
    skillExchangeIntent: string;
    skills: string[];
    gender: string;
    city: string[];
    searchQuery: string;
  };
  hasActiveFilters: boolean;
};

const filtersInitialState = {
  skillExchangeIntent: 'all',
  skills: [],
  gender: 'any',
  city: [],
  searchQuery: ''
}

const initialState: TFiltersState = {
  filters: filtersInitialState,
  hasActiveFilters: false
};

const hasActiveFilters = (filters: TFiltersState['filters']) =>
  filters.skillExchangeIntent !== 'all' ||
  filters.gender !== 'any' ||
  filters.skills.length > 0 ||
  filters.city.length > 0 ||
  filters.searchQuery !== '';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeSkillIntent: (state, action: PayloadAction<string>) => {
      state.filters.skillExchangeIntent = action.payload;
      state.hasActiveFilters = hasActiveFilters(state.filters);
    },
    changeSkills: (state, action: PayloadAction<string[]>) => {
      state.filters.skills = action.payload;
      state.hasActiveFilters = hasActiveFilters(state.filters);
    },
    changeGender: (state, action: PayloadAction<string>) => {
      state.filters.gender = action.payload;
      state.hasActiveFilters = hasActiveFilters(state.filters);
    },
    changeCities: (state, action: PayloadAction<string[]>) => {
      state.filters.city = action.payload;
      state.hasActiveFilters = hasActiveFilters(state.filters);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.hasActiveFilters = hasActiveFilters(state.filters);
    },
    clearFilters: () => ({
      filters: {
        ...filtersInitialState,
        skills: [],
        city: [],
        searchQuery: ''
      },
      hasActiveFilters: false
    }),
    deleteFilter: (state, action: PayloadAction<TDeleteFilterPayload>) => {
      if (action.payload.type === 'gender') {
        state.filters.gender = 'any';
      }

      if (action.payload.type === 'skillExchangeIntent') {
        state.filters.skillExchangeIntent = 'all';
      }

      if (action.payload.type === 'city') {
        state.filters.city = state.filters.city.filter((item) => item !== action.payload.value);
      }

      if (action.payload.type === 'skill') {
        state.filters.skills = state.filters.skills.filter((skill) => skill !== action.payload.value);
      }

      if (action.payload.type === 'search') {
        state.filters.searchQuery = '';
      }

      state.hasActiveFilters = hasActiveFilters(state.filters);
    }
  },
  selectors: {
    selectSkillExchangeIntent: (state) => state.filters.skillExchangeIntent,
    selectSkills: (state) => state.filters.skills,
    selectGender: (state) => state.filters.gender,
    selectCities: (state) => state.filters.city,
    selectSearchQuery: (state) => state.filters.searchQuery,
    selectAllFilters: (state) => state.filters,
    selectHasActiveFilters: (state) => state.hasActiveFilters
  }
});

export const {
  selectSkillExchangeIntent,
  selectGender,
  selectCities,
  selectSkills,
  selectSearchQuery,
  selectAllFilters,
  selectHasActiveFilters
} = filtersSlice.selectors;

export const {
  changeSkillIntent,
  changeGender,
  changeCities,
  changeSkills,
  setSearchQuery,
  clearFilters,
  deleteFilter
} = filtersSlice.actions;