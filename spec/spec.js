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
      return it("the live cell should be in the lives array", function() {
        expect(game.lives.length).toBe(0);
        game.setLive(2, 1);
        expect(game.lives.length).toBe(1);
        return expect(game.lives[0]).toEqual({
          x: 2,
          y: 1
        });
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

  /*
    describe "move", ->
      it "should set the next cell be alive (and the actual to dead)", ->
        game.setLive(0, 0)
        expect(game.lives.length).toBe 1
        expect(game.lives[0]).toEqual {x:0, y:0}
        expect(game.deads.length).toBe 0
        game.move()
        expect(game.lives.length).toBe 1
        expect(game.lives[0]).toEqual {x:1, y:1}
        expect(game.deads.length).toBe 1
        expect(game.deads[0]).toEqual {x:0, y:0}
  
      it "should set the most left cell to alive if the actual is the most right one", ->
        game.setLive(2, 0)
        game.move()
        expect(game.lives[0]).toEqual {x:0, y:1}
  */

}).call(this);
