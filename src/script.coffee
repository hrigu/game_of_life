game = null
ctx = null
drawer = null
jQuery ->
  canvas = getCanvas()
  ctx = canvas.getContext '2d'

  game = new gameOfLife.Game(120, 80)

  ###
  game.set(8,10)
  game.set(8,11)
  game.set(8,12)
  game.set(9,10)
  game.set(9,11)
  game.set(9,12)
  game.set(10,10)
  game.set(10,11)
  game.set(10,12)
  game.set(11,10)
  game.set(11,11)
  game.set(11,12)
  game.set(12,10)
  game.set(12,11)
  game.set(12,12)
  ###

  setGlider(10, 10, game, [-1, -1])
  setGlider(20, 20, game)
  setGlider(30, 30, game, [-1, 1])
  setGlider(40, 40, game, [1, -1])

  #glider
  ###
  setGlider(10, 2, game)
  setGlider(15, 2, game)
  setGlider(20, 2, game)
  setGlider(23, 3, game)
  setGlider(25, 2, game)
  ###



  #game.set(15, 15)
  #game.set(15, 16)
  #game.set(16, 16)
  #game.set(16, 15)



  drawer = new gameOfLife.Drawer(game, 4)
  drawer.drawGrid(ctx)
  setInterval(run_loop, 1)

run_loop = ->
  drawer.draw(ctx)
  game.nextRound()
	
getCanvas = ->
	$("#myCanvas")[0]

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

