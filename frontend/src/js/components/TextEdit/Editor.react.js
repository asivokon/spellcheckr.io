var React = require('react/addons');
var cs = React.addons.classSet;
var Constants = require('../../constants/Constants');
var EditActions = require('../../actions/EditActions');
var ApiActions = require('../../actions/ApiActions');
var EditorStore = require('../../stores/EditorStore');
var AppStore = require('../../stores/AppStore');
var Textarea = require('react-textarea-autosize');

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

    getPlaceholderText: function () {
        var appState = AppStore.getAppState();
        if (appState == Constants.AppState.QUESTION_STATE) {
            return 'Type in the text you want to proofread...';
        }
        return 'Type in your suggestion here...'
    },

    render: function () {
        return (
            <Textarea
                placeholder={this.getPlaceholderText()}
                onChange={this._textChange}
                value={this.state.text} />

        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    },

    _textChange: function (event) {
        var appState = AppStore.getAppState();
        var text = event.target.value;
        if (appState == Constants.AppState.QUESTION_STATE) {
            EditActions.fireQuestion(text, this.state.snippetId);
        }
        else {
            if (this.state.questionId) {
                ApiActions.fireAnswer(this.state.questionText, text,
                    this.state.questionId, this.state.snippetId);
            }
            else {
                console.log("No question selected!");
                this.setState({text: text});
            }
        }
    }

});
