var React = require('react');
var LangChannelStore = require('../stores/LangChannelStore');
var Snippet = require('./Snippet.react');

function getStateFromStores() {
    return {
        snippets: LangChannelStore.getSnippets(),
        lang: LangChannelStore.getChannelLang()
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
            return  (
                <Snippet key={snip.snippetId} snippet={snip} />
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
