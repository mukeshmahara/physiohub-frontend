import SettingsSection from "./SettingsSection";
import { Field } from "./SettingsFields";

const SecuritySettings = ({ passwords, onChange }) => (
  <SettingsSection title="Security" subtitle="Update your password and protect your account."><div className="grid gap-4 sm:grid-cols-2"><Field label="Current password" name="currentPassword" type="password" value={passwords.currentPassword} onChange={onChange} /><div /><Field label="New password" name="newPassword" type="password" value={passwords.newPassword} onChange={onChange} /><Field label="Confirm new password" name="confirmPassword" type="password" value={passwords.confirmPassword} onChange={onChange} /></div><p className="mt-4 text-xs text-slate-500">Use at least 8 characters with a mix of letters, numbers, and symbols.</p></SettingsSection>
);

export default SecuritySettings;
