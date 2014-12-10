// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image:"mario",
                spritewidth: "64",
                spriteheight:"64",
                width: 64,
                height: 64,
                getShape: function(){
                    return(new me.Rect(0, 0, 20, 64)).toPolygon();
                }
        }]);
    
    this.renderable.addAnimation("idle", [39]);
    //Creates an animation called smallWalk using pictures of the image defined above (mario)
    //Sets the animation to run through pictures 8-13
    // The last number says we switch between pictures every 80 milliseconds
    this.renderable.addAnimation("smallWalk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 110);
    
    this.renderable.setCurrentAnimation("idle");
        //Sets the speed we go on the X-axis(firstnumber) and Y-axis(second number)
        this.body.setVelocity(5, 20);
        //Sets the camera (viewport) to follow mario's position (pos) on both the X and Y axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    
    update: function(delta){
        //Checks if the right key is pressed and if it is, execute the following statement.
         if(me.input.isKeyPressed("right")){
            this.flipX(false)
            //Sets the position of mario onn the X-axis by adding the x value from the setVelocity times the timer.tick
            //me.timer.tick uses the time since last animation to make the distance traveled smooth
            this.body.vel.x +=this.body.accel.x * me.timer.tick;
            
        }
        //if key is pressed it will be left
        else if(me.input.isKeyPressed("left")){
            this.flipX(true);
            this.body.vel.x -=this.body.accel.x * me.timer.tick;
        }
        else{
            this.body.vel.x = 0;
        }
        //If space a certain key is pressed then it will make the person/character jump
          if(me.input.isKeyPressed("jump")){
              if(!this.body.jumping && !this.body.falling) {
              this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
            this.body.jumping = true;
        }
        }
        
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        //Makes the ccharacter walk but its name smallWalk
        if(this.body.vel.x !== 0){
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
            }
        }else{
            this.renderable.setCurrentAnimation("idle");
        }
        //idle is basicly standing, its telling the game if the character is not moving it should stand up 
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //collideHandler is 
    collideHandler: function(response){
        
    }
    
});
// It triggers the level to transfer into another level
game.LevelTrigger = me.Entity.extend({
   init: function(x, y, settings){
       this._super(me.Entity, 'init', [x, y, settings]);
       //If something collides with this object when it will triiger that image or thing to another place
       this.body.onCollision = this.onCollision.bind(this);
       this.level = settings.level;
       this.xSpawn = settings.xSpawn;
       this.ySpawn = settings.ySpawn;
   },
   
   onCollision: function(){
       //Sets this object so that it will collide only with objects or type no_object, which don't exist 
       //so really, makes it so this object will not collide with anything anymore
       this.body.setCollisionMask(me.collision.types.NO_OBJECT);
       me.levelDirector.loadLevel(this.level);
       me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
   } 
});

