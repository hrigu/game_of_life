describe("Game", function() {
    var game = null;
    beforeEach(function() {
        game = new gameOfLife.Game(3, 2);
    });

    describe("init game", function(){
        it("should have the right num of columns", function() {
            expect(game.numOfColumns).toBe(3);
        });

        it("should have the right num of rows", function() {
            expect(game.numOfRows).toBe(2);
        });

        it ("all cells should be dead", function(){
        	for (var x = 0; x < game.numOfColumns; x++){
        		for (var y = 0; y < game.numOfRows; y++){
                    expect(game.cells[x][y]).toBe(gameOfLife.Game.DEAD);       			
        		}		
        	}
        	
        });
    	
    });


    describe("set", function() {
        it("should store a cell with the given value at the given position", function() {
            game.set(2, 1, gameOfLife.Game.LIVE);
            expect(game.cells[2][1]).toBe(gameOfLife.Game.LIVE);
            game.set(2, 1, gameOfLife.Game.DEAD);
            expect(game.cells[2][1]).toBe(gameOfLife.Game.DEAD);
        });

        describe("if this method is called without 'value' parameter", function() {
            it("should store a live cell at the given position", function() {
                game.set(2, 1);
                expect(game.cells[2][1]).toBe(true);
            });
        });
    });


    describe("nextRound", function() {
        beforeEach(function() {
            game = new gameOfLife.Game(2, 2);
        });
        it("should kill the actual cell and make the neighbour right-beneath to live", function() {
            game.set(0, 0);
            game.nextRound()
            //actual
            expect(game.cells[0][0]).toBe(gameOfLife.Game.DEAD);
            //neighbour
            expect(game.cells[1][1]).toBe(gameOfLife.Game.LIVE);
        })
    });


});
