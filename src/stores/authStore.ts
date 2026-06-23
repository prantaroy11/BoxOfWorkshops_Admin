import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  phone?: string;
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
        document.cookie = `admin_token=${token}; path=/; max-age=604800; samesite=strict`; // 7 days
        set({ admin, token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('admin_token');
        document.cookie = `admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
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
