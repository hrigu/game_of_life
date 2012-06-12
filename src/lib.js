(function() {

  this.gameOfLife = {};

  gameOfLife.Game = (function() {

    Game.LIVE = true;

    Game.DEAD = false;

    function Game(numOfColumns, numOfRows) {
      this.numOfColumns = numOfColumns;
      this.numOfRows = numOfRows;
      this.cells = this._initCells();
      this.oldCells = this._initCells();
    }

    Game.prototype._initCells = function() {
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
      return this.set(0, 0);
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
      this._prepareBoard();
      return this.visit(function(x, y) {
        if (_this.oldCells[x][y]) return _this.set(x + 1, y + 1);
      });
    };

    Game.prototype._prepareBoard = function() {
      var newCells;
      newCells = this.oldCells;
      this.oldCells = this.cells;
      this.cells = newCells;
      return this.reset(this.cells);
    };

    return Game;

  })();

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

}).call(this);
