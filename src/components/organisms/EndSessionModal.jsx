import React from 'react'
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

export default function EndSessionModal() {
  const [open, setOpen] = React.useState(false)
  const [celebrate, setCelebrate] = React.useState(false)
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
