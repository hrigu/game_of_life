//the library is wrapped in the so called top-level function safety wrapper to handle the namespace
(function() {

    //the only object that is visible outside of the library
    this.gameOfLife = {};

    gameOfLife.Game = (function() {

        Game.LIVE = true;

        Game.DEAD = false;

        //initializes the board with dead cells
        function Game(numOfColumns, numOfRows) {
            this.numOfColumns = numOfColumns;
            this.numOfRows = numOfRows;
            this.cells = [];
            for (var x = 0; x < this.numOfColumns; x++) {
                var column = [];
                for (var y = 0; y < this.numOfRows; y++) {
                    column.push(gameOfLife.Game.DEAD);
                }
                this.cells.push(column);
            }
        }

        //Sets the value on a specific cell. The value can be Game.LIVE or Game.DEAD
        Game.prototype.set = function(x, y, value) {
            if (value == null) value = gameOfLife.Game.LIVE;
            this.cells[x][y] = value;
        };

        Game.prototype.nextRound = function() {
            var changes = [];
            for (var x = 0; x < this.numOfColumns; x++) {
                for (var y = 0; y < this.numOfRows; y++) {
                    if (this.cells[x][y]) {
                        changes.push([x, y, false]);
                        changes.push([x + 1, y + 1, true]);
                    }
                }
            }
            for (var i = 0; i < changes.length; i++) {
                var change = changes[i];
                this.set(change[0], change[1], change[2]);
            }
        };

        return Game;

    })();

    //responsible to draw the game to the canvas
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
