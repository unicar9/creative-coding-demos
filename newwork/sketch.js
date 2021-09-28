let particle;
let particles = [];

let tempratureSet;
let days;
let values;

let dayIndex = 0;

let colors = [
  "#7209b7",
  "#3a0ca3",
  "#4361ee",
  "#4cc9f0",
  "#ef476f",
  "#ffd166",
  "#06d6a0",
  "#118ab2",
  "#073b4c",
  "#ffffff",
];

const colorSchemes = [
  ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"],
  ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"],
  ["#fdc5f5", "#f7aef8", "#b388eb", "#8093f1", "#72ddf7"],
];

function groupDataByDate(data) {
  return _.groupBy(data, item => item[0].split(" ")[0]);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //   colorMode(HSB);
  background(0);
  shuffle(colors, true);

  rectMode(CENTER);
  ellipseMode(CENTER);

  tempratureSet = groupDataByDate(data);
  values = Object.values(tempratureSet);
  days = Object.keys(tempratureSet);
  //   for (let i = 0; i < 5; i++) {
  //     let p = new Particle(10);
  //     particles.push(p);
  //   }
  console.log(days[dayIndex]);
}

let count = 0;
let growing = true;
let x = "hello";
let info = "";

function draw() {
  // background(0);
  fill("#fff");
  textSize(32);
  text(x, 100, 100);
  text(info, width - 300, 100);
  if (particles.length < values[dayIndex].length) {
    let v = values[dayIndex][count];
    let h = v[0].split(" ")[1].split(":")[0];

    let beforeNoon = h < "12";
    particles.push(new Particle(0, v[1], beforeNoon));
    count++;
    growing = true;
  } else {
    growing = false;
  }

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.display();
  }
}

function mousePressed() {
  if (growing) return;
  clear();
  background(0);
  particles = [];
  count = 0;
  dayIndex++;
  x = days[dayIndex];
  console.log(days[dayIndex]);
}
