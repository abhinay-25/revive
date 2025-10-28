import React, { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

export default function BottomBar() {
  const repCount = useAppStore((s) => s.repCount)
  const repQuality = useAppStore((s) => s.repQuality)
  const seconds = useAppStore((s) => s.secondsElapsed)
  const timeText = useMemo(() => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [seconds])
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 backdrop-blur bg-black/30 border-t border-white/10">
      <div className="container py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          <div>
            <div className="text-white/60">Reps</div>
            <div className="text-white font-bold">{String(repCount).padStart(2, '0')}</div>
          </div>
          <div>
            <div className="text-white/60">Quality</div>
            <div className="text-white font-bold">{repQuality}%</div>
          </div>
          <div>
            <div className="text-white/60">Timer</div>
            <div className="text-white font-bold">{timeText}</div>
          </div>
        </div>
        <motion.div whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 160, damping: 18 }}>
          <Button className="rounded-full h-10 px-5 end-session-ripple">End Session</Button>
        </motion.div>
      </div>
    </div>
  )
}
