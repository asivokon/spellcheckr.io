var React = require('react/addons');
var ApiActions = require('../actions/ApiActions');
var AppStore = require('../stores/AppStore');
var EditorStore = require('../stores/EditorStore');

module.exports = React.createClass({
    propTypes: {
        snippetId: React.PropTypes.string,
        question: React.PropTypes.string
    },
    getInitialState: function () {
        return {text: ""};
    },


    render: function () {
        return (
            <input
                type="text"
                onKeyDown={this._onKeyDown}
                onChange={this._onChange}
                value={this.state.text}/>
        );
    },

    _onKeyDown: function (event) {
        if (event.keyCode == 13) {
            ApiActions.fireAnswer(
                this.props.question,
                this.state.text,
                this.props.snippetId,
                EditorStore.getQuestionId(),
                AppStore.getUserName());
        }
    },

    _onChange: function (event) {
        this.setState({text: event.target.value});
    }
});