class Particle {
  constructor(targetSize, beforeNoon) {
    let x = map(noise(random(100)), 0, 1, 0, windowWidth);
    let y = map(noise(random(100)), 0, 1, 0, windowHeight);
    this.pos = createVector(x, y);

    this.size = 1;
    this.sizeTarget = targetSize / 2;
    this.beforeNoon = beforeNoon;
    this.played = false;

    if (this.beforeNoon) {
      this.target = createVector(this.pos.x, this.pos.y - random(50, 100));
    } else {
      this.target = createVector(this.pos.x, this.pos.y + random(50, 100));
    }

    this.col = random(
      colorSchemes[Math.round(map(targetSize, 17, 30, -1, 4.5))]
    );
  }

  display() {
    fill(this.col);
    noStroke();

    if (this.beforeNoon) {
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    } else {
      rect(this.pos.x, this.pos.y, this.size, this.size);
    }

    let t = map(sin(frameCount * 0.05), -1, 1, 0.01, 0.02);
    this.pos = this.pos.lerp(this.target, 0.1);
    this.size = lerp(this.size, this.sizeTarget, t);

    // let note = random(["Fb4", "G4"]);
    // // note velocity (volume, from 0 to 1)
    // let velocity = random();
    // // time from now (in seconds)
    // let time = 0;
    // // note duration (in seconds)
    // let dur = 1 / 6;

    // if (!this.played) {
    //   monoSynth.play(note, velocity, frameCount / 2, dur);
    //   this.played = true;
    // }
  }
}
