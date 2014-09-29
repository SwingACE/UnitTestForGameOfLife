module('Initiation Module');

function checkInitGrid() {
	Grid.initGrid();
	for (var i = 0; i < sizeOfGrid; i++) {
		for (var j = 0; j < sizeOfGrid; j++) {
			if (Grid.grid[i][j] == 1) {
				return false;
			}
		}
	}
	return true;
}

test('initGrid()', function(){
	ok(checkInitGrid(), 'function "initGrid" works properly');
});






module('State Change Module');

function setGridData() {
	var data = [0,1,0,0,0,1,1,0,1,1,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1];
	Grid.initGrid();
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 5; j++) {
			Grid.grid[i][j] = data[i * 5 + j];
		}
	}
	Grid.decideCellState();
}

function checkCellState(i, j, state) {
	return (Grid.newGrid[i][j] == state);
}

test('decideCellState()', function(){
	setGridData();
	ok(checkCellState(0, 0, 0), 'the state of cell (0,0) is 0');
	ok(checkCellState(0, 1, 0), 'the state of cell (0,1) is 0');
	ok(checkCellState(0, 2, 0), 'the state of cell (0,2) is 0');
	ok(checkCellState(0, 4, 0), 'the state of cell (0,4) is 0');
	ok(checkCellState(1, 0, 1), 'the state of cell (1,0) is 1');
	ok(checkCellState(1, 1, 1), 'the state of cell (1,1) is 1');
	ok(checkCellState(1, 3, 1), 'the state of cell (1,3) is 1');
	ok(checkCellState(1, 4, 1), 'the state of cell (1,4) is 1');
	ok(checkCellState(2, 2, 1), 'the state of cell (2,2) is 1');
	ok(checkCellState(2, 3, 0), 'the state of cell (2,3) is 0');
	ok(checkCellState(4, 0, 1), 'the state of cell (4,0) is 1');
	ok(checkCellState(4, 2, 1), 'the state of cell (4,2) is 1');
	ok(checkCellState(4, 4, 1), 'the state of cell (4,4) is 1');
});






module('Game Over Module');

test('gameOver()', function() {
	Grid.initGrid();
	ok(Grid.gameOver(), 'in this case where cells are all 0, game is over');

	Grid.grid[0][0] = 1;
	ok(!Grid.gameOver(), 'in this case where at least one cell is 1, game is not over');
});






module('Survive Module');

test('survive()', function() {
	Grid.initGrid();
	for (var i = 0; i < sizeOfGrid; i++) {
		for (var j = 0; j < sizeOfGrid; j++) {
			Grid.grid[i][j] = j % 2;
			Grid.newGrid[i][j] = j % 2;
		}
	}
	ok(Grid.survive(), 'in this case where cells do not change, function "survive" works properly');

	Grid.grid[0][0] = 1;
	ok(!Grid.survive(), 'in this case where one of cells have changed, function "survive" works properly');
});

