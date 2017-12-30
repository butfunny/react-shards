import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
export class Slider extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            grabbing: false
        };

        dragRangeService.onDrop(() => {
            this.setState({grabbing: false});
        })
    }

    startDrag() {
        const { min, max} = this.props;
        this.setState({grabbing: true});
        let elem = $(ReactDOM.findDOMNode(this));
        dragRangeService.onDrag(elem.offset().left, elem.width(), (ratio)=> {
            this.props.onChange((max-min) *ratio + min);
        });
    }

    pos() {
        const {value, min, max} = this.props;

        return (value - min) /(max - min);
    }

    render() {

        let {grabbing} = this.state;
        let {tooltip, value} = this.props;

        return (
            <div className="slider" style={ {...this.props.style} }>
                <div
                    className={classnames("drag-circle", grabbing && "grabbing")}
                    style={{
                        left: `calc(${this.pos()*100}% - 12px)`
                    }}
                    onMouseDown={(e)=> {e.preventDefault(); this.startDrag()} }
                >
                    { tooltip && <div className="tooltip">{value.toFixed(2)}</div> }
                </div>
            </div>
        );
    }
}

let listeners = [];
export const dragRangeService = {
    onDrag(left, width, cb) {
        let last = null;
        const getCurrent = (clientX) => {
            if (clientX < left) {
                return 0;
            }
            if (clientX > left + width) {
                return 1;
            }
            return (clientX - left) / width;
        };
        let listener = (e)=> {
            let clientX = e.clientX;
            let value = getCurrent(clientX);
            if (last == null || last != value) {
                last = value;
                cb(value);
            }
        };
        let $window = $(window);
        $window.on("mousemove", listener);
        $window.one("mouseup", ()=> {
            listeners.forEach((l) => l());
            $window.off("mousemove", listener);
        });
    },
    onDrop: (e) => {
        listeners.push(e);
    }
};
