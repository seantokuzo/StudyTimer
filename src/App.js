import React, { useState, useEffect } from 'react'

function App() {
  const [breakLength, setBreakLength] = useState(0)
  const [studyLength, setStudyLength] = useState(0)
  const [animateBreak, setAnimateBreak] = useState({ up: false, down: false })
  const [animateStudy, setAnimateStudy] = useState({ up: false, down: false })
  const [disableButtons, setDisableButtons] = useState(false)

  useEffect(() => {
    setBreakLength(5)
    setStudyLength(25)
  }, [])

  useEffect(() => {
    if (breakLength > studyLength) {
      setBreakLength(studyLength)
    }
  }, [studyLength, breakLength])

  function incrementBreak() {
    if (disableButtons) return
    if (breakLength < 60 && breakLength < studyLength) {
      setDisableButtons(true)
      setAnimateBreak((prev) => ({
        ...prev,
        up: true
      }))
      setTimeout(() => {
        setBreakLength((prev) => prev + 1)
      }, 200)
      setTimeout(() => {
        setAnimateBreak((prev) => ({
          ...prev,
          up: false
        }))
        setDisableButtons(false)
      }, 350)
    }
    return
  }

  function decrementBreak() {
    if (disableButtons) return
    if (breakLength > 1) {
      setDisableButtons(true)
      setAnimateBreak((prev) => ({
        ...prev,
        down: true
      }))
      setTimeout(() => {
        setBreakLength((prev) => prev - 1)
      }, 200)
      setTimeout(() => {
        setAnimateBreak((prev) => ({
          ...prev,
          down: false
        }))
        setDisableButtons(false)
      }, 350)
    }
    return
  }

  function incrementStudy() {
    if (disableButtons) return
    if (studyLength < 60) {
      setDisableButtons(true)
      setAnimateStudy((prev) => ({
        ...prev,
        up: true
      }))
      setTimeout(() => {
        setStudyLength((prev) => prev + 1)
      }, 200)
      setTimeout(() => {
        setAnimateStudy((prev) => ({
          ...prev,
          up: false
        }))
        setDisableButtons(false)
      }, 350)
    }
    return
  }

  function decrementStudy() {
    if (disableButtons) return
    if (studyLength > 1) {
      setDisableButtons(true)
      setAnimateStudy((prev) => ({
        ...prev,
        down: true
      }))
      setTimeout(() => {
        setStudyLength((prev) => prev - 1)
      }, 200)
      setTimeout(() => {
        setAnimateStudy((prev) => ({
          ...prev,
          down: false
        }))
        setDisableButtons(false)
      }, 350)
    }
    return
  }

  const breakAnimation = {
    animation: animateBreak.up
      ? 'inc-num 300ms ease-out'
      : animateBreak.down
      ? 'dec-num 300ms ease-out'
      : 'none'
  }

  const studyAnimation = {
    animation: animateStudy.up
      ? 'inc-num 500ms ease-out'
      : animateStudy.down
      ? 'dec-num 500ms ease-out'
      : 'none'
  }

  function handleBreakSlider(e) {
    console.log(e)
    setBreakLength(e.target.value)
  }

  const setBreakTimerHtml = (
    <div className="set-timer-div std-break">
      <h4 className="length-label" id="break-label">
        Break Length
      </h4>
      <div className="set-timer-controls-div">
        <i
          id="break-increment"
          className="fa-solid fa-angle-up control"
          onClick={incrementBreak}
        ></i>
        <div className="timer-value-div">
          <h3
            id="break-length"
            className="timer-value number"
            style={breakAnimation}
          >
            {breakLength}
          </h3>
        </div>
        <i
          id="break-decrement"
          className="fa-solid fa-angle-down control"
          onClick={decrementBreak}
        ></i>
      </div>
      <input
        type="range"
        min="1"
        max={studyLength}
        value={breakLength}
        className="slider"
        id="myRange"
        onChange={handleBreakSlider}
        disabled={disableButtons ? true : false}
      />
    </div>
  )

  function handleStudySlider(e) {
    console.log(e)
    setStudyLength(e.target.value)
  }

  const setStudyTimerHtml = (
    <div className="set-timer-div std-study">
      <h4 className="length-label" id="session-label">
        Study Length
      </h4>
      <div className="set-timer-controls-div">
        <i
          id="session-increment"
          className="fa-solid fa-angle-up control"
          onClick={incrementStudy}
        ></i>
        <div className="timer-value-div">
          <h3
            id="session-length"
            className="timer-value number"
            style={studyAnimation}
          >
            {studyLength}
          </h3>
        </div>
        <i
          id="session-decrement"
          className="fa-solid fa-angle-down control"
          onClick={decrementStudy}
        ></i>
      </div>
      <input
        type="range"
        min="1"
        max="60"
        value={studyLength}
        className="slider"
        id="myRange"
        onChange={handleStudySlider}
        disabled={disableButtons ? true : false}
      />
    </div>
  )

  const setTimers = (
    <div className="set-timers-div">
      {setBreakTimerHtml}
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
