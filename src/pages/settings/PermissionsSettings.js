import SettingsSection from "./SettingsSection";
import { defaultPermissions } from "./data";

const PermissionsSettings = ({ permissions, onToggle }) => {
  const permissionNames = defaultPermissions["Clinic administrator"];
  return <SettingsSection title="Roles & permissions" subtitle="Control which areas each clinic role can access."><div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[620px] text-left text-sm"><thead><tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-400"><th className="px-4 py-3">Role</th>{permissionNames.map((permission) => <th key={permission} className="px-4 py-3 capitalize">{permission}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{Object.keys(permissions).map((role) => <tr key={role}><td className="px-4 py-4 font-medium text-slate-800">{role}</td>{permissionNames.map((permission) => <td key={permission} className="px-4 py-4"><input type="checkbox" checked={permissions[role].includes(permission)} onChange={() => onToggle(role, permission)} aria-label={`${role} ${permission} permission`} className="h-4 w-4 accent-teal-600" /></td>)}</tr>)}</tbody></table></div><p className="text-xs text-slate-500">Changes apply to new sessions after permissions are saved.</p></SettingsSection>;
};

export default PermissionsSettings;
