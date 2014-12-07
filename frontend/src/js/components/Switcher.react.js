var React = require('react');
var Editor = require('./TextEdit/Editor.react.js');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var cs = React.addons.classSet;
var Constants = require('../constants/Constants');

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

        var SwitcherLinkClass = function(state) {
            return cs({
                'switcher-link': true,
                'active': state === appState
            });
        };

        return (
            <div className="switcher">
                <div className="view">
                    <ul className="switcher-menu">
                        <li className="switcher-item"><a href onClick={this.switchToQuestionsMode} className={SwitcherLinkClass(Constants.AppState.QUESTION_STATE)}><strong>My </strong>questions</a></li>
                        <li className="switcher-item"><a href onClick={this.switchToAnswersMode} className={SwitcherLinkClass(Constants.AppState.ANSWER_STATE)}><strong>My </strong>suggestions</a></li>
                    </ul>
                </div>
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    },

    switchToQuestionsMode: function (e) {
        AppActions.changeViewState(Constants.AppState.QUESTION_STATE);
        e.preventDefault();
    },
    switchToAnswersMode: function (e) {
        AppActions.changeViewState(Constants.AppState.ANSWER_STATE);
        e.preventDefault();
    }

});