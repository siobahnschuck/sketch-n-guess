/// script for draw and guess html
//global variables
const doneBtn = document.querySelector('.check')

const body = document.querySelector('.draw')
const player = document.querySelector('.player')

const clear = document.querySelector('.clear')
const canvas = document.getElementById('paint')
const ctx = canvas.getContext('2d')
const colorContainer = document.querySelector('#color')
const picker = new Picker(colorContainer)
let painting = false
const instructions = document.querySelector('.instructions')

const dictionary = document.querySelector('.instructions')

const timer = document.querySelector('.base-timer')
let counter = 0
let counterTwo = 0
let timeLeft = 10
let guessLeft = 20
//functions
//local storage

let playerOne = localStorage.getItem('playerOne')
let playerTwo = localStorage.getItem('playerTwo')
let playerOneScore = localStorage.getItem('playerOneScore')
let playerTwoScore = localStorage.getItem('playerTwoScore')

let currDraw = playerOne
let currGuess = playerTwo
let guessCheck = false

localStorage.setItem('currDraw', playerOne)
localStorage.setItem('currGuess', playerTwo)
player.innerText = currDraw

// document.addEventListener('DOMContentLoaded')

const scoreCheck = () => {
  if (currGuess === playerOne && guessCheck) {
    let scoreNumOne = parseInt(playerOneScore)
    scoreNumOne += 10
    localStorage.setItem('playerOneScore', scoreNumOne)
  }
  if (currGuess === playerTwo && guessCheck) {
    let scoreNumTwo = parseInt(playerTwoScore)
    scoreNumTwo += 10
    localStorage.setItem('playerTwoScore', scoreNumTwo)
  }
  guessCheck = false
}

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
    player.innerText = currGuess
    instructions.innerText = 'Guess what it is!'
    colorContainer.innerText = ''
    colorContainer.style.background = ''
    painting === false
    body.style.background = '#87bfff'
    instructions.style.color = '#666a86'
    canvas.style.background = '#666a86'
    setInterval(guessTime, 1000)
  }
}

const guessTime = () => {
  counterTwo++
  timer.innerText = formatTime(guessLeft - counterTwo)
  if (counterTwo === guessLeft) {
    currDraw = playerTwo
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
  dictionary.innerText = 'keep drawing...'
}, 5000)

//canvas

///maybe add a setTime out for painting = true and after 30 seconds it turns false

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

// picker.setOptions().popup = 'top'

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
  guessCheck = true
  scoreCheck()
  location.href = 'scores.html'
  //if player 1 draws add a point to player 2
  //else add a point to player 1
})
