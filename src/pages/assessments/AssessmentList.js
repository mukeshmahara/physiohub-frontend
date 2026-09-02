import { ClipboardCheck, MoreHorizontal, Search, UserRound } from "lucide-react";
import { assessments } from "./data";

const AssessmentList = ({ history = false }) => {
  const list = history ? assessments.filter((item) => item.status === "Completed") : assessments;
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div><h2 className="text-lg font-semibold text-slate-900">{history ? "Assessment history" : "Assessments"}</h2><p className="mt-1 text-sm text-slate-500">{history ? "Review completed patient evaluations." : "Track patient evaluations and clinical scores."}</p></div>
        <label className="relative block sm:w-64"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input placeholder="Search assessments..." className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" /></label>
      </div>
      {list.length ? <div className="divide-y divide-slate-100">{list.map((item) => <div key={item.id} className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:p-6"><div className="flex flex-1 items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${item.color}`}>{item.initials}</span><div><p className="font-semibold text-slate-900">{item.patient}</p><p className="text-xs text-slate-500">{item.type}</p></div></div><div className="grid flex-1 gap-2 text-sm text-slate-600 sm:grid-cols-3"><span>{item.therapist}</span><span>{item.date}</span><span>Score: {item.score}</span></div><span className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${item.status === "Completed" ? "bg-emerald-50 text-emerald-700" : item.status === "In progress" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{item.status}</span><button type="button" aria-label={`More options for ${item.patient}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={18} /></button></div>)}</div> : <div className="px-6 py-16 text-center"><UserRound size={30} className="mx-auto text-slate-300" /><p className="mt-3 text-sm text-slate-500">No assessments found.</p></div>}
    </section>
  );
};

export default AssessmentList;
