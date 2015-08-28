var firstPlayer = {
	x: 0
}, secondPlayer = {
	x: 0
};

Leap.loop(function(frame){
	if(frame.hands[0]){
		firstPlayer.x = frame.hands[0].palmPosition[0] + 250;
	} else {
		firstPlayer.x = undefined;
	}
});

var Game = function(){
	var opts = {
		width : 400,
		height : 500
	};
	Crafty.init(400,500, document.getElementById('game'));
	Crafty.background('black');
	Crafty.e('Paddle, 2D, Canvas, Color, Twoway')
		  .attr({x: 10, y: 10, w: 55, h: 15})
		  .color('red')
		  .multiway(4, {A: 180, D:0})
		  .bind('EnterFrame', function(){
		  	if(secondPlayer.x){
		  		this.x = secondPlayer.x;
		  	}
		  	if(this.x < 0 ){
		  		this.x = 0;
		  	}
		  	if(this.x > 345){
		  		this.x = 345;
		  	}
		  });
	Crafty.e('Paddle, 2D, Canvas, Color, Twoway')
		  .attr({x: 10, y: 475, w: 55, h:15})
		  .color('green')
		  .multiway(4, {LEFT_ARROW: 180, RIGHT_ARROW: 0})
		  .bind('EnterFrame',function(){
		  	if(this.x < 0){
		  		this.x = 0;
		  	}
		  	if(this.x > opts.width - this.w){
		  		this.x = opts.width - this.w;
		  	}
		  	if(firstPlayer.x){
		  		this.x = firstPlayer.x;
		  	}
		  });

	var ball = Crafty.e('Ball, 2D, Canvas, Color, Collision')
					 .attr({x: opts.width/2, y: opts.height/2, w:10, h:10, 
					 	dX: -2, dY: 2})
					 .color('white')
					 .bind('EnterFrame', function(){
					 	this.x += this.dX;
					 	this.y += this.dY;
					 	if(this.x < 10){
					 		this.dX *= -1;
					 	}
					 	if(this.x > 390){
					 		this.dX *= -1;
					 	}
					 	if(this.y < 0 || this.y > 500){
					 		this.y = 250;
					 	}
					 }).onHit('Paddle', function(){
					 	this.dY *= -1;
					 });
}

jQuery(function(){
	var game = new Game();
});

function connect(){
	var controller = new Leap.Controller({
		host: document.getElementById('red_ip').value,
		port: parseInt(document.getElementById('red_port').value,10),
		enableGestures: true,
		frameEventName: 'animationFrame'
	});

	controller.loop(function(frame){
		if(frame.hands[0]){
			secondPlayer.x = frame.hands[0].palmPosition[0] + 250;
		} else {
			secondPlayer.x = undefined;
		}
	});

	controller.on('deviceConnected', function(event){
		console.log(event);
	});
}