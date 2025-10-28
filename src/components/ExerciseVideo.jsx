import React from 'react'

export default function ExerciseVideo() {
  return (
    <div className="glass rounded-xl w-full aspect-video overflow-hidden">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/8BcPHWGQO44?si=demo&rel=0"
        title="Shoulder Rotation Reference"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
