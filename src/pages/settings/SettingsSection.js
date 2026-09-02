const SettingsSection = ({ title, subtitle, children }) => (
  <div className="space-y-6 p-5 sm:p-7">
    <div><h2 className="text-lg font-semibold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div>
    {children}
  </div>
);

export default SettingsSection;
