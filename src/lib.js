(function() {

  this.gameOfLife = {};

  gameOfLife.Game = (function() {

    Game.LIVE = true;

    Game.DEAD = false;

    function Game(numOfColumns, numOfRows) {
      var column, x, y, _ref, _ref2;
      this.numOfColumns = numOfColumns;
      this.numOfRows = numOfRows;
      this.cells = [];
      for (x = 1, _ref = this.numOfColumns; 1 <= _ref ? x <= _ref : x >= _ref; 1 <= _ref ? x++ : x--) {
        column = [];
        for (y = 1, _ref2 = this.numOfRows; 1 <= _ref2 ? y <= _ref2 : y >= _ref2; 1 <= _ref2 ? y++ : y--) {
          column.push(gameOfLife.Game.DEAD);
        }
        this.cells.push(column);
      }
    }

    Game.prototype.setLive = function(x, y) {
      return this.cells[x][y] = gameOfLife.Game.LIVE;
    };

    Game.prototype.createPoint = function(x, y) {
      if (y < 0) y = this.numOfRows + y;
      if (x < 0) x = this.numOfColumns + x;
      x = x % this.numOfColumns;
      y = y % this.numOfRows;
      return {
        x: x,
        y: y
      };
    };

    Game.prototype.nextRound = function() {
      return this.nextRoundOfgameOfLife();
    };

    Game.prototype.nextRoundOfgameOfLife = function() {
      var dead, deads, live, lives, x, y, _i, _j, _len, _len2, _ref, _ref2, _results;
      lives = [];
      deads = [];
      for (x = 0, _ref = this.numOfColumns - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        for (y = 0, _ref2 = this.numOfRows - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          if (this.cells[x][y]) {
            if (this.numOfLivingNeighbours(x, y) === 2 || this.numOfLivingNeighbours(x, y) === 3) {
              lives.push([x, y]);
            } else {
              deads.push([x, y]);
            }
          } else {
            if (this.numOfLivingNeighbours(x, y) === 3) lives.push([x, y]);
          }
        }
      }
      for (_i = 0, _len = deads.length; _i < _len; _i++) {
        dead = deads[_i];
        this.cells[dead[0]][dead[1]] = gameOfLife.Game.DEAD;
      }
      _results = [];
      for (_j = 0, _len2 = lives.length; _j < _len2; _j++) {
        live = lives[_j];
        _results.push(this.cells[live[0]][live[1]] = gameOfLife.Game.LIVE);
      }
      return _results;
    };

    Game.prototype.numOfLivingNeighbours = function(x, y) {
      var livingNeighbours, n, nbs, p, _i, _len;
      nbs = [[x - 1, y - 1], [x - 1, y], [x - 1, y + 1], [x, y - 1], [x, y + 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]];
      livingNeighbours = 0;
      for (_i = 0, _len = nbs.length; _i < _len; _i++) {
        n = nbs[_i];
        p = this.createPoint(n[0], n[1]);
        if (this.cells[p.x][p.y]) livingNeighbours = livingNeighbours + 1;
      }
      return livingNeighbours;
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
