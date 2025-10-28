import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'

// Lightweight simulation of exercise tracking + AI analysis
// - Updates every 2.5s: analyzing -> feedback -> rep increment
// - Maintains a 1s timer in store
export function useExerciseSimulation(enabled = true) {
  // Select only primitives with separate subscriptions (stable, no getSnapshot warnings)
  const repCount = useAppStore((s) => s.repCount)
  const totalReps = useAppStore((s) => s.totalReps)
  const currentSet = useAppStore((s) => s.currentSet)
  const totalSets = useAppStore((s) => s.totalSets)
  const secondsElapsed = useAppStore((s) => s.secondsElapsed)
  const sessionActive = useAppStore((s) => s.sessionActive)

  // Grab setter functions once (they are stable in Zustand)
  const {
    setRepCount,
    setAnalyzing,
    setAiFeedback,
    setAiStatus,
    setRepQuality,
    setSecondsElapsed,
    setSessionActive,
    setCurrentSet,
    pushRepHistory,
  } = useAppStore.getState()

  const repRef = useRef(repCount)
  useEffect(() => {
    repRef.current = repCount
  }, [repCount])

  // Timer tick (only when session is active). Runs regardless of demo/simulation state so the timer is always real.
  useEffect(() => {
    if (!sessionActive) return
    const id = setInterval(() => {
      setSecondsElapsed((secondsElapsed) => secondsElapsed + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [sessionActive, setSecondsElapsed])

  // Main simulation loop
  useEffect(() => {
    if (!enabled) return
    if (!sessionActive) return

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
          const prevNum = typeof prev === 'number' ? prev : 0
          const next = prevNum + 1
          // Append to rep history before potential set rollover
          const repInSet = prevNum + 1
          const id = (currentSet - 1) * totalReps + repInSet
          const emoji = quality >= 90 ? '🔥' : quality >= 80 ? '💪' : quality < 60 ? '⚠️' : ''
          pushRepHistory({
            id,
            setNumber: currentSet,
            repInSet,
            quality,
            feedback,
            emoji,
            ts: Date.now(),
          })
          if (next >= totalReps) {
            if (currentSet < totalSets) {
              // complete set, reset reps and advance set
              setCurrentSet((v) => v + 1)
              return 0
            } else {
              // final set complete: end session
              setSessionActive(false)
              return totalReps
            }
          }
          return next
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
  }, [
    enabled,
    sessionActive,
    setAnalyzing,
    setAiFeedback,
    setAiStatus,
    setRepQuality,
    setRepCount,
    setSessionActive,
    totalReps,
    currentSet,
    totalSets,
    setCurrentSet,
    pushRepHistory,
  ])
}
