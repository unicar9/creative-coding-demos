function addDots(dataSet, x, y) {
  dataSet.forEach(d => {
    const offSetX = random(-30, 30);
    const offSetY = random(-30, 30);
    const newDot = new Dot(
      createVector(x + offSetX, y + offSetY),
      createVector(x, y)
    );
    dots.push(newDot);
  });
}

function addSingleDot(x, y) {
  const newDot = new Dot(createVector(x, y));
  dots.push(newDot);
}

class Dot {
  constructor(position, center) {
    this.position = position.copy();
    this.size = random(5, 20);
    this.velocity = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.acceleration = createVector();
    this.center = center.copy();
  }

  display() {
    let mag = this.velocity.copy().setMag(40);
    // stroke("#000");
    // strokeWeight(5);
    // line(
    //   this.position.x,
    //   this.position.y,
    //   this.position.x + mag.x,
    //   this.position.y + mag.y
    // );

    // noStroke();
    noFill();
    stroke("#22f2e");
    fill("#F0A500");

    ellipse(this.position.x, this.position.y, this.size);
  }

  getForceByOthers() {}

  getForceByCenter() {
    let f = createVector(0, 0);
    let distance = dist(
      this.position.x,
      this.position.y,
      this.center.x,
      this.center.y
    );
    if (distance < 1) distance = 1;
    let force = ((distance - 9) * (this.size / 100000)) / distance;

    let dir = this.center.copy().sub(this.position);
    f = dir.mult(force);

    return f;
  }

  update() {
    let f = this.getForceByCenter();
    this.acceleration.add(f);
    this.velocity.add(this.acceleration);
    this.velocity.add(p5.Vector.random2D());
    this.velocity.limit(0.8);
    this.position.add(this.velocity);
  }
}
