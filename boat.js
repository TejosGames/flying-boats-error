class Boat{
    constructor(x,y,width,height,boatpos){
        this.body=Bodies.rectangle(x,y,width,height);
        this.width=width;
        this.height=height; 
        this.boatPosition=boatpos;
        this.image =loadImage("assets/boat.png");
        World.add(world,this.body);
        
    }
    display(){
        var pos=this.body.position
        push();
        translate(pos.x,pos.y);
        imageMode(CENTER)
        image(this.image,0,this.boatPosition,this.width,this.height)
        pop();
    }
    remove(index){
        setTimeout(()=>{
            World.remove(world,boats[index].body);
            delete boats[index]
        },2000);
    }

}