class Particle {
  constructor(noiseOff, targetSize, beforeNoon) {
    let x = map(noise(random(100)), 0, 1, 0, windowWidth);
    let y = map(noise(random(100)), 0, 1, 0, windowHeight);
    this.pos = createVector(x, y);
    this.target = createVector(
      this.pos.x + random(-100, 100),
      this.pos.y + random(-100, 100)
    );
    this.size = 1;
    this.sizeTarget = targetSize / 2;
    this.beforeNoon = beforeNoon;

    // console.log(
    //   "Math.floor(map(targetSize, 15, 28, 0, 4)): ",
    //   map(targetSize, 15, 28, 0, 4)
    // );
    this.col = random(colorSchemes)[Math.floor(map(targetSize, 15, 32, -1, 4))];
  }

  display() {
    fill(this.col);
    noStroke();
    if (this.beforeNoon) {
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    } else {
      rect(this.pos.x, this.pos.y, this.size, this.size);
    }

    this.pos = this.pos.lerp(this.target, 0.1);
    let t = map(sin(frameCount * 0.05), -1, 1, 0.01, 0.02);
    this.size = lerp(this.size, this.sizeTarget, t);
    // if (dist(this.pos.x, this.pos.y, mouseX, mouseY) < 10) {
    //   this.size = lerp(this.size, this.sizeTarget * 6, 0.4);
    // }
  }
}
