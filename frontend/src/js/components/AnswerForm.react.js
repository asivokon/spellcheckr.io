var React = require('react/addons');
var ApiActions = require('../actions/ApiActions');

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
            // TODO: generate author UID
            ApiActions.fireAnswer(this.props.question, this.state.text, 1, this.props.snippetId)
        }
    },

    _onChange: function (event) {
        this.setState({text: event.target.value});
    }
});