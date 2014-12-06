var React = require('react');
var EditActions = require('../actions/EditActions');
var EditorStore = require('../stores/EditorStore');

function getStateFromStores() {
    return {
        text: EditorStore.getPubnubText()
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
                className="textarea"
                placeholder="pubnub"
                value={this.state.text}></textarea>
        );
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    }

});