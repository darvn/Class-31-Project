class Stone {
    constructor(x, y, r){
        var options = {
            restitution : 0.8
        }

        this.image = loadImage("img/zombie-crush-assets-main/assets/stone.png");
        this.body = Bodies.circle(x, y, r, options);
        this.r = r
        World.add(world, this.body)
    }

    show(){
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, 75, 75);
        pop();
    }

}