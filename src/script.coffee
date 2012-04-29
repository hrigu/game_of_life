game = null
ctx = null
drawer = null
jQuery ->
  canvas = getCanvas()
  ctx = canvas.getContext '2d'

  game = new gameOfLife.Game(120, 80)

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


  #glider
  ###
  setGlider(5, 2, game)
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

setGlider =(x, y, game) ->
  game.set(x, y)
  game.set(x+1, y+1)
  game.set(x-1, y+2)
  game.set(x, y+2)
  game.set(x+1, y+2)


