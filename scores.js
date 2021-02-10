const scoreOne = document.querySelector('.player1')
const scoreTwo = document.querySelector('.player2')
const againBtn = document.querySelector('.again')

let playerOneScore = localStorage.getItem('playerOneScore')
let playerTwoScore = localStorage.getItem('playerTwoScore')

let playerOne = localStorage.getItem('playerOne')
let playerTwo = localStorage.getItem('playerTwo')
let curr = localStorage.getItem('curr')
scoreOne.innerHTML = `${playerOne} : ${playerOneScore}`
scoreTwo.innerHTML = `${playerTwo} : ${playerTwoScore}`
// ${playerOneScore}${playerTwoScore}
if (againBtn) {
  againBtn.addEventListener('click', () => {
    location.href = 'draw.html'
    curr = playerTwo
  })
}
