import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  ClipboardList,
  CreditCard,
  FileText,
  Settings,
  Bell,
  MessageSquare,
} from "lucide-react";

export const navigation = {
  admin: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Patients",
      path: "/patients",
      icon: Users,
    },
    {
      label: "Appointments",
      path: "/appointments",
      icon: CalendarDays,
    },
    {
      label: "Doctors",
      path: "/doctors",
      icon: Stethoscope,
    },
    {
      label: "Therapists",
      path: "/therapists",
      icon: Stethoscope,
    },
    {
      label: "Treatments",
      path: "/treatments",
      icon: ClipboardList,
    },
    {
      label: "Billing",
      path: "/billings",
      icon: CreditCard,
    },
    {
      label: "Reports",
      path: "/reports",
      icon: FileText,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
    {
      label: "Messages",
      path: "/messages",
      icon: MessageSquare,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ],

  doctor: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Patients",
      path: "/patients",
      icon: Users,
    },
    {
      label: "Appointments",
      path: "/appointments",
      icon: CalendarDays,
    },
    {
      label: "Treatments",
      path: "/treatments",
      icon: ClipboardList,
    },
    {
      label: "Assessments",
      path: "/assessments",
      icon: ClipboardList,
    },
    {
      label: "Reports",
      path: "/reports",
      icon: FileText,
    },
    {
      label: "Messages",
      path: "/messages",
      icon: MessageSquare,
    },
  ],

  therapist: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Patients",
      path: "/patients",
      icon: Users,
    },
    {
      label: "Appointments",
      path: "/appointments",
      icon: CalendarDays,
    },
    {
      label: "Treatments",
      path: "/treatments",
      icon: ClipboardList,
    },
    {
      label: "Assessments",
      path: "/assessments",
      icon: ClipboardList,
    },
    {
      label: "Messages",
      path: "/messages",
      icon: MessageSquare,
    },
  ],

  receptionist: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Patients",
      path: "/patients",
      icon: Users,
    },
    {
      label: "Appointments",
      path: "/appointments",
      icon: CalendarDays,
    },
    {
      label: "Billing",
      path: "/billings",
      icon: CreditCard,
    },
    {
      label: "Messages",
      path: "/messages",
      icon: MessageSquare,
    },
  ],
};
