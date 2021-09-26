const NUM_LINES = 25;
let t = 0;
let n = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
}

function draw() {
  background(20);
  stroke("#79FF01");
  // stroke("#fff205");

  strokeWeight(3);

  translate(width / 2, height / 2);

  for (i = 0; i < NUM_LINES; i++) {
    noFill();
    push();
    rotate((t * i) / 1000);
    rect(x1(t + i), y1(t + i), x2(t + i), y2(t + i));

    pop();
  }
  t += 0.09;
}

const x1 = (t) => {
  return sin(t / controls.x1Param1) * controls.x1Param2;
};

const x2 = (t) => {
  return cos(t / controls.x2Param1) * controls.x2Param1;
};

const y1 = (t) => {
  return sin(t / controls.y1Param1) * controls.y1Param2;
};

const y2 = (t) => {
  return cos(t / controls.y2Param1) * controls.y1Param2;
};

const Controls = function () {
  this.x1Param1 = 5;
  this.x1Param2 = 100;
  this.x2Param1 = 50;
  this.x2Param2 = 100;
  this.y1Param1 = 50;
  this.y1Param2 = 100;
  this.y2Param1 = 5;
  this.y2Param2 = 100;
};

const controls = new Controls();
console.log("controls: ", controls);
let pauseCtrl;

window.onload = function () {
  const gui = new dat.GUI();
  gui.add(controls, "x1Param1", 1, 100);
  gui.add(controls, "x1Param2", 100, 200);
  gui.add(controls, "x2Param1", 1, 100);
  gui.add(controls, "x2Param2", 100, 200);
  gui.add(controls, "y1Param1", 1, 100);
  gui.add(controls, "y1Param2", 100, 200);
  gui.add(controls, "y2Param1", 1, 100);
  gui.add(controls, "y2Param2", 100, 200);
};
