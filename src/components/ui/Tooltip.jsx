import React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export default function Tooltip({ content, children }) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className="glass rounded-lg px-3 py-2 text-xs" sideOffset={6}>
            {content}
            <TooltipPrimitive.Arrow className="fill-white/10" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
