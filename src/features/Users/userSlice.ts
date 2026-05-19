import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserInfo = {
  id: string;
  avatar?: string;
  src?: string;
  email: string;
  name: string;
  birthDate: string | null;
  role: string;
  gender: 'мужской' | 'женский' | 'unspecified';
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

const loadUserFromStorage = (): UserInfo | null => {
  const saved = localStorage.getItem('user');
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

const saveUserToStorage = (user: UserInfo | null) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

const initialState: UserState = {
  userInfo: loadUserFromStorage(),
  favorites: loadFavoritesFromStorage(),
  loading: false,
  error: null,
  isAuthenticated: !!loadUserFromStorage(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      saveUserToStorage(action.payload);
    },

    updateUserInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          ...action.payload,
        };
        saveUserToStorage(state.userInfo);
      }
    },

    clearUserInfo: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      saveUserToStorage(null);
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