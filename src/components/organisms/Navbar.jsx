import React, { useEffect, useState } from 'react'
import { Settings, HelpCircle, UserCircle2, Clapperboard } from 'lucide-react'
import StatusIndicator from '../atoms/StatusIndicator'
import ThemeToggle from '../atoms/ThemeToggle'
import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const demoMode = useAppStore((s) => s.demoMode)
  const demoSpeed = useAppStore((s) => s.demoSpeed)
  const { setDemoMode, setDemoSpeed } = useAppStore.getState()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      layout
      className={`sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 dark:bg-black/0 border-b border-black/10 dark:border-white/10`}
      animate={{ backdropFilter: scrolled ? 'blur(12px)' : 'blur(8px)' }}
      transition={{ type: 'tween', duration: 0.25 }}
    >
      <div
        className={`container ${scrolled ? 'py-2' : 'py-3'} transition-[padding] duration-300 flex items-center justify-between`}
      >
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
            PhysioTrack AI
          </div>
          <div className="hidden md:block text-slate-700 dark:text-white/80">
            • Current: <span className="text-slate-900 dark:text-white">Squats</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-900 dark:text-white/90">
          <ThemeToggle />
          <StatusIndicator status="active" />
          <button
            className={`glass rounded-lg px-2 py-2 hover:bg-black/5 dark:hover:bg-white/10 transition flex items-center gap-2 ${demoMode ? 'ring-1 ring-purple-400/60 dark:bg-purple-500/10' : ''}`}
            aria-pressed={demoMode}
            aria-label="Toggle Demo Mode"
            onClick={() => setDemoMode(!demoMode)}
            title={demoMode ? 'Disable Demo Mode' : 'Enable Demo Mode'}
          >
            <Clapperboard className="w-5 h-5" />
            <span className="hidden md:inline text-sm">Demo</span>
          </button>
          {demoMode && (
            <div className="hidden md:flex items-center gap-1 ml-1" aria-label="Demo Speed">
              {[1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  className={`rounded-md px-2 py-1 text-xs border transition ${demoSpeed === s ? 'bg-white/15 border-white/30 text-white' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}`}
                  aria-pressed={demoSpeed === s}
                  onClick={() => setDemoSpeed(s)}
                  title={`${s}x`}
                >
                  {s}x
                </button>
              ))}
            </div>
          )}
          <button className="glass rounded-lg p-2 hover:bg-white/10 transition" aria-label="Help">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            className="glass rounded-lg p-2 hover:bg-white/10 transition"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <div className="ml-2 glass rounded-full p-1">
            <UserCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
