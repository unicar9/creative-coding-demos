let table;

// // let data;
// const airTemperature = JSON.parse(data);
// console.log("airTemperature: ", airTemperature);

// const data = JSON.parse(window.airtemperature);
// console.log("data: ", data);

function groupDataByDate(data) {
  return _.groupBy(data, (item) => item[0].split(" ")[0]);
}

function setup() {

  createCanvas(window.innerWidth, window.innerHeight);

  groupDataByDate(data);
}

function draw() {
  // clear();
  // noStroke();
  // background(0);
  // fill("#fff");
  // text("Click anywhere on the screen to make sound", 50, 50);
  // translate(width / 2, height / 2);
  // blob.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
