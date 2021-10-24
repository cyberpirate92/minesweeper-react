import './DigitalDisplay.css';
import { Component } from "react";
import PropTypes from 'prop-types';
import Utils from '../Utils';
import SevenSegmentDisplay from '../SevenSegmentDisplay/SevenSegmentDisplay';

class DigitalDisplay extends Component {
    render = () => {
        let paddedValue = Utils.padString(this.props.value, 3, 0);
        let displayUnits = [];
        for (let i=0; i<paddedValue.length; i++) {
            displayUnits.push(<SevenSegmentDisplay value={parseInt(paddedValue[i])} key={i} />)
        }
        return (
            <div className="DigitalDisplay">
                <div className="display">
                    {displayUnits}
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
};

export default DigitalDisplay;