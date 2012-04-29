describe("Game", function() {
    var game = null;
    beforeEach(function() {
        game = new gameOfLife.Game(3, 2);
    });

    it("should have the right num of columns", function() {
        expect(game.numOfColumns).toBe(3);
    });

    it("should have the right num of rows", function() {
        expect(game.numOfRows).toBe(2);
    });

    describe("set", function() {
        it("should store a cell with the given value at the given position", function() {
            game.set(2, 1, gameOfLife.Game.LIVE);
            expect(game.cells[2][1]).toBe(gameOfLife.Game.LIVE);
            game.set(2, 1, gameOfLife.Game.DEAD);
            expect(game.cells[2][1]).toBe(gameOfLife.Game.DEAD);
        });

        it("should handle position shift if the position is out of the board size", function() {
            game.set(3, 3, gameOfLife.Game.LIVE);
            expect(game.cells[0][1]).toBe(gameOfLife.Game.LIVE);
        });

        describe("if this method is called without value", function() {
            it("should store a live cell at the given position", function() {
                game.set(2, 1);
                expect(game.cells[2][1]).toBe(true);
            });
        });
    });


    describe("nextRound", function() {
        beforeEach(function() {
            game = new gameOfLife.Game(1, 2);
            spyOn(game, "handleDeadCell");
            spyOn(game, "handleAliveCell");
        });
        it("should visit every cell", function() {
            game.nextRound();
            expect(game.handleDeadCell.callCount).toBe(2);
        });

        it("should call 'handleDeadCell' for all dead cell", function() {
            var changes = [];
            game.set(0, 0);
            game.nextRound();
            expect(game.handleDeadCell.callCount).toBe(1);
            expect(game.handleDeadCell).toHaveBeenCalledWith(0, 1, changes);
        });

        it("should call 'handleAliveCell' for all live cell", function() {
            var changes = [];
            game.set(0, 0);
            game.nextRound();
            expect(game.handleAliveCell.callCount).toBe(1);
            expect(game.handleAliveCell).toHaveBeenCalledWith(0, 0, changes);
        });
    });

    describe("handleAliveCell", function() {
        beforeEach(function() {
            game = new gameOfLife.Game(1, 2);
        });
        it("should kill the actual cell and make the neighbour right-beneath to live", function() {
            game.set(0, 0);
            var changes = [];
            game.handleAliveCell(0, 0, changes)
            expect(changes.length).toBe(2);
            //actual
            expect(changes[0][0]).toBe(0);
            expect(changes[0][1]).toBe(0);
            expect(changes[0][2]).toBe(gameOfLife.Game.DEAD);
            //neighbour
            expect(changes[1][0]).toBe(1);
            expect(changes[1][1]).toBe(1);
            expect(changes[1][2]).toBe(gameOfLife.Game.LIVE);

        })
    });


});
