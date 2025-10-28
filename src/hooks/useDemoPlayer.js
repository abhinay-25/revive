import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'

// Demo player streams mock frames and drives UI without a camera
// Contract
// - Runs only when demoMode === true and sessionActive === true
// - Streams frames at ~30 FPS scaled by demoSpeed
// - Updates: demoKeypoints (per frame), repCount/repHistory when rep changes, aiFeedback/aiStatus/repQuality periodically
export function useDemoPlayer() {
  // Primitives
  const demoMode = useAppStore((s) => s.demoMode)
  const demoSpeed = useAppStore((s) => s.demoSpeed)
  const sessionActive = useAppStore((s) => s.sessionActive)
  const totalReps = useAppStore((s) => s.totalReps)
  const currentSet = useAppStore((s) => s.currentSet)
  const totalSets = useAppStore((s) => s.totalSets)

  // Setters are stable; read them once from the store
  const {
    setDemoKeypoints,
    setRepCount,
    pushRepHistory,
    setAiFeedback,
    setAiStatus,
    setRepQuality,
    setCurrentSet,
    setSessionActive,
  } = useAppStore.getState()

  const frameIdxRef = useRef(0)
  const lastRepRef = useRef(0)
  const framesRef = useRef(null)
  const rafRef = useRef(null)
  const feedbackTickRef = useRef(0)

  useEffect(() => {
    if (!demoMode) return

    let cancelled = false

    async function loadFrames() {
      try {
        const mod = await import('@/assets/mockSession.json')
        framesRef.current = mod.default.frames || []
      } catch (e) {
        console.error('Failed to load mockSession.json', e)
        framesRef.current = []
      }
    }

    loadFrames()

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [demoMode])

  useEffect(() => {
    if (!demoMode) return
    if (!sessionActive) return
    if (!framesRef.current || framesRef.current.length === 0) return

    let lastTs = performance.now()

    const step = (now) => {
      const dt = now - lastTs
      // Target ~33ms per frame at 1x
      const targetFrameMs = 33 / (demoSpeed || 1)
      if (dt >= targetFrameMs) {
        lastTs = now
        const frames = framesRef.current
        if (!frames || frames.length === 0) return
        const idx = frameIdxRef.current % frames.length
        const frame = frames[idx]
        frameIdxRef.current = (frameIdxRef.current + 1) % frames.length
        setDemoKeypoints(frame.keypoints || [])

        // Update rep/repHistory on rep change
        const rep = frame.rep || 0
        if (rep !== lastRepRef.current) {
          lastRepRef.current = rep
          // Derive quality/feedback
          const quality = Math.max(50, Math.min(100, Math.round(frame.score ?? 85)))
          setRepQuality(quality)
          const feedback =
            quality >= 90
              ? 'Excellent form — keep breathing!'
              : quality >= 80
                ? 'Good rep — keep knees tracking over toes.'
                : 'Reset posture and slow the tempo.'
          setAiFeedback(feedback)
          setAiStatus('Tracking Active')

          // Push history and increment repCount
          setRepCount((prev) => {
            const prevNum = typeof prev === 'number' ? prev : 0
            const repInSet = prevNum + 1
            const id = (currentSet - 1) * totalReps + repInSet
            const emoji = quality >= 90 ? '🔥' : quality >= 80 ? '💪' : '⚠️'
            pushRepHistory({
              id,
              setNumber: currentSet,
              repInSet,
              quality,
              feedback,
              emoji,
              ts: Date.now(),
            })
            const next = prevNum + 1
            if (next >= totalReps) {
              if (currentSet < totalSets) {
                setCurrentSet((v) => v + 1)
                return 0
              } else {
                setSessionActive(false)
                return totalReps
              }
            }
            return next
          })
        }

        // Periodic analyze pulse
        feedbackTickRef.current += 1
        if (feedbackTickRef.current % 45 === 0) {
          setAiStatus('Analyzing')
        } else if (feedbackTickRef.current % 45 === 10) {
          setAiStatus('Tracking Active')
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }

    setAiStatus('Tracking Active')
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [
    demoMode,
    sessionActive,
    demoSpeed,
    setDemoKeypoints,
    setRepQuality,
    setAiFeedback,
    setAiStatus,
    setRepCount,
    pushRepHistory,
    totalReps,
    currentSet,
    totalSets,
    setCurrentSet,
    setSessionActive,
  ])
}
