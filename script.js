/// script for draw and guess html
//global variables
const doneBtn = document.querySelector('.check')

const body = document.querySelector('.draw')
const player = document.querySelector('.player')
const guesser = document.querySelector('.guesser')

const clear = document.querySelector('.clear')
const canvas = document.getElementById('paint')
const ctx = canvas.getContext('2d')
const colorContainer = document.querySelector('#color')
const picker = new Picker(colorContainer)
let painting = false
const instructions = document.querySelector('.instructions')

const dictionary = document.querySelector('.instructions')

const timer = document.querySelector('.base-timer')
const ding = new Audio('audio/ding.wav')
const scribble = new Audio('audio/scribble.wav')
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

localStorage.setItem('playerOneDraw', playerOne)
localStorage.setItem('playerTwoDraw', playerTwo)
localStorage.setItem('playerOneGuess', playerOne)
localStorage.setItem('playerTwoGuess', playerTwo)

let playerOneDraw = localStorage.getItem('playerOneDraw')
let playerTwoDraw = localStorage.getItem('playerTwoDraw')
let playerOneGuess = localStorage.getItem('playerOneGuess')
let playerTwoGuess = localStorage.getItem('playerTwoGuess')

let currDraw = playerOneDraw
let currGuess = playerTwoGuess
// let currDraw = playerOne
// if (currDraw === playerOne) {
//   currDraw = playerTwo
// } else {
//   currDraw = playerOne
// }
// localStorage.setItem('playerOneDraw', currDraw)
// let currGuess = playerTwo
// localStorage.setItem('currGuess', currGuess)
let guessCheck = false

// document.addEventListener('DOMContentLoaded', )

const switchPlayers = () => {
  //player.innerText starts at currDraw and each time play again
  //it switches
  if (currDraw === playerOneDraw) {
    currDraw = playerTwoDraw
    currGuess = playerOneGuess
    player.innerText = playerOne
    console.log(currDraw)
    console.log(currGuess)
  } else {
    currDraw = playerOneDraw
    currGuess = playerTwoGuess
    player.innerText = playerOne
  }
}

switchPlayers()

// player.innerText = playerOne
const scoreCheck = () => {
  if (currGuess === playerOneGuess && guessCheck) {
    console.log(guessCheck)
    let scoreNumOne = parseInt(playerOneScore)
    scoreNumOne += 10
    localStorage.setItem('playerOneScore', scoreNumOne)
    // switchPlayers()
  }
  if (currGuess === playerTwoGuess && guessCheck) {
    let scoreNumTwo = parseInt(playerTwoScore)
    scoreNumTwo += 10
    localStorage.setItem('playerTwoScore', scoreNumTwo)
    // switchPlayers()
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
    ding.play()
    if (currGuess === playerTwoGuess) {
      player.innerText = ''
      guesser.innerText = playerTwo
    } else {
      player.innerText = ''
      guesser.innerText = playerTwo
    }
    instructions.innerText = 'Guess what it is!'
    colorContainer.innerText = ''
    colorContainer.style.background = ''
    painting === false
    body.style.background = '#87bfff'
    instructions.style.color = '#666a86'
    canvas.style.background = '#666a86'
    guessInterval
  }
}

const guessTime = () => {
  counterTwo++
  timer.innerText = formatTime(guessLeft - counterTwo)
  if (counterTwo === guessLeft) {
    clearInterval(guessInterval)
    ding.play()
    // if (currDraw === playerOne && guessCheck) {
    //   let scoreNumOne = parseInt(playerOneScore)
    //   scoreNumOne -= 10
    //   localStorage.setItem('playerOneScore', scoreNumOne)
    // }
    // if (currDraw === playerTwo && guessCheck) {
    //   let scoreNumTwo = parseInt(playerTwoScore)
    //   scoreNumTwo -= 10
    //   localStorage.setItem('playerTwoScore', scoreNumTwo)
    // }
    guessCheck = false
    // switchPlayers()
    setTimeout(() => {
      location.href = 'scores.html'
    }, 4000)
  }
}
const guessInterval = setInterval(guessTime, 1000)
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

clear.addEventListener('click', clearDrawing)

doneBtn.addEventListener('click', () => {
  console.log('click')
  guessCheck = true
  scoreCheck()
  // switchPlayers()
  setTimeout(() => {
    location.href = 'scores.html'
  }, 4000)
  //if player 1 draws add a point to player 2
  //else add a point to player 1
})
