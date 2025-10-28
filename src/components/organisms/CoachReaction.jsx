import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Lottie from '@/components/molecules/LottieLazy'
import confetti from '@/animations/confettiBurst.json'
import coachReact from '@/animations/coachReact.json'
import aiWave from '@/animations/aiWave.json'
import { useAppStore } from '@/store/useAppStore'
import { useSoundFeedback } from '@/hooks/useSoundFeedback'

const pickAnimation = (mode) => {
  switch (mode) {
    case 'end':
      return { data: confetti, size: 160 }
    case 'great':
    case 'good':
      return { data: coachReact, size: 120 }
    case 'caution':
    case 'warn':
    default:
      return { data: aiWave, size: 120 }
  }
}

export default function CoachReaction() {
  const history = useAppStore((s) => s.repHistory)
  const sessionActive = useAppStore((s) => s.sessionActive)
  const coachEnabled = useAppStore((s) => s.coachEnabled)

  const last = history.length ? history[history.length - 1] : null
  const lastId = last?.id ?? 0

  const mode = useMemo(() => {
    if (!sessionActive && history.length) return 'end'
    if (!last) return null
    const q = last.quality
    if (q >= 90) return 'great'
    if (q >= 75) return 'good'
    if (q >= 55) return 'caution'
    return 'warn'
  }, [sessionActive, history.length, last])

  const { success, warn } = useSoundFeedback()
  useEffect(() => {
    if (!coachEnabled) return
    if (!mode) return
    if (mode === 'great' || mode === 'good') success()
    else if (mode === 'caution' || mode === 'warn') warn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastId, mode, coachEnabled])

  if (!coachEnabled || !mode) return null

  const { data, size } = pickAnimation(mode)
  const ringColor =
    mode === 'great'
      ? 'from-emerald-400 via-green-400 to-emerald-300'
      : mode === 'good'
        ? 'from-sky-400 via-indigo-400 to-cyan-400'
        : mode === 'caution'
          ? 'from-amber-400 via-yellow-400 to-amber-300'
          : 'from-rose-400 via-red-400 to-rose-300'

  const message =
    mode === 'great'
      ? 'Nice rep! 🔥'
      : mode === 'good'
        ? 'Great form! 💪'
        : mode === 'caution'
          ? 'Try slowing down.'
          : mode === 'warn'
            ? 'Adjust your posture.'
            : 'Great work!'

  return (
    <motion.div
      key={`${mode}-${lastId}-${sessionActive ? 'on' : 'off'}`}
      className="fixed right-4 md:right-6 bottom-36 md:bottom-28 z-40 pointer-events-auto"
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, 12], scale: [0.95, 1, 1, 0.98] }}
      transition={{ duration: 2.8, times: [0, 0.15, 0.85, 1] }}
    >
      <div className="relative">
        <div
          className={`absolute -inset-1 rounded-full bg-gradient-to-r ${ringColor} opacity-60 blur-md`}
        />
        <div className="relative rounded-full backdrop-blur-md bg-white/10 border border-white/15 shadow-[0_0_15px_rgba(0,255,255,0.25)] p-2">
          <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] flex items-center justify-center">
            <div className="rounded-full overflow-hidden">
              <Lottie
                animationData={data}
                loop={mode !== 'end'}
                autoplay
                style={{ width: size, height: size }}
              />
            </div>
          </div>
        </div>
        <motion.div
          className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full text-xs bg-white/10 border border-white/15 backdrop-blur-md text-white/90"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, 0] }}
          transition={{ duration: 2.4, times: [0, 0.2, 0.8, 1] }}
        >
          {last?.feedback ? last.feedback : message}
        </motion.div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/60 opacity-70">
          AI Coach
        </div>
      </div>
    </motion.div>
  )
}
