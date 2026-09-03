import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPatient, deletePatient, getPatients, updatePatient } from "./patientService";

export const PATIENT_QUERY_KEYS = {
  all: ["patients"],
};

export function usePatientsQuery(options = {}) {
  return useQuery({
    queryKey: PATIENT_QUERY_KEYS.all,
    queryFn: getPatients,
    ...options,
  });
}

export function useCreatePatientMutation(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatient,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: PATIENT_QUERY_KEYS.all });
      options.onSuccess?.(...args);
    },
  });
}

export function useUpdatePatientMutation(options = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePatient,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: PATIENT_QUERY_KEYS.all });
      options.onSuccess?.(...args);
    },
  });
}

export function useDeletePatientMutation(options = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePatient,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: PATIENT_QUERY_KEYS.all });
      options.onSuccess?.(...args);
    },
  });
}
