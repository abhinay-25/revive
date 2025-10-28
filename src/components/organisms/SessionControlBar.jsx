import React, { useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, StopCircle } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import { useSoundFeedback } from '@/hooks/useSoundFeedback'

function MiniTimerRing({ seconds }) {
  const pct = ((seconds % 60) / 60) * 100
  const SIZE = 36
  const STROKE = 4
  const R = (SIZE - STROKE) / 2
  const C = 2 * Math.PI * R
  const offset = C * (1 - pct / 100)
  return (
    <svg width={SIZE} height={SIZE} className="mr-2">
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={STROKE}
        fill="none"
      />
      <motion.circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        stroke="#60A5FA"
        strokeWidth={STROKE}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, strokeDasharray: C, strokeDashoffset: C }}
        animate={{ pathLength: pct / 100, strokeDashoffset: offset }}
        transition={{ duration: 0.6, ease: [0.37, 0, 0.63, 1] }}
        style={{ rotate: -90, originX: '50%', originY: '50%' }}
      />
    </svg>
  )
}

function TimeText({ seconds }) {
  const timeText = useMemo(() => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [seconds])
  return (
    <div className="text-2xl md:text-3xl font-numeric text-white tracking-tight">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={timeText}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'inline-block' }}
        >
          {timeText}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function SessionControlBar() {
  const seconds = useAppStore((s) => s.secondsElapsed)
  const sessionActive = useAppStore((s) => s.sessionActive)
  const setSessionActive = useAppStore((s) => s.setSessionActive)
  const setSecondsElapsed = useAppStore((s) => s.setSecondsElapsed)
  const setAiStatus = useAppStore((s) => s.setAiStatus)
  const setEndModalOpen = useAppStore((s) => s.setEndModalOpen)
  const setRepCount = useAppStore((s) => s.setRepCount)
  const setCurrentSet = useAppStore((s) => s.setCurrentSet)
  const resetRepHistory = useAppStore((s) => s.resetRepHistory)
  const setAiFeedback = useAppStore((s) => s.setAiFeedback)
  const setReplayEnabled = useAppStore((s) => s.setReplayEnabled)
  const { click, success, warn } = useSoundFeedback()

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (sessionActive) handlePause()
        else handleResume()
      } else if (e.key && e.key.toLowerCase() === 'e') {
        e.preventDefault()
        handleEnd()
      } else if (e.key && e.key.toLowerCase() === 'r') {
        e.preventDefault()
        setReplayEnabled((v) => !v)
      } else if (e.code === 'Escape') {
        handleEnd()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionActive])

  const handleStart = () => {
    setSecondsElapsed(0)
    setRepCount(0)
    setCurrentSet(1)
    resetRepHistory()
    setAiFeedback('')
    setSessionActive(true)
    setAiStatus('Tracking Active')
    success()
  }
  const handlePause = () => {
    setSessionActive(false)
    setAiStatus('Paused / Lost Frame')
    warn()
  }
  const handleResume = () => {
    setSessionActive(true)
    setAiStatus('Tracking Active')
    success()
  }
  const handleEnd = () => {
    setEndModalOpen(true)
  }

  return (
    <motion.div
      className="fixed left-1/2 -translate-x-1/2 bottom-16 md:bottom-12 w-[90%] md:w-4/5 max-w-5xl z-30"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="relative">
        {/* Glowing Border Animation - Blue when active */}
        <motion.div
          className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none"
          style={{
            background: sessionActive
              ? 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)'
              : 'linear-gradient(90deg, #64748b, #475569, #334155)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            opacity: sessionActive ? [0.4, 0.7, 0.4] : [0.2, 0.3, 0.2],
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
          }}
        />

        <div
          className={`relative rounded-2xl border backdrop-blur-xl shadow-2xl px-4 py-3 flex items-center justify-between transition-all duration-500 overflow-hidden ${
            sessionActive
              ? 'border-cyan-400/40 bg-gradient-to-r from-[#141E30]/80 to-[#243B55]/80 shadow-[0_0_30px_rgba(34,211,238,0.3)]'
              : 'border-white/20 bg-gradient-to-r from-slate-800/70 to-slate-900/70'
          }`}
        >
          {/* Blur Gradient Trail Behind Timer */}
          {sessionActive && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 30% 50%, rgba(6,182,212,0.2), transparent 60%)',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}

          <div className="relative z-10 flex items-center">
            <MiniTimerRing seconds={seconds} />
            <TimeText seconds={seconds} />
          </div>
          <div className="relative z-10 flex items-center gap-2">
            {!sessionActive && seconds === 0 && (
              <Button
                variant="ghost"
                aria-label="Start session"
                onClick={handleStart}
                className="hover:shadow-glow focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                onMouseDown={click}
              >
                <Play className="w-5 h-5" />
              </Button>
            )}
            {sessionActive ? (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="secondary"
                  aria-label="Pause session"
                  onClick={handlePause}
                  className="hover:shadow-glow focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                >
                  <Pause className="w-5 h-5 text-yellow-300" />
                </Button>
              </motion.div>
            ) : (
              seconds > 0 && (
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(0,0,0,0)',
                      '0 0 24px 6px rgba(16,185,129,0.35)',
                      '0 0 0 0 rgba(0,0,0,0)',
                    ],
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <Button
                    variant="secondary"
                    aria-label="Resume session"
                    onClick={handleResume}
                    className="hover:shadow-glow focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                  >
                    <RotateCcw className="w-5 h-5 text-emerald-300" />
                  </Button>
                </motion.div>
              )
            )}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                aria-label="End session — opens summary modal"
                onClick={handleEnd}
                className="hover:shadow-glow text-red-300 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
              >
                <StopCircle className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
