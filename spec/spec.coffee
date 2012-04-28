describe "Game", ->
  game = null
  beforeEach ->
    game = new gameOfLife.Game(3, 2)
  it "should have the right num of columns", ->
    expect(game.numOfColumns).toBe 3
  it "should have the right num of rows", ->
    expect(game.numOfRows).toBe 2

  describe "set", ->
    it "the live cell is stored in cells", ->
      game.set(2, 1)
      expect(game.cells[2][1]).toBe true

describe "Strategy", ->
  game = null
  strategy = null
  describe "numOfLivingNeighbours", ->
    beforeEach ->
      game = new gameOfLife.Game(3, 3)
      strategy = game.strategy

    describe "no living neighburs", ->
      it "should return 0", ->
        game.set(1, 1)
        expect(strategy.numOfLivingNeighbours(1,1)).toBe 0
    describe "1 living neighburs", ->
      it "should return 1", ->
        game.set(0, 1)
        expect(strategy.numOfLivingNeighbours(1,1)).toBe 1

    describe "3 living neighburs", ->
      it "should return 3", ->
        game.set(0, 1)
        game.set(0, 0)
        game.set(2, 2)
        expect(strategy.numOfLivingNeighbours(1,1)).toBe 3

    describe "5 living neighburs", ->
      it "should return 5", ->
        game.set(0, 1)
        game.set(0, 0)
        game.set(2, 0)
        game.set(2, 1)
        game.set(2, 2)
        expect(strategy.numOfLivingNeighbours(1,1)).toBe 5
    describe "8 living neighburs", ->
      it "should return 8", ->
        game.set(0, 0)
        game.set(0, 1)
        game.set(0, 2)
        game.set(1, 0)
        game.set(1, 2)
        game.set(2, 0)
        game.set(2, 1)
        game.set(2, 2)
        expect(strategy.numOfLivingNeighbours(1,1)).toBe 8