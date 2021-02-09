const doneBtn = document.querySelector('.check')
const againBtn = document.querySelector('.again')

doneBtn.addEventListener('click', () => {
  console.log('click')
  location.href = 'scores.html'
  //if player 1 draws add a point to player 2
  //else add a point to player 1
})

againBtn.addEventListener('click', () => {
  location.href = 'draw.html'
})
