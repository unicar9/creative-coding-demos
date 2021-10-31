let webcam, box;
let hue = 0;

const webcamWidth = 640;
const webcamHeight = 480;
const boxSize = 480;

function setup() {
  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);
  colorMode(HSB, 360, 100, 100);

  webcam = createCapture(VIDEO);
  webcam.size(webcamWidth, webcamHeight);
  webcam.hide();

  box = createGraphics(boxSize, boxSize);
}

function draw() {
  hue += 1;

  background(hue % 360, map(mouseY, 0, height, 50, 100), 67);
  translate(width / 2, height / 2);
  scale(-1, 1);

  webcam.loadPixels();
  image(box, 0, 0);
  tint((hue + 180) % 360, map(mouseY, 0, height, 50, 100), 67);

  for (var y = 0; y < webcamHeight; y += 5) {
    for (var x = 0; x < webcamWidth; x += 5) {
      let index = (x + y * webcam.width) * 4;
      let r = webcam.pixels[index + 0];
      let g = webcam.pixels[index + 1];
      let b = webcam.pixels[index + 2];

      box.fill(r, g, b);
      box.noStroke();
      box.ellipse(
        x,
        y,
        map(mouseX, 0, width, 10, 160),
        map(mouseX, 0, width, 20, 50)
      );
    }
  }
}

windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  background(hue);
};
