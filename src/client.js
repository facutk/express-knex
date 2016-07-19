import React from 'react';
import ReactDOM from 'react-dom';

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


ReactDOM.render(
    <div>
        <NavBar />
        <TimeTag />
        <CounterList />
    </div>,
    document.getElementById('root')
);
