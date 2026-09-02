import { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  CheckCheck,
  ClipboardList,
  Clock3,
  Info,
  UserRound,
} from "lucide-react";

const initialNotifications = [
  { id: 1, type: "appointment", title: "Appointment starting soon", message: "Sofia Williams has an appointment with Dr. James Wilson in 30 minutes.", time: "10 minutes ago", unread: true },
  { id: 2, type: "patient", title: "New patient added", message: "A new patient profile for Amelia Taylor was created.", time: "1 hour ago", unread: true },
  { id: 3, type: "treatment", title: "Treatment plan completed", message: "Oliver Wilson completed the Lower back strengthening plan.", time: "3 hours ago", unread: true },
  { id: 4, type: "appointment", title: "Appointment rescheduled", message: "Noah Thompson's appointment was moved to September 5 at 1:00 PM.", time: "Yesterday", unread: false },
  { id: 5, type: "system", title: "Weekly summary is ready", message: "Your clinic activity summary for last week is available to review.", time: "Yesterday", unread: false },
  { id: 6, type: "patient", title: "Patient record updated", message: "Mia Davis's contact and care information was updated.", time: "Sep 1, 2026", unread: false },
];

const notificationIcons = {
  appointment: CalendarDays,
  patient: UserRound,
  treatment: ClipboardList,
  system: Info,
};

const Notification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const unreadCount = notifications.filter((notification) => notification.unread).length;
  const visibleNotifications = useMemo(
    () => filter === "unread" ? notifications.filter((notification) => notification.unread) : notifications,
    [filter, notifications],
  );

  const markRead = (id) => {
    setNotifications((current) => current.map((notification) => notification.id === id ? { ...notification, unread: false } : notification));
  };

  const markAllRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, unread: false })));
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">{unreadCount ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "You're all caught up"}</p>
        </div>
        {unreadCount > 0 && <button type="button" onClick={markAllRead} className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"><CheckCheck size={17} /> Mark all as read</button>}
      </header>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex gap-1 border-b border-slate-100 p-3">
          {["all", "unread"].map((option) => (
            <button key={option} type="button" onClick={() => setFilter(option)} className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${filter === option ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:bg-slate-50"}`}>
              {option}{option === "unread" && unreadCount > 0 ? ` (${unreadCount})` : ""}
            </button>
          ))}
        </div>
        {visibleNotifications.length ? <div className="divide-y divide-slate-100">{visibleNotifications.map((notification) => {
          const Icon = notificationIcons[notification.type] || Bell;
          return <button key={notification.id} type="button" onClick={() => markRead(notification.id)} className={`flex w-full items-start gap-4 p-5 text-left transition hover:bg-slate-50 sm:p-6 ${notification.unread ? "bg-teal-50/30" : ""}`}><span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notification.unread ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-500"}`}><Icon size={18} /></span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><span className="font-semibold text-slate-900">{notification.title}</span>{notification.unread && <span className="h-2 w-2 rounded-full bg-teal-500" />}</span><span className="mt-1 block text-sm leading-6 text-slate-600">{notification.message}</span><span className="mt-2 flex items-center gap-1.5 text-xs text-slate-400"><Clock3 size={13} />{notification.time}</span></span></button>;
        })}</div> : <div className="px-6 py-16 text-center"><Bell size={32} className="mx-auto text-slate-300" /><p className="mt-3 text-sm text-slate-500">No unread notifications.</p></div>}
      </section>
    </div>
  );
};

export default Notification;
