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
        return board;
    }
}

export default Utils;