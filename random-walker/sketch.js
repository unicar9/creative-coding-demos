
const Controls = function() {
    this.minSize = 5
    this.maxSize = 20
    this.step = 5
};

const controls = new Controls()

window.onload = function() {
    const gui = new dat.GUI()
    gui.add(controls, 'minSize', 1, 10)
    gui.add(controls, 'maxSize', 20, 50)
    gui.add(controls, 'step', 1, 50)
}

// console.log('haha')
let x, y, hue
// let bricks = []
// let size

function setup() {
  createCanvas(windowWidth, windowHeight)
  x = windowWidth / 2
  y = windowHeight / 2
  rectMode('CENTER')
  colorMode(HSB)
  background(0)
}


function draw() {

  size = random(controls.minSize, controls.maxSize)
  let roundCorner = 3
  let hue = floor(random(360))
  noStroke()
  fill(hue, 40, 80)
  rect(x, y, size, size, roundCorner)
  
  let r = floor(random(4))
  
  switch(r) {
    case 0: 
      x = (x + controls.step) % windowWidth 
      break
    case 1:
      x = Math.abs( (x - controls.step) % windowWidth )
      break
    case 2:
      y = (y + controls.step) % windowHeight
      break
    case 3: 
      y = Math.abs( (y - controls.step) % windowHeight )
      break
  }

//   rect(x, y, size, size, roundCorner)

  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}