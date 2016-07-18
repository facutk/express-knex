import React from 'react';
import ReactDOM from 'react-dom';

var TimeTag = React.createClass({
    getInitialState: function() {
        return {
            greeting: 'hello rrreactt'
        };
    },
    componentDidMount: function() {
        this.serverRequest = $.get('api/date', function (result) {
            this.setState({
                greeting: result.timestamp
            });
        }.bind(this));
    },

    render: function () {
        return (
            <h1>{this.state.greeting}</h1>
        );
    }
});

class NavBar extends React.Component {
  render() {
    return <h1>Timestamp</h1>
  }
}

ReactDOM.render(
    <div>
        <NavBar />
        <TimeTag />
    </div>,
    document.getElementById('root')
);
