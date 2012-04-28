game = null
ctx = null
drawer = null
jQuery ->
  canvas = getCanvas()
  ctx = canvas.getContext '2d'

  game = new gameOfLife.Game(40, 20)

  #game.setLive(1, 2)
  #game.setLive(2, 2)
  #game.setLive(3, 2)


  #glider
  game.setLive(2, 1)
  game.setLive(3, 2)
  game.setLive(1, 3)
  game.setLive(2, 3)
  game.setLive(3, 3)

  game.setLive(22, 1)
  game.setLive(23, 2)
  game.setLive(21, 3)
  game.setLive(22, 3)
  game.setLive(23, 3)



  #game.setLive(15, 15)
  #game.setLive(15, 16)
  #game.setLive(16, 16)
  #game.setLive(16, 15)



  drawer = new gameOfLife.Drawer(game, 10)
  drawer.drawGrid(ctx)
  setInterval(run_loop, 100)

run_loop = ->
  drawer.draw(ctx)
  game.nextRound()
	
getCanvas = ->
	$("#myCanvas")[0]

