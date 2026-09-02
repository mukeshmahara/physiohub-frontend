export const Field = ({ label, name, type = "text", value, onChange, required, disabled }) => (
  <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">{label}{required && " *"}</span><input name={name} type={type} required={required} value={value} onChange={onChange} disabled={disabled} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-50 disabled:text-slate-400" /></label>
);

export const Toggle = ({ name, checked, onChange, title, description }) => (
  <label className="flex cursor-pointer items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><span><span className="block text-sm font-medium text-slate-800">{title}</span><span className="mt-1 block text-sm text-slate-500">{description}</span></span><input name={name} type="checkbox" checked={checked} onChange={onChange} className="h-5 w-5 accent-teal-600" /></label>
);

export const Usage = ({ label, value, percent }) => (
  <div><div className="flex justify-between text-xs text-slate-600"><span>{label}</span><span>{value}</span></div><div className="mt-2 h-2 rounded-full bg-white"><div className="h-2 rounded-full bg-teal-600" style={{ width: percent }} /></div></div>
);
