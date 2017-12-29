import React from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import update from "react-addons-update";
import {dragRangeService} from "../single/slider";

export class MultipleSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            grabbing: false
        };

        dragRangeService.onDrop(() => {
            this.setState({grabbing: false});
            $("body").css({cursor: ""});
        })
    }

    startDrag(type) {
        const { min, max, value} = this.props;

        let elem = $(ReactDOM.findDOMNode(this));
        dragRangeService.onDrag(elem.offset().left, elem.width(), (ratio)=> {

            let sliderValue = (max-min) *ratio + min;


            if (value.from == value.to) {
                this.setState({grabbing: sliderValue > value.from ? "to" : "from"});
                this.props.onChange(update(value, {
                    [sliderValue > value.from ? "to" : "from"]: {$set: sliderValue }
                }));


            } else {
                this.setState({grabbing: type});

                if (type == "from" && sliderValue > value.to) {
                    sliderValue = value.to;
                }

                if (type == "to" && sliderValue < value.from) {
                    sliderValue = value.from;
                }

                this.props.onChange(update(value, {
                    [type]: {$set: sliderValue }
                }));
            }


        });
    }

    pos(type) {
        const {value, min, max} = this.props;
        return (value[type] - min) / (max - min)
    }


    render() {

        let {value, max, min} = this.props;

        let {grabbing} = this.state;

        return (
            <div className="multiple-slider slider">
                <div
                    className={classnames("drag-circle", grabbing == "from" && "grabbing")}
                    style={{
                        left: `calc(${this.pos("from")*100}% - 12px)`
                    }}
                    onMouseDown={(e)=> {e.preventDefault(); this.startDrag("from")} }
                />

                <div
                    className={classnames("drag-circle", grabbing == "to" && "grabbing")}
                    style={{
                        left: `calc(${this.pos("to")*100}% - 12px)`
                    }}
                    onMouseDown={(e)=> {e.preventDefault(); this.startDrag("to")} }
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