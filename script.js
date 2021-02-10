/// script for draw and guess html
//global variables
const doneBtn = document.querySelector('.check')

const body = document.querySelector('.draw')
const clear = document.querySelector('.clear')
const canvas = document.getElementById('paint')
const ctx = canvas.getContext('2d')
const colorContainer = document.querySelector('#color')
const picker = new Picker(colorContainer)

const instructions = document.querySelector('.instructions')

const dictionary = document.querySelector('.instructions')

const timer = document.querySelector('.base-timer')
let counter = 0
let counterTwo = 0
let timeLeft = 10
let guessLeft = 20
//functions
//player names

let playerOne = localStorage.getItem('playerOne')
let playerTwo = localStorage.getItem('playerTwo')

let scoreOne = '0'
let scoreTwo = '0'

localStorage.setItem('playerOneScore', scoreOne)
localStorage.setItem('playerTwoScore', scoreTwo)

localStorage.setItem('curr', playerOne)

player.innerHTML = playerOne
// window.addEventListener('storage', playerNames)

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
    player.innerHTML = playerTwo
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
    ParseInt(scoreOne) -= 10
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
  dictionary.innerText = 'keep drawing...'
}, 5000)

//canvas
let painting = false

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

const clearDrawing = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const draw = (e) => {
  if (!painting) return
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 5
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

if (clear) {
  console.log('click')
  clear.addEventListener('click', clearDrawing)
}

doneBtn.addEventListener('click', () => {
  console.log('click')
  scoreTwo += 10
  location.href = 'scores.html'

  //if player 1 draws add a point to player 2
  //else add a point to player 1
})
