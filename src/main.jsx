import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './styles/mainTracking.css'
import MainTrackingPage from './pages/MainTrackingPage'
import { AnimatePresence, motion } from 'framer-motion'

function IntroScreen({ onDone }) {
  useEffect(() => {
    const id = setTimeout(onDone, 1200)
    return () => clearTimeout(id)
  }, [onDone])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center">
        <div className="h1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
          Session Ready
        </div>
        <div className="text-white/70">Preparing your personalized coach…</div>
      </div>
    </motion.div>
  )
}

function App() {
  const [ready, setReady] = useState(false)
  return (
    <AnimatePresence mode="wait">
      {ready ? (
        <MainTrackingPage key="main" />
      ) : (
        <IntroScreen key="intro" onDone={() => setReady(true)} />
      )}
    </AnimatePresence>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
