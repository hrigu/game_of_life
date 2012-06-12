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