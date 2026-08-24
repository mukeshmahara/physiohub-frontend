import { useEffect, useState } from "react";
import { Users, CalendarDays, Clock, Activity, LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { getDashboard } from "../services/dashboard";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r min-h-screen p-6">
        <div className="text-2xl font-bold text-cyan-600 mb-10">PhysioHub</div>

        <nav className="space-y-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3
                       rounded-lg bg-cyan-50 text-cyan-600 font-medium"
          >
            <Activity size={20} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/patients")}
            className="w-full flex items-center gap-3 px-4 py-3
                       rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <Users size={20} />
            Patients
          </button>

          <button
            onClick={() => navigate("/appointments")}
            className="w-full flex items-center gap-3 px-4 py-3
                       rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <CalendarDays size={20} />
            Appointments
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 mt-10
                     rounded-lg text-red-500 hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Good morning
            {dashboard?.user?.name ? `, ${dashboard.user.name}` : ""} 👋
          </h1>

          <p className="text-gray-500 mt-1">
            Here's what's happening with your clinic today.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={dashboard?.statistics?.patients ?? 0}
            icon={<Users size={24} />}
          />

          <StatCard
            title="Today's Appointments"
            value={dashboard?.statistics?.today_appointments ?? 0}
            icon={<CalendarDays size={24} />}
          />

          <StatCard
            title="Upcoming Appointments"
            value={dashboard?.statistics?.upcoming_appointments ?? 0}
            icon={<Clock size={24} />}
          />
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="px-6 py-5 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Today's Appointments
            </h2>
          </div>

          {dashboard?.today_appointments?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Therapist</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard.today_appointments.map((appointment) => (
                    <Appointment
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No appointments scheduled for today.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>

        <div className="p-3 bg-cyan-50 text-cyan-600 rounded-lg">{icon}</div>
      </div>
    </div>
  );
};

const Appointment = ({ appointment }) => {
  return (
    <tr className="border-b last:border-b-0">
      <td className="px-6 py-4 font-medium text-gray-900">
        {appointment.patient_name}
      </td>

      <td className="px-6 py-4 text-gray-600">{appointment.time}</td>

      <td className="px-6 py-4 text-gray-600">{appointment.therapist_name}</td>

      <td className="px-6 py-4">
        <span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-600">
          {appointment.status}
        </span>
      </td>
    </tr>
  );
};

export default Dashboard;
