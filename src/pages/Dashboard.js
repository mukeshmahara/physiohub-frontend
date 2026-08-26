import { useEffect, useState } from "react";
import { Users, CalendarDays, Clock, Activity } from "lucide-react";

import { getDashboard } from "../services/dashboard";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDashboard();

        // Your API helper returns:
        // { data, status, headers }
        setDashboard(response.data);
      } catch (error) {
        setError(error.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

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
          Good morning
          {dashboard?.user?.name ? `, ${dashboard.user.name}` : ""} 👋
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
          value={dashboard?.statistics?.patients ?? 0}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Today's Appointments"
          value={dashboard?.statistics?.today_appointments ?? 0}
          icon={<CalendarDays size={22} />}
        />

        <StatCard
          title="Upcoming Appointments"
          value={dashboard?.statistics?.upcoming_appointments ?? 0}
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
        {dashboard?.today_appointments?.length ? (
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
                {dashboard.today_appointments.map((appointment) => (
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
  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900">{appointment.patient_name}</p>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">{appointment.time}</td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {appointment.therapist_name}
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
