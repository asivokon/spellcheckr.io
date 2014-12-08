var React = require('react');
var Editor = require('./TextEdit/Editor.react.js');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var cs = React.addons.classSet;
var Constants = require('../constants/Constants');

//app views
var QuestionsView = require('./Questions/QuestionsView.react');
var AnswersView = require('./Answers/AnswersView.react');
var TextEditView = require('./TextEdit/TextEditView.react');
var LanguageSelect = require('./LanguageSelect/LanguageSelect.react');


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

        var WorkspaceClass = cs({
            'workspace': true,
            'question-mode-active': appState === Constants.AppState.QUESTION_STATE,
            'answer-mode-active': appState === Constants.AppState.ANSWER_STATE
        });

        return (
            <div className="view">
                <div className={WorkspaceClass}>
                    <div className="workspace-container">
                        <div className="column">
                            <TextEditView state={appState} />
                            <LanguageSelect selectedLanguage='eng'/>
                        </div>
                        <div className="column">
                            <AnswersView state={appState} />
                        </div>
                        <div className="column">
                            <QuestionsView state={appState} />
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    }

});
