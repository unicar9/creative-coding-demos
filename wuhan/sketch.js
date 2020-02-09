console.log('武汉加油')

const msgL1 = '武汉莫慌'
const msgL2 = '我们等你'

const msgs = [['岂曰无衣', '与子同袍'], ['共同战疫', '共克时艰'], ['武汉加油', '中国加油']]
const bgColors = ['#F9CDE6', '#900604']
const colorsArr = [['#D1302E','#991005','#E2242B','#900604','#930C08','#A81B0D'],['#ffcece', '#FF9B9C', '#FF7C7D', '#ff6768', '#ffc6c7', '#f6c3e5'] ]

let clickCount = 0

const colors = ['#FFD568','#FFF2D1','#FFC8C3','#FF766D','#91E3FF','#D8F5FF']
const colorsRed = ['#D1302E','#991005','#E2242B','#900604','#930C08','#A81B0D']
const colorsNew = ['#AA251C','#D5462D','#F37343','#FFCA62','#DD1C1C','#A50009']
const colors2 = ['#9b5de5','#f15bb5','#fee440','#00bbf9','#00f5d4']
const colors3 = ['#86e3ce','#d0e6a5','#ffdd94','#fa897b','#ccabd8']


const colorsHa = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722"
];

const colors8 = ['#ffcece', '#FF9B9C', '#FF7C7D', '#ff6768'] 
const colors9 = ['#BE7CB9', '#2B387B', '#479DCC', '#9DD0EB', '#CDD1FC'] 

let points = []

let font

class Particle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height))
    this.target = createVector(x, y)
    this.vel = p5.Vector.random2D()
    this.acc = createVector()
    this.c = random(colorsArr[clickCount % colorsArr.length])
    this.r = random(2, 8)
    this.maxspeed = 12
    this.maxforce = 3
    this.offset = random(1,10)
  }

  behaviours() {
    const arrive = this.arrive(this.target)
    const mouse = createVector(mouseX, mouseY)
    const avoidMouse = this.avoidMouse(mouse)

    this.applyForce(arrive)
    this.applyForce(avoidMouse)
  }

  arrive() {
    let desired = p5.Vector.sub(this.target, this.pos)
    let d = desired.mag()
    let speed = this.maxspeed

    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed)
    }

    desired.setMag(speed)
    let steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxforce)
    return steer
  }

  avoidMouse(mouse) {
    let steer = createVector(0, 0)
    let desired = p5.Vector.sub(mouse, this.pos);
    let d = desired.mag()
    if (d < 50) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
    } 
    return steer;
  }

  applyForce(f) {
    this.acc.add(f)
  }

  update() {
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.mult(0)
  }

  show() {
    fill(this.c)
    noStroke()

    let updateRadius 
    updateRadius = this.r + sin(frameCount/3 + this.offset)*4


    // heart(this.pos.x, this.pos.y, this.r)
    heart(this.pos.x, this.pos.y, updateRadius)
  }
}

function preload() {
  font = loadFont('FZZJ-LongYTJW.TTF') 
}

function generatePoints(message) {
  points = []
  background(0)

  rectMode(CENTER)
  fill(255)
  textAlign(CENTER, CENTER)
  textSize(height/4)
  textFont(font)
  text(message[0], width/2, height*2.2/5, width/2, height/2)
  text(message[1], width/2, height*4/5, width/2, height/2)

  for (let x = 0; x < width; x += 5){
    for(let y = 0; y < height; y += random(2, 10)){
      let pixel = get(x, y)
      if(pixel[0] == 255) {
        let pt = new Particle(x, y)
        points.push(pt)
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  generatePoints(msgs[0])
}

function draw() {
  let turn = clickCount % bgColors.length
  background(bgColors[turn])
  points.forEach( p => {
    p.behaviours()
    p.update()
    p.show()
  })

}


function heart(x, y, size) {
  beginShape()
  vertex(x, y)
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size)
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y)
  endShape(CLOSE)
}

function mouseClicked() {
  clickCount += 1
  let turn = clickCount % msgs.length
  generatePoints(msgs[turn])
}