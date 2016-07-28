import React from 'react';

const Header = function(props) {
    return (
        <h1>{props.name} {props.password}</h1>
    );
}

class Navbar extends React.Component {
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
        return (
            <Header
                name={this.state.name}
                password={this.state.password}
            />
        );
    }
}

export default Navbar;
