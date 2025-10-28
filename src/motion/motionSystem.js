import { cubicBezier } from 'framer-motion'

export const timings = {
  fast: 0.15,
  medium: 0.3,
  long: 0.8,
  page: 2.0,
}

export const easings = {
  easeOutQuart: cubicBezier(0.25, 1, 0.5, 1),
  easeInOutCubic: cubicBezier(0.65, 0, 0.35, 1),
  easeInOutBack: cubicBezier(0.68, -0.6, 0.32, 1.6),
  easeOutQuad: cubicBezier(0.25, 0.46, 0.45, 0.94),
}

export const variants = {
  page: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: timings.page, ease: easings.easeOutQuad },
    },
  },
  containerStagger: {
    hidden: { opacity: 1 },
    show: (stagger = 0.1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: 0.1 },
    }),
  },
  itemUp: {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: timings.medium, ease: easings.easeOutQuart },
    },
  },
  itemScaleIn: {
    hidden: { opacity: 0, scale: 0.98 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 160, damping: 18 },
    },
  },
  counterPop: {
    hidden: { scale: 1 },
    show: {
      scale: [1, 1.25, 1],
      transition: { duration: 0.3, type: 'spring', stiffness: 120, damping: 15 },
    },
  },
  modal: {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: easings.easeOutQuart },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.25, ease: 'easeIn' },
    },
  },
  fadeUpSmall: {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: timings.medium } },
  },
}
