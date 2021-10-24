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

test('clearCellAndNeighbors - Invalid position', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    const clearCount = Utils.clearCellAndNeighbors(board, board.length + 1, board[0].length);
    expect(board).toEqual(testBoard);
    expect(clearCount).toBe(0);
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
    let expected = [
        ['R', 'R', 'R', 'R', 'R'],
        ['R', '1', '1', '1', 'R'],
        ['R', '1', 'M', '1', 'R'],
        ['R', '1', '1', '1', 'R'],
        ['R', 'R', 'R', 'R', 'R'],
    ]
    
    expect(Utils.revealPosition(board, query[0], query[1])).toBe(false);
    expect(board).toEqual(expected);
});

test('toggleFlagAtPosition - Position is a mine, not flagged', () => {
    let query = [2,2];
    let board = JSON.parse(JSON.stringify(testBoard));
    board[query[0]][[query[1]]] = 'M';

    let expected = JSON.parse(JSON.stringify(board));
    expected[query[0]][query[1]] = 'FM';
    
    Utils.toggleFlagAtPosition(board, query[0], query[1]);
    expect(board).toEqual(expected);
});

test('toggleFlagAtPosition - Position is not empty, not flagged', () => {
    let query = [2,2];
    let board = JSON.parse(JSON.stringify(testBoard));
    board[query[0]][[query[1]]] = 'E';

    let expected = JSON.parse(JSON.stringify(board));
    expected[query[0]][query[1]] = 'FE';
    
    Utils.toggleFlagAtPosition(board, query[0], query[1]);
    expect(board).toEqual(expected);
});

test('toggleFlagAtPosition - Position is already explored', () => {
    let query = [2,2];
    let board = JSON.parse(JSON.stringify(testBoard));
    board[query[0]][[query[1]]] = 'R';

    let expected = JSON.parse(JSON.stringify(board));
    
    Utils.toggleFlagAtPosition(board, query[0], query[1]);
    expect(board).toEqual(expected);
});

test('toggleFlagAtPosition - Position is a mine, flagged', () => {
    let query = [2,2];
    let board = JSON.parse(JSON.stringify(testBoard));
    board[query[0]][[query[1]]] = 'FM';

    let expected = JSON.parse(JSON.stringify(board));
    expected[query[0]][query[1]] = 'M';
    
    Utils.toggleFlagAtPosition(board, query[0], query[1]);
    expect(board).toEqual(expected);
});

test('toggleFlagAtPosition - Position is not empty, flagged', () => {
    let query = [2,2];
    let board = JSON.parse(JSON.stringify(testBoard));
    board[query[0]][[query[1]]] = 'FE';

    let expected = JSON.parse(JSON.stringify(board));
    expected[query[0]][query[1]] = 'E';
    
    Utils.toggleFlagAtPosition(board, query[0], query[1]);
    expect(board).toEqual(expected);
});

test('padString - no padding required', () => {
    let stringToPad = '999';
    let minLength = 3;
    let padChar = 0;

    expect(Utils.padString(stringToPad, minLength, padChar)).toEqual(stringToPad);
});

test('padString - padding required (1 char)', () => {
    let stringToPad = '99';
    let minLength = 3;
    let padChar = 0;

    const expected = '099';

    expect(Utils.padString(stringToPad, minLength, padChar)).toEqual(expected);
});

test('padString - padding required (>1 char)', () => {
    let stringToPad = '9';
    let minLength = 4;
    let padChar = 0;

    const expected = '0009';

    expect(Utils.padString(stringToPad, minLength, padChar)).toEqual(expected);
});

test('padString - empty string', () => {
    let stringToPad = '';
    let minLength = 3;
    let padChar = 0;

    const expected = JSON.parse(JSON.stringify(stringToPad));
    expect(Utils.padString(stringToPad, minLength, padChar)).toEqual(expected);
});

test('playerHasWon - winning board, no mines and all cells explored', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    board = board.map(row => row.map(col => 'R'));
    expect(Utils.playerHasWon(board)).toBe(true);
});

test('playerHasWon - winning board, single unflagged mine and all non mine positions explored', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    board = board.map(row => row.map(col => 'R'));
    board[2][2] = 'M';
    expect(Utils.playerHasWon(board)).toBe(true);
});

test('playerHasWon - winning board, single flagged mine and all non mine positions explored', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    board = board.map(row => row.map(col => 'R'));
    board[2][2] = 'FM';
    expect(Utils.playerHasWon(board)).toBe(true);
});

test('playerHasWon - non winning board, mine and single flagged empty position and all non mine positions explored', () => {
    let board = JSON.parse(JSON.stringify(testBoard));
    board = board.map(row => row.map(col => 'R'));
    board[2][2] = 'FE';
    board[2][0] = 'M' 
    expect(Utils.playerHasWon(board)).toBe(false);
});