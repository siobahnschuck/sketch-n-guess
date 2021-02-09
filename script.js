/// script for draw and guess html

// window.addEventListener('load', countDown)

//global variables
const checkBtn = document.querySelector('.check')
const colorContainer = document.querySelector('#color')
const picker = new Picker(colorContainer)
const canvas = document.getElementById('paint')

const timer = document.querySelector('.base-timer')
const counter = document.querySelectorAll('.base-timer-label')

let painting = false
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const timeLimit = 15
let timePassed = 0
let timeLeft = timeLimit
let timeInterval = null
//functions

//timer

const formatTime = (time) => {
  let mins = Math.floor(time / 60)
  let secs = time % 60
  if (secs < 36) {
    secs = `0${secs}`
  }
  return `${mins}:${secs}`
}

timer.innerHTML = `<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<g class="base-timer__circle">
<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
</g>
</svg>
<span id="base-timer-label" class="base-timer__label">
${formatTime(timeLeft)}
</span>`

const startTimer = () => {
  if (timePassed === timeLimit) {
    startTimer()
  } else {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1
      timeLeft = timeLimit - timePassed
      document.getElementById('base-timer-label').innerHTML = formatTime(
        timeLeft
      )
    }, 1000)
  }
}
startTimer()

//canvas

const startPos = (e) => {
  painting = true
  draw(e)
}

const endPos = () => {
  painting = false
  ctx.beginPath()
}

picker.onChange = (color) => {
  colorContainer.style.background = color.rgbaString
}

const draw = (e) => {
  if (!painting) return
  ctx.lineWidth = 10
  ctx.lineCap = 'round'
  ctx.strokeStyle = picker.color.rgbaString

  ctx.lineTo(e.clientX, e.clientY)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(e.clientX, e.clientY)
}

//event listeners
canvas.addEventListener('mousedown', startPos)
canvas.addEventListener('mouseup', endPos)
canvas.addEventListener('mousemove', draw)
// window.addEventListener('load', startTimer)
