import React from 'react'
import { Play, Square } from 'lucide-react'

export default function SessionFooter() {
  return (
    <div className="flex items-center justify-between gap-3">
      <button className="glass rounded-lg px-4 py-2 hover:bg-white/10 transition"> <Play className="w-4 h-4 inline mr-2"/> Start</button>
      <button className="glass rounded-lg px-4 py-2 hover:bg-white/10 transition"> <Square className="w-4 h-4 inline mr-2"/> Stop</button>
    </div>
  )
}
