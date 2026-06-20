import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthState } from "./types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: ({ user, token }) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      setUser: (user) =>
        set((state) => ({
          user,
          isAuthenticated: Boolean(state.token && user),
        })),
      setToken: (token) =>
        set((state) => ({
          token,
          isAuthenticated: Boolean(token),
          user: token ? state.user : null,
        })),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
      syncUser: async () => {
        try {
          const { authService } = await import("@/services/auth.service");
          const { mapToAuthUser } = await import("@/hooks/useAuth");
          const me = await authService.getMe();
          set({ user: mapToAuthUser(me) });
        } catch (error) {
          console.error("Failed to sync user:", error);
        }
      },
    }),
    {
      name: "kora-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export const selectAuthUser = (state: AuthState) => state.user;
export const selectAuthToken = (state: AuthState) => state.token;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
