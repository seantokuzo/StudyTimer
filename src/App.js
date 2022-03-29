import React, { useState, useEffect } from 'react'

function App() {
  const [breakLength, setBreakLength] = useState('')
  const [studyLength, setStudyLength] = useState('')

  useEffect(() => {
    setBreakLength(5)
    setStudyLength(25)
  }, [])

  const setBreakTimer = (
    <div className="set-timer-div">
      <h4 className='length-label' id="break-label">Break Length</h4>
      <div className="set-timer-controls-div">
        <i id="break-increment" className="fa-solid fa-angle-up control"></i>
        <h3 id="break-length" className="timer-value">
          {breakLength}
        </h3>
        <i id="break-decrement" className="fa-solid fa-angle-down control"></i>
      </div>
    </div>
  )

  const setStudyTimerHtml = (
    <div className="set-timer-div">
      <h4 className='length-label' id="session-label">Study Length</h4>
      <div className="set-timer-controls-div">
        <i id="session-increment" className="fa-solid fa-angle-up control"></i>
        <h3 id="session-length" className="timer-value">
          {studyLength}
        </h3>
        <i
          id="session-decrement"
          className="fa-solid fa-angle-down control"
        ></i>
      </div>
    </div>
  )

  const setTimers = (
    <div className="set-timers-div">
      {setBreakTimer}
      {setStudyTimerHtml}
    </div>
  )

  return (
    <div className="app-container">
      <h1 className="title">Study Session Timer</h1>
      {setTimers}
    </div>
  )
}

export default App

// const myFonts = [
//   'Righteous',
//   'Press Start 2P',
//   'Orbitron',
//   'Qahiri',
//   'Teko',
//   'Segoe UI',
//   'Roboto',
//   'Oxygen',
//   'Ubuntu',
//   'Cantarell',
//   'Fira Sans',
//   'Droid Sans',
//   'Helvetica Neue',
//   'sans-serif'
// ]
