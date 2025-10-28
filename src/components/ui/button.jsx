import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-ai hover:brightness-110',
        secondary: 'bg-white/10 text-white hover:bg-white/15 border border-white/10',
        ghost: 'text-white hover:bg-white/10',
        outline: 'border border-white/20 bg-transparent text-white hover:bg-white/10',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? motion.span : motion.button
    const [ripples, setRipples] = React.useState([])

    function handleClick(e) {
      try {
        const target = e.currentTarget
        const rect = target.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const id = Date.now() + Math.random()
        setRipples((r) => [...r, { id, x, y }])
        setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 600)
      } catch {}
      onClick?.(e)
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          'relative overflow-hidden will-change-transform ripple-container',
          'transition-all duration-300 ease-in-out',
          className
        )}
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((r) => (
          <span key={r.id} className="btn-ripple" style={{ left: r.x, top: r.y }} />
        ))}
        {props.children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
