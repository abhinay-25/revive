import React from 'react'
import { Settings, HelpCircle, UserCircle2 } from 'lucide-react'
import StatusIndicator from '../atoms/StatusIndicator'
import ThemeToggle from '../atoms/ThemeToggle'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/0 dark:bg-black/0 border-b border-white/10">
      <div className="container py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            PhysioTrack AI
          </div>
          <div className="hidden md:block text-white/80">• Current: <span className="text-white">Squats</span></div>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <ThemeToggle />
          <StatusIndicator status="active" />
          <button className="glass rounded-lg p-2 hover:bg-white/10 transition" aria-label="Help">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="glass rounded-lg p-2 hover:bg-white/10 transition" aria-label="Settings">
            <Settings className="w-5 h-5" />
          </button>
          <div className="ml-2 glass rounded-full p-1">
            <UserCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>
    </nav>
  )
}
