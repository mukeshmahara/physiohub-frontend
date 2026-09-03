import { api } from "../utils/apiHelper";

export const getPatients = async () => {
  const response = await api.get("/patients");
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await api.post("/patients", { patient: patientData });
  return response.data;
};

export const updatePatient = async ({ id, patientData }) => {
  const response = await api.put(`/patients/${id}`, { patient: patientData });
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};
