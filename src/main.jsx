import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import MainTrackingPage from './pages/MainTrackingPage'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
  <MainTrackingPage />
  </React.StrictMode>
)
