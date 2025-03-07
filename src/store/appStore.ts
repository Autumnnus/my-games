import { TokenData } from "@/types/auth";
import { create } from "zustand";

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  locale: string;
  setLocale: (locale: string) => void;
  me?: TokenData | undefined;
  setMe: (me: TokenData) => void;
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
  me: JSON.parse(localStorage.getItem("my-games-user") || "null") as
    | TokenData
    | undefined,
  setMe: (me) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("my-games-user", JSON.stringify(me));
    }

    set({ me });
  },
}));

export default useAppStore;
