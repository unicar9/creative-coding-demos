let particle;
let particles = [];

let tempratureSet;
let days;
let values;
let dayIndex = 0;
let count = 0;
let growing = true;
let interactionTips = `use arrow keys to check audio & visual effects 
of temprature data captured in Building 11 in`;
let dateInfo = "2021-06-01";

const colorSchemes = [
  ["#E883EB", "#F044E7", "#BD4CC7", "#9B39B3", "#8D00A3", "#AC92EB"],
  ["#a3daff", "#1ec0ff", "#0080ff", "#03a6ff", "#003399", "#4EC2E8"],
  ["#2e4500", "#466900", "#a1c323", "#b2de81", "#3e6a45", "#A0D668"],
  ["#FFEB56", "#FFC905", "#FFBA26", "#FF9D14", "#FF7000", "#FECE53"],
  ["#7e152e", "#d51600", "#e74d08", "#f42448", "#f96574", "#ED5564"],
];

function groupDataByDate(data) {
  return _.groupBy(data, item => item[0].split(" ")[0]);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  rectMode(CENTER);
  ellipseMode(CENTER);

  groupedTemperatures = groupDataByDate(data);
  tempratures = Object.values(groupedTemperatures);
  days = Object.keys(groupedTemperatures);

  console.log(days[dayIndex]);
  monoSynth = new p5.MonoSynth();
}

function draw() {
  fill("#fff");
  textSize(14);
  text(interactionTips, 50, 50);
  textSize(25);
  text(dateInfo, 50, 100);

  if (
    particles.length < tempratures[dayIndex].length &&
    frameCount % 10 === 0
  ) {
    let tempratureAtTime = tempratures[dayIndex][count];
    let hour = tempratureAtTime[0].split(" ")[1].split(":")[0];
    let beforeNoon = hour < "12";
    particles.push(new Particle(tempratureAtTime, beforeNoon));

    count++;
    growing = true;
  }

  if (particles.length === tempratures[dayIndex].length) {
    growing = false;
  }

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.display();
    particle.playSound();
    particle.updateInfo();
  }
}

function switchDay(i) {
  if (growing) return;
  dateInfo = days[i];
  if (!dateInfo) return;

  clear();
  background(0);
  particles = [];
  count = 0;

  console.log(days[i]);
}

function mousePressed() {
  dayIndex++;
  switchDay(dayIndex);
}

function keyPressed() {
  if (growing) return;

  console.log("pressed");
  if (keyCode === 39 && dayIndex < 30) {
    // left or right arrow keys
    dayIndex++;
    switchDay(dayIndex);
  }

  if (keyCode === 37 && dayIndex > 0) {
    dayIndex--;
    switchDay(dayIndex);
  }
}
