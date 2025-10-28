import React from 'react'
import { motion } from 'framer-motion'
import { variants } from '@/motion/motionSystem'
import Navbar from '../organisms/Navbar'
import Sidebar from '../organisms/Sidebar'
import CoachAvatar from '../organisms/CoachAvatar'
import BackgroundParticles from '../atoms/BackgroundParticles'

export default function MainTrackingLayout({ left, right, footer }) {
  return (
    <motion.div
      className="min-h-screen w-full text-white"
      variants={variants.page}
      initial="hidden"
      animate="show"
    >
      <BackgroundParticles />
      <Navbar />
      <Sidebar />
      <motion.main
        className="container grid grid-cols-12 gap-6"
        layout
        variants={variants.containerStagger}
        custom={0.1}
        initial="hidden"
        animate="show"
      >
        <motion.section className="col-span-12 lg:col-span-8 flex flex-col gap-6" variants={variants.itemUp}>
          {left}
        </motion.section>
        <motion.aside className="col-span-12 lg:col-span-4 flex flex-col gap-6" variants={variants.itemUp}>
          {right}
        </motion.aside>
      </motion.main>
      {footer}
      <CoachAvatar />
    </motion.div>
  )
}
