describe "Game", ->
  game = null
  beforeEach ->
    game = new gameOfLife.Game(3, 2)
  it "should have the right num of columns", ->
    expect(game.numOfColumns).toBe 3
  it "should have the right num of rows", ->
    expect(game.numOfRows).toBe 2

  describe "set", ->
    it "should store a cell with the given value at the given position", ->
      game.set(2, 1, gameOfLife.Game.LIVE)
      expect(game.cells[2][1]).toBe gameOfLife.Game.LIVE
      game.set(2, 1, gameOfLife.Game.DEAD)
      expect(game.cells[2][1]).toBe gameOfLife.Game.DEAD
    it "should handle position shift if the position is out of the board size", ->
      game.set(3, 3, gameOfLife.Game.LIVE)
      expect(game.cells[0][1]).toBe gameOfLife.Game.LIVE
    describe "if this method is called without value", ->
      it "should store a live cell at the given position", ->
        game.set(2, 1)
        expect(game.cells[2][1]).toBe true

describe "Strategy", ->
  game = null
  strategy = null
  beforeEach ->
    game = new gameOfLife.Game(1, 2)
    strategy = new gameOfLife.Strategy(game)
    spyOn(strategy, "handleDeadCell")
    spyOn(strategy, "handleAliveCell")

  describe "nextRound", ->
    it "should visit every cell", ->
      strategy.nextRound()
      expect(strategy.handleDeadCell.callCount).toBe 2
    it "should call 'handleDeadCell' for all dead cell", ->
      changes = []
      game.set(0,0)
      strategy.nextRound()
      expect(strategy.handleDeadCell.callCount).toBe 1
      expect(strategy.handleDeadCell).toHaveBeenCalledWith(0,1,changes)
    it "should call 'handleAliveCell' for all live cell", ->
      changes = []
      game.set(0,0)
      strategy.nextRound()
      expect(strategy.handleAliveCell.callCount).toBe 1
      expect(strategy.handleAliveCell).toHaveBeenCalledWith(0,0,changes)

describe "GameOfLifeStrategy", ->
  game = null
  strategy = null
  beforeEach ->
    game = new gameOfLife.Game(3, 3)
    strategy = new gameOfLife.GameOfLifeStrategy(game)

  describe "numOfLivingNeighbours", ->

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

describe "DiagonalStrategy", ->
  game = null;
  strategy = null;

  beforeEach ->
    game = new gameOfLife.Game(1, 2);
    strategy = new gameOfLife.DiagonalStrategy(game);

  describe "handleAliveCell", ->
    it "should kill the actual cell and make the neighbour right-beneath to live", ->
      game.set(0, 0)
      changes = []
      strategy.handleAliveCell(0, 0, changes)
      expect(changes.length).toBe(2)
      #actual
      expect(changes[0][0]).toBe(0)
      expect(changes[0][1]).toBe(0)
      expect(changes[0][2]).toBe(gameOfLife.Game.DEAD)
      #neighbour
      expect(changes[1][0]).toBe(1)
      expect(changes[1][1]).toBe(1)
      expect(changes[1][2]).toBe(gameOfLife.Game.LIVE)
