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
    describe("setLive", function() {
      return it("the live cell is stored in cells", function() {
        game.setLive(2, 1);
        return expect(game.cells[2][1]).toBe(true);
      });
    });
    return describe("numOfLivingNeighbours", function() {
      beforeEach(function() {
        return game = new gameOfLife.Game(3, 3);
      });
      describe("no living neighburs", function() {
        return it("should return 0", function() {
          game.setLive(1, 1);
          return expect(game.numOfLivingNeighbours(1, 1)).toBe(0);
        });
      });
      describe("1 living neighburs", function() {
        return it("should return 1", function() {
          game.setLive(0, 1);
          return expect(game.numOfLivingNeighbours(1, 1)).toBe(1);
        });
      });
      describe("3 living neighburs", function() {
        return it("should return 3", function() {
          game.setLive(0, 1);
          game.setLive(0, 0);
          game.setLive(2, 2);
          return expect(game.numOfLivingNeighbours(1, 1)).toBe(3);
        });
      });
      describe("5 living neighburs", function() {
        return it("should return 5", function() {
          game.setLive(0, 1);
          game.setLive(0, 0);
          game.setLive(2, 0);
          game.setLive(2, 1);
          game.setLive(2, 2);
          return expect(game.numOfLivingNeighbours(1, 1)).toBe(5);
        });
      });
      return describe("8 living neighburs", function() {
        return it("should return 8", function() {
          game.setLive(0, 0);
          game.setLive(0, 1);
          game.setLive(0, 2);
          game.setLive(1, 0);
          game.setLive(1, 2);
          game.setLive(2, 0);
          game.setLive(2, 1);
          game.setLive(2, 2);
          return expect(game.numOfLivingNeighbours(1, 1)).toBe(8);
        });
      });
    });
  });

}).call(this);
