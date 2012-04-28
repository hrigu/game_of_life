(function() {
  var ctx, drawer, game, getCanvas, run_loop;

  game = null;

  ctx = null;

  drawer = null;

  jQuery(function() {
    var canvas;
    canvas = getCanvas();
    ctx = canvas.getContext('2d');
    game = new gameOfLife.Game(40, 20);
    game.setLive(2, 1);
    game.setLive(3, 2);
    game.setLive(1, 3);
    game.setLive(2, 3);
    game.setLive(3, 3);
    game.setLive(22, 1);
    game.setLive(23, 2);
    game.setLive(21, 3);
    game.setLive(22, 3);
    game.setLive(23, 3);
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

}).call(this);