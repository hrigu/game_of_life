(function() {

  this.gameOfLife = {};

  gameOfLife.Game = (function() {

    Game.LIVE = true;

    Game.DEAD = false;

    function Game(numOfColumns, numOfRows) {
      this.board = new gameOfLife.Board(numOfColumns, numOfRows);
    }

    Game.prototype.nextRound = function() {
      return this.board.move();
    };

    return Game;

  })();

  gameOfLife.Board = (function() {

    function Board(numOfColumns, numOfRows) {
      var column, x, y, _ref, _ref2;
      this.numOfColumns = numOfColumns;
      this.numOfRows = numOfRows;
      this.deads = [];
      this.lives = [];
      this.cells = [];
      for (x = 1, _ref = this.numOfColumns; 1 <= _ref ? x <= _ref : x >= _ref; 1 <= _ref ? x++ : x--) {
        column = [];
        for (y = 1, _ref2 = this.numOfRows; 1 <= _ref2 ? y <= _ref2 : y >= _ref2; 1 <= _ref2 ? y++ : y--) {
          column.push(gameOfLife.Game.DEAD);
        }
        this.cells.push(column);
      }
    }

    Board.prototype.setLive = function(x, y) {
      var point;
      point = this.createPoint(x, y);
      this.lives.push(point);
      return this.cells[point.x][point.y] = gameOfLife.Game.LIVE;
    };

    Board.prototype.createPoint = function(x, y) {
      if (y < 0) y = this.numOfRows + y;
      if (x < 0) x = this.numOfColumns + x;
      x = x % this.numOfColumns;
      y = y % this.numOfRows;
      return {
        x: x,
        y: y
      };
    };

    Board.prototype.move = function() {
      return this.gameOfLife();
    };

    Board.prototype.gameOfLife = function() {
      var dead, live, newLives, starving, x, y, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _results;
      newLives = [];
      starving = [];
      for (x = 0, _ref = this.numOfColumns - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        for (y = 0, _ref2 = this.numOfRows - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          if (this.cells[x][y]) {
            if (this.numOfLivingNeighbours(x, y) === 2 || this.numOfLivingNeighbours(x, y) === 3) {
              newLives.push(this.createPoint(x, y));
            } else {
              starving.push(this.createPoint(x, y));
            }
          } else {
            if (this.numOfLivingNeighbours(x, y) === 3) {
              newLives.push(this.createPoint(x, y));
            }
          }
        }
      }
      this.deads = starving;
      this.lives = newLives;
      _ref3 = this.deads;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        dead = _ref3[_i];
        this.cells[dead.x][dead.y] = gameOfLife.Game.DEAD;
      }
      _ref4 = this.lives;
      _results = [];
      for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
        live = _ref4[_j];
        _results.push(this.cells[live.x][live.y] = gameOfLife.Game.LIVE);
      }
      return _results;
    };

    Board.prototype.numOfLivingNeighbours = function(x, y) {
      var livingNeighbours, n, neighbours, _i, _len;
      neighbours = [this.createPoint(x - 1, y - 1), this.createPoint(x - 1, y), this.createPoint(x - 1, y + 1), this.createPoint(x, y - 1), this.createPoint(x, y + 1), this.createPoint(x + 1, y - 1), this.createPoint(x + 1, y), this.createPoint(x + 1, y + 1)];
      livingNeighbours = 0;
      for (_i = 0, _len = neighbours.length; _i < _len; _i++) {
        n = neighbours[_i];
        if (this.cells[n.x][n.y]) livingNeighbours = livingNeighbours + 1;
      }
      return livingNeighbours;
    };

    Board.prototype.simpleGlider = function() {
      var dead, live, newLives, x, y, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _results;
      newLives = [];
      _ref = this.lives;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        live = _ref[_i];
        x = live.x + 1;
        y = live.y + 1;
        newLives.push(this.createPoint(x, y));
      }
      this.deads = this.lives;
      this.lives = newLives;
      _ref2 = this.deads;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        dead = _ref2[_j];
        this.cells[dead.x][dead.y] = gameOfLife.Game.DEAD;
      }
      _ref3 = this.lives;
      _results = [];
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        live = _ref3[_k];
        _results.push(this.cells[live.x][live.y] = gameOfLife.Game.LIVE);
      }
      return _results;
    };

    Board.prototype.randomNumber = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return Board;

  })();

  gameOfLife.Drawer = (function() {

    function Drawer(game, factor) {
      this.game = game;
      this.factor = factor;
    }

    Drawer.prototype.drawGrid = function(context) {
      var board, colNum, height, rowNum, width, x, y, _ref, _ref2;
      width = this.game.board.numOfColumns * this.factor;
      height = this.game.board.numOfRows * this.factor;
      context.beginPath();
      board = this.game.board;
      for (rowNum = 0, _ref = board.numOfRows; 0 <= _ref ? rowNum <= _ref : rowNum >= _ref; 0 <= _ref ? rowNum++ : rowNum--) {
        y = rowNum * this.factor + 0.5;
        context.moveTo(0, y);
        context.lineTo(width, y);
      }
      for (colNum = 0, _ref2 = board.numOfColumns; 0 <= _ref2 ? colNum <= _ref2 : colNum >= _ref2; 0 <= _ref2 ? colNum++ : colNum--) {
        x = colNum * this.factor + 0.5;
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }
      context.strokeStyle = "black";
      return context.stroke();
    };

    Drawer.prototype.draw = function(context) {
      var dead, live, _i, _j, _len, _len2, _ref, _ref2, _results;
      context.fillStyle = "white";
      _ref = this.game.board.deads;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dead = _ref[_i];
        this.drawRect(context, dead);
      }
      context.fillStyle = "black";
      _ref2 = this.game.board.lives;
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        live = _ref2[_j];
        _results.push(this.drawRect(context, live));
      }
      return _results;
    };

    Drawer.prototype.drawRect = function(context, rect) {
      return context.fillRect(rect.x * this.factor + 1, rect.y * this.factor + 1, this.factor - 1, this.factor - 1);
    };

    return Drawer;

  })();

}).call(this);
