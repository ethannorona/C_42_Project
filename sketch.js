var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg, obstacleImg;
var score = 0;
var gameOverImg, gameO;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  gameOverImg = loadAnimation("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameO = createSprite(0, 0, 800, 400);
  gameO.addAnimation("gameOver",gameOverImg);
  gameO.visible = false;

  FoodGroup = new Group();
  ObstacleGroup = new Group();
}

function draw() { 
  background(0);

  gameO.x = 400;
  gameO.y = 200;

  if(gameState===PLAY){
  
    spawnFood();
    spawnObstacle()

  if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    score = score + 1;
    player.scale += 0.1;
  }

  if(ObstacleGroup.isTouching(player)){
    ObstacleGroup.destroyEach();
    gameState = END;
  }

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;
    
    FoodGroup.destroyEach();
    ObstacleGroup.destroyEach();
    
    gameO.visible = true;
  }

  drawSprites();

  textSize(28);
  fill("white");
  text("Score: " + score, 580,40);

}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 80 === 0){
    var obstacle = createSprite(600, 320, 40, 10);
    //obstacle.y = random(120, 200);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.18;
    obstacle.velocityX = -4;

    obstacle.lifetime = 300;
    player.depth = obstacle.depth + 1;
    ObstacleGroup.add(obstacle);
  }
}