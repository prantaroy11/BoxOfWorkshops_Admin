import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (admin: AdminUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      setAuth: (admin, token) => {
        localStorage.setItem('admin_token', token);
        set({ admin, token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('admin_token');
        set({
          admin: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    { name: 'admin-auth-storage' }
  )
);
