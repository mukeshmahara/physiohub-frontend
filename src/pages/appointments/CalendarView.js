import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppointmentList from "./AppointmentList";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CalendarView = ({
  appointments,
  selectedDate,
  setSelectedDate,
  month,
  changeMonth,
}) => {
  const selectedKey = formatDate(selectedDate);
  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      month.getFullYear(),
      month.getMonth(),
      1,
    ).getDay();
    const daysInMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0,
    ).getDate();
    return Array.from({ length: 42 }, (_, index) => {
      const day = index - firstDay + 1;
      return day > 0 && day <= daysInMonth
        ? new Date(month.getFullYear(), month.getMonth(), day)
        : null;
    });
  }, [month]);
  const selectedAppointments = appointments.filter(
    (appointment) => appointment.date === selectedKey,
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(330px,1fr)]">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {month.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a day to view its schedule
            </p>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <span key={day} className="pb-3">
              {day}
            </span>
          ))}
          {calendarDays.map((day, index) => {
            const dateKey = day && formatDate(day);
            const count = appointments.filter(
              (appointment) => appointment.date === dateKey,
            ).length;
            const selected = dateKey === selectedKey;
            return (
              <button
                key={index}
                type="button"
                disabled={!day}
                onClick={() => day && setSelectedDate(day)}
                className={`relative min-h-16 border-t border-slate-100 p-2 text-left text-sm ${!day ? "cursor-default" : "hover:bg-teal-50"} ${selected ? "bg-teal-50 font-semibold text-teal-700" : "text-slate-700"}`}
              >
                {day && (
                  <>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${selected ? "bg-teal-600 text-white" : ""}`}
                    >
                      {day.getDate()}
                    </span>
                    {count > 0 && (
                      <span className="mt-1 block text-[11px] text-slate-400">
                        {count} visit{count > 1 ? "s" : ""}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </section>
      <AppointmentList
        title={selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}
        subtitle={`${selectedAppointments.length} appointments scheduled`}
        appointments={selectedAppointments}
      />
    </div>
  );
};

export { formatDate };
export default CalendarView;
