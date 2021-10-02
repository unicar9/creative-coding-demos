let monoSynth;
const notes = [
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C5",
  "D5",
  "E5",
  "F5",
  "G5",
  "A5",
  "B5",
];

const emojis = ["☁️", "🌥", "⛅️", "🌤", "☀️"];

const timeInfo = document.getElementById("time");
const degreeInfo = document.getElementById("degree");

class Particle {
  constructor(tempratureAtTime, beforeNoon) {
    let x = map(noise(random(100)), 0, 1, 0, windowWidth);
    let y = map(noise(random(100)), 0, 1, 0, windowHeight);
    this.pos = createVector(x, y);

    this.time = tempratureAtTime[0].split(" ")[1];
    this.degree = tempratureAtTime[1];
    this.beforeNoon = beforeNoon;

    this.size = 1;
    this.sizeTarget = this.degree / 2;
    this.played = false;

    if (this.beforeNoon) {
      this.target = createVector(this.pos.x, this.pos.y - random(50, 100));
    } else {
      this.target = createVector(this.pos.x, this.pos.y + random(50, 100));
    }

    this.col = random(
      colorSchemes[Math.round(map(this.degree, 17, 30, -1, 4.5))]
    );

    this.note = notes[Math.round(map(this.degree, 17, 30, -1, 14.5))];
    this.emoji = emojis[Math.round(map(this.degree, 17, 30, -1, 4.5))];
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
  }

  playSound() {
    // note velocity (volume, from 0 to 1)
    let velocity = random() * 0.5;
    // time from now (in seconds)
    let time = 0;
    // note duration (in seconds)
    let dur = 1 / 10;

    if (!this.played) {
      monoSynth.play(this.note, velocity, time, dur);
      this.played = true;
    }
  }

  updateInfo() {
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) < 10) {
      timeInfo.textContent = `${this.time.split(":")[0]}:${
        this.time.split(":")[1]
      } ${this.beforeNoon ? `AM` : `PM`}`;
      degreeInfo.textContent = `${this.degree} °C ${this.emoji}`;
    }
  }
}
