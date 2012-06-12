(function() {
  var animate, ctx, doWork, drawer, game, getCanvas, isAnimated, tempoInMillies, toggleAnimate;

  game = null;

  ctx = null;

  drawer = null;

  isAnimated = false;

  tempoInMillies = 100;

  jQuery(function() {
    var canvas;
    canvas = getCanvas();
    ctx = canvas[0].getContext('2d');
    canvas.click(toggleAnimate);
    game = new gameOfLife.Game(200, 160);
    game.strategy = new gameOfLife.GameOfLifeStrategy(game);
    game.initStartLife();
    drawer = new gameOfLife.Drawer(game, 4);
    drawer.drawGrid(ctx);
    drawer.draw(ctx);
    return animate();
  });

  toggleAnimate = function() {
    isAnimated = !isAnimated;
    if (isAnimated) return animate();
  };

  animate = function() {
    if (isAnimated) return window.setTimeout(doWork, tempoInMillies);
  };

  doWork = function() {
    game.nextRound();
    drawer.draw(ctx);
    return animate();
  };

  getCanvas = function() {
    return $("#myCanvas");
  };

}).call(this);
