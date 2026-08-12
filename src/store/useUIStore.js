import { create } from "zustand";

/**
 * Global UI Store using Zustand
 * Handles global notifications, modal popups, and UI state
 */
export const useUIStore = create((set, get) => ({
  isMobileMenuOpen: false,
  activeModal: null, // 'login' | 'demo' | null
  toast: null, // { type: 'success' | 'error' | 'info', message: string }

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),

  openModal: (modalName) => set({ activeModal: modalName }),
  closeModal: () => set({ activeModal: null }),

  /**
   * Display Toast Notification with auto-dismiss
   */
  showToast: (message, type = "info", duration = 4000) => {
    set({ toast: { message, type } });
    setTimeout(() => {
      if (get().toast?.message === message) {
        set({ toast: null });
      }
    }, duration);
  },

  clearToast: () => set({ toast: null }),
}));

export default useUIStore;
