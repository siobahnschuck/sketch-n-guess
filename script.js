/// script for draw and guess html

// window.addEventListener('load', countDown)

//global variables
const checkBtn = document.querySelector('.check')
const colorContainer = document.querySelector('#color')
const canvas = document.getElementById('paint')
const counter = document.querySelectorAll('.counter')
const picker = new Picker(colorContainer)
const sketchContainer = document.querySelector('.container')

let painting = false
const ctx = canvas.getContext('2d')
// sketchContainer.style.height = '100%'
// let sketchStyle = window.getComputedStyle(sketchContainer)
// canvas.height = parseFloat(
//   sketchStyle.getPropertyValue('height').split('px')[0]
// )
// canvas.width = parseFloat(sketchStyle.getPropertyValue('width').split('px')[0])
// console.log(sketchStyle.getPropertyValue('width'))

//functions
canvas.height = window.innerHeight
canvas.width = window.innerWidth

let timeLeft = 30
const countDown = () => {
  if (timeLeft === 0) {
    //function to move canvas to guess.html
  } else {
    counter.innerHTML = `:${timeLeft}`
    timeLeft--
  }
}

const startPos = (e) => {
  painting = true
  draw(e)
}

const endPos = () => {
  painting = false
  ctx.beginPath()
}

const draw = (e) => {
  if (!painting) return
  ctx.lineWidth = 10
  ctx.lineCap = 'round'

  ctx.lineTo(e.clientX, e.clientY)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(e.clientX, e.clientY)
}

//event listeners
canvas.addEventListener('mousedown', startPos)
canvas.addEventListener('mouseup', endPos)
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('click', countDown)
