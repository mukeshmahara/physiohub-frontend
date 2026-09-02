import { Clock3, MapPin, MoreHorizontal, UserRound } from "lucide-react";
import { statusStyles } from "./data";

const AppointmentRow = ({ appointment }) => (
  <div className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:p-6">
    <div className="flex items-center gap-3 sm:w-44"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-700">{appointment.initials}</div><div><p className="font-semibold text-slate-900">{appointment.patient}</p><p className="text-xs text-slate-500">{appointment.type}</p></div></div>
    <div className="grid flex-1 grid-cols-2 gap-3 text-sm sm:grid-cols-3"><span className="flex items-center gap-2 text-slate-600"><Clock3 size={15} className="text-slate-400" />{appointment.time} <span className="text-xs text-slate-400">({appointment.duration})</span></span><span className="flex items-center gap-2 text-slate-600"><UserRound size={15} className="text-slate-400" />{appointment.therapist}</span><span className="flex items-center gap-2 text-slate-600"><MapPin size={15} className="text-slate-400" />{appointment.location}</span></div>
    <div className="flex items-center justify-between gap-3 sm:w-32 sm:justify-end"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[appointment.status] || "bg-slate-100 text-slate-600"}`}>{appointment.status}</span><button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label={`More options for ${appointment.patient}`}><MoreHorizontal size={18} /></button></div>
  </div>
);

export default AppointmentRow;
