import { api } from "../utils/apiHelper";

export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/users",
    {
      user: userData,
    },
    {
      requiresAuth: false,
    },
  );

  return response.data;
};
