import React, { useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import BackgroundParticles from '@/components/atoms/BackgroundParticles'
import { useAppStore } from '@/store/useAppStore'

// BackgroundLayer: multi-layer parallax + glassmorphism aesthetic
// - Layer 1: Deep navy gradient base + slow fog
// - Layer 2: Ambient particles (existing component)
// - Layer 3: Frosted glass panels with parallax
// - Dynamic reflections and heartbeat pulse on session state changes
export default function BackgroundLayer() {
  const sessionActive = useAppStore((s) => s.sessionActive)

  // Mouse-based parallax (desktop only)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer:fine)').matches
    if (!isFinePointer) return // disable deep parallax on mobile
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window
      const nx = (e.clientX / w) * 2 - 1 // [-1, 1]
      const ny = (e.clientY / h) * 2 - 1
      mx.set(nx)
      my.set(ny)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  // Depth transforms: slower for further layers
  const fogX = useSpring(
    useTransform(mx, (v) => v * 18),
    { stiffness: 60, damping: 20 }
  )
  const fogY = useSpring(
    useTransform(my, (v) => v * 18),
    { stiffness: 60, damping: 20 }
  )
  const glassBackX = useSpring(
    useTransform(mx, (v) => v * -12),
    { stiffness: 60, damping: 20 }
  )
  const glassBackY = useSpring(
    useTransform(my, (v) => v * -10),
    { stiffness: 60, damping: 20 }
  )
  const glowX = useSpring(
    useTransform(mx, (v) => v * -30),
    { stiffness: 60, damping: 20 }
  )
  const glowY = useSpring(
    useTransform(my, (v) => v * -24),
    { stiffness: 60, damping: 20 }
  )

  // Heartbeat pulse when session toggles
  const pulseKey = sessionActive ? 'on' : 'off'

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden>
      {/* Layer 0: Base gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_10%,#0A0F1F_0%,#0B1120_35%,#111827_60%,#1B2735_100%)]" />

      {/* Layer 1: Moving fog / gradient veil with parallax */}
      <motion.div className="absolute -inset-1 opacity-70" style={{ x: fogX, y: fogY }}>
        <div className="absolute -left-32 -top-24 w-[60vw] h-[60vw] rounded-full blur-3xl bg-gradient-to-br from-cyan-500/10 via-sky-400/10 to-indigo-500/10" />
        <div className="absolute -right-40 top-1/3 w-[55vw] h-[55vw] rounded-full blur-3xl bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-cyan-400/10" />
      </motion.div>

      {/* Layer 2: Ambient particles (low opacity) */}
      <div className="absolute inset-0 opacity-60">
        <BackgroundParticles />
      </div>

      {/* Layer 3: Frosted glass slabs far behind content (parallax opposite for depth) */}
      <motion.div className="absolute inset-0" style={{ x: glassBackX, y: glassBackY }}>
        <div className="absolute left-[10%] top-[18%] w-[28vw] h-[18vw] rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
        <div className="absolute right-[8%] top-[36%] w-[22vw] h-[14vw] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]" />
        <div className="absolute left-[22%] bottom-[16%] w-[26vw] h-[16vw] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
      </motion.div>

      {/* Dynamic reflection highlight following cursor (opposite parallax) */}
      <motion.div className="absolute -inset-1" style={{ x: glowX, y: glowY }}>
        <div className="absolute left-1/3 top-1/4 w-[28vw] h-[28vw] rounded-full blur-[60px] bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.16),rgba(0,255,255,0)_60%)]" />
      </motion.div>

      {/* Heartbeat pulse overlay on session start/end */}
      <motion.div
        key={pulseKey}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 1.2, times: [0, 0.4, 1] }}
        style={{
          background:
            'radial-gradient(600px 600px at 50% 50%, rgba(0,255,255,0.10), rgba(0,255,255,0) 60%)',
        }}
      />
    </div>
  )
}
