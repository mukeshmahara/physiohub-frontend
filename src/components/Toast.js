import React from "react";
import { useUIStore } from "../store/useUIStore";

/**
 * Global Toast Notification Component powered by Zustand UI Store
 */
export function Toast() {
  const toast = useUIStore((state) => state.toast);
  const clearToast = useUIStore((state) => state.clearToast);

  if (!toast) return null;

  const typeStyles = {
    success: "bg-emerald-600 text-white shadow-emerald-500/20",
    error: "bg-rose-600 text-white shadow-rose-500/20",
    info: "bg-primary-600 text-white shadow-primary-500/20",
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeInUp">
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl backdrop-blur-md text-sm font-semibold transition-all ${
          typeStyles[toast.type] || typeStyles.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <span>{toast.message}</span>
        <button
          onClick={clearToast}
          className="ml-2 hover:opacity-75 transition-opacity"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;
