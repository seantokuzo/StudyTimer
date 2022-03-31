import React from 'react'

export default function Audio() {
  return (
    <div>
      <audio
        id="beep"
        preload="auto"
        ref={(audio) => {
          this.audioBeep = audio
        }}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  )
}
