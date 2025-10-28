import React from 'react'
import { Settings, HelpCircle } from 'lucide-react'
import StatusIndicator from '../atoms/StatusIndicator'

export default function Navbar() {
  return (
    <nav className="container py-5 flex items-center justify-between">
      <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
        PhysioTrack AI
      </div>
      <div className="flex items-center gap-3 text-white/90">
        <StatusIndicator status="active" />
        <button className="glass rounded-lg p-2 hover:bg-white/10 transition" aria-label="Help">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="glass rounded-lg p-2 hover:bg-white/10 transition" aria-label="Settings">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </nav>
  )
}
