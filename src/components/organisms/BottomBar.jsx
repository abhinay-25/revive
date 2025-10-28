import React from 'react'
import { Button } from '@/components/ui/button'

export default function BottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 backdrop-blur bg-black/30 border-t border-white/10">
      <div className="container py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          <div>
            <div className="text-white/60">Reps</div>
            <div className="text-white font-bold">08</div>
          </div>
          <div>
            <div className="text-white/60">Quality</div>
            <div className="text-white font-bold">96%</div>
          </div>
          <div>
            <div className="text-white/60">Timer</div>
            <div className="text-white font-bold">02:35</div>
          </div>
        </div>
        <Button className="rounded-full h-10 px-5 end-session-ripple">End Session</Button>
      </div>
    </div>
  )
}
