var ctx, drawer, game, getCanvas, run_loop;


jQuery(function() {
    var canvas = getCanvas();
    ctx = canvas.getContext('2d');
    game = new gameOfLife.Game(20, 10);
    //set the life configuration
    game.set(0, 0);
    
    drawer = new gameOfLife.Drawer(game, 10);
    drawer.drawGrid(ctx);
    return setInterval(run_loop, 100);
});

run_loop = function() {
	//draw the next generation
    drawer.draw(ctx);
    return game.nextRound();
};

getCanvas = function() {
    return $("#myCanvas")[0];
};

