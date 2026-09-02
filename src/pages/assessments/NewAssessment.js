import { useState } from "react";
import { Check } from "lucide-react";

const NewAssessment = () => {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ patient: "", type: "", pain: "", mobility: "", strength: "", notes: "" });
  const update = (event) => { setSaved(false); setForm((current) => ({ ...current, [event.target.name]: event.target.value })); };
  const submit = (event) => { event.preventDefault(); setSaved(true); };
  const input = (label, name, type = "text", required = false) => <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">{label}{required && " *"}</span><input name={name} type={type} required={required} value={form[name]} onChange={update} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" /></label>;
  return <form onSubmit={submit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">{saved && <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"><Check size={18} /> Assessment saved successfully.</div>}<div><h2 className="text-lg font-semibold text-slate-900">New assessment</h2><p className="mt-1 text-sm text-slate-500">Record the patient's baseline measurements and clinical findings.</p></div><div className="grid gap-4 sm:grid-cols-2">{input("Patient", "patient", "text", true)}{input("Assessment type", "type", "text", true)}{input("Pain level (0-10)", "pain", "number")}{input("Mobility score", "mobility", "number")}{input("Strength score", "strength", "number")}</div><label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Clinical notes</span><textarea name="notes" value={form.notes} onChange={update} rows="5" placeholder="Add findings and recommendations..." className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" /></label><div className="flex justify-end border-t border-slate-100 pt-5"><button type="submit" className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">Save assessment</button></div></form>;
};

export default NewAssessment;
