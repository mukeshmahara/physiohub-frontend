import { Bell, Building2, CreditCard, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";

export const settingsTabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "clinic", label: "Clinic details", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: LockKeyhole },
  { id: "permissions", label: "Roles & permissions", icon: ShieldCheck },
  { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
];

export const initialPreferences = {
  name: "", email: "", phone: "", role: "", clinicName: "PhysioHub Clinic",
  clinicEmail: "hello@physiohub.com", clinicPhone: "+977 9800000000",
  address: "Kathmandu, Nepal", emailNotifications: true,
  appointmentReminders: true, weeklySummary: false,
};

export const defaultPermissions = {
  "Clinic administrator": ["patients", "appointments", "treatments", "billing", "reports"],
  Therapist: ["patients", "appointments", "treatments"],
  Receptionist: ["patients", "appointments"],
};
