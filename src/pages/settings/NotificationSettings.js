import SettingsSection from "./SettingsSection";
import { Toggle } from "./SettingsFields";

const NotificationSettings = ({ preferences, onChange }) => (
  <SettingsSection title="Notifications" subtitle="Choose which updates you want to receive."><div className="divide-y divide-slate-100"><Toggle name="emailNotifications" checked={preferences.emailNotifications} onChange={onChange} title="Email notifications" description="Receive important clinic updates by email." /><Toggle name="appointmentReminders" checked={preferences.appointmentReminders} onChange={onChange} title="Appointment reminders" description="Get notified before upcoming appointments." /><Toggle name="weeklySummary" checked={preferences.weeklySummary} onChange={onChange} title="Weekly summary" description="Receive a weekly overview of clinic activity." /></div></SettingsSection>
);

export default NotificationSettings;
