game = null
ctx = null
drawer = null
isAnimated = false
tempoInMillis = 100


jQuery ->
  canvas = getCanvas()
  ctx = canvas[0].getContext('2d')

  canvas.click(toggleAnimate)

  game = new gameOfLife.Game(200, 160)
  game.initStartLife()

  drawer = new gameOfLife.Drawer(game, 4)
  drawer.drawGrid(ctx)
  drawer.draw(ctx)
  animate()


toggleAnimate = ->
  isAnimated = !isAnimated
  animate() if isAnimated

animate = ->
  if isAnimated
    window.setTimeout(doWork, tempoInMillis)

doWork = ->
  game.nextRound()
  drawer.draw(ctx)
  animate()


getCanvas = ->
	$("#myCanvas")
