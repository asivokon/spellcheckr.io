var React = require('react');
var EditActions = require('../actions/EditActions');
var EditorStore = require('../stores/EditorStore');

function getStateFromStores() {
    return {
        text: EditorStore.getText(),
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
        return (
            <textarea
                className="editor-textarea"
                placeholder="Some text must be here"
                value={this.state.text}
                onChange={this._textChange}></textarea>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    },

    _textChange: function (event) {
        EditActions.updateText(event.target.value, this.state.snippetId);
    }

});