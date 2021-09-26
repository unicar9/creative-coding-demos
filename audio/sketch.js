let radius, blob, tSpeed, blobHue, env, delay, osc;
let notes = [57, 59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76];

let attackLevel = 1.0;
let releaseLevel = 0;
let attackTime = 0.001;
let decayTime = 0.2;
let susPercent = 0.2;
let releaseTime = 0.5;

class Blob {
  constructor(offset, scale, x, y) {
    this.offset = offset;
    this.scale = scale;
    this.x = x;
    this.y = y;
    this.t = 0;
    this.s = 0;
  }

  display() {
    push();
    translate(this.x, this.y);

    this.s = lerp(this.s, 1, 0.07);
    scale(this.s);

    noiseDetail(2, 0.5);

    new Array(10).fill(1).map((_, i) => {
      const a = 1 - i * 0.1;
      const blobColor = color(blobHue, 80, 80, a);
      fill(blobColor);

      drawBlobShape(radius + i * 30, this.offset, this.scale, this.t);
    });

    this.t += tSpeed;
    pop();
  }
}

function drawBlobShape(radius, offset, scale, t) {
  beginShape();
  for (let i = 0; i < TWO_PI; i += radians(1)) {
    let x = offset * cos(i) + offset;
    let y = offset * sin(i) + offset;

    let r = radius + map(noise(x, y, t), 0, 1, -scale, scale);

    let x1 = r * cos(i);
    let y1 = r * sin(i);

    vertex(x1, y1);
  }
  endShape();
}

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight);

  colorMode(HSB);

  tSpeed = random(0.02, 0.08);
  const offset = random(0.2, 0.9);
  const scale = random(20, 80);

  blobHue = 0;
  radius = 150;
  blob = new Blob(offset, scale, 0, 0);

  env = new p5.Envelope();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  osc = new p5.TriOsc();
  delay = new p5.Delay();

  cnv.mousePressed(playSound);
}

function draw() {
  clear();
  noStroke();
  background(0);
  fill("#fff");
  text("Click anywhere on the screen to make sound", 50, 50);

  translate(width / 2, height / 2);
  blob.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playSound() {
  const w = width / notes.length;
  let note = notes[Math.floor(mouseX / w)];

  let f = map(mouseY, 0, height, 0.1, 0.7);
  let delayTime = map(mouseY, 0, height, 0.1, 0.5);

  osc.freq(midiToFreq(note));
  // control how fast the blob changes its shape
  tSpeed = map(mouseY, 0, height, 0.02, 0.2);
  // control the color of the blob
  blobHue = map(note, 57, 76, 0, 360);
  // control the size of the blob
  radius = map(note, 57, 76, 20, 200);

  osc.start();
  osc.amp(env);
  delay.process(osc, delayTime, f, 1300);
  env.play(osc, 0, 0.1);
}
