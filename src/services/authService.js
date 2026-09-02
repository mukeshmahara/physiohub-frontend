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

export const requestPasswordReset = async (email) => {
  const response = await api.post(
    "/auth/users/password",
    { user: { email } },
    { requiresAuth: false },
  );
  return response.data;
};

export const resetPassword = async (token, password, passwordConfirmation) => {
  const response = await api.put(
    "/auth/users/password",
    {
      user: {
        reset_password_token: token,
        password,
        password_confirmation: passwordConfirmation,
      },
    },
    { requiresAuth: false },
  );
  return response.data;
};
