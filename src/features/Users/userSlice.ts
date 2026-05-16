import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserInfo = {
  id: string;
  avatar?: File;
  src?: string;
  email: string;
  name: string;
  birthDate: Date | null;
  role: string;
  gender: 'мужской' | 'женский';
  city: string;
  about: string;
};

type UserState = {
  userInfo: UserInfo | null;
  favorites: string[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

const loadFavoritesFromStorage = (): string[] => {
  const saved = localStorage.getItem('favorites');
  return saved ? JSON.parse(saved) : [];
};

const saveFavoritesToStorage = (favorites: string[]) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const initialState: UserState = {
  userInfo: null,
  favorites: loadFavoritesFromStorage(),
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },

    updateUserInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          ...action.payload,
        };
      }
    },

    clearUserInfo: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },

    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
      saveFavoritesToStorage(action.payload);
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter(
          skillId => skillId !== action.payload
        );
      } else {
        state.favorites.push(action.payload);
      }
      saveFavoritesToStorage(state.favorites);
      console.log('Favorites after toggle:', state.favorites);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  
  selectors: {
    selectUserInfo: (state) => state.userInfo,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectFavorites: (state) => state.favorites,
    selectIsFavorite: (state, skillId: string) => state.favorites.includes(skillId),
    selectFavoritesCount: (state) => state.favorites.length,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});

export const {
  setUserInfo,
  updateUserInfo,
  clearUserInfo,
  setFavorites,
  toggleFavorite,
  setLoading,
  setError,
} = userSlice.actions;

export const {
  selectUserInfo,
  selectIsAuthenticated,
  selectFavorites,
  selectIsFavorite,
  selectFavoritesCount,
  selectLoading,
  selectError,
} = userSlice.selectors;

export default userSlice.reducer;