import React, { useState, useEffect } from 'react'
import coinSFX from './sounds/smb_coin.m4a'
import bumpSFX from './sounds/smb_bump.m4a'
import oneUpSFX from './sounds/smb_1-up.m4a'
import powerUpSFX from './sounds/smb_powerup.m4a'

function App() {
  const incrementSound = new Audio(coinSFX)
  const decrementSound = new Audio(bumpSFX)
  const switchToBreakSound = new Audio(oneUpSFX)
  const switchToStudySound = new Audio(powerUpSFX)
  const [breakLength, setBreakLength] = useState(0)
  const [studyLength, setStudyLength] = useState(0)
  const [animateBreak, setAnimateBreak] = useState({ up: false, down: false })
  const [animateStudy, setAnimateStudy] = useState({ up: false, down: false })
  const [disableButtons, setDisableButtons] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isBreak, setIsBreak] = useState(false)
  const [timerActive, setTimerActive] = useState(false)

  console.log(timeLeft)

  useEffect(() => {
    setBreakLength(5)
    setStudyLength(25)
  }, [])

  useEffect(() => {
    if (breakLength > studyLength) {
      setBreakLength(studyLength)
    }
    if (isBreak) {
      setTimeLeft(breakLength * 60)
      return
    } else {
      setTimeLeft(studyLength * 60)
    }
  }, [studyLength, breakLength, isBreak])

  function incrementBreak() {
    if (disableButtons) return
    if (breakLength < 60 && breakLength < studyLength) {
      setDisableButtons(true)
      incrementSound.play()
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
      decrementSound.play()
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
      incrementSound.play()
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
      decrementSound.play()
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
    setBreakLength(parseInt(e.target.value, 10))
  }

  const setBreakTimerHtml = (
    <div className="set-timer-div std-break">
      <h4 className="length-label" id="break-label">
        Break Length
      </h4>
      <div className="set-timer-controls-div">
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
        <div className="timer-value-div">
          <h3
            id="break-length"
            className="timer-value number"
            style={breakAnimation}
          >
            {breakLength}
          </h3>
        </div>
        <div className="btns-div">
          <div className="button-div green-btn-out" onClick={incrementBreak}>
            <div className="button-inner-div green-btn-in">
              <i
                id="break-increment"
                className="fa-solid fa-angle-up btn-icon"
              ></i>
            </div>
          </div>
          <div className="button-div blue-btn-out" onClick={decrementBreak}>
            <div className="button-inner-div blue-btn-in">
              <i
                id="break-decrement"
                className="fa-solid fa-angle-down btn-icon"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  function handleStudySlider(e) {
    setStudyLength(parseInt(e.target.value, 10))
  }

  const setStudyTimerHtml = (
    <div className="set-timer-div std-study">
      <h4 className="length-label" id="session-label">
        Study Length
      </h4>
      <div className="set-timer-controls-div">
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
        <div className="timer-value-div">
          <h3
            id="session-length"
            className="timer-value number"
            style={studyAnimation}
          >
            {studyLength}
          </h3>
        </div>
        <div className="btns-div">
          <div className="button-div yellow-btn-out" onClick={incrementStudy}>
            <div className="button-inner-div yellow-btn-in">
              <i
                id="session-increment"
                className="fa-solid fa-angle-up btn-icon"
              ></i>
            </div>
          </div>
          <div className="button-div orange-btn-out" onClick={decrementStudy}>
            <div className="button-inner-div orange-btn-in">
              <i
                id="session-decrement"
                className="fa-solid fa-angle-down btn-icon"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const setTimers = (
    <div className="set-timers-div">
      {setBreakTimerHtml}
      {setStudyTimerHtml}
    </div>
  )

  function switchSessionType() {
    if (!isBreak) switchToBreakSound.play()
    if (isBreak) switchToStudySound.play()

    setIsBreak(!isBreak)
  }

  const sessionSwitchButton = (
    <div className="sesh-switch-div">
      <div className="button-div red-btn-out" onClick={switchSessionType}>
        <div className="button-inner-div red-btn-in">
          <i className="fa-solid fa-shuffle switch-icon"></i>
        </div>
      </div>
      <p className="sesh-switch-phrase">
        {isBreak ? 'Switch to study session' : 'Switch to break time'}
      </p>
    </div>
  )

  const playOrPause = timerActive ? (
    <i className="fa-solid fa-pause btn-icon"></i>
  ) : (
    <i className="fa-solid fa-play btn-icon"></i>
  )
  let tickTock

  function handlePlayPause() {
    console.log(timerActive)
    if (!timerActive) {
      setTimerActive(true)
      tickTock = setInterval(() => {
        if (timeLeft < 0) {
          clearTimeout(tickTock)
        } else {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
        }
      }, 1000)
      return
    } else {
      setTimerActive(false)
      clearInterval(tickTock)
      tickTock = null
    }
  }

  function handleRestartTimer() {
    console.log('restart timer')
  }

  function timeLeftToMinutes(time) {
    const minutes = Math.floor(time / 60)
    console.log(minutes)
    if (minutes < 10) {
      return `0${minutes}`
    } else return minutes
  }

  function timeLeftToSeconds(time) {
    const minuteFraction = time / 60 - Math.floor(time / 60)
    let seconds = Math.floor(minuteFraction * 60)
    if (seconds < 10) {
      return `0${seconds}`
    } else return seconds
  }

  const timerHtml = (
    <div className="timer-div">
      <div className="timer-inner-div">
        <h1 className="timer-title" id="timer-label">
          {isBreak ? 'BREAK TIME' : 'STUDY TIME'}
        </h1>
        <h5 className="timer-phrase">
          {isBreak ? 'TAKE A LOAD OFF' : "LET'S GET IT!"}
        </h5>
        <div className="the-timer-screen">
          <h2 className="the-timer-el" id="time-left">
            {timeLeftToMinutes(timeLeft)}:{timeLeftToSeconds(timeLeft)}
          </h2>
        </div>
      </div>
    </div>
  )

  const timerControls = (
    <div className="timer-controls-div">
      <div
        className="button-div grey-btn-out timer-btn"
        onClick={handlePlayPause}
      >
        <div className="button-inner-div grey-btn-in">{playOrPause}</div>
      </div>
      <div
        className="button-div grey-btn-out timer-btn"
        onClick={handleRestartTimer}
      >
        <div className="button-inner-div grey-btn-in">
          <i className="fa-solid fa-arrow-rotate-left btn-icon"></i>
        </div>
      </div>
    </div>
  )

  return (
    <div className="app-container">
      <h1 className="title">Study Session Timer</h1>
      {sessionSwitchButton}
      {timerHtml}
      {timerControls}
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
