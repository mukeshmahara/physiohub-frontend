import { viewTabs } from "./constants";

const AppointmentNavigation = ({ view, navigate }) => (
  <nav className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
    {viewTabs.map((tab) => {
      const active =
        (tab.label === "Calendar" && view === "calendar") ||
        (tab.label.toLowerCase().startsWith("today") && view === "today") ||
        (tab.label === "Upcoming" && view === "upcoming") ||
        (tab.label === "Waiting list" && view === "waiting");
      return (
        <button
          key={tab.path}
          type="button"
          onClick={() => navigate(tab.path)}
          className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${active ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
        >
          {tab.label}
        </button>
      );
    })}
  </nav>
);

export default AppointmentNavigation;
