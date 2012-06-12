game = undefined
ctx = undefined
drawer = undefined
isAnimated = true
tempoInMillis = 500


jQuery ->
  canvas = $("#myCanvas")
  ctx = canvas[0].getContext('2d')
  canvas.click(toggleAnimate)

  game = new gameOfLife.Game(10, 8)
  game.initStartLife()

  drawer = new gameOfLife.Drawer(game, 20)
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
