/// script for draw and guess html

// window.addEventListener('load', countDown)

//global variables
const doneBtn = document.querySelector('.check')
const colorContainer = document.querySelector('#color')
const picker = new Picker(colorContainer)
const canvas = document.getElementById('paint')
const guessCanvas = document.querySelector('guessCanvas')
const timer = document.querySelector('.base-timer')
// const counter = document.querySelectorAll('.base-timer-label')
const dictionary = document.querySelector('.instructions')

let painting = false
const ctx = canvas.getContext('2d')

let counter = 0
let timeLeft = 60
// let timePassed = 0
// let timeLeft = timeLimit
// let timeInterval = null

const urlElem =
  'https://www.dictionaryapi.com/api/v3/references/sd2/json/school?key='
const apiKeyElem = '86e897cb-447f-4098-8a85-908928a1103e'
const urlInter =
  'https://www.dictionaryapi.com/api/v3/references/sd3/json/dragon?key='
const apiKeyInter = 'b987e98c-94c8-4ed2-95e3-e03337c51913'
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

// timer.innerHTML = `<span id="base-timer-label" class="base-timer__label">
// ${formatTime(timeLeft)}
// </span>`

const stopTimer = () => {
  if (timer.value == '0') {
    clearInterval(startTimer)
    location.href = 'guess.html'
  }
}

let altTimer = () => {
  counter++
  timer.innerHTML = `:${timeLeft - counter}`
  if (counter == timeLeft) {
    clearInterval(timeInterval)
    location.href = 'guess.html'
  }
}

const timeInterval = setInterval(altTimer, 1000)

// const startTimer = () => {
//   // clearInterval(timerInterval)
//   // location.href = 'guess.html'
//   timerInterval = setInterval(() => {
//     timePassed = timePassed += 1
//     timeLeft = timeLimit - timePassed
//     document.getElementById('base-timer-label').innerHTML = formatTime(timeLeft)
//     if (timeLeft == 0) {
//       clearInterval(timeInterval)
//     }
//   }, 1000)
// }

// startTimer()

// dictionary

setTimeout(() => {
  dictionary.value = '5 seconds'
}, 5000)

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

doneBtn.addEventListener('click', () => {
  location.href = 'guess.html'
})

// window.addEventListener('load', startTimer)
