import './DigitalDisplay.css';
import { Component } from "react";
import PropTypes from 'prop-types';
import Utils from '../Utils';

class DigitalDisplay extends Component {
    render = () => {
        return (
            <div className="DigitalDisplay">
                <div className="display">
                    {Utils.padString(this.props.value, 3, 0)}
                </div>
            </div>
        );
    }
}

DigitalDisplay.propTypes = {
    value: PropTypes.number,
    minLength: PropTypes.number,
};

DigitalDisplay.defaultProps = {
    maxLength: 3,
}

export default DigitalDisplay;