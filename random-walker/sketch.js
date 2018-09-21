window.onload = function() {
    // var text = new FizzyText();
    var gui = new dat.GUI();
    gui.add(text, 'message');
    gui.add(text, 'speed', -5, 5);
    gui.add(text, 'displayOutline');
    gui.add(text, 'explode');
};


console.log('haha')
let x,y, hue
let bricks = []
let size

function setup() {
  createCanvas(windowWidth, windowHeight)
  x = windowWidth / 2
  y = windowHeight / 2
  rectMode('CENTER')
  colorMode(HSB)
}


function draw() {
  background(0)
  size = random(10, 50)
  let roundCorner = 3
  let hue = floor(random(360))
  let r1 = floor(random(2))
  let brick = {x: x, y: y, size: size, hue: hue, fill: r1}
  bricks.push(brick)

  if (bricks.length > 50) {
    bricks.shift()
  }

  let step = 40

  
  noFill()

  // strokeWeight(floor(random(1, 10)))
  // rect(x, y, size, size, roundCorner)
  
  let r = floor(random(4))
  
  switch(r) {
    case 0: 
      x = x + step
      break
    case 1:
      x = x - step
      break
    case 2:
      y = y + step
      break
    case 3: 
      y = y - step
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