import { useState } from "react";
import { Check, Save } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { defaultPermissions, initialPreferences } from "./data";
import SettingsNavigation from "./SettingsNavigation";
import ProfileSettings from "./ProfileSettings";
import ClinicSettings from "./ClinicSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import PermissionsSettings from "./PermissionsSettings";
import SubscriptionSettings from "./SubscriptionSettings";

const SettingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [permissions, setPermissions] = useState(defaultPermissions);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [preferences, setPreferences] = useState(() => ({
    ...initialPreferences,
    name: user?.name || "",
    email: user?.email || "",
    role: user?.activeRole || "Clinic administrator",
  }));
  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setSaved(false);
    setPreferences((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };
  const updatePassword = (event) => setPasswords((current) => ({ ...current, [event.target.name]: event.target.value }));
  const togglePermission = (role, permission) => {
    setSaved(false);
    setPermissions((current) => ({ ...current, [role]: current[role].includes(permission) ? current[role].filter((item) => item !== permission) : [...current[role], permission] }));
  };
  const saveSettings = (event) => {
    event.preventDefault();
    if (activeTab === "profile") useAuthStore.getState().updateUser({ name: preferences.name, email: preferences.email });
    setSaved(true);
  };

  return <div className="space-y-6"><header><h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Settings</h1></header><div className="grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)]"><SettingsNavigation activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setSaved(false); }} /><form onSubmit={saveSettings} className="max-h-[calc(100vh-10rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm">{activeTab === "profile" && <ProfileSettings preferences={preferences} onChange={update} />}{activeTab === "clinic" && <ClinicSettings preferences={preferences} onChange={update} />}{activeTab === "notifications" && <NotificationSettings preferences={preferences} onChange={update} />}{activeTab === "security" && <SecuritySettings passwords={passwords} onChange={updatePassword} />}{activeTab === "permissions" && <PermissionsSettings permissions={permissions} onToggle={togglePermission} />}{activeTab === "subscriptions" && <SubscriptionSettings />}<div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">{saved && <span className="mr-auto inline-flex items-center gap-2 text-sm text-emerald-700"><Check size={17} /> Changes saved</span>}<button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"><Save size={16} /> Save changes</button></div></form></div></div>;
};

export default SettingsPage;
