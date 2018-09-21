/*
Todo:
1. mono color: adjust hue and shades
2. colorful mode: H random, adjust only S and B (done)
3. pause and download(in another panel)
4. shapes: rect, circle (through radius) and emojis
5. mousePressed start a new random walk at where you pressed (done)
*/


const Controls = function() {
    this.minSize = 5
    this.maxSize = 30
    this.step = 30
    this.radius = 0
    this.saturation = 48
    this.brightness = 80
}

const controls = new Controls()

window.onload = function() {
    const gui = new dat.GUI()
    gui.add(controls, 'minSize', 1, 20)
    gui.add(controls, 'maxSize', 30, 70)
    gui.add(controls, 'step', 1, 50)
    gui.add(controls, 'radius', 0, 100)
    gui.add(controls, 'saturation', 0, 100)
    gui.add(controls, 'brightness', 0, 100)
}

let x, y
let drawing = true

function setup() {
    createCanvas(windowWidth, windowHeight)
    x = windowWidth / 2
    y = windowHeight / 2
    rectMode('CENTER')
    colorMode(HSB)
    background(0)
}

function draw() {

    if(!drawing) {
        return
    }

    size = random(controls.minSize, controls.maxSize)
    let roundCorner = controls.radius
    let hue = floor(random(360))
    noStroke()
    fill(hue, controls.saturation, controls.brightness)
    rect(x, y, size, size, roundCorner)
  
    let r = floor(random(4))
  
    switch(r) {
        case 0: 
        x = (x + controls.step) % windowWidth 
        break
        case 1:
        x = Math.abs( (x - controls.step) % windowWidth )
        break
        case 2:
        y = (y + controls.step) % windowHeight
        break
        case 3: 
        y = Math.abs( (y - controls.step) % windowHeight )
        break
    }
}

function mousePressed() {
    // press mouse and also OPTION button to draw from the mouse position
    if ( keyIsPressed && keyCode === OPTION) {
        x = mouseX
        y = mouseY

        drawing = true
    }
}

function keyPressed() {
    // press RETURN to save canvas
    if (keyCode === RETURN) {
        save('random-walk-fun.jpg')
    }

    // press SPACE to pause/restart drawing
    if (keyCode === 32) { 
        drawing = !drawing
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

