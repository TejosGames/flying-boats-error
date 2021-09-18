const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var tower;
var ground;
var cannon
var bg;
var balls=[];
var boats=[];

function preload(){
bg=loadImage("assets/background.gif")
}
function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    tower =new Tower(150,350,160,310); 
    ground =new Ground(600,580,1200,20);
    cannon= new Cannon(180,110,100,50,-PI/4)
  
    
}

function draw(){
    background(bg);
   Engine.update(engine);
   tower.display();
   ground.display();
   cannon.display();
   showBoats();
   for(var i=0;i<balls.length;i++){
    showCannonBalls(balls[i],i)
    collisionBoat(i);
   }
  
}
function keyPressed(){
    if(keyCode==32){
        var cannonBall=new CannonBall(cannon.x,cannon.y)
        balls.push(cannonBall)
        balls[balls.length-1].shoot();
    }
}
function showCannonBalls(ball,index){
    if (ball){
        ball.display();
        if(ball.body.position.x>=width||ball.body.position.y>=height-50){
            ball.remove(index)
        }   
    }
  
}
function showBoats(){
    if(boats.length>0){
        if(boats[boats.length-1]==undefined || boats[boats.length-1].body.position.x<width-300){
            var positions=[-40,-60,-70,-20]
            var position=random(positions);
            var boat=new Boat(width,height-100,170,170,position)
             boats.push(boat); 
        }
        for(var i=0;i<boats.length;i++){
            if(boats[i]){
                Matter.Body.setVelocity(boats[i].body,{x:-0.8,y:0})
            }
            boats[i].display();
        }
    }
    else{
        var boat=new Boat(width,height-60,170,170,-60)
        boats.push(boat);
    }
} 
function collisionBoat(index){
    for(var i=0;i<boats.length;i++){
        if(balls[index]!==undefined && boats[i!==undefined]){
            var collision=Matter.SAT.collides(balls[index].body,boats[i].body);
            if(collision.collided){
                boats[i].remove(i);
                balls[index].reomve(index);
            }
        }
    }
}