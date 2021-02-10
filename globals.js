const playBtn = document.getElementById('play-btn')
const submitBtn = document.querySelector('.submit-btn')
const nameForm = document.querySelector('#whats-my-name')
const playerOneInput = document.getElementById('player-input-one')
const playerTwoInput = document.getElementById('player-input-two')
const player = document.querySelector('.player')

// const playerOne = localStorage.getItem(playerOneInput.value)
// const playerTwo = localStorage.getItem(playerTwoInput.value)

if (playBtn) {
  playBtn.addEventListener('click', () => {
    console.log('click')
    location.href = 'draw.html'
  })
}

nameForm.addEventListener(
  'submit',
  (e) => {
    e.preventDefault()
    if (playerOneInput < 1 || playerTwoInput < 1) return
    // scoreOne.innerHTML = playerOneInput.value
    // scoreTwo.innerHTML = playerTwoInput.value
    localStorage.setItem('playerOne', playerOneInput.value)
    localStorage.setItem('playerTwo', playerTwoInput.value)
  },
  false
)
