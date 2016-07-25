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
        this.state = {
            isOpen: false
        }
        this._handleFormOpen = this._handleFormOpen.bind(this);
        this._handleFormClose = this._handleFormClose.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    _handleFormOpen() {
        this.setState({
            isOpen: true
        });
    }

    _handleFormClose() {
        this.setState({
            isOpen: false
        });
    }

    _handleFormSubmit(timer) {
        this.props.onFormSubmit(timer);
        this.setState({
            isOpen: false
        });
    }

    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm
                    onFormSubmit={this._handleFormSubmit}
                    onFormClose={this._handleFormClose}
                />
            );
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <button className='ui basic button icon' onClick={this._handleFormOpen}>
                        <i className='plus icon'></i>
                    </button>
                </div>
            );
        }
    }
}

class TimerActionButton extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (this.props.timerIsRunning) {
            return (
                <div className='ui bottom attached red basic button' onClick={this.props.onStopClick}>
                    Stop
                </div>
            );
        } else {
            return (
                <div className='ui bottom attached green basic button' onClick={this.props.onStartClick}>
                    Start
                </div>
            );
        }
    }
}


class Timer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleTrashClick = this.handleTrashClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
    }

    componentDidMount() {
        this.forceUpdateInterval = setInterval(()=> this.forceUpdate(), 500);
    }

    componentWillUnmount() {
        clearInterval(this.forceUpdateInterval);
    }

    handleTrashClick() {
        this.props.onTrashClick(this.props.id);
    }

    handleStartClick() {
        this.props.onStartClick(this.props.id);
    }

    handleStopClick() {
        this.props.onStopClick(this.props.id);
    }

    renderElapsedString(elapsed, runningSince) {
        let totalElapsed = elapsed;
        if (runningSince) {
            totalElapsed += Date.now() - runningSince;
        }
        return this.millisecondsToHuman(totalElapsed);
    }

    millisecondsToHuman(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms / 1000 / 60 / 60);

        const humanized = [
            this.pad(hours.toString(), 2),
            this.pad(minutes.toString(), 2),
            this.pad(seconds.toString(), 2),
        ].join(':');

        return humanized;
    }

    pad(numberString, size) {
        let padded = numberString;
        while (padded.length < size) padded = '0' + padded;
        return padded;
    }

    render() {
        const elapsedString = this.renderElapsedString(this.props.elapsed, this.props.runningSince);

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
                        <span className='right floated edit icon' onClick={this.props.onEditClick}>
                            <i className='edit icon'></i>
                        </span>
                        <span className='right floated trash icon' onClick={this.handleTrashClick}>
                            <i className='trash icon'></i>
                        </span>
                    </div>
                </div>
                <TimerActionButton
                    timerIsRunning={!!this.props.runningSince}
                    onStartClick={this.handleStartClick}
                    onStopClick={this.handleStopClick}
                />
            </div>
        );
    }
}

class TimerForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit() {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.refs.title.value,
            project: this.refs.project.value
        });
    }

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Title</label>
                            <input type='text' ref='title' defaultValue={this.props.title} />
                        </div>
                        <div className='field'>
                            <label>Project</label>
                            <input type='text' ref='project' defaultValue={this.props.project} />
                        </div>
                        <div className='ui two bottom attached buttons'>
                            <button className='ui basic blue button' onClick={this._handleSubmit}>
                                {submitText}
                            </button>
                            <button className='ui basic red button' onClick={this.props.onFormClose}>
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
        this.state = {
            editFormOpen: false
        }
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleFormClose = this.handleFormClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEditClick() {
        this.openForm();
    }

    handleFormClose() {
        this.closeForm();
    }

    handleSubmit(timer) {
        this.props.onFormSubmit(timer);
        this.closeForm();
    }

    closeForm() {
        this.setState({
            editFormOpen: false
        });
    }

    openForm() {
        this.setState({
            editFormOpen: true
        });
    }

    render() {
        if (this.state.editFormOpen) {
            return (
                <TimerForm
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    onFormSubmit={this.handleSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <Timer
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                    onEditClick={this.handleEditClick}
                    onTrashClick={this.props.onTrashClick}
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
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
                    onFormSubmit={this.props.onFormSubmit}
                    onTrashClick={this.props.onTrashClick}
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
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

        this._handleCreateFormSubmit = this._handleCreateFormSubmit.bind(this);
        this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
        this.handleTrashClick = this.handleTrashClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
    }

    _handleCreateFormSubmit(timer) {
        this._createTimer(timer);
    }

    handleEditFormSubmit(attrs) {
        this.updateTimer(attrs);
    }

    handleTrashClick(timerId) {
        this.deleteTimer(timerId);
    }

    handleStartClick(timerId) {
        this.startTimer(timerId);
    }

    handleStopClick(timerId) {
        this.stopTimer(timerId);
    }

    _createTimer(timer) {
        this.setState({
            timers: this.state.timers.concat({
                title: timer.title || 'Timer',
                project: timer.project || 'Project',
                id: this.state.timers.length + 1,
                elapsed: 0,
            })
        });
    }

    updateTimer(attrs) {
        this.setState({
            timers: this.state.timers.map((timer)=>{
                if (timer.id === attrs.id) {
                    return Object.assign({}, timer, {
                        title: attrs.title,
                        project: attrs.project
                    });
                } else {
                    return timer;
                }
            })
        });
    }

    deleteTimer(timerId) {
        this.setState({
            timers: this.state.timers.filter(
                (timer => timer.id !== timerId )
            )
        });
    }

    startTimer(timerId) {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === timerId) {
                    return Object.assign({}, timer, {
                        runningSince: now
                    });
                } else {
                    return timer;
                }
            })
        });
    }

    stopTimer(timerId) {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer)=>{
                if (timer.id === timerId) {
                    const lastElapsed = now - timer.runningSince;
                    return Object.assign({}, timer, {
                        elapsed: timer.elapsed + lastElapsed,
                        runningSince: null
                    });
                } else {
                    return timer;
                }
            })
        });
    }

    render() {
        return (
            <div>
                <div className='column'>
                    <EditableTimerList
                        timers={this.state.timers}
                        onFormSubmit={this.handleEditFormSubmit}
                        onTrashClick={this.handleTrashClick}
                        onStartClick={this.handleStartClick}
                        onStopClick={this.handleStopClick}
                    />
                    <ToggleableTimerForm
                        onFormSubmit={this._handleCreateFormSubmit}
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
