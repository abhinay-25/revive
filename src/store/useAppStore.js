import { create } from 'zustand'

export const useAppStore = create((set) => ({
  repCount: 0,
  setRepCount: (countOrUpdater) =>
    set((state) => ({
      repCount:
        typeof countOrUpdater === 'function' ? countOrUpdater(state.repCount) : countOrUpdater,
    })),
  sessionActive: true,
  analyzing: false,
  aiFeedback: 'Perfect posture! Keep it up 💪',
  aiStatus: 'Tracking Active',
  currentExercise: 'Shoulder Rotation',
  totalReps: 10,
  currentSet: 1,
  totalSets: 3,
  repQuality: 90,
  secondsElapsed: 0,
  setAnalyzing: (val) => set({ analyzing: val }),
  setAiFeedback: (text) => set({ aiFeedback: text }),
  setAiStatus: (text) => set({ aiStatus: text }),
  setRepQuality: (val) => set({ repQuality: val }),
  // Accept either a number or an updater function for convenience
  setSecondsElapsed: (valOrUpdater) =>
    set((s) => ({
      secondsElapsed:
        typeof valOrUpdater === 'function' ? valOrUpdater(s.secondsElapsed) : valOrUpdater,
    })),
  setSessionActive: (val) => set({ sessionActive: val }),
  setCurrentSet: (updater) =>
    set((s) => ({ currentSet: typeof updater === 'function' ? updater(s.currentSet) : updater })),
  endModalOpen: false,
  setEndModalOpen: (val) => set({ endModalOpen: val }),
  // Rep history across the session for timeline/chart
  repHistory: [], // [{ id, setNumber, repInSet, quality, feedback, emoji, ts }]
  pushRepHistory: (entry) => set((s) => ({ repHistory: [...s.repHistory, entry] })),
  resetRepHistory: () => set({ repHistory: [] }),
  // Coach reactions toggle
  coachEnabled: true,
  setCoachEnabled: (val) => set({ coachEnabled: val }),
  // Accessibility & UX toggles
  highContrast: false,
  setHighContrast: (val) => set({ highContrast: val }),
  reduceMotion: false,
  setReduceMotion: (val) => set({ reduceMotion: val }),
  replayEnabled: false,
  setReplayEnabled: (val) => set({ replayEnabled: val }),
  // Demo mode & mock pose feed
  demoMode: false,
  setDemoMode: (val) => set({ demoMode: val }),
  demoSpeed: 1,
  setDemoSpeed: (val) => set({ demoSpeed: val }),
  demoKeypoints: [],
  setDemoKeypoints: (points) => set({ demoKeypoints: points || [] }),
}))
