// store/useModalStore.ts
import { create } from "zustand";

// Define modal state interface
interface ModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
