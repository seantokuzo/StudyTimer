// Accurate_Interval.js
// Thanks Alex Wayne! For the elegant answer provided to this question:
// https://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
// Github: https://gist.github.com/AlexJWayne/1d99b3cd81d610ac7351
// Slightly modified to accept 'normal' interval/timeout format (func, time).

const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper
  nextAt = new Date().getTime() + time
  timeout = null
  wrapper = function () {
    nextAt += time
    timeout = setTimeout(wrapper, nextAt - new Date().getTime())
    return fn()
  }
  cancel = function () {
    return clearTimeout(timeout)
  }
  timeout = setTimeout(wrapper, nextAt - new Date().getTime())
  return {
    cancel: cancel
  }
}

export default accurateInterval
