this.gameOfLife = {}
class gameOfLife.Game
  @LIVE = true
  @DEAD = false

  constructor:(@numOfColumns, @numOfRows) ->
    @cells = []
    for x in [1..@numOfColumns]
      column = []
      for y in [1..@numOfRows]
        column.push(gameOfLife.Game.DEAD)
      @cells.push column


  setLive: (x, y) ->
    @cells[x][y] = gameOfLife.Game.LIVE


  createPoint: (x, y) ->
    y = @numOfRows + y  if y < 0
    x = @numOfColumns + x  if x < 0
    x = x % @numOfColumns
    y = y % @numOfRows
    {x, y}

  nextRound:() ->
    this.nextRoundOfgameOfLife()


  nextRoundOfgameOfLife:() ->
    lives = []
    deads = []

    for x in [0..@numOfColumns-1]
      for y in [0..@numOfRows-1]
        if (@cells[x][y])
          if (this.numOfLivingNeighbours(x, y) == 2 or this.numOfLivingNeighbours(x, y) == 3)
            lives.push(this.createPoint(x, y))
          else
            deads.push this.createPoint(x, y)

        else
          if (this.numOfLivingNeighbours(x, y) == 3)
            lives.push(this.createPoint(x, y))

    for dead in deads
      @cells[dead.x][dead.y] = gameOfLife.Game.DEAD
    for live in lives
      @cells[live.x][live.y] = gameOfLife.Game.LIVE


  numOfLivingNeighbours:(x, y) ->
    neighbours = [this.createPoint(x-1, y-1), this.createPoint(x-1, y), this.createPoint(x-1, y+1),
      this.createPoint(x, y-1), this.createPoint(x, y+1),
      this.createPoint(x+1, y-1), this.createPoint(x+1, y), this.createPoint(x+1, y+1)]
    livingNeighbours = 0
    for n in neighbours
      livingNeighbours = livingNeighbours + 1 if @cells[n.x][n.y]
    livingNeighbours


class gameOfLife.Drawer
  constructor:(@game, @factor) ->

  drawGrid:(context) ->
    width = @game.numOfColumns * @factor
    height = @game.numOfRows * @factor

    context.beginPath()
    for rowNum in [0..@game.numOfRows]
    #  for item in row
      y = rowNum * @factor + 0.5
      context.moveTo(0,y)
      context.lineTo(width,y)
    for colNum in [0..@game.numOfColumns]
      x = colNum * @factor + 0.5
      context.moveTo(x,0)
      context.lineTo(x, height)

    context.strokeStyle = "black"
    context.stroke()

  draw:(context) ->
    for x in [0..@game.numOfColumns-1]
      for y in [0..@game.numOfRows-1]
       if @game.cells[x][y]
        context.fillStyle = "black"
       else
        context.fillStyle = "white"
       this.drawRect(context, x, y)

  drawRect:(context, x, y) ->
    context.fillRect(x * @factor+1, y * @factor+1, @factor-1, @factor-1)
