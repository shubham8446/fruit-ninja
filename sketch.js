//game states


//Aparna mam please read from line 51...


var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit,monster,fruitGroup,enemyGroup,score,randomfruit,r;

var swordImage,fruit1,fruit2,fruit3,fruit4,monsterImage,gameOverImage;

//__________________________________________

function preload(){
  
  swordImage = loadImage("sword.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
 gameOverImage = loadImage("gameover.png");
  
  
  swordTouchingsound = loadSound("mario.mp3")
  
  thegameOver = loadSound("lol-youdied.mp3");
  
  bg = loadImage("bag.jpg")
  
  checkpointsound = loadSound("csound.mp3")
  
  bigcheckSound = loadSound("airhorn.mp3")
  
  bgSound = loadSound("rude.mp3")
}

   

function setup(){
  
     createCanvas(600,600);
//-----------------------------------  
  
  //i really wanted to add this sound only in game state but problem is i am not sure why its lagging so i had to remove it from play state same is happpening with illuminati sound track
  
  bgSound.play()
 
  
  sword = createSprite(50,200,15,15);
  sword.addImage(swordImage);
  
  sword.scale=0.6
  
  sword.setCollider("rectangle",0,0,30,30);
  
  score = 0
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  bgSoundtrack = loadSound("rude.mp3")
  
}


function draw(){
  
  background(bg);
  
  
  if (gameState===PLAY){
    
    
    
    
    
    
    
    
    fruits();
    Enemy();
    
   
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
     
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      swordTouchingsound.play()
    }
    
     
    // i am not sure why this sound is lagging...
    
    if(score>0 && score%24 === 0){
       checkpointsound.play() 
    }
    
    if(score>0 && score%100 === 0){
      //  bigcheckSound.play() 
    }
    
    
  
    else
    {
      
      if(enemyGroup.isTouching(sword)){
        
     gameState=END;   
        
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);     enemyGroup.setVelocityXEach(0);
        thegameOver.play()
       sword.addImage(gameOverImage); 
  sword.x=200 ;   
  sword.y=200;      
      }
      }
      }
  
  
  drawSprites();
  
  
  text("score :"+score,300,30);

}

  function Enemy(){
    
    if (World.frameCount%200===0){
      
     monster=createSprite(400,200,20,20);
      
monster.addAnimation("moving",monsterImage);   
      
monster.y=Math.round(random(100,300));  
      
      monster.velocityX=-8;
      monster.setLifetime=50;
      
    enemyGroup.add(monster)  ;
      
    }    
  }

function fruits(){
  
  if(World.frameCount%80===0){
    
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    
    r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1) ;  }
    else if (r==2){
      fruit.addImage(fruit3);
    }else if(r==3){
      fruit.addImage(fruit2);
    }else if (r==4){
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(28,300))
    
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    fruitGroup.add(fruit)
  }
  
  
  
  
}

