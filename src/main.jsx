import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './styles/mainTracking.css'
import MainTrackingPage from './pages/MainTrackingPage'
import { AnimatePresence, motion } from 'framer-motion'

function IntroOverlay() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const id = setTimeout(() => setVisible(false), 1200)
    // failsafe in case of HMR/StrictMode oddities
    const fail = setTimeout(() => setVisible(false), 5000)
    return () => {
      clearTimeout(id)
      clearTimeout(fail)
    }
  }, [])
  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('App crash:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center text-white">
          <div className="glass rounded-xl p-6 max-w-lg text-center">
            <div className="h2 mb-2">Something went wrong</div>
            <div className="text-white/70 text-sm">
              Check the dev console for details. Try refreshing the page.
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <MainTrackingPage />
    </ErrorBoundary>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
