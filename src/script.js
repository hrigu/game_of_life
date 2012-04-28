var ctx, drawer, game, getCanvas, run_loop;

jQuery(function() {
    var canvas;
    canvas = getCanvas();
    ctx = canvas.getContext('2d');
    game = new gameOfLife.Game(70, 50);
    game.set(0, 0);
    game.set(2, 5);
    game.set(39, 20);
    game.set(45, 88);
    game.set(60, 3);
    drawer = new gameOfLife.Drawer(game, 10);
    drawer.drawGrid(ctx);
    return setInterval(run_loop, 100);
});

run_loop = function() {
    drawer.draw(ctx);
    return game.nextRound();
};

getCanvas = function() {
    return $("#myCanvas")[0];
};

