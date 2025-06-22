import { GamesData } from '@/types/games';
import { create } from 'zustand';

interface AppState {
  isEditGameModalOpen: boolean;
  toggleEditGameModal: () => void;
  selectedGame: GamesData | null;
  setSelectedGame: (game: GamesData | null) => void;
}

const useGameDetailStore = create<AppState>(set => ({
  isEditGameModalOpen: false,
  toggleEditGameModal: () => set(state => ({ isEditGameModalOpen: !state.isEditGameModalOpen })),
  selectedGame: null,
  setSelectedGame: game => set({ selectedGame: game }),
}));

export default useGameDetailStore;
