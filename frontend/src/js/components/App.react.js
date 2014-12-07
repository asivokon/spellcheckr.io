var React = require('react');
var Editor = require('./TextEdit/Editor.react.js');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

//app views
var QuestionsView = require('./Questions/QuestionsView.react');
var AnswersView = require('./Answers/AnswersView.react');
var TextEditView = require('./TextEdit/TextEditView.react');

function getStateFromStores() {
    return {
        appState: AppStore.getAppState()
    }
}

module.exports = React.createClass({

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        AppStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var appState = this.state.appState;

        return (
            <div className="spell-checkr-app">
                <button onClick={this.changeView}>TEST VIEW CHANGE</button>
                <div className="app-wrapper">
                    <QuestionsView state={appState} />
                    <TextEditView state={appState} />
                    <AnswersView state={appState} />
                </div>
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    },

    changeView: function () {
        //we have only two states of the app, so we change boolean and convert it to number
        var nextState = +!this.state.appState;
        AppActions.changeViewState(nextState);
        console.log(nextState);
    }

});