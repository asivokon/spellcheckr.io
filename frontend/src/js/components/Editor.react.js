var React = require('react');
var EditActions = require('../actions/EditActions');
var EditorStore = require('../stores/EditorStore');
var ContentEditable = require('./ContentEditable.react');

function getStateFromStores() {
    return {
        text: EditorStore.getText(),
        isHighlight: EditorStore.getHighLightedState(),
        snippetId: EditorStore.getSnippetId()
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
        var mainClass = {
            'content-editor-wrapper': true,
            'highlight': this.state.isHighlight
        };

        return (
            <div className={mainClass}>
                <h5>Request</h5>
                <textarea
                    className="content-editor-textarea"
                    onChange={this._textChange}
                    value={this.state.text}></textarea>
                <div className="content-editor-display" dangerouslySetInnerHTML={{__html: this.state.text}}></div>
            </div>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    },

    _textChange: function (event) {
        EditActions.updateText(event.target.value, this.state.snippetId);
    }

});