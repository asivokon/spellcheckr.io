var React = require('react');
var Editor = require('./TextEdit/Editor.react.js');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

//app views
var Switcher = require('./Switcher.react');
var Workspace = require('./Workspace.react');


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

        //<div className="view"><span className="logo">spellchec<strong>kr</strong>.<i>io</i></span></div>

        return (
            <div>
                <div className="navbar"></div>
                <Switcher />
                <Workspace />
            </div>

        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    }

});