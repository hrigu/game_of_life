describe "Game", ->
  game = null


  beforeEach ->
    game = new gameOfLife.Game(3, 2)

  describe "initGame", ->
    it "should have the right num of columns", ->
      expect(game.numOfColumns).toBe 3
    it "should have the right num of rows", ->
      expect(game.numOfRows).toBe 2
    it "all cells should be dead", ->
      game.visit (x, y) ->
        expect(game.cells[x][y]).toBe(gameOfLife.Game.DEAD)

  describe "visit", ->
    it "should visit every cell", ->
      numOfCell = 0
      numOfColumn = 0

      onBeginColumn = (x) ->
        numOfColumn = numOfColumn+1

      onCell = (x, y) ->
        numOfCell = numOfCell + 1

      game.visit(onBeginColumn, onCell)

      expect(numOfColumn).toBe 6
      expect(numOfCell).toBe 3

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
      game.set(0,0)
      strategy.nextRound()
      expect(strategy.handleDeadCell.callCount).toBe 1
      expect(strategy.handleDeadCell).toHaveBeenCalledWith(0,1)
    it "should call 'handleAliveCell' for all live cell", ->
      game.set(0,0)
      strategy.nextRound()
      expect(strategy.handleAliveCell.callCount).toBe 1
      expect(strategy.handleAliveCell).toHaveBeenCalledWith(0,0)

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
        strategy.prepareBoard()
        expect(strategy.numOfLivingNeighbours(1,1)).toBe 0

    describe "1 living neighburs", ->
      it "should return 1", ->
        game.set(0, 1)
        strategy.prepareBoard()
        expect(strategy.numOfLivingNeighbours(1,1)).toBe 1

    describe "3 living neighburs", ->
      it "should return 3", ->
        game.set(0, 1)
        game.set(0, 0)
        game.set(2, 2)
        strategy.prepareBoard()
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
        strategy.prepareBoard()
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
      strategy.prepareBoard()
      strategy.handleAliveCell(0, 0)
      #actual
      expect(game.get(0,0)).toBe(false)
      expect(game.get(1,1)).toBe(true)
      expect(game.get(1,0)).toBe(false)
