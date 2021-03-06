import React, { useState, useEffect } from 'react'
import oneUpSFX from './sounds/smb_1-up.m4a'
import bumpSFX from './sounds/smb_bump.m4a'
import coinSFX from './sounds/smb_coin.m4a'
import restartSFX from './sounds/smb_flagpole.m4a'
import breakOverSFX from './sounds/smb_gameover.m4a'
import startBreakSFX from './sounds/smb_jump-super.m4a'
import pauseSFX from './sounds/smb_pause.m4a'
import startStudySFX from './sounds/smb_pipe.m4a'
import powerUpSFX from './sounds/smb_powerup.m4a'
import studyOverSFX from './sounds/smb_stage_clear.m4a'
import warningSFX from './sounds/smb_warning.m4a'
import accurateInterval from './accurateInterval'

function App() {
  let incrementSound = new Audio(coinSFX)
  let decrementSound = new Audio(bumpSFX)
  let switchToBreakSound = new Audio(oneUpSFX)
  let switchToStudySound = new Audio(powerUpSFX)
  let warningSound = new Audio(warningSFX)
  let pauseSound = new Audio(pauseSFX)
  let restartSound = new Audio(restartSFX)
  let breakOverSound = new Audio(breakOverSFX)
  let studyOverSound = new Audio(studyOverSFX)
  let startBreakSound = new Audio(startBreakSFX)
  let startStudySound = new Audio(startStudySFX)
  const [breakLength, setBreakLength] = useState(5)
  const [studyLength, setStudyLength] = useState(25)
  const [animateBreak, setAnimateBreak] = useState({ up: false, down: false })
  const [animateStudy, setAnimateStudy] = useState({ up: false, down: false })
  const [disableButtons, setDisableButtons] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isBreak, setIsBreak] = useState(false)
  const [timerActive, setTimerActive] = useState(false)
  const [myInterval, setMyInterval] = useState('')
  const [testMode, setTestMode] = useState(false)
  const [soundOn, setSoundOn] = useState(true)

  // BREAK LENGTH MUST BE LESS THAT STUDY LENGTH
  // SWITCH TIME LEFT FROM BREAK/STUDY ON SESSION SWITCH
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

  // WHEN TIMER RUNNING - CHECK THE TIMER'S STATUS EVERY SECOND
  useEffect(() => {
    if (timeLeft === 59 && timerActive) {
      warningSound.play()
    }
    // this.warning(timer)
    // this.buzzer(timer)
    if (timeLeft < 0) {
      if (myInterval) {
        myInterval.cancel()
      }
      if (isBreak) {
        breakOverSound.play()
        setTimeLeft(studyLength * 60)
      } else {
        studyOverSound.play()
        setTimeLeft(breakLength * 60)
      }
      startTimer()
      setIsBreak((prevIsBreak) => !prevIsBreak)
    }
  }, [timeLeft])

  useEffect(() => {
    if (
      breakLength < testModeLowerLimit() ||
      studyLength < testModeLowerLimit()
    ) {
      setBreakLength(testModeLowerLimit())
      setStudyLength(testModeLowerLimit())
    }
  }, [testMode, studyLength, breakLength])

  function toggleTestMode() {
    if (myInterval) myInterval.cancel()
    if (testMode) {
      setTestMode(false)
      setTimerActive(false)
      setBreakLength(5)
      setStudyLength(25)
    } else {
      setTestMode(true)
      setTimerActive(false)
      setBreakLength(3)
      setStudyLength(3)
    }
  }

  function toggleSound() {
    if (soundOn) {
      incrementSound.volume = 0
      decrementSound.volume = 0
      switchToBreakSound.volume = 0
      switchToStudySound.volume = 0
      warningSound.volume = 0
      pauseSound.volume = 0
      restartSound.volume = 0
      breakOverSound.volume = 0
      studyOverSound.volume = 0
      startBreakSound.volume = 0
      startStudySound.volume = 0
      setSoundOn(false)
    } else {
      incrementSound.volume = 1
      decrementSound.volume = 1
      switchToBreakSound.volume = 1
      switchToStudySound.volume = 1
      warningSound.volume = 1
      pauseSound.volume = 1
      restartSound.volume = 1
      breakOverSound.volume = 1
      studyOverSound.volume = 1
      startBreakSound.volume = 1
      startStudySound.volume = 1
      setSoundOn(true)
    }
  }

  // SWITCH SESSION TYPE (RED BUTTON)
  function switchSessionType() {
    setTimerActive(false)
    if (myInterval) {
      myInterval.cancel()
    }
    if (isBreak) {
      setTimeLeft(breakLength * 60)
    } else {
      setTimeLeft(studyLength * 60)
    }
    if (!isBreak) switchToBreakSound.play()
    if (isBreak) switchToStudySound.play()

    setIsBreak(!isBreak)
  }

  // DECREMENT TIMELEFT WHEN TIMER RUNNING
  function decrementTimeLeft() {
    setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
  }

  const intervalLength = testMode ? 50 : 1000

  // START THE TIMER USING ACCURATE INTERVAL HELPER FUNCTION
  function startTimer() {
    setMyInterval(
      accurateInterval(() => {
        decrementTimeLeft()
        // checkTimerStatus()
      }, intervalLength)
    )
  }

  // HANDLE PLAY/PAUSE BUTTON PRESS
  function handlePlayPause() {
    // console.log(timerActive)
    if (!timerActive) {
      setTimerActive(true)
      if (isBreak) {
        startBreakSound.play()
      } else {
        startStudySound.play()
      }
      startTimer()
      return
    } else {
      setTimerActive(false)
      pauseSound.play()
      if (myInterval) {
        myInterval.cancel()
      }
    }
  }

  // HANDLE THE RESET BUTTON
  function handleRestartTimer() {
    // console.log('restart timer')
    setTimerActive(false)
    restartSound.play()
    if (myInterval) {
      myInterval.cancel()
    }
    if (isBreak) {
      setTimeLeft(breakLength * 60)
    } else {
      setTimeLeft(studyLength * 60)
    }
  }

  // BREAK LENGTH CHANGE HANDLERS
  function incrementBreak() {
    if (disableButtons || timerActive) return
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

  const testModeLowerLimit = () => (testMode ? 3 : 1)

  function decrementBreak() {
    if (disableButtons || timerActive) return
    if (breakLength > testModeLowerLimit()) {
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
  // BREAK LENGTH SLIDER
  function handleBreakSlider(e) {
    setBreakLength(parseInt(e.target.value, 10))
  }

  // STUDY LENGTH CHANGE HANDLERS
  function incrementStudy() {
    if (disableButtons || timerActive) return
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
    if (disableButtons || timerActive) return
    if (studyLength > testModeLowerLimit()) {
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

  // STUDY LENGTH SLIDER
  function handleStudySlider(e) {
    setStudyLength(parseInt(e.target.value, 10))
  }

  // GET MINUTES LEFT FROM TIMELEFT
  function timeLeftToMinutes(time) {
    const minutes = Math.floor(time / 60)
    if (minutes < 10) {
      return `0${minutes}`
    } else return minutes
  }

  // GET SECONDS LEFT FROM TIMELEFT
  function timeLeftToSeconds(time) {
    const minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    // console.log(seconds)
    if (seconds < 10) {
      return `0${seconds}`
    } else return seconds
  }

  // DETERMINE ICON FOR PLAY/PAUSE BUTTON
  const playOrPause = timerActive ? (
    <i className="fa-solid fa-pause btn-icon"></i>
  ) : (
    <i className="fa-solid fa-play btn-icon"></i>
  )

  // DYNAMIC ANIMATIONS FOR CHANGING BREAK LENGTH
  const breakAnimation = {
    animation: animateBreak.up
      ? 'inc-num 300ms ease-out'
      : animateBreak.down
      ? 'dec-num 300ms ease-out'
      : 'none'
  }

  // DYNAMIC ANIMATIONS FOR CHANGING STUDY LENGTH
  const studyAnimation = {
    animation: animateStudy.up
      ? 'inc-num 500ms ease-out'
      : animateStudy.down
      ? 'dec-num 500ms ease-out'
      : 'none'
  }

  // TURN TIMER COLOR RED WHEN LESS THAN 60 SECONDS LEFT
  const warningStyle = {
    color: timeLeft < 60 ? 'var(--warning-red)' : 'white'
  }

  const soundIconEl = (
    <div className="sound-icon-div" onClick={toggleSound}>
      <i
        className={
          soundOn
            ? 'fa-solid fa-volume-high sound-icon'
            : 'fa-solid fa-volume-xmark sound-icon'
        }
      ></i>
      {!soundOn && <p id="coming-soon">Coming Soon! I Swear!</p>}
    </div>
  )

  // SESSION SWITCH COMPONENT - RED BUTTON AND PHRASE
  const sessionSwitchButton = (
    <div className="sesh-switch-div">
      <div className="button-div red-btn-out" onClick={switchSessionType}>
        <div className="button-inner-div red-btn-in">
          <i className="fa-solid fa-shuffle abso-btn-icon"></i>
        </div>
      </div>
      <p className="abso-btn-text">
        {isBreak ? 'Switch to study session' : 'Switch to break time'}
      </p>
    </div>
  )

  const testButton = (
    <div className="test-btn-div">
      <div
        className={
          testMode
            ? 'button-div red-btn-out test-btn'
            : 'button-div grey-btn-out test-btn'
        }
        id="reset"
        onClick={toggleTestMode}
      >
        <div
          className={
            testMode
              ? 'button-inner-div red-btn-in'
              : 'button-inner-div grey-btn-in'
          }
        >
          <i className="fa-solid fa-flask-vial abso-btn-icon"></i>
        </div>
      </div>
      <p className="abso-btn-text">
        {testMode ? 'Test Mode Enabled' : 'Test Mode Disabled'}
      </p>
    </div>
  )

  // TIMER CONTROLS
  const timerControls = (
    <div className="timer-controls-div">
      <div
        className="button-div grey-btn-out timer-btn"
        id="start_stop"
        onClick={handlePlayPause}
      >
        <div className="button-inner-div grey-btn-in">{playOrPause}</div>
      </div>
      <div
        className="button-div grey-btn-out timer-btn"
        id="reset"
        onClick={handleRestartTimer}
      >
        <div className="button-inner-div grey-btn-in">
          <i className="fa-solid fa-arrow-rotate-left btn-icon"></i>
        </div>
      </div>
    </div>
  )

  // THE TIMER
  const timerHtml = (
    <div className="timer-div">
      <div className="timer-inner-div">
        <h1 className="timer-title" id="timer-label">
          {isBreak ? 'BREAK TIME' : 'STUDY TIME'}
        </h1>
        <h5 className="timer-phrase">
          {timerActive
            ? 'INITIATED'
            : isBreak
            ? 'TAKE A LOAD OFF'
            : "LET'S GET IT!"}
        </h5>
        <div className="the-timer-screen">
          <h2 className="the-timer-el" id="time-left" style={warningStyle}>
            {timeLeftToMinutes(timeLeft)}:{timeLeftToSeconds(timeLeft)}
          </h2>
        </div>
        {timerControls}
      </div>
    </div>
  )

  // BREAK LENGTH CHANGE COMPONENT
  const setBreakTimerHtml = (
    <div className="set-timer-div std-break">
      <div className="set-timer-inner-div">
        <h4 className="length-label" id="break-label">
          Break Length
        </h4>
        <div className="set-timer-controls-div">
          <input
            type="range"
            min={`${testModeLowerLimit()}`}
            max={studyLength}
            value={breakLength}
            className="slider"
            id="myRange"
            onChange={handleBreakSlider}
            disabled={disableButtons || timerActive ? true : false}
          />
          <div className="timer-value-screen">
            <h3
              id="break-length"
              className="timer-value number"
              style={breakAnimation}
            >
              {breakLength}
            </h3>
          </div>
          <div className="btns-container">
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
    </div>
  )

  // STUDY LENGTH CHANGE COMPONENT
  const setStudyTimerHtml = (
    <div className="set-timer-div std-study">
      <div className="set-timer-inner-div">
        <h4 className="length-label">Study Length</h4>
        <div className="set-timer-controls-div">
          <input
            type="range"
            min={`${testModeLowerLimit()}`}
            max="60"
            value={studyLength}
            className="slider"
            id="myRange"
            onChange={handleStudySlider}
            disabled={disableButtons || timerActive ? true : false}
          />
          <div className="timer-value-screen">
            <h3 className="timer-value number" style={studyAnimation}>
              {studyLength}
            </h3>
          </div>
          <div className="btns-container">
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
    </div>
  )

  // DIV HOLDING BOTH SESSION LENGTH CHANGE COMPONENTS
  // const setTimers = (
  //   <div className="set-timers-div">
  //     {setBreakTimerHtml}
  //     {setStudyTimerHtml}
  //   </div>
  // )

  return (
    <div className="app-container">
      {sessionSwitchButton}
      {testButton}
      {soundIconEl}
      <h1 className="title">Study Session Timer</h1>
      {timerHtml}
      {/* {timerControls} */}
      {/* {setTimers} */}
      {setBreakTimerHtml}
      {setStudyTimerHtml}
    </div>
  )
}

export default App

// SET BREAK AND STUDY LENGTH TO LOCAL STORAGE
// useEffect(() => {
//   localStorage.setItem('breakLength', JSON.stringify(breakLength))
// }, [breakLength])
// useEffect(() => {
//   localStorage.setItem('studyLength', JSON.stringify(studyLength))
// }, [studyLength])

// IF IN LOCAL STORAGE, GET AND SET BREAK AND STUDY LENGTHS
// useEffect(() => {
//   const localBreakLength = JSON.parse(localStorage.getItem('breakLength'))
//   const localStudyLength = JSON.parse(localStorage.getItem('studyLength'))
//   if (localBreakLength) {
//     setBreakLength(localBreakLength)
//   }
//   if (localStudyLength) {
//     setStudyLength(localStudyLength)
//   }
//   if (!localBreakLength) {
//     setBreakLength(5)
//   }
//   if (!localStudyLength) {
//     setStudyLength(25)
//   }
// }, [])
