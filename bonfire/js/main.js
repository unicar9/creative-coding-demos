var app = app || {}
let cameraMoving = false, theta = 0

const cameraDefaultPosition = {
  x: -40,
  y: 400,
  z: 1400
}

const radius = Math.sqrt( cameraDefaultPosition.x ** 2 + cameraDefaultPosition.z ** 2 ) 

class Bonfire {
  constructor(x, y, z, r, h, sizeMin, sizeMax, cubeQuantiy){
    this.x = x
    this.y = y
    this.z = z
    this.r = r
    this.h = h
    this.sizeMin = sizeMin
    this.sizeMax = sizeMax
    this.cubeQuantiy = cubeQuantiy
    this.fireCubes = this.generateCubes()
  }

  fireOneCube(x, y, z, size) {
    const range = {
      xOffset: THREE.Math.randInt(10, 20),
      zOffset: THREE.Math.randInt(10, 20),
      yOffset: THREE.Math.randInt(40, 60),
      xVelocity: THREE.Math.randInt(.3, .6),
      zVelocity: THREE.Math.randInt(.3, .6),
      yVelocity: THREE.Math.randInt(.2, 1),
      xRotation: THREE.Math.randFloat(0.01, 0.05),
      zRotation: THREE.Math.randFloat(0.01, 0.05),
      yRotation: THREE.Math.randFloat(0.01, 0.05)
    }

    const c = {}
    const cubeGeometry = new THREE.BoxGeometry( size, size, size )
    const cubeMaterial = new THREE.MeshLambertMaterial()
    cubeMaterial.color.setRGB(THREE.Math.randFloat(0.6, 1), 0, 0)

    const cube = new THREE.Mesh( cubeGeometry, cubeMaterial )
    cube.position.set( x, y, z )

    c.cube = cube
    c.originalPos = {x, y, z}

    // in proportion to the height of the bonfire

    c.offset = {
      x: range.xOffset * (y - this.y) / this.h + 20, 
      z: range.zOffset * (y - this.y) / this.h + 20, 
      y: range.yOffset * (y - this.y) / this.h + 60
    }

    c.velocity = {
      x: range.xVelocity * (y - this.y) / this.h, 
      z: range.zVelocity * (y - this.y) / this.h, 
      y: range.yVelocity * (y - this.y) / this.h
    }

    c.rotationSpeed = {
      x: range.xRotation, 
      y: range.yRotation, 
      z: range.zRotation
    }
    return c
  }

  generateCubes() {
    const fireCubes = []
    for (let i = 0; i < this.cubeQuantiy; i++) {
      const h1 = Math.random() * this.h
      const r1 = this.r * h1 / this.h
      const theta = Math.random() * Math.PI * 2 
      const cubeR = Math.random() * r1
      const cubeX = this.x + Math.sin(theta) * cubeR
      const cubeZ = this.z + Math.cos(theta) * cubeR
      const cubeY = this.y + this.h - h1
      const cubeSize = THREE.Math.mapLinear(this.h - h1, 0, this.h, this.sizeMax, this.sizeMin)

      const cube = this.fireOneCube(cubeX, cubeY, cubeZ, cubeSize)
      fireCubes.push(cube)
    }

    return fireCubes
  }

  fireDance() {

    this.fireCubes.forEach(c => {
  
      c.cube.rotation.x += c.rotationSpeed.x
      c.cube.rotation.y += c.rotationSpeed.y
      c.cube.rotation.z += c.rotationSpeed.z
      if (Math.abs(c.cube.position.z - c.originalPos.z) > c.offset.z ) {
        c.velocity.z *= -1
      }
      if (Math.abs(c.cube.position.y - c.originalPos.y) > c.offset.y) {
        c.velocity.y *= -1
      }
      if (Math.abs(c.cube.position.x - c.originalPos.x) > c.offset.x) {
        c.velocity.x *= -1
      }
 
      c.cube.position.z += c.velocity.z
      c.cube.position.y += c.velocity.y
      c.cube.position.x += c.velocity.x
    })
  }
}

const bonfiresPostions = [
  [0, -200, 200],
  [-1200, -800, -500],
  [800, 0, -300],
  [-800, 300, -200],
  [1200, -1200, -500],
]



app.init = function(){
  
  // create a scene
  app.scene = new THREE.Scene();
  app.width = window.innerWidth;
  app.height = window.innerHeight;


  // create a camera
  app.camera = new THREE.PerspectiveCamera(
    50, 
    app.width / app.height,
    0.01,  
    20000
  );
  /******* 
    4 params:
    * field of view (fov)
    * screen ratio
    * near field: how close to render things
    * far field: how far to render things
  **********/

  // position camera somewhere in the scene, it has a perspective
  app.camera.position.x = cameraDefaultPosition.x
  app.camera.position.y = cameraDefaultPosition.y
  app.camera.position.z = cameraDefaultPosition.z

  // tell the camera where to look at - the center of the scene (0,0,0)
  app.camera.lookAt( app.scene.position )

  app.renderer = new THREE.WebGLRenderer()

  // set the size
  app.renderer.setSize( app.width, app.height )


  // set the background colour
  app.renderer.setClearColor( 0x000000 ) //background colour

  // create an ambient light
  app.ambient = new THREE.AmbientLight( 0xffffff, .7 )
  app.scene.add( app.ambient )

  // create an directional light
  app.directionalLight = new THREE.DirectionalLight( 0xffffff )
  app.directionalLight.position.set( 10000, 10000, 10000)
  app.scene.add( app.directionalLight )

  app.bonfires = []

  bonfiresPostions.map(p => {
    let bonfire = new Bonfire(p[0], p[1], p[2], THREE.Math.randInt(250, 300), THREE.Math.randInt(450, 500), THREE.Math.randInt(3, 5), THREE.Math.randInt(15, 20), 1000)
    
    bonfire.fireCubes.forEach(f => {
      app.scene.add(f.cube)
    })

    app.bonfires.push(bonfire)

  })

  // camera control mouse and keyboard using the library orbitControls.js
  app.controls = new THREE.OrbitControls( app.camera, app.renderer.domElement );

  // append the rendered canvas onto dom
  document.getElementById("output").appendChild( app.renderer.domElement );

  // draw and animate something
  app.animate()

} // end of app init

// animate function
app.animate = function(){
  // render
  app.renderer.render( app.scene, app.camera )

  app.bonfires.forEach(b => b.fireDance())
  app.cameraCircleMove()
  
  // // animate
  requestAnimationFrame( app.animate )

}; // end of app.animate


app.cameraCircleMove = function() {
  if (cameraMoving) {

    let x = radius * Math.sin(theta)
    let z = radius * Math.cos(theta)
    
    theta += 0.005
    app.camera.position.set(x, 400, z)
    app.camera.lookAt(app.scene.position)

  }

}

/* if you want to resize the canvas on window rezise */
app.onResize = function(){
  app.width = window.innerWidth
  app.height = window.innerHeight

  app.camera.aspect = app.width / app.height
  app.camera.updateProjectionMatrix()

  app.renderer.setSize(app.width, app.height)
}

window.addEventListener( "resize", app.onResize, false )
window.addEventListener( "dblclick", (e) => {
	cameraMoving = !cameraMoving
	console.log(cameraMoving)
}, true)

window.onload = app.init