import state, {addPost, onchangeTextarea, RootStateType} from "./Redux/state";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import App from "./App";

export const renderTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App state={state} addPost={addPost} onchangeTextarea={onchangeTextarea}/>
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
}