class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(0.25, 2);
    this.t = random(TAU);
  }

  drawStar() {
    stroke("#fff");
    point(this.x, this.y);
  }

  blink() {
    this.t += 0.1;
    var scale = this.size + sin(this.t) * 2;
    strokeWeight(scale);
  }
}
