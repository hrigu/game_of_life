game = null
ctx = null
drawer = null

jQuery ->
  canvas = getCanvas()
  ctx = canvas.getContext '2d'

  game = new gameOfLife.Game(200, 160)
  initStartLife()

  drawer = new gameOfLife.Drawer(game, 4)
  drawer.drawGrid(ctx)
  setInterval(run_loop, 1)

run_loop = ->
  drawer.draw(ctx)
  game.nextRound()
	
getCanvas = ->
	$("#myCanvas")[0]

initStartLife = ->
 # initRandomLife(0, game.numOfColumns - 1, 0, game.numOfRows - 1, 0.3)
  initRandomLife(50, 100, 50, 100, 0.3)
###
  setGlider(10, 10, game, [-1, -1])
  setGlider(20, 20, game)
  setGlider(30, 30, game, [-1, 1])
  setGlider(40, 40, game, [1, -1])
###

initRandomLife = (x_from, x_to, y_from, y_to, prob) ->
  for x in [x_from..x_to]
    for y in [y_from..y_to]
      game.set(x, y) if (Math.random() < prob)

setGlider =(x, y, game, change) ->
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
    game.set(x+point[0], x+point[1])

