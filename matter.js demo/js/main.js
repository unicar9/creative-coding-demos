// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var bar1;
var bar2;
var balls = [];
var colors = ["#AA96DA", "#FCBAD3", "#FFFFD2"];

function Ball(x, y, r) {
  this.body = Bodies.circle(x, y, r);
  this.r = r;
  this.color = random(colors);

  World.add(world, this.body);

  this.show = function(){
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
      translate(pos.x, pos.y);
      rotate(angle);
      ellipse(0, 0, this.r*2);
    pop();
  };
};

function Bar(x, y, w, h, o){
  this.body = Bodies.rectangle(x, y, w, h, o);
  this.w = w;
  this.h = h;

  World.add(world, this.body);

  this.show = function(){
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
    pop();

  };

};

function createWorld() {
  engine = Engine.create();
  world = engine.world;

  bar1 = new Bar(width/2, height * 3/4, 300, 10, {isStatic: true});
  bar2 = new Bar(width/2, height/4, 300, 10, {isStatic: true});

  Engine.run(engine);
  World.add(world, [bar1, bar2]);
};

function setup() {
  createCanvas(800, 600);
  createWorld();
};

function mouseDragged() {
  balls.push(new Ball(mouseX, mouseY, 10));
};

function draw() {

  background("#A8D8EA");
  stroke(100);
  fill(100);

  bar1.show();
  bar2.show();

  for (var i = 0; i < balls.length; i++) {
    noStroke();
    fill(balls[i].color);
    balls[i].show();
    if (balls[i].body.position.y > height + 20) {
      World.remove(world, balls[i].body)
      balls.splice(i, 1);
      i--;
    }
  }

};
