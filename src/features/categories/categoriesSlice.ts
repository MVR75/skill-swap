import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TCategory } from "../../entities/types";
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
      err instanceof Error ? err.message : 'РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РґР°РЅРЅС‹Рµ';
    return rejectWithValue(message);
  }
});

type TCategoriesState = {
  categories: TCategory[];
};

const initialState: TCategoriesState = {
  categories: []
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
  },
  selectors: {
    selectCategories: (state) => state.categories
  }
});

export const { selectCategories } = categoriesSlice.selectors;
