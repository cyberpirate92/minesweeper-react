import { Component } from 'react';
import BoardCell from "../BoardCell/BoardCell";
import PropTypes from 'prop-types';
import Utils from "../Utils";

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            board: Utils.generateRandomBoard(this.props.rows, this.props.cols),
        };
    }

    render = () => {
        let rowElements = [];
        const board = this.state.board;
        
        for (let i=0; i<board.length; i++) {
            const cellElements = [];
            for (let j=0; j<board[i].length; j++) {
                cellElements.push(<BoardCell cellValue={board[i][j]} row={i} col={j} />);
            }
            rowElements.push(<tr>{cellElements}</tr>);
        }
        
        return (
            <div class="Board">
                <table>
                    <tbody>
                        { rowElements }
                    </tbody>
                </table>
            </div>
        );
    }
}

Board.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number
};

Board.defaultProps = {
    rows: 50,
    cols: 50,
}

export default Board;