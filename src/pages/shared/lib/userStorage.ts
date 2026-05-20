import type { UserInfo } from '../../../features/Users/userSlice';

const USER_STORAGE_KEY = 'userInfo';

export function getUserFromStorage(): UserInfo | null {
  const saved = localStorage.getItem(USER_STORAGE_KEY);
  if (!saved) {
    return null;
  }
  try {
    return JSON.parse(saved) as UserInfo;
  } catch {
    return null;
  }
}

export function saveUserToStorage(user: UserInfo) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearUserFromStorage() {
  localStorage.removeItem(USER_STORAGE_KEY);
}