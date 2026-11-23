import { create } from 'zustand';

export interface User {
  id: number;
  username: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  initialize: (token: string, user: User) => void;
}

const getInitialToken = () => localStorage.getItem('token');
const getInitialUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    const parsed = JSON.parse(userStr);
    if (typeof parsed?.id !== 'number' || typeof parsed?.username !== 'string') {
      return null;
    }
    return parsed as User;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  user: getInitialUser(),
  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },
  initialize: (token, user) => set({ token, user }),
}));
