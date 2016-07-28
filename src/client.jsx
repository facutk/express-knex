import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './Navbar.jsx';
import TimersDashboard from './TimersDashboard.jsx';

class TimeTag extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            greeting: 'hello rrreactt'
        };
    }

    componentDidMount () {
        fetch('api/date')
            .then(result=>result.json())
            .then(json=>{
                this.setState({
                    greeting: json.timestamp
                });
            });
    }

    render() {
        return (
            <h1>{this.state.greeting}</h1>
        );
    }
}

class CountItem extends React.Component {
    static propTypes = {
        children: React.PropTypes.any
    };
    constructor(props, context) {
        super(props, context);
    }
    _increment() {
        console.log(this.props.value);
    }
    render() {
        return (
            <li>{this.props.value} : {this.props.count} <strong onClick={this._increment.bind(this)}>[+]</strong></li>
        );
    }
}

class CounterList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            counts: [
                {
                    key: 9,
                    value: 'a',
                    count: '1'
                },
                {
                    key: 7,
                    value: 'z',
                    count: '0'
                },
                {
                    key: 5,
                    value: 'w',
                    count: '5'
                }
            ]
        }
    }

    render() {
        var counts = this.state.counts.map( count =>
            <CountItem key={count.key} value={count.value} count={count.count} />
        );
        return (
            <ul>
                {counts}
            </ul>
        );
    }
}

let data = [
    {
        'id': 1,
        'title': 'Yellow Pail',
        'description': 'On-demand sand castle construction expertise.',
        'votes' : 3
    },
    {
        'id': 2,
        'title': 'Chromebook',
        'description': 'Sweet computer',
        'votes' : 8
    }
]

class Product extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    _handleUpVote() {
        this.props.onVote(this.props.id);
    }

    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <ul>
                    <li>id: {this.props.id}</li>
                    <li>description: {this.props.description}</li>
                    <li>votes: {this.props.votes} <a href='#' onClick={this._handleUpVote.bind(this)}>[+]</a></li>
                </ul>
            </div>
        );
    }
}

class ProductList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            products: []
        };
        this._handleProductUpVote = this._handleProductUpVote.bind(this);
    }

    componentDidMount () {
        this._updateState();
    }

    _updateState = () => {
        const products = data.sort( (a,b) => {
            return b.votes - a.votes;
        });
        this.setState({
            products: products
        });
    }

    //_handleProductUpVote = (productId) => {
    _handleProductUpVote (productId) {
        data.forEach( (el) => {
            if (el.id === productId) {
                el.votes = el.votes + 1;
                return;
            }
        });
        this._updateState();
    }

    render() {
        const products = data.map( product => {
            return (
                <Product
                    key={'product-' + product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    votes={product.votes}
                    onVote={this._handleProductUpVote}
                />
            );
        });
        return (
            <div>
                <h2>ProductList</h2>
                {products}
            </div>
        );
    }
}


ReactDOM.render(
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
    </div>,
    document.getElementById('root')
);
