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

export type TNotification = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'new' | 'viewed';
  actionLabel?: string;
};

type UserState = {
  userInfo: UserInfo | null;
  favorites: string[];
  notifications: TNotification[];
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

const loadNotificationsFromStorage = (): TNotification[] => {
  const saved = localStorage.getItem('notifications');
  return saved ? JSON.parse(saved) : [];
};

const saveNotificationsToStorage = (notifications: TNotification[]) => {
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

const initialState: UserState = {
  userInfo: null,
  favorites: loadFavoritesFromStorage(),
  notifications: loadNotificationsFromStorage(),
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
      state.notifications = [];
      saveNotificationsToStorage([]);
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

    
    addNotification: (state, action: PayloadAction<TNotification>) => {
      const exists = state.notifications.some(n => n.id === action.payload.id);
      if (!exists) {
        state.notifications.unshift(action.payload);
        saveNotificationsToStorage(state.notifications);
      }
    },
    
    addMultipleNotifications: (state, action: PayloadAction<TNotification[]>) => {
      const newNotifications = action.payload.filter(
        newNotif => !state.notifications.some(existing => existing.id === newNotif.id)
      );
      state.notifications = [...newNotifications, ...state.notifications];
      saveNotificationsToStorage(state.notifications);
    },
    
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && notification.status === 'new') {
        notification.status = 'viewed';
        saveNotificationsToStorage(state.notifications);
      }
    },
    
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        if (notification.status === 'new') {
          notification.status = 'viewed';
        }
      });
      saveNotificationsToStorage(state.notifications);
    },
    
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
      saveNotificationsToStorage(state.notifications);
    },
    
    clearAllNotifications: (state) => {
      state.notifications = [];
      saveNotificationsToStorage([]);
    },
    
    clearViewedNotifications: (state) => {
      state.notifications = state.notifications.filter(n => n.status === 'new');
      saveNotificationsToStorage(state.notifications);
    },
    
    updateNotification: (state, action: PayloadAction<{ id: string; updates: Partial<TNotification> }>) => {
      const index = state.notifications.findIndex(n => n.id === action.payload.id);
      if (index !== -1) {
        state.notifications[index] = { ...state.notifications[index], ...action.payload.updates };
        saveNotificationsToStorage(state.notifications);
      }
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
    
    selectAllNotifications: (state) => state.notifications,
    
    selectUnreadNotificationsCount: (state) => 
      state.notifications.filter(n => n.status === 'new').length,
    
    selectNewNotifications: (state) => 
      state.notifications.filter(n => n.status === 'new'),
    
    selectViewedNotifications: (state) => 
      state.notifications.filter(n => n.status === 'viewed'),
    
    selectNotificationById: (state, id: string) => 
      state.notifications.find(n => n.id === id),
    
    selectHasUnreadNotifications: (state) => 
      state.notifications.some(n => n.status === 'new'),
    
    selectRecentNotifications: (state, limit: number = 5) => 
      state.notifications.slice(0, limit),
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
  addNotification,
  addMultipleNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearAllNotifications,
  clearViewedNotifications,
  updateNotification,
} = userSlice.actions;

export const {
  selectUserInfo,
  selectIsAuthenticated,
  selectFavorites,
  selectIsFavorite,
  selectFavoritesCount,
  selectLoading,
  selectError,
  selectAllNotifications,
  selectUnreadNotificationsCount,
  selectNewNotifications,
  selectViewedNotifications,
  selectNotificationById,
  selectHasUnreadNotifications,
  selectRecentNotifications,
} = userSlice.selectors;

export default userSlice.reducer;