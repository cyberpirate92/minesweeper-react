import './Board.css';
import { Component } from 'react';
import BoardCell from "../BoardCell/BoardCell";
import PropTypes from 'prop-types';
import Utils from "../Utils";
import DigitalDisplay from '../DigitalDisplay/DigitalDisplay';

class Board extends Component {

    constructor(props) {
        super(props);
        let initialBoard = Utils.generateRandomBoard(this.props.rows, this.props.cols);
        this.state = { 
            board: initialBoard,
            isGameOver: false,
            remainingFlags: 100,
            timeCounter: 999,
            isFirstMove: true,
        };
        window.isGameOver = false;
    }

    componentDidMount = () => {
        this.intervalRef = setInterval(() => {
            if (this.state.timeCounter === 1) {
                this.stopTimer();
            }
            this.setState({ timeCounter: this.state.timeCounter - 1 });
        }, 1000);
    }

    componentWillUnmount = () => {
        this.stopTimer();
    }

    stopTimer = () => {
        if (this.intervalRef) {
            clearInterval(this.intervalRef);
        }
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
                <div className="Board-Header">
                    <table className="info" cellSpacing="0px" style={{borderCollapse: 'collapse'}} width="100%">
                        <tbody>
                            <tr>
                                <td className="header-display text-left">
                                    <DigitalDisplay value={this.state.remainingFlags}/>
                                </td>
                                <td className="header-display text-center">
                                    <button onClick={() => {window.location.reload()}} title="Restart Game">
                                        {this.state.isGameOver ? '☹️' : '🙂'}
                                    </button>
                                </td>
                                <td className="header-display text-right countdown-timer">
                                    <DigitalDisplay value={this.state.timeCounter} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="Board-Body">
                    <table cellSpacing="0px" style={{borderCollapse: 'collapse'}}>
                        <tbody>
                            { rowElements }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    toggleFlagAtPosition = (row, col) => {
        let board = this.state.board;
        let remainingFlags = this.state.remainingFlags;
        if (remainingFlags > 0) {
            remainingFlags = Utils.toggleFlagAtPosition(board, row, col) ? remainingFlags - 1 : remainingFlags + 1;
            this.setState({
                board,
                remainingFlags
            });
        } else {
            // flags exhausted
            // TODO: Show indication in UI
        }
    }

    revealPosition = (row, col) => {
        let board = this.state.board;

        if (this.state.isFirstMove) {
            const clearedCount = Utils.clearCellAndNeighbors(board, row, col);
            this.setState({isFirstMove: false});
        }

        let isGameOver = Utils.revealPosition(board, row, col);
        
        if (isGameOver) {
            this.stopTimer();
            window.isGameOver = true;
        }

        this.setState({
            board,
            isGameOver,
        });
    }
}

Board.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number
};

Board.defaultProps = {
    rows: 25,
    cols: 25,
}

export default Board;