(function() {
  var ctx, drawer, game, getCanvas, run_loop, setGlider;

  game = null;

  ctx = null;

  drawer = null;

  jQuery(function() {
    var canvas;
    canvas = getCanvas();
    ctx = canvas.getContext('2d');
    game = new gameOfLife.Game(40, 20);
    setGlider(5, 2, game);
    setGlider(10, 2, game);
    setGlider(15, 2, game);
    setGlider(20, 2, game);
    setGlider(23, 3, game);
    setGlider(25, 2, game);
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

  setGlider = function(x, y, game) {
    game.set(x, y);
    game.set(x + 1, y + 1);
    game.set(x - 1, y + 2);
    game.set(x, y + 2);
    return game.set(x + 1, y + 2);
  };

}).call(this);
