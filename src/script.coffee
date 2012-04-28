game = null
ctx = null
drawer = null
jQuery ->
  canvas = getCanvas()
  ctx = canvas.getContext '2d'

  game = new gameOfLife.Game(70, 50)

  #game.set(1, 2)
  #game.set(2, 2)
  #game.set(3, 2)


  #glider
  setGlider(5, 2, game)
  setGlider(10, 2, game)
  setGlider(15, 2, game)
  setGlider(20, 2, game)
  setGlider(23, 3, game)
  setGlider(25, 2, game)



  #game.set(15, 15)
  #game.set(15, 16)
  #game.set(16, 16)
  #game.set(16, 15)



  drawer = new gameOfLife.Drawer(game, 9)
  drawer.drawGrid(ctx)
  setInterval(run_loop, 100)

run_loop = ->
  drawer.draw(ctx)
  game.nextRound()
	
getCanvas = ->
	$("#myCanvas")[0]

setGlider =(x, y, game) ->
  game.set(x, y)
  game.set(x+1, y+1)
  game.set(x-1, y+2)
  game.set(x, y+2)
  game.set(x+1, y+2)


