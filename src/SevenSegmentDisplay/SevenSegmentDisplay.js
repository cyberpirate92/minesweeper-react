import './SevenSegmentDisplay.css';
import PropTypes from 'prop-types';

const numbers = [
    0x7E,
    0x30,
    0x6D,
    0x79,
    0x33,
    0x5B,
    0x5F,
    0x70,
    0x7F,
    0x7B
]

const Segment = (props) => {
    return (
        <div className={`Segment Segment-${props.position} ${props.on ? 'Segment--on' : ''}`}></div>
    )
}

Segment.propTypes = {
    on: PropTypes.bool,
    position: PropTypes.string,
};
    
const SevenSegmentDisplay = (props) => {
    const segments = ["G","F","E","D","C","B","A"];
    const bit = numbers[props.value];
    const elements = [];
    for (let i=0; i<segments.length; i++) {
        const segment = segments[i];
        elements.push(<Segment key={i} on={((bit >> i) & 1) === 1 ? true : false} position={segment}/>);
    }
    return (
        <div className="Display">
            {elements}
        </div>
    )
}

SevenSegmentDisplay.propTypes = {
    value: PropTypes.number,
};

export default SevenSegmentDisplay;