let img
let w = window.innerWidth, h = window.innerHeight
let system

let colors
let currentColor = 0

//#D3B465: gold
//#E54B4E: red
//#FF5E7F: hot pink
//#FFB1B6: pink
//#EFC78F: light gold


class PiggyParticle {
  
  constructor(pos){
    this.pos = pos.copy()
    this.acc = createVector(0.1, 0.1)
    this.velocity = createVector(random(-5, 5), random(-5, 5))
    this.offset = this.velocity.mult(1.1)
    this.sizeMax = random(30, 50)
    this.size = this.sizeMax  
  }

  run() {
    this.update()
    this.display()
  }

  update() {
    this.velocity.add(this.acc)
    this.pos.add(this.velocity)
    let updatedOffset = createVector(10 * (noise(this.offset.x) - .5), 10 * (noise(this.offset.y) - .5))
    this.pos.add(updatedOffset)
    this.size -= .7
  }

  display() {
 
    let c = colors[(currentColor + 1) % 6]
    if (this.size < this.sizeMax / 1.2) {
      c.setAlpha(map(this.size, this.sizeMax / 1.2, 10, 255, 0))
    } else {
      c.setAlpha(255)
    }
    tint(c)
    fill(c)
    noStroke()
    image(img, this.pos.x, this.pos.y, this.size, this.size)
    // ellipse(this.pos.x + this.offset.x, this.pos.y + this.offset.y, this.size, this.size)
  }

  isDead() {
    return this.size < 10 ? true : false
  }
}

class PiggyParticleSystem {
  constructor(pos) {
    this.origin = pos.copy()
    this.particles = []
  }

  addPiggy() {
    this.particles.push( new PiggyParticle(this.origin) )
  }

  run() {

    for(let i = this.particles.length - 1; i > 0; i--) {
      let p = this.particles[i]
      p.run()
      if (p.isDead()) {
        this.particles.splice(i, 1)
      }
    }
  }

}

function preload() {
  img = loadImage('ppp-white.jpg')
}

function setup() {
  createCanvas(w, h)
  colors = [color('#FF5E7F'), color('#EFC78F'), color('#DEB97E'), color('#E54B4E'), color('#FFB1B6'), color('#FF5E7F')]
  system = new PiggyParticleSystem(createVector(w/2, h/2))
}

function draw() {
  background(colors[currentColor % 6])
  system.addPiggy()
  system.run()
}

function mouseClicked() {
  system.origin = createVector(mouseX, mouseY)
  currentColor += 2
}
