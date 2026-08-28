import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "../utils/apiHelper";

/**
 * Global Auth Store using Zustand with Persist Middleware
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      roles: [],
      activeRole: null,
      token: localStorage.getItem("authToken") || null,
      refresh_token: localStorage.getItem("refreshToken") || null,
      isAuthenticated: !!localStorage.getItem("authToken"),
      /**
       * Set Login Session
       */
      setAuth: (user, token, refresh_token, remember = true) => {
        api.setAuthToken(token, remember);
        set({
          user,
          token,
          refresh_token,
          isAuthenticated: true,
        });
      },

      /**
       * Update User details
       */
      updateUser: (partialUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...partialUser } : partialUser,
        }));
      },
      setActiveRole: (role) => {
        set((state) => {
          if (!state.roles.includes(role)) {
            return state;
          }

          return {
            activeRole: role,
          };
        });
      },
      /**
       * Logout
       */
      logout: () => {
        api.clearAuthToken();
        set({
          user: null,
          token: null,
          roles: [],
          activeRole: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "physiohub-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
