var React = require('react/addons');
var cs = React.addons.classSet;
var Constants = require('../../constants/Constants');
var EditActions = require('../../actions/EditActions');
var ApiActions = require('../../actions/ApiActions');
var EditorStore = require('../../stores/EditorStore');
var AppStore = require('../../stores/AppStore');
var Textarea = require('react-textarea-autosize');
var Settings = require('../../utils/Settings');

function getStateFromStores() {
    return {
        text: EditorStore.getText(),
        isHighlight: EditorStore.getHighLightedState(),
        snippetId: EditorStore.getSnippetId(),
        questionId: EditorStore.getQuestionId(),
        questionText: EditorStore.getQuestionText(),
        detectedLanguage: EditorStore.getDetectedLanguage()
    }
}

//function triggerChange(element) {
//    if ("createEvent" in document) {
//        var evt = document.createEvent("HTMLEvents");
//        evt.initEvent("change", false, true);
//        element.dispatchEvent(evt);
//    }
//    else {
//        element.fireEvent("onchange");
//    }
//}


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
        var minLen = Settings.mashable.languageDetect.minLength;
        var diff = this.state.text.trim().length - minLen;
        var detectMsg = '';
        var lang = this.state.detectedLanguage;

        if (lang) {
            detectMsg = <p>Detected language: {lang}</p>
        } else if (diff < 0) {
            detectMsg = <p>Language detection needs {Math.abs(diff)} more chars</p>
        }

        var appState = this._getAppState(),
            value = appState !== Constants.AppState.QUESTION_STATE ?
                this.state.questionText : this.state.text;
        return (
            <div>
                <Textarea ref="text"
                    placeholder={this.getPlaceholderText()}
                    onChange={this._textChange}
                    value={value} />
                {detectMsg}
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
        setTimeout(function () {
            this.refs.text.getDiffSize();
            this.refs.text.recalculateSize();
        }.bind(this), 1)
    },

    _getAppState: function () {
        return AppStore.getAppState();
    },

    _textChange: function (event) {
        var text = event.target.value;
        var appState = this._getAppState();
        if (text.replace('\n', '').trim().length != 0) {
            if (appState == Constants.AppState.QUESTION_STATE) {
                EditActions.fireQuestion(text, this.state.snippetId);
            } else if (this.state.questionId) {
                if (text.length != 0) {
                    ApiActions.fireAnswer(
                        this.state.questionText,
                        text,
                        this.state.questionId,
                        this.state.snippetId,
                        AppStore.getUserName()
                    );
                }
            }
        }
        this.setState({text: text});
    }

});
