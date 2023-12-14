let pills1 = [];
let pills2 = [];
let pills3 = [];
let modelno;
let fontLoad;
let score = 0;
let playerLife =1;
let highScore;
let scoreNum;
let button;
let numberOfPills = 3;

function preload(){
     if(highScore === null){
     highScore = 1;
}
  if (scoreNum === null){
     scoreNum = 1;
}/// end precheck setting varialbe
}//end preload

function setup() {
  createCanvas(windowWidth ,windowHeight ,WEBGL);
fontLoad = loadFont('arialbd.ttf');
let mouseXremap = map(mouseX,0,width,-width/2,width/2);
let mouseYremap = map(mouseY,0,height,-height/2,height/2);
preload();
let scoreNum = 1;
let highScore = 3;
  button = createButton("RESTART");
  button.size(100,50);
  button.mouseClicked(resetGame)
  
  
fill('#d60270');
  textFont(fontLoad);
  textSize(36);
  text('p5*js', 10, 50);
    touchStarted();
  pill=loadModel('pill.obj');
  pill2 = loadModel('pill5.obj');
 pill3 = loadModel('pill3.obj');
 

  
  
}

function draw() {
highScore = getItem('highScore');
mouseXremap = map(mouseX,0,width,-width/2,width/2);
mouseYremap = map(mouseY,0,height,-height/2,height/2);

    touchStarted();
 
  
if(playerLife > 0){
pillGenerator(numberOfPills);
pointLight(215, 0, 113,-50,-50,25); 

pointLight(110, 161, 200,75,75,30); 
  push();
 noStroke();
  plane(width,height,2);
pop();
   for(let i =0; i <numberOfPills;i++){
  
     pills1[i].display();
     pills2[i].display();
     pills3[i].display();
   touchStarted();
       
     //targeting
  pills1[i].target(mouseX,mouseY);
   pills2[i].target(mouseX,mouseY);
   pills3[i].target(mouseX,mouseY);

     //collision check
   pills1[i].collision(mouseXremap,mouseYremap);
   pills2[i].collision(mouseXremap,mouseYremap);
   pills3[i].collision(mouseXremap,mouseYremap);
   }//end drawing pills
   score = score + 1;
  //text(mouseXremap,-width/3,(-height/2)+50);
  textAlign(CENTER);
  fill('#d60270');
  text(score,-width/3,(-height/2)+50);
  text('SCORE',-width/3,(-height/2)+80);
  fill('#0038a8')
  text(highScore,width/3,(-height/2)+50);
  text('HIGHSCORE',width/3,(-height/2)+80);
  
}//end main loop
  
  
  ////game over start
  if(playerLife ==0){

      background(0,0,0);
    
      button.position(width/2-50,height/6-50);
    textAlign(CENTER);
  fill('#d60270');
  text(score,-width/3,(-height/2)+50);
  text('SCORE',-width/3,(-height/2)+80);
  fill('#0038a8')
  text(highScore,width/3,(-height/2)+50);
  text('HIGHSCORE',width/3,(-height/2)+80);
   
     if(score > highScore){
        
         scoreNum = score;
         storeItem('highScore',scoreNum);
       
     }
    
    }
                     
     
}///end draw


class pillMaker{
  constructor(lifevar,modelno){
  this.speed = random(.1,5);
  this.x = random(-width/4,width/4);
  this.y = random(-height/4,height/4);
  this.size = random(10,16);
  this.rotation = random(60);
  this.life = lifevar;
  this.models = modelno;
 
  }
  display(){
if(this.life>1){
     push();
  translate(this.x,this.y,0);
  rotateX(frameCount *.01 + this.rotation);
  rotateY(frameCount *.01 + this.rotation);
  scale(this.size);
  normalMaterial();
  model(this.models);
  pop();
       }///end life if
    this.life = this.life-1;
     
  }//end diplay
 target(xpos , ypos){
   if(this.x > xpos-width/2){
     this.x = this.x-this.speed;
   }/// end track if its large than
       if(this.y > ypos - height/2){
     this.y = this.y-this.speed;
   }
  if(this.x < xpos  - width/2){
    this.x = this.x+this.speed;
  }
     if(this.y < ypos - height/2){
     this.y = this.y+this.speed;
   }
  }
  
  collision(xpos, ypos){
    if(this.x>= xpos - 25 && this.x <= xpos +25 && this.y >= ypos -25 && this.y <= ypos + 25)
      playerLife=0;
  }
  
  pillReset(){
    this.life=0;
    resetGame();
  }   ///kill the pills
 
}//end pill maker
///

function pillGenerator(number){

   for(let i = 0; i<number;i++){
    pills1.push(new pillMaker(random(10000,20000),pill));
    pills2.push(new pillMaker(random(10000,20000),pill2));
    pills3.push(new pillMaker(random(10000,20000),pill3));
    
  }///make pills
  
}

function resetGame(){
playerLife = 1;
   score=0;
    for(let i = 0; i<numberOfPills;i++){
    pills1.push(new pillMaker(random(10000,20000),pill));
    pills2.push(new pillMaker(random(10000,20000),pill2));
    pills3.push(new pillMaker(random(10000,20000),pill3));
    

    
  }///make pills
}///end reset




////

function touchStarted() {

  // prevent default
  return false;
}

document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });
document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });
document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });