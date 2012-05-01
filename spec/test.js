GameOfLifeTest = TestCase("GameOfLifeTest");

GameOfLifeTest.prototype.setUp = function() {
	this.game = new gameOfLife.Game(3, 2);
};

GameOfLifeTest.prototype.test_initializing_new_game = function() {
	assertEquals(3, this.game.numOfColumns);
	assertEquals(2, this.game.numOfRows);
	
	assertEquals(this.game.numOfColumns, this.game.cells.length)
	assertEquals(this.game.numOfRows, this.game.cells[0].length);
	
	for (var x = 0; x < this.game.numOfColumns; x++){
		for (var y = 0; y < this.game.numOfRows; y++){
			assertEquals(gameOfLife.Game.DEAD, this.game.cells[x][y])
			
		}		
	}
};

GameOfLifeTest.prototype.test_method_set = function() {
    this.game.set(2, 1, gameOfLife.Game.LIVE);
    assertEquals(gameOfLife.Game.LIVE, this.game.cells[2][1]);	
}

GameOfLifeTest.prototype.test_method_set_default_value = function() {
	console.log("test");
    assertEquals(gameOfLife.Game.DEAD, this.game.cells[2][1]);	
    this.game.set(2, 1);
    assertEquals(gameOfLife.Game.LIVE, this.game.cells[2][1]);	
}

GameOfLifeTest.prototype.test_method_nextRound = function() {
    assertEquals(gameOfLife.Game.DEAD, this.game.cells[0][0]);	
    this.game.set(0, 0);
    assertEquals(gameOfLife.Game.LIVE, this.game.cells[0][0]);	
    this.game.nextRound()
    assertEquals(gameOfLife.Game.DEAD, this.game.cells[0][0]);	
    assertEquals(gameOfLife.Game.LIVE, this.game.cells[1][1]);	
}