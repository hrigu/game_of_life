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