import React from "react";
import ReactDOM from "react-dom";
import {ReactShardsApp} from "./app/react-shards-app";
window.React = React;

ReactDOM.render((
    <ReactShardsApp />
), document.getElementById("app-container"));



