describe "Game", ->
  game = null
  beforeEach ->
    game = new gameOfLife.Game(20, 30)

  it "should have a board", ->
    expect(game.board).toBeDefined

describe "Board", ->
  board = null
  beforeEach ->
    board = new gameOfLife.Board(3, 2)
  it "should have the right num of columns", ->
    expect(board.numOfColumns).toBe 3
  it "should have the right num of rows", ->
    expect(board.numOfRows).toBe 2

  describe "setLive", ->
    it "the live cell should be in the lives array", ->
      expect(board.lives.length).toBe 0
      board.setLive(2, 1)
      expect(board.lives.length).toBe 1
      expect(board.lives[0]).toEqual {x:2, y:1}

  describe "numOfLivingNeighbours", ->
    beforeEach ->
      board = new gameOfLife.Board(3, 3)
    describe "no living neighburs", ->
      it "should return 0", ->
        board.setLive(1, 1)
        expect(board.numOfLivingNeighbours(1,1)).toBe 0
    describe "1 living neighburs", ->
      it "should return 1", ->
        board.setLive(0, 1)
        expect(board.numOfLivingNeighbours(1,1)).toBe 1

    describe "3 living neighburs", ->
      it "should return 3", ->
        board.setLive(0, 1)
        board.setLive(0, 0)
        board.setLive(2, 2)
        expect(board.numOfLivingNeighbours(1,1)).toBe 3

    describe "5 living neighburs", ->
      it "should return 5", ->
        board.setLive(0, 1)
        board.setLive(0, 0)
        board.setLive(2, 0)
        board.setLive(2, 1)
        board.setLive(2, 2)
        expect(board.numOfLivingNeighbours(1,1)).toBe 5
    describe "8 living neighburs", ->
      it "should return 8", ->
        board.setLive(0, 0)
        board.setLive(0, 1)
        board.setLive(0, 2)
        board.setLive(1, 0)
        board.setLive(1, 2)
        board.setLive(2, 0)
        board.setLive(2, 1)
        board.setLive(2, 2)
        expect(board.numOfLivingNeighbours(1,1)).toBe 8
###
  describe "move", ->
    it "should set the next cell be alive (and the actual to dead)", ->
      board.setLive(0, 0)
      expect(board.lives.length).toBe 1
      expect(board.lives[0]).toEqual {x:0, y:0}
      expect(board.deads.length).toBe 0
      board.move()
      expect(board.lives.length).toBe 1
      expect(board.lives[0]).toEqual {x:1, y:1}
      expect(board.deads.length).toBe 1
      expect(board.deads[0]).toEqual {x:0, y:0}

    it "should set the most left cell to alive if the actual is the most right one", ->
      board.setLive(2, 0)
      board.move()
      expect(board.lives[0]).toEqual {x:0, y:1}

###
