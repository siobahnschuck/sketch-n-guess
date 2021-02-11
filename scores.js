const playerOneFinal = document.querySelector('.player1')
const playerTwoFinal = document.querySelector('.player2')
const againBtn = document.querySelector('.again')

let playerOneScore = localStorage.getItem('playerOneScore')
let playerTwoScore = localStorage.getItem('playerTwoScore')
let playerOne = localStorage.getItem('playerOne')
let playerTwo = localStorage.getItem('playerTwo')
let playerOneDraw = localStorage.getItem('playerOneDraw')
let playerTwoDraw = localStorage.getItem('playerTwoDraw')
let playerOneGuess = localStorage.getItem('playerOneGuess')
let playerTwoGuess = localStorage.getItem('playerTwoGuess')

playerOneFinal.innerText = `${playerOne} : ${playerOneScore}`
playerTwoFinal.innerText = `${playerTwo} : ${playerTwoScore}`
// ${playerOneScore}${playerTwoScore}

let currDraw = playerOneDraw
let currGuess = playerTwoGuess

const switchPlayers = () => {
  //player.innerText starts at currDraw and each time play again
  //it switches
  if (currDraw === playerOneDraw) {
    currDraw = playerTwoDraw
    currGuess = playerOneGuess
    console.log(currDraw)
    console.log(currGuess)
  } else {
    currDraw = playerOneDraw
    currGuess = playerTwoGuess
  }
}

againBtn.addEventListener('click', () => {
  // playerOne = playerOneGuess
  // playerTwo = playerTwoDraw
  // localStorage.setItem('currDraw', playerTwo)
  // localStorage.setItem('currGuess', playerOne)
  // if (playerOneDraw) {
  //   localStorage.setItem('currDraw', playerTwo)
  //   currDraw = playerTwo
  //   localStorage.setItem('currGuess', playerOne)
  //   currGuess = playerOne
  // } else {
  //   localStorage.setItem('currDraw', playerOne)
  //   currDraw = playerOne
  //   localStorage.setItem('currGuess', playerTwo)
  //   currGuess = playerTwo
  // }
  // switchPlayers()
  // console.log(`current draw: `, currDraw)
  console.log('player one', playerOne)
  console.log('player 2 :', playerTwo)
  // if (currDraw === playerOne) {
  //   localStorage.setItem('currDraw', playerTwo)
  //   currDraw = playerTwo
  //   localStorage.setItem('currGuess', playerOne)
  //   currGuess = playerOne
  // } else {
  //   localStorage.setItem('currDraw', playerOne)
  //   currDraw = playerOne
  //   localStorage.setItem('currGuess', playerTwo)
  //   currGuess = playerTwo
  // }
  switchPlayers()
  setTimeout(() => {
    location.href = 'draw.html'
  }, 5000)
})
