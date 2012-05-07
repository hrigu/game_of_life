game = null
ctx = null
drawer = null
isAnimated = false

jQuery ->

  canvas = getCanvas()
  ctx = canvas[0].getContext '2d'

  canvas.click(toggleAnimate)

  game = new gameOfLife.Game(200, 160)
  game.strategy = new gameOfLife.GameOfLifeStrategy(game)
  game.initStartLife()

  drawer = new gameOfLife.Drawer(game, 4)
  drawer.drawGrid(ctx)
  #setInterval(run_loop, 1)
  animate()


toggleAnimate = ->
  isAnimated = !isAnimated
  animate() if isAnimated

animate = ->
  if isAnimated
    drawer.draw(ctx)
    game.nextRound()

    requestAnimFrame ->
      animate()


getCanvas = ->
	$("#myCanvas")

requestAnimFrame = (->
  #
  # requestAnim shim layer by Paul Irish
  #
  # http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  # see here for simple example: http://jsfiddle.net/paul/rjbGw/3/
  #
  window.requestAnimationFrame        ||
  window.webkitRequestAnimationFrame  ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  # a function
  (callback) ->
    window.setTimeout(callback, 1000 / 60)
)()

