const DIRECTIONS = [
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [0, -1],
    [-1, 0]
];

class Utils {  
    /**
     * Generate a random board with given number of rows and columns
     * @param {number} rowCount Number of rows
     * @param {number} colCount Number of columns
     * @returns {Array<Array<String>>} The generated game board
     */
    static generateRandomBoard(rowCount, colCount) {
        const board = [];
        for (let i=0; i<rowCount; i++) {
            const cols = new Array(colCount);
            cols.fill('E');
            board.push(cols);
        }

        // Fill 15% of the board with mines
        let mineCount = Math.ceil((rowCount * colCount) * 0.15);
        let minesPlanted = 0;

        console.debug(`Planting ${mineCount} mines`);

        while (minesPlanted < mineCount) {
            let randomRow = Math.ceil(Math.random() * rowCount - 1);
            let randomCol = Math.ceil(Math.random() * colCount - 1);
            if (!this.hasMineAtPosition(board, randomRow, randomCol)) {
                this.plantMineAtPosition(board, randomRow, randomCol);
                minesPlanted++;
            }
        }

        return board;
    }

    /**
     * Check if provided position has a mine
     * @param {Array<Array<String>>} board 
     * @param {number} row 
     * @param {number} col 
     * @returns {boolean}
     */
    static hasMineAtPosition(board, row, col) {
        return board[row][col] === 'M';
    }

    /**
     * Plant mine at given position
     * @param {Array<Array<String>>} board 
     * @param {number} row 
     * @param {number} col 
     */
    static plantMineAtPosition(board, row, col) {
        board[row][col] = 'M';
    }

    /**
     * Mark position as flagged
     * @param {Array<Array<String>>} board 
     * @param {number} row 
     * @param {number} col 
     */
    static toggleFlagAtPosition(board, row, col) {
        const val = board[row][col];
        if (board[row][col].length > 1 && val.startsWith('F')) {
            board[row][col] = board[row][col].substring(1);
        } else if (val !== 'R') {
            board[row][col] = 'F' + board[row][col];
        }
    }

    /**
     * Reveal position
     * @param {Array<Array<String>>} board 
     * @param {number} row 
     * @param {number} col 
     * @returns {boolean}
     */
    static revealPosition(board, row, col) {
        const val = board[row][col];
        let isGameOver = false;

        switch (val) {
            case 'M':
                isGameOver = true;
                break;
            case 'E':
                this.floodFill(board, row, col);
                break;
        }

        return isGameOver;
    }

    /**
     * Flood fill all empty positions seeding from given position
     * @param {Array<Array<String>>} board 
     * @param {number} row 
     * @param {number} col 
     */
    static floodFill = (board, row, col) => {
        console.log(`floodFill (${row}, ${col})`);
        if (board[row][col] === 'E') {
            const adjMineCount = this.getAdjacentMineCount(board, row, col);
            if (adjMineCount > 0) {
                board[row][col] = adjMineCount + '';
                return;
            }
            
            board[row][col] = 'R';
            
            for (const direction of DIRECTIONS) {
                const r = row + direction[0];
                const c = col + direction[1];
                if (this.isValidPosition(board, r, c)) {
                    this.floodFill(board, r, c);
                }
            }
        } else {
            console.log('floodFill ignored');
        }
    }

    /**
     * Get count of mines neighbouring given position 
     * @param {Array<Array<String>>} board 
     * @param {number} row 
     * @param {number} col 
     * @returns {number}
     */
    static getAdjacentMineCount(board, row, col) {
        let count = 0;
        for (const direction of DIRECTIONS) {
            const r = row + direction[0];
            const c = col + direction[1];
            
            if (this.isValidPosition(board, r, c) && board[r][c] === 'M') {
                count++;
            }
        }
        return count;
    }

    /**
     * Check if given grid position is valid
     * @param {Array<Array<String>>} board 
     * @param {number} row 
     * @param {number} col 
     * @returns {boolean}
     */
    static isValidPosition(board, row, col) {
        return row >= 0 && col >= 0 && row < board.length && col < board[row].length;
    }
}

export default Utils;