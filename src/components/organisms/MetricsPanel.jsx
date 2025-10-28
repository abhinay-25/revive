import React, { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StatusIndicator from '../atoms/StatusIndicator'
import { Slider } from '@/components/ui/slider'
import { useAppStore } from '../../store/useAppStore'
import { useSoundFeedback } from '../../hooks/useSoundFeedback'
import QualityRing from '@/components/molecules/QualityRing'
import ParticleBurst from '@/components/molecules/ParticleBurst'

export default function MetricsPanel() {
  const repCount = useAppStore((s) => s.repCount)
  const repQuality = useAppStore((s) => s.repQuality)
  const seconds = useAppStore((s) => s.secondsElapsed)
  const aiStatus = useAppStore((s) => s.aiStatus)
  const currentSet = useAppStore((s) => s.currentSet)
  const totalSets = useAppStore((s) => s.totalSets)
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
  const isPerfect = quality >= 90

  return (
    <motion.div
      layout
      className="rounded-2xl p-6 relative overflow-hidden transition-all duration-500"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        background: 'rgba(138, 43, 226, 0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        boxShadow: isPerfect
          ? '0 0 40px rgba(16,185,129,0.4), 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 8px 32px rgba(138, 43, 226, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #a855f7, #ec4899, #f59e0b)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Green Glow Animation for Perfect Quality */}
      {isPerfect && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-green-500/30 to-emerald-500/20 blur-xl pointer-events-none"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Analyzing pulse border */}
      {/* Analyzing pulse border */}
      {aiStatus?.toLowerCase?.().includes('analyz') && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
          style={{ borderColor: 'rgba(168, 85, 247, 0.5)' }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Main Stats Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-6 mb-6">
        {/* Reps Counter */}
        <div>
          <div className="text-xs text-white/70 uppercase tracking-wider mb-2 font-semibold">
            Reps
          </div>
          <div
            className="relative inline-block text-5xl font-bold"
            style={{
              background:
                quality >= 90
                  ? 'linear-gradient(135deg, #10B981, #34D399)'
                  : 'linear-gradient(135deg, #FACC15, #F59E0B)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 8px rgba(250, 204, 21, 0.5))',
            }}
          >
            {' '}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={repCount}
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: 1,
                  color: (repQuality ?? 0) >= 90 ? '#10B981' : '#60A5FA',
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 120, damping: 15 }}
                className="font-numeric"
              >
                {String(repCount).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence>
              {repCount > 0 && (
                <motion.span
                  key={`plus-${repCount}`}
                  className="absolute -right-6 top-1 text-emerald-300 text-base font-semibold"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: -6 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  +1
                </motion.span>
              )}
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
                    boxShadow:
                      '0 0 0 4px rgba(16,185,129,0.3), 0 0 30px rgba(16,185,129,0.35) inset',
                  }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {repCount > 0 && repCount % 10 === 0 && (
                <ParticleBurst key={`burst-${repCount}`} triggerKey={repCount} />
              )}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <div className="text-xs text-white/70 uppercase tracking-wider mb-1">Sets</div>
          <div
            className="text-5xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 8px rgba(139, 92, 246, 0.5))',
            }}
          >
            {useAppStore((s) => s.currentSet)} / {useAppStore((s) => s.totalSets)}
          </div>
        </div>
        <div>
          <div className="text-xs text-white/70 uppercase tracking-wider mb-1">Timer</div>
          <div
            className="text-4xl font-bold font-numeric overflow-hidden h-[1.2em]"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.5))',
            }}
          >
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
          <StatusIndicator
            status={
              aiStatus?.toLowerCase?.().includes('analyz')
                ? 'analyzing'
                : aiStatus?.toLowerCase?.().includes('paused')
                  ? 'paused'
                  : 'active'
            }
          />
        </div>
      </div>

      {/* Quality Progress Section */}
      <motion.div
        className="mt-6 p-4 rounded-xl relative overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-white/70 uppercase tracking-wider mb-1">Rep Quality</div>
            <motion.div
              className="text-2xl font-bold"
              style={{
                background:
                  quality >= 90
                    ? 'linear-gradient(135deg, #10B981, #34D399)'
                    : quality >= 75
                      ? 'linear-gradient(135deg, #F59E0B, #FBBF24)'
                      : 'linear-gradient(135deg, #EF4444, #F87171)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {quality}%
            </motion.div>
          </div>
          <QualityRing value={quality} />
        </div>

        {/* Animated progress bar */}
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background:
                quality >= 90
                  ? 'linear-gradient(90deg, #10B981, #34D399)'
                  : quality >= 75
                    ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                    : 'linear-gradient(90deg, #EF4444, #F87171)',
              boxShadow:
                quality >= 90
                  ? '0 0 10px rgba(16, 185, 129, 0.5)'
                  : quality >= 75
                    ? '0 0 10px rgba(245, 158, 11, 0.5)'
                    : '0 0 10px rgba(239, 68, 68, 0.5)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${quality}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Sensitivity Slider */}
      <div className="mt-6">
        <label
          htmlFor="sensitivity"
          className="text-xs text-white/70 uppercase tracking-wider mb-2 block"
        >
          Sensitivity
        </label>
        <div className="flex items-center gap-3">
          <Slider
            value={[70]}
            min={0}
            max={100}
            step={1}
            onValueChange={() => {}}
            className="flex-1"
          />
          <span className="text-sm font-semibold text-white/90 min-w-[3rem] text-right">70%</span>
        </div>
      </div>
    </motion.div>
  )
}
