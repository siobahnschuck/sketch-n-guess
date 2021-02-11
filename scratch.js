// const { default: Picker } = require('vanilla-picker')

console.log('hello world')
const canvas = document.getElementById('paint')
const instructions = document.querySelector('.instructions')
const pickerContainer = document.querySelector('#color')
const picker = new Picker(pickerContainer)

const ctx = canvas.getContext('2d')
console.log(ctx)

const pos = { x: 0, y: 0 }

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect()
  pos.x = event.clientX - rect.left
  pos.y = event.clientY - rect.top
  console.log(`coordinate ${x}, ${y}`)
}

console.log(getMousePosition())
// const setPosition = (e) => {
//   pos.x = e.clientX
//   pos.y = e.clientY
// }

const draw = (e) => {
  ctx.beginPath()
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'blue'

  // picker.onChange = function (color) {
  //   pickerContainer.style.background = color.rgbaString
  // }
  ctx.moveTo(pos.x, pos.y)
  getMousePosition(canvas, e)
  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
}
console.log(draw())
canvas.addEventListener('click', draw)
// canvas.addEventListener('mousedown', getMousePosition)
// canvas.addEventListener('mouseenter', getMousePosition)


//timer stuff 

<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<g class="base-timer__circle">
<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
</g>
</svg>


// const startTimer = () => {
//   // clearInterval(timerInterval)
//   // location.href = 'guess.html'
//   timerInterval = setInterval(() => {
//     timePassed = timePassed += 1
//     timeLeft = timeLimit - timePassed
//     document.getElementById('base-timer-label').innerHTML = formatTime(timeLeft)
//     if (timeLeft == 0) {
//       clearInterval(timeInterval)
//     }
//   }, 1000)
// }

// startTimer()

timer.innerHTML = `<span id="base-timer-label" class="base-timer__label">
${formatTime(timeLeft)}
</span>`

// let timePassed = 0
// let timeLeft = timeLimit
// let timeInterval = null


//dictionary 


const WordPOS = require('wordpos'),
  wordpos = new WordPOS()

let nouns = wordpos.getNouns(
  'cow dog fish bear jellyfish book magazine bunny frog tractor car truck toilet sandwich watch spaghetti chair skateboard'
)

'cow dog fish bear jellyfish book magazine bunny frog tractor car truck toilet sandwich watch spaghetti chair skateboard'


const urlElem =
  'https://www.dictionaryapi.com/api/v3/references/sd2/json/school?key='
const apiKeyElem = '86e897cb-447f-4098-8a85-908928a1103e'
const urlInter =
  'https://www.dictionaryapi.com/api/v3/references/sd3/json/dragon?key='
const apiKeyInter = 'b987e98c-94c8-4ed2-95e3-e03337c51913'