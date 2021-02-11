//DOM VARIABLES
const doneBtn = document.querySelector('.check')
const playAgainBtn = document.querySelector('.again')
const body = document.querySelector('.draw')
const player = document.querySelector('.player')
const modal = document.getElementById('modal')
const clear = document.querySelector('.clear')
const canvas = document.getElementById('paint')
const colorContainer = document.querySelector('#color')
const instructions = document.querySelector('.instructions')
const timer = document.querySelector('.base-timer')
const scoreOne = document.querySelector('.player1')
const scoreTwo = document.querySelector('.player2')
const startBtn = document.querySelector('.start')

//EXTERNAL VARIABLES
const picker = new Picker(colorContainer)
const ding = new Audio('audio/ding.wav')
const scribble = new Audio('audio/scribble.wav')
const ctx = canvas.getContext('2d')

//GET LOCAL STORAGE
let playerOne = localStorage.getItem('playerOne')
let playerTwo = localStorage.getItem('playerTwo')

//STARTING GAME STATE
let counter = 0
let counterTwo = 0
let timeLeft = 60
let guessLeft = 20
let painting = false
let gameActive = true
let activePlayer = playerOne
let playerOneScore = 0
let playerTwoScore = 0
player.innerText = playerOne
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

//FUNCTIONS
const getWord = () => {
  instructions.innerText = `Draw ${
    words[Math.floor(Math.random() * words.length)]
  }`
  setTimeout(() => {
    instructions.innerText = 'keep drawing...'
  }, 5000)
}

getWord()

const switchPlayers = () => {
  if (activePlayer === playerOne) {
    activePlayer = playerTwo
  } else {
    activePlayer = playerOne
  }
  player.innerText = activePlayer
}

const toggleModal = () => {
  modal.style.display = 'block'
  scoreOne.innerText = `${playerOne} : ${playerOneScore}`
  scoreTwo.innerText = `${playerTwo} : ${playerTwoScore}`
  gameActive = false
}

const scoreCheck = () => {
  if (activePlayer === playerOne) {
    playerTwoScore += 10
  } else {
    playerOneScore += 10
  }
}

const formatTime = (time) => {
  let secs = time % 60
  if (secs < 10) {
    secs = `0${secs}`
  }
  return `:${secs}`
}

const stopTimer = () => {
  let timeInterval = setInterval(drawTimer, 1000)
  clearInterval(timeInterval)
  let guessInterval = setInterval(guessTimer, 1000)
  clearInterval(guessInterval)
}

// const timer = () => {

// }
const drawTimer = () => {
  if (gameActive === true) {
    console.log('draw timer')
    counter++
    timer.innerHTML = formatTime(timeLeft - counter)
    if (counter === timeLeft) {
      stopTimer()
      ding.play()
      if (activePlayer === playerOne) {
        player.innerText = playerTwo
      } else {
        player.innerText = playerOne
      }
      instructions.innerText = 'Guess what it is!'
      colorContainer.style.opacity = 0
      body.style.background = '#87bfff'
      instructions.style.color = '#666a86'
      canvas.style.background = '#666a86'
      setInterval(guessTimer, 1000)
    }
  }
}

const guessTimer = () => {
  if (gameActive === true) {
    console.log('guess timer')
    counterTwo++
    timer.innerText = formatTime(guessLeft - counterTwo)
    if (counterTwo === guessLeft) {
      stopTimer()
      ding.play()
      gameActive = false
      toggleModal()
    }
  }
}

const startPos = (e) => {
  painting = true
  scribble.play()
  draw(e)
}

const endPos = () => {
  painting = false
  scribble.pause()
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
  gameActive = true
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ctx.strokeStyle = picker.color.rgbaString
  ctx.lineTo(e.clientX, e.clientY)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(e.clientX, e.clientY)
}

const playGame = () => {
  gameActive = true
  painting = false
  clearDrawing()
  counter = 0
  counterTwo = 0
  colorContainer.style.opacity = 100
  getWord()
  setInterval(drawTimer, 1000)
}

//EVENT LISTENERS
canvas.addEventListener('mousedown', startPos)
canvas.addEventListener('mouseup', endPos)
canvas.addEventListener('mousemove', draw)
clear.addEventListener('click', clearDrawing)

startBtn.addEventListener('click', playGame)

doneBtn.addEventListener('click', () => {
  stopTimer()
  scoreCheck()
  toggleModal()
})

playAgainBtn.addEventListener('click', () => {
  modal.style.display = 'none'
  playGame()
  switchPlayers()
})
