this.gameOfLife = {}
class gameOfLife.Game
  @LIVE = true
  @DEAD = false

  constructor:(numOfColumns, numOfRows) ->
    @board = new gameOfLife.Board(numOfColumns, numOfRows)


  nextRound: ->
    @board.move()

class gameOfLife.Board
  constructor:(@numOfColumns, @numOfRows) ->
    @deads = []
    @lives = []
    @cells = []
    for x in [1..@numOfColumns]
      column = []
      for y in [1..@numOfRows]
        column.push(gameOfLife.Game.DEAD)
      @cells.push column


  setLive: (x, y) ->
    point = this.createPoint(x, y)
    @lives.push point
    @cells[point.x][point.y] = gameOfLife.Game.LIVE

  createPoint: (x, y) ->
    y = @numOfRows + y  if y < 0
    x = @numOfColumns + x  if x < 0
    x = x % @numOfColumns
    y = y % @numOfRows
    {x, y}

  move:() ->
    #this.simpleGlider()
    this.gameOfLife()


  gameOfLife:() ->
    newLives = []
    starving = []

    for x in [0..@numOfColumns-1]
      for y in [0..@numOfRows-1]
        if (@cells[x][y])

          if (this.numOfLivingNeighbours(x, y) == 2 or this.numOfLivingNeighbours(x, y) == 3)
            newLives.push(this.createPoint(x, y))
          else
            starving.push this.createPoint(x, y)

        else
          if (this.numOfLivingNeighbours(x, y) == 3)
            newLives.push(this.createPoint(x, y))

    @deads = starving
    @lives = newLives
    for dead in @deads
      @cells[dead.x][dead.y] = gameOfLife.Game.DEAD
    for live in @lives
      @cells[live.x][live.y] = gameOfLife.Game.LIVE


  numOfLivingNeighbours:(x, y) ->
    neighbours = [this.createPoint(x-1, y-1), this.createPoint(x-1, y), this.createPoint(x-1, y+1),
      this.createPoint(x, y-1), this.createPoint(x, y+1),
      this.createPoint(x+1, y-1), this.createPoint(x+1, y), this.createPoint(x+1, y+1)]
    livingNeighbours = 0
    for n in neighbours
      livingNeighbours = livingNeighbours + 1 if @cells[n.x][n.y]
    livingNeighbours


  simpleGlider:() ->
    newLives = []
    for live in @lives
      x = live.x+1
      y = live.y+1
      newLives.push this.createPoint(x, y)
    @deads = @lives
    @lives = newLives

    for dead in @deads
      @cells[dead.x][dead.y] = gameOfLife.Game.DEAD
    for live in @lives
      @cells[live.x][live.y] = gameOfLife.Game.LIVE


  randomNumber:(min, max) ->
    Math.floor(Math.random()*(max-min+1)+ min)

class gameOfLife.Drawer
  constructor:(@game, @factor) ->

  drawGrid:(context) ->
    width = @game.board.numOfColumns * @factor
    height = @game.board.numOfRows * @factor

    context.beginPath()
    board = @game.board
    for rowNum in [0..board.numOfRows]
    #  for item in row
      y = rowNum * @factor + 0.5
      context.moveTo(0,y)
      context.lineTo(width,y)
    for colNum in [0..board.numOfColumns]
      x = colNum * @factor + 0.5
      context.moveTo(x,0)
      context.lineTo(x, height)

    context.strokeStyle = "black"
    context.stroke()

  draw:(context) ->
    context.fillStyle = "white"
    for dead in @game.board.deads
      this.drawRect(context, dead)
    context.fillStyle = "black"
    for live in @game.board.lives
      this.drawRect(context, live)

  drawRect:(context, rect) ->
    context.fillRect(rect.x * @factor+1, rect.y * @factor+1, @factor-1, @factor-1)
