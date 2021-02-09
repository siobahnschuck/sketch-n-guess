/// script for draw and guess html

//global variables
const doneBtn = document.querySelector('.check')
const againBtn = document.querySelector('.again')
const body = document.querySelector('.draw')

const canvas = document.getElementById('paint')
let painting = false
const colorContainer = document.querySelector('#color')
const picker = new Picker(colorContainer)

const player = document.querySelector('.player')
const instructions = document.querySelector('.instructions')

const dictionary = document.querySelector('.instructions')
const urlElem =
  'https://www.dictionaryapi.com/api/v3/references/sd2/json/school?key='
const apiKeyElem = '86e897cb-447f-4098-8a85-908928a1103e'
const urlInter =
  'https://www.dictionaryapi.com/api/v3/references/sd3/json/dragon?key='
const apiKeyInter = 'b987e98c-94c8-4ed2-95e3-e03337c51913'

const timer = document.querySelector('.base-timer')
let counter = 0
let counterTwo = 0
let timeLeft = 10
let guessLeft = 20
//functions

//timer

const formatTime = (time) => {
  let mins = Math.floor(time / 60)
  let secs = time % 60
  if (secs < 10) {
    secs = `0${secs}`
  }
  return `:${secs}`
}

const altTimer = () => {
  counter++
  timer.innerHTML = formatTime(timeLeft - counter)
  if (counter === timeLeft) {
    clearInterval(timeInterval)
    // timer.innerHTML = ''
    player.innerHTML = 'PLAYER 2'
    instructions.innerHTML = 'Guess what it is!'
    colorContainer.innerHTML = ''
    colorContainer.style.background = ''
    painting = true
    body.style.background = '#87bfff'
    instructions.style.color = '#666a86'
    canvas.style.background = '#666a86'
    setInterval(guessTime, 1000)
  }
}

const guessTime = () => {
  counterTwo++
  timer.innerHTML = formatTime(guessLeft - counterTwo)
  if (counterTwo === guessLeft) {
    location.href = 'scores.html'
  }
}

const timeInterval = setInterval(altTimer, 1000)

// dictionary

const words = [
  'a cow',
  'a dog',
  'a fish',
  'spaghetti',
  'a bike',
  'a car',
  'a plane',
  'a cloud',
  'a flower',
  'a church',
  'a watch',
  'a phone',
  'a banana'
]

dictionary.innerText = `Draw ${words[Math.floor(Math.random() * words.length)]}`
setTimeout(() => {
  dictionary.innerText = ''
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
  ctx.strokeStyle = 'black'
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
  location.href = 'scores.html'
  //if player 1 draws add a point to player 2
  //else add a point to player 1
})
againBtn.addEventListener('click', () => {
  location.href = 'draw.html'
})
// window.addEventListener('load', startTimer)
