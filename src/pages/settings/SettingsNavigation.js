import { settingsTabs } from "./data";

const SettingsNavigation = ({ activeTab, onChange }) => (
  <nav className="flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:block lg:h-fit lg:space-y-1">
    {settingsTabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} type="button" onClick={() => onChange(tab.id)} className={`flex min-w-fit items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition lg:w-full ${activeTab === tab.id ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}><Icon size={18} />{tab.label}</button>; })}
  </nav>
);

export default SettingsNavigation;
