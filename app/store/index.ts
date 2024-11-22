import { create } from "zustand";

interface Steps {
  step: number;
  increase: (by: number) => void;
  decrement: (by: number) => void;
}

export const useStepsStore = create<Steps>()((set) => ({
  step: 1,
  increase: (by) => set((state) => ({ step: state.step + by })),
  decrement: (by) => set((state) => ({ step: state.step - by })),
}));
