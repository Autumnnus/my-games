import { GamesData } from '@/types/games';
import { create } from 'zustand';

interface AppState {
  isAddGameModalOpen: boolean;
  toggleAddGameModal: () => void;
  isEditGameModalOpen: boolean;
  toggleEditGameModal: () => void;
  selectedGame: GamesData | null;
  setSelectedGame: (game: GamesData | null) => void;
}

const useGameDetailStore = create<AppState>(set => ({
  isAddGameModalOpen: false,
  toggleAddGameModal: () => set(state => ({ isAddGameModalOpen: !state.isAddGameModalOpen })),
  isEditGameModalOpen: false,
  toggleEditGameModal: () => set(state => ({ isEditGameModalOpen: !state.isEditGameModalOpen })),
  selectedGame: null,
  setSelectedGame: game => set({ selectedGame: game }),
}));

export default useGameDetailStore;
