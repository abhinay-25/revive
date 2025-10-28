import { useCallback, useRef } from 'react'

export function useSoundFeedback() {
  const ctxRef = useRef(null)

  const getCtx = () => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      ctxRef.current = AudioCtx ? new AudioCtx() : null
    }
    return ctxRef.current
  }

  const beep = useCallback((frequency = 880, duration = 120, type = 'sine', volume = 0.04) => {
    const ctx = getCtx()
    if (!ctx) return
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.value = frequency
    g.gain.value = volume
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration / 1000)
    o.stop(ctx.currentTime + duration / 1000)
  }, [])

  const chime = useCallback(() => {
    // simple two-tone chime
    beep(740, 120, 'sine', 0.05)
    setTimeout(() => beep(988, 160, 'sine', 0.05), 110)
  }, [beep])

  const warn = useCallback(() => {
    // quick descending alert
    const ctx = getCtx()
    if (!ctx) return
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'square'
    o.frequency.setValueAtTime(660, ctx.currentTime)
    o.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.18)
    g.gain.value = 0.04
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + 0.2)
  }, [])

  return { beep, chime, warn }
}
