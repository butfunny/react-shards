import React from "react";
import {Slider} from "./slider/single/slider";
import {MultipleSlider} from "./slider/multiple/multiple-slider";

export class ReactShardsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 50,
            multipleValue: {
                from: 20,
                to: 40
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

                <MultipleSlider
                    max={100}
                    min={0}
                    value={multipleValue}
                    onChange={(multipleValue) => this.setState({multipleValue})}
                />
            </div>
        );
    }
}