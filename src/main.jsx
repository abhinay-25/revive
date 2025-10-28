import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TrackingPage from './pages/TrackingPage'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <TrackingPage />
  </React.StrictMode>
)
