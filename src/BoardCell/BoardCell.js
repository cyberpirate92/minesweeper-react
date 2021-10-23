import './BoardCell.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

class BoardCell extends Component {
    render() {
        let className = 'hidden';
        
        if (this.props.cellValue === 'R') {
            className = 'revealed';
        } else if (this.props.cellValue >= '1' && this.props.cellValue <= '8') {
            className = `count-${this.props.cellValue}`;
        } else if (this.props.cellValue.startsWith('F')) {
            className = 'flag';
        } else if (this.props.isGameOver && (this.props.cellValue === 'M' || this.props.cellValue === 'FM')) {
            className = 'exposed-mine';
        }

        return (
            <td className="BoardCell">
                <div className={`bg-img ${className}`}
                    onClick={this.onCellClick}
                    onContextMenu={this.onCellRightClick}>                    
                </div>
            </td>
        );
    }

    onCellClick = () => {
        if (this.props.isGameOver) {
            return;
        }
        this.props.onClick(this.props.row, this.props.col)
    }

    /**
     * @param {MouseEvent} event 
     */
    onCellRightClick = (event) => {
        event.preventDefault(); 
        event.stopPropagation(); 
        
        if (this.props.isGameOver) {
            return;
        }
        this.props.onRightClick(this.props.row, this.props.col)
    }
}

BoardCell.propTypes = {
    cellValue: PropTypes.string,
    row: PropTypes.number,
    col: PropTypes.number,
    isGameOver: PropTypes.bool,
}

export default BoardCell;