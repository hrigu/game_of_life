(function() {
  var ctx, drawer, game, getCanvas, initRandomLife, initStartLife, run_loop, setGlider;

  game = null;

  ctx = null;

  drawer = null;

  jQuery(function() {
    var canvas;
    canvas = getCanvas();
    ctx = canvas.getContext('2d');
    game = new gameOfLife.Game(200, 160);
    initStartLife();
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

  initStartLife = function() {
    return initRandomLife(50, 100, 50, 100, 0.3);
  };

  /*
    setGlider(10, 10, game, [-1, -1])
    setGlider(20, 20, game)
    setGlider(30, 30, game, [-1, 1])
    setGlider(40, 40, game, [1, -1])
  */

  initRandomLife = function(x_from, x_to, y_from, y_to, prob) {
    var x, y, _results;
    _results = [];
    for (x = x_from; x_from <= x_to ? x <= x_to : x >= x_to; x_from <= x_to ? x++ : x--) {
      _results.push((function() {
        var _results2;
        _results2 = [];
        for (y = y_from; y_from <= y_to ? y <= y_to : y >= y_to; y_from <= y_to ? y++ : y--) {
          if (Math.random() < prob) {
            _results2.push(game.set(x, y));
          } else {
            _results2.push(void 0);
          }
        }
        return _results2;
      })());
    }
    return _results;
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
