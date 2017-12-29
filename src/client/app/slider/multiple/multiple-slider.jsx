import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import update from "react-addons-update";
import {dragRangeService} from "../single/slider";
import PropTypes from 'prop-types';

export class MultipleSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            grabbing: false,
            lastGrab: null
        };

        dragRangeService.onDrop(() => {
            this.setState({grabbing: false});
        })

    }

    startDrag(type) {
        const { min, max, value} = this.props;

        this.setState({grabbing: type});

        let elem = $(ReactDOM.findDOMNode(this));
        dragRangeService.onDrag(elem.offset().left, elem.width(), (ratio)=> {

            let sliderValue = (max-min) *ratio + min;

            if (type == "from" && sliderValue > value.to) {
                sliderValue = value.to;
            }

            if (type == "to" && sliderValue < value.from) {
                sliderValue = value.from;
            }

            this.props.onChange(update(value, {
                [type]: {$set: sliderValue }
            }));


        });
    }

    pos(type) {
        const {value, min, max} = this.props;
        return (value[type] - min) / (max - min)
    }


    render() {


        let {value, max, min} = this.props;

        let {grabbing, lastGrab} = this.state;

        return (
            <div className="multiple-slider slider">
                <div
                    className={classnames("drag-circle", grabbing == "from" && "grabbing")}
                    style={{
                        left: `calc(${this.pos("from")*100}% - 12px)`,
                        zIndex: `${lastGrab == "from" ? 3 : 2}`
                    }}
                    onMouseDown={(e)=> {e.preventDefault(); this.startDrag("from"); this.setState({lastGrab: "from"})} }
                />

                <div
                    className={classnames("drag-circle", grabbing == "to" && "grabbing")}
                    style={{
                        left: `calc(${this.pos("to")*100}% - 12px)`,
                        zIndex: `${lastGrab == "to" ? 3 : 2}`
                    }}
                    onMouseDown={(e)=> {e.preventDefault(); this.startDrag("to"); this.setState({lastGrab: "to"})} }
                />
                
                <div className="slider-connect"
                    style={{
                        left: `calc(${this.pos("from")*100}% - 12px)`,
                        width: `${(this.pos("to") - this.pos("from"))*100}%`
                    }}
                />

            </div>
        );
    }
}

MultipleSlider.propTypes = {
    onChange: PropTypes.func.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    value: PropTypes.object.isRequired,
    customProp: (props, propName, componentName) => {
        let {max, min, value} = props;
        if (max < min) return new Error(`max need > min at ${componentName}`);
        if (!value.from || !value.to) return new Error(`value need type of {from: Number, to: Number} at ${componentName}`);
        if (!value.from > value.to) return new Error(`from need < to at ${componentName}`);
    }
};