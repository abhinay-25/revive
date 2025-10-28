import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

function useTypewriter(text) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    if (!text) {
      setDisplay('')
      return
    }
    let i = 0
    setDisplay('')
    const id = setInterval(() => {
      i++
      setDisplay(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 18)
    return () => clearInterval(id)
  }, [text])
  return display
}

const sentimentFrom = (quality, feedback) => {
  if (typeof quality === 'number') {
    if (quality >= 88) return 'good'
    if (quality >= 75) return 'caution'
    return 'bad'
  }
  const f = (feedback || '').toLowerCase()
  if (f.includes('perfect') || f.includes('good')) return 'good'
  if (f.includes('watch') || f.includes('slow')) return 'caution'
  if (f.includes('incorrect') || f.includes('adjust')) return 'bad'
  return 'caution'
}

const gradientFor = (sentiment) => {
  switch (sentiment) {
    case 'good':
      return 'from-emerald-500/20 via-emerald-400/15 to-emerald-300/20'
    case 'bad':
      return 'from-rose-500/20 via-rose-400/15 to-rose-300/20'
    default:
      return 'from-purple-500/20 via-indigo-400/15 to-purple-300/20'
  }
}

const glowFor = (sentiment) => {
  switch (sentiment) {
    case 'good':
      return 'shadow-[0_0_24px_6px_rgba(16,185,129,0.25)]'
    case 'bad':
      return 'shadow-[0_0_24px_6px_rgba(244,63,94,0.25)]'
    default:
      return 'shadow-[0_0_24px_6px_rgba(168,85,247,0.25)]'
  }
}

export default function AIRealTimeFeedbackBar() {
  const analyzing = useAppStore((s) => s.analyzing)
  const aiFeedback = useAppStore((s) => s.aiFeedback)
  const aiStatus = useAppStore((s) => s.aiStatus)
  const repQuality = useAppStore((s) => s.repQuality)
  const sessionActive = useAppStore((s) => s.sessionActive)
  const setAiFeedback = useAppStore((s) => s.setAiFeedback)

  const current = aiFeedback || 'Analyzing your movement...'
  const sentiment = useMemo(() => sentimentFrom(repQuality, current), [repQuality, current])
  const typing = useTypewriter(current)

  // Dynamic AI feedback logic based on analysis
  useEffect(() => {
    if (!sessionActive) return

    // Simulate AI analysis updates
    if (analyzing) {
      setAiFeedback('Analyzing your movement...')
    } else if (repQuality !== null) {
      if (repQuality >= 90) {
        setAiFeedback('✅ Excellent form! Keep going!')
      } else if (repQuality >= 75) {
        setAiFeedback('💪 Great effort, maintain consistency!')
      } else if (repQuality >= 60) {
        setAiFeedback('⬇️ Try going lower into your squat.')
      } else {
        setAiFeedback('⚠️ Keep your back straight and focus on form.')
      }
    }
  }, [analyzing, repQuality, sessionActive, setAiFeedback])

  // Do not show if no session yet and no feedback
  if (!sessionActive && !current) return null

  return (
    <motion.div
      className="relative w-full max-w-5xl mx-auto"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={sentiment + (current ? current.slice(0, 8) : '')} className="relative">
          {/* Pulsing Glow Effect */}
          <motion.div
            className="absolute -inset-2 rounded-2xl blur-2xl pointer-events-none"
            style={{
              background: analyzing
                ? 'linear-gradient(90deg, #a855f7, #ec4899, #8b5cf6)'
                : sentiment === 'good'
                  ? 'linear-gradient(90deg, #10b981, #34d399, #059669)'
                  : sentiment === 'bad'
                    ? 'linear-gradient(90deg, #ef4444, #f87171, #dc2626)'
                    : 'linear-gradient(90deg, #a855f7, #8b5cf6, #7c3aed)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              opacity: analyzing ? [0.5, 0.8, 0.5] : [0.4, 0.6, 0.4],
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              scale: [1, 1.02, 1],
            }}
            transition={{
              opacity: { duration: analyzing ? 1.2 : 2, repeat: Infinity },
              backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity },
            }}
          />

          <motion.div
            className="relative rounded-2xl border backdrop-blur-xl shadow-2xl px-6 py-5 overflow-hidden"
            style={{
              background: analyzing
                ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(139, 92, 246, 0.3))'
                : sentiment === 'good'
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.25))'
                  : sentiment === 'bad'
                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(248, 113, 113, 0.25))'
                    : 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(139, 92, 246, 0.2))',
              borderColor: analyzing
                ? 'rgba(168, 85, 247, 0.5)'
                : sentiment === 'good'
                  ? 'rgba(16, 185, 129, 0.4)'
                  : sentiment === 'bad'
                    ? 'rgba(239, 68, 68, 0.4)'
                    : 'rgba(168, 85, 247, 0.3)',
              boxShadow: analyzing
                ? '0 0 30px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : sentiment === 'good'
                  ? '0 0 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : sentiment === 'bad'
                    ? '0 0 20px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            <div
              className="flex items-center gap-4 justify-center text-center relative z-10"
              role="region"
              aria-describedby="ai-feedback"
            >
              <motion.div
                className={`w-2.5 h-2.5 rounded-full ${sentiment === 'good' ? 'bg-emerald-400' : sentiment === 'bad' ? 'bg-rose-400' : 'bg-purple-400'}`}
                animate={{ scale: analyzing ? [1, 1.35, 1] : [1, 1.15, 1] }}
                transition={{ duration: analyzing ? 0.9 : 1.6, repeat: Infinity }}
              />
              {sentiment === 'good' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : sentiment === 'bad' ? (
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              ) : (
                <Bot className="w-5 h-5 text-purple-400" />
              )}
              <div className="flex-1 min-w-0">
                <div
                  id="ai-feedback"
                  aria-live="polite"
                  aria-atomic="true"
                  role="status"
                  className="text-white/90 text-lg md:text-xl font-medium tracking-wide drop-shadow-sm min-h-[1.4em]"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={current}
                      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      {typing}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
