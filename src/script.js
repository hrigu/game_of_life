(function() {
  var animate, ctx, doWork, drawer, game, isAnimated, tempoInMillis, toggleAnimate;

  game = void 0;

  ctx = void 0;

  drawer = void 0;

  isAnimated = true;

  tempoInMillis = 500;

  jQuery(function() {
    var canvas;
    canvas = $("#myCanvas");
    ctx = canvas[0].getContext('2d');
    canvas.click(toggleAnimate);
    game = new gameOfLife.Game(10, 8);
    game.initStartLife();
    drawer = new gameOfLife.Drawer(game, 20);
    drawer.drawGrid(ctx);
    drawer.draw(ctx);
    return animate();
  });

  toggleAnimate = function() {
    isAnimated = !isAnimated;
    if (isAnimated) return animate();
  };

  animate = function() {
    if (isAnimated) return window.setTimeout(doWork, tempoInMillis);
  };

  doWork = function() {
    game.nextRound();
    drawer.draw(ctx);
    return animate();
  };

}).call(this);
