import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'text-white gradient-brand shadow-ai hover:brightness-110',
        secondary: 'text-white glass hover:bg-white/10',
        ghost: 'text-white/80 hover:text-white hover:bg-white/5',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export default function Button({ className, variant, size, asChild, ...props }) {
  const Comp = asChild ? 'span' : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
