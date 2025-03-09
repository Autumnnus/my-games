import { GamesData } from "@/types/games";
import { create } from "zustand";

interface AppState {
  game?: GamesData | undefined;
  setGame: (game: GamesData) => void;
}

const useGameDetailStore = create<AppState>((set) => ({
  game: undefined,
  setGame: (game) => set({ game }),
}));

export default useGameDetailStore;
