console.log('hello world')

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed')
})

const canvas = document.getElementById('paint')
const instructions = document.querySelector('.instructions')

let ctx = canvas.getContext('2d')
console.log(ctx)
let pos = { x: 0, y: 0 }

const setPos = (e) => {
  pos.x = e.clientX
  pos.y = e.clientY
}

const draw = (e) => {
  ctx.beginPath()
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  // ctx.strokeStyle =

  ctx.moveTo(pos.x, pos.y)
  ctx.lineTo(pos.x, pos.y)

  ctx.stroke()
}

canvas.addEventListener('click', draw)
canvas.addEventListener('mousedown', setPos)
canvas.addEventListener('mouseenter', setPos)
