import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import App from "./App";
import {store} from "./Redux/redux-store";

export const renderTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App store={store} />
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
}