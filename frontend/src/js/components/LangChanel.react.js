var React = require('react');
var AppStore = require('../stores/AppStore');
var QuestionsStore = require('../stores/QuestionStore');
var Snippet = require('./Snippet.react');
var AnswerForm = require('./AnswerForm.react');

function getStateFromStores() {
    return {
        snippets: QuestionsStore.getQuestions(),
        lang: AppStore.getPrimaryLang()
    }
}

module.exports = React.createClass({

    propTypes: {
        snippets: React.PropTypes.array,
        lang: React.PropTypes.string
    },

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        LangChannelStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        LangChannelStore.removeChangeListener(this._onChange);
    },

    render: function () {
        //hide this section by default, if we don't have any snippets
        if (this.state.snippets && Object.keys(this.state.snippets).length < 1) {
            return null;
        }

        var snippets = this.state.snippets;
        var snipps = snippets.map(function (snip) {
            return (
                <div>
                    <Snippet text={snip.text} />
                    <AnswerForm snippetId={snip.snippetId} question={snip.text}/>
                </div>
            );
        });

        return (
            <div className="snippetes-container">
                <span className="snippetes-lang-title">{this.state.lang}</span>
                {snipps}
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    }

});
