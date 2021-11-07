let images = [];
let stars = [];

let thumbnails = [];
let graphics = [];

const bgColors = ["#2A1C52", "#7027A0", "#120358", "#3B1449"];
const planeStrokeColors = ["#f800b7", "#09CDFE", "#FF76FF", "#1481EF"];
const moonColors = ["#f4631f", "#C32BAD", "#FF124F", "#ED2685"];
const musicBarColors = ["#03B3FE", "#FFF338", "#0CECDD", "#F1E52A"];

let colorIndex = 0;

let bgColor = bgColors[colorIndex];
let planeStroke = planeStrokeColors[colorIndex];
let moonColor = moonColors[colorIndex];
let musicBarColor = musicBarColors[colorIndex];

let mic;
let pg;

let yoff = 0.0;

let startAnimation = false;

function preload() {}

function setup() {
  // create canvas
  const c = createCanvas(windowWidth, windowHeight, WEBGL);
  pg = createGraphics(windowWidth, windowHeight);
  // background(bgColor);

  // Add an event for when a file is dropped onto the canvas
  c.drop(gotFile);
  userStartAudio();

  // create a mic audio input
  mic = new p5.AudioIn();
  mic.start();

  for (var i = 0; i < 200; i++) {
    stars[i] = new Star();
  }
}

let angle = 0;

function draw() {
  background(bgColor);

  thumbnails.forEach((img, i) => {
    image(img.img, i * 210 - 2 / width, -150, img.w, img.h);
  });

  if (!startAnimation) return;
  ambientLight(200);
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  pointLight(250, 250, 250, locX, locY, 100);

  // ambientMaterial(243, 155, 32);
  fill(moonColor);

  // ambientMaterial(70, 130, 230);
  push();
  translate(0, -100);
  noStroke();

  sphere(100);
  pop();

  angle += 0.05;

  // the plane
  push();
  translate(-width / 2, height * 0.35);
  rotateX(PI / 2);

  for (let x = 0; x < width + 35; x += 35) {
    for (let y = 0; y < 300; y += 35) {
      push();
      translate(x, y);
      noFill();

      strokeWeight(2);
      stroke(planeStroke);

      rect(0, 0, 35);
      pop();
    }
  }
  pop();
  // the plane

  // graphics (audio visulisor)
  let vol = mic.getLevel();
  let scale = map(vol, 0, 1, 0.5, 1);
  // pg.background(bgColor);
  let xoff = 0;
  for (let x = -width / 2; x <= width / 2; x += 30) {
    let y = map(noise(xoff, yoff), 0, 1, -80, -300);

    fill(musicBarColor);
    noStroke();
    rect(x, height * 0.35, 10, y * scale);
    xoff += 0.1;
  }

  yoff += 0.003;

  // the glitched images
  graphics.forEach((g, i) => {
    let img = images[i];
    img.drawGlitch(g);
    image(g, img.posX, img.posY);
  });

  push();
  translate(-width / 2, -height / 2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].drawStar();
    stars[i].blink();
  }
  pop();

  rotateBox();
}

function gotFile(file) {
  let positionX = random(-0.5 * windowWidth, 0.5 * windowWidth - 300);
  let positionY = random(-0.5 * windowHeight, 0.1 * windowHeight - 400);
  // If it's an image file
  if (file.type === "image") {
    // Create an image DOM element but don't show it
    let img = createImg(file.data, "statue", "anonymous", () => {
      // Draw the image onto the canvas
      let imgW = 200;
      let imgH = (200 * img.height) / img.width;
      // image(img, positionX, positionY, imgW, imgH);
      thumbnails.push({ img: img, w: imgW, h: imgH });
      images.push(new GlitchedImage(img, positionX, positionY, imgW, imgH));
      const pGraphic = createGraphics(imgW, imgH);
      graphics.push(pGraphic);
    });
  } else {
    console.log("Not an image file!");
  }
}

function rotateBox(num) {
  push();
  rotateY(angle * 0.3); //rotate together
  //three layers boxes with different moving speed
  for (let i = 0; i < num; i++) {
    rotateY((PI * 2) / num);
    push();
    translate(0, -100, 130 + cos(index + mouseX / 400) * 180);
    rotateY(angle * 0.5);
    rotateX(angle * 0.2);
    rotateZ(angle * 0.4);
    box(2, 2, 60);
    pop();
  }
}

windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  background(bgColor);
};
