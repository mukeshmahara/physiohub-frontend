import SettingsSection from "./SettingsSection";
import { Field } from "./SettingsFields";

const ClinicSettings = ({ preferences, onChange }) => (
  <SettingsSection title="Clinic details" subtitle="Keep your clinic information up to date."><div className="grid gap-4 sm:grid-cols-2"><Field label="Clinic name" name="clinicName" value={preferences.clinicName} onChange={onChange} required /><Field label="Clinic email" name="clinicEmail" type="email" value={preferences.clinicEmail} onChange={onChange} /><Field label="Clinic phone" name="clinicPhone" type="tel" value={preferences.clinicPhone} onChange={onChange} /><Field label="Address" name="address" value={preferences.address} onChange={onChange} /></div></SettingsSection>
);

export default ClinicSettings;
