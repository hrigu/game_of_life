(function() {
  var animate, ctx, doWork, drawer, game, getCanvas, isAnimated, lastTime, now, requestAnimFrame, toggleAnimate;

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
    drawer.draw(ctx);
    return animate();
  });

  toggleAnimate = function() {
    isAnimated = !isAnimated;
    if (isAnimated) return animate();
  };

  lastTime = Date.now();

  now = void 0;

  animate = function() {
    var waitsfor;
    if (isAnimated) {
      now = Date.now();
      waitsfor = now - lastTime;
      window.setTimeout(doWork, 1000);
      lastTime = now;
      return requestAnimFrame(function() {
        return animate();
      });
    }
  };

  doWork = function() {
    game.nextRound();
    return drawer.draw(ctx);
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
