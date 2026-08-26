import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronRight, Menu, Search, UserCircle } from "lucide-react";

import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Convert pathname into readable page name
  const getPageName = () => {
    const path = location.pathname;

    const pages = {
      "/dashboard": "Dashboard",
      "/patients": "Patients",
      "/appointments": "Appointments",
      "/treatments": "Treatments",
      "/assessments": "Assessments",
      "/billing": "Billing & Payments",
      "/inventory": "Inventory",
      "/therapists": "Therapists",
      "/reports": "Reports",
      "/notifications": "Notifications",
      "/messages": "Messages",
      "/settings": "Settings",
      "/help": "Help & Support",
    };

    return pages[path] || "Dashboard";
  };

  const pageName = getPageName();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =========================================
          SIDEBAR
      ========================================= */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* =========================================
          MAIN AREA
      ========================================= */}
      <div className="min-h-screen lg:pl-[260px]">
        {/* =========================================
            TOP HEADER
        ========================================= */}
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left */}
            <div className="flex min-w-0 items-center gap-3">
              {/* Mobile menu */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu size={22} />
              </button>

              {/* Breadcrumb */}
              <div className="flex min-w-0 items-center gap-2">
                <span className="hidden text-sm text-slate-400 sm:block">
                  PhysioHub
                </span>

                <ChevronRight
                  size={15}
                  className="hidden text-slate-300 sm:block"
                />

                <h1 className="truncate text-sm font-semibold text-slate-800 sm:text-base">
                  {pageName}
                </h1>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <button
                type="button"
                className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Notifications */}
              <button
                type="button"
                onClick={() => navigate("/notifications")}
                className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Notifications"
              >
                <Bell size={20} />

                {/* Notification badge */}
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white" />
              </button>

              {/* Divider */}
              <div className="mx-1 hidden h-7 w-px bg-slate-200 sm:block" />

              {/* User */}
              <button
                type="button"
                onClick={() => navigate("/settings")}
                className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <UserCircle size={20} />
                </div>

                <div className="hidden text-left md:block">
                  <p className="max-w-[120px] truncate text-sm font-semibold text-slate-800">
                    Dr. John Doe
                  </p>

                  <p className="text-xs text-slate-400">Administrator</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* =========================================
            PAGE CONTENT
        ========================================= */}
        <main>
          <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
