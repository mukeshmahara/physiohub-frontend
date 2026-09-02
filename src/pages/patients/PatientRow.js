import { Mail, MoreHorizontal, Phone } from "lucide-react";

const PatientRow = ({ patient }) => (
  <tr className="transition hover:bg-slate-50">
    <td className="px-5 py-4"><div className="flex items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${patient.color}`}>{patient.initials}</span><div><p className="font-semibold text-slate-900">{patient.name}</p><p className="text-xs text-slate-400">Patient #{String(patient.id).padStart(4, "0")}</p></div></div></td>
    <td className="px-5 py-4 text-sm text-slate-500"><p className="flex items-center gap-2"><Mail size={14} />{patient.email}</p><p className="mt-1 flex items-center gap-2"><Phone size={14} />{patient.phone}</p></td>
    <td className="px-5 py-4 text-sm text-slate-600">{patient.condition}</td>
    <td className="px-5 py-4 text-sm text-slate-600">{patient.therapist}</td>
    <td className="px-5 py-4 text-sm text-slate-500">{patient.lastVisit}</td>
    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${patient.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{patient.status}</span></td>
    <td className="px-5 py-4"><button type="button" aria-label={`More options for ${patient.name}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><MoreHorizontal size={18} /></button></td>
  </tr>
);

export default PatientRow;
