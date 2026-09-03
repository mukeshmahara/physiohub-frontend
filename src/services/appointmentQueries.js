import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAppointment, getAppointments } from "./appointmentService";

export const APPOINTMENT_QUERY_KEYS = {
  all: ["appointments"],
};

export function useAppointmentsQuery(options = {}) {
  return useQuery({
    queryKey: APPOINTMENT_QUERY_KEYS.all,
    queryFn: getAppointments,
    ...options,
  });
}

export function useCreateAppointmentMutation(options = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAppointment,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: APPOINTMENT_QUERY_KEYS.all });
      options.onSuccess?.(...args);
    },
  });
}
