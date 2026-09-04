import { useMemo } from "react";
import { Users, CalendarDays, Clock, Activity } from "lucide-react";

import { useAppointmentsQuery } from "../services/appointmentQueries";
import { usePatientsQuery } from "../services/patientQueries";
import useAuthStore from "../store/useAuthStore";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const patientsQuery = usePatientsQuery();
  const appointmentsQuery = useAppointmentsQuery();
  const patients = useMemo(
    () =>
      Array.isArray(patientsQuery.data)
        ? patientsQuery.data
        : patientsQuery.data?.patients || patientsQuery.data?.data || [],
    [patientsQuery.data],
  );
  const appointments = useMemo(
    () =>
      Array.isArray(appointmentsQuery.data)
        ? appointmentsQuery.data
        : appointmentsQuery.data?.appointments ||
          appointmentsQuery.data?.data ||
          [],
    [appointmentsQuery.data],
  );
  const todayKey = formatLocalDate(new Date());
  const todayAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) =>
          formatLocalDate(new Date(appointment.scheduled_at)) === todayKey,
      ),
    [appointments, todayKey],
  );
  const upcomingAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => new Date(appointment.scheduled_at) > new Date(),
      ),
    [appointments],
  );
  const loading = patientsQuery.isLoading || appointmentsQuery.isLoading;
  const error = patientsQuery.error || appointmentsQuery.error;
  const greeting = getGreeting(new Date());

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-cyan-100 border-t-cyan-600" />

          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Activity size={24} />
          </div>

          <h2 className="text-lg font-semibold text-gray-900">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-gray-500">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ========================================
          Dashboard Welcome
      ======================================== */}
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {greeting}
          {user?.name ? `, ${user.name}` : ""} 👋
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Here's what's happening with your clinic today.
        </p>
      </section>

      {/* ========================================
          Statistics
      ======================================== */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Patients"
          value={patients.length}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={<CalendarDays size={22} />}
        />

        <StatCard
          title="Upcoming Appointments"
          value={upcomingAppointments.length}
          icon={<Clock size={22} />}
        />
      </section>

      {/* ========================================
          Today's Appointments
      ======================================== */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
              Today's Appointments
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Appointments scheduled for today
            </p>
          </div>

          <CalendarDays size={20} className="text-cyan-600" />
        </div>

        {/* Appointments */}
        {todayAppointments.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  <th className="px-6 py-3">Patient</th>

                  <th className="px-6 py-3">Time</th>

                  <th className="px-6 py-3">Therapist</th>

                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {todayAppointments.map((appointment) => (
                  <Appointment key={appointment.id} appointment={appointment} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <CalendarDays size={32} className="mx-auto text-gray-300" />

            <p className="mt-3 text-sm text-gray-500">
              No appointments scheduled for today.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

const formatLocalDate = (date) => {
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getGreeting = (date) => {
  const hour = date.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

/* ============================================
   Stat Card
============================================ */

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

/* ============================================
   Appointment Row
============================================ */

const Appointment = ({ appointment }) => {
  const scheduledAt = new Date(appointment.scheduled_at);
  return (
    <tr className="border-b border-gray-100 last:border-0 transition-colors hover:bg-slate-50">
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900">
          {appointment.patient_name || `Patient #${appointment.patient_id}`}
        </p>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {Number.isNaN(scheduledAt.getTime())
          ? "-"
          : scheduledAt.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {appointment.therapist_name || `Doctor #${appointment.doctor_id}`}
      </td>

      <td className="px-6 py-4">
        <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium capitalize text-green-600">
          {appointment.status}
        </span>
      </td>
    </tr>
  );
};

export default Dashboard;
