(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.gameOfLife = {};

  gameOfLife.Game = (function() {

    Game.LIVE = true;

    Game.DEAD = false;

    function Game(numOfColumns, numOfRows) {
      this.numOfColumns = numOfColumns;
      this.numOfRows = numOfRows;
      this.cells = this.initCells();
      this.oldCells = this.initCells();
      this.startLifeInitializer = new gameOfLife.StartLifeInitializer(this);
    }

    Game.prototype.initCells = function() {
      var cells, column, onBeginColumn, onCell;
      cells = [];
      column = null;
      onBeginColumn = function() {
        column = [];
        return cells.push(column);
      };
      onCell = function() {
        return column.push(gameOfLife.Game.DEAD);
      };
      this.visit(onCell, onBeginColumn);
      return cells;
    };

    Game.prototype.initStartLife = function() {
      return this.startLifeInitializer.initStartLife();
    };

    Game.prototype.visit = function(onCell, onBeginColumn) {
      var x, y, _ref, _results;
      if (onBeginColumn == null) onBeginColumn = function() {};
      _results = [];
      for (x = 0, _ref = this.numOfColumns - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        onBeginColumn(x);
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 0, _ref2 = this.numOfRows - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
            _results2.push(onCell(x, y));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    Game.prototype.reset = function(cells) {
      return this.visit(function(x, y) {
        return cells[x][y] = gameOfLife.Game.DEAD;
      });
    };

    Game.prototype.set = function(x, y, value) {
      var point;
      if (value == null) value = gameOfLife.Game.LIVE;
      point = this.modulo([x, y]);
      return this.cells[point[0]][point[1]] = value;
    };

    Game.prototype.get = function(x, y) {
      var point;
      point = this.modulo([x, y]);
      return this.cells[point[0]][point[1]];
    };

    Game.prototype.getOld = function(x, y) {
      var point;
      point = this.modulo([x, y]);
      return this.oldCells[point[0]][point[1]];
    };

    Game.prototype.modulo = function(point) {
      var x, y;
      x = point[0];
      if (x < 0) x = this.numOfColumns + x;
      x = x % this.numOfColumns;
      y = point[1];
      if (y < 0) y = this.numOfRows + y;
      y = y % this.numOfRows;
      return [x, y];
    };

    Game.prototype.nextRound = function() {
      var _this = this;
      this.prepareBoard();
      return this.visit(function(x, y) {
        if (_this.oldCells[x][y]) return _this.set(x + 1, y + 1);
      });
    };

    Game.prototype.prepareBoard = function() {
      var newCells;
      newCells = this.oldCells;
      this.oldCells = this.cells;
      this.cells = newCells;
      return this.reset(this.cells);
    };

    return Game;

  })();

  gameOfLife.Strategy = (function() {

    function Strategy(game) {
      this.game = game;
    }

    Strategy.prototype.nextRound = function() {
      var _this = this;
      this.prepareBoard();
      return this.game.visit(function(x, y) {
        if (_this.game.oldCells[x][y]) {
          return _this.handleAliveCell(x, y);
        } else {
          return _this.handleDeadCell(x, y);
        }
      });
    };

    Strategy.prototype.prepareBoard = function() {
      var newCells;
      newCells = this.game.oldCells;
      this.game.oldCells = this.game.cells;
      this.game.cells = newCells;
      return this.game.reset(this.game.cells);
    };

    Strategy.prototype.handleAliveCell = function(x, y) {};

    Strategy.prototype.handleDeadCell = function(x, y) {};

    return Strategy;

  })();

  gameOfLife.DiagonalStrategy = (function(_super) {

    __extends(DiagonalStrategy, _super);

    function DiagonalStrategy() {
      DiagonalStrategy.__super__.constructor.apply(this, arguments);
    }

    DiagonalStrategy.prototype.handleAliveCell = function(x, y) {
      return this.game.set(x + 1, y + 1);
    };

    return DiagonalStrategy;

  })(gameOfLife.Strategy);

  gameOfLife.GameOfLifeStrategy = (function(_super) {

    __extends(GameOfLifeStrategy, _super);

    function GameOfLifeStrategy() {
      GameOfLifeStrategy.__super__.constructor.apply(this, arguments);
    }

    GameOfLifeStrategy.prototype.handleAliveCell = function(x, y) {
      var numOfLivingNeighbours;
      numOfLivingNeighbours = this.numOfLivingNeighbours(x, y);
      if (numOfLivingNeighbours === 2 || numOfLivingNeighbours === 3) {
        return this.game.set(x, y, true);
      }
    };

    GameOfLifeStrategy.prototype.handleDeadCell = function(x, y) {
      if (this.numOfLivingNeighbours(x, y) === 3) return this.game.set(x, y, true);
    };

    GameOfLifeStrategy.prototype.numOfLivingNeighbours = function(x, y) {
      var livingNeighbours, n, nbs, _i, _len;
      nbs = [[x - 1, y - 1], [x - 1, y], [x - 1, y + 1], [x, y - 1], [x, y + 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]];
      livingNeighbours = 0;
      for (_i = 0, _len = nbs.length; _i < _len; _i++) {
        n = nbs[_i];
        if (this.game.getOld(n[0], n[1])) livingNeighbours = livingNeighbours + 1;
      }
      return livingNeighbours;
    };

    return GameOfLifeStrategy;

  })(gameOfLife.Strategy);

  gameOfLife.BrownMovingStrategy = (function(_super) {

    __extends(BrownMovingStrategy, _super);

    function BrownMovingStrategy() {
      BrownMovingStrategy.__super__.constructor.apply(this, arguments);
    }

    BrownMovingStrategy.prototype.handleAliveCell = function(x, y) {
      var deads, r;
      deads = this.deadNeighbours(x, y);
      if (deads.length > 0) {
        r = this.randomNumber(0, deads.length - 1);
        return this.game.set(deads[r][0], deads[r][1]);
      } else {
        return this.game.set(x, y, true);
      }
    };

    BrownMovingStrategy.prototype.randomNumber = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    BrownMovingStrategy.prototype.deadNeighbours = function(x, y) {
      var deads, n, nbs, _i, _len;
      nbs = [[x - 1, y - 1], [x - 1, y], [x - 1, y + 1], [x, y - 1], [x, y + 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]];
      deads = [];
      for (_i = 0, _len = nbs.length; _i < _len; _i++) {
        n = nbs[_i];
        if (!(this.game.getOld(n[0], n[1]) || this.game.get(n[0], n[1]))) {
          deads.push(n);
        }
      }
      return deads;
    };

    return BrownMovingStrategy;

  })(gameOfLife.Strategy);

  gameOfLife.Drawer = (function() {

    function Drawer(game, factor) {
      this.game = game;
      this.factor = factor;
    }

    Drawer.prototype.drawGrid = function(context) {
      var colNum, height, rowNum, width, x, y, _ref, _ref2;
      width = this.game.numOfColumns * this.factor;
      height = this.game.numOfRows * this.factor;
      context.beginPath();
      for (rowNum = 0, _ref = this.game.numOfRows; 0 <= _ref ? rowNum <= _ref : rowNum >= _ref; 0 <= _ref ? rowNum++ : rowNum--) {
        y = rowNum * this.factor + 0.5;
        context.moveTo(0, y);
        context.lineTo(width, y);
      }
      for (colNum = 0, _ref2 = this.game.numOfColumns; 0 <= _ref2 ? colNum <= _ref2 : colNum >= _ref2; 0 <= _ref2 ? colNum++ : colNum--) {
        x = colNum * this.factor + 0.5;
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }
      context.strokeStyle = "black";
      return context.stroke();
    };

    Drawer.prototype.draw = function(context) {
      var _this = this;
      return this.game.visit(function(x, y) {
        if (_this.game.cells[x][y] !== _this.game.oldCells[x][y]) {
          if (_this.game.cells[x][y]) {
            context.fillStyle = "black";
          } else {
            context.fillStyle = "white";
          }
          return _this.drawRect(context, x, y);
        }
      });
    };

    Drawer.prototype.drawRect = function(context, x, y) {
      return context.fillRect(x * this.factor + 1, y * this.factor + 1, this.factor - 1, this.factor - 1);
    };

    return Drawer;

  })();

  gameOfLife.StartLifeInitializer = (function() {

    function StartLifeInitializer(game) {
      this.game = game;
    }

    StartLifeInitializer.prototype.initStartLife = function() {
      return this.initRandomLife(80, 120, 50, 100, 0.3);
    };

    StartLifeInitializer.prototype.initRandomLife = function(x_from, x_to, y_from, y_to, prob) {
      var x, y, _results;
      _results = [];
      for (x = x_from; x_from <= x_to ? x <= x_to : x >= x_to; x_from <= x_to ? x++ : x--) {
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (y = y_from; y_from <= y_to ? y <= y_to : y >= y_to; y_from <= y_to ? y++ : y--) {
            if (Math.random() < prob) {
              _results2.push(this.game.set(x, y));
            } else {
              _results2.push(void 0);
            }
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    StartLifeInitializer.prototype.setGlider = function(x, y, change) {
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
        _results.push(this.game.set(x + point[0], x + point[1]));
      }
      return _results;
    };

    return StartLifeInitializer;

  })();

}).call(this);
