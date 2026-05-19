import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TAsyncStatus, TCategory } from "../../entities/types";
import { fetchCategories } from "../../api/categoriesApi";

export const getCategories = createAsyncThunk<
  TCategory[],
  void,
  { rejectValue: string }
>('categories/get', async (_, { rejectWithValue }) => {
  try {
    return await fetchCategories();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Не удалось загрузить данные';
    return rejectWithValue(message);
  }
});

type TCategoriesState = {
  categories: TCategory[];
  status: TAsyncStatus;
  error: string | null;
};

const initialState: TCategoriesState = {
  categories: [],
  status: 'idle',
  error: null
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Не удалось загрузить данные';
      })
  },
  selectors: {
    selectCategories: (state) => state.categories
  }
});

export const { selectCategories } = categoriesSlice.selectors;
