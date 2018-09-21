
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
let bricks = []
// let size

function setup() {
  createCanvas(windowWidth, windowHeight)
  x = windowWidth / 2
  y = windowHeight / 2
  rectMode('CENTER')
  colorMode(HSB)
}


function draw() {
  background(0)
  size = random(controls.minSize, controls.maxSize)
  let roundCorner = 3
  let hue = floor(random(360))
  let r1 = floor(random(2))
  let brick = {x: x, y: y, size: size, hue: hue, fill: r1}
  bricks.push(brick)

  if (bricks.length > 50) {
    bricks.shift()
  }

//   let step = 40

  
  noFill()

  // strokeWeight(floor(random(1, 10)))
  // rect(x, y, size, size, roundCorner)
  
  let r = floor(random(4))
  
  switch(r) {
    case 0: 
      x = (x + controls.step) % windowWidth 
      break
    case 1:
      x = (x - controls.step) % windowWidth 
      break
    case 2:
      y = (y + controls.step) % windowHeight
      break
    case 3: 
      y = (y - controls.step) % windowHeight
      break
  }


  bricks.forEach((b) => {
    if (b.fill) {
      fill(b.hue, 49, 80)
    }

    stroke(b.hue, 49, 80)

    rect(b.x, b.y, b.size, b.size, roundCorner)
  })
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}