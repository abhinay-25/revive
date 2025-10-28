import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../organisms/Navbar'
import Sidebar from '../organisms/Sidebar'

export default function MainTrackingLayout({ left, right, footer }) {
  return (
    <div className="min-h-screen w-full text-white">
      <Navbar />
      <Sidebar />
      <motion.main
        className="container grid grid-cols-12 gap-6"
        layout
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <section className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          {left}
        </section>
        <aside className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          {right}
        </aside>
      </motion.main>
      {footer}
    </div>
  )
}
