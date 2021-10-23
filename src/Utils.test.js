import Utils from './Utils';

const testBoard = [
    ['E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E'],
];

test('Generate random board', () => {
    const rowCount = 10;
    const colCount = 10;
    const grid = Utils.generateRandomBoard(rowCount, colCount);
    
    expect(grid).toBeTruthy();
    expect(grid.length).toBe(rowCount);
    expect(grid[0].length).toBe(colCount);

    let mineCount = 0;
    for (let i=0; i<grid.length; i++) {
        for (let j=0; j<grid[i].length; j++) {
            if (grid[i][j] == 'M') {
                mineCount++;
            }
        }
    }

    expect(mineCount / (rowCount * colCount)).toBeLessThanOrEqual(0.15);
});

test('clearCellAndNeighbors - No mine in specified cell or neighbors', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    const clearCount = Utils.clearCellAndNeighbors(board, 2, 2);
    
    expect(board).toEqual(testBoard);
    expect(clearCount).toBe(0);
});

test('clearCellAndNeighbors - Mine exists in specified cell but not in neighbors', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    board[2][2] = 'M';
    const clearCount = Utils.clearCellAndNeighbors(board, 2, 2);
    
    expect(board).toEqual(testBoard);
    expect(clearCount).toBe(1);
});

test('clearCellAndNeighbors - Mine exists in neighbors but not in specified cell', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    board[2][1] = 'M';
    board[1][2] = 'M';
    board[2][3] = 'M';
    
    const clearCount = Utils.clearCellAndNeighbors(board, 2, 2);
    expect(board).toEqual(testBoard);
    expect(clearCount).toBe(3);
});

test('clearCellAndNeighbors - Mine exists in neighbors and specified cell', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    board[2][1] = 'M';
    board[2][2] = 'M';
    board[1][2] = 'M';
    board[2][3] = 'M';
    
    const clearCount = Utils.clearCellAndNeighbors(board, 2, 2);
    expect(board).toEqual(testBoard);
    expect(clearCount).toBe(4);
});

test('isValidPosition', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    expect(Utils.isValidPosition(board, 0, 0)).toBe(true);
    expect(Utils.isValidPosition(board, board.length-1, board[0].length-1)).toBe(true);
    expect(Utils.isValidPosition(board, board.length, board[0].length-1)).toBe(false);
    expect(Utils.isValidPosition(board, board.length-1, board[0].length)).toBe(false);
    expect(Utils.isValidPosition(board, -1, -1)).toBe(false);
    expect(Utils.isValidPosition(board, 2, 2)).toBe(true);
});

test('revealPosition - No mines', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    let expected = board.map(row => row.map(col => col = 'R'));
    expect(Utils.revealPosition(board, 2, 2)).toBe(false);
    expect(board).toEqual(expected);
});

test('revealPositon - Adjacent mine', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    board[0][0] = 'M';
    
    let expected = JSON.parse(JSON.stringify(board));
    expected[1][0] = '1';

    Utils.revealPosition(board, 1, 0);
    expect(board).toEqual(expected);
});

test('revealPosition - Mine at position (game over)', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    board[2][2] = 'M';

    let expected = JSON.parse(JSON.stringify(board));
    expect(Utils.revealPosition(board, 2, 2)).toBe(true);
    expect(board).toEqual(expected);
});

test('revealPosition - No mine at position, neighbors', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    board[2][2] = 'M';

    let query = [0, 0];
    let expected = JSON.parse(JSON.stringify(board));
    
    expect(Utils.revealPosition(board, query[0], query[1])).toBe(false);
});