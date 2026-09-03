import { ListFilter, Users } from "lucide-react";

const WaitingList = ({ appointments }) => (
  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Waiting list</h2>
        <p className="mt-1 text-sm text-slate-500">
          Patients waiting for an appointment slot
        </p>
      </div>
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
        <Users size={14} /> {appointments.length} waiting
      </span>
    </div>
    <div className="divide-y divide-slate-100">
      {appointments.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6"
        >
          <div className="flex flex-1 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
              {item.initials}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{item.patient}</p>
              <p className="text-xs text-slate-500">
                {item.date} {item.time}
              </p>
            </div>
          </div>
          <div className="flex-1 text-sm text-slate-600">
            <p>{item.type}</p>
            <p className="mt-1 text-xs text-slate-400">
              Preferred: {item.therapist}
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-teal-200 px-3 py-2 text-sm font-medium text-teal-700 hover:bg-teal-50"
          >
            Find a slot
          </button>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 text-xs text-slate-500">
      <ListFilter size={15} /> Patients are ordered by request time.
    </div>
  </section>
);

export default WaitingList;
