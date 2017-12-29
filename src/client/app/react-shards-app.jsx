import React from "react";
import {Slider} from "./slider/single/slider";
export class ReactShardsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 50
        };
    }

    render() {
        return (
            <div className="react-shards-app">
                <Slider
                    max={100}
                    min={0}
                    value={this.state.value}
                    onChange={(value) => this.setState({value})}
                />
            </div>
        );
    }
}