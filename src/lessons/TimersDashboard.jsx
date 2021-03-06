import React from 'react';
import { v4 } from 'node-uuid';

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
            timers: []
        }

        this._handleCreateFormSubmit = this._handleCreateFormSubmit.bind(this);
        this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
        this.handleTrashClick = this.handleTrashClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
        this.loadTimersFromServer = this.loadTimersFromServer.bind(this);
    }

    componentDidMount () {
        this.loadTimersFromServer();
        setInterval(this.loadTimersFromServer, 5000);
    }

    loadTimersFromServer() {
        fetch('api/timers')
        .then(result=>result.json())
        .then(data=>{
            this.setState({
                timers: data
            });
        });
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
        const t = {
            title: timer.title || 'Timer',
            project: timer.project || 'Project',
            id: v4(),
            elapsed: 0,
        };

        this.setState({
            timers: this.state.timers.concat(t)
        });

        fetch('api/timers', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(t)
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

        fetch('api/timers', {
            method: 'put',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(attrs)
        });
    }

    deleteTimer(timerId) {
        this.setState({
            timers: this.state.timers.filter(
                (timer => timer.id !== timerId )
            )
        });

        fetch('api/timers', {
            method: 'delete',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: timerId
            })
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

        fetch('api/timers/start', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: timerId,
                start: now
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

        fetch('api/timers/stop', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: timerId,
                start: now
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

export default TimersDashboard;
