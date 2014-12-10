game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
                me.game.world.addChild(new me.Sprite (0, 0, me.loader.getImage('title-screen')), -10);
                //If enter is pressed the game will start 
                me.input.bindKey(me.input.KEY.ENTER, "start");
                
                me.game.world.addChild(new (me.Renderable.extend ({
                    init: function(){
                        this._super(me.Renderable, 'init',[510, 30, me.game.viewport.width, me.game.viewport.height]);
                        this.font = new me.Font("Arial",46,"black");
                        //Makes the font a a sytle called Arial and 46 pixels and the color black
                    },
                    //It draws the words on the title screen
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "Mario Maybe?", 400, 130);
                        this.font.draw(renderer.getContext(), "Press Enter to play",250 , 530);
                    }
                    
                })));
                //It make the start work
                this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
                if(action === "start"){
                    me.state.change(me.state.PLAY);
                }
            });
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
        //
	onDestroyEvent: function() {
            me.input.unbindKey(me.input.KEY.ENTER);
            me.event.unsubscribe(this.handler);
	}
});
