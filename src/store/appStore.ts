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

const isBrowser = typeof window !== "undefined";

const getItem = (key: string, defaultValue: string = "") =>
  isBrowser ? localStorage.getItem(key) || defaultValue : defaultValue;

const setItem = (key: string, value: string) => {
  if (isBrowser) localStorage.setItem(key, value);
};

const useAppStore = create<AppState>((set) => ({
  darkMode: isBrowser && getItem("darkMode") === "true",
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      setItem("darkMode", String(newDarkMode));

      return { darkMode: newDarkMode };
    }),
  locale: isBrowser ? getItem("locale", "en") : "en",
  setLocale: (locale) => {
    setItem("locale", locale);
    if (isBrowser) {
      document.cookie = `locale=${locale}; path=/`;
    }

    set({ locale });
  },
  me: isBrowser ? JSON.parse(getItem("my-games-user") || "null") : undefined,
  setMe: (me) => {
    setItem("my-games-user", JSON.stringify(me));
    set({ me });
  },
}));

export default useAppStore;
