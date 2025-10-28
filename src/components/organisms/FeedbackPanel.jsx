import React from 'react'
import FeedbackBubble from '../molecules/FeedbackBubble'
import EndSessionModal from './EndSessionModal'

export default function FeedbackPanel() {
  return (
    <div className="flex flex-col gap-4">
      <FeedbackBubble />
      <div className="flex justify-end">
        <EndSessionModal />
      </div>
    </div>
  )
}
