import React from 'react';

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

export default TimeTag;
