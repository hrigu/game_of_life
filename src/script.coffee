game = null
ctx = null
drawer = null
jQuery ->
  canvas = getCanvas()
  ctx = canvas.getContext '2d'

  game = new gameOfLife.Game(200, 100)

  #game.board.setLive(1, 2)
  #game.board.setLive(2, 2)
  #game.board.setLive(3, 2)


  #glider
  game.board.setLive(2, 1)
  game.board.setLive(3, 2)
  game.board.setLive(1, 3)
  game.board.setLive(2, 3)
  game.board.setLive(3, 3)

  game.board.setLive(22, 1)
  game.board.setLive(23, 2)
  game.board.setLive(21, 3)
  game.board.setLive(22, 3)
  game.board.setLive(23, 3)



  #game.board.setLive(15, 15)
  #game.board.setLive(15, 16)
  #game.board.setLive(16, 16)
  #game.board.setLive(16, 15)



  drawer = new gameOfLife.Drawer(game, 3)
  drawer.drawGrid(ctx)
  setInterval(run_loop, 10)

run_loop = ->
  drawer.draw(ctx)
  game.nextRound()
	
getCanvas = ->
	$("#myCanvas")[0]

