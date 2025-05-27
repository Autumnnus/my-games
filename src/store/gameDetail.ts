import { create } from 'zustand';

interface AppState {
  isEditGameModalOpen: boolean;
  toggleEditGameModal: () => void;
}

const useGameDetailStore = create<AppState>(set => ({
  isEditGameModalOpen: false,
  toggleEditGameModal: () => set(state => ({ isEditGameModalOpen: !state.isEditGameModalOpen })),
}));

export default useGameDetailStore;
