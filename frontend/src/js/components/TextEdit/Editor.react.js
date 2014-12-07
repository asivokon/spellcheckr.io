var React = require('react/addons');
var cs = React.addons.classSet;
var Constants = require('../../constants/Constants');
var EditActions = require('../../actions/EditActions');
var ApiActions = require('../../actions/ApiActions');
var EditorStore = require('../../stores/EditorStore');
var AppStore = require('../../stores/AppStore');

function getStateFromStores() {
    return {
        text: EditorStore.getText(),
        isHighlight: EditorStore.getHighLightedState(),
        snippetId: EditorStore.getSnippetId(),
        questionId: EditorStore.getQuestionId(),
        questionText: EditorStore.getQuestionText()
    }
}

module.exports = React.createClass({

    propTypes: {
        text: React.PropTypes.string
    },

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        EditorStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        EditorStore.removeChangeListener(this._onChange);
    },

    render: function () {

        return (
            <textarea
                placeholder="Ask your question..."
                onChange={this._textChange}
                value={this.state.text}></textarea>

        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    },

    _textChange: function (event) {
        var appState = AppStore.getAppState();
        if (appState == Constants.AppState.QUESTION_STATE) {
            EditActions.fireQuestion(event.target.value, this.state.snippetId);
        }
        else {
            if (this.state.questionId) {
                ApiActions.fireAnswer(this.state.questionText, event.target.value,
                    this.state.questionId, this.state.snippetId);
            }
            else {
                console.log("No question selected!");
            }
        }
    }

});
