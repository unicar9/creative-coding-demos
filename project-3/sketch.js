let images = [];

let thumbnails = [];
let graphics = [];

const bgColor = "#2A1C52";
const planeStroke = "#f800b7";

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
}

let angle = 0;

function draw() {
  background(bgColor);
  // textSize(24);
  // textAlign(CENTER);
  // text("Drag an image file onto the canvas.", width / 2, height / 2);
  // ambientLight(255);
  // pointLight(0, 255, 255, 100, 100, 100);
  // directionalLight(250, 250, 250, 100, 100, -0.5);

  thumbnails.forEach((img, i) => {
    image(img.img, i * 210, -150, img.w, img.h);
  });

  if (!startAnimation) return;
  ambientLight("#EA7851");
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  pointLight(250, 250, 250, locX, locY, 100);

  // ambientMaterial(243, 155, 32);
  fill(243, 155, 32);

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
      stroke(planeStroke);
      strokeWeight(2);
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

    fill("yellow");
    rect(x, height * 0.35, 10, y * scale);
    xoff += 0.1;
  }

  yoff += 0.003;
  // image(pg, -width / 2, 0, windowWidth, windowHeight);

  // the glitched images
  graphics.forEach((g, i) => {
    let img = images[i];
    img.drawGlitch(g);
    image(g, img.posX, img.posY);
  });

  // images.forEach(i => {
  //   if (i) {
  //     i.drawGlitch();
  //   }
  // });
  // the glitched images
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

windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  background(bgColor);
};
