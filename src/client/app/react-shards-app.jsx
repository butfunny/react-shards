import React from "react";
import {Slider} from "./slider/single/slider";
import {RangeSlider} from "./slider/multiple/range-slider";

export class ReactShardsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 50,
            multipleValue: {
                from: 2,
                to: 5
            }
        };
    }

    render() {

        let {multipleValue} = this.state;

        return (
            <div className="react-shards-app">
                {/*<Slider*/}
                    {/*max={100}*/}
                    {/*min={0}*/}
                    {/*value={this.state.value}*/}
                    {/*onChange={(value) => this.setState({value})}*/}
                {/*/>*/}

                <RangeSlider
                    max={10}
                    min={1}
                    value={multipleValue}
                    onChange={(multipleValue) => this.setState({multipleValue})}
                />
            </div>
        );
    }
}