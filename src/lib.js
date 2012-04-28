(function() {
    var __hasProp = Object.prototype.hasOwnProperty;
    var __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor;
        child.__super__ = parent.prototype;
        return child;
    };

    this.gameOfLife = {};

    gameOfLife.Game = (function() {

        Game.LIVE = true;

        Game.DEAD = false;

        function Game(numOfColumns, numOfRows) {
            var column, x, y, _ref, _ref2;
            this.numOfColumns = numOfColumns;
            this.numOfRows = numOfRows;
            this.strategy = new gameOfLife.DiagonalStrategy(this);
            this.cells = [];
            for (x = 1,_ref = this.numOfColumns; 1 <= _ref ? x <= _ref : x >= _ref; 1 <= _ref ? x++ : x--) {
                column = [];
                for (y = 1,_ref2 = this.numOfRows; 1 <= _ref2 ? y <= _ref2 : y >= _ref2; 1 <= _ref2 ? y++ : y--) {
                    column.push(gameOfLife.Game.DEAD);
                }
                this.cells.push(column);
            }
        }

        Game.prototype.set = function(x, y, value) {
            var point;
            if (value == null) value = gameOfLife.Game.LIVE;
            point = this.modulo([x, y]);
            this.cells[point[0]][point[1]] = value;
        };

        Game.prototype.get = function(x, y) {
            var point;
            point = this.modulo([x, y]);
            this.cells[point[0]][point[1]];
        };

        Game.prototype.modulo = function(point) {
            var x = point[0];
            if (x < 0) x += this.numOfColumns;
            x = x % this.numOfColumns;
            var y = point[1];
            if (y < 0) y += this.numOfRows;
            y = y % this.numOfRows;
            return [x, y];
        };

        Game.prototype.nextRound = function() {
            this.strategy.nextRound();
        };

        return Game;

    })();

    gameOfLife.Strategy = (function() {

        function Strategy(game) {
            this.game = game;
        }

        Strategy.prototype.nextRound = function() {
            var changes = [];
            for (var x = 0; x < this.game.numOfColumns; x++) {
                for (var y = 0; y < this.game.numOfRows; y++) {
                    if (this.game.cells[x][y]) {
                        this.handleAliveCell(x, y, changes);
                    } else {
                        this.handleDeadCell(x, y, changes);
                    }
                }
            }
            for (var i = 0; i < changes.length; i++) {
                var change = changes[i];
                this.game.set(change[0], change[1], change[2]);
            }
        };

        Strategy.prototype.handleAliveCell = function(x, y, changes) {
        };
        Strategy.prototype.handleDeadCell = function(x, y, changes) {
        };

        return Strategy;

    })();

    gameOfLife.DiagonalStrategy = (function(_super) {

        __extends(DiagonalStrategy, _super);

        function DiagonalStrategy() {
            DiagonalStrategy.__super__.constructor.apply(this, arguments);
        }

        DiagonalStrategy.prototype.handleAliveCell = function(x, y, changes) {
            changes.push([x, y, false]);
            changes.push([x + 1, y + 1, true]);
        };

        return DiagonalStrategy;

    })(gameOfLife.Strategy);

    gameOfLife.Drawer = (function() {

        function Drawer(game, factor) {
            this.game = game;
            this.factor = factor;
        }

        Drawer.prototype.drawGrid = function(context) {
            var width = this.game.numOfColumns * this.factor;
            var height = this.game.numOfRows * this.factor;
            context.beginPath();
            for (var rowNum = 0; rowNum <= this.game.numOfRows; rowNum++) {
                var y = rowNum * this.factor + 0.5;
                context.moveTo(0, y);
                context.lineTo(width, y);
            }
            for (var colNum = 0; colNum <= this.game.numOfColumns; colNum++) {
                var x = colNum * this.factor + 0.5;
                context.moveTo(x, 0);
                context.lineTo(x, height);
            }
            context.strokeStyle = "black";
            context.stroke();
        };

        Drawer.prototype.draw = function(context) {
            for (var x = 0; x < this.game.numOfColumns; x++) {
                for (var y = 0; y < this.game.numOfRows; y++) {
                    if (this.game.cells[x][y]) {
                        context.fillStyle = "black";
                    } else {
                        context.fillStyle = "white";
                    }
                    this.drawRect(context, x, y);
                }
            }
        };

        Drawer.prototype.drawRect = function(context, x, y) {
            context.fillRect(x * this.factor + 1, y * this.factor + 1, this.factor - 1, this.factor - 1);
        };

        return Drawer;

    })();

}).call(this);
