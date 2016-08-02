import React from 'react';
import { Button } from 'react-mdl';

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
                    <li><Button raised accent ripple>Button</Button></li>
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

export default ProductList;
