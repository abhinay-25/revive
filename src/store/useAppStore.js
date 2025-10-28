import { create } from 'zustand'

export const useAppStore = create((set) => ({
  repCount: 0,
  setRepCount: (countOrUpdater) =>
    set((state) => ({
      repCount:
        typeof countOrUpdater === 'function'
          ? countOrUpdater(state.repCount)
          : countOrUpdater,
    })),
  sessionActive: true,
  analyzing: false,
  aiFeedback: 'Perfect posture! Keep it up 💪',
  aiStatus: 'Tracking Active',
  currentExercise: 'Shoulder Rotation',
  totalReps: 10,
  repQuality: 90,
  secondsElapsed: 0,
  setAnalyzing: (val) => set({ analyzing: val }),
  setAiFeedback: (text) => set({ aiFeedback: text }),
  setAiStatus: (text) => set({ aiStatus: text }),
  setRepQuality: (val) => set({ repQuality: val }),
  setSecondsElapsed: (val) => set({ secondsElapsed: val }),
  setSessionActive: (val) => set({ sessionActive: val }),
}))
