import PropTypes from 'prop-types';
import { Component } from 'react';

class BoardCell extends Component {
    render() {
        return (
            <td class="BoardCell">
                <div>
                    {this.props.cellValue}
                </div>
            </td>
        );
    }
}

BoardCell.propTypes = {
    cellValue: PropTypes.string,
    row: PropTypes.number,
    col: PropTypes.number,
}

export default BoardCell;