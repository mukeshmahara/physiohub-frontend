import SettingsSection from "./SettingsSection";
import { Field } from "./SettingsFields";

const ProfileSettings = ({ preferences, onChange }) => (
  <SettingsSection title="Profile" subtitle="Manage the personal details shown on your account.">
    <div className="flex items-center gap-4 border-b border-slate-100 pb-6"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-lg font-semibold text-teal-700">{preferences.name ? preferences.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() : "PH"}</div><div><p className="font-semibold text-slate-900">{preferences.name || "Your profile"}</p><p className="text-sm text-slate-500">{preferences.role}</p></div></div>
    <div className="grid gap-4 sm:grid-cols-2"><Field label="Full name" name="name" value={preferences.name} onChange={onChange} required /><Field label="Email address" name="email" type="email" value={preferences.email} onChange={onChange} required /><Field label="Phone number" name="phone" type="tel" value={preferences.phone} onChange={onChange} /><Field label="Role" name="role" value={preferences.role} onChange={onChange} disabled /></div>
  </SettingsSection>
);

export default ProfileSettings;
