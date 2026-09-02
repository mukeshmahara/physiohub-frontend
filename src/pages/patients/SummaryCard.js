const SummaryCard = ({ label, value, icon }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-500">{label}</p>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
        {icon}
      </span>
    </div>
    <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

export default SummaryCard;
