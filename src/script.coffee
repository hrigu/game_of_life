game = null
ctx = null
drawer = null
isAnimated = false

jQuery ->
  canvas = getCanvas()
  ctx = canvas[0].getContext('2d')

  canvas.click(toggleAnimate)

  game = new gameOfLife.Game(200, 160)
  game.strategy = new gameOfLife.GameOfLifeStrategy(game)
  game.initStartLife()

  drawer = new gameOfLife.Drawer(game, 4)
  drawer.drawGrid(ctx)
  drawer.draw(ctx)
  animate()


toggleAnimate = ->
  isAnimated = !isAnimated
  animate() if isAnimated


lastTime = Date.now()
now = undefined

animate = ->
  if isAnimated

    now = Date.now()
    waitsfor = now - lastTime
    window.setTimeout(doWork, 1000)
    lastTime = now
    requestAnimFrame ->
      animate()

doWork = ->
  game.nextRound()
  drawer.draw(ctx)


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
  window.oRequestAnimationFrame       ||
  window.msRequestAnimationFrame     ||

  # the fallfack: if none of  the above works: a function
  (callback) ->
    window.setTimeout(callback, 1000/60)
)()

