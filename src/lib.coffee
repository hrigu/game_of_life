this.gameOfLife = {}


##
#  knows the grid with the cells. Each cell is alive or dead. In the next generation, life changes due some rules.
##
class gameOfLife.Game
  @LIVE = true
  @DEAD = false

  constructor:(@numOfColumns, @numOfRows) ->
    @cells = this._initCells()
    @oldCells = this._initCells()

  _initCells: ->
    cells = []
    column = null

    onBeginColumn = ->
      column = []
      cells.push(column)
    onCell = ->
      column.push(gameOfLife.Game.DEAD)

    this.visit(onCell, onBeginColumn)
    return cells

  initStartLife: ->
    @startLifeInitializer.initStartLife()


  ##
  # Visits each column and each cell and calls the given functions
  ##
  visit:(onCell, onBeginColumn = ->) ->
    for x in [0..@numOfColumns-1]
      onBeginColumn(x)
      for y in [0..@numOfRows-1]
       onCell(x, y)

  ##
  # resets each cell to DEAD
  ##
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
    this.prepareBoard()
    this.visit(
      (x, y) =>
        this.set(x+1, y+1) if  this.oldCells[x][y]
    )


  prepareBoard:() ->
    newCells = this.oldCells
    this.oldCells = this.cells
    this.cells = newCells
    this.reset(this.cells)


##
#  Responsible to draw the new generation
##
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
    @game.set(0, 0)


##
#  initializes the game with random start life
##
class gameOfLife.RandomStartLifeInitializer extends gameOfLife.StartLifeInitializer

  initStartLife: ->
    this._initRandomLife(80, 120, 50, 100, 0.3)


  _initRandomLife: (x_from, x_to, y_from, y_to, prob) ->
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

