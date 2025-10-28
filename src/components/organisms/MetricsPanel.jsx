import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import StatusIndicator from '../atoms/StatusIndicator'
import ProgressBar from '../atoms/ProgressBar'
import { useAppStore } from '../../store/useAppStore'
import { useSoundFeedback } from '../../hooks/useSoundFeedback'

function Gauge({ value = 75 }) {
  const clamped = Math.max(0, Math.min(100, value))
  const deg = useMotionValue(clamped * 3.6)
  const springDeg = useSpring(deg, { stiffness: 160, damping: 24 })
  useEffect(() => { deg.set(clamped * 3.6) }, [clamped, deg])
  const [display, setDisplay] = useState(clamped)
  useEffect(() => { setDisplay(clamped) }, [clamped])
  return (
    <div className="relative w-28 h-28">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: springDeg.to((d) => `conic-gradient(#6366F1 ${d}deg, rgba(255,255,255,0.1) 0deg)`) }}
      />
      <div className="absolute inset-2 rounded-full bg-black/40 backdrop-blur border border-white/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-xl font-bold text-white">{display}%</div>
      </div>
    </div>
  )
}

export default function MetricsPanel() {
  const repCount = useAppStore((s) => s.repCount)
  const { chime } = useSoundFeedback()
  const prevRep = useRef(repCount)
  useEffect(() => {
    if (repCount > prevRep.current) {
      chime()
    }
    prevRep.current = repCount
  }, [repCount, chime])

  const [seconds, setSeconds] = useState(155)
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const timeText = useMemo(() => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [seconds])

  const quality = 96

  return (
    <motion.div layout className="glass rounded-2xl p-4 shadow-ai" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-white/60">Reps</div>
          <div className="text-4xl font-bold text-primary">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={repCount} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                {String(repCount).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div>
          <div className="text-xs text-white/60">Sets</div>
          <div className="text-4xl font-bold">2 / 3</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Timer</div>
          <div className="text-3xl font-bold font-numeric overflow-hidden h-[1.2em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={timeText} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 90, opacity: 0 }} transition={{ duration: 0.3 }} style={{ display: 'inline-block' }}>
                {timeText}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status="active" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-white/60 mb-1">Quality</div>
          <ProgressBar value={quality} className="w-48" />
        </div>
        <Gauge value={quality} />
      </div>
    </motion.div>
  )
}
