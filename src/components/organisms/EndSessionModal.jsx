import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import Button from '../atoms/Button'

export default function EndSessionModal() {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="secondary">End Session</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-6 w-[90vw] max-w-md">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="h2">End Session?</Dialog.Title>
            <Dialog.Close className="p-1 hover:bg-white/10 rounded-lg">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>
          <p className="ds-p mb-4">You can save your progress and review metrics later.</p>
          <div className="flex gap-3 justify-end">
            <Dialog.Close asChild>
              <Button variant="ghost">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button>Save & End</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
