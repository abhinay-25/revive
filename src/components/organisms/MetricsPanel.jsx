import React, { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StatusIndicator from '../atoms/StatusIndicator'
import { Progress as ProgressBar } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { useAppStore } from '../../store/useAppStore'
import { useSoundFeedback } from '../../hooks/useSoundFeedback'
import QualityRing from '@/components/molecules/QualityRing'
import ParticleBurst from '@/components/molecules/ParticleBurst'

// replaced legacy Gauge with QualityRing

export default function MetricsPanel() {
  const repCount = useAppStore((s) => s.repCount)
  const repQuality = useAppStore((s) => s.repQuality)
  const seconds = useAppStore((s) => s.secondsElapsed)
  const aiStatus = useAppStore((s) => s.aiStatus)
  const currentSet = useAppStore((s) => s.currentSet)
  const { chime } = useSoundFeedback()
  const prevRep = useRef(repCount)
  useEffect(() => {
    if (repCount > prevRep.current) chime()
    prevRep.current = repCount
  }, [repCount, chime])
  const timeText = useMemo(() => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [seconds])

  const quality = repQuality ?? 0

  return (
    <motion.div
      layout
      className="glass rounded-2xl p-4 shadow-ai"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-white/60">Reps</div>
          <div className="relative inline-block text-4xl font-bold">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={repCount}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 1.25, 1], opacity: 1, color: (repQuality ?? 0) >= 90 ? '#10B981' : '#60A5FA' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 120, damping: 15 }}
                className="font-numeric"
              >
                {String(repCount).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence>
              {(repQuality ?? 0) >= 90 && (
                <motion.span
                  key={`pulse-${repCount}`}
                  className="absolute -inset-1 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.6, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    boxShadow: '0 0 0 4px rgba(16,185,129,0.3), 0 0 30px rgba(16,185,129,0.35) inset',
                  }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              <ParticleBurst key={`burst-${currentSet}`} triggerKey={currentSet} />
            </AnimatePresence>
          </div>
        </div>
        <div>
          <div className="text-xs text-white/60">Sets</div>
          <div className="text-4xl font-bold">
            {useAppStore((s) => s.currentSet)} / {useAppStore((s) => s.totalSets)}
          </div>
        </div>
        <div>
          <div className="text-xs text-white/60">Timer</div>
          <div className="text-3xl font-bold font-numeric overflow-hidden h-[1.2em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={timeText}
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'inline-block' }}
              >
                {timeText}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status={aiStatus?.toLowerCase?.().includes('analyz') ? 'analyzing' : aiStatus?.toLowerCase?.().includes('paused') ? 'paused' : 'active'} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-white/60 mb-1">Quality</div>
          <ProgressBar value={quality} className="w-48" />
        </div>
  <QualityRing value={quality} />
      </div>
      <div className="mt-4">
        <label htmlFor="sensitivity" className="text-xs text-white/60 mb-1 block">
          Sensitivity
        </label>
        <div className="flex items-center gap-3">
          <Slider value={[70]} min={0} max={100} step={1} onValueChange={() => {}} />
          <span className="text-xs text-white/70">70%</span>
        </div>
      </div>
    </motion.div>
  )
}
