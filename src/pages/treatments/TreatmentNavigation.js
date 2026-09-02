import { treatmentTabs } from "./data";

const TreatmentNavigation = ({ pathname, navigate }) => (
  <nav className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
    {treatmentTabs.map((tab) => {
      const active = tab.path === "/treatments"
        ? pathname === "/treatments"
        : pathname.startsWith(tab.path);
      return (
        <button key={tab.path} type="button" onClick={() => navigate(tab.path)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${active ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
          {tab.label}
        </button>
      );
    })}
  </nav>
);

export default TreatmentNavigation;
