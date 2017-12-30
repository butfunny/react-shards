import React from "react";
import {Slider} from "./slider/single/slider";
import {RangeSlider} from "./slider/multiple/range-slider";
import {modals, ModalsRegistry} from "./modal/modals";

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

    openModal() {
        let modal = modals.openModal({
            content: (
                <div className="modal-test">
                    <div className="modal-header">
                        <div className="modal-title">
                            Are you sure?
                        </div>
                    </div>

                    <div className="modal-body">
                        Et has debitis vivendo, nam dicant malorum te. Justo moderatius elaboraret cu est, nibh placerat insolens id mea. Suas equidem usu ad, eos ex sint stet alterum. Sit in adhuc propriae contentiones, dicta decore eum an.
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary">
                            Nope
                        </button>

                        <button className="btn btn-primary">
                            Yep
                        </button>
                    </div>
                </div>
            )
        })

    }

    render() {

        let {multipleValue} = this.state;

        return (
            <div className="react-shards-app">
                <Slider
                    tooltip
                    max={100}
                    min={0}
                    value={this.state.value}
                    onChange={(value) => this.setState({value})}
                />

                <button
                    className="btn btn-primary"
                    onClick={() => this.openModal()}>Click me</button>

                {/*<RangeSlider*/}
                    {/*tooltip*/}
                    {/*max={10}*/}
                    {/*min={1}*/}
                    {/*value={multipleValue}*/}
                    {/*onChange={(multipleValue) => this.setState({multipleValue})}*/}
                {/*/>*/}

                <ModalsRegistry />
            </div>
        );
    }
}