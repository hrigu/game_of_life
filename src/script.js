(function() {
  var animate, ctx, drawer, game, getCanvas, isAnimated, requestAnimFrame, toggleAnimate;

  game = null;

  ctx = null;

  drawer = null;

  isAnimated = false;

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
    return animate();
  });

  toggleAnimate = function() {
    isAnimated = !isAnimated;
    if (isAnimated) return animate();
  };

  animate = function() {
    if (isAnimated) {
      drawer.draw(ctx);
      game.nextRound();
      return requestAnimFrame(function() {
        return animate();
      });
    }
  };

  getCanvas = function() {
    return $("#myCanvas");
  };

  requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

}).call(this);
