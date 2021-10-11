console.log("haha");

let img;

const maxXChange = 120;
const maxYChange = 5;
const yNoiseChange = 0.01;
const mouseYNoiseChange = 0.3;
const timeNoiseChange = 0.013;

let inverted = false;

function setup() {
  // create canvas
  imageMode(CENTER);
  const c = createCanvas(windowWidth, windowHeight);
  background(100);
  // Add an event for when a file is dropped onto the canvas
  c.drop(gotFile);
}

function draw() {
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text("Drag an image file onto the canvas.", width / 2, height / 2);
  //   noLoop();

  frameRate(15);
  if (img) {
    drawStreak();
  }
}

function gotFile(file) {
  // If it's an image file
  if (file.type === "image") {
    // Create an image DOM element but don't show it
    img = createImg(file.data, "statue").hide();
    // Draw the image onto the canvas
    // console.log(img.width, img.height);
    image(img, width / 2, height / 2, img.width, img.height);
  } else {
    console.log("Not an image file!");
  }
}

function drawStreak() {
  push();
  translate(width / 2, height / 2);
  let y = floor(random(img.height));
  let h = floor(random(20, 30));
  let xChange = floor(random(-maxXChange / 5, maxXChange / 5));
  let yChange = floor(xChange / 5);

  // inverted = false;

  let dy = y - img.height / 2;
  //   imageMode(CENTER);

  image(img, xChange, dy, img.width, h, 0, y, image.width, h);

  pop();
}
