import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Navbar from './lessons/Navbar.jsx';
import TimersDashboard from './lessons/TimersDashboard.jsx';
import TimeTag from './lessons/TimeTag.jsx';
import CounterList from './lessons/CounterList.jsx';
import ProductList from './lessons/ProductList.jsx';

const countersReducer = (state = [], action) => {
    return state;
};
const productsReducer = (state = [], action) => {
    return state;
};

const reducer = combineReducers({
    counters: countersReducer,
    products: productsReducer
});

let store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());


render(
    <Provider store={store}>
        <div>
            <Navbar />
            <hr />
            <TimeTag />
            <hr />
            <CounterList />
            <hr />
            <ProductList />
            <hr />
            <h2>timers</h2>
            <TimersDashboard />
        </div>
    </Provider>,
    document.getElementById('root')
);
