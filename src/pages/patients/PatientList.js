import { useMemo, useState } from "react";
import { Activity, CalendarDays, Search, UserRound, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { patients } from "./data";
import PatientNavigation from "./PatientNavigation";
import PatientRow from "./PatientRow";
import SummaryCard from "./SummaryCard";

const PatientList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const activeOnly = location.pathname.endsWith("/active");
  const filteredPatients = useMemo(
    () =>
      patients.filter((patient) => {
        const search = query.toLowerCase();
        return (
          (!activeOnly || patient.status === "Active") &&
          (!search ||
            `${patient.name} ${patient.email} ${patient.condition}`
              .toLowerCase()
              .includes(search))
        );
      }),
    [activeOnly, query],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {activeOnly ? "Active patients" : "Patients"}
        </h1>
        <button type="button" onClick={() => navigate("/patients/new")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700">
          Add patient
        </button>
      </header>
      <PatientNavigation pathname={location.pathname} navigate={navigate} />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Total patients" value={patients.length} icon={<Users size={20} />} />
        <SummaryCard label="Active patients" value={patients.filter((patient) => patient.status === "Active").length} icon={<Activity size={20} />} />
        <SummaryCard label="New this month" value="12" icon={<CalendarDays size={20} />} />
      </section>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex justify-end border-b border-slate-100 p-4 sm:p-5">
          <label className="relative block sm:w-72">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patients..." className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
          </label>
        </div>
        <div className="overflow-x-auto"><table className="w-full min-w-[760px]"><thead><tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"><th className="px-5 py-3">Patient</th><th className="px-5 py-3">Contact</th><th className="px-5 py-3">Condition</th><th className="px-5 py-3">Therapist</th><th className="px-5 py-3">Last visit</th><th className="px-5 py-3">Status</th><th className="px-5 py-3" /></tr></thead><tbody className="divide-y divide-slate-100">{filteredPatients.map((patient) => <PatientRow key={patient.id} patient={patient} />)}</tbody></table></div>
        {!filteredPatients.length && <div className="px-6 py-16 text-center"><UserRound size={30} className="mx-auto text-slate-300" /><p className="mt-3 text-sm text-slate-500">No patients match your search.</p></div>}
        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">Showing {filteredPatients.length} of {patients.length} patients</div>
      </section>
    </div>
  );
};

export default PatientList;
