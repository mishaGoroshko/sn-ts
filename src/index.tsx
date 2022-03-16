import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {renderTree} from "./renderTree";
import {store} from "./Redux/redux-store";

renderTree(store.getState())
store.subscribe(() => {
    let state = store.getState()
    renderTree(state)
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
