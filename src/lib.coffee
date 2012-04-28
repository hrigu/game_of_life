this.gameOfLife = {}

class gameOfLife.Game
  @LIVE = true
  @DEAD = false

  constructor:(@numOfColumns, @numOfRows) ->
    @strategy = new gameOfLife.GameOfLifeStrategy(this)
    @cells = []
    for x in [1..@numOfColumns]
      column = []
      for y in [1..@numOfRows]
        column.push(gameOfLife.Game.DEAD)
      @cells.push column

  set:(x, y, value = gameOfLife.Game.LIVE) ->
    point = this.modulo([x, y])
    @cells[point[0]][point[1]] = value

  get:(x, y) ->
    point = this.modulo([x, y])
    @cells[point[0]][point[1]]

  modulo: (point) ->
    x = point[0]
    x = @numOfColumns + x  if x < 0
    x = x % @numOfColumns
    y = point[1]
    y = @numOfRows + y  if y < 0
    y = y % @numOfRows
    [x, y]

  nextRound:() ->
    this.strategy.nextRound()

class gameOfLife.Strategy
  constructor:(@game) ->

  nextRound:() ->
    changes = []

    for x in [0..@game.numOfColumns-1]
      for y in [0..@game.numOfRows-1]
        if (@game.cells[x][y])
          this.handleLifeCell(x, y, changes)
        else
          this.handleDeadCell(x, y, changes)
    for change in changes
      @game.set(change[0], change[1], change[2])

  handleLifeCell:(x, y, changes) ->

  handleDeadCell:(x, y, changes) ->

class gameOfLife.DiagonalStrategy extends gameOfLife.Strategy
  handleLifeCell:(x, y, changes) ->
    changes.push([x, y, false])
    changes.push([x+1, y+1, true])


class gameOfLife.GameOfLifeStrategy extends gameOfLife.Strategy

  handleLifeCell:(x, y, changes) ->
    if (this.numOfLivingNeighbours(x, y) == 2 or this.numOfLivingNeighbours(x, y) == 3)
      changes.push([x, y, true])
    else
      changes.push([x, y, false])

  handleDeadCell:(x, y, changes) ->
    if (this.numOfLivingNeighbours(x, y) == 3)
       changes.push([x, y, true])


  numOfLivingNeighbours:(x, y) ->
    nbs = [
      [x-1, y-1],[x-1, y],[x-1, y+1]
      [x, y-1], [x, y+1]
      [x+1, y-1],[x+1, y],[x+1, y+1]
    ]
    livingNeighbours = 0
    for n in nbs
      livingNeighbours = livingNeighbours + 1 if @game.get(n[0],n[1])
    livingNeighbours



class gameOfLife.Drawer
  constructor:(@game, @factor) ->

  drawGrid:(context) ->
    width = @game.numOfColumns * @factor
    height = @game.numOfRows * @factor

    context.beginPath()
    for rowNum in [0..@game.numOfRows]
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
