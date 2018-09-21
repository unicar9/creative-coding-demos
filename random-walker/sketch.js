const s = function( sketch ) {
    let x, y

    sketch.setup = function() {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
        x = sketch.windowWidth / 2
        y = sketch.windowHeight / 2
        sketch.rectMode('CENTER')
        sketch.colorMode(sketch.HSB)
        sketch.background(0)
    }

    sketch.draw = function() {
        if(controls.pause) return

        size = sketch.random(controls.minSize, controls.maxSize)
        let roundCorner = controls.radius
        let hue = sketch.floor(sketch.random(360))
        if (controls.styles === 'fill') {
            sketch.noStroke()
            sketch.fill(hue, controls.saturation, controls.brightness, controls.opacity)
        } else {
            sketch.noFill()
            sketch.stroke(hue, controls.saturation, controls.brightness, controls.opacity)
        }

        sketch.rect(x, y, size, size, roundCorner)

        let r = sketch.floor(sketch.random(4))
    
        switch(r) {
            case 0: 
            x = (x + controls.step) % sketch.windowWidth 
            break
            case 1:
            x = Math.abs( (x - controls.step) % sketch.windowWidth )
            break
            case 2:
            y = (y + controls.step) % sketch.windowHeight
            break
            case 3: 
            y = Math.abs( (y - controls.step) % sketch.windowHeight )
            break
        }
    }

    sketch.mousePressed = function() {
         // press mouse and also OPTION button to draw from the mouse position
        if ( sketch.keyIsPressed && sketch.keyCode === sketch.OPTION) {
            x = sketch.mouseX
            y = sketch.mouseY

            controls.pause = false
        }
    }

    sketch.keyPressed = function() {
        // press RETURN to save canvas
        if (sketch.keyCode === sketch.RETURN) {
            sketch.save('random-walk-fun.jpg')
        }

        // press SPACE to pause/restart drawing
        if (sketch.keyCode === sketch.CONTROL) { 
            controls.pause = !controls.pause
            pauseCtrl.setValue(controls.pause)
        }
    }

    sketch.resizeCanvas = function() {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight)
    }
}

const myp5 = new p5(s)

const Controls = function() {
    this.minSize = 5
    this.maxSize = 30
    this.step = 30
    this.radius = 0
    this.saturation = 48
    this.brightness = 80
    this.opacity = .8
    this.styles = 'fill'
    this.pause = false
    this.save = function() {
        myp5.save('random-walk-fun.jpg')
    }
}

const controls = new Controls()
let pauseCtrl

window.onload = function() {
    const gui = new dat.GUI()
    gui.add(controls, 'minSize', 1, 20)
    gui.add(controls, 'maxSize', 30, 70)
    gui.add(controls, 'step', 1, 50)
    gui.add(controls, 'radius', 0, 35)
    gui.add(controls, 'saturation', 25, 80)
    gui.add(controls, 'brightness', 50, 100)
    gui.add(controls, 'opacity', 0, 1)
    gui.add(controls, 'styles', [ 'fill', 'stroke' ] );
    pauseCtrl = gui.add(controls, 'pause')
    gui.add(controls, 'save')
}

