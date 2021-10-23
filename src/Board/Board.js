import './Board.css';
import { Component } from 'react';
import BoardCell from "../BoardCell/BoardCell";
import PropTypes from 'prop-types';
import Utils from "../Utils";

class Board extends Component {

    constructor(props) {
        super(props);
        let initialBoard = Utils.generateRandomBoard(this.props.rows, this.props.cols);
        this.state = { 
            board: initialBoard,
            isGameOver: false,
        };
    }

    render = () => {
        let rowElements = [];
        const board = this.state.board;
        const isGameOver = this.state.isGameOver;
        
        for (let i=0; i<board.length; i++) {
            const cellElements = [];
            for (let j=0; j<board[i].length; j++) {
                cellElements.push(
                    <BoardCell 
                        cellValue={board[i][j]} 
                        row={i} 
                        col={j} 
                        onClick={this.revealPosition} 
                        onRightClick={this.toggleFlagAtPosition} 
                        isGameOver={isGameOver}
                        key={(this.props.cols * i) + j}
                    />
                );
            }
            rowElements.push(<tr key={i}>{cellElements}</tr>);
        }
        
        return (
            <div className="Board">
                <table cellSpacing="0">
                    <tbody>
                        { rowElements }
                    </tbody>
                </table>
            </div>
        );
    }

    toggleFlagAtPosition = (row, col) => {
        let board = this.state.board;
        Utils.toggleFlagAtPosition(board, row, col);
        this.setState({board});
    }

    revealPosition = (row, col) => {
        let board = this.state.board;
        let isGameOver = Utils.revealPosition(board, row, col);
        this.setState({
            board,
            isGameOver
        });
    }
}

Board.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number
};

Board.defaultProps = {
    rows: 30,
    cols: 30,
}

export default Board;