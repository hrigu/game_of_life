(function() {

  describe("Game", function() {
    var game;
    game = null;
    beforeEach(function() {
      return game = new gameOfLife.Game(3, 2);
    });
    describe("initGame", function() {
      it("should have the right num of columns", function() {
        return expect(game.numOfColumns).toBe(3);
      });
      it("should have the right num of rows", function() {
        return expect(game.numOfRows).toBe(2);
      });
      return it("all cells should be dead", function() {
        return game.visit(function(x, y) {
          return expect(game.cells[x][y]).toBe(gameOfLife.Game.DEAD);
        });
      });
    });
    describe("visit", function() {
      return it("should visit every cell", function() {
        var numOfCell, numOfColumn, onBeginColumn, onCell;
        numOfCell = 0;
        numOfColumn = 0;
        onBeginColumn = function(x) {
          return numOfColumn = numOfColumn + 1;
        };
        onCell = function(x, y) {
          return numOfCell = numOfCell + 1;
        };
        game.visit(onBeginColumn, onCell);
        expect(numOfColumn).toBe(6);
        return expect(numOfCell).toBe(3);
      });
    });
    return describe("set", function() {
      it("should store a cell with the given value at the given position", function() {
        game.set(2, 1, gameOfLife.Game.LIVE);
        expect(game.cells[2][1]).toBe(gameOfLife.Game.LIVE);
        game.set(2, 1, gameOfLife.Game.DEAD);
        return expect(game.cells[2][1]).toBe(gameOfLife.Game.DEAD);
      });
      it("should handle position shift if the position is out of the board size", function() {
        game.set(3, 3, gameOfLife.Game.LIVE);
        return expect(game.cells[0][1]).toBe(gameOfLife.Game.LIVE);
      });
      return describe("if this method is called without value", function() {
        return it("should store a live cell at the given position", function() {
          game.set(2, 1);
          return expect(game.cells[2][1]).toBe(true);
        });
      });
    });
  });

}).call(this);
