import { Filter, Search, XCircle } from "lucide-react";
import AppointmentRow from "./AppointmentRow";

const AppointmentList = ({ title, subtitle, appointments, showToolbar = false }) => (
  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h2 className="text-lg font-semibold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div>{showToolbar && <div className="flex gap-2"><button type="button" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600"><Search size={16} /> Search</button><button type="button" className="rounded-lg border border-slate-200 p-2 text-slate-600" aria-label="Filter appointments"><Filter size={17} /></button></div>}</div>
    {appointments.length ? <div className="divide-y divide-slate-100">{appointments.map((appointment) => <AppointmentRow key={appointment.id} appointment={appointment} />)}</div> : <div className="px-6 py-16 text-center"><XCircle size={30} className="mx-auto text-slate-300" /><p className="mt-3 text-sm text-slate-500">No appointments scheduled for this day.</p></div>}
  </section>
);

export default AppointmentList;
