import { useState } from "react";
import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentList from "./AppointmentList";
import AppointmentNavigation from "./AppointmentNavigation";
import CalendarView, { formatDate } from "./CalendarView";
import WaitingList from "./WaitingList";
import { appointments } from "./data";

const getView = (pathname) => {
  if (pathname.endsWith("/todays") || pathname.endsWith("/today")) return "today";
  if (pathname.endsWith("/upcoming")) return "upcoming";
  if (pathname.endsWith("/waiting")) return "waiting";
  return "calendar";
};

const AppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 8, 3));
  const [month, setMonth] = useState(new Date(2026, 8, 1));
  const view = getView(location.pathname);
  const upcoming = appointments.filter((appointment) => appointment.date > formatDate(selectedDate));
  const changeMonth = (amount) => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Appointments</h1><button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"><Plus size={18} /> New appointment</button></header>
      <AppointmentNavigation view={view} navigate={navigate} />
      {view === "calendar" && <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} month={month} changeMonth={changeMonth} />}
      {view === "today" && <AppointmentList title="Today's appointments" subtitle="Thursday, September 3, 2026" appointments={appointments.filter((appointment) => appointment.date === "2026-09-03")} showToolbar />}
      {view === "upcoming" && <AppointmentList title="Upcoming appointments" subtitle="Your next scheduled visits" appointments={upcoming} showToolbar />}
      {view === "waiting" && <WaitingList />}
    </div>
  );
};

export default AppointmentPage;
