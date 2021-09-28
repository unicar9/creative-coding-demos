let table;
let tempratureSet;
let particles = [];

let mX = 0,
  mY = 0;

let destX = 100,
  destY = 100;

class Particle {
  constructor(pos, dest, offset) {
    this.pos = pos.copy();
    this.dest = dest.copy();
    this.vel = createVector();
    this.acc = dest.copy().sub(pos).setMag(1);
    this.c = color("#e2e");
    this.offset = offset;
    this.size = 0;
    this.maxSize = random(20, 30);
  }

  display() {
    fill(this.c);
    // noStroke();
    stroke("#fff");
    strokeWeight(1);
    if (this.size < this.maxSize) {
      this.size = lerp(this.size, this.maxSize, 0.005 * this.offset);
    }
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  isCaptured() {
    let distance = dist(this.pos.x, this.pos.y, this.dest.x, this.dest.y);
    if (distance < 50) {
      return true;
    }
  }

  update() {
    if (this.isCaptured()) {
      this.acc.setMag(0);
      this.c = color("#00ff00");
      this.vel.add(p5.Vector.random2D());
      this.vel.limit(0.7);
    } else {
      this.acc.add(this.dest.copy().sub(this.pos).setMag(1));
      this.acc.add(p5.Vector.random2D().mult(2));
      this.vel.add(this.acc);
      this.vel.limit(2);
    }

    this.pos.add(this.vel);
  }
}

function groupDataByDate(data) {
  return _.groupBy(data, item => item[0].split(" ")[0]);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // frameRate(16);
  ellipseMode(CENTER);
  tempratureSet = groupDataByDate(data);
}

function draw() {
  background(0);
  fill("#fff");
  ellipse(100, 100, 40, 40);
  stroke("#fff");

  strokeWeight(3);
  line(100, 100, mX, mY);
  particles.forEach(d => {
    d.display();
    d.update();
  });
}

function mousePressed() {
  mX = mouseX;
  mY = mouseY;
  tempratureSet["2021-06-02"].forEach((_, i) => {
    particles.push(
      new Particle(createVector(mouseX, mouseY), createVector(destX, destY), i)
    );
  });
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
