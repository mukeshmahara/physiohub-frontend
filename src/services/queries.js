import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../utils/apiHelper";
import { useAuthStore } from "../store/useAuthStore";
import { useUIStore } from "../store/useUIStore";

/**
 * Query Keys Constant Object
 */
export const QUERY_KEYS = {
  USER_PROFILE: ["user", "profile"],
  FEATURES: ["features"],
  CLINICS: ["clinics"],
};

/**
 * React Query Mutation: User Login
 */
export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const showToast = useUIStore((state) => state.showToast);

  return useMutation({
    mutationFn: async ({ usernameOrEmail, password, rememberMe = true }) => {
      const response = await api.post(
        "/auth/login",
        { usernameOrEmail, password },
        { requiresAuth: false }
      );
      return { data: response.data, rememberMe };
    },
    onSuccess: ({ data, rememberMe }) => {
      if (data?.token) {
        setAuth(data.user || { email: data.email }, data.token, rememberMe);
      }
      showToast("Successfully signed in!", "success");
    },
    onError: (error) => {
      showToast(error.message || "Login failed", "error");
    },
  });
}

/**
 * React Query Mutation: Request Demo Submission
 */
export function useDemoMutation() {
  const showToast = useUIStore((state) => state.showToast);

  return useMutation({
    mutationFn: async (demoData) => {
      const response = await api.post("/demo/request", demoData, {
        requiresAuth: false,
      });
      return response.data;
    },
    onSuccess: () => {
      showToast("Demo request submitted! We will contact you shortly.", "success");
    },
    onError: (error) => {
      showToast(error.message || "Failed to submit demo request", "error");
    },
  });
}

/**
 * React Query: Fetch User Profile
 */
export function useUserProfileQuery(options = {}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.USER_PROFILE,
    queryFn: async () => {
      const response = await api.get("/user/profile");
      return response.data;
    },
    enabled: isAuthenticated,
    ...options,
  });
}

/**
 * React Query: Fetch Features List
 */
export function useFeaturesQuery(options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.FEATURES,
    queryFn: async () => {
      const response = await api.get("/features", {}, { requiresAuth: false });
      return response.data;
    },
    ...options,
  });
}
