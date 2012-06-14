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
        game.set(0, 0);
        strategy.nextRound();
        expect(strategy.handleDeadCell.callCount).toBe(1);
        return expect(strategy.handleDeadCell).toHaveBeenCalledWith(0, 1);
      });
      return it("should call 'handleAliveCell' for all live cell", function() {
        game.set(0, 0);
        strategy.nextRound();
        expect(strategy.handleAliveCell.callCount).toBe(1);
        return expect(strategy.handleAliveCell).toHaveBeenCalledWith(0, 0);
      });
    });
  });

  describe("GameOfLifeStrategy", function() {
    var game, strategy;
    game = null;
    strategy = null;
    beforeEach(function() {
      game = new gameOfLife.Game(3, 3);
      return strategy = new gameOfLife.GameOfLifeStrategy(game);
    });
    describe("numOfLivingNeighbours", function() {
      describe("no living neighburs", function() {
        return it("should return 0", function() {
          game.set(1, 1);
          strategy.prepareBoard();
          return expect(strategy.numOfLivingNeighbours(1, 1)).toBe(0);
        });
      });
      describe("1 living neighburs", function() {
        return it("should return 1", function() {
          game.set(0, 1);
          strategy.prepareBoard();
          return expect(strategy.numOfLivingNeighbours(1, 1)).toBe(1);
        });
      });
      describe("3 living neighburs", function() {
        return it("should return 3", function() {
          game.set(0, 1);
          game.set(0, 0);
          game.set(2, 2);
          strategy.prepareBoard();
          return expect(strategy.numOfLivingNeighbours(1, 1)).toBe(3);
        });
      });
      return describe("8 living neighburs", function() {
        return it("should return 8", function() {
          game.set(0, 0);
          game.set(0, 1);
          game.set(0, 2);
          game.set(1, 0);
          game.set(1, 2);
          game.set(2, 0);
          game.set(2, 1);
          game.set(2, 2);
          strategy.prepareBoard();
          return expect(strategy.numOfLivingNeighbours(1, 1)).toBe(8);
        });
      });
    });
    describe("handleAliveCell", function() {
      var spy;
      spy = function(livingNeighbours) {
        spyOn(strategy, 'numOfLivingNeighbours').andReturn(livingNeighbours);
        spyOn(game, "set");
        return strategy.handleAliveCell(1, 1);
      };
      describe("when 1 neighbour are alive", function() {
        return it("should remain the current cell to be DEAD", function() {
          spy(1);
          return expect(game.set).not.toHaveBeenCalled();
        });
      });
      describe("when 2 neighbours are alive", function() {
        return it("should set the current cell to ALIVE", function() {
          spy(2);
          return expect(game.set).toHaveBeenCalledWith(1, 1, gameOfLife.Game.LIVE);
        });
      });
      describe("when 3 neighbours are alive", function() {
        return it("should set the current cell to ALIVE", function() {
          spy(3);
          return expect(game.set).toHaveBeenCalledWith(1, 1, gameOfLife.Game.LIVE);
        });
      });
      return describe("when 4 neighbours are alive", function() {
        return it("should remain the current cell to be DEAD", function() {
          spy(4);
          return expect(game.set).not.toHaveBeenCalled();
        });
      });
    });
    return describe("handleDeadCell", function() {
      var spy;
      spy = function(livingNeighbours) {
        spyOn(strategy, 'numOfLivingNeighbours').andReturn(livingNeighbours);
        spyOn(game, "set");
        return strategy.handleDeadCell(1, 1);
      };
      describe("when 2 neighbours are alive", function() {
        return it("should remain the current cell to be DEAD", function() {
          spy(2);
          return expect(game.set).not.toHaveBeenCalled();
        });
      });
      describe("when 3 neighbours are alive", function() {
        return it("should set the current cell to ALIVE", function() {
          spy(3);
          return expect(game.set).toHaveBeenCalledWith(1, 1, gameOfLife.Game.LIVE);
        });
      });
      return describe("when 4 neighbours are alive", function() {
        return it("should remain the current cell to be DEAD", function() {
          spy(4);
          return expect(game.set).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("DiagonalStrategy", function() {
    var game, strategy;
    game = null;
    strategy = null;
    beforeEach(function() {
      game = new gameOfLife.Game(1, 2);
      return strategy = new gameOfLife.DiagonalStrategy(game);
    });
    return describe("handleAliveCell", function() {
      return it("should kill the actual cell and make the neighbour right-beneath to live", function() {
        game.set(0, 0);
        strategy.prepareBoard();
        strategy.handleAliveCell(0, 0);
        expect(game.get(0, 0)).toBe(false);
        expect(game.get(1, 1)).toBe(true);
        return expect(game.get(1, 0)).toBe(false);
      });
    });
  });

}).call(this);
