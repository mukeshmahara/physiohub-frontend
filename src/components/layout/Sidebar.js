import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  ClipboardList,
  Dumbbell,
  CreditCard,
  Package,
  UserRoundCog,
  BarChart3,
  Bell,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Activity,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

const navigation = [
  {
    section: "MAIN",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
      {
        label: "Patients",
        icon: Users,
        children: [
          { label: "All Patients", path: "/patients" },
          { label: "Add Patient", path: "/patients/new" },
          { label: "Active Patients", path: "/patients/active" },
        ],
      },
      {
        label: "Appointments",
        icon: CalendarDays,
        children: [
          { label: "Calendar", path: "/appointments/calendar" },
          { label: "Today's Appointments", path: "/appointments/todays" },
          { label: "Upcoming", path: "/appointments/upcoming" },
          { label: "Waiting List", path: "/appointments/waiting" },
        ],
      },
      {
        label: "Treatments",
        icon: Stethoscope,
        children: [
          { label: "Treatment Sessions", path: "/treatments" },
          { label: "Treatment Plans", path: "/treatments/plans" },
          { label: "Treatment History", path: "/treatments/history" },
        ],
      },
      {
        label: "Assessments",
        icon: ClipboardList,
        children: [
          { label: "Assessments", path: "/assessments" },
          { label: "New Assessment", path: "/assessments/new" },
        ],
      },
      {
        label: "Exercise Programs",
        icon: Dumbbell,
        children: [
          { label: "Programs", path: "/exercises" },
          { label: "Exercise Library", path: "/exercises/library" },
        ],
      },
    ],
  },

  {
    section: "MANAGEMENT",
    items: [
      {
        label: "Billing & Payments",
        icon: CreditCard,
        path: "/billing",
      },
      {
        label: "Inventory",
        icon: Package,
        path: "/inventory",
      },
      {
        label: "Therapists",
        icon: UserRoundCog,
        path: "/therapists",
      },
      {
        label: "Reports",
        icon: BarChart3,
        children: [
          { label: "Patient Reports", path: "/reports/patients" },
          { label: "Appointment Reports", path: "/reports/appointments" },
          { label: "Treatment Reports", path: "/reports/treatments" },
          { label: "Revenue Reports", path: "/reports/revenue" },
        ],
      },
    ],
  },

  {
    section: "COMMUNICATION",
    items: [
      {
        label: "Notifications",
        icon: Bell,
        path: "/notifications",
        badge: 4,
      },
      {
        label: "Messages",
        icon: MessageSquare,
        path: "/messages",
      },
    ],
  },
];

const bottomNavigation = [
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    label: "Help & Support",
    icon: HelpCircle,
    path: "/help",
  },
];

function SidebarItem({ item, collapsed, isMobile, onNavigate }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const Icon = item.icon;

  const hasChildren = item.children?.length > 0;

  const childIsActive = hasChildren
    ? item.children.some((child) => location.pathname.startsWith(child.path))
    : false;

  const isActive = item.path
    ? location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`)
    : childIsActive;

  const handleParentClick = () => {
    if (hasChildren) {
      setOpen((previous) => !previous);
    } else {
      onNavigate?.();
    }
  };

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={handleParentClick}
          title={collapsed ? item.label : undefined}
          className={[
            "group flex w-full items-center rounded-xl px-3 py-2.5",
            "text-sm font-medium transition-all duration-200",
            collapsed ? "justify-center" : "justify-between",
            childIsActive
              ? "bg-teal-50 text-teal-700"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          ].join(" ")}
        >
          <span className="flex items-center gap-3">
            <Icon
              size={20}
              strokeWidth={1.8}
              className={
                childIsActive
                  ? "text-teal-600"
                  : "text-slate-500 group-hover:text-slate-700"
              }
            />

            {!collapsed && <span>{item.label}</span>}
          </span>

          {!collapsed &&
            (open ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>

        {!collapsed && open && (
          <div className="ml-9 space-y-1 border-l border-slate-200 pl-3">
            {item.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                end={child.path === "/patients" || child.path === "/treatments"}
                onClick={onNavigate}
                className={({ isActive }) =>
                  [
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-teal-50 font-medium text-teal-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        [
          "group flex items-center rounded-xl px-3 py-2.5",
          "text-sm font-medium transition-all duration-200",
          collapsed ? "justify-center" : "justify-between",
          isActive
            ? "bg-teal-50 text-teal-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        ].join(" ")
      }
    >
      <span className="flex items-center gap-3">
        <Icon size={20} strokeWidth={1.8} className="text-current" />

        {!collapsed && <span>{item.label}</span>}
      </span>

      {!collapsed && item.badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-100 px-1.5 text-[11px] font-semibold text-teal-700">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar({ mobileOpen = false, onMobileClose }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const user = useAuthStore((state) => state.user);
  const activeRole = useAuthStore((state) => state.activeRole);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // If you have Zustand auth state:
    useAuthStore.getState().logout();

    navigate("/login");
  };

  const closeMobile = () => {
    onMobileClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={[
          "fixed left-0 top-0 z-50 flex h-screen flex-col",
          "border-r border-slate-200 bg-white",
          "transition-all duration-300",
          collapsed ? "w-[72px]" : "w-[260px]",

          // Mobile
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Header */}
        <div
          className={[
            "flex h-[72px] shrink-0 items-center border-b border-slate-100",
            collapsed ? "justify-center px-3" : "justify-between px-5",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
              <Activity size={21} strokeWidth={2.2} />
            </div>

            {!collapsed && (
              <div className="text-left">
                <div className="text-lg font-bold tracking-tight text-slate-900">
                  PhysioHub
                </div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  Physiotherapy Management
                </div>
              </div>
            )}
          </button>

          {/* Mobile close */}
          <button
            type="button"
            onClick={closeMobile}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          {navigation.map((group) => (
            <div key={group.section} className="mb-6">
              {!collapsed && (
                <div className="mb-2 px-3 text-[10px] font-bold tracking-[0.12em] text-slate-400">
                  {group.section}
                </div>
              )}

              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.label}
                    item={item}
                    collapsed={collapsed}
                    isMobile={mobileOpen}
                    onNavigate={closeMobile}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Bottom navigation */}
          <div className="mb-4">
            {!collapsed && (
              <div className="mb-2 px-3 text-[10px] font-bold tracking-[0.12em] text-slate-400">
                SYSTEM
              </div>
            )}

            <div className="space-y-1">
              {bottomNavigation.map((item) => (
                <SidebarItem
                  key={item.label}
                  item={item}
                  collapsed={collapsed}
                  isMobile={mobileOpen}
                  onNavigate={closeMobile}
                />
              ))}
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-slate-100 p-3">
          {!collapsed ? (
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
                  JD
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {user?.name || user.email}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {user.activeRole || "N/A"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Logout"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-red-500"
                >
                  <LogOut size={17} />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="flex w-full justify-center rounded-xl p-2.5 text-slate-500 hover:bg-red-50 hover:text-red-500"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>

        {/* Collapse button - desktop only */}
        <div className="hidden border-t border-slate-100 p-3 lg:block">
          <button
            type="button"
            onClick={() => setCollapsed((previous) => !previous)}
            className="flex w-full items-center justify-center gap-2 rounded-xl p-2.5 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          >
            {collapsed ? (
              <PanelLeftOpen size={19} />
            ) : (
              <>
                <PanelLeftClose size={19} />
                <span>Collapse sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
