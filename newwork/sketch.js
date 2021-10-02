let particle;
let particles = [];

let tempratureSet;
let days;
let values;

let dayIndex = 0;

const infoPanel = document.getElementById("infoPanel");

const colorSchemes = [
  ["#E883EB", "#F044E7", "#BD4CC7", "#9B39B3", "#8D00A3", "#AC92EB"],
  ["#a3daff", "#1ec0ff", "#0080ff", "#03a6ff", "#003399", "#4EC2E8"],
  ["#2e4500", "#466900", "#a1c323", "#b2de81", "#3e6a45", "#A0D668"],
  ["#FFEB56", "#FFC905", "#FFBA26", "#FF9D14", "#FF7000", "#FECE53"],
  ["#7e152e", "#d51600", "#e74d08", "#f42448", "#f96574", "#ED5564"],
];

// ["#E883EB", "#F044E7", "#BD4CC7", "#9B39B3", "#8D00A3", "#AC92EB"],
// ["#a3daff", "#1ec0ff", "#0080ff", "#03a6ff", "#003399", "#4EC2E8"],
// ["#2e4500", "#466900", "#a1c323", "#b2de81", "#3e6a45", "#A0D668"],
// ["#FFEB56", "#FFC905", "#FFBA26", "#FF9D14", "#FF7000", "#FECE53"],
// ["#7e152e", "#d51600", "#e74d08", "#f42448", "#f96574", "#ED5564"],

function groupDataByDate(data) {
  const min = _.minBy(data, item => item[1]);
  console.log("min: ", min);
  const max = _.maxBy(data, item => item[1]);
  console.log("max: ", max);
  return _.groupBy(data, item => item[0].split(" ")[0]);
}

// let monoSynth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  rectMode(CENTER);
  ellipseMode(CENTER);

  // cnv.mousePressed(playSynth);

  tempratureSet = groupDataByDate(data);
  values = Object.values(tempratureSet);
  days = Object.keys(tempratureSet);

  console.log(days[dayIndex]);
  // monoSynth = new p5.MonoSynth();

  // getAudioContext().resume();
}

let count = 0;
let growing = true;
let x = "2021-06-01";

function draw() {
  fill("#fff");
  textSize(32);
  text(x, 100, 100);

  if (particles.length < values[dayIndex].length && frameCount % 12 === 0) {
    let v = values[dayIndex][count];
    let h = v[0].split(" ")[1].split(":")[0];
    let beforeNoon = h < "12";
    particles.push(new Particle(v[1], beforeNoon));

    count++;
    growing = true;
  } else {
    growing = false;
  }

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.display();
    if (dist(mouseX, mouseY, particle.pos.x, particle.pos.y) < 10) {
      updateInfo(values[dayIndex][i]);
    }
    // particle.playSound();
  }
  // let note = random(["Fb4", "G4"]);
  // // note velocity (volume, from 0 to 1)
  // let velocity = random();
  // // time from now (in seconds)
  // let time = 0;
  // // note duration (in seconds)
  // let dur = 1 / 6;

  // monoSynth.play(note, velocity, time, dur);
}

// function playSynth() {
//   userStartAudio();

//   let note = random(["Fb4", "G4"]);
//   // note velocity (volume, from 0 to 1)
//   let velocity = random();
//   // time from now (in seconds)
//   let time = 0;
//   // note duration (in seconds)
//   let dur = 1 / 6;

//   monoSynth.play(note, velocity, time, dur);
// }

function switchDay(i) {
  if (growing) return;
  x = days[i];
  if (!x) return;

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

function updateInfo(content) {
  infoPanel.textContent = content;
}
