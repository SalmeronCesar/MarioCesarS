game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                //It loads the level or world CesarLevel01
                me.levelDirector.loadLevel("CesarLevel01");
                
               this.resetPlayer(0, 400);
                //Makes it if you press right key it goes right and same goes for left and jump but for jump its space to jump
                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.LEFT, "left");
                me.input.bindKey(me.input.KEY.SPACE, "jump");
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        //It resets the player or character
        resetPlayer: function(x, y){
             var player = me.pool.pull("mario", x, y, {});
             me.game.world.addChild(player, 5);
        }
        
        
});
