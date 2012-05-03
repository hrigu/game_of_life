(function() {
  var ctx, drawer, game, getCanvas, run_loop, setGlider;

  game = null;

  ctx = null;

  drawer = null;

  jQuery(function() {
    var canvas;
    canvas = getCanvas();
    ctx = canvas.getContext('2d');
    game = new gameOfLife.Game(120, 80);
    /*
      game.set(8,10)
      game.set(8,11)
      game.set(8,12)
      game.set(9,10)
      game.set(9,11)
      game.set(9,12)
      game.set(10,10)
      game.set(10,11)
      game.set(10,12)
      game.set(11,10)
      game.set(11,11)
      game.set(11,12)
      game.set(12,10)
      game.set(12,11)
      game.set(12,12)
    */
    setGlider(10, 10, game, [-1, -1]);
    setGlider(20, 20, game);
    setGlider(30, 30, game, [-1, 2]);
    setGlider(40, 40, game, [1, -1]);
    /*
      setGlider(10, 2, game)
      setGlider(15, 2, game)
      setGlider(20, 2, game)
      setGlider(23, 3, game)
      setGlider(25, 2, game)
    */
    drawer = new gameOfLife.Drawer(game, 4);
    drawer.drawGrid(ctx);
    return setInterval(run_loop, 1);
  });

  run_loop = function() {
    drawer.draw(ctx);
    return game.nextRound();
  };

  getCanvas = function() {
    return $("#myCanvas")[0];
  };

  setGlider = function(x, y, game, change) {
    var point, points, _i, _j, _len, _len2, _results;
    points = [];
    points.push([0, 0]);
    points.push([1, 1]);
    points.push([-1, 2]);
    points.push([0, 2]);
    points.push([1, 2]);
    if (change) {
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        point = points[_i];
        point[0] = point[0] * change[0];
        point[1] = point[1] * change[1];
      }
    }
    _results = [];
    for (_j = 0, _len2 = points.length; _j < _len2; _j++) {
      point = points[_j];
      _results.push(game.set(x + point[0], x + point[1]));
    }
    return _results;
  };

}).call(this);
