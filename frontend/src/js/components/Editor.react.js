var React = require('react');
var EditActions = require('../actions/EditActions');
var EditorStore = require('../stores/EditorStore');
var ContentEditable = require('./ContentEditable.react');

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
            <div className="content-editor-wrapper">
                <h5>Request</h5>
                <ContentEditable
                    className="content-editor"
                    html={this.state.text}
                    onChange={this._textChange}
                />
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