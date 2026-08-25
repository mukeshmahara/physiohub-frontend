import { api } from "../utils/apiHelper";

export const getDashboard = () => {
  return api.get("/dashboard");
};
