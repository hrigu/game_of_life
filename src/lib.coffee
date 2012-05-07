this.gameOfLife = {}

class gameOfLife.Game
  @LIVE = true
  @DEAD = false

  constructor:(@numOfColumns, @numOfRows) ->
    @cells = this.initCells()
    @oldCells = this.initCells()
    @startLifeInitializer = new gameOfLife.StartLifeInitializer(this)

  initCells: ->
    cells = []
    column = null

    onBeginColumn = ->
      column = []
      cells.push(column)
    onCell = ->
      column.push(gameOfLife.Game.DEAD)

    this.visit(onCell, onBeginColumn)
    cells

  initStartLife: ->
    @startLifeInitializer.initStartLife()

  visit:(onCell, onBeginColumn = ->) ->
    for x in [0..@numOfColumns-1]
      onBeginColumn(x)
      for y in [0..@numOfRows-1]
       onCell(x, y)

  reset:(cells) ->
    this.visit (x, y)->
      cells[x][y] = gameOfLife.Game.DEAD

  set:(x, y, value = gameOfLife.Game.LIVE) ->
    point = this.modulo([x, y])
    @cells[point[0]][point[1]] = value

  get:(x, y) ->
    point = this.modulo([x, y])
    @cells[point[0]][point[1]]

  getOld:(x, y) ->
    point = this.modulo([x, y])
    @oldCells[point[0]][point[1]]

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
    this.prepareBoard()
    #To use 'this' in the callback function, use =>
    # http://coffeescript.org/#fat_arrow
    @game.visit (x, y)=>
      if (this.game.oldCells[x][y])
        this.handleAliveCell(x, y)
      else
        this.handleDeadCell(x, y)

  prepareBoard:() ->
    newCells = @game.oldCells
    @game.oldCells = @game.cells
    @game.cells = newCells
    @game.reset(@game.cells)

  handleAliveCell:(x, y) ->

  handleDeadCell:(x, y) ->

class gameOfLife.DiagonalStrategy extends gameOfLife.Strategy
  handleAliveCell:(x, y) ->
    @game.set(x+1, y+1)

class gameOfLife.GameOfLifeStrategy extends gameOfLife.Strategy

  handleAliveCell:(x, y) ->
    numOfLivingNeighbours = this.numOfLivingNeighbours(x, y)
    if ( numOfLivingNeighbours == 2 or numOfLivingNeighbours == 3)
      @game.set(x, y, true)

  handleDeadCell:(x, y) ->
    if (this.numOfLivingNeighbours(x, y) == 3)
      @game.set(x, y, true)


  numOfLivingNeighbours:(x, y) ->
    nbs = [
      [x-1, y-1],[x-1, y],[x-1, y+1]
      [x, y-1], [x, y+1]
      [x+1, y-1],[x+1, y],[x+1, y+1]
    ]
    livingNeighbours = 0
    for n in nbs
      livingNeighbours = livingNeighbours + 1 if @game.getOld(n[0],n[1])
    livingNeighbours

class gameOfLife.BrownMovingStrategy extends gameOfLife.Strategy

  handleAliveCell:(x, y) ->
    deads = this.deadNeighbours(x, y)
    if deads.length > 0
      r = this.randomNumber(0, deads.length - 1)
      @game.set(deads[r][0],deads[r][1])
    else
      @game.set(x, y, true)

  randomNumber:(min, max) ->
    Math.floor(Math.random()*(max-min+1)+ min)

  deadNeighbours:(x, y) ->
    nbs = [
      [x-1, y-1],[x-1, y],[x-1, y+1]
      [x, y-1], [x, y+1]
      [x+1, y-1],[x+1, y],[x+1, y+1]
    ]
    deads = []
    for n in nbs
      deads.push n unless (@game.getOld(n[0],n[1]) || @game.get(n[0],n[1]))
    deads

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
    @game.visit (x, y) =>
      unless @game.cells[x][y] == @game.oldCells[x][y]
        if @game.cells[x][y]
          context.fillStyle = "black"
        else
          context.fillStyle = "white"
        this.drawRect(context, x, y)

  drawRect:(context, x, y) ->
    context.fillRect(x * @factor+1, y * @factor+1, @factor-1, @factor-1)



class gameOfLife.StartLifeInitializer

  constructor:(@game) ->

  initStartLife: ->
    this.initRandomLife(80, 120, 50, 100, 0.3)


  initRandomLife: (x_from, x_to, y_from, y_to, prob) ->
    for x in [x_from..x_to]
      for y in [y_from..y_to]
        @game.set(x, y) if (Math.random() < prob)

  setGlider: (x, y, change) ->
    points = []
    points.push [0, 0]
    points.push [1, 1]
    points.push [-1, 2]
    points.push [0, 2]
    points.push [1, 2]

    if change
      for point in points
        point[0] = point[0] * change[0]
        point[1] = point[1] * change[1]

    for point in points
      @game.set(x+point[0], x+point[1])

