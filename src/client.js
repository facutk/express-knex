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

class CounterList extends React.Component {
    constructor(props, contexts) {
        super(props, contexts);
        this.state = {
            counts: [
                {
                    key: 9,
                    value: 'a'
                },
                {
                    key: 7,
                    value: 'z'
                },
                {
                    key: 5,
                    value: 'w'
                }
            ]
        }
    }

    render() {
        var counts = this.state.counts.map( count =>
            <li key={count.key}>{count.value}</li>
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
