import { useState } from "react";
import { X } from "lucide-react";
import { useCreateAppointmentMutation } from "../../services/appointmentQueries";

const initialForm = {
  patient_id: "",
  doctor_id: "",
  scheduled_at: "",
  status: "scheduled",
  notes: "",
};

const NewAppointment = ({ onClose, selectedDate }) => {
  const [form, setForm] = useState(() => ({
    ...initialForm,
    scheduled_at: selectedDate
      ? `${selectedDate.toISOString().slice(0, 10)}T09:00`
      : "",
  }));
  const createAppointment = useCreateAppointmentMutation({ onSuccess: onClose });
  const update = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const submit = (event) => {
    event.preventDefault();
    createAppointment.mutate({
      ...form,
      patient_id: Number(form.patient_id),
      doctor_id: Number(form.doctor_id),
      scheduled_at: new Date(form.scheduled_at).toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <form onSubmit={submit} className="w-full max-w-lg space-y-5 rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div><h2 className="text-lg font-bold text-slate-900">New appointment</h2><p className="mt-1 text-sm text-slate-500">Schedule a patient appointment.</p></div>
          <button type="button" onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Patient ID" name="patient_id" type="number" value={form.patient_id} onChange={update} />
          <Field label="Doctor ID" name="doctor_id" type="number" value={form.doctor_id} onChange={update} />
          <Field label="Scheduled at" name="scheduled_at" type="datetime-local" value={form.scheduled_at} onChange={update} />
          <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Status</span><select name="status" value={form.status} onChange={update} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="scheduled">Scheduled</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option></select></label>
        </div>
        <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Notes</span><textarea name="notes" rows="3" value={form.notes} onChange={update} className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm" /></label>
        {createAppointment.isError && <p className="text-sm text-red-600">{createAppointment.error?.message || "Unable to create appointment."}</p>}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm">Cancel</button><button type="submit" disabled={createAppointment.isPending} className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{createAppointment.isPending ? "Saving..." : "Create appointment"}</button></div>
      </form>
    </div>
  );
};

const Field = ({ label, name, type, value, onChange }) => <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">{label} *</span><input required name={name} type={type} value={value} onChange={onChange} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm" /></label>;

export default NewAppointment;
