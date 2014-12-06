var React = require('react/addons');
var cs = React.addons.classSet;
var ViewActions = require('../actions/ViewActions');
var EditActions = require('../actions/EditActions');

module.exports = React.createClass({

    propTypes: {
        snippet: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            id: this.props.snippet.snippetId,
            text: this.props.snippet.text
        };
    },

    render: function () {
        return (
            <div className="snippet_item"
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave} >
                <span className="snippet_text">{this.state.text}</span>
            </div>
        );
    },

    onMouseEnter: function () {
        ViewActions.getSnippetDiffs(this.props.snippet)
    },

    onMouseLeave: function () {
        EditActions.resetHighLight(false);
    }

});