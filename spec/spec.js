(function() {

  describe("Game", function() {
    var game;
    game = null;
    beforeEach(function() {
      return game = new gameOfLife.Game(3, 2);
    });
    it("should have the right num of columns", function() {
      return expect(game.numOfColumns).toBe(3);
    });
    it("should have the right num of rows", function() {
      return expect(game.numOfRows).toBe(2);
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

  describe("Strategy", function() {
    var game, strategy;
    game = null;
    strategy = null;
    beforeEach(function() {
      game = new gameOfLife.Game(1, 2);
      strategy = new gameOfLife.Strategy(game);
      spyOn(strategy, "handleDeadCell");
      return spyOn(strategy, "handleAliveCell");
    });
    return describe("nextRound", function() {
      it("should visit every cell", function() {
        strategy.nextRound();
        return expect(strategy.handleDeadCell.callCount).toBe(2);
      });
      it("should call 'handleDeadCell' for all dead cell", function() {
        var changes;
        changes = [];
        game.set(0, 0);
        strategy.nextRound();
        expect(strategy.handleDeadCell.callCount).toBe(1);
        return expect(strategy.handleDeadCell).toHaveBeenCalledWith(0, 1, changes);
      });
      return it("should call 'handleAliveCell' for all live cell", function() {
        var changes;
        changes = [];
        game.set(0, 0);
        strategy.nextRound();
        expect(strategy.handleAliveCell.callCount).toBe(1);
        return expect(strategy.handleAliveCell).toHaveBeenCalledWith(0, 0, changes);
      });
    });
  });

}).call(this);
