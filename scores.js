const playerOneFinal = document.querySelector('.player1')
const playerTwoFinal = document.querySelector('.player2')
const againBtn = document.querySelector('.again')

let playerOneScore = localStorage.getItem('playerOneScore')
let playerTwoScore = localStorage.getItem('playerTwoScore')
let playerOne = localStorage.getItem('playerOne')
let playerTwo = localStorage.getItem('playerTwo')
let currDraw = localStorage.getItem('currDraw')
let currGuess = localStorage.getItem('currGuess')

playerOneFinal.innerText = `${playerOne} : ${playerOneScore}`
playerTwoFinal.innerText = `${playerTwo} : ${playerTwoScore}`
// ${playerOneScore}${playerTwoScore}
if (againBtn) {
  againBtn.addEventListener('click', () => {
    if (currDraw === playerOne) {
      localStorage.setItem('currDraw', playerTwo)
      currDraw = playerTwo
      localStorage.setItem('currGuess', playerOne)
      currGuess = playerOne
    } else {
      localStorage.setItem('currDraw', playerOne)
      currDraw = playerOne
      localStorage.setItem('currGuess', playerTwo)
      currGuess = playerTwo
    }
    location.href = 'draw.html'
  })
}
