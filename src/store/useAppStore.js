import { create } from 'zustand'

export const useAppStore = create((set) => ({
  repCount: 0,
  setRepCount: (count) => set({ repCount: count }),
  sessionActive: true,
  analyzing: false,
  aiFeedback: 'Perfect posture! Keep it up 💪',
}))
