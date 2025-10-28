import React, { useMemo } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import Lottie from '@/components/molecules/LottieLazy'
import confetti from '@/animations/confettiBurst.json'
import { useAppStore } from '@/store/useAppStore'

export default function EndSessionModal() {
  const [open, setOpen] = React.useState(false)
  const [celebrate, setCelebrate] = React.useState(false)
  const repCount = useAppStore((s) => s.repCount)
  const totalReps = useAppStore((s) => s.totalReps)
  const seconds = useAppStore((s) => s.secondsElapsed)
  const avgQuality = useAppStore((s) => s.repQuality)
  const currentSet = useAppStore((s) => s.currentSet)
  const totalSets = useAppStore((s) => s.totalSets)
  const timeText = useMemo(() => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [seconds])
  const calories = useMemo(() => Math.round(((currentSet - 1) * totalReps + repCount) * 0.8), [currentSet, totalReps, repCount])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="end-session-ripple">
          End Session
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <motion.span initial={{ rotate: 0 }} animate={{ rotate: 720 }} transition={{ duration: 0.8 }}>
              <Trophy className="w-6 h-6 text-yellow-300" />
            </motion.span>
            End Session?
          </DialogTitle>
          <DialogClose className="p-1 hover:bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="mb-2">
          Great job, Abhinay! You crushed it today 💪🔥
        </DialogDescription>
        <motion.div className="mt-2 grid grid-cols-3 gap-3 text-center"
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          {[{label:'Reps', value:`${repCount} / ${totalReps}`}, {label:'Avg Quality', value:`${avgQuality}%`}, {label:'Duration', value: timeText}, {label:'Calories', value: `${calories}`}].map((m) => (
            <motion.div key={m.label} variants={{ hidden:{ opacity:0, y:6 }, show:{ opacity:1, y:0 } }} className="glass rounded-xl p-3">
              <div className="text-[11px] text-white/60">{m.label}</div>
              <div className="text-lg font-bold">{m.value}</div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-3 text-xs text-white/70">
          Tip: Focus on smooth, controlled tempo and keep your elbow slightly higher on the lift.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <motion.button
            className="end-session-ripple inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 border border-white/10"
            onClick={() => {
              setCelebrate(true)
              setTimeout(() => {
                setOpen(false)
                setTimeout(() => setCelebrate(false), 1200)
              }, 200)
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          >
            Save & End
          </motion.button>
          <Button variant="secondary" className="gradient-sweep">Replay Session</Button>
          <Button variant="secondary" className="gradient-sweep">Save Report</Button>
          <Button variant="secondary" className="gradient-sweep">Share Achievement</Button>
        </DialogFooter>
      </DialogContent>
      {celebrate && (
        <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
          <div className="w-48 h-48">
            <Lottie animationData={confetti} loop={false} autoplay />
          </div>
        </div>
      )}
    </Dialog>
  )
}
