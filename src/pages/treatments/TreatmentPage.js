import { useLocation, useNavigate } from "react-router-dom";
import { Activity, CalendarDays, ClipboardList, Clock3, MoreHorizontal, Plus, UserRound } from "lucide-react";
import TreatmentNavigation from "./TreatmentNavigation";
import { history, plans, sessions } from "./data";

const statusStyles = {
  "In progress": "bg-blue-50 text-blue-700",
  Scheduled: "bg-amber-50 text-amber-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Active: "bg-emerald-50 text-emerald-700",
};

const TreatmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const view = location.pathname.endsWith("/plans") ? "plans" : location.pathname.endsWith("/history") ? "history" : "sessions";

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{view === "plans" ? "Treatment plans" : view === "history" ? "Treatment history" : "Treatment sessions"}</h1>
        <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"><Plus size={18} /> New treatment</button>
      </header>
      <TreatmentNavigation pathname={location.pathname} navigate={navigate} />
      {view === "sessions" && <SessionView />}
      {view === "plans" && <PlanView />}
      {view === "history" && <HistoryView />}
    </div>
  );
};

const Header = ({ title, subtitle, icon }) => <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h2 className="text-lg font-semibold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">{icon}</span></div>;

const SessionView = () => <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><Header title="Treatment sessions" subtitle="Manage today's therapy sessions and appointments" icon={<CalendarDays size={20} />} /><div className="divide-y divide-slate-100">{sessions.map((session) => <div key={`${session.patient}-${session.date}`} className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:p-6"><div className="flex flex-1 items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-700">{session.initials}</span><div><p className="font-semibold text-slate-900">{session.patient}</p><p className="text-xs text-slate-500">{session.treatment}</p></div></div><div className="grid flex-1 grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-3"><span className="flex items-center gap-2"><Clock3 size={15} className="text-slate-400" />{session.date}</span><span className="flex items-center gap-2"><UserRound size={15} className="text-slate-400" />{session.therapist}</span><span>{session.duration}</span></div><span className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[session.status]}`}>{session.status}</span><button type="button" aria-label={`More options for ${session.patient}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={18} /></button></div>)}</div></section>;

const PlanView = () => <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><Header title="Treatment plans" subtitle="Track active rehabilitation plans and progress" icon={<Activity size={20} />} /><div className="overflow-x-auto"><table className="w-full min-w-[700px]"><thead><tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"><th className="px-5 py-3">Patient</th><th className="px-5 py-3">Plan</th><th className="px-5 py-3">Therapist</th><th className="px-5 py-3">Progress</th><th className="px-5 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{plans.map((plan) => <tr key={plan.patient} className="hover:bg-slate-50"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-xs font-semibold text-violet-700">{plan.initials}</span><span className="font-semibold text-slate-900">{plan.patient}</span></div></td><td className="px-5 py-4 text-sm text-slate-600">{plan.plan}</td><td className="px-5 py-4 text-sm text-slate-600">{plan.therapist}</td><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="h-2 w-24 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-teal-500" style={{ width: plan.progress }} /></div><span className="text-sm text-slate-600">{plan.progress}</span><span className="text-xs text-slate-400">{plan.sessions}</span></div></td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[plan.status]}`}>{plan.status}</span></td></tr>)}</tbody></table></div></section>;

const HistoryView = () => <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><Header title="Treatment history" subtitle="Review completed treatment sessions and notes" icon={<ClipboardList size={20} />} /><div className="divide-y divide-slate-100">{history.map((item) => <div key={`${item.patient}-${item.date}`} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:p-6"><div className="flex flex-1 items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">{item.initials}</span><div><p className="font-semibold text-slate-900">{item.patient}</p><p className="text-xs text-slate-500">{item.treatment}</p></div></div><span className="flex-1 text-sm text-slate-500">{item.therapist}</span><span className="text-sm text-slate-500">{item.date}</span><span className="flex-1 text-sm text-slate-600">{item.notes}</span></div>)}</div></section>;

export default TreatmentPage;
