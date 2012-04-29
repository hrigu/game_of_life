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
      this.strategy = new gameOfLife.BrownMovingStrategy(this);
      this.cells = this.initCells();
      this.oldCells = this.initCells();
    }

    Game.prototype.initCells = function() {
      var cells, column, x, y, _ref, _ref2;
      cells = [];
      for (x = 1, _ref = this.numOfColumns; 1 <= _ref ? x <= _ref : x >= _ref; 1 <= _ref ? x++ : x--) {
        column = [];
        for (y = 1, _ref2 = this.numOfRows; 1 <= _ref2 ? y <= _ref2 : y >= _ref2; 1 <= _ref2 ? y++ : y--) {
          column.push(gameOfLife.Game.DEAD);
        }
        cells.push(column);
      }
      return cells;
    };

    Game.prototype.reset = function(cells) {
      var x, y, _ref, _results;
      _results = [];
      for (x = 0, _ref = this.numOfColumns - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 0, _ref2 = this.numOfRows - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
            _results2.push(cells[x][y] = gameOfLife.Game.DEAD);
          }
          return _results2;
        }).call(this));
      }
      return _results;
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
      return this.strategy.nextRound();
    };

    return Game;

  })();

  gameOfLife.Strategy = (function() {

    function Strategy(game) {
      this.game = game;
    }

    Strategy.prototype.nextRound = function() {
      var x, y, _ref, _results;
      this.prepareBoard();
      _results = [];
      for (x = 0, _ref = this.game.numOfColumns - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 0, _ref2 = this.game.numOfRows - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
            if (this.game.oldCells[x][y]) {
              _results2.push(this.handleAliveCell(x, y));
            } else {
              _results2.push(this.handleDeadCell(x, y));
            }
          }
          return _results2;
        }).call(this));
      }
      return _results;
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
      var x, y, _ref, _results;
      _results = [];
      for (x = 0, _ref = this.game.numOfColumns - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 0, _ref2 = this.game.numOfRows - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
            if (this.game.cells[x][y]) {
              context.fillStyle = "black";
            } else {
              context.fillStyle = "white";
            }
            _results2.push(this.drawRect(context, x, y));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    Drawer.prototype.drawRect = function(context, x, y) {
      return context.fillRect(x * this.factor + 1, y * this.factor + 1, this.factor - 1, this.factor - 1);
    };

    return Drawer;

  })();

}).call(this);
