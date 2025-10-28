import React from 'react'
import { ListVideo, BarChart3, Settings } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col gap-3 fixed left-4 top-24 w-14">
      <button className="glass rounded-xl p-3 hover:bg-white/10" aria-label="Exercises"><ListVideo className="w-5 h-5"/></button>
      <button className="glass rounded-xl p-3 hover:bg-white/10" aria-label="Metrics"><BarChart3 className="w-5 h-5"/></button>
      <button className="glass rounded-xl p-3 hover:bg-white/10" aria-label="Settings"><Settings className="w-5 h-5"/></button>
    </aside>
  )
}
