import { useState } from "react";
import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentList from "./AppointmentList";
import AppointmentNavigation from "./AppointmentNavigation";
import CalendarView, { formatDate } from "./CalendarView";
import WaitingList from "./WaitingList";
import { useAppointmentsQuery } from "../../services/appointmentQueries";
import NewAppointment from "./NewAppointment";

const getView = (pathname) => {
  if (pathname.endsWith("/todays") || pathname.endsWith("/today"))
    return "today";
  if (pathname.endsWith("/upcoming")) return "upcoming";
  if (pathname.endsWith("/waiting")) return "waiting";
  return "calendar";
};

const AppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const view = getView(location.pathname);
  const { data, isLoading, isError, error } = useAppointmentsQuery();
  const appointments = (
    Array.isArray(data) ? data : data?.appointments || data?.data || []
  ).map(normalizeAppointment);
  const todayKey = formatDate(new Date());
  const upcoming = appointments.filter(
    (appointment) => appointment.date > todayKey,
  );
  const changeMonth = (amount) =>
    setMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + amount, 1),
    );

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Appointments
        </h1>
        <button
          type="button"
          onClick={() => setShowNewAppointment(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
        >
          <Plus size={18} /> New appointment
        </button>
      </header>
      <AppointmentNavigation view={view} navigate={navigate} />
      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Loading appointments...
        </div>
      )}
      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-sm text-red-700">
          {error?.message || "Unable to load appointments."}
        </div>
      )}
      {!isLoading && !isError && view === "calendar" && (
        <CalendarView
          appointments={appointments}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          month={month}
          changeMonth={changeMonth}
        />
      )}
      {!isLoading && !isError && view === "today" && (
        <AppointmentList
          title="Today's appointments"
          subtitle={new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          appointments={appointments.filter(
            (appointment) => appointment.date === todayKey,
          )}
          showToolbar
        />
      )}
      {!isLoading && !isError && view === "upcoming" && (
        <AppointmentList
          title="Upcoming appointments"
          subtitle="Your next scheduled visits"
          appointments={upcoming}
          showToolbar
        />
      )}
      {!isLoading && !isError && view === "waiting" && (
        <WaitingList
          appointments={appointments.filter(
            (appointment) => appointment.status === "Waiting",
          )}
        />
      )}
      {showNewAppointment && (
        <NewAppointment
          selectedDate={view === "calendar" ? selectedDate : null}
          onClose={() => setShowNewAppointment(false)}
        />
      )}
    </div>
  );
};

const normalizeAppointment = (appointment) => ({
  ...appointment,
  patient:
    appointment.patient ||
    appointment.patient_name ||
    appointment.full_name ||
    `Patient #${appointment.patient_id}`,
  initials:
    appointment.initials ||
    appointment.patient_name
      ?.split(/\s+/)
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    `P${appointment.patient_id}`,
  date:
    appointment.date ||
    appointment.appointment_date ||
    appointment.scheduled_at?.slice(0, 10),
  time:
    appointment.time ||
    appointment.start_time ||
    formatAppointmentTime(appointment.scheduled_at),
  therapist:
    appointment.therapist ||
    appointment.therapist_name ||
    appointment.doctor_name ||
    `Doctor #${appointment.doctor_id}`,
  duration: appointment.duration || "-",
  type: appointment.type || appointment.appointment_type || "Appointment",
  location: appointment.location || "-",
  status: appointment.status
    ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)
    : "Pending",
});

const formatAppointmentTime = (scheduledAt) =>
  scheduledAt
    ? new Date(scheduledAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

export default AppointmentPage;
