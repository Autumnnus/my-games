import { create } from "zustand";

interface AppState {
  count: number;
  addCount: () => void;
  resetCount: () => void;
}

const useAppStore = create<AppState>((set) => ({
  count: 0,
  addCount: () => set((state) => ({ count: state.count + 1 })),
  resetCount: () => set({ count: 0 }),
}));

export default useAppStore;
