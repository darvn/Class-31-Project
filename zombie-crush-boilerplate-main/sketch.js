const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var wall1, wall2, ground;
var bridge, joinPoint;
var stones = [];

var zombie, zombie1, zombie2, zombie3, zombie4, sad_zombie;
var stoneImg, bridgeImg;
var backgroundImg;
var breakButton;
var invisible1, invisible2

function preload(){
  zombie1 = loadAnimation("img/zombie-crush-assets-main/assets/zombie1.png");
  zombie2 = loadAnimation("img/zombie-crush-assets-main/assets/zombie2.png");
  zombie3 = loadAnimation("img/zombie-crush-assets-main/assets/zombie3.png");
  backgroundImg = loadImage("img/zombie-crush-assets-main/assets/background.png");
  sad_zombie = loadAnimation("img/zombie-crush-assets-main/assets/unnamed.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  zombie = createSprite(width/2, height - 100);
  zombie.addAnimation("right",zombie3);
  zombie.addAnimation("left",zombie2);
  
  zombie.addAnimation("sad", sad_zombie);

  zombie.scale = 0.3;
  zombie.velocityX = 10;

  breakButton = createButton("");
  breakButton.position(width - 200, height/2 - 50);
  breakButton.class("breakButton");
  breakButton.size(50, 50);
  breakButton.mouseClicked(handleButtonPress);

  wall1 = new Base(5, windowHeight/2 + 100, 350, 500);
  wall2 = new Base(windowWidth - 5, windowHeight/2 + 100, 350, 500);
  ground = new Base(windowWidth/2, windowHeight - 5, windowWidth, 25);

  bridge = new Bridge(25, {x : 10, y : windowHeight/2 - 50})
  joinPoint = new Base(windowWidth - 150, windowHeight/2 - 150, 0, 0);

  for(var i = 0; i <= 8; i++){
    imageMode(CENTER)
    var x = random(width/2 - 200, width/2 + 300)
    var y = random(-10, 75)
    var stone = new Stone(x, y, 50);
   // image(stone, 0, 0, )
    stones.push(stone);
  }

  Matter.Composite.add(bridge.body, joinPoint);
  jointLink = new Link(bridge, joinPoint);

  invisible1 = createSprite(5, windowHeight/2 +100, 350, 500);
  invisible2 = createSprite(windowWidth - 5, windowHeight/2 + 100, 350, 500);
  invisible1.visible = false;
  invisible2.visible = false;
  
}

function draw() {
  background(81);
  image(backgroundImg, width/2, height/2, width, height);

  Engine.update(engine);
  wall1.show();
  wall2.show();
  ground.show();

  zombie.bounceOff(invisible1)
  zombie.bounceOff(invisible2)

  // if(zombie.collide(invisible1)){
  //   zombie.changeAnimation("right")
  // }
  // if(zombie.collide(invisible2)){
  //   zombie.changeAnimation("left")
  // }
  

  bridge.show();

  for(var i = 0; i <= 8; i++){
    stones[i].show();
  }

  for(var stone of stones){
    stone.show();
    var pos = stone.body.position;
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
    if(distance <= 50){
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, {x : 10, y : -10});
      zombie.changeAnimation("sad");
      collided = true;
    }
  }
  drawSprites();
}

function handleButtonPress(){
  // bridge.break();
   jointLink.detach();
 
  //jointLink = null; 
  console.log("hi")
  setTimeout (()=> {
    bridge.break();
  }, 1500)
}
