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
import { X } from 'lucide-react'
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
  const timeText = useMemo(() => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [seconds])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="end-session-ripple">
          End Session
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>End Session?</DialogTitle>
          <DialogClose className="p-1 hover:bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="mb-2">
          You can save your progress and review metrics later.
        </DialogDescription>
        <div className="mt-2 grid grid-cols-3 gap-3 text-center">
          <div className="glass rounded-xl p-3">
            <div className="text-[11px] text-white/60">Reps</div>
            <div className="text-lg font-bold">{repCount} / {totalReps}</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-[11px] text-white/60">Avg Quality</div>
            <div className="text-lg font-bold">{avgQuality}%</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-[11px] text-white/60">Duration</div>
            <div className="text-lg font-bold">{timeText}</div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              setCelebrate(true)
              setTimeout(() => {
                setOpen(false)
                setTimeout(() => setCelebrate(false), 1200)
              }, 200)
            }}
          >
            Save & End
          </Button>
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
