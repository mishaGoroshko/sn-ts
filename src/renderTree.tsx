import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import App from './App';
import {store} from './Redux/redux-store';
import {Provider} from 'react-redux';

export const renderTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <Provider store={store}>
                    <App/>
                </Provider>
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
}