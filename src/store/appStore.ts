import { create } from "zustand";

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  locale: string;
  setLocale: (locale: string) => void;
}

const useAppStore = create<AppState>((set) => ({
  darkMode: localStorage.getItem("darkMode") === "true",
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", String(newDarkMode));
      }

      return { darkMode: newDarkMode };
    }),
  locale:
    typeof window !== "undefined"
      ? localStorage.getItem("locale") || "en"
      : "en",
  setLocale: (locale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
      document.cookie = `locale=${locale}; path=/`;
    }

    set({ locale });
  },
}));

export default useAppStore;
