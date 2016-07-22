import React from 'react';
import ReactDOM from 'react-dom';

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

class NavBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: 'The',
            password: 'Team'
        };
    }

    componentDidMount() {
        this.setState({
            password: '. team .'
        });
    }

    render() {
        return <h1>{this.state.name} {this.state.password}</h1>
    }
}

class TimeTag extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            greeting: 'hello rrreactt'
        };
    }

    componentDidMount () {
        this.serverRequest = $.get('api/date', function (result) {
            this.setState({
                greeting: result.timestamp
            });
        }.bind(this));
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

class ToggleableTimerForm extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (this.props.isOpen) {
            return (
                <TimerForm />
            );
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <button className='ui basic button icon'>
                        [+]
                    </button>
                </div>
            );
        }
    }
}

class Timer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const elapsedString = this.props.elapsed;
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='header'>
                        {this.props.title}
                    </div>
                    <div className='meta'>
                        {this.props.project}
                    </div>
                    <div className='centered aligned description'>
                        <h2>{elapsedString}</h2>
                    </div>
                    <div className='extra content'>
                        <span className='right floated edit icon'>[edit]</span>
                        <span className='right floated trash icon'>[delete]</span>
                    </div>
                </div>
                <div className='ui bottom attached blue basic button'>
                    Start
                </div>
            </div>
        );
    }
}

class TimerForm extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const submitText = this.props.title ? 'Update' : 'Create';
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Title</label>
                            <input type='text' defaultValue={this.props.title} />
                        </div>
                        <div className='field'>
                            <label>Project</label>
                            <input type='text' defaultValue={this.props.Project} />
                        </div>
                        <div className='ui two bottom attached buttons'>
                            <button className='ui basic blue button' type='text'>
                                {submitText}
                            </button>
                            <button className='ui basic red button' type='text'>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class EditableTimer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (this.props.editFormOpen) {
            return (
                <TimerForm
                    title={this.props.title}
                    project={this.props.project}
                />
            );
        } else {
            return (
                <Timer
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                />
            );
        }
    }
}

class EditableTimerList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const timers = this.props.timers.map((timer) => {
            return (
                <EditableTimer
                    key={timer.id}
                    id={timer.id}
                    title={timer.title}
                    project={timer.project}
                    elapsed={timer.elapsed}
                    runningSince={timer.runningSince}
                />
            );
        });
        return (
            <div id='timers'>
                {timers}
            </div>
        );
    }
}

class TimersDashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            timers: [
                {
                    title: 'Practice squat',
                    project: 'Gym Chores',
                    id: 1,
                    elapsed: 5456099,
                    runningSince: Date.now()
                },
                {
                    title: 'Bake squash',
                    project: 'Kitchen Chores',
                    id: 2,
                    elapsed: 1273998,
                    runningSince: null
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <div className='column'>
                    <EditableTimerList
                        timers={this.state.timers}
                    />
                    <ToggleableTimerForm
                        isOpen={true}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <NavBar />
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
