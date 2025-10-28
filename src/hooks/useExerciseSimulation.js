import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'

// Lightweight simulation of exercise tracking + AI analysis
// - Updates every 2.5s: analyzing -> feedback -> rep increment
// - Maintains a 1s timer in store
export function useExerciseSimulation(enabled = true) {
  const {
    repCount,
    totalReps,
    setRepCount,
    setAnalyzing,
    setAiFeedback,
    setAiStatus,
    setRepQuality,
    secondsElapsed,
    setSecondsElapsed,
    sessionActive,
    setSessionActive,
  } = useAppStore((s) => ({
    repCount: s.repCount,
    totalReps: s.totalReps,
    setRepCount: s.setRepCount,
    setAnalyzing: s.setAnalyzing,
    setAiFeedback: s.setAiFeedback,
    setAiStatus: s.setAiStatus,
    setRepQuality: s.setRepQuality,
    secondsElapsed: s.secondsElapsed,
    setSecondsElapsed: s.setSecondsElapsed,
    sessionActive: s.sessionActive,
    setSessionActive: s.setSessionActive,
  }))

  const repRef = useRef(repCount)
  useEffect(() => {
    repRef.current = repCount
  }, [repCount])

  // Timer tick
  useEffect(() => {
    if (!enabled) return
    const id = setInterval(() => {
      setSecondsElapsed(secondsElapsed => secondsElapsed + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [enabled, setSecondsElapsed])

  // Main simulation loop
  useEffect(() => {
    if (!enabled) return

    let cancelled = false

    const tick = async () => {
      if (cancelled) return
      // Randomly simulate a brief analyzing phase or a pause
      const lostFrame = Math.random() < 0.07 // 7% chance
      if (lostFrame) {
        setAiStatus('Paused / Lost Frame')
        setAnalyzing(false)
        // brief pause
        await new Promise((r) => setTimeout(r, 1200))
        setAiStatus('Tracking Active')
      } else {
        setAnalyzing(true)
        setAiStatus('Analyzing')
        setAiFeedback('')
        // analysis time
        await new Promise((r) => setTimeout(r, 900 + Math.random() * 600))
        // Generate quality and feedback
        const quality = Math.round(60 + Math.random() * 40) // 60 - 100
        setRepQuality(quality)
        let feedback = 'Maintain neutral spine and breathe.'
        if (quality >= 90) feedback = 'Perfect posture! Keep it up.'
        else if (quality >= 85) feedback = 'Good posture! Lift your elbow slightly higher.'
        else if (quality >= 70) feedback = 'Nice effort — focus on smooth tempo.'
        else feedback = 'Watch your alignment — slow down and reset.'
        setAiFeedback(feedback)
        setAnalyzing(false)
        setAiStatus('Tracking Active')

        // Increment rep if session active and not finished
        setRepCount((prev) => {
          const next = (typeof prev === 'number' ? prev : 0) + 1
          if (next >= totalReps) {
            // End session automatically when reaching total reps
            setSessionActive(false)
          }
          return Math.min(next, totalReps)
        })
      }
    }

    const interval = setInterval(tick, 2500)
    // immediate first tick after a brief delay (gives UI a moment to mount)
    const kickoff = setTimeout(tick, 800)

    return () => {
      cancelled = true
      clearInterval(interval)
      clearTimeout(kickoff)
    }
  }, [enabled, setAnalyzing, setAiFeedback, setAiStatus, setRepQuality, setRepCount, setSessionActive, totalReps])
}
